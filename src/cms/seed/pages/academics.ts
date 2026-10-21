import { page } from '../builders'

export const leavePage = page('/academics/leave-absence', 'Leave & Absence', [
  [
    'PageHero',
    {
      back: { label: 'Back to Academics', href: '/academics' },
      badge: 'School Policies',
      badgeIcon: 'FileText',
      title: 'Leave & Absence',
      subtitle: 'Guidelines for leave and attendance policies',
      motif: 'ClipboardCheck',
      motifSmall: 'CalendarX',
      design: { titleSize: 'large', bottomSpace: 'small', glows: 'two', backStyle: 'animated', stacked: false, titleGap: 'normal', sparkles: true, badgeBorder: 'soft', narrow: false },
    },
  ],
  ['NoticeStrip'],
  ['GuidelineCard'],
  ['CallBand'],
])

export const syllabusPage = page('/academics/syllabus-homework', 'Syllabus & Homework', [
  [
    'PageHero',
    {
      style: 'syllabus',
      back: { label: 'Back to Academics', href: '/academics' },
      badge: 'Academics',
      badgeIcon: 'Sparkles',
      title: 'Syllabus &',
      highlight: 'Homework',
      subtitle: 'Curriculum details and study guidelines',
      motif: 'BookOpen',
      motifSmall: 'PenLine',
    },
  ],
  ['CurriculumCard'],
  ['SubjectGroups'],
  ['StreamCards'],
  ['HomeworkCard'],
  ['TipsGrid'],
  ['JoinCta'],
])
