'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useInView, useSpring } from 'framer-motion'

interface CountUpProps {
  end: number
  duration?: number
  delay?: number
  className?: string
  suffix?: string
  prefix?: string
}

export default function CountUp({
  end,
  duration = 2,
  delay = 0,
  className = '',
  suffix = '',
  prefix = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => {
        springValue.set(end)
        setHasAnimated(true)
      }, delay * 1000)
    }
  }, [isInView, end, springValue, delay, hasAnimated])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`
      }
    })
  }, [springValue, prefix, suffix])

  return (
    <m.span ref={ref} className={className}>
      {prefix}0{suffix}
    </m.span>
  )
}