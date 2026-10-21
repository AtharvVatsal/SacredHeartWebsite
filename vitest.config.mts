import { defineConfig } from 'vitest/config'

// Unit tests for the CMS (schemas, validation, sanitising, migrations, address rules). No database needed.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
})
