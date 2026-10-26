import 'server-only'
import { cache } from 'react'
import { draftMode, headers } from 'next/headers'
import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import { blockRegistry } from '../blocks/definitions'
import { migrateDocument } from '../document/migrations'
import type { BlockIssue, PageDocument } from '../document/types'
import { validateDocument } from '../document/validate'
import { getPayloadSafe } from './payload'
import type { LinkedData } from '../blocks/shared/linked'
import { loadLinkedData } from './linked-data'
import { resolveMedia } from './resolve-media'

export interface LoadedPage {
  page: Page
  document: PageDocument
  issues: BlockIssue[]
  preview: boolean
  /** Content this page shows from other pages */
  linked: LinkedData
}

/** Is the current request an authenticated preview? Only then are drafts read. */
async function previewUser(payload: Payload) {
  const draft = await draftMode()
  if (!draft.isEnabled) return null
  const { user } = await payload.auth({ headers: await headers() })
  return user ?? null
}

/**
 * The CMS version of the page at `path`, ready to render, or null when the route should keep its built-in
 * implementation: no CMS page exists, it is not published, it is empty, the CMS is switched off, or the
 * database cannot be reached. Visitors only ever get published content; signed-in staff in preview get drafts.
 */
export const loadCmsPage = cache(async (path: string, opts: { allowEmpty?: boolean } = {}): Promise<LoadedPage | null> => {
  if (process.env.CMS_PAGES_ENABLED === 'false') return null
  const payload = await getPayloadSafe()
  if (!payload) return null
  try {
    const user = await previewUser(payload)
    const result = await payload.find({
      collection: 'pages',
      where: { path: { equals: path } },
      limit: 1,
      depth: 0,
      draft: Boolean(user),
      overrideAccess: false,
      user: user ?? undefined,
    })
    const page = result.docs[0] as Page | undefined
    if (!page) return null
    if (!user && page._status !== 'published') return null

    const migrated = migrateDocument((page.content as unknown as PageDocument) ?? { root: { props: {} }, content: [] }, page.schemaVersion)
    const { document, issues } = validateDocument(migrated, blockRegistry, 'repair')
    if (!document.content.length && !opts.allowEmpty) return null
    if (issues.length) console.warn(`[cms] ${path}: ${issues.length} section problem(s) skipped or repaired`)
    return { page, document: await resolveMedia(payload, document), issues, preview: Boolean(user), linked: await loadLinkedData(payload, document, user) }
  } catch (error) {
    console.warn(`[cms] Could not load ${path}, using the built-in page: ${(error as Error).message}`)
    return null
  }
})
