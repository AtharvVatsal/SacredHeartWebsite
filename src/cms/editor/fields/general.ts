'use client'

import type { Field, Fields } from '@puckeditor/core'
import { ICONS } from '../../blocks/shared/icon-names'
import { button, choose, FORMAT_HINT, iconChoice, imageField, link, list, paragraph, text, yesNo } from './helpers'

const str = (v: unknown) => (typeof v === 'string' ? v : '')

const BACKGROUNDS = [
  { label: 'White', value: 'white' },
  { label: 'Light grey', value: 'light' },
  { label: 'Soft green fade', value: 'mint' },
  { label: 'Soft gold', value: 'gold' },
  { label: 'Dark green', value: 'green' },
]

const look: Field = {
  type: 'object',
  label: 'Look',
  objectFields: {
    background: choose('Background', BACKGROUNDS),
    spacing: choose('Space above and below', [
      { label: 'Small', value: 'compact' },
      { label: 'Normal', value: 'normal' },
      { label: 'Large', value: 'spacious' },
    ]),
    width: choose('Content width', [
      { label: 'Narrow (easy reading)', value: 'narrow' },
      { label: 'Normal', value: 'normal' },
      { label: 'Full width', value: 'wide' },
    ]),
    align: choose('Text alignment', [
      { label: 'Left', value: 'left' },
      { label: 'Centred', value: 'center' },
    ]),
  },
}

const sectionHeading = (label = 'Heading'): Field => ({
  type: 'object',
  label,
  objectFields: {
    eyebrow: text('Small line above the title'),
    title: text('Title'),
    intro: paragraph('Introduction (optional)'),
    divider: yesNo('Gold line under the title'),
  },
})

const optionalIcon = (label: string): Field => ({
  type: 'select',
  label,
  options: [{ label: 'No icon', value: 'none' }, ...Object.entries(ICONS).map(([value, name]) => ({ label: name, value }))],
})

const cardStyle = (label = 'Card look') =>
  choose(label, [
    { label: 'White', value: 'white' },
    { label: 'Soft green', value: 'tinted' },
    { label: 'Green', value: 'green' },
    { label: 'Gold', value: 'gold' },
  ])

const columns = (label = 'Cards per row on a computer') =>
  choose(label, [
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
  ])

export const generalFields: Record<string, Fields> = {
  PageHero: {
    title: text('Page title'),
    subtitle: paragraph('Line under the title'),
    badge: text('Small badge above the title (optional)'),
    badgeIcon: iconChoice('Badge icon'),
    back: button('“Back to” link (optional)'),
    motif: optionalIcon('Large faint picture (top right)'),
    motifSmall: optionalIcon('Small faint picture'),
    design: {
      type: 'object',
      label: 'Design',
      objectFields: {
        titleSize: choose('Title size', [
          { label: 'Large', value: 'large' },
          { label: 'Medium', value: 'medium' },
        ]),
        bottomSpace: choose('Space below the text', [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ]),
        glows: choose('Soft background glows', [
          { label: 'None', value: 'none' },
          { label: 'Two', value: 'two' },
          { label: 'Three', value: 'three' },
          { label: 'Two, larger', value: 'twoLarge' },
        ]),
        backStyle: choose('“Back to” link style', [
          { label: 'Plain', value: 'plain' },
          { label: 'Gently moving arrow', value: 'animated' },
          { label: 'Subtle', value: 'subtle' },
          { label: 'Grey', value: 'grey' },
        ]),
        stacked: yesNo('Put the back link and badge on separate lines'),
        titleGap: choose('Space under the title', [
          { label: 'Small', value: 'tight' },
          { label: 'Normal', value: 'normal' },
        ]),
        sparkles: yesNo('Twinkling gold points'),
        badgeBorder: choose('Badge outline', [
          { label: 'Soft', value: 'soft' },
          { label: 'Stronger', value: 'strong' },
        ]),
      },
    },
  },
  SectionHeading: { heading: sectionHeading(), look },
  TextSection: { heading: sectionHeading(), body: paragraph('Text', FORMAT_HINT), look },
  ImageText: {
    heading: sectionHeading(),
    body: paragraph('Text', FORMAT_HINT),
    image: imageField('Picture'),
    imageSide: choose('Picture on the', [
      { label: 'Right', value: 'right' },
      { label: 'Left', value: 'left' },
    ]),
    imageShape: choose('Picture shape', [
      { label: 'Rounded corners', value: 'rounded' },
      { label: 'Square corners', value: 'square' },
      { label: 'Circle', value: 'circle' },
    ]),
    button: button('Button (optional)'),
    look,
  },
  Columns: {
    heading: sectionHeading('Heading (optional)'),
    count: choose('Number of columns', [
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
      { label: 'Four', value: '4' },
    ]),
    gap: choose('Space between columns', [
      { label: 'Small', value: 'small' },
      { label: 'Normal', value: 'normal' },
      { label: 'Large', value: 'large' },
    ]),
    verticalAlign: choose('Line up columns', [
      { label: 'At the top', value: 'top' },
      { label: 'In the middle', value: 'center' },
    ]),
    look,
  },
  CardGrid: {
    heading: sectionHeading(),
    columns: columns(),
    cardStyle: cardStyle(),
    cards: list('Cards', { icon: iconChoice(), title: text('Title'), text: paragraph('Text'), link: link('Link (optional)') }, (i) => str(i.title), 24),
    look,
  },
  Faq: {
    heading: sectionHeading(),
    items: list('Questions', { question: text('Question'), answer: paragraph('Answer', FORMAT_HINT) }, (i) => str(i.question), 30),
    look,
  },
  ButtonRow: {
    buttons: list(
      'Buttons',
      {
        label: text('Button text'),
        href: link(),
        style: choose('Look', [
          { label: 'Green', value: 'green' },
          { label: 'Gold', value: 'gold' },
          { label: 'Outline', value: 'outline' },
        ]),
      },
      (i) => str(i.label),
      4,
    ),
    align: choose('Position', [
      { label: 'Centred', value: 'center' },
      { label: 'Left', value: 'left' },
    ]),
    look,
  },
  Callout: {
    tone: choose('Kind of notice', [
      { label: 'Information (green)', value: 'info' },
      { label: 'Important (amber)', value: 'important' },
      { label: 'Good news (emerald)', value: 'success' },
    ]),
    icon: iconChoice(),
    title: text('Title'),
    body: paragraph('Text', FORMAT_HINT),
    look,
  },
  InfoCard: { icon: optionalIcon('Icon'), title: text('Title'), body: paragraph('Text', FORMAT_HINT), link: button('Link (optional)'), style: cardStyle('Look') },
  ImageBlock: {
    image: imageField('Picture'),
    caption: text('Caption (optional)'),
    shape: choose('Shape', [
      { label: 'Rounded corners', value: 'rounded' },
      { label: 'Square corners', value: 'square' },
      { label: 'Circle', value: 'circle' },
    ]),
    ratio: choose('Proportions', [
      { label: 'As uploaded', value: 'original' },
      { label: 'Landscape', value: 'landscape' },
      { label: 'Square', value: 'square' },
      { label: 'Portrait', value: 'portrait' },
    ]),
  },
  TextBlock: {
    title: text('Title (optional)'),
    body: paragraph('Text', FORMAT_HINT),
    size: choose('Text size', [
      { label: 'Normal', value: 'normal' },
      { label: 'Large', value: 'large' },
    ]),
  },
  ContactCard: {
    title: text('Title'),
    showAddress: yesNo('Show the address'),
    showPhones: yesNo('Show phone numbers'),
    showEmail: yesNo('Show the email address'),
    showDirections: yesNo('Show a directions button'),
    note: paragraph('Extra note (optional)'),
  },
  VideoEmbed: { heading: sectionHeading('Heading (optional)'), youtube: text('YouTube link', 'https://www.youtube.com/watch?v=…'), title: text('Video title (for screen readers)'), look },
  ImageGallery: {
    heading: sectionHeading(),
    columns: columns('Photos per row on a computer'),
    photos: list('Photos', { image: imageField('Photo'), caption: text('Caption (optional)') }, (i, n) => str(i.caption) || str((i.image as { alt?: string } | undefined)?.alt) || `Photo ${(n ?? 0) + 1}`, 48),
    look,
  },
  Spacer: {
    size: choose('Height', [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ]),
    line: yesNo('Show a thin line'),
    background: choose('Background', BACKGROUNDS),
  },
}
