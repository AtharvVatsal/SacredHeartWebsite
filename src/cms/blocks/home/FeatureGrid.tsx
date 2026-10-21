'use client'

import { m } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Section from '@/components/ui/Section'
import { FadeIn, FadeInItem, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import type { FeatureGrid as Def } from './definitions'

export default function FeatureGrid({ heading, items }: BlockProps<typeof Def>) {
  return (
    <Section className="bg-white relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 pattern-grid opacity-30 select-none"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary-50 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="text-center mb-16">
            {heading.eyebrow && <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">{heading.eyebrow}</h2>}
            <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6">{heading.title}</h3>
            <div className="w-20 mx-auto mb-6">
              <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
            </div>
            {heading.intro && <p className="text-gray-600 max-w-2xl mx-auto text-lg pt-2 leading-relaxed">{heading.intro}</p>}
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" delay={0.1}>
          {items.map((item, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100/50 rounded-3xl p-8 hover:shadow-2xl hover:border-primary-100 transition-all duration-300 group h-full flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary-50/0 to-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300 shadow-sm relative z-10 group-hover:-rotate-6 transform">
                  <Icon name={item.icon} fallback={BookOpen} className="w-10 h-10 text-primary-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display font-bold text-xl text-primary-900 mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">{item.text}</p>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  )
}
