'use client'

import { usePathname } from 'next/navigation'
import { absoluteUrl, breadcrumbTrail, routes } from '@/lib/seo'

// Breadcrumb structured data for the current page. Rendered on the server at build time too,
// so search engines see it in the HTML. Unknown paths (the 404 page) get none.
export default function BreadcrumbJsonLd() {
  const pathname = (usePathname() ?? '/').replace(/\/$/, '') || '/'
  if (pathname === '/' || !routes[pathname]) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbTrail(pathname).map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
