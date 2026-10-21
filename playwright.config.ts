import { defineConfig } from '@playwright/test'

// End-to-end tests for the CMS against a production build and a disposable local database
// (see tests/e2e/setup/prepare.mjs). Uses the installed Google Chrome, so no browser download is needed.
const PORT = process.env.E2E_PORT || '3300'

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 120_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: 'chrome',
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node tests/e2e/setup/prepare.mjs',
    url: `http://localhost:${PORT}/robots.txt`,
    timeout: 15 * 60_000,
    reuseExistingServer: false,
    stdout: 'pipe',
  },
})
