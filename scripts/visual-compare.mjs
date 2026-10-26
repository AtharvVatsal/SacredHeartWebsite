// Screenshot comparison used to check that CMS pages look exactly like the original pages.
//
//   node scripts/visual-compare.mjs shoot <baseUrl> <outDir> [--preview] [/route ...]
//       Full-page screenshots at phone (390 px) and desktop (1440 px) width, with motion settled.
//       --preview signs in (CMS_VISUAL_EMAIL / CMS_VISUAL_PASSWORD) and captures /cms/preview?path=…,
//       i.e. the saved CMS draft, instead of what visitors see. Without routes, all built-in routes.
//   node scripts/visual-compare.mjs diff <dirA> <dirB> [diffDir]
//       Pixel comparison of two screenshot folders; differences over 0.1 % are written to diffDir.
//
// Typical use: shoot the site as visitors see it, shoot it again in --preview (or after publishing), diff.
// Uses the system Chrome through Playwright, and sharp; both are already project dependencies.
// Compare only screenshots taken by this script: during a full-page capture Playwright briefly reports the phone
// as a mouse screen, so styles meant for touch screens (e.g. photo captions shown without hovering) are missing
// from phone screenshots, though visitors see them.
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const ROUTES = [
  '/', '/about', '/about/aims', '/about/history', '/about/office-bearers', '/about/office-bearers/messages', '/about/pass-out-batches',
  '/about/principal', '/about/staff', '/academics', '/academics/calendar', '/academics/leave-absence', '/academics/syllabus-homework',
  '/achievements', '/achievements/other', '/achievements/toppers', '/achievements/toppers/10th', '/achievements/toppers/12th',
  '/admission', '/admission/fee-structure', '/admission/online-fee', '/admission/online-registration', '/admission/register',
  '/admission/rules', '/admission/uniform', '/contact', '/gallery', '/notifications', '/privacy', '/terms',
]
const DEVICES = {
  phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  desktop: { viewport: { width: 1440, height: 900 } },
}
const nameOf = (route, device) => `${route === '/' ? 'home' : route.slice(1).replace(/\//g, '_')}-${device}.png`

async function shoot(base, out, preview, routes) {
  fs.mkdirSync(out, { recursive: true })
  const browser = await chromium.launch({ channel: 'chrome' })
  const report = []
  for (const [device, options] of Object.entries(DEVICES)) {
    const context = await browser.newContext({ ...options, reducedMotion: 'reduce' })
    if (preview) {
      const res = await context.request.post(`${base}/api/users/login`, {
        data: { email: process.env.CMS_VISUAL_EMAIL, password: process.env.CMS_VISUAL_PASSWORD },
        headers: { Origin: base },
      })
      if (!res.ok()) throw new Error(`Sign-in failed (${res.status()}): set CMS_VISUAL_EMAIL and CMS_VISUAL_PASSWORD`)
    }
    for (const route of routes) {
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', (e) => errors.push(e.message.slice(0, 200)))
      const url = preview ? `${base}/cms/preview?path=${encodeURIComponent(route)}` : base + route
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 }).catch(() => null)
      // Scroll down in steps, as a visitor would, so scroll-triggered sections appear (jumping the scroll
      // position directly can skip them), then return to the top and freeze motion
      // Give the page time to finish hydrating first; sections passed before their reveal is armed stay hidden
      await page.waitForTimeout(3000)
      const viewport = page.viewportSize()
      // Desktop scrolls with the mouse wheel; phone scrolls like a swipe (no mouse on a touch screen)
      if (!options.hasTouch) await page.mouse.move(viewport.width / 2, viewport.height / 2)
      for (let i = 0; i < 400; i++) {
        const done = await page.evaluate(() => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2)
        if (done) break
        if (options.hasTouch) await page.evaluate((dy) => window.scrollBy(0, dy), viewport.height / 2)
        else await page.mouse.wheel(0, viewport.height / 2)
        await page.waitForTimeout(120)
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      // Let entrance animations finish (long pages stagger dozens of cards); endless decorative ones are ignored
      await page
        .waitForFunction(
          () => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations !== Infinity).length === 0,
          undefined,
          { timeout: 30_000, polling: 250 },
        )
        .catch(() => {})
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important} [data-cms-preview-banner]{display:none!important}' })
      await page.waitForTimeout(1500)
      await page.screenshot({ path: path.join(out, nameOf(route, device)), fullPage: true })
      report.push({ route, device, status: res?.status() ?? null, title: await page.title(), errors })
      await page.close()
    }
    await context.close()
  }
  await browser.close()
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 1))
  const problems = report.filter((r) => r.status !== 200 || r.errors.length)
  console.log(`captured ${report.length} screenshots${problems.length ? `; problems: ${JSON.stringify(problems)}` : ''}`)
}

async function diff(a, b, out) {
  fs.mkdirSync(out, { recursive: true })
  const rows = []
  for (const f of fs.readdirSync(a).filter((x) => x.endsWith('.png')).sort()) {
    if (!fs.existsSync(path.join(b, f))) {
      rows.push({ f, note: 'missing in the second folder' })
      continue
    }
    const A = await sharp(path.join(a, f)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const B = await sharp(path.join(b, f)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const w = Math.min(A.info.width, B.info.width)
    const h = Math.min(A.info.height, B.info.height)
    const mask = Buffer.alloc(w * h * 4)
    let different = 0
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ia = (y * A.info.width + x) * 4
        const ib = (y * B.info.width + x) * 4
        const im = (y * w + x) * 4
        const d = Math.abs(A.data[ia] - B.data[ib]) + Math.abs(A.data[ia + 1] - B.data[ib + 1]) + Math.abs(A.data[ia + 2] - B.data[ib + 2])
        if (d > 48) {
          different++
          mask[im] = 255
        } else mask[im] = mask[im + 1] = mask[im + 2] = A.data[ia] >> 2
        mask[im + 3] = 255
      }
    }
    const pct = +((100 * different) / (w * h)).toFixed(3)
    const sameSize = A.info.width === B.info.width && A.info.height === B.info.height
    if (pct > 0.1 || !sameSize) await sharp(mask, { raw: { width: w, height: h, channels: 4 } }).png().toFile(path.join(out, f))
    rows.push({ f, size: `${A.info.width}x${A.info.height} vs ${B.info.width}x${B.info.height}`, diffPct: pct, sameSize })
  }
  fs.writeFileSync(path.join(out, 'diff.json'), JSON.stringify(rows, null, 1))
  const bad = rows.filter((r) => r.note || r.diffPct > 0.1 || !r.sameSize)
  for (const r of bad) console.log(JSON.stringify(r))
  console.log(`compared ${rows.length}; within 0.1 %: ${rows.length - bad.length}`)
  if (bad.length) process.exitCode = 1
}

const [cmd, ...args] = process.argv.slice(2)
if (cmd === 'shoot') {
  const [base, out, ...rest] = args
  const preview = rest.includes('--preview')
  const routes = rest.filter((r) => r.startsWith('/'))
  await shoot(base.replace(/\/$/, ''), out, preview, routes.length ? routes : ROUTES)
} else if (cmd === 'diff') {
  const [a, b, out = 'visual-diff'] = args
  await diff(a, b, out)
} else {
  console.log('usage: node scripts/visual-compare.mjs shoot <baseUrl> <outDir> [--preview] [/route ...]\n       node scripts/visual-compare.mjs diff <dirA> <dirB> [diffDir]')
  process.exitCode = 1
}
