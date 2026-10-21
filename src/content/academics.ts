// Content of the Academics pages, as used by the CMS migration.
// The original pages (legacy-page.tsx) keep their own copy of the same text.
import type { GradientName } from '@/cms/blocks/shared/gradients'
import type { IconName } from '@/cms/blocks/shared/icon-names'

export const leaveGuidelines: { icon: IconName; title: string; text: string }[] = [
  { title: 'Regular Attendance', text: 'The school does not appreciate frequent requests for grant of leave as regular attendance is very important for the progress of the students.', icon: 'Calendar' },
  { title: 'Exam Period Leave', text: 'School is not responsible for any leave after the announcement of examination dates.', icon: 'AlertCircle' },
  { title: 'Short Leave (1-2 days)', text: 'Leave of absence for 1-2 days may be requested through the pages of the school diary.', icon: 'FileText' },
  { title: 'Extended Leave (3+ days)', text: 'For leave of absence for more than 2 days, a written application is required. In such cases the reason must be clearly stated.', icon: 'FileText' },
  { title: 'Medical Leave', text: 'Medical leave must be followed by a Medical Certificate.', icon: 'Shield' },
  { title: 'Attendance Record', text: 'Every absence (sick leave or otherwise) must be entered briefly in the NON ATTENDANCE and leave record page and be signed by the parent or guardian.', icon: 'CheckCircle' },
  { title: 'No Half-Day Leave', text: 'School will not grant half day leave to the students.', icon: 'Clock' },
  { title: 'Term Opening & Closing', text: 'Presence of the Student on the opening and closing days of each term is compulsory. In case of illness the school authorities must be notified in time and a medical certificate be produced.', icon: 'Calendar' },
]

export const curriculumText =
  'All the courses are designed to lead to the **Indian School Certificate of Secondary Education Examination** conducted by the Council for the Indian School Certificate Examination, New Delhi, which will be held at the conclusion of Class X and XII.\n\nA place of learning that transcends educational boundaries to ethics and life experiences; the school upholds its standards as one of the best.'

export const subjectGroups: { category: string; icon: IconName; color: GradientName; items: { text: string }[] }[] = [
  { category: 'Core Subjects', items: ['English', 'Hindi', 'Mathematics', 'Social Studies', 'Sanskrit'].map((text) => ({ text })), color: 'from-blue-500 to-indigo-600', icon: 'BookOpen' },
  { category: 'Science', items: ['Physics', 'Chemistry', 'Biology', 'General Science'].map((text) => ({ text })), color: 'from-emerald-500 to-green-600', icon: 'Star' },
  { category: 'Computer & Other', items: ['Computer Science', 'Environmental Education', 'SUPW'].map((text) => ({ text })), color: 'from-purple-500 to-violet-600', icon: 'Brain' },
]

export const streams: { name: string; description: string; color: GradientName; subjects: { text: string }[] }[] = [
  { name: 'Medical', subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Hindi'].map((text) => ({ text })), color: 'from-green-400 to-emerald-600', description: 'For students aspiring to pursue medicine and healthcare careers' },
  { name: 'Non-Medical', subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Hindi'].map((text) => ({ text })), color: 'from-blue-400 to-indigo-600', description: 'For students interested in engineering and technology' },
  { name: 'Commerce', subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Hindi'].map((text) => ({ text })), color: 'from-amber-400 to-orange-500', description: 'For students aiming for business and finance careers' },
]

export const studyTips: { icon: IconName; title: string; text: string; color: GradientName }[] = [
  { icon: 'Pen', title: 'Start with Difficult Subjects', text: 'Take up first the subject you dislike the most. Once you have done that, the rest of your work will be easy.', color: 'from-red-400 to-rose-500' },
  { icon: 'Brain', title: 'Ask Questions', text: 'Do not hesitate to ask your teacher or companions lessons you do not grasp clearly. Never leave difficulties unanswered.', color: 'from-purple-400 to-violet-500' },
  { icon: 'Lightbulb', title: 'Take Breaks', text: 'Do not continue when you are tired. Take pleasant interruptions to refresh your mind.', color: 'from-amber-400 to-orange-500' },
  { icon: 'Award', title: 'Exercise & Yoga', text: 'Get enough exercise and yoga every day, it keeps the mind fresh and focused.', color: 'from-emerald-400 to-green-500' },
  { icon: 'Clock', title: 'Practice Meditation', text: 'Practice meditation to improve focus, concentration and mental clarity.', color: 'from-blue-400 to-indigo-500' },
  { icon: 'Heart', title: 'Pray for Guidance', text: 'Pray often to God to help you make progress in your studies and life.', color: 'from-pink-400 to-rose-500' },
  { icon: 'Repeat', title: 'Learn Overnight, Revise at Dawn', text: 'If memory work is assigned, learn it overnight and repeat it in the morning.', color: 'from-cyan-400 to-sky-500' },
  { icon: 'NotebookPen', title: 'Use Your Diary', text: 'Always note down in your diary the work that is assigned for the next day.', color: 'from-lime-400 to-green-500' },
  { icon: 'CalendarCheck', title: 'Make a Timetable', text: 'As you grow up, make a daily timetable for study, rest and recreation. Regular habits are a most valuable asset in later life.', color: 'from-fuchsia-400 to-purple-500' },
]
