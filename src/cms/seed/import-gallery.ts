// Moves the photos of the built-in gallery albums into the media library, so editors can replace, reorder, add
// or remove them like any other photo. Run once, after the pages are seeded:
//
//   npm run cms:import-gallery                     every built-in album
//   npm run cms:import-gallery -- diwali voting    only these albums (by their key)
//
// Only the Gallery page's draft changes: visitors keep seeing the published gallery until an administrator has
// previewed the draft and published it. Running it again skips albums that already have a photo list.
import fs from 'node:fs'
import path from 'node:path'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { Page } from '@/payload-types'
import { blockRegistry } from '../blocks/definitions'
import { CURRENT_SCHEMA_VERSION, migrateDocument } from '../document/migrations'
import type { PageDocument } from '../document/types'
import { validateDocument } from '../document/validate'
import { folderAlbums, folderPhotos } from './gallery-photos'
import { importImages } from './media'

const GALLERY = '/gallery'
const keys = process.argv.slice(2).filter((a) => /^[a-z0-9-]+$/.test(a))

async function main() {
  const payload = await getPayload({ config })
  const page = (await payload.find({ collection: 'pages', where: { path: { equals: GALLERY } }, limit: 1, depth: 0, draft: true, overrideAccess: true })).docs[0] as Page | undefined
  if (!page) throw new Error('The Gallery page is not in the CMS yet. Run npm run cms:seed first.')

  const document = migrateDocument(structuredClone(page.content) as unknown as PageDocument, page.schemaVersion)
  const albums = folderAlbums(document, keys)
  const unknown = keys.filter((k) => !albums.some((a) => a.key === k))
  if (unknown.length) console.log(`skip  ${unknown.join(', ')} (not a built-in album, or it already has a photo list)`)
  if (!albums.length) {
    console.log('Nothing to import.')
    process.exit(0)
  }

  // Check every file first, so a missing photo stops the run before anything is imported
  const missing = albums.flatMap((a) => folderPhotos(a).map((p) => p.photo.src)).filter((src) => !fs.existsSync(path.join(process.cwd(), 'public', decodeURIComponent(src))))
  if (missing.length) throw new Error(`These photos are missing from /public:\n  ${missing.join('\n  ')}`)

  const cache = new Map()
  for (const album of albums) {
    album.photos = await importImages(payload, folderPhotos(album), cache, {
      folder: `Gallery: ${album.name}`.slice(0, 60),
      // "diwali-01.webp" rather than one of many "01.webp"
      fileName: (src) => `${album.key}-${path.basename(decodeURIComponent(src))}`,
    })
    album.folderCount = 0
    console.log(`album ${album.key}: ${album.photos.length} photos now in the media library`)
  }

  const { ok, issues, document: checked } = validateDocument(document, blockRegistry, 'strict')
  if (!ok) throw new Error(`The updated gallery is not valid:\n${issues.map((i) => `  ${i.label}: ${i.message}`).join('\n')}`)
  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { content: checked as never, schemaVersion: CURRENT_SCHEMA_VERSION, _status: 'draft' },
    draft: true,
    overrideAccess: true,
    context: { trustedSeed: true },
  })
  console.log(`Saved the Gallery page as a draft (${albums.length} album${albums.length === 1 ? '' : 's'}). Preview it, then publish.`)
  process.exit(0)
}

// Top-level await: payload run exits as soon as this module finishes importing
await main().catch((error) => {
  console.error(`Import failed: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
