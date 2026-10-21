'use client'

import { m } from 'framer-motion'
import { ArrowRight, Trophy } from 'lucide-react'
import Section from '@/components/ui/Section'
import { FadeIn, FadeInItem, MagneticButton, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { SmartLink } from '../shared/SmartLink'
import type { AchievementCards as Def } from './definitions'

export default function AchievementCards({ heading, items, more }: BlockProps<typeof Def>) {
  return (
    <Section className="bg-gradient-to-b from-white to-gray-50 py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="text-center mb-16">
            {heading.eyebrow && <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 text-center">{heading.eyebrow}</h2>}
            <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6">{heading.title}</h3>
            <div className="w-20 mx-auto mb-6">
              <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
            </div>
            {heading.intro && <p className="text-gray-600 max-w-2xl mx-auto text-lg pt-2 leading-relaxed">{heading.intro}</p>}
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" delay={0.1}>
          {items.map((item, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group h-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center group-hover:bg-secondary-100 transition-colors">
                    <Trophy className="w-5 h-5 text-secondary-500" />
                  </div>
                  {item.year && <span className="text-sm font-bold text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">{item.year}</span>}
                </div>
                <h4 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-primary-800 transition-colors relative z-10">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{item.text}</p>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>

        {more.label && more.href && (
          <FadeIn delay={0.3} blur>
            <div className="text-center mt-12 pb-4">
              <MagneticButton intensity={0.1}>
                <SmartLink href={more.href} className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all group px-6 py-3 rounded-full hover:bg-primary-50">
                  {more.label}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </SmartLink>
              </MagneticButton>
            </div>
          </FadeIn>
        )}
      </div>
    </Section>
  )
}
