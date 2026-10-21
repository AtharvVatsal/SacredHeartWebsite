import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

// Same rule set as the old .eslintrc.json ("next/core-web-vitals"), in ESLint 9 flat-config form
export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // New in eslint-config-next 16 (React Compiler readiness). The React Compiler is not enabled here, and the
      // flagged patterns (latest-value refs, post-mount state such as the footer year) are intentional, so these
      // stay off rather than rewriting working code during the framework upgrade.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
