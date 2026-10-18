'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { m, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'

interface HeroSlideshowProps {
  images: string[]
  interval?: number
}

export default function HeroSlideshow({ images, interval = 5000 }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const reduceMotion = useReducedMotion()
  // Visitors who ask for reduced motion start paused; anyone can pause or resume with the button
  const [userPaused, setUserPaused] = useState<boolean | null>(null)
  const paused = userPaused ?? !!reduceMotion
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const running = !paused && !isHovered && !hasFocus && isInView

  useEffect(() => {
    if (!running) return
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [running, interval, nextSlide])

  return (
    <div
      ref={ref}
      className="relative w-full"
      role="group"
      aria-roledescription="carousel"
      aria-label="School photos"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasFocus(false)
      }}
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
            <Image
              src={images[currentIndex]}
              alt={`School photo ${currentIndex + 1} of ${images.length}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={currentIndex === 0}
            />
          </m.div>
        </AnimatePresence>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent pointer-events-none" />
      </div>

      {/* Controls: pause/play + slide picker. Each dot sits in a 24px hit area. */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 z-20 rounded-full bg-black/25 backdrop-blur-sm px-1">
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          className="w-6 h-6 flex items-center justify-center text-white rounded-full"
        >
          {paused ? <Play aria-hidden size={12} fill="currentColor" /> : <Pause aria-hidden size={12} fill="currentColor" />}
        </button>
        {images.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
            className="w-6 h-6 flex items-center justify-center rounded-full"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-4 h-2 bg-secondary-400' : 'w-2 h-2 bg-white/70 hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      {running && (
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
      )}
    </div>
  )
}
