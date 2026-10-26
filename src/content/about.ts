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

export const milestones: { year: string; title: string; subtitle: string; content: string; icon: string }[] = [
  { year: '1803', title: 'Foundation', subtitle: 'Sisters of Charity Established', content: 'The congregation of the Sisters of Charity of Jesus and Mary was founded by Fr. Peter Joseph Triest in Belgium.', icon: '🏛️' },
  { year: '1901', title: 'Arrival in India', subtitle: 'Beginning the Indian Journey', content: 'The congregation established its presence in India, starting in Dalhousie; Dalhousie and Amritsar became well-established hubs for its educational work.', icon: '🇮🇳' },
  { year: '1966', title: 'New Beginnings', subtitle: 'Five Pioneering Sisters', content: 'On August 26, 1966, five pioneering sisters led by Sr. Corneliana Heemskeek arrived at Yol Camp to organize the school.', icon: '⛺' },
  { year: '1967', title: 'Sacred Heart Garrison School', subtitle: 'Name & Growth', content: "By January 1967, the school was officially renamed Sacred Heart Garrison School. It expanded to 300 students following the arrival of the army's 4th Mountain Division.", icon: '🏫' },
  { year: '1968', title: 'A Vision for Growth', subtitle: 'Land Acquisition & New Leadership', content: 'A picturesque 16.52-acre plot was acquired along the main road in Sidhpur. Mother Philip Murphy arrived as the new superior.', icon: '🔭' },
  { year: '1969', title: 'The Move to Sidhpur', subtitle: 'Building Dreams', content: 'Under the guidance of Sardar Dharam Singh, the new school and convent were constructed. Classes officially began at the Sidhpur campus.', icon: '🏗️' },
  { year: '1970', title: 'Formal Inauguration', subtitle: 'A Historic Moment', content: 'Dr. Y.S. Parmar, Chief Minister of Himachal Pradesh, formally inaugurated Sacred Heart High School, Sidhpur.', icon: '🎉' },
]

export const missionText =
  'To foster a society founded on love, justice, and peace. We are deeply committed to the educational apostolate, dedicating ourselves to helping every individual discover their inherent dignity and potential as human beings and children of God.'

export const historyStory = [
  'Sacred Heart Senior Secondary School in Sidhpur is proudly owned and operated by the congregation of the Sisters of Charity of Jesus and Mary. Founded in Belgium in 1803 by Fr. Peter Joseph Triest, the congregation expanded to India in 1901, establishing its early roots in Dalhousie.',
  "The story of our modern campus began in the aftermath of the 1965 Indo-Pak war. Military officials reached out to the provincial superior in Amritsar, requesting the Sisters to take over the Garrison school at Yol Camp. Given the congregation's established educational presence in the region, they accepted the mission. On August 26, 1966, five pioneering sisters, led by Sr. Corneliana Heemskeek, arrived at Yol Camp. By January 1967, the primary school—then operating out of six military bungalows with 150 students—was officially renamed Sacred Heart Garrison School.",
  "As the student body rapidly expanded to 300 following the arrival of the army's 4th Mountain Division, the need for a larger, permanent home became critical. With the help of Fr. Dominic Perumpanani, a picturesque 16.52-acre plot of land was acquired along the main road in Sidhpur. Under the leadership of Mother Philip Murphy and the architectural guidance of Sardar Dharam Singh, the new school and convent were constructed.",
  'In March 1970, the late Dr. Y.S. Parmar, then Chief Minister of Himachal Pradesh, formally inaugurated Sacred Heart High School, Sidhpur. From that momentous day onward, the school has grown by leaps and bounds.',
].join('\n\n')

export const excellenceStory = [
  'Ever since its inception, Sacred Heart has maintained an unwavering commitment to high educational standards. Over the decades, the school has carved a distinct niche for itself, shaping the lives, character, and futures of countless students who have passed through its gates.',
  'As the years rolled on, the institution grew in strength and expanded physically to meet the needs of modern education. A major milestone in this journey was the inauguration of our spectacular auditorium in 2012.',
  'Today, Sacred Heart continues to excel in every facet of student development—fostering outstanding achievements in academics, sports, and co-curricular activities alike.',
].join('\n\n')

export const historyStats: { icon: IconName; value: string; label: string; look: 'light' | 'gold' }[] = [
  { icon: 'Calendar', value: '1969', label: 'School Established', look: 'light' },
  { icon: 'Users', value: '56+', label: 'Years of Excellence', look: 'gold' },
  { icon: 'GraduationCap', value: '10K+', label: 'Alumni', look: 'light' },
]
