// Copies the images a seeded page uses from /public into the media library, so editors can see, replace and
// reuse them. Each file is imported once; later runs reuse the existing library entry (matched by its label).
import fs from 'node:fs'
import path from 'node:path'
import type { Payload } from 'payload'
import { isRecord } from '../document/types'
import { toSitePath } from '../render/media'

const PUBLIC = path.resolve(process.cwd(), 'public')

async function importFile(payload: Payload, src: string, alt: string, cache: Map<string, { id: number; url: string; width?: number; height?: number }>) {
  if (cache.has(src)) return cache.get(src)!
  const label = `Site image ${src}`
  const existing = await payload.find({ collection: 'media', where: { label: { equals: label } }, limit: 1, depth: 0, overrideAccess: true })
  let doc = existing.docs[0]
  if (!doc) {
    const file = path.join(PUBLIC, decodeURIComponent(src))
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) throw new Error(`Image not found in /public: ${src}`)
    doc = await payload.create({
      collection: 'media',
      // Images without a description get a neutral one; editors can refine it in the media library
      data: { alt: alt || 'Photo from Sacred Heart Senior Secondary School', label, folder: 'Imported from the site' },
      filePath: file,
      overrideAccess: true,
    })
  }
  const value = { id: Number(doc.id), url: doc.url ? toSitePath(doc.url) : src, width: doc.width ?? undefined, height: doc.height ?? undefined }
  cache.set(src, value)
  return value
}

/** Returns a copy of `value` where every image that points at /public has been linked to the media library */
export async function importImages<T>(payload: Payload, value: T, cache = new Map()): Promise<T> {
  if (Array.isArray(value)) return (await Promise.all(value.map((v) => importImages(payload, v, cache)))) as T
  if (!isRecord(value)) return value
  if ('mediaId' in value && 'src' in value && !value.mediaId && typeof value.src === 'string' && value.src.startsWith('/')) {
    const media = await importFile(payload, value.src, typeof value.alt === 'string' ? value.alt : '', cache)
    return { ...value, mediaId: media.id, src: media.url, width: media.width, height: media.height } as T
  }
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(value)) out[k] = await importImages(payload, v, cache)
  return out as T
}
