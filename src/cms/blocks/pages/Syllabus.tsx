'use client'

// Syllabus & Homework sections, moved verbatim from that page
import { m } from 'framer-motion'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { Paragraphs } from '../shared/InlineText'
import { SmartLink } from '../shared/SmartLink'
import type {
  CurriculumCard as CurriculumDef,
  HomeworkCard as HomeworkDef,
  JoinCta as JoinDef,
  PILL_TONES,
  StreamCards as StreamsDef,
  SubjectGroups as SubjectsDef,
  TipsGrid as TipsDef,
} from './academics.definitions'

export function CurriculumCard({ icon, title, subtitle, body }: BlockProps<typeof CurriculumDef>) {
  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-8 py-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-500/10 rounded-full blur-[60px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon name={icon} className="w-7 h-7 text-secondary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">{title}</h2>
                  {subtitle && <p className="text-primary-200 text-sm">{subtitle}</p>}
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <Paragraphs text={body} className="text-gray-700 leading-relaxed text-lg" strongClassName="text-primary-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PILL: Record<(typeof PILL_TONES)[number], string> = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-primary-100 text-primary-700',
  amber: 'bg-amber-100 text-amber-700',
  gold: 'bg-secondary-100 text-secondary-700',
  goldOnDark: 'bg-secondary-400/20 text-secondary-300',
}

interface CentredHeadingProps {
  pill: string
  pillIcon: string
  pillTone: (typeof PILL_TONES)[number]
  title: string
  intro: string
  dark?: boolean
}

/** Pill, title and a line of introduction, centred above a grid */
export function CentredHeading({ pill, pillIcon, pillTone, title, intro, dark }: CentredHeadingProps) {
  return (
    <div className="text-center mb-12">
      {pill && (
        <div className={`inline-flex items-center gap-2 ${PILL[pillTone]} px-4 py-2 rounded-full text-sm font-medium mb-4`}>
          <Icon name={pillIcon} className="w-4 h-4" />
          {pill}
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl font-display font-bold ${dark ? 'text-white' : 'text-primary-900'} mb-3`}>{title}</h2>
      {intro && <p className={dark ? 'text-primary-200' : 'text-gray-600'}>{intro}</p>}
    </div>
  )
}

export function SubjectGroups({ groups, pill, pillIcon, pillTone, title, intro }: BlockProps<typeof SubjectsDef>) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <CentredHeading pill={pill} pillIcon={pillIcon} pillTone={pillTone} title={title} intro={intro} />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {groups.map((group, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${group.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`w-16 h-16 bg-gradient-to-br ${group.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={group.icon} className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary-900 mb-4">{group.category}</h3>
              <ul className="space-y-3">
                {group.items.map((subject, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 group-hover:text-gray-800 transition-colors">
                    <span className={`w-2.5 h-2.5 bg-gradient-to-br ${group.color} rounded-full flex-shrink-0`} />
                    {subject.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StreamCards({ streams, pill, pillIcon, pillTone, title, intro }: BlockProps<typeof StreamsDef>) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <CentredHeading pill={pill} pillIcon={pillIcon} pillTone={pillTone} title={title} intro={intro} />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {streams.map((stream, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${stream.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full blur-2xl`} />
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${stream.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                  <Icon name="BookOpen" className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-primary-900 mb-2">{stream.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{stream.description}</p>
                <div className="flex flex-wrap gap-2">
                  {stream.subjects.map((subject, i) => (
                    <span key={i} className={`px-3 py-1 bg-gradient-to-r ${stream.color} text-white text-xs font-medium rounded-full`}>
                      {subject.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeworkCard({ icon, title, text, note, noteIcon }: BlockProps<typeof HomeworkDef>) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-secondary-50 to-amber-50 rounded-3xl p-8 md:p-10 border border-secondary-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Icon name={icon} className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-primary-900 mb-4">{title}</h2>
                <Paragraphs text={text} className="text-gray-700 leading-relaxed text-lg mb-4" />
                {note && (
                  <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Icon name={noteIcon} className="w-4 h-4" />
                    {note}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TipsGrid({ tips, pill, pillIcon, pillTone, title, intro }: BlockProps<typeof TipsDef>) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <m.div
          className="absolute top-20 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <m.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.1, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <CentredHeading pill={pill} pillIcon={pillIcon} pillTone={pillTone} title={title} intro={intro} dark />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <Icon name={tip.icon} className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{tip.title}</h3>
              <p className="text-primary-100 text-sm leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function JoinCta({ icon, title, text, button }: BlockProps<typeof JoinDef>) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name={icon} className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-4">{title}</h2>
          {text && <p className="text-gray-600 mb-8">{text}</p>}
          {button.label && button.href && (
            <SmartLink
              href={button.href}
              className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-primary-800 transition-all"
            >
              {button.label}
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  )
}
