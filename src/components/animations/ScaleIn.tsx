'use client'

import { m, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  from?: number
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.65,
  className = '',
  from = 0.85,
}: ScaleInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, scale: from, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
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
