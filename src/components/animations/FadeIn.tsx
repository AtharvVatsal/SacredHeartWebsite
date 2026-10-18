'use client'

import { m, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
  once?: boolean
  blur?: boolean
  distance?: number
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  className = '',
  once = true,
  blur = true,
  distance = 36,
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  const blurInitial = blur ? { filter: 'blur(10px)' } : {}
  const blurAnimate = blur ? { filter: 'blur(0px)' } : {}

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction], ...blurInitial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, ...blurAnimate } : {}}
      transition={{
        duration,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      style={{ willChange: 'transform, opacity, filter' }}
      className={className}
    >
      {children}
    </m.div>
  )
}
