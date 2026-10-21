// Images in a page document point at the media library by id. Before rendering, every referenced file is
// looked up in one query so a replaced or re-described image shows up everywhere it is used.
import type { Payload } from 'payload'
import type { Media } from '@/payload-types'
import { isRecord, type PageDocument } from '../document/types'
import { mediaUrl } from './media'

type Img = { mediaId?: number | null; src?: string; alt?: string; width?: number; height?: number }

const isImage = (v: unknown): v is Img => isRecord(v) && 'mediaId' in v && 'src' in v

function collect(value: unknown, ids: Set<number>) {
  if (Array.isArray(value)) value.forEach((v) => collect(v, ids))
  else if (isRecord(value)) {
    if (isImage(value) && typeof value.mediaId === 'number') ids.add(value.mediaId)
    Object.values(value).forEach((v) => collect(v, ids))
  }
}

function apply(value: unknown, found: Map<number, Media>): unknown {
  if (Array.isArray(value)) return value.map((v) => apply(v, found))
  if (!isRecord(value)) return value
  if (isImage(value) && typeof value.mediaId === 'number') {
    const media = found.get(value.mediaId)
    if (!media) return { ...value, mediaId: null, src: '' } // the file was removed: show nothing rather than a broken image
    return {
      ...value,
      src: mediaUrl(media) ?? value.src,
      alt: value.alt || media.alt || '',
      width: media.width ?? undefined,
      height: media.height ?? undefined,
    }
  }
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, apply(v, found)]))
}

export async function resolveMedia(payload: Payload, document: PageDocument): Promise<PageDocument> {
  const ids = new Set<number>()
  collect(document.content, ids)
  if (!ids.size) return document
  const { docs } = await payload.find({ collection: 'media', where: { id: { in: [...ids] } }, limit: ids.size, depth: 0, pagination: false, overrideAccess: false })
  const found = new Map(docs.map((m) => [Number(m.id), m as Media]))
  return { ...document, content: apply(document.content, found) as PageDocument['content'] }
}
