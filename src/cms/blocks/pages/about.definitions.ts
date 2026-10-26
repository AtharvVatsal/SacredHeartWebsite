// Sections of the About pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, image, list, longText, text } from '../../document/fields'
import { button, icon } from '../common'
import { figureSource } from '../shared/figures'
import { gradient } from '../shared/gradients'
import { ICON_NAMES } from '../shared/icon-names'
import {
  aims,
  coreValues,
  deskClosing,
  deskThemes,
  historyStats,
  historyStory,
  milestones,
  missionText,
  principalHighlights,
  principalMessage,
  scjmVision,
} from '@/content/about'
import { officeBearers, schoolInfo } from '@/data/school'
import { leaderMessageCards } from '@/content/leader-messages'
import { staffList, staffPageStats, spotlightStats } from '@/content/staff'
import { PILL_TONES } from './academics.definitions'

export const TINTS = ['amber', 'pink', 'blue', 'purple', 'emerald', 'cyan'] as const

const heading = (pill: string, pillIcon: Parameters<typeof icon>[0], tone: (typeof PILL_TONES)[number], title: string, intro: string) => ({
  pill: text(60, pill),
  pillIcon: icon(pillIcon),
  pillTone: choice(PILL_TONES, tone),
  title: text(140, title),
  intro: text(300, intro),
})

export const VisionTabs = defineBlock({
  type: 'VisionTabs',
  label: 'Numbered topics (click to read)',
  category: 'about',
  schema: z.object({
    ...heading('Our Philosophy', 'Quote', 'green', 'S.C.J.M Vision of Education', 'Click each section to learn more'),
    items: list(z.object({ title: text(120), content: text(2000) }), 12, scjmVision),
  }),
})

export const AimsGrid = defineBlock({
  type: 'AimsGrid',
  label: 'Cards with tinted icons',
  category: 'about',
  schema: z.object({
    ...heading('What We Strive For', 'Target', 'amber', 'Our Aims & Objectives', 'Nurturing well-rounded individuals through comprehensive education'),
    aims: list(z.object({ title: text(120), text: text(600), icon: icon('Star'), color: gradient('from-amber-400 to-orange-500'), tint: choice(TINTS, 'amber') }), 12, aims),
  }),
})

export const ValuesGrid = defineBlock({
  type: 'ValuesGrid',
  label: 'Values on a dark background',
  category: 'about',
  schema: z.object({
    ...heading('Guiding Principles', 'Star', 'goldOnDark', 'Our Core Values', 'The principles that shape every aspect of our educational journey'),
    values: list(z.object({ name: text(60), icon: icon('Star'), color: gradient('from-pink-400 to-rose-500') }), 16, coreValues),
  }),
})

export const DualCta = defineBlock({
  type: 'DualCta',
  label: 'Closing line with two buttons',
  category: 'actions',
  schema: z.object({
    title: text(120, 'Experience Our Values in Action'),
    text: text(400, 'Join our school community and see how we bring these aims to life every day.'),
    primary: button('Learn More About Us', '/about'),
    secondary: button('Apply for Admission', '/admission'),
    arrows: bool(true),
    /** Icons that replace the arrows */
    primaryIcon: z.enum(['none', ...ICON_NAMES]).default('none'),
    primaryIconAfter: bool(true),
    secondaryIcon: z.enum(['none', ...ICON_NAMES]).default('none'),
    secondaryIconAfter: bool(true),
  }),
})

export const MilestoneTimeline = defineBlock({
  type: 'MilestoneTimeline',
  label: 'Timeline (click a year to open it)',
  category: 'about',
  schema: z.object({
    ...heading('Interactive Timeline', 'Clock', 'green', 'Click to Explore', 'Each milestone shaped our journey'),
    milestones: list(z.object({ year: text(20), title: text(120), subtitle: text(160), content: text(1500), icon: text(16) }), 30, milestones),
    endIcon: icon('Heart'),
    endTitle: text(80, 'Legacy Continues'),
    endText: text(80, 'Since 1969'),
  }),
})

export const MissionPanel = defineBlock({
  type: 'MissionPanel',
  label: 'Statement on a dark background',
  category: 'about',
  schema: z.object({
    icon: icon('Landmark'),
    title: text(120, 'Our Mission'),
    subtitle: text(120, 'Guiding Light'),
    text: longText(2000, missionText),
  }),
})

export const StoryCard = defineBlock({
  type: 'StoryCard',
  label: 'Story card (heading and paragraphs)',
  category: 'about',
  schema: z.object({
    look: choice(['light', 'dark'] as const, 'light'),
    pill: text(60, 'Our Story'),
    pillIcon: icon('BookOpen'),
    pillTone: choice(PILL_TONES, 'green'),
    title: text(140, 'Our History & Heritage'),
    body: longText(8000, historyStory),
  }),
})

export const StatTiles = defineBlock({
  type: 'StatTiles',
  label: 'Three big numbers',
  category: 'about',
  schema: z.object({
    tiles: list(z.object({ icon: icon('Calendar'), value: text(20), label: text(80), look: choice(['light', 'gold'] as const, 'light'), count: figureSource() }), 6, historyStats),
  }),
})

export const LeaderProfile = defineBlock({
  type: 'LeaderProfile',
  label: 'Leader profile (photo and message)',
  category: 'about',
  schema: z.object({
    photo: image({ src: '/images/principal.webp', alt: `${schoolInfo.principal}, Principal` }),
    /** Empty: the principal's name from Site settings */
    name: text(120, ''),
    role: text(160, 'Principal'),
    pill: text(60, 'School Leadership'),
    badgeLabel: text(60, 'Guided by'),
    badgeText: text(80, 'Faith · Knowledge · Service'),
    cornerBadge: text(30, 'CISCE'),
    message: list(z.object({ icon: icon('BookOpen'), text: text(2000) }), 8, principalMessage),
    quote: text(400, 'Anything is possible only with the right thoughts in mind.'),
    link: button('Contact School', '/contact'),
  }),
})

export const NumberedThemes = defineBlock({
  type: 'NumberedThemes',
  label: 'Numbered themes with a signed closing',
  category: 'about',
  schema: z.object({
    eyebrow: text(80, "From the Principal's Desk"),
    title: text(140, 'What We Believe'),
    themes: list(z.object({ title: text(120), text: text(2000) }), 20, deskThemes),
    closing: longText(2000, deskClosing),
    signoff: text(60, 'God Bless'),
    /** Empty: the principal's name from Site settings */
    signName: text(120, ''),
    /** Empty: "Principal, <full school name>, Sidhpur" */
    signRole: text(200, ''),
  }),
})

export const HighlightBand = defineBlock({
  type: 'HighlightBand',
  label: 'Key figures on a green band',
  category: 'about',
  schema: z.object({
    stats: list(z.object({ icon: icon('Star'), label: text(80), value: text(30), count: figureSource() }), 8, principalHighlights),
    lift: choice(['normal', 'small'] as const, 'normal'),
  }),
})

export const PrincipalSpotlight = defineBlock({
  type: 'PrincipalSpotlight',
  label: 'Principal spotlight (dark card)',
  category: 'about',
  schema: z.object({
    photo: image({ src: '/images/principal.webp', alt: `Principal ${schoolInfo.principal}` }),
    pill: text(60, 'Principal'),
    /** Empty: the principal's name from Site settings */
    name: text(120, ''),
    text: text(600, 'Leading Sacred Heart Senior Secondary School with dedication and vision. Committed to academic excellence and holistic development of every student.'),
    stats: list(z.object({ value: text(20), label: text(60), count: figureSource() }), 4, spotlightStats),
  }),
})

export const StaffList = defineBlock({
  type: 'StaffList',
  label: 'Staff directory (search and departments)',
  category: 'about',
  schema: z.object({
    members: list(z.object({ name: text(120), role: text(80), department: text(60), qualifications: text(200), photo: image() }), 300, staffList),
  }),
})

export const LeaderMessages = defineBlock({
  type: 'LeaderMessages',
  label: 'Message cards with a photo',
  category: 'about',
  schema: z.object({
    cards: list(
      z.object({
        look: choice(['green', 'gold'] as const, 'green'),
        photo: image(),
        role: text(60),
        name: text(120),
        subtitle: text(120),
        heading: text(160),
        message: longText(8000),
      }),
      6,
      leaderMessageCards.map((c) => ({ ...c, photo: { mediaId: null, position: 'center' as const, ...c.photo } })),
    ),
  }),
})

const person = () => text(200)
const pictureOf = (src?: string) => ({ mediaId: null, src: src ?? '', alt: '', position: 'center' as const })

export const OfficeBearersList = defineBlock({
  type: 'OfficeBearersList',
  label: 'Office bearers by session (year picker)',
  category: 'about',
  schema: z.object({
    messagesHref: href('/about/office-bearers/messages'),
    sessions: list(
      z.object({
        year: text(20),
        headGirl: person(),
        headBoy: person(),
        headGirlImage: image(),
        headBoyImage: image(),
        gamesCaptainGirls: person(),
        gamesViceCaptainGirls: person(),
        gamesCaptainBoys: person(),
        gamesViceCaptainBoys: person(),
        editorsInChief: text(400),
        editorialMembers: text(600),
        houseCaptains: list(z.object({ house: text(60), captain: person(), viceCaptain: person() }), 12),
        prefects: list(z.object({ house: text(60), names: text(1000) }), 12),
        juniorCaptains: list(z.object({ house: text(60), captain: person(), viceCaptain: person() }), 12),
      }),
      30,
      officeBearers.map((s) => ({
        ...s,
        headGirlImage: pictureOf(s.headGirlImage),
        headBoyImage: pictureOf(s.headBoyImage),
        editorialMembers: s.editorialMembers ?? '',
        prefects: s.prefects.map((p) => ({ house: p.house ?? '', names: p.names })),
        juniorCaptains: s.juniorCaptains ?? [],
      })),
    ),
  }),
})

export const aboutBlocks = [PrincipalSpotlight, StaffList, OfficeBearersList, LeaderMessages, VisionTabs, AimsGrid, ValuesGrid, DualCta, MilestoneTimeline, MissionPanel, StoryCard, StatTiles, LeaderProfile, NumberedThemes, HighlightBand]
