'use client'

import { useRef, ReactNode } from 'react'
import { m, useScroll, useTransform, MotionValue } from 'framer-motion'

interface ParallaxSectionProps {
  children?: ReactNode
  offset?: number
  className?: string
  opacityRange?: [number, number]
}

export default function ParallaxSection({
  children,
  offset = 50,
  className = '',
  opacityRange = [1, 1],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [opacityRange[0], 1, opacityRange[1]])

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y, opacity }}>
        {children}
      </m.div>
    </div>
  )
}
