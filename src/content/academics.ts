// Content of the Academics pages, as used by the CMS migration.
// The original pages (legacy-page.tsx) keep their own copy of the same text.
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
