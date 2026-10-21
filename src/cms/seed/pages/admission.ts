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
