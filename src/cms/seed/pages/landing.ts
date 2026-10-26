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

export const aboutLandingPage = page('/about', 'About Us', [
  [
    'PageHero',
    {
      style: 'landing',
      badge: 'Our Story',
      badgeIcon: 'Sparkles',
      title: 'About Us',
      subtitle: 'Discover the legacy and values that define Sacred Heart Senior Secondary School',
      motif: 'Building',
      motifSmall: 'Heart',
    },
  ],
  ['StatBoxes'],
  ['ExploreLinks'],
  ['WhoWeAre'],
  ['JourneyTimeline'],
  ['AnthemCard'],
  ['PrincipalPreview'],
  [
    'ApplyBand',
    {
      title: 'Join Our School Family',
      text: 'Give your child the gift of quality education rooted in values and excellence. Contact the school office to ask about admissions for the coming session.',
      button: { label: 'Apply Now', href: '/admission' },
      size: 'large',
    },
  ],
])
