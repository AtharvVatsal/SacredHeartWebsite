import { excellenceStory } from '@/content/about'
import { schoolInfo } from '@/data/school'
import { page } from '../builders'

export const aimsPage = page('/about/aims', 'Our Aims', [
  [
    'PageHero',
    {
      style: 'aims',
      back: { label: 'Back to About', href: '/about' },
      badge: 'Vision & Mission',
      badgeIcon: 'Sparkles',
      title: 'Our Aims',
      subtitle: 'Building future leaders with strong values and vision',
      motif: 'Target',
      motifSmall: 'Compass',
    },
  ],
  ['VisionTabs'],
  ['AimsGrid'],
  ['ValuesGrid'],
  ['DualCta'],
])

export const historyPage = page('/about/history', 'Our History', [
  [
    'PageHero',
    {
      style: 'history',
      back: { label: 'Back to About', href: '/about' },
      badge: 'Our Journey',
      badgeIcon: 'Sparkles',
      title: 'Our History',
      subtitle: 'A legacy of excellence since 1969',
      motif: 'History',
      motifSmall: 'Landmark',
    },
  ],
  ['MilestoneTimeline'],
  ['MissionPanel'],
  ['StoryCard'],
  ['StoryCard', { look: 'dark', pill: 'Our Legacy', pillIcon: 'Award', pillTone: 'gold', title: 'A Standard of Excellence', body: excellenceStory }],
  ['StatTiles'],
  [
    'DualCta',
    {
      title: 'Explore More About Us',
      text: 'Discover our achievements, meet our dedicated staff, and learn about the values that guide our school.',
      primary: { label: 'Back to About', href: '/about' },
      secondary: { label: 'Apply for Admission', href: '/admission' },
      arrows: false,
    },
  ],
])

export const principalPage = page('/about/principal', "Principal's Message", [
  [
    'PageHero',
    {
      style: 'principal',
      back: { label: 'Back to About', href: '/about' },
      badge: 'Leadership Message',
      badgeIcon: 'Sparkles',
      title: "Principal's Message",
      subtitle: 'Words of wisdom from our visionary leader',
      motif: 'Quote',
      motifSmall: 'BookOpen',
    },
  ],
  ['LeaderProfile'],
  ['NumberedThemes'],
  ['HighlightBand'],
  [
    'DualCta',
    {
      title: 'Experience Our Leadership',
      text: `Under ${schoolInfo.principal}'s guidance, Sacred Heart continues to nurture young minds with values and excellence.`,
      primary: { label: 'Back to About', href: '/about' },
      secondary: { label: 'Apply for Admission', href: '/admission' },
    },
  ],
])

export const messagesPage = page('/about/office-bearers/messages', 'Head Boy & Head Girl', [
  [
    'PageHero',
    {
      style: 'messages',
      back: { label: 'Back to Office Bearers', href: '/about/office-bearers' },
      badge: 'Student Leadership',
      badgeIcon: 'Sparkles',
      title: 'Head Boy & Head Girl',
      subtitle: 'Messages from our student leaders',
      motif: 'MessageSquareQuote',
      motifSmall: 'Heart',
    },
  ],
  ['LeaderMessages'],
])

export const officeBearersPage = page('/about/office-bearers', 'Office Bearers', [
  [
    'PageHero',
    {
      style: 'officeBearers',
      back: { label: 'Back to About', href: '/about' },
      badge: 'Student Leadership',
      badgeIcon: 'Sparkles',
      title: 'Office Bearers',
      subtitle: 'Student leaders of Sacred Heart Senior Secondary School',
      motif: 'Crown',
      motifSmall: 'Users',
    },
  ],
  ['OfficeBearersList'],
])
