// Shapes of the content one page shows from another (server-safe; see LinkedData.tsx and render/linked-data.ts)
import type { TopperSession } from '@/data/toppers'
import type { Notification } from '@/types'

export interface LinkedData {
  /** Topper sessions by the address of the toppers page that holds them */
  toppers: Record<string, TopperSession[]>
  /** How many people the Staff page lists (for figures that count them) */
  staffCount?: number
  /** The notices on the Notifications page (for lists elsewhere that show them) */
  notifications?: Notification[]
}

/** A CMS topper list in the shape the toppers components use */
export function toTopperSessions(sessions: { year: string; toppers: { name: string; percentage: number; photo: { src: string } }[] }[]): TopperSession[] {
  return sessions.map((s, i) => ({
    year: s.year,
    folder: `${i}-${s.year}`,
    toppers: s.toppers.map((t, n) => ({ id: `${i}-${n}`, name: t.name, percentage: t.percentage, image: t.photo.src || undefined })),
  }))
}

type NoticeInput = { title: string; text: string; date: string; important: boolean; attachment: string }

/** CMS notices in the shape the notifications components use */
export function toNotifications(notices: NoticeInput[]): Notification[] {
  return notices.map((n, i) => ({ id: String(i), title: n.title, description: n.text, date: n.date, important: n.important, ...(n.attachment ? { attachment: n.attachment } : {}) }))
}

/** Pages whose content other pages show. Publishing one of them refreshes the whole site, not just itself. */
export const STAFF_PAGE = '/about/staff'
export const NOTIFICATIONS_PAGE = '/notifications'
export const LINKED_SOURCE_PATHS: readonly string[] = ['/achievements/toppers/10th', '/achievements/toppers/12th', STAFF_PAGE, NOTIFICATIONS_PAGE]
