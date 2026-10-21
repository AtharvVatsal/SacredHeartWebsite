'use client'

// Academics page sections, moved verbatim from those pages
import { m } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useRevealAll } from '@/components/animations/RevealContext'
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider'
import { telHref } from '@/lib/contact'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import type { CallBand as CallDef, GuidelineCard as GuideDef, NoticeStrip as NoticeDef } from './academics.definitions'

/** Scroll-triggered reveal props; inside the editor canvas the content is shown at once */
function useInViewProps(from: Record<string, number>, to: Record<string, number>) {
  return useRevealAll() ? { initial: false as const } : { initial: from, whileInView: to, viewport: { once: true } }
}

export function NoticeStrip({ icon, text }: BlockProps<typeof NoticeDef>) {
  const reveal = useInViewProps({ opacity: 0 }, { opacity: 1 })
  return (
    <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
      <div className="container mx-auto px-4">
        <m.div className="flex items-center justify-center gap-3 text-amber-800" {...reveal}>
          <Icon name={icon} className="w-6 h-6" />
          <span className="font-medium text-lg">{text}</span>
        </m.div>
      </div>
    </section>
  )
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } } }

export function GuidelineCard({ icon, title, items }: BlockProps<typeof GuideDef>) {
  const revealAll = useRevealAll()
  const card = useInViewProps({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })
  const heading = useInViewProps({ opacity: 0, x: -20 }, { opacity: 1, x: 0 })
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <m.div className="max-w-4xl mx-auto" {...card} transition={{ duration: 0.8 }}>
          <div className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-8 py-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-500/10 rounded-full blur-[60px]" />
              <m.h2 className="text-2xl font-display font-bold text-white flex items-center gap-3 relative z-10" {...heading} viewport={undefined}>
                <Icon name={icon} className="w-7 h-7 text-secondary-400" />
                {title}
              </m.h2>
            </div>
            <div className="p-8">
              <m.div className="space-y-6" variants={containerVariants} initial={revealAll ? false : 'hidden'} {...(revealAll ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true } })}>
                {items.map((item, index) => (
                  <m.div key={index} variants={itemVariants} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                    <m.div
                      className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary-600 group-hover:to-primary-700 transition-all"
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon name={item.icon} className="w-6 h-6 text-primary-900 group-hover:text-white transition-colors" />
                    </m.div>
                    <div>
                      <m.h3 className="font-display font-bold text-primary-900 mb-1">{item.title}</m.h3>
                      <m.p className="text-gray-600 text-sm leading-relaxed">{item.text}</m.p>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}

export function CallBand({ title, text }: BlockProps<typeof CallDef>) {
  const { contact } = useSiteSettings()
  const phone = contact.phones[0]
  const reveal = useInViewProps({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  return (
    <section className="py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <m.div className="absolute top-20 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]" animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <m.div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]" animate={{ x: [0, -30, 0], y: [0, -50, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <m.div className="max-w-2xl mx-auto text-center" {...reveal} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h2>
          {text && <p className="text-primary-200 text-lg mb-8">{text}</p>}
          {phone && (
            <a href={telHref(phone)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              <Phone aria-hidden className="w-5 h-5 text-secondary-400" />
              <span>Call {phone}</span>
            </a>
          )}
        </m.div>
      </div>
    </section>
  )
}
