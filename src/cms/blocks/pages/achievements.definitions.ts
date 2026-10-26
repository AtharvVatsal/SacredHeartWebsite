// Sections of the Achievements pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, image, list, longText, text } from '../../document/fields'
import { button, icon } from '../common'
import { figureSource, sourceOfStat } from '../shared/figures'
import { achievements, statistics } from '@/data/school'
import { chandrayaanPhotos, otherAchievements } from '@/content/other-achievements'
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

export const FeaturedAlumnus = defineBlock({
  type: 'FeaturedAlumnus',
  label: 'Featured achiever (story, quote, photos)',
  category: 'cards',
  schema: z.object({
    pill: text(60, 'Our Pride'),
    pillIcon: icon('Satellite'),
    title: text(140, 'Chandrayaan-3 Mission'),
    intro: text(300, 'Making India proud on the global stage'),
    kicker: text(80, 'ISRO Mission • 2023'),
    name: text(120, 'Rajat Awasthi'),
    role: text(160, 'Batch of 2004 • ISRO Scientist'),
    badgeIcon: icon('Rocket'),
    story: longText(
      4000,
      "A proud alumnus of ==Sacred Heart Senior Secondary School, Sidhpur==, Batch of 2004, who reached for the stars and became part of India's historic Chandrayaan-3 mission.\n\nWith great pride and enthusiasm, he was welcomed back to his alma mater. In an inspiring address to the students, he shared his incredible journey and motivated young minds to dream big.",
    ),
    quote: text(400, "'Dreams have no boundaries when you have the courage to pursue them.'"),
    quoteBy: text(120, 'Rajat Awasthi'),
    tags: list(z.object({ icon: icon('Star'), label: text(60) }), 8, [
      { icon: 'Globe', label: 'Space Technology' },
      { icon: 'Star', label: 'National Pride' },
      { icon: 'Users', label: 'ISRO Scientist' },
    ]),
    galleryTitle: text(80, 'Mission Gallery'),
    photos: list(z.object({ photo: image() }), 24, chandrayaanPhotos.map((p) => ({ photo: { mediaId: null, src: encodeURI(p.src), alt: p.alt, position: 'center' as const } }))),
  }),
})

export const StatCounters = defineBlock({
  type: 'StatCounters',
  label: 'Counting figures',
  category: 'cards',
  schema: z.object({
    stats: list(z.object({ label: text(60), value: text(20), count: figureSource() }), 8, statistics.map((s) => ({ label: s.label, value: `${s.value}${s.suffix ?? ''}`, count: sourceOfStat(s.label) }))),
  }),
})

export const HighlightNote = defineBlock({
  type: 'HighlightNote',
  label: 'Highlighted note with a gold icon',
  category: 'cards',
  schema: z.object({
    icon: icon('BookOpen'),
    title: text(140, 'Rendezvous with Excellence'),
    subtitle: text(160, 'Interaction with distinguished alumni'),
    text: text(2000, 'Expressed his gratitude for his alma mater and addressed the students, sharing insights about his journey from Sacred Heart to ISRO. The interactive session motivated students to dream big and work towards achieving their goals.'),
  }),
})

export const AchieverCards = defineBlock({
  type: 'AchieverCards',
  label: 'Achiever cards (photo and story)',
  category: 'cards',
  schema: z.object({
    pill: text(60, 'More Achievements'),
    pillIcon: icon('Trophy'),
    title: text(140, 'Other Notable Achievements'),
    intro: text(300, 'Celebrating excellence in academics, sports, and cultural activities'),
    items: list(
      z.object({ title: text(160), student: text(120), className: text(40), text: text(1000), year: text(12), category: text(40), photo: image() }),
      40,
      otherAchievements.map((a) => ({
        title: a.title,
        student: a.student,
        className: a.class ?? '',
        text: a.description,
        year: String(a.year),
        category: a.category,
        photo: { mediaId: null, src: a.image ? encodeURI(a.image) : '', alt: a.student, position: 'center' as const },
      })),
    ),
  }),
})

export const DreamCta = defineBlock({
  type: 'DreamCta',
  label: 'Closing invitation (glowing icon)',
  category: 'actions',
  schema: z.object({
    title: text(120, 'Achieve Your Dreams!'),
    text: text(300, 'Join Sacred Heart Senior Secondary School and make your mark in the world'),
    button: button('Apply for Admission', '/admission'),
  }),
})

export { topperSessions }

export const achievementsBlocks = [NotableAchievements, TopperHighlights, TopperHero, ToppersList, TopperCta, ClassChooser, FeaturedAlumnus, StatCounters, HighlightNote, AchieverCards, DreamCta]
