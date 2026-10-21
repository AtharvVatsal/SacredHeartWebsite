// Repeatable migration of the existing pages into the CMS.
//
//   npm run cms:seed                     create missing pages as drafts (never touches existing pages)
//   npm run cms:seed -- /about           only this page
//   npm run cms:seed -- --force /about   replace this page's draft with a fresh copy of the built-in content
//
// Pages are created as drafts: the public site keeps showing the built-in page until an administrator has
// checked the draft and publishes it (see docs/cms-migration-plan.md). Images are copied into the media library.
import config from '@payload-config'
import { getPayload } from 'payload'
import { blockRegistry } from '../blocks/definitions'
import { CURRENT_SCHEMA_VERSION } from '../document/migrations'
import { validateDocument } from '../document/validate'
import type { SeedPage } from './builders'
import { importImages } from './media'
import { homePage, homeSeo } from './pages/home'
import { legalSeo, privacyPage, termsPage } from './pages/legal'

const SEEDS: { seed: SeedPage; seo?: { title?: string; description?: string } }[] = [
  { seed: homePage, seo: homeSeo },
  { seed: privacyPage, seo: legalSeo['/privacy'] },
  { seed: termsPage, seo: legalSeo['/terms'] },
]

// payload run passes positional arguments only ("--force" arrives as a plain word)
const args = process.argv.slice(2)
const force = args.includes('--force') || args.includes('force')
const only = args.filter((a) => a.startsWith('/'))

async function main() {
  const payload = await getPayload({ config })
  const selected = SEEDS.filter((s) => !only.length || only.includes(s.seed.path))
  if (!selected.length) throw new Error(`No seed for ${only.join(', ')}. Known pages: ${SEEDS.map((s) => s.seed.path).join(', ')}`)

  for (const { seed, seo } of selected) {
    const { ok, issues } = validateDocument(seed.document, blockRegistry, 'strict')
    if (!ok) throw new Error(`The seed for ${seed.path} is not valid:\n${issues.map((i) => `  ${i.label}: ${i.message}`).join('\n')}`)

    const existing = await payload.find({ collection: 'pages', where: { path: { equals: seed.path } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
    const current = existing.docs[0]
    if (current && !force) {
      console.log(`skip  ${seed.path} (already in the CMS; use --force to replace its draft)`)
      continue
    }
    const content = await importImages(payload, seed.document)
    const data = { title: seed.title, path: seed.path, kind: 'builtIn' as const, content: content as never, schemaVersion: CURRENT_SCHEMA_VERSION, seo, _status: 'draft' as const }
    if (current) {
      await payload.update({ collection: 'pages', id: current.id, data, draft: true, overrideAccess: true, context: { trustedSeed: true } })
      console.log(`draft ${seed.path} replaced with a fresh copy (${seed.document.content.length} sections)`)
    } else {
      await payload.create({ collection: 'pages', data, draft: true, overrideAccess: true, context: { trustedSeed: true } })
      console.log(`draft ${seed.path} created (${seed.document.content.length} sections)`)
    }
  }
  process.exit(0)
}

// Top-level await: payload run exits as soon as this module finishes importing
await main().catch((error) => {
  console.error(`Seeding failed: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
