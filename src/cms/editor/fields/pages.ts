'use client'

// Editor fields for the page-specific sections (see src/cms/blocks/pages)
import type { Fields } from '@puckeditor/core'
import { button, choose, iconChoice, list, paragraph, text } from './helpers'

const str = (v: unknown) => (typeof v === 'string' ? v : '')

export const pageFields: Record<string, Fields> = {
  PolicyIntro: {
    icon: iconChoice(),
    tone: choose('Icon colour', [
      { label: 'Green', value: 'green' },
      { label: 'Gold', value: 'gold' },
    ]),
    label: text('Label (e.g. Last Updated)'),
    value: text('Value (e.g. April 2025)'),
    text: paragraph('Introduction'),
  },
  PolicySections: {
    sections: list('Sections', { icon: iconChoice(), title: text('Title'), content: paragraph('Text (start a line with • for a bullet)') }, (i) => str(i.title), 20),
  },
  SimpleCta: { title: text('Title'), text: paragraph('Text'), button: button('Button') },
}

const lineList = (label: string, max: number) => list(label, { text: paragraph('Text') }, (i) => str(i.text).slice(0, 60), max)

Object.assign(pageFields, {
  RuleCards: {
    cards: list(
      'Cards',
      {
        title: text('Title'),
        icon: iconChoice('Header icon'),
        tone: choose('Header colour', [
          { label: 'Green', value: 'green' },
          { label: 'Red (warning)', value: 'red' },
        ]),
        intro: paragraph('Introduction (optional)'),
        numbered: lineList('Numbered points (optional)', 20),
        bullets: lineList('Bullet points', 30),
        bulletIcon: choose('Bullet icon', [
          { label: 'Tick', value: 'CheckCircle' },
          { label: 'Scissors', value: 'Scissors' },
          { label: 'Exclamation', value: 'AlertCircle' },
        ]),
        bulletTone: choose('Bullet icon colour', [
          { label: 'Green', value: 'green' },
          { label: 'Red', value: 'red' },
        ]),
        alertTone: choose('Warning box', [
          { label: 'None', value: 'none' },
          { label: 'Red', value: 'red' },
          { label: 'Yellow', value: 'yellow' },
        ]),
        alert: paragraph('Warning text'),
        note: paragraph('Green note (optional)'),
      },
      (i) => str(i.title),
      20,
    ),
    closingTitle: text('Closing box title'),
    closingText: paragraph('Closing box text'),
  },
} satisfies Record<string, Fields>)
