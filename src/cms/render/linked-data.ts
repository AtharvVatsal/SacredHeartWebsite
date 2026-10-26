import 'server-only'
// Collects the content a page shows from other pages, so it is edited in one place. Today: the top five
// toppers block reads the topper lists kept on the Class 10 and Class 12 toppers pages. Visitors get the
// published lists; previews and the editor get the latest drafts.
import type { Payload, TypedUser } from 'payload'
import type { Page } from '@/payload-types'
import { blockRegistry } from '../blocks/definitions'
import { TOPPER_SOURCES } from '../blocks/pages/achievements.definitions'
import { toNotifications, toTopperSessions, type LinkedData } from '../blocks/shared/linked'
import { migrateDocument } from '../document/migrations'
import { isRecord, type PageDocument } from '../document/types'
import { validateDocument } from '../document/validate'
import { resolveMedia } from './resolve-media'

function sourcesIn(document: PageDocument) {
  const sources = new Set<string>()
  for (const block of document.content) {
    if (block.type === 'ClassChooser') TOPPER_SOURCES.forEach((s) => sources.add(s))
    if (block.type !== 'TopperHighlights') continue
    const columns = (block.props as { columns?: unknown }).columns
    if (Array.isArray(columns)) for (const c of columns) if (isRecord(c) && typeof c.source === 'string') sources.add(c.source)
  }
  return sources
}

export const STAFF_PAGE = '/about/staff'
export const NOTIFICATIONS_PAGE = '/notifications'

async function loadSource(payload: Payload, path: string, user: TypedUser | null): Promise<PageDocument | null> {
  const { docs } = await payload.find({ collection: 'pages', where: { path: { equals: path } }, limit: 1, depth: 0, draft: Boolean(user), overrideAccess: false, user: user ?? undefined })
  const page = docs[0] as Page | undefined
  if (!page || (!user && page._status !== 'published')) return null
  const migrated = migrateDocument(page.content as unknown as PageDocument, page.schemaVersion)
  return validateDocument(migrated, blockRegistry, 'repair').document
}

export async function loadLinkedData(payload: Payload, document: PageDocument, user: TypedUser | null): Promise<LinkedData> {
  const linked: LinkedData = { toppers: {} }
  // Notice lists set to show the Notifications page's notices
  if (document.content.some((b) => b.type === 'NoticesList' && (b.props as { source?: string }).source !== 'own')) {
    try {
      const source = await loadSource(payload, NOTIFICATIONS_PAGE, user)
      const board = source?.content.find((b) => b.type === 'NotificationsBoard' && !(b.props as { hidden?: boolean }).hidden)
      const notices = (board?.props as { notices?: Parameters<typeof toNotifications>[0] } | undefined)?.notices
      if (Array.isArray(notices)) linked.notifications = toNotifications(notices)
    } catch (error) {
      console.warn(`[cms] Could not read ${NOTIFICATIONS_PAGE} for the notices: ${(error as Error).message}`)
    }
  }
  // Figures set to count the staff (a "count": "staff" choice anywhere on the page)
  if (JSON.stringify(document.content).includes('"count":"staff"')) {
    try {
      const source = await loadSource(payload, STAFF_PAGE, user)
      const list = source?.content.find((b) => b.type === 'StaffList' && !(b.props as { hidden?: boolean }).hidden)
      const members = (list?.props as { members?: unknown[] } | undefined)?.members
      if (Array.isArray(members)) linked.staffCount = members.length
    } catch (error) {
      console.warn(`[cms] Could not read ${STAFF_PAGE} for the staff count: ${(error as Error).message}`)
    }
  }
  for (const path of sourcesIn(document)) {
    try {
      const { docs } = await payload.find({ collection: 'pages', where: { path: { equals: path } }, limit: 1, depth: 0, draft: Boolean(user), overrideAccess: false, user: user ?? undefined })
      const page = docs[0] as Page | undefined
      if (!page || (!user && page._status !== 'published')) continue
      const migrated = migrateDocument(page.content as unknown as PageDocument, page.schemaVersion)
      const { document: source } = validateDocument(migrated, blockRegistry, 'repair')
      const list = (await resolveMedia(payload, source)).content.find((b) => b.type === 'ToppersList' && !(b.props as { hidden?: boolean }).hidden)
      if (list) linked.toppers[path] = toTopperSessions((list.props as unknown as { sessions: Parameters<typeof toTopperSessions>[0] }).sessions)
    } catch (error) {
      console.warn(`[cms] Could not read ${path} for a linked section: ${(error as Error).message}`)
    }
  }
  return linked
}
