'use client'

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* Honour the visitor's "reduce motion" setting for every Framer Motion animation */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}