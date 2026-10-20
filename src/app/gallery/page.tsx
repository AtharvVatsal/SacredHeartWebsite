'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Camera, Award, BookOpen, Trophy, Palette, Heart, Calendar, Sparkles, Star, GraduationCap, Users, HeartHandshake, X, ZoomIn, ZoomOut, Filter, Image as ImageIcon } from 'lucide-react'
import { m } from 'framer-motion'
import { FadeIn, StaggerContainer, FadeInItem, ParallaxSection } from '@/components/animations'
import { useDialog } from '@/lib/useDialog'

const events = [
  { id: 'annual-function', name: 'Annual Function', file: 'AnuualFunction.webp', icon: Star, description: 'Annual day celebration with cultural performances', category: 'cultural' },
  { id: 'oath-ceremony', name: 'Oath Ceremony', file: 'OathCeremony.webp', icon: Award, description: 'Students taking pledges and commitments', category: 'events' },
  { id: 'world-environment-day', name: 'World Environment Day', file: 'WorldEnvironmentDay.webp', icon: Sparkles, description: 'Awareness and activities for environmental conservation', category: 'events' },
  { id: 'school-feast', name: 'School Feast', file: 'SchoolFeast.webp', icon: Heart, description: 'Celebrating together with joy and delicious food', category: 'cultural' },
  { id: 'school-reopen', name: 'School Re-Open', file: 'ScoolReopening.webp', icon: Calendar, description: 'New session begins with enthusiasm', category: 'events' },
  { id: 'teachers-day', name: "Teacher's Day", file: 'TeachersDay.webp', icon: Users, description: 'Honoring our beloved teachers', category: 'cultural' },
  { id: 'golden-jubilee', name: 'Golden Jubilee', file: 'GoldenJublee.webp', icon: Trophy, description: '50 years of excellence in education', category: 'events' },
  { id: 'farewell-party', name: 'Farewell Party', file: 'FarewellParty.webp', icon: GraduationCap, description: 'Bidding farewell to our senior students', category: 'events' },
  { id: 'zone-competition-sports', name: 'Zone Competition Sports', file: 'Zone Competitions - Sports.webp', icon: Trophy, description: 'Inter-zone sports competitions', category: 'sports' },
  { id: 'notice-board', name: 'School Notice Board', file: 'NoticeBoard.webp', icon: Calendar, description: 'Important notices and updates', category: 'events' },
  { id: 'diwali', name: 'Diwali', file: 'Diwali.webp', icon: Sparkles, description: 'Festival of lights celebration', category: 'cultural' },
  { id: 'voting', name: 'School Voting', file: 'Voting.webp', icon: HeartHandshake, description: 'Student council elections', category: 'events' },
  { id: 'health-care', name: 'Health Care', file: 'HealthCare.webp', icon: Heart, description: 'Health and wellness activities', category: 'events' },
  { id: 'prize-distribution', name: 'Prize Distribution', file: 'PrizeDistribution.webp', icon: Award, description: 'Awarding winners of various competitions', category: 'events' },
  { id: 'childrens-day', name: "Children's Day", file: 'ChildrensDay.webp', icon: Heart, description: 'Celebrating childhood and joy', category: 'cultural' },
  { id: 'art-exhibition', name: 'Art Exhibition', file: 'ArtExhibition.webp', icon: Palette, description: 'Showcasing creative artwork', category: 'cultural' },
  { id: 'yoga-diwas', name: 'Yoga Diwas', file: 'YogaDay.webp', icon: Award, description: 'International Day of Yoga celebrations', category: 'sports' },
  { id: 'school-campus', name: 'School Campus', file: 'SchoolCampus.webp', icon: BookOpen, description: 'Beautiful campus views', category: 'campus' },
  { id: 'farewell-felicitation', name: 'Farewell and Felicitation', file: 'FarewellAndFelicitationCeremony.webp', icon: GraduationCap, description: 'Honoring our departing students', category: 'events' },
  { id: 'staff', name: 'Staff', file: 'Staff.webp', icon: Users, description: 'Our dedicated faculty and staff', category: 'events' },
]

const categories = [
  { id: 'all', name: 'All', icon: ImageIcon },
  { id: 'cultural', name: 'Cultural', icon: Palette },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'campus', name: 'Campus', icon: BookOpen },
]

function Lightbox({ event, onClose, allEvents, currentIndex, onNavigate }: {
  event: typeof events[0];
  onClose: () => void;
  allEvents: typeof events;
  currentIndex: number;
  onNavigate: (index: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [zoom, setZoom] = useState(1)
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setZoom(1)
    setTimeout(onClose, 200)
  }, [onClose])

  useDialog({ open: isOpen, onClose: handleClose, containerRef: dialogRef })

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
      setIsLoading(true)
      setHasError(false)
      setZoom(1)
    }
  }, [currentIndex, onNavigate])

  const handleNext = useCallback(() => {
    if (currentIndex < allEvents.length - 1) {
      onNavigate(currentIndex + 1)
      setIsLoading(true)
      setHasError(false)
      setZoom(1)
    }
  }, [currentIndex, allEvents.length, onNavigate])

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
            key={currentIndex}
            src={`/images/Events/${event.file}`}
            alt={event.name}
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
        <button type="button" className={iconButton} onClick={handlePrev} disabled={currentIndex === 0} aria-label="Previous photo">
          <ArrowLeft aria-hidden size={24} />
        </button>
        <div data-backdrop className="min-w-0 flex-1 text-center">
          <h2 id="lightbox-title" className="text-white font-display font-bold text-lg sm:text-2xl leading-tight">{event.name}</h2>
          <p className="text-white/80 text-sm sm:text-base [@media(max-height:500px)]:hidden">{event.description}</p>
          <p className="text-white/80 text-sm mt-1">{currentIndex + 1} of {allEvents.length}</p>
        </div>
        <button type="button" className={iconButton} onClick={handleNext} disabled={currentIndex === allEvents.length - 1} aria-label="Next photo">
          <ArrowRight aria-hidden size={24} />
        </button>
      </div>
    </m.div>
  )
}

function EventCard({ event, onClick }: { event: typeof events[0]; onClick: () => void }) {
  const Icon = event.icon
  
  return (
    <FadeInItem direction="up" distance={20} blur={false}>
      <button
        type="button"
        className="group cursor-pointer w-full text-left"
        onClick={onClick}
      >
        <m.div 
          className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <Image
            src={`/images/Events/${event.file}`}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
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
            <h3 className="text-white font-display font-bold text-sm min-[440px]:text-lg leading-tight break-words">{event.name}</h3>
            <p className="hidden min-[440px]:block text-white/80 text-sm mt-1 line-clamp-2">{event.description}</p>
          </div>
        </m.div>
      </button>
    </FadeInItem>
  )
}

export default function GalleryPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(e => e.category === activeCategory)

  const handleNavigate = (index: number) => {
    setCurrentIndex(index)
    setSelectedEvent(filteredEvents[index])
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <m.div 
            className="absolute top-20 left-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        {/* Floating elements */}
        <m.div 
          className="absolute top-40 right-20 opacity-10"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Camera className="w-32 h-32 text-white" />
        </m.div>
        <m.div 
          className="absolute bottom-32 left-20 opacity-10"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <ImageIcon className="w-24 h-24 text-white" />
        </m.div>

        <m.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <m.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <m.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Camera className="w-4 h-4 text-secondary-400" />
              Memories
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Photo Gallery
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Capturing moments of joy and achievement
            </m.p>
          </m.div>
        </m.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Explore</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                Our Events Gallery
              </h3>
              <div className="w-20 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our vibrant school activities and memorable moments - Click on any photo to view in fullscreen
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
              Showing <span className="font-semibold text-primary-800">{filteredEvents.length}</span> of {events.length} photos
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-[440px]:gap-6" stagger={0.06}>
            {filteredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={() => {
                  setSelectedEvent(event)
                  setCurrentIndex(index)
                }} 
              />
            ))}
          </StaggerContainer>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No photos in this category yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedEvent && (
        <Lightbox 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          allEvents={filteredEvents}
          currentIndex={currentIndex}
          onNavigate={handleNavigate}
        />
      )}
    </>
  )
}
