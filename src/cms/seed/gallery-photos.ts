// The built-in gallery albums read their photos from numbered files (/images/Gallery/<album>/NN.webp). These
// helpers turn such an album into a photo list that editors can change; import-gallery.ts does the importing.
import { albumPhoto } from '@/data/gallery'
import type { PageDocument } from '../document/types'

type Picture = { mediaId: number | null; src: string; alt: string; position: 'center' }
export type GalleryAlbum = { key: string; name: string; folderCount: number; photos: { photo: Picture }[] }

/** The albums of a page that still read their photos from a folder (only those with the given keys, if any) */
export function folderAlbums(document: PageDocument, keys: string[] = []): GalleryAlbum[] {
  return document.content
    .filter((b) => b.type === 'GalleryBoard')
    .flatMap((b) => (b.props as unknown as { albums?: GalleryAlbum[] }).albums ?? [])
    .filter((a) => a.folderCount > 0 && !a.photos?.length && (!keys.length || keys.includes(a.key)))
}

/** An album's folder photos as photo-list entries, described as in the sitemap ("Diwali, photo 3") */
export function folderPhotos(album: Pick<GalleryAlbum, 'key' | 'name' | 'folderCount'>): { photo: Picture }[] {
  const asAlbum = { id: album.key, name: album.name, description: '', category: 'events' as const, cover: '', count: album.folderCount }
  return Array.from({ length: album.folderCount }, (_, i) => ({
    photo: { mediaId: null, src: albumPhoto(asAlbum, i), alt: `${album.name}, photo ${i + 1}`, position: 'center' },
  }))
}
