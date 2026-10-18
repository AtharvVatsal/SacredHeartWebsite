'use client'

import { m } from 'framer-motion'
import { Fragment, ReactNode } from 'react'

interface TextRevealProps {
  children: string | ReactNode
  className?: string
  delay?: number
  stagger?: number
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.07,
}: TextRevealProps) {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>
  }

  const words = children.split(' ')
  const baseDelay = delay * 0.08

  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <m.span
            className={className}
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.7,
              delay: baseDelay + index * stagger,
              ease: EASE_OUT_EXPO,
            }}
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity, filter',
            }}
          >
            {word}
          </m.span>
          {index < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  )
}
