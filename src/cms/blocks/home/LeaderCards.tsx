'use client'

import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import { FadeIn, FadeInItem, ParallaxSection, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { SmartLink } from '../shared/SmartLink'
import type { LeaderCards as Def } from './definitions'

export default function LeaderCards(p: BlockProps<typeof Def>) {
  return (
    <Section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden py-24">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary-900/50 to-transparent"></div>
      <ParallaxSection offset={-120} className="absolute -top-40 right-[-10%] w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <ParallaxSection offset={80} className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="text-center mb-16">
            {p.eyebrow && <h2 className="text-sm font-semibold text-secondary-400 tracking-wider uppercase mb-3 text-center">{p.eyebrow}</h2>}
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">{p.title}</h2>
            {p.subtitle && <p className="text-primary-200">{p.subtitle}</p>}
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" delay={0.2}>
          {p.leaders.map((leader, index) => {
            const card = (
              <m.div
                className="glass-dark rounded-3xl p-8 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all relative overflow-hidden group h-full cursor-pointer"
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-5 mb-6">
                  <m.div
                    className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow-secondary transition-shadow relative z-10"
                    whileHover={{ scale: 1.05, rotate: 6 }}
                  >
                    <span className="text-primary-900 font-bold text-lg font-display">{leader.initials || leader.name.charAt(0)}</span>
                  </m.div>
                  <div className="relative z-10">
                    <h3 className="font-display font-bold text-2xl text-white mb-1 group-hover:text-secondary-300 transition-colors">{leader.name}</h3>
                    <p className="text-secondary-400 font-medium text-sm tracking-wide uppercase">{leader.role}</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <span className="text-3xl text-white/20 font-serif absolute -top-4 -left-2"></span>
                  <p className="text-primary-100 italic leading-relaxed pl-4 relative z-10">{leader.message}</p>
                </div>
              </m.div>
            )
            return (
              <FadeInItem key={index} direction={index % 2 === 0 ? 'left' : 'right'} blur>
                {p.cardLink ? <SmartLink href={p.cardLink}>{card}</SmartLink> : card}
              </FadeInItem>
            )
          })}
        </StaggerContainer>

        {p.more.label && p.more.href && (
          <FadeIn blur>
            <div className="text-center mt-10">
              <SmartLink href={p.more.href} className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group">
                {p.more.label}
                <m.span className="flex items-center" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </m.span>
              </SmartLink>
            </div>
          </FadeIn>
        )}
      </div>
    </Section>
  )
}
