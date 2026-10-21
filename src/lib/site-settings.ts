// Site-wide settings (school identity, contact details, navigation, header and footer). The CMS stores an
// edited copy in the "site-settings" global; these defaults come from src/data/school.ts and are used whenever
// the CMS has nothing saved or cannot be reached, so the site always renders as it does without the CMS.
import { navigation, onlineServices, quickLinks, schoolInfo, schoolLocation } from '@/data/school'

export interface NavChild {
  text: string
  href: string
  external?: boolean
}

export interface NavItem extends NavChild {
  /** One-line summary shown at the top of the desktop dropdown */
  summary?: string
  children?: NavChild[]
}

export interface SiteSettings {
  identity: {
    name: string
    fullName: string
    tagline: string
    affiliation: string
    established: number
    management: string
    principal: string
    logo: { src: string; alt: string }
  }
  contact: {
    phones: string[]
    emails: string[]
    address: { street: string; tehsil: string; district: string; state: string; pincode: string }
    mapPlusCode: string
  }
  onlineServices: { feePortal: string; registrationPortal: string; alumniRegistration: string; androidApp: string; iosApp: string }
  navigation: NavItem[]
  header: { applyLabel: string; applyHref: string; mobileApplyLabel: string }
  footer: { description: string; quickLinks: { text: string; href: string }[] }
  social: { platform: string; url: string }[]
  announcement: { enabled: boolean; message: string; linkLabel: string; linkHref: string; tone: 'info' | 'important' }
}

const SUMMARIES: Record<string, string> = {
  '/about': `Our story since ${schoolInfo.established}, the people who run the school, and our alumni.`,
  '/academics': 'Syllabus, homework, leave rules and the school calendar.',
  '/admission': 'How to register, fees, uniform and school rules.',
  '/achievements': 'Board exam toppers and achievements beyond the classroom.',
}

export const defaultSiteSettings: SiteSettings = {
  identity: {
    name: schoolInfo.name,
    fullName: schoolInfo.fullName,
    tagline: schoolInfo.tagline,
    affiliation: schoolInfo.affiliation,
    established: schoolInfo.established,
    management: schoolInfo.management,
    principal: schoolInfo.principal,
    logo: { src: '/images/logo_batch.png', alt: 'School Logo' },
  },
  contact: {
    phones: [...schoolInfo.contact.phones],
    emails: [...schoolInfo.contact.emails],
    address: {
      street: schoolInfo.address.street,
      tehsil: schoolInfo.address.tehsil,
      district: schoolInfo.address.district,
      state: schoolInfo.address.state,
      pincode: schoolInfo.address.pincode,
    },
    mapPlusCode: schoolLocation.plusCode,
  },
  onlineServices: { ...onlineServices },
  navigation: navigation.map((item) => ({
    text: item.text,
    href: item.href,
    external: Boolean(item.external),
    summary: SUMMARIES[item.href],
    children: item.children?.map((c) => ({ text: c.text, href: c.href, external: Boolean(c.external) })),
  })),
  header: { applyLabel: 'Apply now', applyHref: '/admission', mobileApplyLabel: 'Apply for admission' },
  footer: {
    description: `${schoolInfo.tagline}. ${schoolInfo.affiliation} affiliated school run by ${schoolInfo.management}.`,
    quickLinks: quickLinks.map((l) => ({ text: l.title, href: l.href })),
  },
  social: [],
  announcement: { enabled: false, message: '', linkLabel: '', linkHref: '', tone: 'info' },
}
