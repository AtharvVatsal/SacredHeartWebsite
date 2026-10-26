import { page } from '../builders'

export const academicsLandingPage = page('/academics', 'Academics', [
  [
    'PageHero',
    {
      style: 'landing',
      badge: 'Curriculum',
      badgeIcon: 'GraduationCap',
      title: 'Academics',
      subtitle: 'Excellence in education with a comprehensive curriculum',
      motif: 'GraduationCap',
      motifSmall: 'BookOpen',
    },
  ],
  ['ClassLevels'],
  ['StreamTiles'],
  ['SubjectOverview'],
  ['ResourceLinks'],
  ['ActivitiesBand'],
])

export const admissionLandingPage = page('/admission', 'Admission', [
  [
    'PageHero',
    {
      style: 'landing',
      badge: 'Admissions',
      badgeIcon: 'GraduationCap',
      title: 'Admission',
      subtitle: 'Join our school family for a bright future',
      motif: 'GraduationCap',
      motifSmall: 'Sparkles',
    },
  ],
  ['ProcessSteps'],
  ['ChecklistCard'],
  ['NumberedRules'],
  ['GradientLinkCards'],
  ['DatesNotice'],
  ['ApplyBand'],
])
