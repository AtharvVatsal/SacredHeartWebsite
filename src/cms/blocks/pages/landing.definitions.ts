// Sections of the section landing pages (Academics, Admission, About Us)
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, image, list, longText, text } from '../../document/fields'
import { button, icon } from '../common'
import { gradient } from '../shared/gradients'
import { aboutNav, aboutStats, growthAreas, journey, principalExcerpt, whoWeAre } from '@/content/about-landing'
import { schoolAnthem, schoolInfo } from '@/data/school'
import { activities, admissionDocuments, admissionLinks, admissionRules, admissionSteps, classLevels, resourceLinks, streamTiles, subjectOverview } from '@/content/academics-landing'

const lines = (max: number) => list(z.object({ text: text(120) }), max)

export const ClassLevels = defineBlock({
  type: 'ClassLevels',
  label: 'Colourful level cards',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Our Programs'),
    title: text(140, 'Classes We Offer'),
    items: list(z.object({ name: text(80), text: text(300), icon: icon('Star'), color: gradient('from-pink-400 to-rose-500') }), 10, classLevels),
  }),
})

export const StreamTiles = defineBlock({
  type: 'StreamTiles',
  label: 'Tinted stream cards',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Senior Secondary'),
    title: text(140, 'Streams in Class 11-12'),
    streams: list(
      z.object({ name: text(80), subjects: lines(12), icon: icon('BookOpen'), color: gradient('from-cyan-500 to-blue-600'), tint: choice(['blue', 'amber', 'pink'] as const, 'blue') }),
      6,
      streamTiles,
    ),
  }),
})

export const SubjectOverview = defineBlock({
  type: 'SubjectOverview',
  label: 'Subject cards with lists',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Core Subjects'),
    title: text(140, 'Subject Overview'),
    subjects: list(z.object({ category: text(80), items: lines(12), tone: choice(['violet', 'blue', 'emerald', 'amber'] as const, 'violet') }), 8, subjectOverview),
  }),
})

export const ResourceLinks = defineBlock({
  type: 'ResourceLinks',
  label: 'Large link cards',
  category: 'actions',
  schema: z.object({
    eyebrow: text(60, 'Resources'),
    title: text(140, 'Quick Links'),
    links: list(
      z.object({ title: text(80), text: text(200), href: href(''), icon: icon('BookOpen'), tone: choice(['green', 'purple', 'gold'] as const, 'green'), newTab: bool(false) }),
      8,
      resourceLinks,
    ),
  }),
})

export const ActivitiesBand = defineBlock({
  type: 'ActivitiesBand',
  label: 'Activities on a dark background',
  category: 'academics',
  schema: z.object({
    eyebrow: text(60, 'Beyond Classroom'),
    title: text(140, 'Co-Curricular Activities'),
    intro: text(300, 'We offer a wide range of activities to develop talents beyond academics'),
    items: list(z.object({ name: text(60), icon: icon('Star'), tone: choice(['pink', 'purple', 'green', 'blue'] as const, 'pink') }), 12, activities),
  }),
})

export const ProcessSteps = defineBlock({
  type: 'ProcessSteps',
  label: 'Numbered steps (colourful cards)',
  category: 'admission',
  schema: z.object({
    eyebrow: text(60, 'Step by Step'),
    title: text(140, 'Admission Process'),
    intro: text(300, "Follow these simple steps to secure your child's future"),
    steps: list(z.object({ title: text(80), text: text(300), icon: icon('Star'), color: gradient('from-blue-500 to-indigo-600') }), 8, admissionSteps),
    button: button('Register Online', '/admission/online-registration'),
    footText: text(120, 'Have a question first?'),
    footLink: button('Send an admission enquiry', '/admission/register'),
  }),
})

export const ChecklistCard = defineBlock({
  type: 'ChecklistCard',
  label: 'Checklist card',
  category: 'admission',
  schema: z.object({
    icon: icon('FileText'),
    title: text(140, 'Documents Required'),
    subtitle: text(200, 'Attach these to the printed registration form'),
    items: list(z.object({ text: text(200) }), 20, admissionDocuments),
  }),
})

export const NumberedRules = defineBlock({
  type: 'NumberedRules',
  label: 'Numbered rules',
  category: 'admission',
  schema: z.object({
    eyebrow: text(60, 'Please Note'),
    title: text(140, 'Admission Rules'),
    rules: list(z.object({ text: text(800) }), 30, admissionRules),
    note: text(400, 'Rules for students once they join are on the [Rules & Regulations](/admission/rules) page.'),
  }),
})

export const GradientLinkCards = defineBlock({
  type: 'GradientLinkCards',
  label: 'Colourful link cards',
  category: 'actions',
  schema: z.object({
    eyebrow: text(60, 'Resources'),
    title: text(140, 'Quick Links'),
    links: list(z.object({ title: text(80), text: text(200), href: href(''), icon: icon('BookOpen'), color: gradient('from-green-500 to-emerald-600') }), 8, admissionLinks),
    moreLabel: text(40, 'Learn more'),
  }),
})

export const DatesNotice = defineBlock({
  type: 'DatesNotice',
  label: 'Dates notice with call and email buttons',
  category: 'admission',
  schema: z.object({
    eyebrow: text(60, 'Mark Your Calendar'),
    title: text(140, 'Important Dates'),
    heading: text(200, 'Dates for the next admission cycle have not been announced here yet'),
    text: text(1000, 'Registration and document submission dates are announced in the official school notification. Please call or email the school office for them.\n\nAdmission to Class XI takes place in the first week of April.'),
    emailLabel: text(60, 'Email the office'),
  }),
})

export const ApplyBand = defineBlock({
  type: 'ApplyBand',
  label: 'Apply band (green, one button)',
  category: 'actions',
  schema: z.object({
    title: text(140, 'Ready to Begin Your Journey?'),
    text: text(400, "Take the first step towards your child's bright future at Sacred Heart Senior Secondary School"),
    button: button('Apply Now', '/admission/online-registration'),
    size: choice(['normal', 'large'] as const, 'normal'),
  }),
})

export const StatBoxes = defineBlock({
  type: 'StatBoxes',
  label: 'Figures in colourful boxes',
  category: 'about',
  schema: z.object({
    stats: list(
      z.object({ icon: icon('Star'), value: text(20), label: text(60), color: gradient('from-emerald-500 to-teal-600'), count: choice(['none', 'staff'] as const, 'none') }),
      8,
      aboutStats,
    ),
  }),
})

export const ExploreLinks = defineBlock({
  type: 'ExploreLinks',
  label: 'Small link tiles',
  category: 'actions',
  schema: z.object({
    eyebrow: text(60, 'Explore'),
    title: text(140, 'Discover More About Us'),
    items: list(z.object({ label: text(60), href: href(''), icon: icon('Star'), color: gradient('from-amber-500 to-orange-600') }), 12, aboutNav),
  }),
})

export const WhoWeAre = defineBlock({
  type: 'WhoWeAre',
  label: 'Introduction with focus tiles',
  category: 'about',
  schema: z.object({
    eyebrow: text(60, 'Who We Are'),
    title: text(200, "We don't only teach our students. We help them grow."),
    body: longText(4000, whoWeAre),
    areas: list(z.object({ label: text(60), icon: icon('Star') }), 12, growthAreas),
  }),
})

export const JourneyTimeline = defineBlock({
  type: 'JourneyTimeline',
  label: 'Years in a row (short timeline)',
  category: 'about',
  schema: z.object({
    eyebrow: text(60, 'Our Heritage'),
    title: text(140, 'Our Journey Through Time'),
    items: list(z.object({ year: text(12), title: text(80), text: text(200), shortText: text(120) }), 8, journey),
    endLabel: text(60, 'Legacy Continues'),
    button: button('Read Full History', '/about/history'),
  }),
})

export const AnthemCard = defineBlock({
  type: 'AnthemCard',
  label: 'Anthem or poem (verses)',
  category: 'about',
  schema: z.object({
    title: text(120, 'School Anthem'),
    icon: icon('Music'),
    text: longText(4000, schoolAnthem),
  }),
})

export const PrincipalPreview = defineBlock({
  type: 'PrincipalPreview',
  label: "Principal's message preview",
  category: 'about',
  schema: z.object({
    photo: image({ src: '/images/principal.webp', alt: schoolInfo.principal }),
    pill: text(60, 'Leadership'),
    title: text(120, "Principal's Message"),
    /** Empty: the principal's name from Site settings */
    name: text(120, ''),
    excerpt: text(600, principalExcerpt),
    button: button('Read Full Message', '/about/principal'),
  }),
})

export const landingBlocks = [
  ClassLevels,
  StreamTiles,
  SubjectOverview,
  ResourceLinks,
  ActivitiesBand,
  ProcessSteps,
  ChecklistCard,
  NumberedRules,
  GradientLinkCards,
  DatesNotice,
  ApplyBand,
  StatBoxes,
  ExploreLinks,
  WhoWeAre,
  JourneyTimeline,
  AnthemCard,
  PrincipalPreview,
]
