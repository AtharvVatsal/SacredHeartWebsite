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
