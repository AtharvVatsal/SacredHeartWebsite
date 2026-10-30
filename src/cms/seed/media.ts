// Copies the images a seeded page uses from /public into the media library, so editors can see, replace and
// reuse them. Each file is imported once; later runs reuse the existing library entry (matched by its label).
import fs from 'node:fs'
import path from 'node:path'
import type { Payload } from 'payload'
import { isRecord } from '../document/types'
import { PLACEHOLDER_ALT, toSitePath } from '../render/media'

const PUBLIC = path.resolve(process.cwd(), 'public')

type Imported = { id: number; url: string; width?: number; height?: number }
export type ImportOptions = {
  /** Media library folder for new entries */
  folder?: string
  /** File name in the library (by default the file's own name, so several 01.webp become 01-1.webp...) */
  fileName?: (src: string) => string
}

const MIME: Record<string, string> = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.avif': 'image/avif', '.gif': 'image/gif', '.pdf': 'application/pdf' }

async function importFile(payload: Payload, src: string, alt: string, cache: Map<string, Imported>, { folder = 'Imported from the site', fileName }: ImportOptions) {
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
      data: { alt: alt || PLACEHOLDER_ALT, label, folder },
      ...(fileName
        ? { file: { data: fs.readFileSync(file), mimetype: MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream', name: fileName(src), size: fs.statSync(file).size } }
        : { filePath: file }),
      overrideAccess: true,
    })
  }
  const value = { id: Number(doc.id), url: doc.url ? toSitePath(doc.url) : src, width: doc.width ?? undefined, height: doc.height ?? undefined }
  cache.set(src, value)
  return value
}

/** Returns a copy of `value` where every image that points at /public has been linked to the media library */
export async function importImages<T>(payload: Payload, value: T, cache = new Map<string, Imported>(), options: ImportOptions = {}): Promise<T> {
  if (Array.isArray(value)) {
    // One at a time: files with the same name (e.g. several 01.webp) must not be uploaded concurrently
    const out: unknown[] = []
    for (const v of value) out.push(await importImages(payload, v, cache, options))
    return out as T
  }
  if (!isRecord(value)) return value
  if ('mediaId' in value && 'src' in value && !value.mediaId && typeof value.src === 'string' && value.src.startsWith('/')) {
    const media = await importFile(payload, value.src, typeof value.alt === 'string' ? value.alt : '', cache, options)
    return { ...value, mediaId: media.id, src: media.url, width: media.width, height: media.height } as T
  }
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(value)) out[k] = await importImages(payload, v, cache, options)
  return out as T
}
