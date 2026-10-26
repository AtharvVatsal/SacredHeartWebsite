'use client'

// Section landing page sections (Academics, Admission, About Us), moved verbatim from those pages
import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowRight, Calendar, CheckCircle, GraduationCap, Heart, Mail, Phone, Scale, Users } from 'lucide-react'
import { staffMembers } from '@/data/school'
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider'
import { telHref } from '@/lib/contact'
import { FadeIn, FadeInItem, ParallaxSection, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { CmsImage } from '../shared/CmsImage'
import { Icon } from '../shared/Icon'
import { Inline, Paragraphs } from '../shared/InlineText'
import { useInView } from '../shared/reveal'
import { SmartLink } from '../shared/SmartLink'
import type {
  AnthemCard as AnthemDef,
  ExploreLinks as ExploreDef,
  JourneyTimeline as JourneyDef,
  PrincipalPreview as PreviewDef,
  StatBoxes as StatBoxesDef,
  WhoWeAre as WhoDef,
  ApplyBand as ApplyDef,
  ChecklistCard as ChecklistDef,
  DatesNotice as DatesDef,
  GradientLinkCards as GradientLinksDef,
  NumberedRules as RulesDef,
  ProcessSteps as StepsDef,
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
        {intro && <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>{intro}</p>}
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

export function ProcessSteps(p: BlockProps<typeof StepsDef>) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <ParallaxSection offset={-80} className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {p.steps.map((step, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${step.color} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white relative overflow-hidden group h-full`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <m.div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" whileHover={{ rotate: 10 }}>
                    <Icon name={step.icon} className="w-8 h-8" />
                  </m.div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl mb-4 text-primary-900">{index + 1}</div>
                  <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-white/80 text-sm">{step.text}</p>
                </div>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>

        {(p.button.label || p.footLink.label) && (
          <FadeIn blur>
            <div className="text-center mt-12">
              {p.button.label && p.button.href && (
                <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                  <SmartLink
                    href={p.button.href}
                    className="active:scale-[0.98] inline-flex items-center gap-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white px-10 py-5 rounded-full font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-xl hover:shadow-2xl"
                  >
                    {p.button.label}
                    <ArrowRight size={20} />
                  </SmartLink>
                </m.div>
              )}
              {p.footLink.label && p.footLink.href && (
                <p className="mt-5 text-gray-600">
                  {p.footText}{' '}
                  <SmartLink href={p.footLink.href} className="font-semibold text-primary-800 underline hover:text-primary-900">
                    {p.footLink.label}
                  </SmartLink>
                </p>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

export function ChecklistCard({ icon, title, subtitle, items }: BlockProps<typeof ChecklistDef>) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl p-10 shadow-xl border border-primary-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-400/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name={icon} className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-900">{title}</h3>
                    {subtitle && <p className="text-gray-600">{subtitle}</p>}
                  </div>
                </div>
                <StaggerContainer className="grid md:grid-cols-2 gap-4" stagger={0.05}>
                  {items.map((item, index) => (
                    <FadeInItem key={index} direction="right">
                      <m.div whileHover={{ x: 10 }} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-secondary-600" />
                        </div>
                        <span className="font-medium text-gray-700">{item.text}</span>
                      </m.div>
                    </FadeInItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export function NumberedRules({ eyebrow, title, rules, note }: BlockProps<typeof RulesDef>) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} divider="none" size="medium" gap="mb-12" />
        <StaggerContainer className="max-w-4xl mx-auto grid gap-4" stagger={0.06}>
          {rules.map((rule, index) => (
            <FadeInItem key={index} direction="up">
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-primary-50 text-primary-800 font-display font-bold flex items-center justify-center" aria-hidden>
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed pt-1.5">{rule.text}</p>
              </div>
            </FadeInItem>
          ))}
        </StaggerContainer>
        {note && (
          <p className="max-w-4xl mx-auto mt-6 text-sm text-gray-600 flex items-start gap-2">
            <Scale aria-hidden className="w-4 h-4 shrink-0 mt-0.5 text-primary-700" />
            <span>
              <Inline text={note} linkClassName="font-semibold text-primary-800 underline" />
            </span>
          </p>
        )}
      </div>
    </section>
  )
}

export function GradientLinkCards({ eyebrow, title, links, moreLabel }: BlockProps<typeof GradientLinksDef>) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} divider="none" size="medium" gap="mb-12" />
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" stagger={0.1}>
          {links.map((link, index) => (
            <FadeInItem key={index} direction="up" blur>
              <SmartLink href={link.href}>
                <m.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${link.color} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white relative overflow-hidden group h-full`}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative z-10">
                    <m.div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" whileHover={{ rotate: 10 }}>
                      <Icon name={link.icon} className="w-8 h-8" />
                    </m.div>
                    <h3 className="font-display font-bold text-2xl mb-2">{link.title}</h3>
                    <p className="text-white/80">{link.text}</p>
                    {moreLabel && (
                      <div className="mt-6 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                        <span className="font-medium">{moreLabel}</span>
                        <m.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                          <ArrowRight size={18} />
                        </m.div>
                      </div>
                    )}
                  </div>
                </m.div>
              </SmartLink>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export function DatesNotice({ eyebrow, title, heading, text, emailLabel }: BlockProps<typeof DatesDef>) {
  const { contact } = useSiteSettings()
  const email = contact.emails[0]
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean)
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} divider="tight" size="medium" gap="mb-12" />
        <div className="max-w-3xl mx-auto rounded-2xl border border-primary-100 bg-primary-50 p-6 md:p-8 text-center">
          <Calendar aria-hidden className="w-10 h-10 text-primary-700 mx-auto mb-4" />
          <p className="font-display font-bold text-xl text-primary-900 mb-2">{heading}</p>
          {paragraphs.map((para, i) => (
            <p key={i} className={`text-gray-700 ${i === paragraphs.length - 1 ? 'mb-6' : 'mb-2'}`}>
              {para}
            </p>
          ))}
          <div className="flex flex-wrap justify-center gap-3">
            {contact.phones.map((phone) => (
              <a key={phone} href={telHref(phone)} className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors">
                <Phone aria-hidden size={16} /> Call {phone}
              </a>
            ))}
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-800 hover:bg-primary-100 transition-colors">
                <Mail aria-hidden size={16} /> {emailLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ApplyBand({ title, text, button, size }: BlockProps<typeof ApplyDef>) {
  const large = size === 'large'
  const pop = useInView({ opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })
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
        <FadeIn blur>
          <h2 className={large ? 'text-3xl md:text-5xl font-display font-bold mb-6' : 'text-3xl md:text-4xl font-display font-bold mb-4'}>{title}</h2>
          {text && <p className={large ? 'text-gray-200 mb-10 max-w-2xl mx-auto text-lg' : 'text-gray-200 mb-8 max-w-2xl mx-auto'}>{text}</p>}
        </FadeIn>
        {button.label && button.href && (
          <m.div {...pop} transition={{ delay: 0.2 }}>
            <m.div whileHover={{ scale: 1.05, y: -2 }} className="inline-flex">
              <SmartLink
                href={button.href}
                className={`active:scale-[0.98] inline-flex items-center gap-3 bg-secondary-400 text-primary-900 px-10 py-5 rounded-full ${large ? 'font-bold text-lg' : 'font-semibold'} hover:bg-secondary-300 transition-all shadow-xl hover:shadow-2xl`}
              >
                {button.label}
                <ArrowRight size={20} />
              </SmartLink>
            </m.div>
          </m.div>
        )}
      </div>
    </section>
  )
}

export function StatBoxes({ stats }: BlockProps<typeof StatBoxesDef>) {
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto" stagger={0.1}>
          {stats.map((stat, index) => (
            <FadeInItem key={index} direction="up" blur>
              <m.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white relative overflow-hidden group`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10 text-center">
                  <Icon name={stat.icon} className="w-8 h-8 mx-auto mb-3 opacity-90" />
                  {/* "Staff" counts the staff list, so it always matches the Staff page */}
                  <p className="text-2xl min-[360px]:text-3xl font-bold mb-1">{stat.count === 'staff' ? String(staffMembers.length) : stat.value}</p>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </div>
              </m.div>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export function ExploreLinks({ eyebrow, title, items }: BlockProps<typeof ExploreDef>) {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <EyebrowHeading eyebrow={eyebrow} title={title} divider="none" size="medium" gap="mb-12" />
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.08}>
          {items.map((item, index) => (
            <FadeInItem key={index} direction="up" blur>
              <SmartLink href={item.href}>
                <m.div
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="relative p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group h-full flex flex-col items-center justify-center text-center"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-white group-hover:to-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon name={item.icon} className="w-7 h-7 text-primary-900 group-hover:text-primary-700 transition-colors" />
                  </div>
                  <span className="font-medium text-gray-800 group-hover:text-white text-sm relative z-10 transition-colors">{item.label}</span>
                </m.div>
              </SmartLink>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export function WhoWeAre({ eyebrow, title, body, areas }: BlockProps<typeof WhoDef>) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <FadeIn blur className="lg:col-span-3">
            {eyebrow && <span className="text-sm font-semibold text-secondary-800 tracking-wider uppercase">{eyebrow}</span>}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mt-3 mb-6 leading-tight">{title}</h2>
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              <Paragraphs text={body} />
            </div>
          </FadeIn>
          <StaggerContainer className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4" stagger={0.06}>
            {areas.map((area, i) => (
              <FadeInItem key={i} direction="up">
                <div className="h-full bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-3">
                    <Icon name={area.icon} className="w-5 h-5 text-primary-700" />
                  </div>
                  <p className="font-semibold text-primary-900 text-sm sm:text-base leading-snug">{area.label}</p>
                </div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

function JourneyStep({ item, index, mobile }: { item: BlockProps<typeof JourneyDef>['items'][number]; index: number; mobile?: boolean }) {
  const desktopReveal = useInView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  const mobileReveal = useInView({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })
  if (mobile) {
    return (
      <m.div
        {...mobileReveal}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-gradient-to-br from-primary-50 to-secondary-50 p-3 min-[360px]:p-5 rounded-xl text-center break-words hyphens-auto"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow mb-4 mx-auto">
          <span className="text-white font-bold text-base">{item.year}</span>
        </div>
        <h3 className="font-bold text-primary-900 text-sm min-[360px]:text-base mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.shortText || item.text}</p>
      </m.div>
    )
  }
  return (
    <m.div {...desktopReveal} transition={{ duration: 0.4, delay: index * 0.1 }} className="flex-1 flex flex-col items-center text-center px-3">
      <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex flex-col items-center justify-center shadow-lg mb-5">
        <span className="text-white font-bold text-lg">{item.year}</span>
      </div>
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-5 rounded-xl w-full">
        <h3 className="font-bold text-primary-900 text-base mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
      </div>
    </m.div>
  )
}

export function JourneyTimeline({ eyebrow, title, items, endLabel, button }: BlockProps<typeof JourneyDef>) {
  const rise = useInView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn blur>
          <div className="text-center mb-16">
            {eyebrow && <span className="text-sm font-semibold text-secondary-800 tracking-wider uppercase">{eyebrow}</span>}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-900 mt-3">{title}</h2>
            <div className="w-16 h-1 bg-secondary-400 rounded-full mx-auto mt-6" />
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto mt-16">
          <m.div {...rise} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="hidden md:block">
              <div className="flex justify-between">
                {items.map((item, index) => (
                  <JourneyStep key={index} item={item} index={index} />
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <JourneyStep key={index} item={item} index={index} mobile />
                ))}
              </div>
            </div>
            {endLabel && (
              <div className="flex justify-center mt-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <span className="mt-3 text-primary-700 font-semibold">{endLabel}</span>
                </div>
              </div>
            )}
          </m.div>
        </div>

        {button.label && button.href && (
          <FadeIn blur>
            <div className="mt-12 text-center">
              <SmartLink href={button.href} className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl">
                {button.label} <ArrowRight size={18} />
              </SmartLink>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

function Stanza({ stanza, index }: { stanza: string; index: number }) {
  const rise = useInView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })
  return (
    <m.div {...rise} transition={{ delay: index * 0.2 }} className="text-center">
      {stanza.split('\n').map((line, lineIndex) => (
        <p key={lineIndex} className={`italic ${lineIndex === 0 ? 'font-medium text-lg text-secondary-300' : 'text-white/80'}`}>
          {line}
        </p>
      ))}
    </m.div>
  )
}

export function AnthemCard({ title, icon, text }: BlockProps<typeof AnthemDef>) {
  const rise = useInView({ opacity: 0, y: 30 }, { opacity: 1, y: 0 })
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <m.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[100px]" animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <m.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[80px]" animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="text-center mb-12">
            <m.div className="inline-flex items-center justify-center w-20 h-20 bg-secondary-400 rounded-full mb-6 shadow-xl" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
              <Icon name={icon} className="w-10 h-10 text-primary-900" />
            </m.div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{title}</h2>
            <div className="w-20 mx-auto">
              <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
            </div>
          </div>
        </FadeIn>
        <m.div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/20" {...rise} transition={{ duration: 0.8 }}>
          <div className="space-y-8">
            {text.split('\n\n').map((stanza, index) => (
              <Stanza key={index} stanza={stanza} index={index} />
            ))}
          </div>
        </m.div>
      </div>
    </section>
  )
}

export function PrincipalPreview({ photo, pill, title, name, excerpt, button }: BlockProps<typeof PreviewDef>) {
  const { identity } = useSiteSettings()
  const principal = name || identity.principal
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-primary-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary-50/50 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white to-primary-50 rounded-3xl shadow-2xl p-10 md:p-14 border border-primary-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-400/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                  <m.div className="relative w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0" whileHover={{ scale: 1.05, rotate: 3 }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full shadow-xl" />
                    <div className="absolute inset-2 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center overflow-hidden">
                      <CmsImage image={photo} alt={photo.alt || principal} fill className="object-cover rounded-full" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-secondary-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <GraduationCap className="w-6 h-6 text-primary-900" />
                    </div>
                  </m.div>
                  <div className="flex-1 text-center lg:text-left">
                    {pill && (
                      <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <Users className="w-4 h-4" />
                        {pill}
                      </div>
                    )}
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-2">{title}</h2>
                    <p className="text-xl text-secondary-800 font-medium mb-6">{principal}</p>
                    {excerpt && <p className="text-gray-600 leading-relaxed mb-8 text-lg italic">&quot;{excerpt}&quot;</p>}
                    {button.label && button.href && (
                      <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                        <SmartLink
                          href={button.href}
                          className="active:scale-[0.98] inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:from-primary-500 hover:to-primary-600 transition-all shadow-lg hover:shadow-xl"
                        >
                          {button.label}
                          <m.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <ArrowRight size={18} />
                          </m.div>
                        </SmartLink>
                      </m.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
