// Sections of the Achievements pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, image, list, text } from '../../document/fields'
import { button, icon } from '../common'
import { achievements } from '@/data/school'
import { class10Sessions } from '@/data/toppers'

export const NotableAchievements = defineBlock({
  type: 'NotableAchievements',
  label: 'Notable achievements (cards)',
  category: 'cards',
  schema: z.object({
    title: text(140, 'Notable Achievements'),
    items: list(
      z.object({
        year: text(12),
        category: choice(['academic', 'sports', 'cultural', 'other'] as const, 'academic'),
        title: text(120),
        text: text(600),
        studentName: text(120),
      }),
      30,
      achievements.map((a) => ({ year: String(a.year), category: a.category, title: a.title, text: a.description, studentName: a.studentName ?? '' })),
    ),
  }),
})

/** The toppers pages hold the topper lists; other pages link to them by address */
export const TOPPER_SOURCES = ['/achievements/toppers/10th', '/achievements/toppers/12th'] as const

export const TopperHighlights = defineBlock({
  type: 'TopperHighlights',
  label: 'Top five toppers (from the toppers pages)',
  category: 'cards',
  schema: z.object({
    columns: list(
      z.object({ classLabel: text(40), source: choice(TOPPER_SOURCES, '/achievements/toppers/10th'), href: href('') }),
      2,
      [
        { classLabel: 'Class 10', source: '/achievements/toppers/10th', href: '/achievements/toppers/10th' },
        { classLabel: 'Class 12', source: '/achievements/toppers/12th', href: '/achievements/toppers/12th' },
      ],
    ),
  }),
})

export const TopperHero = defineBlock({
  type: 'TopperHero',
  label: 'Toppers page banner',
  category: 'layout',
  schema: z.object({
    badge: text(60, 'Academic Excellence'),
    title: text(120, 'Class 10 Toppers'),
    subtitle: text(300, 'Celebrating the outstanding achievements of our students'),
    link: button('View Class 12 Toppers', '/achievements/toppers/12th'),
  }),
})

const topperSessions = (sessions: typeof class10Sessions) =>
  sessions.map((s) => ({
    year: s.year,
    toppers: s.toppers.map((t) => ({ name: t.name, percentage: t.percentage, photo: { mediaId: null, src: t.image ?? '', alt: '', position: 'center' as const } })),
  }))

export const ToppersList = defineBlock({
  type: 'ToppersList',
  label: 'Toppers by session',
  category: 'cards',
  schema: z.object({
    classLabel: text(40, 'Class 10'),
    title: text(140, 'Board Examination Results'),
    intro: text(300, 'Celebrating academic excellence of our Class 10 students'),
    sessions: list(
      z.object({
        year: text(20),
        toppers: list(z.object({ name: text(120), percentage: z.number().min(0).max(100).default(0), photo: image() }), 60),
      }),
      30,
      topperSessions(class10Sessions),
    ),
  }),
})

export const TopperCta = defineBlock({
  type: 'TopperCta',
  label: 'Closing invitation (green strip)',
  category: 'actions',
  schema: z.object({
    title: text(120, 'Be the Next Topper!'),
    text: text(300, 'Join Sacred Heart Senior Secondary School and excel academically'),
    button: button('Apply for Admission', '/admission'),
    level: choice(['h2', 'h3'] as const, 'h2'),
  }),
})

export const ClassChooser = defineBlock({
  type: 'ClassChooser',
  label: 'Choose a class (toppers)',
  category: 'cards',
  schema: z.object({
    title: text(140, 'Select Class'),
    intro: text(300, 'Choose your class to view the list of board exam toppers'),
    cards: list(
      z.object({ title: text(60), text: text(300), href: href(''), look: choice(['green', 'gold'] as const, 'green'), icon: icon('BookOpen') }),
      4,
      [
        { title: 'Class 10', text: 'View toppers from Secondary School Examination (Class 10)', href: '/achievements/toppers/10th', look: 'green', icon: 'BookOpen' },
        { title: 'Class 12', text: 'View toppers from Senior School Certificate Examination (Class 12)', href: '/achievements/toppers/12th', look: 'gold', icon: 'GraduationCap' },
      ],
    ),
    showCounts: bool(true),
  }),
})

export { topperSessions }

export const achievementsBlocks = [NotableAchievements, TopperHighlights, TopperHero, ToppersList, TopperCta, ClassChooser]
