// Content of the Academics and Admission landing pages, as used by the CMS migration.
// The original page (legacy-page.tsx) keeps its own copy of the same text.
import type { GradientName } from '@/cms/blocks/shared/gradients'
import type { IconName } from '@/cms/blocks/shared/icon-names'

const lines = (list: string[]) => list.map((text) => ({ text }))

export const classLevels: { name: string; text: string; icon: IconName; color: GradientName }[] = [
  { name: 'Nursery & KG', text: 'Early childhood education with play-based learning', icon: 'Star', color: 'from-pink-400 to-rose-500' },
  { name: 'Classes 1-5', text: 'Primary education building foundational skills', icon: 'BookOpen', color: 'from-blue-400 to-indigo-500' },
  { name: 'Classes 6-8', text: 'Middle school with comprehensive curriculum', icon: 'GraduationCap', color: 'from-purple-400 to-violet-500' },
  { name: 'Classes 9-10', text: 'Secondary education (ICSE Board)', icon: 'Star', color: 'from-amber-400 to-orange-500' },
  { name: 'Classes 11-12', text: 'Senior secondary with stream options', icon: 'Sparkles', color: 'from-green-400 to-emerald-500' },
]

export const streamTiles: { name: string; subjects: { text: string }[]; icon: IconName; color: GradientName; tint: 'blue' | 'amber' | 'pink' }[] = [
  { name: 'Science', subjects: lines(['Physics', 'Chemistry', 'Mathematics', 'Biology']), icon: 'FlaskConical', color: 'from-cyan-500 to-blue-600', tint: 'blue' },
  { name: 'Commerce', subjects: lines(['Accountancy', 'Business Studies', 'Economics', 'Mathematics']), icon: 'Calculator', color: 'from-amber-500 to-orange-600', tint: 'amber' },
  { name: 'Arts/Humanities', subjects: lines(['History', 'Geography', 'Political Science', 'Economics']), icon: 'BookOpen', color: 'from-rose-500 to-pink-600', tint: 'pink' },
]

export const subjectOverview: { category: string; items: { text: string }[]; tone: 'violet' | 'blue' | 'emerald' | 'amber' }[] = [
  { category: 'Languages', items: lines(['English', 'Hindi', 'Sanskrit']), tone: 'violet' },
  { category: 'Science', items: lines(['Physics', 'Chemistry', 'Biology']), tone: 'blue' },
  { category: 'Mathematics', items: lines(['Algebra', 'Geometry', 'Arithmetic']), tone: 'emerald' },
  { category: 'Social Studies', items: lines(['History', 'Geography', 'Civics']), tone: 'amber' },
]

export const resourceLinks: { title: string; text: string; href: string; icon: IconName; tone: 'green' | 'purple' | 'gold'; newTab: boolean }[] = [
  { title: 'Syllabus & Homework', text: 'Curriculum details and study guidelines', href: '/academics/syllabus-homework', icon: 'Clipboard', tone: 'green', newTab: false },
  { title: 'Academic Calendar', text: 'Important dates, holidays & events', href: '/academics/calendar', icon: 'Calendar', tone: 'purple', newTab: false },
  { title: 'CISCE Documents', text: 'Rules for issuing documents', href: '/documents/cisce-rules-for-documents.pdf', icon: 'BookOpen', tone: 'gold', newTab: true },
]

export const activities: { name: string; icon: IconName; tone: 'pink' | 'purple' | 'green' | 'blue' }[] = [
  { name: 'Art & Craft', icon: 'Palette', tone: 'pink' },
  { name: 'Music & Dance', icon: 'Music', tone: 'purple' },
  { name: 'Sports', icon: 'Dumbbell', tone: 'green' },
  { name: 'Reading Club', icon: 'BookOpen', tone: 'blue' },
]

export const admissionSteps: { title: string; text: string; icon: IconName; color: GradientName }[] = [
  { title: 'Register Online', text: 'Create an account and fill in the form on the school portal', icon: 'Globe', color: 'from-blue-500 to-indigo-600' },
  { title: 'Pay Registration Fee', text: 'Pay online and save the receipt', icon: 'CreditCard', color: 'from-purple-500 to-pink-600' },
  { title: 'Print & Attach', text: 'Print the form and attach the documents listed below', icon: 'Clipboard', color: 'from-emerald-500 to-teal-600' },
  { title: 'Submit at School', text: 'Hand everything in at the school office on the announced date', icon: 'Building', color: 'from-amber-500 to-orange-600' },
]

export const admissionDocuments = lines([
  'Birth Certificate (photocopy)',
  'Aadhaar Card (photocopy)',
  'Previous Class Final Report Card',
  'Address Proof (photocopy)',
  'Transfer Certificate from the previous school',
  'Passport Size Photograph',
])

export const admissionRules = lines([
  'Admission to Lower K.G. is given after an interactive session with the parents.',
  'A birth certificate with a registration number from the Municipal Corporation or State Government, stating the date of birth, must be produced at the time of admission.',
  'For other classes, where only vacant seats are filled, the student must be of the corresponding age. Admission stands cancelled if the transfer certificate from the previous school is not produced within a week.',
  'The date of birth and name, once entered in the school record, will not be changed under any circumstances.',
  'Admission to Class XI (+1) takes place in the first week of April.',
])

export const admissionLinks: { title: string; text: string; href: string; icon: IconName; color: GradientName }[] = [
  { title: 'Fee Structure', text: 'View detailed fee breakdown', href: '/admission/fee-structure', icon: 'CreditCard', color: 'from-green-500 to-emerald-600' },
  { title: 'Pay Fee Online', text: 'Step-by-step online payment guide', href: '/admission/online-fee', icon: 'Wallet', color: 'from-sky-500 to-blue-600' },
  { title: 'Uniform', text: 'School uniform details', href: '/admission/uniform', icon: 'UserPlus', color: 'from-violet-500 to-purple-600' },
  { title: 'Rules & Regulations', text: 'School policies and guidelines', href: '/admission/rules', icon: 'BookOpen', color: 'from-rose-500 to-pink-600' },
]
