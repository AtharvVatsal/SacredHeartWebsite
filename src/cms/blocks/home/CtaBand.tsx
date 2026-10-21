'use client'

import { ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import { FadeIn, FadeInItem, MagneticButton, ParallaxSection, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { SmartLink } from '../shared/SmartLink'
import type { CtaBand as Def } from './definitions'

export default function CtaBand(p: BlockProps<typeof Def>) {
  return (
    <Section
      className={`bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden py-32 rounded-t-[3rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] ${p.overlapPrevious ? '-mt-10' : ''}`}
    >
      <div className="absolute inset-0 pattern-grid opacity-20 select-none"></div>

      <ParallaxSection offset={-50} className="absolute top-0 right-0">
        <div className="w-[800px] h-[800px] bg-secondary-400/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      </ParallaxSection>
      <ParallaxSection offset={100} className="absolute bottom-0 left-0">
        <div className="w-[600px] h-[600px] bg-primary-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      </ParallaxSection>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn blur direction="up">
          {p.eyebrow && <h2 className="text-sm font-semibold text-secondary-400 tracking-wider uppercase mb-4 text-center">{p.eyebrow}</h2>}
          <h3 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white drop-shadow-sm">{p.title}</h3>
          {p.text && <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto leading-relaxed">{p.text}</p>}
        </FadeIn>

        <StaggerContainer className="flex flex-col sm:flex-row justify-center items-center gap-5" delay={0.2}>
          {p.primary.label && p.primary.href ? (
            <FadeInItem direction="up" blur>
              <MagneticButton intensity={0.3}>
                <SmartLink
                  href={p.primary.href}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-secondary-400 text-primary-900 px-10 py-4 rounded-full font-bold hover:shadow-glow-secondary transition-all text-lg group relative overflow-hidden"
                >
                  <span className="relative z-10">{p.primary.label}</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </SmartLink>
              </MagneticButton>
            </FadeInItem>
          ) : null}
          {p.secondary.label && p.secondary.href ? (
            <FadeInItem direction="up" blur>
              <MagneticButton intensity={0.1}>
                <SmartLink
                  href={p.secondary.href}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-lg group shadow-lg"
                >
                  {p.secondary.label}
                </SmartLink>
              </MagneticButton>
            </FadeInItem>
          ) : null}
        </StaggerContainer>
      </div>
    </Section>
  )
}
