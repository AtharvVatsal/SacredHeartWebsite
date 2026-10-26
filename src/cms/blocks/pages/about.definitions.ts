// Sections of the About pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { choice, list, text } from '../../document/fields'
import { button, icon } from '../common'
import { gradient } from '../shared/gradients'
import { aims, coreValues, scjmVision } from '@/content/about'
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
  }),
})

export const aboutBlocks = [VisionTabs, AimsGrid, ValuesGrid, DualCta]
