'use client'

import React, { useRef, useState, useEffect } from 'react'
import { m, useSpring } from 'framer-motion'
import Link from 'next/link'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  className?: string
  intensity?: number
  onClick?: () => void
}

export default function MagneticButton({
  children,
  href,
  className = '',
  intensity = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return

      const { clientX, clientY } = e
      const { left, top, width, height } = ref.current.getBoundingClientRect()

      const middleX = clientX - (left + width / 2)
      const middleY = clientY - (top + height / 2)

      x.set(middleX * intensity)
      y.set(middleY * intensity)
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      x.set(0)
      y.set(0)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered, x, y, intensity])

  const content = (
    <m.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </m.div>
  )

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a>{content}</a>
      </Link>
    )
  }

  return content
}
