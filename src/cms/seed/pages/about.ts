import { excellenceStory } from '@/content/about'
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
