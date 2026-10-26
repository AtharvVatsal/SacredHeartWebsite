'use client'

// Achievements sections, moved verbatim from those pages. The toppers sections are the site's own toppers
// components fed with the lists edited in the CMS.
import Link from 'next/link'
import { useMemo } from 'react'
import { ArrowRight, Award, BookOpen, GraduationCap, Trophy } from 'lucide-react'
import { FadeIn } from '@/components/animations'
import Section from '@/components/ui/Section'
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider'
import { ToppersCta, ToppersHero, ToppersSessions } from '@/components/achievements/ToppersPage'
import * as Other from '@/components/achievements/OtherAchievementsSections'
import { class10Sessions, class12Sessions, rankToppers, type TopperSession } from '@/data/toppers'
import type { BlockProps } from '../../document/definition'
import { Icon, ICON_COMPONENTS } from '../shared/Icon'
import type { IconName } from '../shared/icon-names'
import { Inline } from '../shared/InlineText'
import { toTopperSessions } from '../shared/linked'
import { useLinkedData } from '../shared/LinkedData'
import type {
  AchieverCards as AchieversDef,
  DreamCta as DreamDef,
  FeaturedAlumnus as FeaturedDef,
  HighlightNote as NoteDef,
  StatCounters as CountersDef,
  ClassChooser as ChooserDef,
  NotableAchievements as NotableDef,
  TopperCta as CtaDef,
  TopperHero as HeroDef,
  TopperHighlights as HighlightsDef,
  ToppersList as ListDef,
} from './achievements.definitions'

export function NotableAchievements({ title, items }: BlockProps<typeof NotableDef>) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-primary-900 mb-8 text-center">{title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((achievement, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy aria-hidden className="w-5 h-5 text-secondary-600" />
                  <span className="text-sm font-semibold text-secondary-800">{achievement.year}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">{achievement.category}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-primary-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.text}</p>
                {achievement.studentName && <p className="text-primary-900 font-medium text-sm mt-2">Student: {achievement.studentName}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const STATIC_TOPPERS: Record<string, TopperSession[]> = {
  '/achievements/toppers/10th': class10Sessions,
  '/achievements/toppers/12th': class12Sessions,
}

function TopFive({ classLabel, session, href }: { classLabel: string; session: TopperSession; href: string }) {
  const top = rankToppers(session.toppers).slice(0, 5)
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-primary-900 mb-6">
        {classLabel} Toppers {session.year}
      </h2>
      <ol className="bg-white rounded-xl shadow-sm overflow-hidden">
        {top.map((topper) => (
          <li key={topper.id} className="flex items-center justify-between gap-3 p-4 border-b last:border-0">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold ${topper.rank === 1 ? 'bg-secondary-400 text-primary-900' : 'bg-gray-100 text-gray-700'}`}
                aria-label={`Rank ${topper.rank}`}
              >
                {topper.rank}
              </span>
              <span className="font-medium break-words">{topper.name}</span>
            </div>
            <span className="font-display font-bold text-primary-900 shrink-0">{topper.percentage}%</span>
          </li>
        ))}
      </ol>
      {href && (
        <Link href={href} className="inline-flex items-center gap-2 mt-4 text-primary-800 font-semibold hover:underline">
          View all {classLabel} toppers <ArrowRight aria-hidden size={16} />
        </Link>
      )}
    </div>
  )
}

export function TopperHighlights({ columns }: BlockProps<typeof HighlightsDef>) {
  const { toppers } = useLinkedData()
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {columns.map((column, i) => {
              // The toppers page's own list; until that page is in the CMS, the list published with the site
              const session = (toppers[column.source] ?? STATIC_TOPPERS[column.source] ?? [])[0]
              return session ? <TopFive key={i} classLabel={column.classLabel} session={session} href={column.href} /> : null
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function TopperHero({ badge, title, subtitle, link }: BlockProps<typeof HeroDef>) {
  return <ToppersHero classLabel="" title={title} badge={badge} subtitle={subtitle} otherClass={link.label && link.href ? link : null} />
}

export function ToppersList({ classLabel, title, intro, sessions }: BlockProps<typeof ListDef>) {
  const data = useMemo(() => toTopperSessions(sessions), [sessions])
  return <ToppersSessions classLabel={classLabel} sessions={data} title={title} intro={intro} />
}

export function TopperCta({ title, text, button, level }: BlockProps<typeof CtaDef>) {
  return <ToppersCta title={title} text={text} button={button.label && button.href ? button : null} as={level} />
}

const CHOOSER_LOOKS = {
  green: { corner: 'bg-primary-50', tile: 'bg-gradient-to-br from-primary-500 to-primary-700', icon: 'w-10 h-10 text-white', bar: 'bg-gradient-to-r from-primary-500 to-secondary-400' },
  gold: { corner: 'bg-secondary-50', tile: 'bg-gradient-to-br from-secondary-400 to-secondary-600', icon: 'w-10 h-10 text-primary-900', bar: 'bg-gradient-to-r from-secondary-400 to-primary-500' },
} as const

export function ClassChooser({ title, intro, cards, showCounts }: BlockProps<typeof ChooserDef>) {
  const { toppers } = useLinkedData()
  const { identity } = useSiteSettings()
  const class10 = toppers['/achievements/toppers/10th'] ?? class10Sessions
  const class12 = toppers['/achievements/toppers/12th'] ?? class12Sessions
  // Counted from the topper lists, so the numbers always match what is shown
  const stats = [
    { icon: Trophy, value: String(class10.length + class12.length), label: 'Sessions Listed' },
    { icon: Award, value: String(class10.reduce((n, s) => n + s.toppers.length, 0)), label: 'Class 10 Toppers' },
    { icon: BookOpen, value: String(class12.reduce((n, s) => n + s.toppers.length, 0)), label: 'Class 12 Toppers' },
    { icon: GraduationCap, value: String(identity.established), label: 'Established' },
  ]
  return (
    <Section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
      <div className="absolute -left-32 top-32 w-96 h-96 bg-secondary-100 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">{title}</h2>
            {intro && <p className="text-gray-600 max-w-2xl mx-auto">{intro}</p>}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => {
            const look = CHOOSER_LOOKS[card.look]
            return (
              <FadeIn key={i} delay={0.1 * (i + 1)} direction="up" blur>
                <Link href={card.href || '#'}>
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
                    <div className={`absolute top-0 right-0 w-32 h-32 ${look.corner} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500`} />
                    <div className="relative z-10">
                      <div className={`w-20 h-20 ${look.tile} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon name={card.icon} className={look.icon} />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">{card.title}</h3>
                      <p className="text-gray-600 mb-6">{card.text}</p>
                      <div className="flex items-center gap-2 text-primary-700 font-semibold group-hover:gap-3 transition-all">
                        View Toppers <ArrowRight size={18} className="group-hover:translate-x-1" />
                      </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${look.bar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>

        {showCounts && (
          <FadeIn delay={0.3} blur>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                  <stat.icon aria-hidden className="w-8 h-8 text-primary-700 mx-auto mb-3" />
                  <div className="text-3xl font-display font-bold text-primary-900">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </Section>
  )
}

const iconOf = (name: string) => ICON_COMPONENTS[name as IconName]

export function FeaturedAlumnus(p: BlockProps<typeof FeaturedDef>) {
  const story = p.story
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)
  return (
    <Other.FeaturedAlumnus
      pill={p.pill}
      pillIcon={iconOf(p.pillIcon)}
      title={p.title}
      intro={p.intro}
      kicker={p.kicker}
      name={p.name}
      role={p.role}
      badgeIcon={iconOf(p.badgeIcon)}
      story={story}
      renderText={(text) => <Inline text={text} highlightClassName="font-semibold text-primary-900" />}
      quote={p.quote}
      quoteBy={p.quoteBy}
      tags={p.tags.map((t) => ({ icon: iconOf(t.icon), label: t.label }))}
      galleryTitle={p.galleryTitle}
      photos={p.photos.filter((x) => x.photo.src).map((x) => ({ src: x.photo.src, alt: x.photo.alt }))}
    />
  )
}

export function StatCounters({ stats }: BlockProps<typeof CountersDef>) {
  return <Other.StatCounters stats={stats} />
}

export function HighlightNote({ icon, title, subtitle, text }: BlockProps<typeof NoteDef>) {
  return <Other.HighlightNote icon={iconOf(icon)} title={title} subtitle={subtitle} text={text} />
}

export function AchieverCards({ pill, pillIcon, title, intro, items }: BlockProps<typeof AchieversDef>) {
  return (
    <Other.AchieverCards
      pill={pill}
      pillIcon={iconOf(pillIcon)}
      title={title}
      intro={intro}
      items={items.map((a, i) => ({ id: String(i), title: a.title, student: a.student, class: a.className, description: a.text, year: a.year, category: a.category, image: a.photo.src || undefined }))}
    />
  )
}

export function DreamCta({ title, text, button }: BlockProps<typeof DreamDef>) {
  return <Other.DreamCta title={title} text={text} button={button} />
}
