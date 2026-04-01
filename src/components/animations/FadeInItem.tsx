'use client'

import { m, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInItemProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  blur?: boolean
}

export default function FadeInItem({
  children,
  direction = 'up',
  className = '',
  blur = true,
}: FadeInItemProps) {
  const directions: Variants = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
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
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  }

  return (
    <m.div variants={itemVariants} className={className}>
      {children}
    </m.div>
  )
}

