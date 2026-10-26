'use client'

// Editor fields for the page-specific sections (see src/cms/blocks/pages)
import type { Field, Fields } from '@puckeditor/core'
import { GRADIENTS } from '../../blocks/shared/gradients'
import { button, choose, FORMAT_HINT, iconChoice, imageField, list, optionalIcon, paragraph, text, yesNo } from './helpers'

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
  JoinCta: {
    icon: iconChoice(),
    title: text('Title'),
    text: paragraph('Text'),
    button: button('Button'),
    buttonIcon: optionalIcon('Icon in the button'),
    width: choose('Width', [
      { label: 'Normal', value: 'normal' },
      { label: 'Wider', value: 'wide' },
    ]),
    spacing: choose('Space above and below', [
      { label: 'Normal', value: 'normal' },
      { label: 'A little less', value: 'compact' },
    ]),
  },
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

const numberField = (label: string): Field => ({ type: 'number', label, min: 0 })

Object.assign(pageFields, {
  FeeTable: {
    session: text('Session (e.g. 2026-27)'),
    admissionFee: numberField('One-time admission fee (₹)'),
    title: text('Title'),
    intro: paragraph('Introduction'),
    classes: list(
      'Classes',
      {
        label: text('Class (e.g. LKG, I, XI)'),
        categories: list(
          'Categories (e.g. New admission, Old students)',
          {
            name: text('Category name'),
            quarters: list(
              'Quarters',
              { rows: list('Fee heads', { item: text('Fee head'), period: text('Period (e.g. April 2026 to June 2026)'), amount: numberField('Amount (₹)') }, (i) => str(i.item), 30) },
              (_i, n) => `Quarter ${(n ?? 0) + 1}`,
              8,
            ),
          },
          (i) => str(i.name),
          6,
        ),
      },
      (i) => (i.label ? `Class ${str(i.label)}` : ''),
      20,
    ),
    otherClassesNote: paragraph('Note about classes not listed'),
    payTitle: text('“Pay online” box title (leave empty to hide the box)'),
    payText: paragraph('“Pay online” box text'),
    payButton: button('“Pay online” box button'),
  },
  FeeGuidelines: {
    title: text('Title'),
    intro: text('Line under the title'),
    cards: list('Cards', { icon: iconChoice(), title: text('Title'), text: paragraph('Text'), color: gradientChoice() }, (i) => str(i.title), 6),
    noticeTitle: text('Yellow notice title (leave empty to hide)'),
    noticeText: paragraph('Yellow notice text', FORMAT_HINT),
    listTitle: text('List box title (leave empty to hide)'),
    listSubtitle: text('List box subtitle'),
    listIcon: iconChoice('List box icon'),
    listItems: list('List items', { icon: iconChoice(), text: text('Text') }, (i) => str(i.text), 12),
  },
  WarningCard: {
    icon: iconChoice('Header icon'),
    title: text('Title'),
    subtitle: text('Line under the title'),
    itemIcon: iconChoice('Icon beside the text'),
    text: paragraph('Text (**bold** shows in red)', FORMAT_HINT),
  },
} satisfies Record<string, Fields>)

const pairRows = (label: string, a: string, b: string, max: number) => list(label, { a: text(a), b: text(b) }, (i) => str(i.a), max)

Object.assign(pageFields, {
  InfoTiles: { tiles: list('Tiles', { icon: iconChoice(), title: text('Title'), text: paragraph('Text') }, (i) => str(i.title), 4) },
  StepsGuide: {
    eyebrow: text('Small line above the title'),
    title: text('Title'),
    intro: paragraph('Introduction'),
    steps: list(
      'Steps',
      {
        title: text('Step title'),
        summary: text('Line under the step title'),
        icon: iconChoice(),
        points: textList('Points', 12),
        tables: list(
          'Small tables (optional)',
          { caption: text('Table heading'), headA: text('First column heading'), headB: text('Second column heading'), rows: pairRows('Rows', 'First column', 'Second column', 12) },
          (i) => str(i.caption),
          4,
        ),
        chipsTitle: text('Heading for the chips (optional)'),
        chips: textList('Chips (optional)', 12),
        important: paragraph('“Important” note (optional)'),
      },
      (i) => str(i.title),
      20,
    ),
    label: text('Name of the list for screen readers'),
    anchor: text('Link anchor (optional, e.g. “steps” lets other links jump here with #steps)'),
    background: choose('Background', [
      { label: 'White', value: 'white' },
      { label: 'Soft green fade', value: 'mint' },
    ]),
  },
  HelpCards: {
    cards: list(
      'Cards',
      {
        tone: choose('Look', [
          { label: 'Red (warning)', value: 'red' },
          { label: 'White', value: 'white' },
        ]),
        icon: iconChoice(),
        title: text('Title'),
        text: paragraph('Text (empty line between paragraphs)'),
        items: textList('List (optional)', 12),
        note: text('Small note at the bottom (optional)'),
      },
      (i) => str(i.title),
      3,
    ),
    tableTitle: text('Table title (leave empty to hide the table)'),
    tableIcon: iconChoice('Table icon'),
    headA: text('First column heading'),
    headB: text('Second column heading'),
    rows: pairRows('Table rows', 'First column', 'Second column', 12),
    footnote: paragraph('Note under the table'),
    background: choose('Background', [
      { label: 'Light grey', value: 'grey' },
      { label: 'White', value: 'white' },
    ]),
  },
  AppHelpBand: {
    appTitle: text('App title'),
    appText: paragraph('App text (store links come from Site settings)'),
    androidLabel: text('Google Play button text'),
    iosLabel: text('App Store button text'),
    helpTitle: text('Help box title'),
    helpText: paragraph('Help box text (phone numbers come from Site settings)'),
    linkLabel: text('Link text'),
    linkHref: text('Link address'),
  },
  PortalCta: {
    title: text('Title'),
    text: paragraph('Text'),
    buttonLabel: text('Portal button text (the address comes from Site settings)'),
    footText: text('Line at the bottom'),
    footLinkLabel: text('Link text at the bottom'),
    footLinkHref: text('Link address at the bottom'),
  },
} satisfies Record<string, Fields>)

const largeHeading: Fields = { ...centredHeading }
const tintChoice = choose('Icon background', [
  { label: 'Amber', value: 'amber' },
  { label: 'Pink', value: 'pink' },
  { label: 'Blue', value: 'blue' },
  { label: 'Purple', value: 'purple' },
  { label: 'Emerald', value: 'emerald' },
  { label: 'Cyan', value: 'cyan' },
])

Object.assign(pageFields, {
  VisionTabs: { ...largeHeading, items: list('Topics', { title: text('Title'), content: paragraph('Text') }, (i) => str(i.title), 12) },
  AimsGrid: {
    ...largeHeading,
    aims: list('Cards', { title: text('Title'), text: paragraph('Text'), icon: iconChoice(), color: gradientChoice('Icon colour'), tint: tintChoice }, (i) => str(i.title), 12),
  },
  ValuesGrid: { ...largeHeading, values: list('Values', { name: text('Name'), icon: iconChoice(), color: gradientChoice('Icon colour') }, (i) => str(i.name), 16) },
  DualCta: { title: text('Title'), text: paragraph('Text'), primary: button('Green button'), secondary: button('Gold button'), arrows: yesNo('Arrows in the buttons') },
} satisfies Record<string, Fields>)

Object.assign(pageFields, {
  MilestoneTimeline: {
    ...largeHeading,
    milestones: list(
      'Milestones',
      { year: text('Year'), title: text('Title'), subtitle: text('Line under the title'), content: paragraph('Text shown when opened'), icon: text('Emoji (e.g. 🏫)') },
      (i) => [str(i.year), str(i.title)].filter(Boolean).join(' · '),
      30,
    ),
    endIcon: iconChoice('Closing icon'),
    endTitle: text('Closing title (leave empty to hide)'),
    endText: text('Closing line'),
  },
  MissionPanel: { icon: iconChoice(), title: text('Title'), subtitle: text('Line under the title'), text: paragraph('Text') },
  StoryCard: {
    pill: text('Small label above the title (optional)'),
    pillIcon: iconChoice('Label icon'),
    pillTone: centredHeading.pillTone,
    title: text('Title'),
    body: paragraph('Text (empty line between paragraphs)', FORMAT_HINT),
    look: choose('Card look', [
      { label: 'White card', value: 'light' },
      { label: 'Dark green card', value: 'dark' },
    ]),
  },
  StatTiles: {
    tiles: list(
      'Numbers',
      {
        icon: iconChoice(),
        value: text('Number (e.g. 1969, 56+)'),
        label: text('Label'),
        look: choose('Look', [
          { label: 'Light green', value: 'light' },
          { label: 'Gold', value: 'gold' },
        ]),
      },
      (i) => [str(i.value), str(i.label)].filter(Boolean).join(' '),
      6,
    ),
  },
} satisfies Record<string, Fields>)

Object.assign(pageFields, {
  LeaderProfile: {
    photo: imageField('Photo'),
    name: text('Name (leave empty to use the principal named in Site settings)'),
    role: text('Role (shown before the school name)'),
    pill: text('Small label above the name'),
    message: list('Message', { icon: iconChoice(), text: paragraph('Paragraph') }, (i) => str(i.text).slice(0, 60), 8),
    quote: paragraph('Highlighted quote (optional)'),
    link: button('Link under the message'),
    badgeLabel: text('Photo badge: small line'),
    badgeText: text('Photo badge: main line (leave empty to hide)'),
    cornerBadge: text('Corner badge on the photo (optional)'),
  },
  NumberedThemes: {
    eyebrow: text('Small line above the title'),
    title: text('Title'),
    themes: list('Themes', { title: text('Title'), text: paragraph('Text') }, (i) => str(i.title), 20),
    closing: paragraph('Closing message (leave empty to hide the signed box)'),
    signoff: text('Sign-off (e.g. God Bless)'),
    signName: text('Signed by (leave empty to use the principal named in Site settings)'),
    signRole: text('Role under the name (leave empty for "Principal, <school name>, Sidhpur")'),
  },
  HighlightBand: { stats: list('Figures', { icon: iconChoice(), value: text('Figure (e.g. 2.6K+)'), label: text('Label') }, (i) => [str(i.value), str(i.label)].filter(Boolean).join(' '), 8) },
} satisfies Record<string, Fields>)

Object.assign(pageFields, {
  LeaderMessages: {
    cards: list(
      'Cards',
      {
        name: text('Name'),
        role: text('Role (e.g. Head Boy)'),
        subtitle: text('Line under the name (e.g. Academic Year 2026-27)'),
        photo: imageField('Photo'),
        heading: text('Message heading'),
        message: paragraph('Message (empty line between paragraphs; the last paragraph is the sign-off)'),
        look: choose('Header colour', [
          { label: 'Green', value: 'green' },
          { label: 'Gold', value: 'gold' },
        ]),
      },
      (i) => [str(i.role), str(i.name)].filter(Boolean).join(': '),
      6,
    ),
  },
} satisfies Record<string, Fields>)

const houseRows = (label: string) =>
  list(label, { house: text('House'), captain: text('Captain'), viceCaptain: text('Vice captain') }, (i) => str(i.house), 12)

Object.assign(pageFields, {
  OfficeBearersList: {
    sessions: list(
      'Sessions (newest first; the first one is shown when the page opens)',
      {
        year: text('Session (e.g. 2026)'),
        headGirl: text('Head Girl (name and class)'),
        headGirlImage: imageField('Head Girl photo (optional)'),
        headBoy: text('Head Boy (name and class)'),
        headBoyImage: imageField('Head Boy photo (optional)'),
        gamesCaptainGirls: text('Games captain, girls'),
        gamesViceCaptainGirls: text('Games vice captain, girls'),
        gamesCaptainBoys: text('Games captain, boys'),
        gamesViceCaptainBoys: text('Games vice captain, boys'),
        editorsInChief: text('Editors-in-chief'),
        editorialMembers: text('Editorial members (optional)'),
        houseCaptains: houseRows('House captains'),
        prefects: list('Prefects', { house: text('House (optional)'), names: paragraph('Names, separated by commas') }, (i) => str(i.house) || str(i.names).slice(0, 40), 12),
        juniorCaptains: houseRows('Junior captains (optional)'),
      },
      (i) => (i.year ? `Session ${str(i.year)}` : ''),
      30,
    ),
    messagesHref: text('Address of the messages page (the "Read Message" buttons, current session only)'),
  },
} satisfies Record<string, Fields>)

Object.assign(pageFields, {
  NotableAchievements: {
    title: text('Title'),
    items: list(
      'Achievements',
      {
        title: text('Title'),
        year: text('Year'),
        category: choose('Kind', [
          { label: 'Academic', value: 'academic' },
          { label: 'Sports', value: 'sports' },
          { label: 'Cultural', value: 'cultural' },
          { label: 'Other', value: 'other' },
        ]),
        text: paragraph('Text'),
        studentName: text('Student (optional)'),
      },
      (i) => str(i.title),
      30,
    ),
  },
  TopperHighlights: {
    columns: list(
      'Columns',
      {
        classLabel: text('Class (e.g. Class 10)'),
        source: choose('Toppers from', [
          { label: 'The Class 10 toppers page', value: '/achievements/toppers/10th' },
          { label: 'The Class 12 toppers page', value: '/achievements/toppers/12th' },
        ]),
        href: text('“View all” link address'),
      },
      (i) => str(i.classLabel),
      2,
    ),
  },
  TopperHero: { title: text('Title'), badge: text('Small badge above the title'), subtitle: paragraph('Line under the title'), link: button('Button') },
  ToppersList: {
    classLabel: text('Class (e.g. Class 10)'),
    title: text('Title'),
    intro: text('Line under the title'),
    sessions: list(
      'Sessions (newest first; the first one is shown when the page opens)',
      {
        year: text('Session (e.g. 2025-26)'),
        toppers: list(
          'Toppers (ranked automatically by percentage)',
          { name: text('Name'), percentage: { type: 'number', label: 'Percentage', min: 0, max: 100 }, photo: imageField('Photo (optional)') },
          (i) => [str(i.name), typeof i.percentage === 'number' ? `${i.percentage}%` : ''].filter(Boolean).join(' · '),
          60,
        ),
      },
      (i) => (i.year ? `Session ${str(i.year)}` : ''),
      30,
    ),
  },
  TopperCta: { title: text('Title'), text: paragraph('Text'), button: button('Button') },
  ClassChooser: {
    title: text('Title'),
    intro: text('Line under the title'),
    cards: list(
      'Cards',
      {
        title: text('Title'),
        text: paragraph('Text'),
        href: text('Link address'),
        icon: iconChoice(),
        look: choose('Colour', [
          { label: 'Green', value: 'green' },
          { label: 'Gold', value: 'gold' },
        ]),
      },
      (i) => str(i.title),
      4,
    ),
    showCounts: yesNo('Show the counts (worked out from the toppers pages)'),
  },
} satisfies Record<string, Fields>)

Object.assign(pageFields, {
  FeaturedAlumnus: {
    pill: text('Small label above the title'),
    pillIcon: iconChoice('Label icon'),
    title: text('Title'),
    intro: text('Line under the title'),
    name: text('Name'),
    kicker: text('Line above the name'),
    role: text('Line under the name'),
    badgeIcon: iconChoice('Icon beside the name'),
    story: paragraph('Story (empty line between paragraphs)', FORMAT_HINT),
    quote: paragraph('Quote'),
    quoteBy: text('Quote by'),
    tags: list('Tags', { icon: iconChoice(), label: text('Tag') }, (i) => str(i.label), 8),
    galleryTitle: text('Photo gallery title'),
    photos: list('Photos', { photo: imageField('Photo') }, (_i, n) => `Photo ${(n ?? 0) + 1}`, 24),
  },
  StatCounters: { stats: list('Figures', { value: text('Figure (e.g. 2.6K+)'), label: text('Label') }, (i) => [str(i.value), str(i.label)].filter(Boolean).join(' '), 8) },
  HighlightNote: { icon: iconChoice(), title: text('Title'), subtitle: text('Line under the title'), text: paragraph('Text') },
  AchieverCards: {
    pill: text('Small label above the title'),
    pillIcon: iconChoice('Label icon'),
    title: text('Title'),
    intro: text('Line under the title'),
    items: list(
      'Achievers',
      {
        title: text('Achievement'),
        student: text('Student'),
        className: text('Class (e.g. VII-C)'),
        year: text('Year'),
        category: text('Kind (e.g. Academic)'),
        text: paragraph('Text'),
        photo: imageField('Photo (optional)'),
      },
      (i) => str(i.title),
      40,
    ),
  },
  DreamCta: { title: text('Title'), text: paragraph('Text'), button: button('Button') },
} satisfies Record<string, Fields>)

const eyebrowTitle: Fields = { eyebrow: text('Small line above the title'), title: text('Title') }
const toneChoice = (label: string, tones: [string, string][]) => choose(label, tones.map(([value, name]) => ({ label: name, value })))

Object.assign(pageFields, {
  ClassLevels: { ...eyebrowTitle, items: list('Cards', { name: text('Title'), text: paragraph('Text'), icon: iconChoice(), color: gradientChoice() }, (i) => str(i.name), 10) },
  StreamTiles: {
    ...eyebrowTitle,
    streams: list(
      'Streams',
      {
        name: text('Name'),
        subjects: textList('Subjects', 12),
        icon: iconChoice(),
        color: gradientChoice('Icon colour'),
        tint: toneChoice('Card tint', [['blue', 'Blue'], ['amber', 'Amber'], ['pink', 'Pink']]),
      },
      (i) => str(i.name),
      6,
    ),
  },
  SubjectOverview: {
    ...eyebrowTitle,
    subjects: list(
      'Subjects',
      { category: text('Name'), items: textList('Items', 12), tone: toneChoice('Icon colour', [['violet', 'Violet'], ['blue', 'Blue'], ['emerald', 'Emerald'], ['amber', 'Amber']]) },
      (i) => str(i.category),
      8,
    ),
  },
  ResourceLinks: {
    ...eyebrowTitle,
    links: list(
      'Links',
      {
        title: text('Title'),
        text: text('Line under the title'),
        href: text('Link address'),
        icon: iconChoice(),
        tone: toneChoice('Colour', [['green', 'Green'], ['purple', 'Purple'], ['gold', 'Gold']]),
        newTab: yesNo('Open in a new tab (for documents)'),
      },
      (i) => str(i.title),
      8,
    ),
  },
  ActivitiesBand: {
    ...eyebrowTitle,
    intro: paragraph('Line under the title'),
    items: list('Activities', { name: text('Name'), icon: iconChoice(), tone: toneChoice('Colour', [['pink', 'Pink'], ['purple', 'Purple'], ['green', 'Green'], ['blue', 'Blue']]) }, (i) => str(i.name), 12),
  },
} satisfies Record<string, Fields>)

Object.assign(pageFields, {
  ProcessSteps: {
    ...eyebrowTitle,
    intro: paragraph('Line under the title'),
    steps: list('Steps', { title: text('Title'), text: paragraph('Text'), icon: iconChoice(), color: gradientChoice() }, (i) => str(i.title), 8),
    button: button('Button under the steps'),
    footText: text('Line under the button'),
    footLink: button('Link at the end of that line'),
  },
  ChecklistCard: { icon: iconChoice(), title: text('Title'), subtitle: text('Line under the title'), items: textList('Items', 20) },
  NumberedRules: { ...eyebrowTitle, rules: textList('Rules', 30), note: paragraph('Note under the rules (links allowed)', FORMAT_HINT) },
  GradientLinkCards: {
    ...eyebrowTitle,
    links: list('Cards', { title: text('Title'), text: paragraph('Text'), href: text('Link address'), icon: iconChoice(), color: gradientChoice() }, (i) => str(i.title), 8),
    moreLabel: text('Text beside the arrow'),
  },
  DatesNotice: {
    ...eyebrowTitle,
    heading: text('Notice heading'),
    text: paragraph('Notice text (empty line between paragraphs; phone numbers and email come from Site settings)'),
    emailLabel: text('Email button text'),
  },
  ApplyBand: { title: text('Title'), text: paragraph('Text'), button: button('Button') },
} satisfies Record<string, Fields>)
