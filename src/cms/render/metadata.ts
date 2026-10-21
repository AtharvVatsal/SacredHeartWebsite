import 'server-only'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { OG_IMAGE, SITE_NAME } from '@/lib/seo'
import { mediaUrl } from './media'
import { loadCmsPage } from './page'
import { getPayloadSafe } from './payload'

/**
 * Metadata for a route: the built-in metadata, overridden by whatever the published CMS page sets
 * (title, description, sharing image, canonical address, "hide from search engines").
 */
export async function cmsMetadata(path: string, base: Metadata, opts: { allowEmpty?: boolean } = {}): Promise<Metadata> {
  const loaded = await loadCmsPage(path, opts)
  if (!loaded) return base
  const { page } = loaded
  const seo = page.seo ?? {}

  // An SEO title is used exactly as typed; otherwise the built-in title (or, for new pages, the page name)
  const title = seo.title || (base.title ? undefined : `${page.title} | ${SITE_NAME}`)
  const description = seo.description || base.description || undefined
  let image: { url: string; width?: number; height?: number; alt?: string } | undefined
  if (seo.image) {
    const payload = await getPayloadSafe()
    const media =
      typeof seo.image === 'object'
        ? (seo.image as Media)
        : ((await payload?.findByID({ collection: 'media', id: seo.image, depth: 0, overrideAccess: false }).catch(() => null)) as Media | null)
    const url = mediaUrl(media)
    if (url && media) image = { url, width: media.width ?? undefined, height: media.height ?? undefined, alt: media.alt ?? undefined }
  }

  // Relative paths resolve against metadataBase, as in src/lib/seo.ts
  const canonical = seo.canonical || path
  const ogTitle = seo.title || (typeof base.openGraph?.title === 'string' ? base.openGraph.title : page.title)
  return {
    ...base,
    ...(title ? { title: { absolute: title } } : {}),
    description,
    alternates: { ...base.alternates, canonical },
    openGraph: {
      ...base.openGraph,
      title: ogTitle,
      description,
      url: canonical,
      images: image ? [image] : base.openGraph?.images ?? [OG_IMAGE],
    },
    twitter: { ...base.twitter, title: ogTitle, description, images: image ? [image.url] : base.twitter?.images },
    ...(seo.noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}
