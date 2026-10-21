import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMeta, routes } from '@/lib/seo'
import { CmsPage } from './CmsPage'
import { cmsMetadata } from './metadata'
import { loadCmsPage } from './page'

/**
 * A built-in route: the published CMS page when one exists for this address, otherwise the original
 * implementation (legacy-page.tsx next to the route), unchanged.
 */
export async function BuiltInPage({ path, legacy }: { path: string; legacy: ReactNode }) {
  const loaded = await loadCmsPage(path)
  return loaded ? <CmsPage loaded={loaded} /> : <>{legacy}</>
}

/** The route's built-in metadata, with any SEO overrides from its published CMS page */
export function builtInMetadata(path: keyof typeof routes): Promise<Metadata> {
  return cmsMetadata(path, pageMeta(path))
}
