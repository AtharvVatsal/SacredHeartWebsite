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
