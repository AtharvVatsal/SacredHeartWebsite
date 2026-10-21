import type { Metadata } from 'next'
import { CmsPage } from '@/cms/render/CmsPage'
import { cmsMetadata } from '@/cms/render/metadata'
import { loadCmsPage } from '@/cms/render/page'
import { pageMeta } from '@/lib/seo'
import { schoolInfo } from '@/data/school'
import LegacyHomePage from './legacy-page'

// The home page comes from the CMS once it is published there; until then (or if the CMS is unavailable) the
// original implementation in legacy-page.tsx is shown unchanged.
export async function generateMetadata(): Promise<Metadata> {
  // Without a published CMS page, inherit the root layout's metadata exactly as before
  if (!(await loadCmsPage('/'))) return {}
  const base = pageMeta('/')
  return cmsMetadata('/', {
    ...base,
    alternates: {
      ...base.alternates,
      types: { 'application/rss+xml': [{ url: '/notifications.rss', title: `${schoolInfo.name} notifications` }] },
    },
  })
}

export default async function Page() {
  const loaded = await loadCmsPage('/')
  return loaded ? <CmsPage loaded={loaded} /> : <LegacyHomePage />
}
