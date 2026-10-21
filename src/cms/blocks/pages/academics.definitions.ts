// Sections of the Academics pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { choice, list, longText, text } from '../../document/fields'
import { button, icon } from '../common'
import { gradient } from '../shared/gradients'
import { ICON_NAMES } from '../shared/icon-names'
import { curriculumText, leaveGuidelines, streams, studyTips, subjectGroups } from '@/content/academics'

const lines = (max: number, fallback: { text: string }[] = []) => list(z.object({ text: text(120) }), max, fallback)

/** Pill above a centred section title */
export const PILL_TONES = ['blue', 'purple', 'green', 'amber', 'gold', 'goldOnDark'] as const
const centredHeading = (pill: string, pillIcon: Parameters<typeof icon>[0], tone: (typeof PILL_TONES)[number], title: string, intro: string) => ({
  pill: text(60, pill),
  pillIcon: icon(pillIcon),
  pillTone: choice(PILL_TONES, tone),
  title: text(140, title),
  intro: text(300, intro),
})

export const NoticeStrip = defineBlock({
  type: 'NoticeStrip',
  label: 'Notice strip (amber, one line)',
  category: 'content',
  schema: z.object({ icon: icon('AlertCircle'), text: text(200, 'Regular attendance is crucial for student progress') }),
})

export const GuidelineCard = defineBlock({
  type: 'GuidelineCard',
  label: 'Guidelines card (icon list)',
  category: 'academics',
  schema: z.object({
    icon: icon('FileText'),
    title: text(120, 'Leave & Absence Guidelines'),
    items: list(z.object({ icon: icon('Calendar'), title: text(120), text: text(600) }), 30, leaveGuidelines),
  }),
})

export const CallBand = defineBlock({
  type: 'CallBand',
  label: 'Questions band with a call button',
  category: 'actions',
  schema: z.object({
    title: text(120, 'Questions?'),
    text: text(400, 'For any clarification regarding leave policies, please contact the school office.'),
  }),
})

export const CurriculumCard = defineBlock({
  type: 'CurriculumCard',
  label: 'Card with a green header',
  category: 'academics',
  schema: z.object({
    icon: icon('GraduationCap'),
    title: text(120, 'Academic Curriculum'),
    subtitle: text(160, 'CISCE Affiliated School'),
    body: longText(3000, curriculumText),
  }),
})

export const SubjectGroups = defineBlock({
  type: 'SubjectGroups',
  label: 'Subject groups (cards with lists)',
  category: 'academics',
  schema: z.object({
    ...centredHeading('Our Subjects', 'BookOpen', 'blue', 'Subjects Offered', 'Comprehensive curriculum for holistic development'),
    groups: list(z.object({ category: text(80), icon: icon('BookOpen'), color: gradient('from-blue-500 to-indigo-600'), items: lines(20) }), 9, subjectGroups),
  }),
})

export const StreamCards = defineBlock({
  type: 'StreamCards',
  label: 'Stream cards (with subject chips)',
  category: 'academics',
  schema: z.object({
    ...centredHeading('Career Paths', 'Target', 'purple', 'Streams for Class XI & XII', 'Choose your path to success'),
    streams: list(z.object({ name: text(80), description: text(300), color: gradient('from-green-400 to-emerald-600'), subjects: lines(12) }), 9, streams),
  }),
})

export const HomeworkCard = defineBlock({
  type: 'HomeworkCard',
  label: 'Gold card with a note',
  category: 'academics',
  schema: z.object({
    icon: icon('Clipboard'),
    title: text(120, 'Homework Guidelines'),
    text: longText(1000, 'Parents should encourage their children to do their homework regularly and independently.'),
    note: text(160, 'Private tuition must be discouraged'),
    noteIcon: icon('Lightbulb'),
  }),
})

export const TipsGrid = defineBlock({
  type: 'TipsGrid',
  label: 'Tips on a dark background',
  category: 'academics',
  schema: z.object({
    ...centredHeading('Study Tips', 'Lightbulb', 'goldOnDark', 'How to Make Learning Easy', 'Suggestions for effective studying'),
    tips: list(z.object({ icon: icon('Lightbulb'), title: text(120), text: text(600), color: gradient('from-amber-400 to-orange-500') }), 24, studyTips),
  }),
})

export const JoinCta = defineBlock({
  type: 'JoinCta',
  label: 'Closing invitation with a button',
  category: 'actions',
  schema: z.object({
    icon: icon('BookOpen'),
    title: text(120, 'Ready to Join Us?'),
    text: text(400, 'Discover the Sacred Heart experience and begin your journey to excellence.'),
    button: button('Apply for Admission', '/admission'),
    buttonIcon: z.enum(['none', ...ICON_NAMES]).default('none'),
    width: choice(['normal', 'wide'] as const, 'normal'),
    spacing: choice(['normal', 'compact'] as const, 'normal'),
  }),
})

export const academicsBlocks = [NoticeStrip, GuidelineCard, CallBand, CurriculumCard, SubjectGroups, StreamCards, HomeworkCard, TipsGrid, JoinCta]
