'use server'

// Save and publish from the visual editor. Every call re-checks who is signed in and goes through Payload with
// overrideAccess: false, so the same access rules as the admin and REST API apply (editors cannot publish).
import config from '@payload-config'
import { headers } from 'next/headers'
import { APIError, Forbidden, getPayload, ValidationError } from 'payload'
import { blockRegistry } from '../blocks/definitions'
import { isRecord, type BlockIssue } from '../document/types'
import { MAX_DOCUMENT_BYTES, validateDocument } from '../document/validate'

export type SaveResult =
  | { ok: true; status: 'draft' | 'published'; savedAt: string; issues: BlockIssue[] }
  | { ok: false; error: string; issues?: BlockIssue[] }

async function signedIn() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return { payload, user }
}

function friendly(error: unknown): string {
  if (error instanceof Forbidden) return 'You do not have permission to do this. Editors can save drafts; an administrator publishes.'
  if (error instanceof ValidationError) return error.data?.errors?.map((e: { message: string }) => e.message).join('; ') || 'Some fields are not valid.'
  if (error instanceof APIError && error.isPublic) return error.message
  console.error('[cms] editor save failed', error)
  return 'The page could not be saved because of a problem on the server. Your changes are still in this window; try again in a moment.'
}

function checkShape(data: unknown): string | null {
  if (!isRecord(data) || !Array.isArray(data.content)) return 'The page content is not in the expected format.'
  if (JSON.stringify(data).length > MAX_DOCUMENT_BYTES) return 'The page is too large to save. Split it into smaller pages.'
  return null
}

export async function saveDraftAction(id: number, data: unknown): Promise<SaveResult> {
  const { payload, user } = await signedIn()
  if (!user) return { ok: false, error: 'You have been signed out. Sign in again in another tab, then save.' }
  const shapeError = checkShape(data)
  if (shapeError) return { ok: false, error: shapeError }
  // Drafts may be incomplete; problems are reported but do not stop the save
  const { issues } = validateDocument(data, blockRegistry, 'strict')
  try {
    const doc = await payload.update({ collection: 'pages', id, data: { content: data as never, _status: 'draft' }, draft: true, user, overrideAccess: false, depth: 0 })
    return { ok: true, status: 'draft', savedAt: String(doc.updatedAt), issues }
  } catch (error) {
    return { ok: false, error: friendly(error) }
  }
}

export async function publishAction(id: number, data: unknown): Promise<SaveResult> {
  const { payload, user } = await signedIn()
  if (!user) return { ok: false, error: 'You have been signed out. Sign in again in another tab, then publish.' }
  if ((user as { role?: string }).role !== 'admin') return { ok: false, error: 'Only administrators can publish. Save a draft and ask an administrator to publish it.' }
  const shapeError = checkShape(data)
  if (shapeError) return { ok: false, error: shapeError }
  const { ok, issues, document } = validateDocument(data, blockRegistry, 'strict')
  if (!ok) return { ok: false, error: 'Some sections need attention before this page can be published.', issues }
  try {
    const doc = await payload.update({ collection: 'pages', id, data: { content: document as never, _status: 'published' }, user, overrideAccess: false, depth: 0 })
    if (doc._status !== 'published') return { ok: false, error: 'The page was saved but is not published. Please try again.' }
    return { ok: true, status: 'published', savedAt: String(doc.updatedAt), issues: [] }
  } catch (error) {
    return { ok: false, error: friendly(error) }
  }
}
