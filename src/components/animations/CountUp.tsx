'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useInView, useSpring, useMotionValue, animate } from 'framer-motion'

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
  const value = useMotionValue(0)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    const timeoutId = setTimeout(() => {
      const controls = animate(value, end, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      })
      setHasAnimated(true)
      return () => controls.stop()
    }, delay * 1000)

    return () => clearTimeout(timeoutId)
  }, [isInView, end, value, delay, duration, hasAnimated])

  useEffect(() => {
    return value.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`
      }
    })
  }, [value, prefix, suffix])

  return (
    <m.span ref={ref} className={className}>
      {prefix}0{suffix}
    </m.span>
  )
}
