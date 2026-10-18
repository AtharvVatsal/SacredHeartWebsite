'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Camera, Award, BookOpen, Trophy, Palette, Heart, Calendar, Sparkles, Star, GraduationCap, Users, HeartHandshake, X, ZoomIn, ZoomOut, Filter, Image as ImageIcon } from 'lucide-react'
import { m } from 'framer-motion'
import { FadeIn, StaggerContainer, FadeInItem, ParallaxSection } from '@/components/animations'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
}

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

  const handleClose = () => {
    setIsOpen(false)
    setZoom(1)
    setTimeout(onClose, 300)
  }

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
      else if (e.key === 'Escape') handleClose()
      else if (e.key === '+' || e.key === '=') handleZoomIn()
      else if (e.key === '-') handleZoomOut()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  if (!isOpen) return null

  return (
    <m.div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      {/* Close button */}
      <m.button 
        className="absolute top-4 right-4 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-50 border border-white/20"
        onClick={handleClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={24} />
      </m.button>

      {/* Previous button */}
      {currentIndex > 0 && (
        <m.button 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-50 border border-white/20"
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </m.button>
      )}

      {/* Next button */}
      {currentIndex < allEvents.length - 1 && (
        <m.button 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-50 border border-white/20"
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight size={24} />
        </m.button>
      )}

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 flex gap-2 z-50">
        <m.button 
          className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20"
          onClick={(e) => { e.stopPropagation(); handleZoomOut() }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={zoom <= 0.5}
        >
          <ZoomOut size={20} />
        </m.button>
        <m.button 
          className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20"
          onClick={(e) => { e.stopPropagation(); handleZoomIn() }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={zoom >= 3}
        >
          <ZoomIn size={20} />
        </m.button>
        <span className="text-white/70 text-sm flex items-center px-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          {Math.round(zoom * 100)}%
        </span>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-white font-medium">{currentIndex + 1} of {allEvents.length}</span>
        </div>
      </div>

      <div 
        className="w-full h-full p-8 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <m.div 
          className="relative flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={currentIndex}
        >
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {hasError ? (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Image not available</p>
              </div>
            </div>
          ) : (
            <m.img
              src={`/images/Events/${event.file}`}
              alt={event.name}
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
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
          
          <div className="absolute -bottom-20 left-0 right-0 text-center">
            <h3 className="text-white font-display font-bold text-2xl mb-2">{event.name}</h3>
            <p className="text-white/70">{event.description}</p>
          </div>
        </m.div>
      </div>
    </m.div>
  )
}

function EventCard({ event, onClick }: { event: typeof events[0]; onClick: () => void }) {
  const Icon = event.icon
  
  return (
    <m.div variants={itemVariants}>
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
            alt={event.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Hover overlay */}
          <m.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
              <Camera className="w-10 h-10 text-white" />
            </div>
          </m.div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-secondary-400/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary-900" />
              </div>
            </div>
            <h3 className="text-white font-display font-bold text-lg leading-tight">{event.name}</h3>
            <p className="text-white/70 text-sm mt-1 line-clamp-2">{event.description}</p>
          </div>
        </m.div>
      </button>
    </m.div>
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
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
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
              <h2 className="text-sm font-semibold text-secondary-500 tracking-wider uppercase mb-3">Explore</h2>
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
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/30'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </m.button>
              </FadeInItem>
            ))}
          </StaggerContainer>

          {/* Results count */}
          <div className="text-center mb-8">
            <p className="text-gray-500">
              Showing <span className="font-semibold text-primary-600">{filteredEvents.length}</span> of {events.length} photos
            </p>
          </div>

          <m.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
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
          </m.div>

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
