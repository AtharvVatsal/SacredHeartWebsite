'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { FadeIn } from '@/components/animations'
import type { LookValue } from './definitions'

/** True inside a Columns block: column items render compactly, without their own section */
export const InColumnContext = createContext(false)
export const useInColumn = () => useContext(InColumnContext)

/** True on the dark green background, so text switches to light colours */
const DarkContext = createContext(false)
export const useDark = () => useContext(DarkContext)

const BACKGROUND: Record<LookValue['background'], string> = {
  white: 'bg-white',
  light: 'bg-gray-50',
  mint: 'bg-gradient-to-b from-primary-50 to-white',
  gold: 'bg-secondary-50',
  green: 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white',
}
const SPACING: Record<LookValue['spacing'], string> = { compact: 'py-10 md:py-12', normal: 'py-16 md:py-20', spacious: 'py-24 md:py-32' }
const WIDTH: Record<LookValue['width'], string> = { narrow: 'max-w-3xl mx-auto', normal: 'max-w-5xl mx-auto', wide: '' }

/** The outer box every general section uses: approved background, spacing and width */
export function SectionFrame({ look, children, className = '' }: { look: LookValue; children: ReactNode; className?: string }) {
  const dark = look.background === 'green'
  return (
    <DarkContext.Provider value={dark}>
      <section className={`relative overflow-hidden ${BACKGROUND[look.background]} ${SPACING[look.spacing]} ${className}`}>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`${WIDTH[look.width]} ${look.align === 'center' ? 'text-center' : ''}`}>{children}</div>
        </div>
      </section>
    </DarkContext.Provider>
  )
}

interface HeadingProps {
  heading: { eyebrow: string; title: string; intro: string; divider: boolean }
  align?: 'left' | 'center'
  level?: 'h2' | 'h3'
}

/** Eyebrow, title, gold divider and introduction in the site's heading style */
export function SectionHeader({ heading, align = 'left', level = 'h2' }: HeadingProps) {
  const dark = useDark()
  if (!heading.eyebrow && !heading.title && !heading.intro) return null
  const Title = level
  const center = align === 'center'
  return (
    <FadeIn blur>
      <div className={`mb-12 ${center ? 'text-center' : ''}`}>
        {heading.eyebrow && <p className={`text-sm font-semibold tracking-wider uppercase mb-3 ${dark ? 'text-secondary-400' : 'text-secondary-800'}`}>{heading.eyebrow}</p>}
        {heading.title && <Title className={`text-3xl md:text-4xl font-display font-bold mb-4 ${dark ? 'text-white' : 'text-primary-900'}`}>{heading.title}</Title>}
        {heading.divider && heading.title && (
          <div className={`w-20 mb-6 ${center ? 'mx-auto' : ''}`}>
            <div className="h-1 bg-secondary-400 rounded-full w-full" />
          </div>
        )}
        {heading.intro && <p className={`text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${dark ? 'text-primary-100' : 'text-gray-600'}`}>{heading.intro}</p>}
      </div>
    </FadeIn>
  )
}
