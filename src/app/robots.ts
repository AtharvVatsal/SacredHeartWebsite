import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Everything public may be crawled. Next.js scripts, styles and optimised images under /_next/
// must stay crawlable so search engines can render pages and index images.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
