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
