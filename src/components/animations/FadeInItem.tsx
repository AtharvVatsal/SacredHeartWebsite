'use client'

import { m, useInView } from 'framer-motion'
import { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { StaggerContext } from './StaggerContainer'

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
  const stagger = useContext(StaggerContext)
  const once = stagger?.once ?? true
  const ref = useRef<HTMLDivElement>(null)
  // Each item watches itself, so items deep in a long grid reveal when they are actually reached
  const isInView = useInView(ref, { once, margin: '0px 0px -40px 0px' })
  // null until this item has entered view and been given its place in the stagger
  const [delay, setDelay] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) setDelay(stagger ? stagger.nextDelay() : 0)
    else if (!once) setDelay(null)
  }, [isInView, once, stagger])

  const offsets = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  const blurInitial = blur ? { filter: 'blur(8px)' } : {}
  const blurAnimate = blur ? { filter: 'blur(0px)' } : {}
  const hidden = { opacity: 0, ...offsets[direction], ...blurInitial }

  return (
    <m.div
      ref={ref}
      initial={hidden}
      animate={delay !== null ? { opacity: 1, x: 0, y: 0, ...blurAnimate } : hidden}
      transition={{ duration: 0.65, delay: delay ?? 0, ease: EASE_OUT_EXPO }}
      style={{ willChange: 'transform, opacity, filter' }}
      className={className}
      // Keyboard focus never lands on something still invisible: reveal straight away
      onFocusCapture={() => setDelay(d => d ?? 0)}
    >
      {children}
    </m.div>
  )
}
