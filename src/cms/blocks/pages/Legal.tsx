'use client'

// Privacy Policy / Terms of Use sections, moved verbatim from those pages
import { m } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRevealAll } from '@/components/animations/RevealContext'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { SmartLink } from '../shared/SmartLink'
import type { PolicyIntro as IntroDef, PolicySections as SectionsDef, SimpleCta as CtaDef } from './legal.definitions'

/** whileInView props, or shown at once inside the editor canvas */
function useReveal(from: Record<string, number>) {
  const revealAll = useRevealAll()
  return revealAll ? { initial: false as const } : { initial: from, whileInView: Object.fromEntries(Object.keys(from).map((k) => [k, k === 'opacity' || k === 'scale' ? 1 : 0])), viewport: { once: true } }
}

export function PolicyIntro(p: BlockProps<typeof IntroDef>) {
  const reveal = useReveal({ opacity: 0, y: 30 })
  const gold = p.tone === 'gold'
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <div className="container mx-auto px-4">
        <m.div className="max-w-4xl mx-auto" {...reveal} transition={{ duration: 0.8 }}>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 ${gold ? 'bg-secondary-100' : 'bg-primary-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon name={p.icon} className={`w-6 h-6 ${gold ? 'text-secondary-600' : 'text-primary-600'}`} />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-primary-900 mb-2">{p.label}</h2>
                <p className="text-gray-600">{p.value}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{p.text}</p>
          </div>
        </m.div>
      </div>
    </section>
  )
}

export function PolicySections({ sections }: BlockProps<typeof SectionsDef>) {
  const reveal = useReveal({ opacity: 0, y: 30 })
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <m.div key={index} {...reveal} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary-200 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name={section.icon} className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-primary-900">{section.title}</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">{section.content}</div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SimpleCta(p: BlockProps<typeof CtaDef>) {
  const rise = useReveal({ opacity: 0, y: 20 })
  const pop = useReveal({ opacity: 0, scale: 0.8 })
  return (
    <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <m.h2 className="text-3xl md:text-4xl font-display font-bold mb-6" {...rise}>
          {p.title}
        </m.h2>
        {p.text && (
          <m.p className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg" {...rise} transition={{ delay: 0.2 }}>
            {p.text}
          </m.p>
        )}
        {p.button.label && p.button.href && (
          <m.div {...pop} transition={{ delay: 0.4 }}>
            <SmartLink
              href={p.button.href}
              className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {p.button.label} <ArrowLeft className="rotate-180" size={20} />
            </SmartLink>
          </m.div>
        )}
      </div>
    </section>
  )
}
