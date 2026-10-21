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

export const feePage = page('/admission/fee-structure', 'School Fee', [
  [
    'PageHero',
    {
      style: 'financial',
      back: { label: 'Back to Admission', href: '/admission' },
      badge: 'Financials',
      badgeIcon: 'Sparkles',
      title: 'School Fee',
      subtitle: 'Fee structure and payment information',
      motif: 'Wallet',
      motifSmall: 'Receipt',
    },
  ],
  ['FeeTable'],
  ['FeeGuidelines'],
  ['WarningCard'],
  [
    'JoinCta',
    {
      icon: 'Banknote',
      title: 'Need More Information?',
      text: 'For the fees of Classes IX, X and XII, or any question about your dues, please contact the school office.',
      button: { label: 'Contact School', href: '/contact' },
      buttonIcon: 'Building',
      width: 'wide',
      spacing: 'compact',
    },
  ],
])
