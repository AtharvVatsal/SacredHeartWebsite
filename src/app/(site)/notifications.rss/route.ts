import { legacyNotificationsFeed } from '@/content/notifications-feed'
import { getPayloadSafe } from '@/cms/render/payload'
import { blockRegistry } from '@/cms/blocks/definitions'
import { NOTIFICATIONS_PAGE } from '@/cms/blocks/shared/linked'
import { migrateDocument } from '@/cms/document/migrations'
import type { PageDocument } from '@/cms/document/types'
import { validateDocument } from '@/cms/document/validate'
import { absoluteUrl } from '@/lib/seo'
import { schoolInfo } from '@/data/school'
import type { Page } from '@/payload-types'

// The notifications feed. Built at build time and rebuilt when the Notifications page is published.
// Until that page is published in the CMS, the feed published before the CMS is served unchanged.
export const dynamic = 'force-static'

type Notice = { title: string; text: string; date: string; attachment: string }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2025-05" or "2025-05-14" → an RFC 822 date at midnight in India, as the original feed wrote them */
function rfc822(date: string): string | null {
  const m = date.trim().match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/)
  if (!m) return null
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3] ?? 1)]
  const day = new Date(Date.UTC(y, mo - 1, d))
  if (day.getUTCMonth() !== mo - 1) return null
  return `${WEEKDAYS[day.getUTCDay()]}, ${String(d).padStart(2, '0')} ${MONTHS[mo - 1]} ${y} 00:00:00 +0530`
}

async function publishedNotices(): Promise<{ notices: Notice[]; updatedAt: string } | null> {
  if (process.env.CMS_PAGES_ENABLED === 'false') return null
  const payload = await getPayloadSafe()
  if (!payload) return null
  try {
    const { docs } = await payload.find({ collection: 'pages', where: { path: { equals: NOTIFICATIONS_PAGE } }, limit: 1, depth: 0, overrideAccess: false })
    const page = docs[0] as Page | undefined
    if (!page || page._status !== 'published') return null
    const migrated = migrateDocument(page.content as unknown as PageDocument, page.schemaVersion)
    const { document } = validateDocument(migrated, blockRegistry, 'repair')
    const board = document.content.find((b) => b.type === 'NotificationsBoard' && !(b.props as { hidden?: boolean }).hidden)
    if (!board) return null
    return { notices: (board.props as unknown as { notices: Notice[] }).notices, updatedAt: page.updatedAt }
  } catch {
    return null
  }
}

/** Stays the same when other notices are added or reordered, so feed readers do not repeat old notices */
const guidOf = (n: Notice) =>
  `shs-notice-${n.date.trim()}-${n.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)}`

function buildFeed(notices: Notice[], updatedAt: string): string {
  const link = absoluteUrl(NOTIFICATIONS_PAGE)
  const built = new Date(updatedAt)
  const items = notices.map((n) => {
    const pub = rfc822(n.date)
    // A notice with a PDF links to the document; the others link to the Notifications page
    const href = n.attachment ? (/^https?:\/\//i.test(n.attachment) ? n.attachment : absoluteUrl(encodeURI(n.attachment))) : link
    return [
      '    <item>',
      `      <title>${esc(n.title)}</title>`,
      `      <link>${esc(href)}</link>`,
      `      <guid isPermaLink="false">${esc(guidOf(n))}</guid>`,
      ...(pub ? [`      <pubDate>${pub}</pubDate>`] : []),
      `      <description>${esc(n.text)}</description>`,
      '    </item>',
    ].join('\n')
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(`${schoolInfo.name}, Sidhpur — Notifications`)}</title>
    <link>${esc(link)}</link>
    <description>Latest notices, circulars and announcements from Sacred Heart Senior Secondary School, Sidhpur, Dharamshala.</description>
    <language>en-in</language>
    <lastBuildDate>${built.toUTCString().replace('GMT', '+0000')}</lastBuildDate>
    <atom:link href="${esc(absoluteUrl('/notifications.rss'))}" rel="self" type="application/rss+xml" />

${items.join('\n\n')}
  </channel>
</rss>
`
}

export async function GET() {
  const published = await publishedNotices()
  const xml = published ? buildFeed(published.notices, published.updatedAt) : legacyNotificationsFeed
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
