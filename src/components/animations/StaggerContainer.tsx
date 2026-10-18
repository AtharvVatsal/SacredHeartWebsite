'use client'

import { m, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  stagger?: number
  className?: string
  once?: boolean
}

export default function StaggerContainer({
  children,
  delay = 0,
  stagger = 0.09,
  className = '',
  once = true,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
