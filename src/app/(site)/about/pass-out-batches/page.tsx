'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useBatchYears } from '@/lib/useCMS'
import { onlineServices } from '@/data/school'
import { Image as ImageIcon, Calendar, Users, X, ChevronLeft, ChevronRight, Download, Search, Grid, List, Camera, Sparkles, Trophy, ArrowLeft, GraduationCap, ExternalLink } from 'lucide-react'
import NextImage from 'next/image'
import { useDialog } from '@/lib/useDialog'
import Link from 'next/link'
import { FadeIn, StaggerContainer, FadeInItem, ParallaxSection, GradualBlur } from '@/components/animations'
import { m, useInView, AnimatePresence } from 'framer-motion'
import type { BatchYear, BatchPhoto } from '@/types'
import HeroDecor from '@/components/layout/HeroDecor'
import { GraduationCap as HeroMotif, Camera as HeroMotifSmall } from 'lucide-react'

interface LightboxProps {
  photo: BatchPhoto
  allPhotos: BatchPhoto[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

function Lightbox({ photo, allPhotos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Focus, Tab trap, Escape and scroll lock
  useDialog({ open: true, onClose, containerRef: dialogRef })

  const handlePrev = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true)
      setIsLoading(true)
      onNavigate(currentIndex - 1)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [currentIndex, onNavigate, isAnimating])

  const handleNext = useCallback(() => {
    if (currentIndex < allPhotos.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setIsLoading(true)
      onNavigate(currentIndex + 1)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [currentIndex, allPhotos.length, onNavigate, isAnimating])

  const handleDownload = async () => {
    if (!photo.image) return
    try {
      const response = await fetch(photo.image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      // Name the file after its real format (the photos are WebP)
      const ext = blob.type.split('/')[1]?.replace('jpeg', 'jpg') || photo.image.split('.').pop() || 'webp'
      link.download = `batch-${photo.year}-photo-${currentIndex + 1}.${ext}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      window.open(photo.image, '_blank')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  return (
    <>
      {/* Backdrop overlay */}
      <m.div 
        className="fixed inset-0 z-[9998] bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Content container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="batch-viewer-title"
        tabIndex={-1}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden outline-none"
      >
        {/* Close button */}
        <m.button 
          className="absolute top-4 right-4 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10 group"
          onClick={onClose}
          aria-label="Close photo viewer"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X aria-hidden size={24} />
        </m.button>

        {/* Navigation buttons */}
        <AnimatePresence>
          {currentIndex > 0 && (
            <m.button 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              onClick={handlePrev}
              aria-label="Previous photo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft aria-hidden size={32} />
            </m.button>
          )}

          {currentIndex < allPhotos.length - 1 && (
            <m.button 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              onClick={handleNext}
              aria-label="Next photo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight aria-hidden size={32} />
            </m.button>
          )}
        </AnimatePresence>

        {/* Download button */}
        <m.button 
          className="absolute bottom-4 right-4 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all z-10"
          onClick={handleDownload}
          aria-label="Download this photo"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Download aria-hidden size={22} />
        </m.button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-10">
          <m.div 
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / allPhotos.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm z-10 flex items-center gap-4" aria-live="polite">
          <span className="font-mono text-lg">{String(currentIndex + 1).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')}</span>
          <span className="hidden sm:inline border-l border-white/20 pl-4">← → to navigate</span>
        </div>

        {/* Title */}
        <div className="absolute top-4 left-4 z-10">
          <m.div 
            className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 id="batch-viewer-title" className="text-white font-semibold">{photo.title}</h2>
            <p className="text-white/80 text-sm">{photo.year}</p>
          </m.div>
        </div>

        {/* Image container */}
        <div 
          className="w-full h-full p-8 md:p-16 flex items-center justify-center"
          onClick={onClose}
        >
          <AnimatePresence mode="wait">
            <m.img
              key={photo.id}
              src={photo.image}
              alt={photo.title}
              className="max-w-[95vw] max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <m.div 
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function BatchCard({ batch, allPhotos, onPhotoClick }: { 
  batch: BatchYear
  allPhotos: BatchPhoto[]
  onPhotoClick: (photo: BatchPhoto, globalIndex: number) => void 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <m.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      {/* Year Header */}
      <m.div 
        className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 rounded-2xl p-6 mb-4 relative overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <m.div 
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"
            animate={{ backgroundPosition: ['0 0', '60px 60px'] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'loop' }}
          />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <m.div 
              className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="w-7 h-7 text-secondary-400" />
            </m.div>
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Class of {batch.year}</h2>
              <p className="text-white/80 text-sm flex items-center gap-2">
                <Camera aria-hidden className="w-4 h-4" />
                {batch.photos?.length || 0} {(batch.photos?.length || 0) === 1 ? 'photo' : 'photos'}
              </p>
            </div>
          </div>
          
          {/* Decorative year */}
          <m.span 
            className="text-6xl md:text-8xl font-bold text-white/10 absolute right-4 md:right-8 select-none"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            {batch.year}
          </m.span>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-400 via-primary-400 to-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </m.div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(batch.photos || []).map((photo, index) => {
          const globalIndex = allPhotos.findIndex(p => p.id === photo.id)
          return (
            <m.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.08 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, delay: 0 } }}
            >
              <button
                type="button"
                onClick={() => onPhotoClick(photo, globalIndex)}
                aria-label={`View ${photo.title} full size`}
                className="relative w-full aspect-[3/2] rounded-xl overflow-hidden cursor-pointer group/photo shadow-lg bg-gray-200"
              >
                {photo.image && (
                  <NextImage
                    src={photo.image}
                    alt=""
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover/photo:scale-105"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium line-clamp-2">{photo.title}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <m.div 
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    >
                      <ImageIcon aria-hidden className="w-6 h-6 text-white" />
                    </m.div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary-500/30 border-l-[40px] border-l-transparent group-hover/photo:border-t-primary-500/60 transition-colors duration-300" />
              </button>
            </m.div>
          )
        })}
      </div>

      {/* Empty state */}
      {(!batch.photos || batch.photos.length === 0) && (
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <ImageIcon aria-hidden className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No photos available for {batch.year}</p>
        </div>
      )}
    </m.div>
  )
}

export default function PassOutBatchesPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<BatchPhoto | null>(null)
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0)
  const { data: batchData } = useBatchYears()
  
  const batches: BatchYear[] = useMemo(() => batchData || [], [batchData])
  const allPhotos = useMemo(() => batches.flatMap(b => b.photos || []), [batches])
  const allYears = useMemo(() => [...new Set(batches.map(b => b.year))].sort((a, b) => b - a), [batches])
  
  const yearsWithPhotos = useMemo(() => 
    batches.filter(b => b.photos && b.photos.length > 0).map(b => b.year).sort((a, b) => b - a),
    [batches]
  )

  const filteredBatches = useMemo(() => {
    let result = selectedYear === 'All' ? batches : batches.filter(b => b.year === selectedYear)
    
    const query = searchQuery.trim().toLowerCase()
    if (query) {
      result = result.filter(b => 
        String(b.year).includes(query) ||
        b.photos?.some(p => p.title.toLowerCase().includes(query))
      )
    }
    
    return result
  }, [batches, selectedYear, searchQuery])

  const stats = useMemo(() => ({
    totalBatches: batches.length,
    yearsWithPhotos: yearsWithPhotos.length,
    totalPhotos: allPhotos.length,
    latestYear: Math.max(...batches.map(b => b.year)),
    oldestYear: Math.min(...batches.map(b => b.year)),
  }), [batches, yearsWithPhotos, allPhotos])

  const openLightbox = (photo: BatchPhoto, globalIndex: number) => {
    setSelectedPhoto(photo)
    setSelectedBatchIndex(globalIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedPhoto(null)
  }

  const navigateLightbox = (index: number) => {
    const photo = allPhotos[index]
    if (photo) {
      setSelectedPhoto(photo)
      setSelectedBatchIndex(index)
    }
  }

  return (
    <>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
          <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} />
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <ParallaxSection offset={-100} className="absolute -top-40 -left-40 w-96 h-96">
            <m.div 
              className="w-full h-full bg-gradient-to-br from-secondary-400/30 to-primary-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </ParallaxSection>
          <ParallaxSection offset={100} className="absolute -bottom-40 -right-40 w-96 h-96">
            <m.div 
              className="w-full h-full bg-gradient-to-tl from-primary-400/30 to-secondary-400/20 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </ParallaxSection>
          
          {/* Floating elements */}
          {[...Array(5)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-4 h-4 bg-secondary-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group"
            >
              <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </m.span>
              Back to About
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <m.span
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-secondary-400" />
              Alumni Gallery
            </m.span>
            
            <m.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Pass Out Batches
            </m.h1>
            
            <m.p 
              className="text-xl md:text-2xl text-primary-200 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Preserving memories through the years - Click any photo to view & download
            </m.p>

            {/* Stats */}
            <m.div 
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: 'Total Batches', value: stats.totalBatches, icon: Calendar },
                { label: 'Photos', value: stats.totalPhotos, icon: Camera },
                { label: 'Year Range', value: `${stats.oldestYear}-${stats.latestYear}`, icon: Trophy },
              ].map((stat, i) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                <m.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-3"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)', transition: { duration: 0.2, delay: 0 } }}
                >
                  <stat.icon className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-primary-200">{stat.label}</p>
                  </div>
                </m.div>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Filters Section */}
      <div className="sticky-under-header z-30 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="search"
                aria-label="Search batches by year or title"
                placeholder="Search batches or photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600" aria-live="polite">
              Showing <span className="font-semibold text-primary-700">{filteredBatches.length}</span> batches
            </p>
          </div>

          {/* Year Pills */}
          <div className="relative mt-4">
          <div className="flex gap-2 items-center overflow-x-auto lg:overflow-visible lg:flex-wrap pb-1 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by year">
            <m.button
              type="button"
              aria-pressed={selectedYear === 'All'}
              onClick={() => setSelectedYear('All')}
              className={`shrink-0 px-5 py-2 rounded-full font-medium transition-all ${
                selectedYear === 'All'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </m.button>
            {allYears.map((year, i) => (
              <m.div
                key={`year-${year}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i, 12) * 0.02 }}
                className="shrink-0"
              >
              <m.button
                type="button"
                aria-pressed={selectedYear === year}
                onClick={() => setSelectedYear(year)}
                className={`shrink-0 px-4 py-2 rounded-full font-medium transition-all text-sm ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                    : yearsWithPhotos.includes(year)
                      ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05, transition: { duration: 0.2, delay: 0 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1, delay: 0 } }}
              >
                {year}
              </m.button>
              </m.div>
            ))}
          </div>
          <GradualBlur position="left" height="2rem" strength={0.5} layers={5} tint="rgba(255,255,255,0.9)" autoHide zIndex={1} className="lg:hidden" />
          <GradualBlur position="right" height="2.5rem" strength={0.5} layers={5} tint="rgba(255,255,255,0.9)" autoHide zIndex={1} className="lg:hidden" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredBatches.length > 0 ? (
              <StaggerContainer className="space-y-20" stagger={0.15}>
                {filteredBatches.map((batch) => (
                  <FadeInItem key={batch.year}>
                    <BatchCard 
                      batch={batch} 
                      allPhotos={allPhotos}
                      onPhotoClick={openLightbox}
                    />
                  </FadeInItem>
                ))}
              </StaggerContainer>
            ) : (
              <FadeIn>
                <div className="text-center py-20">
                  <m.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                  </m.div>
                  <h3 className="text-2xl font-display font-bold text-gray-700 mb-2">No batches found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <GraduationCap aria-hidden className="w-7 h-7 text-secondary-300" />
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-2xl md:text-3xl">Are you a Sacred Heart alumnus?</h2>
              <p className="text-primary-100 mt-2">Stay connected with your school. Register on the school&apos;s alumni registration form.</p>
            </div>
            <a
              href={onlineServices.alumniRegistration}
              target="_blank"
              rel="noopener noreferrer"
              className="active:scale-95 inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-7 py-3.5 rounded-full font-semibold hover:bg-secondary-300 transition-colors whitespace-nowrap"
            >
              Alumni registration <ExternalLink aria-hidden size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedPhoto && (
          <Lightbox 
            photo={selectedPhoto}
            allPhotos={allPhotos}
            currentIndex={selectedBatchIndex}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </>
  )
}
