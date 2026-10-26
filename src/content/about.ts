// Content of the About pages, as used by the CMS migration.
// The original pages (legacy-page.tsx) keep their own copy of the same text.
import type { GradientName } from '@/cms/blocks/shared/gradients'
import type { IconName } from '@/cms/blocks/shared/icon-names'

export const scjmVision: { title: string; content: string }[] = [
  {
    title: 'Our Foundation',
    content: 'The congregation of the Sisters of Charity of Jesus and Mary, founded by Fr. Peter Joseph Triest in Belgium in 1803, and established in India at Dalhousie in 1901, is missioned to reveal that God is love.',
  },
  {
    title: 'Our Educational Mission',
    content: 'The congregation values the Educational Apostolate of helping individuals to discover their dignity as human persons and children of God. To bring about a society based on love, justice and peace is one of the most important expressions of this mission.',
  },
  {
    title: 'Fostering Growth',
    content: 'The Endeavour of our education apostolate is to foster the personal growth of the individual: Intellectually competent, morally sound, psychologically whole, imbued with the sense of the Divine, respectful of the environment, committed to the cause of justice, love and peace.',
  },
  {
    title: 'Creating Equality',
    content: 'Our educational apostolate aims at creating a human society free from prejudice, superstition and discrimination based on gender, religion, caste and economic status, leading to concern for all, especially the under privileged.',
  },
  {
    title: 'Collaboration',
    content: 'To implement this vision, the congregation expects the collaboration of a supportive management, dedicated staff, concerned parents, and valued assistance of students both past and present, the neighboring community and government authorities.',
  },
]

export type Tint = 'amber' | 'pink' | 'blue' | 'purple' | 'emerald' | 'cyan'

export const aims: { title: string; text: string; icon: IconName; color: GradientName; tint: Tint }[] = [
  { title: 'Intellectual Excellence', text: 'Fostering critical thinking, creativity, and academic achievement to develop lifelong learners', icon: 'Lightbulb', color: 'from-amber-400 to-orange-500', tint: 'amber' },
  { title: 'Moral Integrity', text: 'Building character rooted in strong ethical principles and spiritual values', icon: 'Heart', color: 'from-pink-400 to-rose-500', tint: 'pink' },
  { title: 'Psychological Wellbeing', text: 'Supporting emotional health and nurturing confident, resilient individuals', icon: 'Users', color: 'from-blue-400 to-indigo-500', tint: 'blue' },
  { title: 'Spiritual Development', text: 'Instilling a sense of the Divine through prayer, reflection and service', icon: 'Target', color: 'from-purple-400 to-violet-500', tint: 'purple' },
  { title: 'Environmental Care', text: 'Cultivating respect for nature and sustainable living practices', icon: 'Leaf', color: 'from-emerald-400 to-green-500', tint: 'emerald' },
  { title: 'Social Justice', text: 'Empowering students to champion equality, peace and human dignity', icon: 'Globe', color: 'from-cyan-400 to-teal-500', tint: 'cyan' },
]

export const coreValues: { name: string; icon: IconName; color: GradientName }[] = [
  { name: 'Love & Compassion', icon: 'HandHeart', color: 'from-pink-400 to-rose-500' },
  { name: 'Integrity', icon: 'Star', color: 'from-amber-400 to-orange-500' },
  { name: 'Respect', icon: 'Users', color: 'from-blue-400 to-indigo-500' },
  { name: 'Service', icon: 'Heart', color: 'from-red-400 to-rose-500' },
  { name: 'Excellence', icon: 'GraduationCap', color: 'from-violet-400 to-purple-500' },
  { name: 'Faith', icon: 'Sparkles', color: 'from-yellow-400 to-amber-500' },
  { name: 'Justice', icon: 'Globe', color: 'from-emerald-400 to-teal-500' },
  { name: 'Inclusivity', icon: 'BookOpen', color: 'from-cyan-400 to-blue-500' },
]
