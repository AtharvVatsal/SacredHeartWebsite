'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import Section from '@/components/ui/Section'
import { FadeIn, ParallaxSection } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import type { QuoteFeature as Def } from './definitions'

export default function QuoteFeature(p: BlockProps<typeof Def>) {
  return (
    <Section className="bg-gradient-to-br from-primary-50 to-white relative overflow-hidden py-24">
      <ParallaxSection offset={-80} className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-400/5 rounded-full blur-[100px] pointer-events-none" />
      <ParallaxSection offset={60} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-200/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              {p.heading.eyebrow && <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 text-center">{p.heading.eyebrow}</h2>}
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6">{p.heading.title}</h3>
              <div className="w-20 mx-auto">
                <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
              </div>
            </div>

            <m.div className="glass rounded-3xl shadow-xl border border-white/60 p-8 md:p-12 relative overflow-hidden" whileHover={{ scale: 1.01 }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-[100px] pointer-events-none opacity-50"></div>
              <div className="absolute -top-6 -left-6 text-9xl text-primary-100 font-serif leading-none opacity-50 pointer-events-none">&quot;</div>

              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                {p.photo.src && (
                  <m.div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full flex-shrink-0 shadow-xl border-4 border-white relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-primary-200 opacity-50 scale-110 animate-ping" style={{ animationDuration: '3s' }}></div>
                    <Image src={p.photo.src} alt={p.photo.alt} fill className="object-cover rounded-full" />
                  </m.div>
                )}
                <div className="text-center md:text-left">
                  <p className="text-gray-700 italic mb-8 leading-relaxed text-xl md:text-2xl font-body">&quot;{p.quote}&quot;</p>
                  <div className="inline-block">
                    <h4 className="font-display font-bold text-xl md:text-2xl text-primary-900 mb-1">{p.name}</h4>
                    <p className="text-secondary-800 font-medium tracking-wide uppercase text-sm">{p.role}</p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </FadeIn>
      </div>
    </Section>
  )
}
