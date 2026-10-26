import { registrationHelpCards, registrationSteps } from '@/content/online-services'
import { page } from '../builders'

export const onlineFeePage = page('/admission/online-fee', 'Pay Fee Online', [
  [
    'PageHero',
    {
      style: 'onlineService',
      back: { label: 'Back to Fee Structure', href: '/admission/fee-structure' },
      badge: 'Financials',
      badgeIcon: 'Sparkles',
      title: 'Pay Fee Online',
      subtitle: 'Pay the school fee safely in three steps',
      motif: 'Wallet',
      motifSmall: 'CreditCard',
      buttons: [
        { label: 'Pay fee online', link: 'feePortal', href: '', look: 'gold' },
        { label: 'See the fee structure', link: 'custom', href: '/admission/fee-structure', look: 'glass' },
      ],
    },
  ],
  ['InfoTiles'],
  ['StepsGuide'],
  ['HelpCards'],
  ['AppHelpBand'],
])

export const onlineRegistrationPage = page('/admission/online-registration', 'Online Registration', [
  [
    'PageHero',
    {
      style: 'onlineService',
      back: { label: 'Back to Admission', href: '/admission' },
      badge: 'Admissions',
      badgeIcon: 'Sparkles',
      title: 'Online Registration',
      subtitle: "Register for admission on the school's portal, step by step",
      motif: 'UserPlus',
      motifSmall: 'ClipboardList',
      buttons: [
        { label: 'Open registration portal', link: 'registrationPortal', href: '', look: 'gold' },
        { label: 'Read the steps first', link: 'custom', href: '#steps', look: 'glass' },
      ],
    },
  ],
  [
    'StepsGuide',
    {
      anchor: 'steps',
      background: 'mint',
      eyebrow: 'Registration Guide',
      title: 'Ten Steps to Register',
      intro: 'Follow these steps to complete the online registration and the registration fee payment.',
      label: 'Online registration steps',
      steps: registrationSteps,
    },
  ],
  ['HelpCards', { background: 'white', cards: registrationHelpCards, tableTitle: '' }],
  ['PortalCta'],
])
