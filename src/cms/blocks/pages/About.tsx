'use client'

// About page sections, moved verbatim from those pages
import { m } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { useInView } from '../shared/reveal'
import { SmartLink } from '../shared/SmartLink'
import type { PILL_TONES } from './academics.definitions'
import type { AimsGrid as AimsDef, DualCta as DualDef, TINTS, ValuesGrid as ValuesDef, VisionTabs as VisionDef } from './about.definitions'

const PILL: Record<(typeof PILL_TONES)[number], string> = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-primary-100 text-primary-700',
  amber: 'bg-amber-100 text-amber-700',
  gold: 'bg-secondary-100 text-secondary-700',
  goldOnDark: 'bg-secondary-400/20 text-secondary-300',
}

interface HeadingProps {
  pill: string
  pillIcon: string
  pillTone: (typeof PILL_TONES)[number]
  title: string
  intro: string
}

/** Large centred heading (pill, title, introduction) used above the About grids */
function LargeHeading({ pill, pillIcon, pillTone, title, intro, dark }: HeadingProps & { dark?: boolean }) {
  const rise = useInView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  return (
    <m.div className="text-center mb-16" {...rise}>
      {pill && (
        <span className={`inline-flex items-center gap-2 ${PILL[pillTone]} px-4 py-2 rounded-full text-sm font-medium mb-4`}>
          <Icon name={pillIcon} className="w-4 h-4" />
          {pill}
        </span>
      )}
      <h2 className={`text-3xl md:text-5xl font-display font-bold ${dark ? 'text-white' : 'text-primary-900'} mb-4`}>{title}</h2>
      {intro && <p className={`${dark ? 'text-primary-200' : 'text-gray-600'} text-lg max-w-2xl mx-auto`}>{intro}</p>}
    </m.div>
  )
}

function VisionTab({ index, title, active, onSelect }: { index: number; title: string; active: boolean; onSelect: () => void }) {
  const slide = useInView({ opacity: 0, x: -20 }, { opacity: 1, x: 0 })
  return (
    <m.div {...slide} transition={{ delay: index * 0.1 }}>
      <m.button
        type="button"
        aria-pressed={active}
        onClick={onSelect}
        whileHover={{ scale: 1.02, transition: { duration: 0.2, delay: 0 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1, delay: 0 } }}
        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
          active ? 'bg-gradient-to-br from-primary-600 to-primary-700 border-primary-500 shadow-xl text-white' : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-lg'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-white/20' : 'bg-primary-100'}`}>
            <span className={`font-bold ${active ? 'text-white' : 'text-primary-600'}`}>{index + 1}</span>
          </div>
          <span className={`font-semibold ${active ? 'text-white' : 'text-primary-900'}`}>{title}</span>
        </div>
      </m.button>
    </m.div>
  )
}

export function VisionTabs({ pill, pillIcon, pillTone, title, intro, items }: BlockProps<typeof VisionDef>) {
  const [active, setActive] = useState(0)
  const rise = useInView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  const riseSmall = useInView({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })
  const current = items[Math.min(active, items.length - 1)]
  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <m.div {...rise} className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            {pill && (
              <m.div {...riseSmall} className={`inline-flex items-center gap-2 ${PILL[pillTone]} px-4 py-2 rounded-full text-sm font-medium mb-4`}>
                <Icon name={pillIcon} className="w-4 h-4" />
                {pill}
              </m.div>
            )}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900">{title}</h2>
            {intro && <p className="text-gray-600 mt-2">{intro}</p>}
          </div>

          {current && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                {items.map((item, index) => (
                  <VisionTab key={index} index={index} title={item.title} active={active === index} onSelect={() => setActive(index)} />
                ))}
              </div>

              <m.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold">{active + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{current.title}</h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 leading-relaxed text-lg">{current.content}</p>
                </div>
              </m.div>
            </div>
          )}
        </m.div>
      </div>
    </section>
  )
}

const TINT: Record<(typeof TINTS)[number], string> = {
  amber: 'bg-amber-50',
  pink: 'bg-pink-50',
  blue: 'bg-blue-50',
  purple: 'bg-purple-50',
  emerald: 'bg-emerald-50',
  cyan: 'bg-cyan-50',
}

export function AimsGrid({ aims, ...heading }: BlockProps<typeof AimsDef>) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-50 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <LargeHeading pill={heading.pill} pillIcon={heading.pillIcon} pillTone={heading.pillTone} title={heading.title} intro={heading.intro} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {aims.map((aim, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-2xl hover:border-transparent transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${aim.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`w-20 h-20 ${TINT[aim.tint]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${aim.color} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                  <Icon name={aim.icon} className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="font-display font-bold text-2xl text-primary-900 mb-3">{aim.title}</h3>
              <p className="text-gray-600 leading-relaxed">{aim.text}</p>
              <div className={`h-1 bg-gradient-to-r ${aim.color} rounded-full mt-6 w-12 group-hover:w-20 transition-all duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({ index, value }: { index: number; value: BlockProps<typeof ValuesDef>['values'][number] }) {
  const pop = useInView({ opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })
  return (
    <m.div {...pop} transition={{ delay: index * 0.08, type: 'spring' }}>
      <m.div whileHover={{ y: -8, transition: { duration: 0.2, delay: 0 } }} className="group cursor-pointer">
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 h-full flex flex-col items-center justify-center">
          <m.div
            className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon name={value.icon} className="w-8 h-8 text-white" />
          </m.div>
          <span className="font-bold text-white text-sm md:text-base">{value.name}</span>
        </div>
      </m.div>
    </m.div>
  )
}

export function ValuesGrid({ values, ...heading }: BlockProps<typeof ValuesDef>) {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <m.div className="absolute top-20 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]" animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <m.div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-[100px]" animate={{ x: [0, -30, 0], y: [0, -50, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <LargeHeading pill={heading.pill} pillIcon={heading.pillIcon} pillTone={heading.pillTone} title={heading.title} intro={heading.intro} dark />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <ValueCard key={index} index={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function DualCta({ title, text, primary, secondary }: BlockProps<typeof DualDef>) {
  const rise = useInView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <m.div {...rise}>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-4">{title}</h2>
          {text && <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{text}</p>}
          <div className="flex flex-wrap justify-center gap-4">
            {primary.label && primary.href && (
              <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                <SmartLink href={primary.href} className="active:scale-95 px-8 py-4 bg-primary-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                  {primary.label} <ArrowRight className="w-5 h-5" />
                </SmartLink>
              </m.div>
            )}
            {secondary.label && secondary.href && (
              <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                <SmartLink href={secondary.href} className="active:scale-95 px-8 py-4 bg-secondary-400 text-primary-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                  {secondary.label} <ArrowRight className="w-5 h-5" />
                </SmartLink>
              </m.div>
            )}
          </div>
        </m.div>
      </div>
    </section>
  )
}
