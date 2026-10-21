import { dressCards } from '@/content/uniform'
import { page } from '../builders'

export const rulesPage = page('/admission/rules', 'Rules & Regulations', [
  [
    'PageHero',
    {
      back: { label: 'Back to Admission', href: '/admission' },
      badge: 'Guidelines',
      badgeIcon: 'Shield',
      title: 'Rules & Regulations',
      subtitle: 'Guidelines for students and parents',
      motif: 'ScrollText',
      motifSmall: 'ShieldCheck',
      design: { titleSize: 'medium', bottomSpace: 'small', glows: 'twoLarge', backStyle: 'grey', stacked: false, titleGap: 'tight', sparkles: true, badgeBorder: 'strong' },
    },
  ],
  ['RuleCards'],
])

export const uniformPage = page('/admission/uniform', 'School Uniform', [
  [
    'PageHero',
    {
      style: 'financial',
      back: { label: 'Back to Admission', href: '/admission' },
      badge: 'Dress Code',
      badgeIcon: 'Sparkles',
      title: 'School Uniform',
      subtitle: 'Uniform specifications for all students',
      motif: 'Shirt',
      motifSmall: 'Ruler',
    },
  ],
  ['GoldInfoCard'],
  ...dressCards.map((card): [string, Record<string, unknown>] => ['DressCard', { ...card }]),
])
