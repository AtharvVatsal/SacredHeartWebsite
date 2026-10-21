import fs from 'node:fs'
import path from 'node:path'
import { expect, type APIRequestContext, type Page } from '@playwright/test'

export type Creds = Record<'admin' | 'editor', { email: string; password: string; name: string }> & { base: string }

export const creds = (): Creds => JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tests/e2e/.auth/creds.json'), 'utf8'))

/** Signs in through the real admin sign-in form */
export async function signIn(page: Page, who: 'admin' | 'editor') {
  const c = creds()[who]
  await page.goto('/admin/login')
  await page.getByLabel('Email').fill(c.email)
  await page.getByLabel('Password').fill(c.password)
  await page.getByRole('button', { name: /login|sign in/i }).click()
  await expect(page.getByText('Edit a page')).toBeVisible()
}

/** A request context signed in as someone, sending the Origin header a browser would */
export async function apiAs(request: APIRequestContext, who: 'admin' | 'editor') {
  const c = creds()
  const res = await request.post('/api/users/login', { data: { email: c[who].email, password: c[who].password }, headers: { Origin: c.base } })
  expect(res.ok()).toBeTruthy()
  return { Origin: c.base }
}

export async function homePageId(request: APIRequestContext, headers: Record<string, string>) {
  const res = await request.get('/api/pages?where[path][equals]=/&draft=true&depth=0', { headers })
  const body = await res.json()
  return body.docs[0].id as number
}

/** The editor canvas (an iframe) */
export const canvas = (page: Page) => page.frameLocator('iframe[data-rfd-iframe], iframe').first()

export async function openEditor(page: Page, id: number) {
  await page.goto(`/cms/editor/${id}`)
  await expect(canvas(page).locator('[data-puck-component]').first()).toBeVisible({ timeout: 60_000 })
}

export async function selectSection(page: Page, componentId: string) {
  await canvas(page).locator(`[data-puck-component="${componentId}"]`).click({ position: { x: 20, y: 20 } })
}

export async function sectionIds(page: Page) {
  return canvas(page).locator('[data-puck-component]').evaluateAll((els) => els.map((e) => e.getAttribute('data-puck-component') ?? ''))
}

/** Waits until the public page shows the expected text (publishing revalidates within seconds) */
export async function expectPublic(request: APIRequestContext, pathName: string, text: string, present = true) {
  await expect
    .poll(async () => (await (await request.get(pathName, { headers: { 'Cache-Control': 'no-cache' } })).text()).includes(text), { timeout: 30_000, intervals: [500, 1000, 2000] })
    .toBe(present)
}

/** A settings field in the editor panel (Puck renders a hidden copy for small screens, so take the visible one) */
export const field = (page: Page, name: string) => page.locator(`input[name="${name}"]:visible, textarea[name="${name}"]:visible`).first()
