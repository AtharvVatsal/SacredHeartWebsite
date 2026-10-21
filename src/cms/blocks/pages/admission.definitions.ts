// Sections of the Admission pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { choice, list, longText, text } from '../../document/fields'
import { ruleCards, rulesClosing } from '@/content/rules'
import { dressCards, whereToBuy } from '@/content/uniform'
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

export const GoldInfoCard = defineBlock({
  type: 'GoldInfoCard',
  label: 'Gold information card',
  category: 'admission',
  schema: z.object({ icon: icon(whereToBuy.icon), title: text(120, whereToBuy.title), text: longText(1500, whereToBuy.text) }),
})

const first = dressCards[0]

export const DressCard = defineBlock({
  type: 'DressCard',
  label: 'Card with a coloured header and lists',
  category: 'admission',
  schema: z.object({
    tone: choice(['pink', 'blue', 'slate', 'green', 'primary'] as const, first.tone),
    layout: choice(['list', 'groups', 'columns', 'boxes', 'centred'] as const, first.layout),
    background: choice(['white', 'fade'] as const, first.background),
    icon: icon(first.icon),
    title: text(120, first.title),
    subtitle: text(160, first.subtitle),
    intro: longText(1000, first.intro),
    groups: list(
      z.object({ title: text(120), twoColumns: z.boolean().default(false), items: list(z.object({ text: text(300), note: text(200) }), 30) }),
      6,
      first.groups,
    ),
    note: longText(1000, first.note),
  }),
})

export const admissionBlocks = [RuleCards, GoldInfoCard, DressCard]
