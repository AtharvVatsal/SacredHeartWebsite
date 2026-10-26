import { expect, test, type APIRequestContext } from '@playwright/test'
import { apiAs, expectPublic } from './helpers'

// Content kept on one page and shown on others: the toppers lists, the staff list and the notices.
test.describe.configure({ mode: 'serial' })

type Block = { type: string; props: Record<string, unknown> }
type Doc = { id: number; content: { root: unknown; content: Block[] } }

async function pageAt(request: APIRequestContext, headers: Record<string, string>, path: string): Promise<Doc> {
  const res = await request.get(`/api/pages?where[path][equals]=${encodeURIComponent(path)}&draft=true&depth=0`, { headers })
  const doc = (await res.json()).docs[0]
  expect(doc, `seeded page ${path}`).toBeTruthy()
  return doc
}

async function publish(request: APIRequestContext, headers: Record<string, string>, doc: Doc) {
  const res = await request.patch(`/api/pages/${doc.id}`, { data: { content: doc.content, _status: 'published' }, headers })
  expect(res.ok(), await res.text()).toBeTruthy()
}

test('the top five on Achievements follows the Class 10 toppers page once both are published', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  await publish(request, headers, await pageAt(request, headers, '/achievements'))

  const toppers = await pageAt(request, headers, '/achievements/toppers/10th')
  const list = toppers.content.content.find((b) => b.type === 'ToppersList')!
  const sessions = list.props.sessions as { toppers: { name: string; percentage: number }[] }[]
  sessions[0].toppers.unshift({ name: 'E2E LINKED TOPPER', percentage: 99.9, photo: { mediaId: null, src: '', alt: '', position: 'center' } } as never)
  await publish(request, headers, toppers)

  // Achievements was not edited, yet shows the new first place (publishing a shared page refreshes the site)
  await expectPublic(request, '/achievements', 'E2E LINKED TOPPER')
})

test('home notices follow the Notifications page', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  const notices = await pageAt(request, headers, '/notifications')
  const board = notices.content.content.find((b) => b.type === 'NotificationsBoard')!
  ;(board.props.notices as unknown[]).unshift({ title: 'E2E linked notice', text: 'Shown on the home page too', date: '2026-10', important: false, attachment: '' })
  await publish(request, headers, notices)
  await expectPublic(request, '/notifications', 'E2E linked notice')

  // The home page is only previewed here (its published state belongs to the workflow tests)
  await expect
    .poll(async () => (await (await request.get('/cms/preview?path=/', { headers })).text()).includes('E2E linked notice'), { timeout: 30_000 })
    .toBe(true)
})

test('the staff count on About Us follows the staff list', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  const staff = await pageAt(request, headers, '/about/staff')
  const directory = staff.content.content.find((b) => b.type === 'StaffList')!
  const members = directory.props.members as unknown[]
  const count = members.length + 1
  members.push({ name: 'E2E STAFF MEMBER', role: 'Teacher', department: 'Science', qualifications: 'M.SC', photo: { mediaId: null, src: '', alt: '', position: 'center' } })
  await publish(request, headers, staff)
  await publish(request, headers, await pageAt(request, headers, '/about'))
  await expectPublic(request, '/about', `>${count}</p>`)
  await expectPublic(request, '/about/staff', 'E2E STAFF MEMBER')
})
