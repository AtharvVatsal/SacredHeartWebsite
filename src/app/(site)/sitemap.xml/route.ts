import { routes, absoluteUrl } from '@/lib/seo'
import { albums, albumPhoto } from '@/data/gallery'
import { class10Sessions, class12Sessions } from '@/data/toppers'
import { batchPhotos, schoolInfo, studentLeaders } from '@/data/school'

// Built once at build time: every page, plus the photos on it for Google Images
export const dynamic = 'force-static'

type SitemapImage = { loc: string; title: string }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
// Spaces and other characters in file names must be percent-encoded in a URL
const imageUrl = (path: string) => absoluteUrl(encodeURI(path))

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

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = Object.entries(routes).map(([path, r]) => {
    const images = imagesFor(path)
      .map(img => `\n    <image:image><image:loc>${esc(imageUrl(img.loc))}</image:loc><image:title>${esc(img.title)}</image:title></image:image>`)
      .join('')
    return `  <url>\n    <loc>${esc(absoluteUrl(path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changeFrequency}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>${images}\n  </url>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
