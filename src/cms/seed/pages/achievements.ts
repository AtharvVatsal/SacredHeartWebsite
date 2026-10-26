import { class12Sessions } from '@/data/toppers'
import { topperSessions } from '../../blocks/pages/achievements.definitions'
import { page } from '../builders'

export const achievementsPage = page('/achievements', 'Achievements', [
  [
    'PageHero',
    {
      style: 'landing',
      badge: 'Excellence',
      badgeIcon: 'Trophy',
      title: 'Achievements',
      subtitle: 'Celebrating excellence in academics, sports, and beyond',
      motif: 'Trophy',
      motifSmall: 'Award',
    },
  ],
  ['NotableAchievements'],
  ['TopperHighlights'],
])

export const toppers10Page = page('/achievements/toppers/10th', 'Class 10 Toppers', [
  ['TopperHero'],
  ['ToppersList'],
  ['TopperCta'],
])

export const toppers12Page = page('/achievements/toppers/12th', 'Class 12 Toppers', [
  ['TopperHero', { title: 'Class 12 Toppers', link: { label: 'View Class 10 Toppers', href: '/achievements/toppers/10th' } }],
  ['ToppersList', { classLabel: 'Class 12', intro: 'Celebrating academic excellence of our Class 12 students', sessions: topperSessions(class12Sessions) }],
  ['TopperCta'],
])
