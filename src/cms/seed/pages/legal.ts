import { privacySections } from '@/content/privacy'
import { termsSections } from '@/content/terms'
import { routes } from '@/lib/seo'
import { page } from '../builders'

// Hero settings that reproduce the legal pages' banner (compact title, plain back link, stronger badge outline)
const legalHero = { back: { label: 'Back to Home', href: '/' }, badge: 'Legal', design: { titleSize: 'medium', bottomSpace: 'small', glows: 'two', backStyle: 'plain', stacked: false, titleGap: 'tight', sparkles: true, badgeBorder: 'strong' } }

export const privacyPage = page('/privacy', 'Privacy Policy', [
  ['PageHero', { ...legalHero, badgeIcon: 'Shield', title: 'Privacy Policy', subtitle: 'How we collect, use, and protect your information', motif: 'ShieldCheck', motifSmall: 'Lock' }],
  ['PolicyIntro', {}],
  ['PolicySections', { sections: privacySections }],
  ['SimpleCta', {}],
])

export const termsPage = page('/terms', 'Terms of Use', [
  ['PageHero', { ...legalHero, badgeIcon: 'Scale', title: 'Terms of Use', subtitle: 'Guidelines for using our website responsibly', motif: 'FileText', motifSmall: 'Scale' }],
  [
    'PolicyIntro',
    {
      icon: 'Scale',
      tone: 'gold',
      label: 'Effective Date',
      value: 'April 2025',
      text: 'Welcome to the website of Sacred Heart Senior Secondary School. These Terms of Use ("Terms") govern your access to and use of this website. By using this website, you agree to comply with and be bound by these Terms. Please read them carefully before using our site.',
    },
  ],
  ['PolicySections', { sections: termsSections }],
  ['SimpleCta', { title: 'Have Questions?', text: "We're here to help. Reach out to us for any questions about these terms or our services." }],
])

export const legalSeo = {
  '/privacy': { description: routes['/privacy'].description },
  '/terms': { description: routes['/terms'].description },
}
