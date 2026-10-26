// Home page sections. Defaults are the home page's current content, so a section inserted from the
// library starts out looking exactly like the original.
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, image, int, list, longText, text } from '../../document/fields'
import { achievements, facilities, heroImages, heroSection, notifications, quickLinks, schoolInfo, statistics, studentLeaders } from '@/data/school'
import { button, heading, icon } from '../common'
import type { IconName } from '../shared/icon-names'
import { figureSource, sourceOfStat } from '../shared/figures'

const slide = (src: string) => ({ image: { mediaId: null, src, alt: "", position: "center" as const } })

export const HomeHero = defineBlock({
  type: 'HomeHero',
  label: 'Home hero with slideshow',
  category: 'home',
  schema: z.object({
    badge: text(80, `${schoolInfo.affiliation} • Est. ${schoolInfo.established}`),
    headingLead: text(60, 'Welcome to'),
    headingMain: text(100, schoolInfo.fullName),
    subtitle: text(240, heroSection.subtitle),
    primary: button(heroSection.ctaText, heroSection.ctaLink),
    secondary: button('About Our School', '/about'),
    slides: list(z.object({ image: image() }), 12, heroImages.map(slide)),
    interval: int(3, 15, 5),
    badgeOneShow: bool(true),
    badgeOneSmall: text(30, 'Ranked'),
    badgeOneMain: text(40, 'Top School'),
    badgeTwoShow: bool(true),
    badgeTwoText: text(40, '56+ Years'),
    scrollHint: bool(true),
  }),
})

export const QuickActionsBar = defineBlock({
  type: 'QuickActionsBar',
  label: 'Quick action buttons (green bar)',
  category: 'actions',
  schema: z.object({
    buttons: list(
      z.object({ label: text(40), href: href(), highlight: bool(false), icon: z.enum(['none', 'CreditCard', 'FileText', 'Calendar', 'UserPlus']).default('none') }),
      6,
      [
        { label: 'Fee Structure', href: '/admission/fee-structure', highlight: true, icon: 'CreditCard' },
        { label: 'Pay Fee Online', href: '/admission/online-fee', highlight: false, icon: 'none' },
        { label: 'Online Registration', href: '/admission/online-registration', highlight: false, icon: 'none' },
      ],
    ),
  }),
})

export const StatsRow = defineBlock({
  type: 'StatsRow',
  label: 'Numbers (count up)',
  category: 'cards',
  schema: z.object({
    stats: list(z.object({ value: text(12), suffix: text(6), label: text(40), count: figureSource() }), 6, statistics.map((s) => ({ value: s.value, suffix: s.suffix ?? '', label: s.label, count: sourceOfStat(s.label) }))),
  }),
})

export const QuickLinksGrid = defineBlock({
  type: 'QuickLinksGrid',
  label: 'Quick links (icon tiles)',
  category: 'cards',
  schema: z.object({
    heading: heading('Navigate Fast', 'Quick Links', 'Access important information and resources'),
    links: list(z.object({ title: text(60), href: href(), icon: icon('Star') }), 9, quickLinks.map((l) => ({ title: l.title, href: l.href, icon: (l.icon ?? 'Star') as IconName }))),
  }),
})

const featureCard = z.object({ title: text(60), text: text(160), icon: icon('Star'), style: z.enum(['white', 'green', 'gold', 'grey']).default('white') })

export const AboutPreview = defineBlock({
  type: 'AboutPreview',
  label: 'About the school (text and four cards)',
  category: 'home',
  schema: z.object({
    eyebrow: text(60, 'Our Heritage'),
    title: text(120, 'About Our School'),
    body: longText(
      1500,
      `${schoolInfo.tagline}. We are committed to providing quality education that nurtures the holistic development of each student - intellectual, spiritual, physical, and social.\n\nOur school is run by the Sisters of Charity of Jesus and Mary, who have been serving in the field of education since 1901. We strive to instill strong moral values and academic excellence in our students.`,
    ),
    chips: list(z.object({ label: text(40) }), 6, ['CISCE Affiliated', 'Expert Faculty', 'Holistic Education'].map((label) => ({ label }))),
    button: button('Know More About Us', '/about'),
    cards: list(featureCard, 4, [
      { title: 'Expert Faculty', text: 'Experienced educators molding young minds', icon: 'Users', style: 'white' },
      { title: 'CISCE Curriculum', text: 'Rigorous academic framework from Nursery to Class 12', icon: 'BookOpen', style: 'green' },
      { title: 'Excellence', text: 'Consistent 100% board pass rate', icon: 'Trophy', style: 'gold' },
      { title: '10K+ Alumni', text: 'Global network making us proud worldwide', icon: 'GraduationCap', style: 'grey' },
    ]),
  }),
})

export const QuoteFeature = defineBlock({
  type: 'QuoteFeature',
  label: 'Quote with photo (principal’s message)',
  category: 'home',
  schema: z.object({
    heading: heading('Leadership', "Principal's Message"),
    quote: text(600, 'Sacred Heart school is a great place to teach and learn. Our teachers are committed to a high-quality learning experience focused on the individual needs of each child.'),
    name: text(80, schoolInfo.principal),
    role: text(120, `Principal, ${schoolInfo.fullName}`),
    photo: image({ src: '/images/principal.webp', alt: `${schoolInfo.principal}, Principal` }),
  }),
})

export const FeatureGrid = defineBlock({
  type: 'FeatureGrid',
  label: 'Feature cards (icons, four across)',
  category: 'cards',
  schema: z.object({
    heading: heading('Campus Life', 'Our Facilities', 'We provide modern infrastructure and amenities to support comprehensive student development'),
    items: list(z.object({ title: text(60), text: text(200), icon: icon('BookOpen') }), 16, facilities.map((f) => ({ title: f.name, text: f.description, icon: (f.icon ?? 'BookOpen') as IconName }))),
  }),
})

export const LeaderCards = defineBlock({
  type: 'LeaderCards',
  label: 'Student leaders (dark cards)',
  category: 'home',
  schema: z.object({
    eyebrow: text(60, 'Student Council'),
    title: text(120, 'Student Leaders'),
    subtitle: text(120, studentLeaders[0]?.year ? `Academic Year ${studentLeaders[0].year}` : ''),
    cardLink: href('/about/office-bearers/messages'),
    leaders: list(z.object({ name: text(60), role: text(40), initials: text(4), message: text(400) }), 6, studentLeaders.map((l) => ({ name: l.name, role: l.role, initials: l.initials ?? '', message: l.message ?? '' }))),
    more: button('Read Their Full Messages', '/about/office-bearers/messages'),
  }),
})

export const AchievementCards = defineBlock({
  type: 'AchievementCards',
  label: 'Achievement cards (year, title, text)',
  category: 'cards',
  schema: z.object({
    heading: heading('Hall of Fame', 'Our Achievements', 'Proud moments and milestones that define our journey of excellence'),
    items: list(z.object({ year: text(12), title: text(80), text: text(300) }), 12, achievements.map((a) => ({ year: String(a.year), title: a.title, text: a.description }))),
    more: button('View All Achievements', '/achievements'),
  }),
})

export const NoticesList = defineBlock({
  type: 'NoticesList',
  label: 'Notices list',
  category: 'cards',
  schema: z.object({
    eyebrow: text(40, 'Updates'),
    title: text(120, 'Notifications'),
    items: list(
      z.object({ date: text(20), title: text(120), text: text(400), important: bool(false), attachment: href() }),
      12,
      notifications.map((n) => ({ date: n.date, title: n.title, text: n.description, important: n.important, attachment: n.attachment ?? '' })),
    ),
    more: button('View All Notifications', '/notifications'),
    /** page: the notices on the Notifications page; own: the list above */
    source: choice(['page', 'own'] as const, 'page'),
  }),
})

export const HighlightStory = defineBlock({
  type: 'HighlightStory',
  label: 'Highlight story (dark green)',
  category: 'home',
  schema: z.object({
    badge: text(40, 'Our Achiever'),
    badgeIcon: icon('Rocket'),
    title: text(120, 'Chandrayaan-3 Mission'),
    lead: longText(
      800,
      '==Rajat Awasthi== who passed out from Sacred Heart Senior Secondary School, Sidhpur in the year **2004**, made the institution and every Indian proud by being part of the successful mission of **Chandrayaan-3**.',
    ),
    body: longText(800, 'With great pride and enthusiasm he was welcomed to his alma mater. He inspired the young minds with his motivational speech to strive hard and reach the pinnacle of success.'),
  }),
})

export const CtaBand = defineBlock({
  type: 'CtaBand',
  label: 'Call to action (large green band)',
  category: 'actions',
  schema: z.object({
    eyebrow: text(40, 'Admissions'),
    title: text(120, 'Join Our School Family'),
    text: text(400, 'Give your child the gift of quality education and strong values. Shape their future with our holistic approach to learning.'),
    primary: button('Apply for Admission', '/admission'),
    secondary: button('Contact Us', '/contact'),
    overlapPrevious: bool(true),
  }),
})

export const homeBlocks = [HomeHero, QuickActionsBar, StatsRow, QuickLinksGrid, AboutPreview, QuoteFeature, FeatureGrid, LeaderCards, AchievementCards, NoticesList, HighlightStory, CtaBand]
