// Sections of the section landing pages (Academics, Admission, About Us)
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, list, text } from '../../document/fields'
import { icon } from '../common'
import { gradient } from '../shared/gradients'
import { activities, classLevels, resourceLinks, streamTiles, subjectOverview } from '@/content/academics-landing'

const lines = (max: number) => list(z.object({ text: text(120) }), max)

export const ClassLevels = defineBlock({
  type: 'ClassLevels',
  label: 'Colourful level cards',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Our Programs'),
    title: text(140, 'Classes We Offer'),
    items: list(z.object({ name: text(80), text: text(300), icon: icon('Star'), color: gradient('from-pink-400 to-rose-500') }), 10, classLevels),
  }),
})

export const StreamTiles = defineBlock({
  type: 'StreamTiles',
  label: 'Tinted stream cards',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Senior Secondary'),
    title: text(140, 'Streams in Class 11-12'),
    streams: list(
      z.object({ name: text(80), subjects: lines(12), icon: icon('BookOpen'), color: gradient('from-cyan-500 to-blue-600'), tint: choice(['blue', 'amber', 'pink'] as const, 'blue') }),
      6,
      streamTiles,
    ),
  }),
})

export const SubjectOverview = defineBlock({
  type: 'SubjectOverview',
  label: 'Subject cards with lists',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Core Subjects'),
    title: text(140, 'Subject Overview'),
    subjects: list(z.object({ category: text(80), items: lines(12), tone: choice(['violet', 'blue', 'emerald', 'amber'] as const, 'violet') }), 8, subjectOverview),
  }),
})

export const ResourceLinks = defineBlock({
  type: 'ResourceLinks',
  label: 'Large link cards',
  category: 'actions',
  schema: z.object({
    eyebrow: text(60, 'Resources'),
    title: text(140, 'Quick Links'),
    links: list(
      z.object({ title: text(80), text: text(200), href: href(''), icon: icon('BookOpen'), tone: choice(['green', 'purple', 'gold'] as const, 'green'), newTab: bool(false) }),
      8,
      resourceLinks,
    ),
  }),
})

export const ActivitiesBand = defineBlock({
  type: 'ActivitiesBand',
  label: 'Activities on a dark background',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Beyond Classroom'),
    title: text(140, 'Co-Curricular Activities'),
    intro: text(300, 'We offer a wide range of activities to develop talents beyond academics'),
    items: list(z.object({ name: text(60), icon: icon('Star'), tone: choice(['pink', 'purple', 'green', 'blue'] as const, 'pink') }), 12, activities),
  }),
})

export const landingBlocks = [ClassLevels, StreamTiles, SubjectOverview, ResourceLinks, ActivitiesBand]
