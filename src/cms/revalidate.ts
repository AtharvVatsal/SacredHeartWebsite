// Tells Next.js to rebuild pages after published content changes. Public pages stay static; this is what
// makes a publish visible. Outside a Next.js request (CLI scripts, seeding) there is nothing to revalidate,
// so failures there are logged and ignored; the next build picks the content up.
import { revalidatePath } from 'next/cache'
import type { Payload } from 'payload'

export function revalidatePaths(payload: Payload, paths: (string | null | undefined)[], opts: { layout?: boolean } = {}) {
  const unique = [...new Set(paths.filter((p): p is string => typeof p === 'string' && p.startsWith('/')))]
  try {
    if (opts.layout) revalidatePath('/', 'layout')
    for (const p of unique) revalidatePath(p)
    if (unique.length || opts.layout) payload.logger.info(`Revalidated ${opts.layout ? 'all pages' : unique.join(', ')}`)
  } catch (error) {
    payload.logger.warn(`Could not revalidate ${unique.join(', ') || 'layout'} (not running inside Next.js): ${(error as Error).message}`)
  }
}
