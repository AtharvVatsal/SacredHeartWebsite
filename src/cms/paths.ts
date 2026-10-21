// Rules for page addresses. Built-in pages are the routes that already exist in src/app/(site); their
// addresses are fixed. Custom pages (made in the CMS) are served by the catch-all route and may use any
// address that is not reserved and does not belong to a built-in page.
import { routes } from '@/lib/seo'

export const BUILT_IN_PATHS: readonly string[] = Object.keys(routes)

/** Addresses owned by the application itself */
export const RESERVED_PREFIXES = ['/admin', '/api', '/cms', '/_next', '/images', '/documents', '/media', '/robots.txt', '/sitemap.xml', '/favicon', '/apple-touch-icon', '/manifest', '/og-image', '/notifications.rss', '/humans.txt'] as const

const SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** "About/New Page/" -> "/about/new-page" (best effort, used to tidy what people type) */
export function normalizePath(input: string) {
  const cleaned = input
    .trim()
    .toLowerCase()
    .replace(/[?#].*$/, '')
    .split('/')
    .map((s) => s.trim().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, ''))
    .filter(Boolean)
    .join('/')
  return '/' + cleaned
}

export const isBuiltInPath = (path: string) => BUILT_IN_PATHS.includes(path)

export function isReservedPath(path: string) {
  return RESERVED_PREFIXES.some((p) => path === p || path.startsWith(p + '/') || path.startsWith(p + '.'))
}

/** Returns an error message, or null when the address is fine for a page of this kind */
export function checkPath(path: string, kind: 'builtIn' | 'custom'): string | null {
  if (typeof path !== 'string' || !path.startsWith('/')) return 'The address must start with /'
  if (path.length > 120) return 'The address is too long'
  if (path !== '/' && !path.slice(1).split('/').every((s) => SEGMENT.test(s))) {
    return 'Use lowercase letters, numbers and dashes only, for example /events/sports-day'
  }
  if (path.split('/').length > 5) return 'Use at most four levels, for example /a/b/c/d'
  if (kind === 'builtIn') return isBuiltInPath(path) ? null : 'This is not one of the built-in pages'
  if (isReservedPath(path)) return 'This address is used by the system. Choose another one.'
  if (isBuiltInPath(path)) return 'A built-in page already uses this address'
  return null
}
