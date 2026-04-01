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
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  once = true,
  blur = true,
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  const blurInitial = blur ? { filter: 'blur(8px)' } : {}
  const blurAnimate = blur ? { filter: 'blur(0px)' } : {}

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction], ...blurInitial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, ...blurAnimate } : {}}
      transition={{ 
        duration, 
        delay, 
        type: 'spring',
        damping: 20,
        stiffness: 100
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
