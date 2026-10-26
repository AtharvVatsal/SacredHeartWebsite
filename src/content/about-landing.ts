// Content of the About Us landing page, as used by the CMS migration.
// The original page (legacy-page.tsx) keeps its own copy of the same text.
import type { GradientName } from '@/cms/blocks/shared/gradients'
import type { IconName } from '@/cms/blocks/shared/icon-names'
import { principalMessage, staffMembers } from '@/data/school'

export const aboutStats: { icon: IconName; value: string; label: string; color: GradientName; count: 'none' | 'staff' }[] = [
  { icon: 'GraduationCap', value: '1969', label: 'Established', color: 'from-emerald-500 to-teal-600', count: 'none' },
  { icon: 'Users', value: String(staffMembers.length), label: 'Staff Members', color: 'from-blue-500 to-indigo-600', count: 'staff' },
  { icon: 'Heart', value: 'CISCE', label: 'Affiliation', color: 'from-rose-500 to-pink-600', count: 'none' },
  { icon: 'Star', value: '56+', label: 'Years of Excellence', color: 'from-amber-500 to-orange-600', count: 'none' },
]

export const aboutNav: { href: string; label: string; icon: IconName; color: GradientName }[] = [
  { href: '/about/history', label: 'History', icon: 'History', color: 'from-amber-500 to-orange-600' },
  { href: '/about/aims', label: 'Our Aims', icon: 'Target', color: 'from-emerald-500 to-teal-600' },
  { href: '/about/principal', label: "Principal's Message", icon: 'Users', color: 'from-blue-500 to-indigo-600' },
  { href: '/about/staff', label: 'Staff', icon: 'BookOpen', color: 'from-purple-500 to-pink-600' },
  { href: '/about/office-bearers', label: 'Office Bearers', icon: 'Award', color: 'from-rose-500 to-red-600' },
  { href: '/about/pass-out-batches', label: 'Pass Out Batches', icon: 'GraduationCap', color: 'from-cyan-500 to-blue-600' },
]

export const whoWeAre = [
  'The school aims at the holistic growth of every student, nurturing a positive and healthy physical, emotional and intellectual attitude. We build an awareness of social responsibility and an appreciation of Indian art, culture, music, theatre, dance and yoga, alongside computer literacy and an understanding of physical fitness. Together, these form the core of a well-balanced personality.',
  'Our objective is to equip students mentally, morally, physically and culturally to become worthy global citizens, who guard the noble traditions they inherit while making progress in a modern, scientific way. We develop initiative and leadership in students who are disciplined and educated in mind and spirit, ready to serve their country, to lead others and to fulfil their own dreams and aspirations.',
].join('\n\n')

export const growthAreas: { label: string; icon: IconName }[] = [
  { label: 'Indian art & culture', icon: 'Palette' },
  { label: 'Music, theatre & dance', icon: 'Music' },
  { label: 'Yoga', icon: 'Flower2' },
  { label: 'Computer literacy', icon: 'Monitor' },
  { label: 'Physical fitness', icon: 'Dumbbell' },
  { label: 'Leadership', icon: 'Compass' },
]

export const journey: { year: string; title: string; text: string; shortText: string }[] = [
  { year: '1803', title: 'The Foundation', text: 'Sisters of Charity founded by Fr. Peter Joseph Triest in Belgium', shortText: 'Sisters of Charity founded in Belgium' },
  { year: '1901', title: 'Arrival in India', text: 'Established in Dalhousie as educational hub', shortText: 'Established in Dalhousie' },
  { year: '1966', title: 'New Beginnings', text: 'Five sisters arrived at Yol camp', shortText: 'Five sisters arrived at Yol camp' },
  { year: '1967', title: 'Sacred Heart', text: 'School renamed, grew to 300 students', shortText: 'School renamed, grew to 300 students' },
  { year: '1969', title: 'Move to Sidhpur', text: 'New campus completed, 16.52 acres', shortText: 'New campus completed' },
  { year: '1970', title: 'Inauguration', text: 'Dr. Y.S. Parmar inaugurated school', shortText: 'Dr. Y.S. Parmar inaugurated' },
]

/** The opening of the principal's message, as the About Us page shows it */
export const principalExcerpt = `${principalMessage.split('.')[0]}...`
