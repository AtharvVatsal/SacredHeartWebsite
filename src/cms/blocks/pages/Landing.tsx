'use client'

// Section landing page sections (Academics, Admission, About Us), moved verbatim from those pages
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FadeIn, FadeInItem, ParallaxSection, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { useInView } from '../shared/reveal'
import { SmartLink } from '../shared/SmartLink'
import type {
  ActivitiesBand as ActivitiesDef,
  ClassLevels as LevelsDef,
  ResourceLinks as LinksDef,
  StreamTiles as StreamsDef,
  SubjectOverview as SubjectsDef,
} from './landing.definitions'

/** Small gold line, big title and the short gold divider used above the landing page grids */
function EyebrowHeading({ eyebrow, title, divider = 'spaced', size = 'large', dark, intro, gap = 'mb-16' }: {
  eyebrow: string
  title: string
  divider?: 'spaced' | 'tight' | 'none'
  size?: 'large' | 'medium'
  dark?: boolean
  intro?: string
  gap?: 'mb-16' | 'mb-12'
}) {
  return (
    <FadeIn blur>
      <div className={`text-center ${gap}`}>
        {eyebrow && <h2 className={`text-sm font-semibold ${dark ? 'text-secondary-400' : 'text-secondary-800'} tracking-wider uppercase mb-3`}>{eyebrow}</h2>}
        <h3 className={`text-3xl ${size === 'large' ? 'md:text-5xl' : 'md:text-4xl'} font-display font-bold${dark ? '' : ' text-primary-900'} mb-4`}>{title}</h3>
        {divider !== 'none' && (
          <div className={divider === 'spaced' ? 'w-20 mx-auto mb-6' : 'w-20 mx-auto'}>
            <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
          </div>
        )}
        {intro && <p className="text-gray-300 max-w-2xl mx-auto">{intro}</p>}
      </div>
    </FadeIn>
  )
}

export function ClassLevels({ eyebrow, title, items }: BlockProps<typeof LevelsDef>) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <ParallaxSection offset={-80} className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" stagger={0.1}>
          {items.map((cls, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${cls.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white h-full relative overflow-hidden group`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <m.div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" whileHover={{ rotate: 10 }}>
                    <Icon name={cls.icon} className="w-7 h-7" />
                  </m.div>
                  <h3 className="font-display font-bold text-lg mb-2">{cls.name}</h3>
                  <p className="text-sm text-white/80">{cls.text}</p>
                </div>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

const STREAM_TINT = {
  blue: 'bg-blue-50 border border-blue-200',
  amber: 'bg-amber-50 border border-amber-200',
  pink: 'bg-pink-50 border border-pink-200',
} as const

function StreamSubject({ text, index, color }: { text: string; index: number; color: string }) {
  const slide = useInView({ opacity: 0, x: -10 }, { opacity: 1, x: 0 })
  return (
    <m.li {...slide} transition={{ delay: index * 0.1 }} className="flex items-center gap-3 text-gray-700">
      <span className={`w-2 h-2 bg-gradient-to-br ${color} rounded-full`} />
      {text}
    </m.li>
  )
}

export function StreamTiles({ eyebrow, title, streams }: BlockProps<typeof StreamsDef>) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} divider="tight" />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.15}>
          {streams.map((stream, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div whileHover={{ y: -5 }} className={`${STREAM_TINT[stream.tint]} rounded-3xl p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300`}>
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stream.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="relative z-10">
                  <m.div
                    className={`w-16 h-16 bg-gradient-to-br ${stream.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 10 }}
                  >
                    <Icon name={stream.icon} className="w-8 h-8 text-white" />
                  </m.div>
                  <h3 className="font-display font-bold text-2xl text-primary-900 mb-4 break-words">{stream.name}</h3>
                  <ul className="space-y-3">
                    {stream.subjects.map((subject, i) => (
                      <StreamSubject key={i} text={subject.text} index={i} color={stream.color} />
                    ))}
                  </ul>
                </div>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

const SUBJECT_TONE = {
  violet: 'bg-violet-100 text-violet-700',
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
} as const

export function SubjectOverview({ eyebrow, title, subjects }: BlockProps<typeof SubjectsDef>) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} divider="tight" />
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {subjects.map((subject, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div whileHover={{ scale: 1.05, y: -5 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                <div className={`w-14 h-14 ${SUBJECT_TONE[subject.tone]} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon name="BookOpen" className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-primary-900 mb-4">{subject.category}</h3>
                <ul className="space-y-2">
                  {subject.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

const LINK_TONE = {
  green: { card: 'bg-gradient-to-r from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-xl hover:border-primary-300 transition-all duration-300 group', tile: 'bg-gradient-to-br from-primary-500 to-primary-600', icon: 'w-8 h-8 text-white', arrow: 'w-6 h-6 text-primary-400' },
  purple: { card: 'bg-gradient-to-r from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-xl hover:border-purple-300 transition-all duration-300 group', tile: 'bg-gradient-to-br from-purple-400 to-purple-500', icon: 'w-8 h-8 text-white', arrow: 'w-6 h-6 text-purple-400' },
  gold: { card: 'bg-gradient-to-r from-secondary-50 to-white p-8 rounded-2xl border border-secondary-100 hover:shadow-xl hover:border-secondary-300 transition-all duration-300 group', tile: 'bg-gradient-to-br from-secondary-400 to-secondary-500', icon: 'w-8 h-8 text-primary-900', arrow: 'w-6 h-6 text-secondary-400' },
} as const

export function ResourceLinks({ eyebrow, title, links }: BlockProps<typeof LinksDef>) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} divider="none" size="medium" gap="mb-12" />
        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto" stagger={0.1}>
          {links.map((link, index) => {
            const tone = LINK_TONE[link.tone]
            return (
              <FadeInItem key={index} direction={index % 2 === 0 ? 'left' : 'right'} blur>
                <SmartLink href={link.href} newTab={link.newTab || undefined}>
                  <m.div
                    whileHover={{ x: 10, scale: 1.02 }}
                    className={tone.card}
                  >
                    <div className="flex items-center gap-5">
                      <m.div className={`w-16 h-16 ${tone.tile} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`} whileHover={{ rotate: 10 }}>
                        <Icon name={link.icon} className={tone.icon} />
                      </m.div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-primary-900 mb-1">{link.title}</h3>
                        <p className="text-gray-500">{link.text}</p>
                      </div>
                      <m.div className="ml-auto" animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <ArrowRight className={tone.arrow} />
                      </m.div>
                    </div>
                  </m.div>
                </SmartLink>
              </FadeInItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

const ACTIVITY_TONE = {
  pink: 'bg-pink-100 text-pink-600',
  purple: 'bg-purple-100 text-purple-600',
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
} as const

export function ActivitiesBand({ eyebrow, title, intro, items }: BlockProps<typeof ActivitiesDef>) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} dark intro={intro} gap="mb-12" />
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" stagger={0.1}>
          {items.map((activity, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/20 hover:border-white/20 transition-all duration-300"
              >
                <m.div className={`w-16 h-16 ${ACTIVITY_TONE[activity.tone]} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`} whileHover={{ rotate: 10 }}>
                  <Icon name={activity.icon} className="w-8 h-8" />
                </m.div>
                <p className="font-display font-bold text-lg">{activity.name}</p>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
