import path from 'node:path'
import { expect, test } from '@playwright/test'
import { apiAs, canvas, creds, expectPublic, field, homePageId, openEditor, sectionIds, selectSection, signIn } from './helpers'

// The full editing workflow, in order, as an administrator would use it
test.describe.configure({ mode: 'serial' })

let homeId = 0

test('administrator signs in and sees the dashboard', async ({ page, request }) => {
  await signIn(page, 'admin')
  await expect(page.getByText('Create a new page')).toBeVisible()
  await expect(page.getByText('School details, menu and footer')).toBeVisible()
  homeId = await homePageId(request, await apiAs(request, 'admin'))
  expect(homeId).toBeGreaterThan(0)
})

test('the page screen links to the visual editor', async ({ page }) => {
  await signIn(page, 'admin')
  await page.goto(`/admin/collections/pages/${homeId}`)
  await page.getByRole('link', { name: 'Edit visually' }).first().click()
  await expect(page).toHaveURL(new RegExp(`/cms/editor/${homeId}$`))
  await expect(canvas(page).locator('[data-puck-component]')).toHaveCount(12)
  await expect(page.getByText('Draft · not published yet')).toBeVisible()
})

test('editing text, saving a draft and previewing it leaves the public page unchanged', async ({ page, request }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  await selectSection(page, 'HomeHero-1')
  const lead = field(page, 'headingLead')
  await lead.fill('Welcome to our school,')
  await expect(page.getByText('Unsaved changes')).toBeVisible()
  await expect(canvas(page).getByText('Welcome to our school,')).toBeVisible()

  await page.getByRole('button', { name: 'Save draft' }).click()
  await expect(page.getByText(/Draft saved. Visitors do not see it/)).toBeVisible()

  // Visitors still see the original page
  await expectPublic(request, '/', 'Welcome to our school,', false)

  // Preview shows the draft, clearly labelled
  await page.goto('/cms/preview?path=/')
  await expect(page.locator('[data-cms-preview-banner]')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to our school,')
})

test('changes persist after reloading the editor', async ({ page }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  await selectSection(page, 'HomeHero-1')
  await expect(field(page, 'headingLead')).toHaveValue('Welcome to our school,')
})

test('publishing makes the change visible to visitors', async ({ page, request }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  page.once('dialog', (d) => d.accept())
  await page.getByRole('button', { name: 'Publish' }).click()
  await expect(page.getByText(/Published\. The page is now live/)).toBeVisible()
  await expect(page.getByText('Published · up to date')).toBeVisible()
  await expectPublic(request, '/', 'Welcome to our school,')
})

test('sections can be duplicated and deleted (with confirmation)', async ({ page }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  const before = await sectionIds(page)
  await selectSection(page, 'StatsRow-3')
  await canvas(page).getByTitle('Duplicate section').click()
  await expect.poll(async () => (await sectionIds(page)).length).toBe(before.length + 1)

  // Cancelling the confirmation keeps the section
  await selectSection(page, 'StatsRow-3')
  page.once('dialog', (d) => d.dismiss())
  await canvas(page).getByTitle('Delete section').click()
  await expect.poll(async () => (await sectionIds(page)).length).toBe(before.length + 1)

  page.once('dialog', (d) => d.accept())
  await canvas(page).getByTitle('Delete section').click()
  await expect.poll(async () => (await sectionIds(page)).length).toBe(before.length)

  // Undo brings it back
  await page.keyboard.press('Control+z')
  await expect.poll(async () => (await sectionIds(page)).length).toBe(before.length + 1)
})

test('sections can be added from the library and reordered by dragging', async ({ page }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  const before = await sectionIds(page)

  // Drag "Notice box" from the library onto the top of the page
  const item = page.getByTestId('drawer-item:Callout')
  const target = canvas(page).locator('[data-puck-component="HomeHero-1"]')
  const from = await item.boundingBox()
  const to = await target.boundingBox()
  if (!from || !to) throw new Error('drag handles not found')
  await page.mouse.move(from.x + 20, from.y + from.height / 2)
  await page.mouse.down()
  for (let i = 1; i <= 15; i++) await page.mouse.move(from.x + ((to.x + 60 - from.x) * i) / 15, from.y + ((to.y + 10 - from.y) * i) / 15)
  await page.mouse.up()
  await expect.poll(async () => (await sectionIds(page)).length).toBe(before.length + 1)
  const after = await sectionIds(page)
  expect(after.some((id) => id.startsWith('Callout'))).toBe(true)

  // Reorder: drag the new notice box from above the hero to below it (both are on screen)
  const noticeId = after.find((id) => id.startsWith('Callout'))!
  expect(after.indexOf(noticeId)).toBeLessThan(after.indexOf('HomeHero-1'))
  const notice = canvas(page).locator(`[data-puck-component="${noticeId}"]`)
  const hero = canvas(page).locator('[data-puck-component="HomeHero-1"]')
  const n = await notice.boundingBox()
  const h = await hero.boundingBox()
  if (!n || !h) throw new Error('sections not found')
  const startY = n.y + n.height / 2
  const endY = Math.min(h.y + h.height - 15, 880)
  await page.mouse.move(n.x + 40, startY)
  await page.mouse.down()
  for (let i = 1; i <= 20; i++) await page.mouse.move(n.x + 40, startY + ((endY - startY) * i) / 20)
  await page.mouse.up()
  await expect.poll(async () => (await sectionIds(page)).indexOf(noticeId) > (await sectionIds(page)).indexOf('HomeHero-1')).toBe(true)

  page.once('dialog', (d) => d.accept())
  await page.getByRole('button', { name: 'Save draft' }).click()
  await expect(page.getByText(/Draft saved. Visitors do not see it/)).toBeVisible()
})

test('an image can be uploaded with a description and used on the page', async ({ page }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  await selectSection(page, 'QuoteFeature-6')
  page.once('dialog', (d) => d.accept('A test photo of the principal'))
  const chooser = page.waitForEvent('filechooser')
  await page.getByRole('button', { name: 'Upload new image' }).filter({ visible: true }).first().click()
  await (await chooser).setFiles(path.join(process.cwd(), 'public/images/principal.webp'))
  await expect(page.getByText('Uploaded and added to the media library.').filter({ visible: true })).toBeVisible()
  await expect(page.locator('input[id$="-alt"]:visible').first()).toHaveValue('A test photo of the principal')
  await expect(canvas(page).locator('[data-puck-component="QuoteFeature-6"] img')).toHaveAttribute('src', /api(%2F|\/)media(%2F|\/)file/)
  await page.getByRole('button', { name: 'Save draft' }).click()
  await expect(page.getByText(/Draft saved. Visitors do not see it/)).toBeVisible()
})

test('a hidden section disappears for visitors after publishing', async ({ page, request }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  await selectSection(page, 'HighlightStory-11')
  // Click the visible "Hide" option the way a person would (Puck styles the label over the radio input)
  await page.locator('label:has(input[name="hidden"])').filter({ visible: true }).filter({ hasText: 'Hide' }).first().click()
  await expect(canvas(page).getByText(/Hidden from visitors/)).toBeVisible()
  page.once('dialog', (d) => d.accept())
  await page.getByRole('button', { name: 'Publish' }).click()
  await expect(page.getByText(/Published\. The page is now live/)).toBeVisible()
  await expectPublic(request, '/', 'With great pride and enthusiasm he was welcomed', false)
})

test('an earlier version can be restored', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  const versions = await (await request.get(`/api/pages/versions?where[parent][equals]=${homeId}&sort=createdAt&limit=100&depth=0`, { headers })).json()
  // The first published version still had the Chandrayaan section and the new headline
  const target = versions.docs.find((v: { version: { _status: string } }) => v.version._status === 'published')
  expect(target).toBeTruthy()
  const restored = await request.post(`/api/pages/versions/${target.id}`, { headers })
  expect(restored.ok()).toBeTruthy()
  await expectPublic(request, '/', 'With great pride and enthusiasm he was welcomed')
})

test('an editor can save drafts but cannot publish', async ({ page, request }) => {
  await signIn(page, 'editor')
  await openEditor(page, homeId)
  await expect(page.getByRole('button', { name: 'Publish' })).toHaveCount(0)
  await expect(page.getByText('An administrator publishes your draft.')).toBeVisible()
  await selectSection(page, 'HomeHero-1')
  await field(page, 'badgeOneMain').fill('Editor draft badge')
  await page.getByRole('button', { name: 'Save draft' }).click()
  await expect(page.getByText(/Draft saved. Visitors do not see it/)).toBeVisible()
  await expectPublic(request, '/', 'Editor draft badge', false)

  // The server refuses a publish even if attempted directly
  const headers = await apiAs(request, 'editor')
  const res = await request.patch(`/api/pages/${homeId}`, { data: { _status: 'published' }, headers })
  expect(res.status()).toBe(403)
  expect((await request.delete(`/api/pages/${homeId}`, { headers })).status()).toBe(403)
  expect((await request.post('/api/globals/site-settings', { data: { header: { applyLabel: 'x' } }, headers })).status()).toBe(403)
  expect((await request.post('/api/users', { data: { email: 'z@y.zz', password: 'aaaaaaaaaaaa1', name: 'z', role: 'admin' }, headers })).status()).toBe(403)
})

test('content with an unsafe link cannot be published', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  const evil = {
    root: { props: {} },
    content: [{ type: 'ButtonRow', props: { id: 'b1', buttons: [{ label: 'Click', href: 'javascript:alert(1)', style: 'green' }], align: 'center', look: { background: 'white', spacing: 'normal', width: 'normal', align: 'left' } } }],
  }
  const res = await request.patch(`/api/pages/${homeId}`, { data: { content: evil, _status: 'published' }, headers })
  expect(res.status()).toBe(400)
  expect(JSON.stringify(await res.json())).toMatch(/Links must start with/)
  // Unknown section types are rejected too
  const unknown = await request.patch(`/api/pages/${homeId}`, { data: { content: { root: { props: {} }, content: [{ type: 'Script', props: { id: 's1' } }] }, _status: 'published' }, headers })
  expect(unknown.status()).toBe(400)
  await expectPublic(request, '/', 'javascript:alert', false)
})

test('a new page can be created, published, moved, and its old address redirects', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  const content = { root: { props: {} }, content: [{ type: 'PageHero', props: { id: 'hero-1', title: 'Sports Day 2026' } }, { type: 'TextSection', props: { id: 'text-1', body: 'Races, games and prizes for every class.' } }] }
  // Built-in and system addresses are refused
  expect((await request.post('/api/pages', { data: { title: 'x', path: '/about', content }, headers })).status()).toBe(400)
  expect((await request.post('/api/pages', { data: { title: 'x', path: '/admin/x', content }, headers })).status()).toBe(400)

  const created = await request.post('/api/pages', { data: { title: 'Sports Day', path: 'Events/Sports Day', content, _status: 'published' }, headers })
  expect(created.ok()).toBeTruthy()
  const page = (await created.json()).doc
  expect(page.path).toBe('/events/sports-day')
  await expectPublic(request, '/events/sports-day', 'Sports Day 2026')

  const moved = await request.patch(`/api/pages/${page.id}`, { data: { path: '/events/sports-day-2026', _status: 'published' }, headers })
  expect(moved.ok()).toBeTruthy()
  await expectPublic(request, '/events/sports-day-2026', 'Races, games and prizes')
  const old = await request.get('/events/sports-day', { maxRedirects: 0 })
  expect([301, 308]).toContain(old.status())
  expect(old.headers()['location']).toContain('/events/sports-day-2026')
  expect((await request.get('/events/never-existed', { maxRedirects: 0 })).status()).toBe(404)

  // The sitemap lists the page at its new address only
  await expectPublic(request, '/sitemap.xml', '/events/sports-day-2026</loc>')
  await expectPublic(request, '/sitemap.xml', '/events/sports-day</loc>', false)
})

test('a file still used on a page cannot be deleted', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  const media = await (await request.get('/api/media?limit=1&where[label][equals]=Site image /images/principal.webp', { headers })).json()
  expect(media.docs.length).toBe(1)
  const res = await request.delete(`/api/media/${media.docs[0].id}`, { headers })
  expect(res.status()).toBe(409)
  expect(JSON.stringify(await res.json())).toMatch(/still used on/)
})

test('leaving the editor with unsaved changes asks first', async ({ page }) => {
  await signIn(page, 'admin')
  await openEditor(page, homeId)
  await selectSection(page, 'HomeHero-1')
  await field(page, 'badgeTwoText').fill('Unsaved change')
  let asked = false
  page.once('dialog', async (d) => {
    asked = d.type() === 'beforeunload'
    await d.dismiss()
  })
  await page.goto('/admin').catch(() => {})
  expect(asked).toBe(true)
})

test('site settings changes appear in the header and footer', async ({ request }) => {
  const headers = await apiAs(request, 'admin')
  const res = await request.post('/api/globals/site-settings', { data: { header: { applyLabel: 'Apply today', applyHref: '/admission', mobileApplyLabel: 'Apply for admission' } }, headers })
  expect(res.ok()).toBeTruthy()
  await expectPublic(request, '/about', 'Apply today')
  await request.post('/api/globals/site-settings', { data: { header: { applyLabel: 'Apply now', applyHref: '/admission', mobileApplyLabel: 'Apply for admission' } }, headers })
  await expectPublic(request, '/about', 'Apply today', false)
  void creds
})
