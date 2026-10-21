// General-purpose sections for building new pages and redesigning existing ones. They use the site's own
// visual language (green hero, gold dividers, the card styles of the existing pages) and approved choices
// for colours, spacing and width instead of free-form styling.
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, image, list, longText, slot, text } from '../../document/fields'
import { button, icon } from '../common'
import { ICON_NAMES } from '../shared/icon-names'

/** Approved section backgrounds, spacing and widths */
export const BACKGROUNDS = ['white', 'light', 'mint', 'gold', 'green'] as const
export const SPACINGS = ['compact', 'normal', 'spacious'] as const
export const WIDTHS = ['narrow', 'normal', 'wide'] as const
export const ALIGNS = ['left', 'center'] as const

const look = () =>
  z
    .object({
      background: choice(BACKGROUNDS, 'white'),
      spacing: choice(SPACINGS, 'normal'),
      width: choice(WIDTHS, 'normal'),
      align: choice(ALIGNS, 'left'),
    })
    .default({ background: 'white', spacing: 'normal', width: 'normal', align: 'left' })
export type LookValue = z.infer<ReturnType<typeof look>>

const sectionHeading = (eyebrow = '', title = '', intro = '') =>
  z.object({ eyebrow: text(60, eyebrow), title: text(140, title), intro: text(500, intro), divider: bool(true) }).default({ eyebrow, title, intro, divider: true })

/** Blocks that may sit inside a column */
export const COLUMN_ITEMS = ['InfoCard', 'ImageBlock', 'TextBlock', 'ButtonRow', 'Callout', 'ContactCard'] as const

export const PageHero = defineBlock({
  type: 'PageHero',
  label: 'Page title banner (green)',
  category: 'layout',
  schema: z.object({
    badge: text(60, 'Our School'),
    badgeIcon: icon('Sparkles'),
    title: text(120, 'Page title'),
    subtitle: text(300, 'A short line about this page'),
    back: button('', ''),
    motif: z.enum(['none', ...ICON_NAMES]).default('GraduationCap'),
    motifSmall: z.enum(['none', ...ICON_NAMES]).default('BookOpen'),
    design: z
      .object({
        titleSize: choice(['large', 'medium'] as const, 'medium'),
        bottomSpace: choice(['small', 'medium', 'large'] as const, 'small'),
        glows: choice(['none', 'two', 'three'] as const, 'two'),
        backStyle: choice(['animated', 'subtle', 'plain'] as const, 'plain'),
        stacked: bool(false),
        titleGap: choice(['tight', 'normal'] as const, 'tight'),
        sparkles: bool(true),
      })
      .default({ titleSize: 'medium', bottomSpace: 'small', glows: 'two', backStyle: 'plain', stacked: false, titleGap: 'tight', sparkles: true }),
  }),
})

export const SectionHeading = defineBlock({
  type: 'SectionHeading',
  label: 'Heading',
  category: 'content',
  schema: z.object({ heading: sectionHeading('Section', 'A new section'), look: look() }),
})

export const TextSection = defineBlock({
  type: 'TextSection',
  label: 'Text section',
  category: 'content',
  schema: z.object({
    heading: sectionHeading('', 'A heading for this text'),
    body: longText(6000, 'Write your text here. Leave an empty line to start a new paragraph.\n\nUse **bold** for emphasis and [a link](/contact) to point people to another page.'),
    look: look(),
  }),
})

export const ImageText = defineBlock({
  type: 'ImageText',
  label: 'Image with text',
  category: 'content',
  schema: z.object({
    heading: sectionHeading('', 'Picture and text side by side'),
    body: longText(3000, 'Describe what the picture shows or why it matters.'),
    image: image({ src: '/images/Homepage/Hero_First.webp', alt: 'The school campus' }),
    imageSide: choice(['left', 'right'] as const, 'right'),
    imageShape: choice(['rounded', 'square', 'circle'] as const, 'rounded'),
    button: button('', ''),
    look: look(),
  }),
})

export const Columns = defineBlock({
  type: 'Columns',
  label: 'Columns (drag items into each column)',
  category: 'layout',
  slots: ['col1', 'col2', 'col3', 'col4'],
  slotAllow: COLUMN_ITEMS,
  schema: z.object({
    heading: sectionHeading('', ''),
    count: choice(['2', '3', '4'] as const, '3'),
    gap: choice(['small', 'normal', 'large'] as const, 'normal'),
    verticalAlign: choice(['top', 'center'] as const, 'top'),
    look: look(),
    col1: slot(),
    col2: slot(),
    col3: slot(),
    col4: slot(),
  }),
})

export const CardGrid = defineBlock({
  type: 'CardGrid',
  label: 'Cards with icons',
  category: 'cards',
  schema: z.object({
    heading: sectionHeading('Highlights', 'What makes us different'),
    columns: choice(['2', '3', '4'] as const, '3'),
    cardStyle: choice(['white', 'tinted', 'green', 'gold'] as const, 'white'),
    cards: list(z.object({ icon: icon('Star'), title: text(80), text: text(400), link: href() }), 24, [
      { icon: 'BookOpen', title: 'Strong academics', text: 'A rigorous CISCE curriculum from Nursery to Class 12.', link: '' },
      { icon: 'Heart', title: 'Values first', text: 'Education rooted in love, justice and service.', link: '' },
      { icon: 'Trophy', title: 'Beyond the classroom', text: 'Sports, arts and activities for every child.', link: '' },
    ]),
    look: look(),
  }),
})

export const Faq = defineBlock({
  type: 'Faq',
  label: 'Questions and answers',
  category: 'content',
  schema: z.object({
    heading: sectionHeading('FAQ', 'Frequently asked questions'),
    items: list(z.object({ question: text(200), answer: longText(2000) }), 30, [
      { question: 'When do admissions open?', answer: 'Write the answer here.' },
      { question: 'How do I pay the fee online?', answer: 'Write the answer here.' },
    ]),
    look: look(),
  }),
})

export const ButtonRow = defineBlock({
  type: 'ButtonRow',
  label: 'Buttons',
  category: 'actions',
  schema: z.object({
    buttons: list(z.object({ label: text(40), href: href(), style: choice(['green', 'gold', 'outline'] as const, 'green') }), 4, [
      { label: 'Apply for Admission', href: '/admission', style: 'green' },
      { label: 'Contact Us', href: '/contact', style: 'outline' },
    ]),
    align: choice(['left', 'center'] as const, 'center'),
    look: look(),
  }),
})

export const Callout = defineBlock({
  type: 'Callout',
  label: 'Notice box',
  category: 'content',
  schema: z.object({
    tone: choice(['info', 'important', 'success'] as const, 'info'),
    icon: icon('Info'),
    title: text(120, 'Please note'),
    body: longText(1500, 'Write the notice here.'),
    look: look(),
  }),
})

export const InfoCard = defineBlock({
  type: 'InfoCard',
  label: 'Card',
  category: 'cards',
  schema: z.object({
    icon: z.enum(['none', ...ICON_NAMES]).default('Star'),
    title: text(80, 'Card title'),
    body: longText(800, 'A short description.'),
    link: button('', ''),
    style: choice(['white', 'tinted', 'green', 'gold'] as const, 'white'),
  }),
})

export const ImageBlock = defineBlock({
  type: 'ImageBlock',
  label: 'Image',
  category: 'content',
  schema: z.object({
    image: image({ src: '/images/Homepage/Hero_1.webp', alt: 'School photo' }),
    caption: text(200, ''),
    shape: choice(['rounded', 'square', 'circle'] as const, 'rounded'),
    ratio: choice(['original', 'landscape', 'square', 'portrait'] as const, 'landscape'),
  }),
})

export const TextBlock = defineBlock({
  type: 'TextBlock',
  label: 'Paragraphs',
  category: 'content',
  schema: z.object({ title: text(120, ''), body: longText(4000, 'Write your text here.'), size: choice(['normal', 'large'] as const, 'normal') }),
})

export const ContactCard = defineBlock({
  type: 'ContactCard',
  label: 'School contact details',
  category: 'content',
  schema: z.object({
    title: text(80, 'Contact the school office'),
    showAddress: bool(true),
    showPhones: bool(true),
    showEmail: bool(true),
    showDirections: bool(true),
    note: text(300, ''),
  }),
})

export const VideoEmbed = defineBlock({
  type: 'VideoEmbed',
  label: 'YouTube video',
  category: 'content',
  schema: z.object({
    heading: sectionHeading('', ''),
    youtube: z
      .string()
      .max(200)
      .refine((v) => v === '' || /^[\w-]{11}$/.test(v) || /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]{11}/.test(v), { message: 'Paste a YouTube link or video id' })
      .default(''),
    title: text(120, 'School video'),
    look: look(),
  }),
})

export const ImageGallery = defineBlock({
  type: 'ImageGallery',
  label: 'Photo grid',
  category: 'content',
  schema: z.object({
    heading: sectionHeading('Gallery', 'Moments from school life'),
    columns: choice(['2', '3', '4'] as const, '3'),
    photos: list(z.object({ image: image(), caption: text(160) }), 48, [
      { image: { mediaId: null, src: '/images/Homepage/Hero_2.webp', alt: 'School event', position: 'center' }, caption: '' },
      { image: { mediaId: null, src: '/images/Homepage/Hero_3.webp', alt: 'School event', position: 'center' }, caption: '' },
      { image: { mediaId: null, src: '/images/Homepage/Hero_4.webp', alt: 'School event', position: 'center' }, caption: '' },
    ]),
    look: look(),
  }),
})

export const Spacer = defineBlock({
  type: 'Spacer',
  label: 'Space or divider line',
  category: 'layout',
  schema: z.object({ size: choice(['small', 'medium', 'large'] as const, 'medium'), line: bool(false), background: choice(BACKGROUNDS, 'white') }),
})

export const generalBlocks = [PageHero, SectionHeading, TextSection, ImageText, Columns, CardGrid, Faq, ButtonRow, Callout, InfoCard, ImageBlock, TextBlock, ContactCard, VideoEmbed, ImageGallery, Spacer]
