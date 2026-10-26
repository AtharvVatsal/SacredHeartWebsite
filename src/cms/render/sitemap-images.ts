import 'server-only'
// Image entries for the sitemap, taken from the published CMS pages, so photos added or replaced in the CMS
// are listed for image search. Pages that are not published in the CMS keep their original entries.
import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import { albumPhoto } from '@/data/gallery'
import { blockRegistry } from '../blocks/definitions'
import { migrateDocument } from '../document/migrations'
import { isRecord, type PageDocument } from '../document/types'
import { validateDocument } from '../document/validate'
import { PLACEHOLDER_ALT } from './media'
import { resolveMedia } from './resolve-media'

export type SitemapImage = { loc: string; title: string }

const isImage = (v: unknown): v is { src: string; alt?: string } => isRecord(v) && 'mediaId' in v && typeof v.src === 'string'

/** Every image in a page document; without a description, the item's name or title (or the page's) is used */
function collect(value: unknown, pageTitle: string, out: SitemapImage[], context?: Record<string, unknown>, key?: string) {
  if (Array.isArray(value)) {
    value.forEach((v) => collect(v, pageTitle, out, context))
    return
  }
  if (!isRecord(value)) return
  if (isImage(value)) {
    if (value.src) {
      // "headGirlImage" is named by "headGirl"; list items by their name, title, label or student
      const sibling = key?.endsWith('Image') ? context?.[key.slice(0, -'Image'.length)] : undefined
      const named = [sibling, context?.name, context?.title, context?.label, context?.student].find((x) => typeof x === 'string' && x.trim()) as string | undefined
      // A real description wins; the placeholder given to imported images does not
      const alt = value.alt?.trim() && value.alt.trim() !== PLACEHOLDER_ALT ? value.alt.trim() : ''
      out.push({ loc: value.src, title: alt || named || pageTitle })
    }
    return
  }
  for (const [k, v] of Object.entries(value)) collect(v, pageTitle, out, value, k)
}

/** The numbered photos of built-in gallery albums live in their folders, not in image fields */
function galleryFolderPhotos(document: PageDocument): SitemapImage[] {
  const board = document.content.find((b) => b.type === 'GalleryBoard')
  const albums = (board?.props as { albums?: { key: string; name: string; folderCount: number; photos: unknown[] }[] } | undefined)?.albums ?? []
  return albums
    .filter((a) => !a.photos?.length && a.folderCount > 0)
    .flatMap((a) =>
      Array.from({ length: a.folderCount }, (_, i) => ({
        loc: albumPhoto({ id: a.key, name: a.name, description: '', category: 'events', cover: '', count: a.folderCount }, i),
        title: `${a.name}, photo ${i + 1}`,
      })),
    )
}

/** Images of every published CMS page, by address (pages without hidden sections' images) */
export async function publishedPageImages(payload: Payload): Promise<Map<string, SitemapImage[]>> {
  const result = new Map<string, SitemapImage[]>()
  const { docs } = await payload.find({ collection: 'pages', where: { _status: { equals: 'published' } }, limit: 500, depth: 0, pagination: false, overrideAccess: false })
  for (const page of docs as Page[]) {
    const migrated = migrateDocument(page.content as unknown as PageDocument, page.schemaVersion)
    const { document } = validateDocument(migrated, blockRegistry, 'repair')
    const visible = { ...document, content: document.content.filter((b) => !(b.props as { hidden?: boolean }).hidden) }
    const resolved = await resolveMedia(payload, visible)
    const images: SitemapImage[] = []
    collect(resolved.content, page.title, images)
    images.push(...galleryFolderPhotos(resolved))
    const seen = new Set<string>()
    result.set(
      page.path,
      images.filter((img) => !seen.has(img.loc) && seen.add(img.loc)),
    )
  }
  return result
}
