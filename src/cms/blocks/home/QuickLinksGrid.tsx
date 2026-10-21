'use client'

import { m } from 'framer-motion'
import { Star } from 'lucide-react'
import Section from '@/components/ui/Section'
import { FadeIn, FadeInItem, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { SmartLink } from '../shared/SmartLink'
import type { QuickLinksGrid as Def } from './definitions'

export default function QuickLinksGrid({ heading, links }: BlockProps<typeof Def>) {
  return (
    <Section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 text-gray-900/[0.02]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="text-center mb-16">
            {heading.eyebrow && <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">{heading.eyebrow}</h2>}
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">{heading.title}</h3>
            <div className="w-20 pl-2 mx-auto mb-6">
              <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
            </div>
            {heading.intro && <p className="text-gray-600 max-w-xl mx-auto text-lg">{heading.intro}</p>}
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {links.map((link, index) => (
            <FadeInItem key={`${link.href}-${index}`} direction="up" blur>
              <SmartLink href={link.href}>
                <m.div
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-card-hover border border-gray-100 transition-all duration-300 h-full flex flex-col justify-center items-center text-center relative overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                  <div className="w-16 h-16 bg-primary-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm relative z-10 group-hover:rotate-12">
                    <Icon name={link.icon} fallback={Star} size={28} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 group-hover:text-primary-900 transition-colors relative z-10">{link.title}</h4>
                </m.div>
              </SmartLink>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  )
}
