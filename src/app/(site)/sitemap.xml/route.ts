import { routes, absoluteUrl } from '@/lib/seo'
import { albums, albumPhoto } from '@/data/gallery'
import { class10Sessions, class12Sessions } from '@/data/toppers'
import { batchPhotos, schoolInfo, studentLeaders } from '@/data/school'
import { getPayloadSafe } from '@/cms/render/payload'
import { publishedPageImages, type SitemapImage } from '@/cms/render/sitemap-images'

// Built at build time and rebuilt when a page made in the CMS is published: every page, plus the photos on
// the built-in pages for Google Images
export const dynamic = 'force-static'


const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
// Spaces and other characters in file names must be percent-encoded in a URL (once: CMS addresses may be already)
function imageUrl(src: string) {
  let decoded = src
  try {
    decoded = decodeURI(src)
  } catch {}
  return /^https?:\/\//i.test(src) ? encodeURI(decoded) : absoluteUrl(encodeURI(decoded))
}

/** Images of the pages published in the CMS (the rollback switch turns them off with the pages) */
async function cmsImages() {
  if (process.env.CMS_PAGES_ENABLED === 'false') return new Map<string, SitemapImage[]>()
  const payload = await getPayloadSafe()
  if (!payload) return new Map<string, SitemapImage[]>()
  return publishedPageImages(payload).catch(() => new Map<string, SitemapImage[]>())
}

function imagesFor(path: string): SitemapImage[] {
  switch (path) {
    case '/gallery':
      return albums.flatMap(album =>
        Array.from({ length: album.count }, (_, i) => ({ loc: albumPhoto(album, i), title: `${album.name}, photo ${i + 1}` })))
    case '/about/pass-out-batches':
      return batchPhotos.flatMap(batch => batch.photos.filter(p => p.image).map(p => ({ loc: p.image!, title: `${p.title}, ${schoolInfo.name}` })))
    case '/achievements/toppers/12th':
      return class12Sessions.flatMap(s => s.toppers.filter(t => t.image).map(t => ({ loc: t.image!, title: `${t.name}, ISC topper ${s.year}` })))
    case '/achievements/toppers/10th':
      return class10Sessions.flatMap(s => s.toppers.filter(t => t.image).map(t => ({ loc: t.image!, title: `${t.name}, ICSE topper ${s.year}` })))
    case '/about/principal':
      return [{ loc: '/images/principal.webp', title: `${schoolInfo.principal}, Principal` }]
    case '/about/office-bearers/messages':
      return studentLeaders.filter(l => l.image).map(l => ({ loc: l.image!, title: `${l.name}, ${l.role} ${l.year}` }))
    case '/':
      return [{ loc: '/og-image.jpg', title: schoolInfo.fullName }]
    default:
      return []
  }
}

/** Published pages made in the CMS (built-in pages are already listed), unless hidden from search engines */
async function cmsPages(): Promise<{ path: string; updatedAt: string }[]> {
  const payload = await getPayloadSafe()
  if (!payload) return []
  try {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { and: [{ kind: { equals: 'custom' } }, { _status: { equals: 'published' } }, { 'seo.noIndex': { not_equals: true } }] },
      limit: 500,
      depth: 0,
      pagination: false,
      overrideAccess: false,
      select: { path: true, updatedAt: true },
    })
    return docs.map((d) => ({ path: d.path, updatedAt: d.updatedAt }))
  } catch {
    return []
  }
}

export async function GET() {
  const lastmod = new Date().toISOString().slice(0, 10)
  const published = await cmsImages()
  const imageTags = (images: SitemapImage[]) =>
    images.map((img) => `\n    <image:image><image:loc>${esc(imageUrl(img.loc))}</image:loc><image:title>${esc(img.title)}</image:title></image:image>`).join('')
  const extra = (await cmsPages()).map(
    (p) =>
      `  <url>\n    <loc>${esc(absoluteUrl(p.path))}</loc>\n    <lastmod>${p.updatedAt.slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>${imageTags(published.get(p.path) ?? [])}\n  </url>`,
  )
  const urls = Object.entries(routes).map(([path, r]) => {
    // Photos from the published CMS page, or the original entries while the page is not in the CMS
    const images = imageTags(published.get(path) ?? imagesFor(path))
    return `  <url>\n    <loc>${esc(absoluteUrl(path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changeFrequency}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>${images}\n  </url>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${[...urls, ...extra].join('\n')}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
