// Shapes of the content one page shows from another (server-safe; see LinkedData.tsx and render/linked-data.ts)
import type { TopperSession } from '@/data/toppers'

export interface LinkedData {
  /** Topper sessions by the address of the toppers page that holds them */
  toppers: Record<string, TopperSession[]>
  /** How many people the Staff page lists (for figures that count them) */
  staffCount?: number
}

/** A CMS topper list in the shape the toppers components use */
export function toTopperSessions(sessions: { year: string; toppers: { name: string; percentage: number; photo: { src: string } }[] }[]): TopperSession[] {
  return sessions.map((s, i) => ({
    year: s.year,
    folder: `${i}-${s.year}`,
    toppers: s.toppers.map((t, n) => ({ id: `${i}-${n}`, name: t.name, percentage: t.percentage, image: t.photo.src || undefined })),
  }))
}
