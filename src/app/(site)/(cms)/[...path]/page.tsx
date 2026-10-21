import type { Metadata } from 'next'
import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { CmsPage } from '@/cms/render/CmsPage'
import { cmsMetadata } from '@/cms/render/metadata'
import { loadCmsPage } from '@/cms/render/page'
import { findRedirect, publishedCustomPaths } from '@/cms/render/redirects'
import { isBuiltInPath, isReservedPath } from '@/cms/paths'
import { OG_IMAGE, SITE_LOCALE, SITE_NAME } from '@/lib/seo'

// Pages created in the CMS. Next.js only reaches this catch-all when no built-in route matches the address,
// so it can never replace one of the existing pages. Unknown addresses fall through to redirects, then 404.
export const dynamicParams = true

type Props = { params: Promise<{ path: string[] }> }

const toPath = (segments: string[]) => '/' + segments.map((s) => decodeURIComponent(s)).join('/')

export async function generateStaticParams() {
  const pages = await publishedCustomPaths()
  return pages.map((p) => ({ path: p.path.slice(1).split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = toPath((await params).path)
  if (isBuiltInPath(path) || isReservedPath(path)) return {}
  return cmsMetadata(
    path,
    {
      alternates: { canonical: path },
      openGraph: { type: 'website', siteName: SITE_NAME, locale: SITE_LOCALE, url: path, images: [OG_IMAGE] },
      twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
    },
    { allowEmpty: true },
  )
}

export default async function CustomPage({ params }: Props) {
  const path = toPath((await params).path)
  if (isBuiltInPath(path) || isReservedPath(path)) notFound()

  const loaded = await loadCmsPage(path, { allowEmpty: true })
  if (loaded) return <CmsPage loaded={loaded} />

  const moved = await findRedirect(path)
  if (moved) {
    if (moved.permanent) permanentRedirect(moved.to)
    redirect(moved.to)
  }
  notFound()
}
