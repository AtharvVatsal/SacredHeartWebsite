'use client'

// Achievements sections, moved verbatim from those pages. The toppers sections are the site's own toppers
// components fed with the lists edited in the CMS.
import Link from 'next/link'
import { useMemo } from 'react'
import { ArrowRight, Trophy } from 'lucide-react'
import { ToppersCta, ToppersHero, ToppersSessions } from '@/components/achievements/ToppersPage'
import { class10Sessions, class12Sessions, rankToppers, type TopperSession } from '@/data/toppers'
import type { BlockProps } from '../../document/definition'
import { toTopperSessions } from '../shared/linked'
import { useLinkedData } from '../shared/LinkedData'
import type {
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

export function TopperCta({ title, text, button }: BlockProps<typeof CtaDef>) {
  return <ToppersCta title={title} text={text} button={button.label && button.href ? button : null} />
}
