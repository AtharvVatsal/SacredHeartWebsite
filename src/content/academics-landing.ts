// Content of the Academics landing page, as used by the CMS migration.
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
