'use client'

import { useRef, ReactNode } from 'react'
import { m, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxSectionProps {
  children?: ReactNode
  offset?: number
  className?: string
  opacityRange?: [number, number]
  smooth?: boolean
}

export default function ParallaxSection({
  children,
  offset = 50,
  className = '',
  opacityRange = [1, 1],
  smooth = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yRaw = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const opacityRaw = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacityRange[0], 1, opacityRange[1]]
  )

  // Spring smoothing produces buttery scroll-linked motion
  const y = useSpring(yRaw, { damping: 30, stiffness: 90, mass: 0.4 })
  const opacitySpring = useSpring(opacityRaw, { damping: 30, stiffness: 90, mass: 0.4 })
  const opacity = smooth ? opacitySpring : opacityRaw

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y, opacity, willChange: 'transform, opacity' }}>
        {children}
      </m.div>
    </div>
  )
}
