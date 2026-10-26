'use client'

// The photo gallery (album filters, album cards, fullscreen viewer) and the school videos. Used by the Gallery
// page and by its CMS section.
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Camera, Award, BookOpen, Trophy, Palette, Heart, Calendar, Sparkles, Star, GraduationCap, Users, HeartHandshake, X, ZoomIn, ZoomOut, Image as ImageIcon, Images, Play, Youtube, PenLine, Flower2, ExternalLink } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import { FadeIn, StaggerContainer, FadeInItem } from '@/components/animations'
import { useDialog } from '@/lib/useDialog'
import { albumPhoto, albumThumb, type Album, type Video } from '@/data/gallery'

export const albumIcons: Record<string, React.ElementType> = {
  'annual-function': Star,
  'oath-ceremony': Award,
  'world-environment-day': Sparkles,
  'school-feast': Heart,
  'school-reopen': Calendar,
  'xi-reopen': GraduationCap,
  'teachers-day': Users,
  'asisc-literary-events': PenLine,
  'golden-jubilee': Trophy,
  'farewell-party': GraduationCap,
  'zone-competition-sports': Trophy,
  'notice-board': Calendar,
  'diwali': Sparkles,
  'voting': HeartHandshake,
  'health-care': Heart,
  'prize-distribution': Award,
  'childrens-day': Heart,
  'art-exhibition': Palette,
  'yoga-diwas': Flower2,
  'cisce-yoga-olympiad': Flower2,
  'school-campus': BookOpen,
  'farewell-felicitation': GraduationCap,
  'other-images': Camera,
  'staff': Users,
}

const categories = [
  { id: 'all', name: 'All', icon: ImageIcon },
  { id: 'cultural', name: 'Cultural', icon: Palette },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'campus', name: 'Campus', icon: BookOpen },
]

const photoLabel = (n: number) => `${n} ${n === 1 ? 'photo' : 'photos'}`

function Lightbox({ album, onClose }: { album: Album; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(true)
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [zoom, setZoom] = useState(1)
  const dialogRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const last = album.count - 1

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setZoom(1)
    setTimeout(onClose, 200)
  }, [onClose])

  useDialog({ open: isOpen, onClose: handleClose, containerRef: dialogRef })

  const goTo = useCallback((next: number) => {
    if (next < 0 || next > last) return
    setIndex(next)
    setIsLoading(true)
    setHasError(false)
    setZoom(1)
  }, [last])

  const handlePrev = useCallback(() => goTo(index - 1), [goTo, index])
  const handleNext = useCallback(() => goTo(index + 1), [goTo, index])
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5))

  // Escape and Tab are handled by useDialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
      else if (e.key === '+' || e.key === '=') handleZoomIn()
      else if (e.key === '-') handleZoomOut()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Fetch the next photo early so stepping through an album feels instant
  useEffect(() => {
    if (index < last) {
      const img = new window.Image()
      img.src = albumPhoto(album, index + 1)
    }
  }, [album, index, last])

  // Keep the current thumbnail in view
  useEffect(() => {
    const strip = stripRef.current
    const active = strip?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!strip || !active) return
    strip.scrollTo({ left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [index, reduceMotion])

  if (!isOpen) return null

  const iconButton = 'w-12 h-12 shrink-0 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed'

  return (
    <m.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      tabIndex={-1}
      data-backdrop
      className="fixed inset-0 z-[60] bg-black/95 flex flex-col outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // A click on the dark area (not on the photo or a control) closes the viewer
      onClick={(e) => { if ((e.target as HTMLElement).dataset.backdrop !== undefined) handleClose() }}
    >
      {/* Top bar */}
      <div data-backdrop className="flex items-center justify-between gap-2 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <button type="button" className={iconButton} onClick={handleZoomOut} disabled={zoom <= 0.5} aria-label="Zoom out">
            <ZoomOut aria-hidden size={20} />
          </button>
          <button type="button" className={iconButton} onClick={handleZoomIn} disabled={zoom >= 3} aria-label="Zoom in">
            <ZoomIn aria-hidden size={20} />
          </button>
          <span className="text-white/90 text-sm px-3 py-2 bg-white/10 rounded-full border border-white/20" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
        </div>
        <button type="button" className={iconButton} onClick={handleClose} aria-label="Close photo viewer">
          <X aria-hidden size={24} />
        </button>
      </div>

      {/* Photo */}
      <div data-backdrop className="relative flex-1 min-h-0 flex items-center justify-center px-3 sm:px-16 overflow-hidden">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        {hasError ? (
          <div className="text-center">
            <Camera aria-hidden className="w-24 h-24 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-300">Image not available</p>
          </div>
        ) : (
          <m.img
            key={index}
            src={albumPhoto(album, index)}
            alt={`${album.name}, photo ${index + 1} of ${album.count}`}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl"
            style={{ transform: `scale(${zoom})` }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>

      {/* Caption, counter and navigation */}
      <div data-backdrop className="flex items-center justify-between gap-3 p-3 sm:p-4">
        <button type="button" className={iconButton} onClick={handlePrev} disabled={index === 0} aria-label="Previous photo">
          <ArrowLeft aria-hidden size={24} />
        </button>
        <div data-backdrop className="min-w-0 flex-1 text-center">
          <h2 id="lightbox-title" className="text-white font-display font-bold text-lg sm:text-2xl leading-tight">{album.name}</h2>
          <p className="text-white/80 text-sm sm:text-base [@media(max-height:500px)]:hidden">{album.description}</p>
          <p className="text-white/80 text-sm mt-1" aria-live="polite">Photo {index + 1} of {album.count}</p>
        </div>
        <button type="button" className={iconButton} onClick={handleNext} disabled={index === last} aria-label="Next photo">
          <ArrowRight aria-hidden size={24} />
        </button>
      </div>

      {/* Thumbnails: jump anywhere in the album */}
      {album.count > 1 && (
        <div
          ref={stripRef}
          data-backdrop
          className="flex gap-2 overflow-x-auto px-3 sm:px-4 pb-3 sm:pb-4 [@media(max-height:560px)]:hidden [scrollbar-width:thin]"
          role="group"
          aria-label="Photos in this album"
        >
          {Array.from({ length: album.count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Photo ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === index ? 'border-secondary-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={albumThumb(album, i)} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </m.div>
  )
}

function AlbumCard({ album, onClick, icons }: { album: Album; onClick: () => void; icons: Record<string, React.ElementType> }) {
  const Icon = icons[album.id] || albumIcons[album.id] || Camera

  return (
    <FadeInItem direction="up" distance={20} blur={false}>
      <button
        type="button"
        className="group cursor-pointer w-full text-left"
        onClick={onClick}
        aria-label={`${album.name}, ${photoLabel(album.count)}`}
      >
        <m.div
          className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <Image
            src={album.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Photo count */}
          <div className="absolute top-2 right-2 min-[440px]:top-3 min-[440px]:right-3 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs min-[440px]:text-sm font-medium px-2.5 py-1 rounded-full">
            <Images aria-hidden className="w-3.5 h-3.5" />
            {album.count}
          </div>

          {/* Hover overlay */}
          <m.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
              <Camera aria-hidden className="w-10 h-10 text-white" />
            </div>
          </m.div>

          <div className="absolute bottom-0 left-0 right-0 p-3 min-[440px]:p-5">
            <div className="hidden min-[440px]:flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-secondary-400/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Icon aria-hidden className="w-4 h-4 text-primary-900" />
              </div>
            </div>
            <h3 className="text-white font-display font-bold text-sm min-[440px]:text-lg leading-tight break-words">{album.name}</h3>
            <p className="hidden min-[440px]:block text-white/80 text-sm mt-1 line-clamp-2">{album.description}</p>
          </div>
        </m.div>
      </button>
    </FadeInItem>
  )
}

// Shows a still until asked, so YouTube only loads for visitors who press play
function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false)

  return (
    <FadeInItem direction="up" distance={20} blur={false}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 h-full flex flex-col">
        <div className="relative aspect-video bg-black">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full" aria-label={`Play video: ${video.title}`}>
              <Image src={`/images/Gallery/videos/${video.id}.webp`} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play aria-hidden className="w-7 h-7 text-primary-800 translate-x-0.5" fill="currentColor" />
                </span>
              </span>
            </button>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-display font-bold text-primary-900 text-lg leading-snug">{video.title}</h3>
          <p className="text-gray-600 text-sm mt-1 flex-1">{video.note}</p>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-800 hover:text-primary-900 hover:underline w-fit"
          >
            Watch on YouTube <ExternalLink aria-hidden size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </FadeInItem>
  )
}

export default function GalleryView({
  albums,
  videos,
  icons = {},
  eyebrow = 'Explore',
  title = 'Our Events Gallery',
  videosTitle = 'School Videos',
}: {
  albums: Album[]
  videos: Video[]
  /** Album icons by album id (the built-in albums have their own) */
  icons?: Record<string, React.ElementType>
  eyebrow?: string
  title?: string
  videosTitle?: string
}) {
  const totalPhotos = albums.reduce((n, a) => n + a.count, 0)
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredAlbums = activeCategory === 'all'
    ? albums
    : albums.filter(a => a.category === activeCategory)
  const filteredPhotos = filteredAlbums.reduce((n, a) => n + a.count, 0)

  return (
    <>
      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">{eyebrow}</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                {title}
              </h3>
              <div className="w-20 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {totalPhotos} photos from {albums.length} albums of school life. Open an album to browse all of its photos in fullscreen.
              </p>
            </div>
          </FadeIn>

          {/* Category Filters */}
          <StaggerContainer className="flex flex-wrap justify-center gap-3 mb-12" stagger={0.05}>
            {categories.map((cat) => (
              <FadeInItem key={cat.id}>
                <m.button
                  type="button"
                  aria-pressed={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? 'bg-primary-700 text-white border-primary-700 shadow-lg shadow-primary-500/30'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <cat.icon aria-hidden className="w-4 h-4" />
                  {cat.name}
                </m.button>
              </FadeInItem>
            ))}
          </StaggerContainer>

          {/* Results count */}
          <div className="text-center mb-8">
            <p className="text-gray-600" aria-live="polite">
              Showing <span className="font-semibold text-primary-800">{filteredAlbums.length}</span> of {albums.length} albums
              <span aria-hidden> · </span>
              <span className="font-semibold text-primary-800">{filteredPhotos}</span> photos
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-[440px]:gap-6" stagger={0.06}>
            {filteredAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album} icons={icons}
                onClick={() => setOpenAlbum(album)}
              />
            ))}
          </StaggerContainer>

          {filteredAlbums.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No photos in this category yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Videos */}
      {videos.length > 0 && (
      <section className="py-20 bg-white relative overflow-hidden" aria-labelledby="videos-heading">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 inline-flex items-center gap-2">
                <Youtube aria-hidden className="w-4 h-4" /> Watch
              </p>
              <h2 id="videos-heading" className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                {videosTitle}
              </h2>
              <div className="w-20 mx-auto">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto" stagger={0.08}>
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </StaggerContainer>
        </div>
      </section>
      )}

      {/* Lightbox */}
      {openAlbum && (
        <Lightbox
          key={openAlbum.id}
          album={openAlbum}
          onClose={() => setOpenAlbum(null)}
        />
      )}
    </>
  )
}
