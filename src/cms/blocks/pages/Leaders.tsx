'use client'

// Head Boy / Head Girl message cards, moved verbatim from that page
import { m } from 'framer-motion'
import { Crown, Quote } from 'lucide-react'
import { useRevealAll } from '@/components/animations/RevealContext'
import type { BlockProps } from '../../document/definition'
import { CmsImage } from '../shared/CmsImage'
import { useInView } from '../shared/reveal'
import type { LeaderMessages as MessagesDef } from './about.definitions'

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } } }

const LOOKS = {
  green: {
    header: 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900',
    glow: 'bg-secondary-500/10',
    photo: 'bg-primary-800',
    pill: 'bg-secondary-400/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-secondary-300 mb-3',
    crown: 'w-4 h-4 text-secondary-400',
    subtitle: 'text-primary-200 text-lg',
    quoteBg: 'bg-primary-100',
    quote: 'w-6 h-6 text-primary-600',
  },
  gold: {
    header: 'bg-gradient-to-br from-secondary-600 via-secondary-500 to-secondary-700',
    glow: 'bg-primary-500/10',
    photo: 'bg-secondary-700',
    pill: 'bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-white mb-3',
    crown: 'w-4 h-4',
    subtitle: 'text-secondary-100 text-lg',
    quoteBg: 'bg-secondary-100',
    quote: 'w-6 h-6 text-secondary-600',
  },
} as const

function MessageParagraph({ text, index, last }: { text: string; index: number; last: boolean }) {
  const fade = useInView({ opacity: 0 }, { opacity: 1 })
  return (
    <m.p
      className={`mb-6 leading-relaxed ${last ? 'mt-8 pt-4 border-t border-gray-100 font-medium text-primary-800 whitespace-pre-line' : ''}`}
      {...fade}
      transition={{ delay: index * 0.05 }}
    >
      {text}
    </m.p>
  )
}

export function LeaderMessages({ cards }: BlockProps<typeof MessagesDef>) {
  const revealAll = useRevealAll()
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <m.div
          className="max-w-4xl mx-auto space-y-12"
          variants={containerVariants}
          initial={revealAll ? false : 'hidden'}
          {...(revealAll ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true } })}
        >
          {cards.map((card, c) => {
            const look = LOOKS[card.look]
            const paragraphs = card.message.split('\n\n')
            return (
              <m.div key={c} variants={itemVariants} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`${look.header} p-8 relative overflow-hidden`}>
                  <m.div className={`absolute top-0 right-0 w-64 h-64 ${look.glow} rounded-full blur-[80px]`} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <m.div className="relative w-32 h-40 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20" whileHover={{ scale: 1.02 }}>
                      <CmsImage image={card.photo} alt={card.photo.alt || `${card.name}, ${card.role}`} fill className={`object-contain ${look.photo}`} />
                    </m.div>
                    <div className="text-center md:text-left flex-1">
                      <div className={`inline-flex items-center gap-2 ${look.pill}`}>
                        <Crown className={look.crown} />
                        {card.role}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{card.name}</h2>
                      {card.subtitle && <p className={look.subtitle}>{card.subtitle}</p>}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 ${look.quoteBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Quote className={look.quote} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl text-primary-900 mb-2">{card.heading}</h3>
                    </div>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-600">
                    {paragraphs.map((paragraph, index) => (
                      <MessageParagraph key={index} text={paragraph} index={index} last={index === paragraphs.length - 1} />
                    ))}
                  </div>
                </div>
              </m.div>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}
