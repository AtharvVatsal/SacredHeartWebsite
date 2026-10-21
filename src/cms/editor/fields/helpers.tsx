'use client'

// Field builders for the visual editor's settings panel. Labels are plain language; values are validated
// again on the server when a page is published (src/cms/document/fields.ts).
import type { Field, Fields } from '@puckeditor/core'
import { ICONS } from '../../blocks/shared/icon-names'
import { ImagePickerField } from './ImagePicker'

export const text = (label: string, placeholder?: string): Field => ({ type: 'text', label, placeholder })

export const paragraph = (label: string, placeholder?: string): Field => ({ type: 'textarea', label, placeholder })

export const link = (label = 'Link'): Field => ({ type: 'text', label, placeholder: '/page-address, https://…, mailto:… or tel:…' })

export const yesNo = (label: string): Field => ({
  type: 'radio',
  label,
  options: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
})

export const choose = (label: string, options: { label: string; value: string }[]): Field => ({ type: 'select', label, options })

export const number = (label: string, min: number, max: number): Field => ({ type: 'number', label, min, max })

export const iconChoice = (label = 'Icon'): Field => ({
  type: 'select',
  label,
  options: Object.entries(ICONS).map(([value, name]) => ({ label: name, value })),
})

export const imageField = (label = 'Image'): Field => ({ type: 'custom', label, render: ImagePickerField })

export const button = (label: string): Field => ({
  type: 'object',
  label,
  objectFields: { label: text('Button text'), href: link('Button link') },
})

export const heading = (label = 'Heading'): Field => ({
  type: 'object',
  label,
  objectFields: {
    eyebrow: text('Small line above the title'),
    title: text('Title'),
    intro: paragraph('Introduction (optional)'),
  },
})

export function list(label: string, arrayFields: Fields, summary: (item: Record<string, unknown>, i?: number) => string, max = 24): Field {
  return {
    type: 'array',
    label,
    arrayFields,
    max,
    getItemSummary: (item, i) => summary(item as Record<string, unknown>, i) || `Item ${(i ?? 0) + 1}`,
  } as Field
}

/** Options every section has, shown at the bottom of its settings */
export const commonFields: Fields = {
  hidden: {
    type: 'radio',
    label: 'Show this section to visitors',
    options: [
      { label: 'Show', value: false },
      { label: 'Hide', value: true },
    ],
  },
  hideOn: choose('Show on', [
    { label: 'All screens', value: 'none' },
    { label: 'Computers and tablets only', value: 'mobile' },
    { label: 'Phones only', value: 'desktop' },
  ]),
}

export const FORMAT_HINT = 'Tip: **bold**, ==gold highlight==, *italic*, [link text](/address). Leave an empty line between paragraphs.'
