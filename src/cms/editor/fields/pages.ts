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
