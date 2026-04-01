'use client'

import { useState, useEffect, useCallback } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'

interface HeroSlideshowProps {
  images: string[]
  interval?: number
}

export default function HeroSlideshow({ images, interval = 5000 }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (isPaused || !isInView) return

    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [isPaused, interval, nextSlide, isInView])

  useEffect(() => {
    if (isHovered) {
      setIsPaused(true)
    } else {
      setIsPaused(false)
    }
  }, [isHovered])

  return (
    <div 
      ref={ref}
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/3]">
        <AnimatePresence mode="wait">
          <m.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.5, 
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt={`School photo ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </m.div>
        </AnimatePresence>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent pointer-events-none" />
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative transition-all duration-300 rounded-full focus:outline-none ${
              index === currentIndex 
                ? 'w-6 h-2 bg-white/90' 
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <m.div 
                className="absolute inset-0 bg-secondary-400 rounded-full"
                layoutId="activeDot"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <m.div 
        className="absolute bottom-0 left-0 h-1 bg-secondary-400/60 origin-left rounded-b-[1.5rem]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        key={`progress-${currentIndex}`}
        transition={{ duration: interval / 1000, ease: 'linear' }}
        style={{ 
          width: '100%',
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}
