'use client'

import { m } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Section from '@/components/ui/Section'
import { FadeIn, MagneticButton, TextReveal } from '@/components/animations'
import { useRevealAll } from '@/components/animations/RevealContext'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { Paragraphs } from '../shared/InlineText'
import { SmartLink } from '../shared/SmartLink'
import type { AboutPreview as Def } from './definitions'

type Card = BlockProps<typeof Def>['cards'][number]

// The four card looks used on the home page
const CARD = {
  white: { box: 'bg-white p-5 sm:p-6 md:p-8 rounded-3xl shadow-card hover:shadow-xl border border-gray-50 transition-all group break-words hyphens-auto', iconBox: 'w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors', icon: 'w-7 h-7 text-primary-600 group-hover:text-white transition-colors', title: 'font-display font-bold text-lg sm:text-xl text-primary-900 mb-2', text: 'text-gray-600 leading-relaxed' },
  green: { box: 'bg-gradient-to-br from-primary-600 to-primary-800 p-5 sm:p-6 md:p-8 rounded-3xl shadow-glow hover:shadow-xl transition-all group break-words hyphens-auto', iconBox: 'w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-md', icon: 'w-7 h-7 text-white', title: 'font-display font-bold text-lg sm:text-xl text-white mb-2', text: 'text-primary-100 leading-relaxed' },
  gold: { box: 'bg-gradient-to-br from-secondary-400 to-secondary-600 p-5 sm:p-6 md:p-8 rounded-3xl shadow-glow-secondary hover:shadow-xl transition-all group break-words hyphens-auto', iconBox: 'w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-md', icon: 'w-7 h-7 text-primary-900', title: 'font-display font-bold text-lg sm:text-xl text-primary-900 mb-2', text: 'text-primary-800 font-medium leading-relaxed' },
  grey: { box: 'bg-white p-5 sm:p-6 md:p-8 rounded-3xl shadow-card hover:shadow-xl border border-gray-50 transition-all group break-words hyphens-auto', iconBox: 'w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors', icon: 'w-7 h-7 text-primary-600 group-hover:text-white transition-colors', title: 'font-display font-bold text-lg sm:text-xl text-primary-900 mb-2', text: 'text-gray-500 leading-relaxed' },
} as const

function FeatureCard({ card }: { card: Card }) {
  const c = CARD[card.style]
  return (
    <m.div className={c.box} whileHover={{ scale: 1.02, y: -4 }}>
      <div className={c.iconBox}>
        <Icon name={card.icon} className={c.icon} />
      </div>
      <h4 className={c.title}>{card.title}</h4>
      <p className={c.text}>{card.text}</p>
    </m.div>
  )
}

export default function AboutPreview(p: BlockProps<typeof Def>) {
  const revealAll = useRevealAll()
  const [first, second, third, fourth] = p.cards
  const paragraphs = p.body.split(/\n\s*\n/)
  return (
    <Section className="bg-white relative overflow-hidden py-24">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
      <div className="absolute -left-32 top-32 w-96 h-96 bg-secondary-100 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right" blur>
            {p.eyebrow && <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 text-left">{p.eyebrow}</h2>}
            <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6 leading-tight">
              <TextReveal>{p.title}</TextReveal>
            </h3>
            {/* First paragraph is the larger lead, as on the original page */}
            <Paragraphs text={paragraphs[0]} className="text-gray-600 mb-6 leading-relaxed text-lg" />
            <Paragraphs text={paragraphs.slice(1).join('\n\n')} className="text-gray-600 mb-8 leading-relaxed" />

            {p.chips.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-10">
                {p.chips.map(({ label: item }, i) => (
                  <m.span
                    key={i}
                    initial={revealAll ? false : { opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 border border-primary-200 bg-white text-primary-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:border-primary-400 hover:shadow-md transition-all"
                  >
                    <CheckCircle size={16} className="text-secondary-500" />
                    {item}
                  </m.span>
                ))}
              </div>
            )}

            {p.button.label && p.button.href && (
              <MagneticButton intensity={0.2}>
                <SmartLink
                  href={p.button.href}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-800 to-primary-700 text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-glow transition-all group"
                >
                  {p.button.label}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </SmartLink>
              </MagneticButton>
            )}
          </FadeIn>

          {p.cards.length > 0 && (
            <FadeIn direction="left" delay={0.2} blur>
              <div className="grid grid-cols-2 gap-5 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl z-10 hidden sm:flex">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full animate-pulse-slow"></div>
                </div>
                <div className="space-y-5 mt-8">
                  {first && <FeatureCard card={first} />}
                  {second && <FeatureCard card={second} />}
                </div>
                <div className="space-y-5">
                  {third && <FeatureCard card={third} />}
                  {fourth && <FeatureCard card={fourth} />}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </Section>
  )
}
