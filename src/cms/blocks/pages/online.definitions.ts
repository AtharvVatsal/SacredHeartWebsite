// Sections of the Pay Fee Online and Online Registration pages
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { choice, href, list, longText, text } from '../../document/fields'
import { icon } from '../common'
import { feeHelpCards, feeInfoTiles, feeSteps, gatewayCharges } from '@/content/online-services'

const lines = (max: number, length = 600) => list(z.object({ text: text(length) }), max)

export const InfoTiles = defineBlock({
  type: 'InfoTiles',
  label: 'Information tiles (icon, title, text)',
  category: 'admission',
  schema: z.object({ tiles: list(z.object({ icon: icon('Info'), title: text(120), text: text(600) }), 4, feeInfoTiles) }),
})

export const StepsGuide = defineBlock({
  type: 'StepsGuide',
  label: 'Numbered step-by-step guide',
  category: 'admission',
  schema: z.object({
    anchor: z.string().max(40).regex(/^[a-z0-9-]*$/, 'Use lower-case letters, numbers and dashes only').default(''),
    background: choice(['white', 'mint'] as const, 'white'),
    eyebrow: text(60, 'Payment Guide'),
    title: text(140, 'Pay in Three Steps'),
    intro: text(400, 'Please read every step carefully before making your payment.'),
    label: text(120, 'Online fee payment steps'),
    steps: list(
      z.object({
        title: text(120),
        summary: text(200),
        icon: icon('CheckCircle'),
        points: lines(12),
        important: text(600),
        tables: list(z.object({ caption: text(120), headA: text(60), headB: text(60), rows: list(z.object({ a: text(120), b: text(120) }), 12) }), 4),
        chipsTitle: text(120),
        chips: lines(12, 60),
      }),
      20,
      feeSteps,
    ),
  }),
})

export const HelpCards = defineBlock({
  type: 'HelpCards',
  label: 'Help cards (with an optional table)',
  category: 'admission',
  schema: z.object({
    background: choice(['grey', 'white'] as const, 'grey'),
    cards: list(
      z.object({ tone: choice(['red', 'white'] as const, 'white'), icon: icon('Info'), title: text(120), text: longText(1500), items: lines(12), note: text(400) }),
      3,
      feeHelpCards,
    ),
    tableTitle: text(120, gatewayCharges.title),
    tableIcon: icon('Wallet'),
    headA: text(60, gatewayCharges.headA),
    headB: text(60, gatewayCharges.headB),
    rows: list(z.object({ a: text(80), b: text(400) }), 12, gatewayCharges.rows),
    footnote: text(400, gatewayCharges.footnote),
  }),
})

export const AppHelpBand = defineBlock({
  type: 'AppHelpBand',
  label: 'School app and help desk (green band)',
  category: 'admission',
  schema: z.object({
    appTitle: text(120, 'The school app'),
    appText: text(400, "Pay fees and see your receipts on your phone with the school's app, IQdigit."),
    androidLabel: text(60, 'Get it on Google Play'),
    iosLabel: text(60, 'Download on the App Store'),
    helpTitle: text(120, 'Need help?'),
    helpText: text(400, 'For help with online fee payment, contact the school help desk.'),
    linkLabel: text(60, 'All contact details'),
    linkHref: href('/contact'),
  }),
})

export const PortalCta = defineBlock({
  type: 'PortalCta',
  label: 'Registration portal invitation (green band)',
  category: 'admission',
  schema: z.object({
    title: text(120, 'Ready to register?'),
    text: text(400, 'The portal is run for the school by IQdigit. For help, call the school office.'),
    buttonLabel: text(60, 'Open registration portal'),
    footText: text(200, 'Not ready to register yet?'),
    footLinkLabel: text(80, 'Send an enquiry instead'),
    footLinkHref: href('/admission/register'),
  }),
})

export const onlineBlocks = [InfoTiles, StepsGuide, HelpCards, AppHelpBand, PortalCta]
