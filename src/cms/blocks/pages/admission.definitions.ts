// Sections of the Admission pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { choice, list, longText, text } from '../../document/fields'
import { ruleCards, rulesClosing } from '@/content/rules'
import { icon } from '../common'

const line = z.object({ text: text(800) })
const lines = (items: string[]) => items.map((t) => ({ text: t }))

export const RuleCards = defineBlock({
  type: 'RuleCards',
  label: 'Rule cards (coloured header, lists, warnings)',
  category: 'admission',
  schema: z.object({
    cards: list(
      z.object({
        title: text(120),
        icon: icon('BookOpen'),
        tone: choice(['green', 'red'] as const, 'green'),
        intro: longText(2000),
        numbered: list(line, 20),
        bullets: list(line, 30),
        bulletIcon: choice(['CheckCircle', 'Scissors', 'AlertCircle'] as const, 'CheckCircle'),
        bulletTone: choice(['green', 'red'] as const, 'green'),
        alertTone: choice(['none', 'red', 'yellow'] as const, 'none'),
        alert: longText(1000),
        note: text(400),
      }),
      20,
      ruleCards.map((c) => ({ ...c, numbered: lines(c.numbered), bullets: lines(c.bullets) })),
    ),
    closingTitle: text(120, rulesClosing.title),
    closingText: longText(1500, rulesClosing.text),
  }),
})

export const admissionBlocks = [RuleCards]
