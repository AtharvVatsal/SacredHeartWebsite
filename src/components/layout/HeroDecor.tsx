'use client'

import { m, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface HeroDecorProps {
  /** Large motif drifting at the top right, related to the page (like the building on About Us) */
  icon: LucideIcon
  /** Smaller motif drifting at the bottom left */
  secondaryIcon?: LucideIcon
  /** Draw the two soft colour orbs too, for heroes that don't already have their own */
  orbs?: boolean
  /** Small twinkling gold points scattered over the right half */
  sparkles?: boolean
}

const SPARKS = [
  { top: '26%', left: '62%', size: 'w-1.5 h-1.5', duration: 3.2, delay: 0 },
  { top: '58%', left: '76%', size: 'w-2 h-2', duration: 4, delay: 0.8 },
  { top: '36%', left: '90%', size: 'w-1.5 h-1.5', duration: 3.6, delay: 1.6 },
  { top: '72%', left: '58%', size: 'w-1 h-1', duration: 4.4, delay: 0.4 },
  { top: '18%', left: '82%', size: 'w-1 h-1', duration: 3.8, delay: 2.2 },
]

/**
 * Decorative layer for the green page heroes: the same floating-motif language as
 * About Us / Admission / Gallery, so every route's hero feels like part of one family.
 * Purely visual: hidden from assistive tech and never intercepts clicks.
 */
export default function HeroDecor({ icon: Icon, secondaryIcon: SecondaryIcon, orbs = false, sparkles = true }: HeroDecorProps) {
  // With reduced motion everything stays put (MotionConfig already stops movement; this also stops the twinkle)
  const still = useReducedMotion()

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {orbs && (
        <>
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
        </>
      )}

      <m.div
        className="absolute top-32 right-4 md:top-36 md:right-16 lg:right-24 opacity-10"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon className="w-24 h-24 md:w-32 md:h-32 text-white" strokeWidth={1.5} />
      </m.div>

      {SecondaryIcon && (
        <m.div
          className="absolute bottom-28 left-[55%] md:left-auto md:right-[38%] opacity-10 hidden sm:block"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SecondaryIcon className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
        </m.div>
      )}

      {sparkles &&
        SPARKS.map((s, i) => (
          <m.span
            key={i}
            className={`absolute ${s.size} rounded-full bg-secondary-300`}
            style={{ top: s.top, left: s.left }}
            initial={{ opacity: 0.4 }}
            animate={still ? undefined : { opacity: [0.15, 0.7, 0.15], scale: [1, 1.5, 1] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
    </div>
  )
}
