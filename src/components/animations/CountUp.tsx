'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  end: number
  decimals?: number
  duration?: number
  delay?: number
  className?: string
  suffix?: string
  prefix?: string
}

export default function CountUp({
  end,
  decimals = 0,
  duration = 2,
  delay = 0,
  className = '',
  suffix = '',
  prefix = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reduceMotion = useReducedMotion()
  const value = useMotionValue(end)
  const animateRef = useRef(false)
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`

  // The server renders the final number. Only count up if the number starts off-screen, so nobody sees it jump back to 0.
  useEffect(() => {
    const el = ref.current
    if (!el || reduceMotion) return
    const rect = el.getBoundingClientRect()
    if (rect.top > window.innerHeight || rect.bottom < 0) {
      animateRef.current = true
      value.set(0)
    }
  }, [reduceMotion, value])

  useEffect(() => {
    if (!isInView || !animateRef.current) return
    animateRef.current = false
    let controls: ReturnType<typeof animate> | undefined
    const timeoutId = setTimeout(() => {
      controls = animate(value, end, { duration, ease: [0.16, 1, 0.3, 1] })
    }, delay * 1000)
    return () => {
      clearTimeout(timeoutId)
      controls?.stop()
    }
  }, [isInView, end, value, delay, duration])

  useEffect(() => {
    return value.on('change', latest => {
      if (ref.current) ref.current.textContent = format(latest)
    })
  })

  return (
    <span className={className}>
      <span className="sr-only">{format(end)}</span>
      <span ref={ref} aria-hidden="true">{format(end)}</span>
    </span>
  )
}
