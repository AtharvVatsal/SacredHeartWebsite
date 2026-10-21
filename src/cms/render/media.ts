import type { Media } from '@/payload-types'

type SizeName = 'thumbnail' | 'card' | 'hero'

/** Public address of an uploaded file, optionally a generated size (falls back to the original) */
export function mediaUrl(media: Pick<Media, 'url' | 'sizes'> | null | undefined, size?: SizeName): string | null {
  if (!media) return null
  const sized = size ? media.sizes?.[size]?.url : null
  return sized || media.url || null
}
