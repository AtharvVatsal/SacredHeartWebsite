import type { Media } from '@/payload-types'

type SizeName = 'thumbnail' | 'card' | 'hero'

/**
 * Payload returns absolute addresses (http://this-site/api/media/file/...). Files served by this site are
 * stored and rendered as site-relative paths instead, so saved pages keep working if the domain changes.
 * Addresses on other hosts (S3/CDN) are kept as they are.
 */
export function toSitePath(url: string, origin = process.env.CMS_SERVER_URL || ''): string {
  if (!url) return url
  try {
    const parsed = new URL(url, 'http://placeholder.invalid')
    if (url.startsWith('/')) return url
    const own = origin ? new URL(origin) : null
    if (own && parsed.host === own.host) return parsed.pathname + parsed.search
    if (parsed.pathname.startsWith('/api/media/file/') && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) return parsed.pathname + parsed.search
  } catch {
    return url
  }
  return url
}

/** Public address of an uploaded file, optionally a generated size (falls back to the original) */
export function mediaUrl(media: Pick<Media, 'url' | 'sizes'> | null | undefined, size?: SizeName): string | null {
  if (!media) return null
  const sized = size ? media.sizes?.[size]?.url : null
  const url = sized || media.url || null
  return url ? toSitePath(url) : null
}

/** Description given to imported images that had none; editors can replace it in the media library */
export const PLACEHOLDER_ALT = 'Photo from Sacred Heart Senior Secondary School'
