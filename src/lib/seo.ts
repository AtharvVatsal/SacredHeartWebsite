import type { Metadata } from 'next'
import { schoolInfo } from '@/data/school'

// Canonical address of the site. Every canonical URL, sitemap entry and social card is built from this.
export const SITE_URL = 'https://shsdharamshala.com'

export const SITE_NAME = schoolInfo.name
export const SITE_LOCALE = 'en_IN'

// Shared social-card image (1200x630)
export const OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: `${schoolInfo.fullName}, Sidhpur, Dharamshala` }

export interface RouteSeo {
  title: string
  description: string
  // Short name for breadcrumbs
  label: string
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

// One entry per public page: titles, descriptions, breadcrumb names and sitemap hints all come from here
export const routes: Record<string, RouteSeo> = {
  '/': {
    title: 'Sacred Heart Sr. Sec. School, Sidhpur, Dharamshala',
    description: 'Sacred Heart Senior Secondary School, Sidhpur, Dharamshala: a CISCE school run by the Sisters of Charity of Jesus and Mary. Admissions, fees, results, news.',
    label: 'Home',
    changeFrequency: 'weekly',
    priority: 1,
  },
  '/about': {
    title: 'About Us',
    description: 'Who we are: the history, values, principal, staff and student leaders of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala, Himachal Pradesh.',
    label: 'About Us',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  '/about/history': {
    title: 'Our History',
    description: 'How Sacred Heart grew from the Garrison School at Yol Camp in 1966 to its campus at Sidhpur, Dharamshala, inaugurated in 1970, and the milestones since.',
    label: 'History',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  '/about/aims': {
    title: 'Our Aims',
    description: 'The vision, mission and educational aims of Sacred Heart Senior Secondary School, Sidhpur, rooted in the values of the Sisters of Charity of Jesus and Mary.',
    label: 'Our Aims',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  '/about/principal': {
    title: 'Principal’s Message',
    description: 'A message from Sr. Gracy M.D, Principal of Sacred Heart Senior Secondary School, Sidhpur, on holistic education, values and every child’s potential.',
    label: 'Principal’s Message',
    changeFrequency: 'yearly',
    priority: 0.7,
  },
  '/about/staff': {
    title: 'Our Staff',
    description: 'Meet the teachers and office staff of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala, with their departments and qualifications.',
    label: 'Staff',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  '/about/office-bearers': {
    title: 'Office Bearers',
    description: 'The student council of Sacred Heart Senior Secondary School, Sidhpur: head boy, head girl, games and house captains, prefects and editors, session by session.',
    label: 'Office Bearers',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  '/about/office-bearers/messages': {
    title: 'Head Boy & Head Girl Messages',
    description: 'Messages from the Head Boy and Head Girl of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala, for the current academic year.',
    label: 'Head Boy & Head Girl',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  '/about/pass-out-batches': {
    title: 'Pass Out Batches',
    description: 'Class photographs of every graduating batch of Sacred Heart Senior Secondary School, Sidhpur, from 1972 onwards. Alumni can register with the school here.',
    label: 'Pass Out Batches',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  '/academics': {
    title: 'Academics',
    description: 'Classes, streams and subjects at Sacred Heart Senior Secondary School, Sidhpur: the CISCE curriculum, with Medical, Non-Medical and Commerce in Classes XI–XII.',
    label: 'Academics',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  '/academics/syllabus-homework': {
    title: 'Syllabus & Homework',
    description: 'CISCE course information, subjects, Class XI–XII streams, homework guidelines and study tips for students of Sacred Heart Senior Secondary School, Sidhpur.',
    label: 'Syllabus & Homework',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  '/academics/leave-absence': {
    title: 'Leave & Absence',
    description: 'School rules on leave, absence, medical certificates and attendance at Sacred Heart Senior Secondary School, Sidhpur, Dharamshala.',
    label: 'Leave & Absence',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  '/academics/calendar': {
    title: 'Academic Calendar',
    description: 'School holidays, examinations and events in the academic calendar of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala.',
    label: 'Academic Calendar',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  '/achievements': {
    title: 'Achievements',
    description: 'ICSE and ISC board exam toppers and notable achievements of the students and alumni of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala.',
    label: 'Achievements',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  '/achievements/toppers': {
    title: 'Board Exam Toppers',
    description: 'Class 10 (ICSE) and Class 12 (ISC) board exam toppers of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala, session by session.',
    label: 'Toppers',
    changeFrequency: 'yearly',
    priority: 0.7,
  },
  '/achievements/toppers/10th': {
    title: 'Class 10 (ICSE) Toppers',
    description: 'ICSE Class 10 board exam toppers of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala, with their percentages, session by session.',
    label: 'Class 10',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  '/achievements/toppers/12th': {
    title: 'Class 12 (ISC) Toppers',
    description: 'ISC Class 12 board exam toppers of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala, with their photos and percentages, session by session.',
    label: 'Class 12',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  '/achievements/other': {
    title: 'Other Achievements',
    description: 'Achievements of Sacred Heart students and alumni beyond board exams, including alumnus Rajat Awasthi’s part in the Chandrayaan-3 mission.',
    label: 'Other Achievements',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  '/admission': {
    title: 'Admission',
    description: 'How to apply for admission to Sacred Heart Senior Secondary School, Sidhpur, Dharamshala: online registration, documents required and admission rules.',
    label: 'Admission',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  '/admission/online-registration': {
    title: 'Online Admission Registration',
    description: 'Step-by-step guide to registering for admission on the school’s online portal: account, form, registration fee payment, documents and submission.',
    label: 'Online Registration',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  '/admission/register': {
    title: 'Admission Enquiry',
    description: 'Send an admission enquiry to Sacred Heart Senior Secondary School, Sidhpur, Dharamshala. The school office will guide you through the next steps.',
    label: 'Admission Enquiry',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  '/admission/fee-structure': {
    title: 'Fee Structure 2026–27',
    description: 'Class-wise school fees for 2026–27 at Sacred Heart Senior Secondary School, Sidhpur: LKG to Class VIII and Class XI, quarter by quarter, and how to pay.',
    label: 'Fee Structure',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  '/admission/online-fee': {
    title: 'Pay School Fee Online',
    description: 'How to pay the Sacred Heart school fee online: logging in, choosing the right month group, paying by UPI or card, receipts, failed payments and refunds.',
    label: 'Pay Fee Online',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  '/admission/uniform': {
    title: 'School Uniform',
    description: 'Summer, winter and sports uniform for girls and boys at Sacred Heart Senior Secondary School, Sidhpur, and where to buy it.',
    label: 'Uniform',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  '/admission/rules': {
    title: 'Rules & Regulations',
    description: 'School rules on conduct, assembly, uniform, prohibited items, attendance and discipline at Sacred Heart Senior Secondary School, Sidhpur, Dharamshala.',
    label: 'Rules & Regulations',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  '/gallery': {
    title: 'Photo Gallery',
    description: 'Photo albums and videos from Sacred Heart Senior Secondary School, Sidhpur: annual function, sports, celebrations, exhibitions and campus life.',
    label: 'Gallery',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  '/notifications': {
    title: 'Notifications',
    description: 'Latest notices, circulars and announcements from Sacred Heart Senior Secondary School, Sidhpur, Dharamshala, with the documents to download.',
    label: 'Notifications',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  '/contact': {
    title: 'Contact Us',
    description: 'Address, phone numbers, email, office hours and directions for Sacred Heart Senior Secondary School, P.O. Sidhpur, Dharamshala, Kangra, H.P. 176057.',
    label: 'Contact',
    changeFrequency: 'yearly',
    priority: 0.8,
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How Sacred Heart Senior Secondary School collects, uses and protects personal information shared through this website.',
    label: 'Privacy Policy',
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  '/terms': {
    title: 'Terms of Use',
    description: 'The terms for using the website of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala: acceptable use, academic information, disclaimers and privacy.',
    label: 'Terms of Use',
    changeFrequency: 'yearly',
    priority: 0.2,
  },
}

export const absoluteUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)

// Metadata for one page: title, description, canonical URL and social cards, all from the registry
export function pageMeta(path: keyof typeof routes): Metadata {
  const r = routes[path]
  // Full title set explicitly: a parent layout's plain title would otherwise cancel the root title template
  const ogTitle = path === '/' ? r.title : `${r.title} | ${SITE_NAME}`
  return {
    title: { absolute: ogTitle },
    description: r.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url: path,
      title: ogTitle,
      description: r.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: r.description,
      images: [OG_IMAGE.url],
    },
  }
}

// Breadcrumb trail for a path, built from the registry (missing parents are skipped)
export function breadcrumbTrail(path: string) {
  const parts = path.split('/').filter(Boolean)
  const trail = [{ name: routes['/'].label, path: '/' }]
  parts.forEach((_, i) => {
    const p = '/' + parts.slice(0, i + 1).join('/')
    if (routes[p]) trail.push({ name: routes[p].label, path: p })
  })
  return trail
}
