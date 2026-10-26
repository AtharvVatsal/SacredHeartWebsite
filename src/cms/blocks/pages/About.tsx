'use client'

// About page sections, moved verbatim from those pages
import { m } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useRevealAll } from '@/components/animations/RevealContext'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { useInView } from '../shared/reveal'
import { Inline } from '../shared/InlineText'
import { SmartLink } from '../shared/SmartLink'
import type { PILL_TONES } from './academics.definitions'
import type {
  AimsGrid as AimsDef,
  DualCta as DualDef,
  MilestoneTimeline as TimelineDef,
  MissionPanel as MissionDef,
  StatTiles as StatsDef,
  StoryCard as StoryDef,
  TINTS,
  ValuesGrid as ValuesDef,
  VisionTabs as VisionDef,
} from './about.definitions'

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

export function DualCta({ title, text, primary, secondary, arrows }: BlockProps<typeof DualDef>) {
  const withArrow = (cls: string) => (arrows ? `${cls} inline-flex items-center gap-2` : cls)
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
                <SmartLink href={primary.href} className={withArrow('active:scale-95 px-8 py-4 bg-primary-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all')}>
                  {primary.label}
                  {arrows && <> <ArrowRight className="w-5 h-5" /></>}
                </SmartLink>
              </m.div>
            )}
            {secondary.label && secondary.href && (
              <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                <SmartLink href={secondary.href} className={withArrow('active:scale-95 px-8 py-4 bg-secondary-400 text-primary-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all')}>
                  {secondary.label}
                  {arrows && <> <ArrowRight className="w-5 h-5" /></>}
                </SmartLink>
              </m.div>
            )}
          </div>
        </m.div>
      </div>
    </section>
  )
}

const timelineContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }
const timelineCard = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
}

type Milestone = BlockProps<typeof TimelineDef>['milestones'][number]

function MilestoneCard({ milestone, isActive, onClick }: { milestone: Milestone; isActive: boolean; onClick: () => void }) {
  return (
    <m.div variants={timelineCard} className="relative">
      <m.button
        type="button"
        onClick={onClick}
        aria-expanded={isActive}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          isActive ? 'bg-gradient-to-br from-primary-600 to-primary-700 border-primary-500 shadow-xl' : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-lg'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${isActive ? 'bg-white/20' : 'bg-gradient-to-br from-primary-100 to-secondary-100'}`}>
            {milestone.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-2xl font-bold ${isActive ? 'text-secondary-300' : 'text-primary-600'}`}>{milestone.year}</span>
              {isActive && (
                <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-2 py-0.5 bg-secondary-400 text-primary-900 text-xs font-bold rounded-full">
                  Active
                </m.span>
              )}
            </div>
            <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-primary-900'}`}>{milestone.title}</h3>
            <p className={`text-sm ${isActive ? 'text-white/70' : 'text-gray-500'}`}>{milestone.subtitle}</p>
          </div>
          <m.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}
          >
            <ChevronDown className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
          </m.div>
        </div>

        <m.div
          initial={false}
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={`mt-6 pt-6 border-t ${isActive ? 'border-white/20' : 'border-gray-100'}`}>
            <p className={`leading-relaxed ${isActive ? 'text-white/90' : 'text-gray-600'}`}>{milestone.content}</p>
          </div>
        </m.div>
      </m.button>

      {!isActive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </m.div>
  )
}

export function MilestoneTimeline({ pill, pillIcon, pillTone, title, intro, milestones, endIcon, endTitle, endText }: BlockProps<typeof TimelineDef>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const revealAll = useRevealAll()
  const rise = useInView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  const riseSmall = useInView({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })
  const popEnd = useInView({ scale: 0, opacity: 0 }, { scale: 1, opacity: 1 })
  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <m.div {...rise} className="max-w-4xl mx-auto">
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

          <m.div
            variants={timelineContainer}
            initial={revealAll ? false : 'hidden'}
            {...(revealAll ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true } })}
            className="space-y-4"
          >
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={index}
                milestone={milestone}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              />
            ))}
          </m.div>

          {endTitle && (
            <m.div {...popEnd} transition={{ delay: 0.5, type: 'spring' }} className="flex justify-center mt-16">
              <div className="flex flex-col items-center">
                <m.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                >
                  <Icon name={endIcon} className="w-10 h-10 text-white" />
                </m.div>
                <span className="mt-4 text-primary-700 font-bold text-lg">{endTitle}</span>
                {endText && <span className="text-gray-500 text-sm">{endText}</span>}
              </div>
            </m.div>
          )}
        </m.div>
      </div>
    </section>
  )
}

export function MissionPanel({ icon, title, subtitle, text }: BlockProps<typeof MissionDef>) {
  const rise = useInView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })
  const pop = useInView({ scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 })
  const fade = useInView({ opacity: 0 }, { opacity: 1 })
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <m.div className="absolute top-20 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]" animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <m.div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-[100px]" animate={{ x: [0, -30, 0], y: [0, -50, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <m.div className="max-w-4xl mx-auto" {...rise} transition={{ duration: 0.8 }}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-14">
            <m.div {...pop} className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-secondary-400 rounded-2xl flex items-center justify-center shadow-xl">
                <Icon name={icon} className="w-8 h-8 text-primary-900" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">{title}</h2>
                {subtitle && <p className="text-secondary-300 text-sm">{subtitle}</p>}
              </div>
            </m.div>
            <m.p className="text-gray-200 leading-relaxed text-lg md:text-xl" {...fade}>
              {text}
            </m.p>
          </div>
        </m.div>
      </div>
    </section>
  )
}

export function StoryCard({ look, pill, pillIcon, pillTone, title, body }: BlockProps<typeof StoryDef>) {
  const dark = look === 'dark'
  const rise = useInView({ opacity: 0, y: 30 }, { opacity: 1, y: 0 })
  const settle = useInView({ opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  return (
    <section className={`py-24 ${dark ? 'bg-gradient-to-br from-secondary-50 via-white to-primary-50' : 'bg-gradient-to-b from-primary-50 to-white'} relative overflow-hidden`}>
      <div className={`absolute ${dark ? 'bottom-20 left-0' : 'top-20 right-0'} w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none`} />
      <div className="container mx-auto px-4 relative z-10">
        <m.div {...rise} className="max-w-4xl mx-auto">
          <m.div className="text-center mb-12">
            {pill && (
              <span className={`inline-flex items-center gap-2 ${PILL[pillTone]} px-4 py-2 rounded-full text-sm font-medium mb-4`}>
                <Icon name={pillIcon} className="w-4 h-4" />
                {pill}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900">{title}</h2>
          </m.div>
          <m.div
            {...settle}
            className={dark ? 'bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl shadow-xl p-8 md:p-12 text-white' : 'bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12'}
          >
            {paragraphs.map((p, i) => (
              <p key={i} className={`${dark ? 'text-gray-200' : 'text-gray-700'} leading-relaxed text-lg${i < paragraphs.length - 1 ? ' mb-6' : ''}`}>
                <Inline text={p} />
              </p>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  )
}

export function StatTiles({ tiles }: BlockProps<typeof StatsDef>) {
  const rise = useInView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <m.div className="max-w-5xl mx-auto" {...rise} transition={{ duration: 0.8 }}>
          <div className="grid md:grid-cols-3 gap-8">
            {tiles.map((tile, i) => {
              const gold = tile.look === 'gold'
              return (
                <m.div
                  key={i}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`${gold ? 'bg-gradient-to-br from-secondary-400 to-secondary-500' : 'bg-gradient-to-br from-primary-50 to-primary-100'} p-10 rounded-3xl text-center relative overflow-hidden group`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${gold ? 'bg-white/20' : 'bg-primary-200/30'} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 ${gold ? 'bg-white/20' : 'bg-white'} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <Icon name={tile.icon} className={`w-8 h-8 ${gold ? 'text-primary-900' : 'text-primary-600'}`} />
                    </div>
                    <div className="text-5xl font-display font-bold text-primary-900 mb-2">{tile.value}</div>
                    <p className={`${gold ? 'text-primary-800' : 'text-gray-600'} font-medium`}>{tile.label}</p>
                  </div>
                </m.div>
              )
            })}
          </div>
        </m.div>
      </div>
    </section>
  )
}
