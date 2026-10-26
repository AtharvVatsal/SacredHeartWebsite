import { expect, test } from '@playwright/test'
import { creds, homePageId, apiAs } from './helpers'

// What a member of the public (not signed in) can and cannot do

test.describe('anonymous visitor', () => {
  test('cannot open the visual editor or preview', async ({ page }) => {
    await page.goto('/cms/editor/1')
    await expect(page).toHaveURL(/\/admin\/login/)
    await page.goto('/cms/preview?path=/')
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('cannot read drafts through the API', async ({ request, playwright }) => {
    // Save an unpublished change to a page that may be published, as an administrator
    const admin = await playwright.request.newContext({ baseURL: creds().base })
    const headers = await apiAs(admin, 'admin')
    const home = await homePageId(admin, headers)
    const draft = (await (await admin.get(`/api/pages/${home}?draft=true&depth=0`, { headers })).json()) as { content: { content: { props: Record<string, unknown> }[] } }
    draft.content.content[0].props.subtitle = 'E2E DRAFT-ONLY MARKER'
    expect((await admin.patch(`/api/pages/${home}?draft=true`, { data: { content: draft.content }, headers })).ok()).toBeTruthy()
    // The marker really is in the saved draft (so the checks below are meaningful)
    expect(await (await admin.get(`/api/pages/${home}?draft=true&depth=0`, { headers })).text()).toContain('E2E DRAFT-ONLY MARKER')
    await admin.dispose()

    // Visitors only ever get published pages, never draft content
    for (const url of ['/api/pages', '/api/pages?draft=true', '/api/pages?where[_status][equals]=draft', `/api/pages/${home}?draft=true`]) {
      const res = await request.get(url)
      const text = await res.text()
      expect(text, url).not.toContain('E2E DRAFT-ONLY MARKER')
      if (res.ok()) {
        const body = JSON.parse(text)
        for (const doc of body.docs ?? [body]) expect(doc._status, url).toBe('published')
      }
    }
    expect((await request.get('/api/pages/versions')).status()).toBe(403)
  })

  test('cannot write anything', async ({ request }) => {
    const origin = { Origin: creds().base }
    const attempts = [
      request.post('/api/pages', { data: { title: 'x', path: '/x', content: { root: { props: {} }, content: [] } }, headers: origin }),
      request.patch('/api/pages/1', { data: { _status: 'published' }, headers: origin }),
      request.delete('/api/pages/1', { headers: origin }),
      request.post('/api/globals/site-settings', { data: { header: { applyLabel: 'x' } }, headers: origin }),
      request.post('/api/users', { data: { email: 'x@y.zz', password: 'aaaaaaaaaaaa1', name: 'x', role: 'admin' }, headers: origin }),
      request.post('/api/users/first-register', { data: { email: 'x@y.zz', password: 'aaaaaaaaaaaa1', name: 'x' }, headers: origin }),
      request.post('/api/redirects', { data: { from: '/a', to: '/b' }, headers: origin }),
      request.post('/api/media', { multipart: { file: { name: 'a.png', mimeType: 'image/png', buffer: Buffer.from([137, 80, 78, 71]) }, _payload: '{"alt":"x"}' }, headers: origin }),
    ]
    for (const res of await Promise.all(attempts)) expect([401, 403], `${res.url()} → ${res.status()}`).toContain(res.status())
  })

  test('cannot list user accounts', async ({ request }) => {
    expect((await request.get('/api/users')).status()).toBe(403)
  })

  test('sees the built-in home page while the CMS version is only a draft', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to')
    await expect(page.locator('[data-cms-preview-banner]')).toHaveCount(0)
  })

  test('editor and admin responses are never cached or indexed', async ({ request }) => {
    for (const url of ['/admin/login', '/cms/preview?path=/']) {
      const res = await request.get(url, { maxRedirects: 0 })
      expect(res.headers()['cache-control'], url).toContain('no-store')
      expect(res.headers()['x-robots-tag'], url).toContain('noindex')
    }
  })
})

test('a signed-in cookie from another website is ignored (CSRF)', async ({ request }) => {
  await apiAs(request, 'admin')
  const res = await request.patch(`/api/pages/${await homePageId(request, { Origin: creds().base })}`, { data: { title: 'hijacked' }, headers: { Origin: 'https://evil.example' } })
  expect([401, 403]).toContain(res.status())
})
