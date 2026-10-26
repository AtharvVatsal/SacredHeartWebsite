// Gallery albums and videos in the shape the CMS edits (server-safe)
import type { IconName } from '@/cms/blocks/shared/icon-names'
import { albums, videos } from '@/data/gallery'

// The icon each built-in album shows (same as on the original Gallery page)
const ALBUM_ICONS: Record<string, IconName> = {
  'annual-function': 'Star',
  'oath-ceremony': 'Award',
  'world-environment-day': 'Sparkles',
  'school-feast': 'Heart',
  'school-reopen': 'Calendar',
  'xi-reopen': 'GraduationCap',
  'teachers-day': 'Users',
  'asisc-literary-events': 'PenLine',
  'golden-jubilee': 'Trophy',
  'farewell-party': 'GraduationCap',
  'zone-competition-sports': 'Trophy',
  'notice-board': 'Calendar',
  diwali: 'Sparkles',
  voting: 'HeartHandshake',
  'health-care': 'Heart',
  'prize-distribution': 'Award',
  'childrens-day': 'Heart',
  'art-exhibition': 'Palette',
  'yoga-diwas': 'Flower2',
  'cisce-yoga-olympiad': 'Flower2',
  'school-campus': 'BookOpen',
  'farewell-felicitation': 'GraduationCap',
  'other-images': 'Camera',
  staff: 'Users',
}

const picture = (src: string, alt: string) => ({ mediaId: null, src: encodeURI(src), alt, position: 'center' as const })

export const galleryAlbums = albums.map((a) => ({
  key: a.id,
  name: a.name,
  description: a.description,
  category: a.category,
  icon: ALBUM_ICONS[a.id] ?? 'Camera',
  cover: picture(a.cover, a.name),
  // Built-in albums keep their numbered photos in /images/Gallery/<key>/; a single-photo album lists its photo
  folderCount: a.single ? 0 : a.count,
  photos: a.single ? [{ photo: picture(a.single, a.name) }] : [],
}))

export const galleryVideos = videos.map((v) => ({ youtubeId: v.id, title: v.title, note: v.note }))
