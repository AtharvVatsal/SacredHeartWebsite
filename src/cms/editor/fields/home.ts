'use client'

import type { Fields } from '@puckeditor/core'
import { button, choose, FORMAT_HINT, heading, iconChoice, imageField, link, list, number, paragraph, text, yesNo } from './helpers'

const str = (v: unknown) => (typeof v === 'string' ? v : '')

export const homeFields: Record<string, Fields> = {
  HomeHero: {
    badge: text('Small badge above the title'),
    headingLead: text('Title, first line'),
    headingMain: text('Title, second line (green)'),
    subtitle: paragraph('Text under the title'),
    primary: button('Main button'),
    secondary: button('Second button'),
    slides: list('Slideshow photos', { image: imageField('Photo') }, (item, i) => str((item.image as { alt?: string } | undefined)?.alt) || `Photo ${(i ?? 0) + 1}`, 12),
    interval: number('Seconds per photo', 3, 15),
    badgeOneShow: yesNo('Show the badge at the bottom of the photo'),
    badgeOneSmall: text('Badge: small text'),
    badgeOneMain: text('Badge: main text'),
    badgeTwoShow: yesNo('Show the badge at the top of the photo'),
    badgeTwoText: text('Top badge text'),
    scrollHint: yesNo('Show the “scroll down” hint'),
  },
  QuickActionsBar: {
    buttons: list(
      'Buttons',
      {
        label: text('Button text'),
        href: link(),
        highlight: yesNo('Gold (highlighted) button'),
        icon: choose('Icon', [
          { label: 'None', value: 'none' },
          { label: 'Payment card', value: 'CreditCard' },
          { label: 'Document', value: 'FileText' },
          { label: 'Calendar', value: 'Calendar' },
          { label: 'Add person', value: 'UserPlus' },
        ]),
      },
      (i) => str(i.label),
      6,
    ),
  },
  StatsRow: {
    stats: list('Numbers', { value: text('Number (e.g. 56 or 2.6K)'), suffix: text('After the number (e.g. +)'), label: text('Label') }, (i) => `${str(i.value)}${str(i.suffix)} ${str(i.label)}`, 6),
  },
  QuickLinksGrid: {
    heading: heading(),
    links: list('Links', { title: text('Title'), href: link(), icon: iconChoice() }, (i) => str(i.title), 9),
  },
  AboutPreview: {
    eyebrow: text('Small line above the title'),
    title: text('Title'),
    body: paragraph('Text', FORMAT_HINT),
    chips: list('Labels with ticks', { label: text('Label') }, (i) => str(i.label), 6),
    button: button('Button'),
    cards: list(
      'Cards (up to four)',
      {
        title: text('Title'),
        text: paragraph('Text'),
        icon: iconChoice(),
        style: choose('Look', [
          { label: 'White', value: 'white' },
          { label: 'Green', value: 'green' },
          { label: 'Gold', value: 'gold' },
          { label: 'White with grey icon', value: 'grey' },
        ]),
      },
      (i) => str(i.title),
      4,
    ),
  },
  QuoteFeature: {
    heading: heading(),
    quote: paragraph('Quote'),
    name: text('Name'),
    role: text('Role'),
    photo: imageField('Photo'),
  },
  FeatureGrid: {
    heading: heading(),
    items: list('Cards', { title: text('Title'), text: paragraph('Text'), icon: iconChoice() }, (i) => str(i.title), 16),
  },
  LeaderCards: {
    eyebrow: text('Small line above the title'),
    title: text('Title'),
    subtitle: text('Line under the title'),
    cardLink: link('Where the cards link to'),
    leaders: list('People', { name: text('Name'), role: text('Role'), initials: text('Initials in the badge'), message: paragraph('Message') }, (i) => str(i.name), 6),
    more: button('Link under the cards'),
  },
  AchievementCards: {
    heading: heading(),
    items: list('Achievements', { year: text('Year'), title: text('Title'), text: paragraph('Text') }, (i) => `${str(i.year)} ${str(i.title)}`, 12),
    more: button('Button under the cards'),
  },
  NoticesList: {
    eyebrow: text('Small label above the title'),
    title: text('Title'),
    items: list(
      'Notices',
      { date: text('Date (e.g. 2025-05)'), title: text('Title'), text: paragraph('Text'), important: yesNo('Mark as important'), attachment: link('PDF or document link (optional)') },
      (i) => str(i.title),
      12,
    ),
    more: button('Button under the list'),
    source: choose('Notices shown', [
      { label: 'The notices on the Notifications page (edit them there)', value: 'page' },
      { label: 'The list above', value: 'own' },
    ]),
  },
  HighlightStory: {
    badge: text('Badge text'),
    badgeIcon: iconChoice('Badge icon'),
    title: text('Title'),
    lead: paragraph('First paragraph', FORMAT_HINT),
    body: paragraph('More text', FORMAT_HINT),
  },
  CtaBand: {
    eyebrow: text('Small line above the title'),
    title: text('Title'),
    text: paragraph('Text'),
    primary: button('Gold button'),
    secondary: button('Second button'),
    overlapPrevious: yesNo('Overlap the section above (rounded top edge)'),
  },
}
