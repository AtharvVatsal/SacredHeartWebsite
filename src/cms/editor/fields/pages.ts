'use client'

// Editor fields for the page-specific sections (see src/cms/blocks/pages)
import type { Fields } from '@puckeditor/core'
import { GRADIENTS } from '../../blocks/shared/gradients'
import { button, choose, FORMAT_HINT, iconChoice, list, paragraph, text, yesNo } from './helpers'

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

Object.assign(pageFields, {
  NoticeStrip: { icon: iconChoice(), text: text('Text') },
  GuidelineCard: {
    icon: iconChoice('Header icon'),
    title: text('Title'),
    items: list('Guidelines', { icon: iconChoice(), title: text('Title'), text: paragraph('Text') }, (i) => str(i.title), 30),
  },
  CallBand: { title: text('Title'), text: paragraph('Text (the button calls the first phone number in Site settings)') },
} satisfies Record<string, Fields>)

const gradientChoice = (label = 'Colour') => choose(label, Object.entries(GRADIENTS).map(([value, name]) => ({ label: name, value })))
const textList = (label: string, max: number) => list(label, { text: text('Text') }, (i) => str(i.text), max)
const centredHeading: Fields = {
  pill: text('Small label above the title (optional)'),
  pillIcon: iconChoice('Label icon'),
  pillTone: choose('Label colour', [
    { label: 'Blue', value: 'blue' },
    { label: 'Purple', value: 'purple' },
    { label: 'Green', value: 'green' },
    { label: 'Amber', value: 'amber' },
    { label: 'Gold', value: 'gold' },
    { label: 'Gold (for dark backgrounds)', value: 'goldOnDark' },
  ]),
  title: text('Title'),
  intro: text('Line under the title (optional)'),
}

Object.assign(pageFields, {
  CurriculumCard: { icon: iconChoice('Header icon'), title: text('Title'), subtitle: text('Line under the title'), body: paragraph('Text', FORMAT_HINT) },
  SubjectGroups: {
    ...centredHeading,
    groups: list('Groups', { category: text('Group name'), icon: iconChoice(), color: gradientChoice(), items: textList('Subjects', 20) }, (i) => str(i.category), 9),
  },
  StreamCards: {
    ...centredHeading,
    streams: list('Streams', { name: text('Name'), description: paragraph('Description'), color: gradientChoice(), subjects: textList('Subjects', 12) }, (i) => str(i.name), 9),
  },
  HomeworkCard: { icon: iconChoice(), title: text('Title'), text: paragraph('Text', FORMAT_HINT), note: text('Red note (optional)'), noteIcon: iconChoice('Note icon') },
  TipsGrid: {
    ...centredHeading,
    tips: list('Tips', { icon: iconChoice(), title: text('Title'), text: paragraph('Text'), color: gradientChoice('Icon colour') }, (i) => str(i.title), 24),
  },
  JoinCta: { icon: iconChoice(), title: text('Title'), text: paragraph('Text'), button: button('Button') },
} satisfies Record<string, Fields>)

Object.assign(pageFields, {
  GoldInfoCard: { icon: iconChoice(), title: text('Title'), text: paragraph('Text', FORMAT_HINT) },
  DressCard: {
    title: text('Title'),
    subtitle: text('Line under the title'),
    icon: iconChoice('Header icon'),
    tone: choose('Header colour', [
      { label: 'Pink', value: 'pink' },
      { label: 'Blue', value: 'blue' },
      { label: 'Slate grey', value: 'slate' },
      { label: 'Green', value: 'green' },
      { label: 'School green', value: 'primary' },
    ]),
    layout: choose('Layout', [
      { label: 'One list with notes (first group only)', value: 'list' },
      { label: 'Groups in tinted boxes, one under another', value: 'groups' },
      { label: 'Two columns with a shirt icon', value: 'columns' },
      { label: 'Two tinted boxes side by side', value: 'boxes' },
      { label: 'Centred text with three points (first group only)', value: 'centred' },
    ]),
    background: choose('Section background', [
      { label: 'White', value: 'white' },
      { label: 'Light grey fade', value: 'fade' },
    ]),
    intro: paragraph('Centred text (Centred layout only)'),
    groups: list(
      'Groups',
      {
        title: text('Group title'),
        twoColumns: yesNo('Two columns on computers'),
        items: list('Items', { text: text('Item'), note: text('Small note (List layout only)') }, (i) => str(i.text), 30),
      },
      (i) => str(i.title),
      6,
    ),
    note: paragraph('Blue note under the lists (optional)', FORMAT_HINT),
  },
} satisfies Record<string, Fields>)
