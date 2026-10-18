'use client'

import { m, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInItemProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  blur?: boolean
  distance?: number
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function FadeInItem({
  children,
  direction = 'up',
  className = '',
  blur = true,
  distance = 28,
}: FadeInItemProps) {
  const directions: Variants = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  const blurInitial = blur ? { filter: 'blur(8px)' } : {}
  const blurAnimate = blur ? { filter: 'blur(0px)' } : {}

  const itemVariants: Variants = {
    hidden: { opacity: 0, ...directions[direction], ...blurInitial },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...blurAnimate,
      transition: {
        duration: 0.65,
        ease: EASE_OUT_EXPO,
      },
    },
  }

  return (
    <m.div
      variants={itemVariants}
      style={{ willChange: 'transform, opacity, filter' }}
      className={className}
    >
      {children}
    </m.div>
  )
}
