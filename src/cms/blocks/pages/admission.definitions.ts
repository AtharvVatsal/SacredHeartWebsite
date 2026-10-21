// Sections of the Admission pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { choice, int, list, longText, text } from '../../document/fields'
import { ruleCards, rulesClosing } from '@/content/rules'
import { dressCards, whereToBuy } from '@/content/uniform'
import { button, icon } from '../common'
import { gradient } from '../shared/gradients'
import { feeClasses, feeGuidelines, payOnline, securityInfo } from '@/content/fee-page'
import { admissionFee, feeSession } from '@/data/fees'

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

const amount = () => int(0, 10_000_000, 0)

export const FeeTable = defineBlock({
  type: 'FeeTable',
  label: 'Fee structure (class-wise, by quarter)',
  category: 'admission',
  schema: z.object({
    session: text(20, feeSession),
    admissionFee: int(0, 10_000_000, admissionFee),
    title: text(120, 'Class-wise Fee Structure'),
    intro: text(400, 'Choose a class to see what is payable each quarter. Fees are paid quarter by quarter, online or at PNB Sidhpur.'),
    otherClassesNote: text(400, 'Fees for Classes IX, X and XII are not published on the website. Please contact the school office for them.'),
    classes: list(
      z.object({
        label: text(40),
        categories: list(
          z.object({
            name: text(80),
            quarters: list(z.object({ rows: list(z.object({ item: text(120), period: text(80), amount: amount() }), 30) }), 8),
          }),
          6,
        ),
      }),
      20,
      feeClasses,
    ),
    payTitle: text(120, payOnline.title),
    payText: text(400, payOnline.text),
    payButton: button(payOnline.button.label, payOnline.button.href),
  }),
})

export const FeeGuidelines = defineBlock({
  type: 'FeeGuidelines',
  label: 'Fee guidelines (cards, notice, refund terms)',
  category: 'admission',
  schema: z.object({
    title: text(140, 'Fee Payment Guidelines'),
    intro: text(300, 'Essential information for parents and guardians'),
    cards: list(z.object({ icon: icon('Calendar'), title: text(120), text: text(600), color: gradient('from-blue-500 to-indigo-600') }), 6, feeGuidelines),
    noticeTitle: text(120, 'Early Payment Discount'),
    noticeText: longText(800, 'If desired, fees for the whole year may be deposited in **February** each year to avail early payment benefits.'),
    listTitle: text(120, 'Security Amount Refund'),
    listSubtitle: text(160, 'Terms and conditions apply'),
    listIcon: icon('ShieldCheck'),
    listItems: list(z.object({ icon: icon('CheckCircle'), text: text(400) }), 12, securityInfo),
  }),
})

export const WarningCard = defineBlock({
  type: 'WarningCard',
  label: 'Red warning card',
  category: 'admission',
  schema: z.object({
    icon: icon('AlertCircle'),
    title: text(120, 'Examination Rules'),
    subtitle: text(160, 'Important notice for students and parents'),
    itemIcon: icon('Clock'),
    text: longText(1000, 'Students who have not paid the tuition fee and other dues before the examination will **NOT be allowed to sit for the final examinations**.'),
  }),
})

export const admissionBlocks = [RuleCards, GoldInfoCard, DressCard, FeeTable, FeeGuidelines, WarningCard]
