// Content of the About pages, as used by the CMS migration.
// The original pages (legacy-page.tsx) keep their own copy of the same text.
import type { GradientName } from '@/cms/blocks/shared/gradients'
import type { IconName } from '@/cms/blocks/shared/icon-names'
import { schoolInfo, statistics } from '@/data/school'
import { formatStat } from '@/lib/stats'

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

export const principalMessage: { icon: IconName; text: string }[] = [
  {
    icon: 'BookOpen',
    text: 'Welcome to the Sacred Heart school website. The purpose of this website is to provide parents, students, and our school community with easy access to a wealth of information on our school programs, policies and activities.',
  },
  {
    icon: 'Users',
    text: 'Sacred Heart school is a great place to teach and learn. Our teachers are committed to a high-quality learning experience focused on the individual needs of each child. We are striving to be creative and innovative in our instruction to engage students in their learning through a variety of activities, applications of technology and 21st century skills.',
  },
]

// The principal's message in full, worded as the school published it
export const deskThemes: { title: string; text: string }[] = [
  { title: 'Holistic Education', text: "Education aims at a holistic and integral development of a student/person. It is a collective responsibility based on a deep and healthy relationship between teachers, students, parents and among students themselves. We strive to connect this deep relationship with the Creator, God Almighty, to help us achieve our dreams and goals. Such relationships build strength in the heart and at the core of one's being." },
  { title: 'Spiritual & Moral Values', text: 'Contemporary youth experience increasing pressure from the value systems developing in society. Therefore, they need to imbibe spiritual and moral values to withstand confusion and the erosion of sound values and to become genuine human beings.' },
  { title: 'Creative & Innovative Learning', text: 'Creative and innovative education is very important. The essence of creative teaching is openness, flexibility and respect for the uniqueness of every human being. The school provides a healthy, vibrant and holistic education that aims at excellence in every sphere of human endeavour.' },
  { title: 'Every Child is Unique', text: 'Every child is unique and a masterpiece. Each one is taken care of and given a conducive ambience for their learning and developing.' },
  { title: 'Education Without Fear', text: 'The goal of education must be freedom from fear. The only sufficient basis for fearlessness is knowledge of the self. The foundation of education is this self-knowledge and awareness.' },
  { title: 'Creating a Better World', text: 'Man alone has been bestowed with capacities with which he can make this world a better place to live in. Every person has a responsibility to ask: “What can I do to this world that did not exist when I was born?” Every human life has the power to lift not only itself, but also the collective consciousness of humanity.' },
  { title: 'Discover Your Potential', text: 'The tragedy of life is not ultimate death, but the resources and potential that die within a person while he or she is still alive. We must use the resources with which we have been bestowed, or we may lose them. Let us think positively, because positive thought patterns create positive vibes in life.' },
  { title: 'The Power of Right Thoughts', text: 'Anything is possible only with the right thoughts in mind. As parents and teachers, it is our commitment to channelize the talents and energy of our students into creative community building.' },
  { title: 'Together Towards Greater Heights', text: 'With this noble sense of purpose, I request all staff, parents and well-wishers to join hands with us as we take Sacred Heart School to greater heights. Together, let us nurture talent, strengthen character and build a better and more compassionate community.' },
  { title: 'Our Students', text: 'I am very proud of my students. They are intelligent, resilient, creative, imaginative, disciplined and dedicated to lifelong learning. They are respectful and ethical, and they are the future leaders and role models of society.' },
]

export const deskClosing =
  'As parents and teachers, it is our commitment to adopt ways and means to channelize the talents and energy of our students into creative community building. With this noble sense of purpose, may I request all staff, parents and well-wishers to join hands as we take Sacred Heart to greater heights.'

const statValue = (label: string) => {
  const s = statistics.find((x) => x.label === label)
  return s ? formatStat(s) : ''
}

export const principalHighlights: { icon: IconName; label: string; value: string }[] = [
  { icon: 'GraduationCap', label: 'CISCE Affiliated', value: `Since ${schoolInfo.established}` },
  { icon: 'Users', label: 'Students Strength', value: statValue('Students Strength') },
  { icon: 'Award', label: 'Staff Strength', value: statValue('Staff Strength') },
  { icon: 'Star', label: 'Glorious Years', value: statValue('Glorious Years') },
]
