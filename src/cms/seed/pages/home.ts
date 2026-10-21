import { routes } from '@/lib/seo'
import { page } from '../builders'

// The home page, section by section in the original order. Every section's content is its block's default,
// which is taken from the same data and copy the original page uses.
export const homePage = page('/', 'Home', [
  ['HomeHero'],
  ['QuickActionsBar'],
  ['StatsRow'],
  ['QuickLinksGrid'],
  ['AboutPreview'],
  ['QuoteFeature'],
  ['FeatureGrid'],
  ['LeaderCards'],
  ['AchievementCards'],
  ['NoticesList'],
  ['HighlightStory'],
  ['CtaBand'],
])

export const homeSeo = { title: '', description: routes['/'].description }
