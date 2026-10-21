// How each block renders. Shared by the public renderer and the editor canvas, so what editors see is
// exactly what visitors get.
import type { ComponentType } from 'react'
import AboutPreview from './home/AboutPreview'
import AchievementCards from './home/AchievementCards'
import CtaBand from './home/CtaBand'
import FeatureGrid from './home/FeatureGrid'
import HighlightStory from './home/HighlightStory'
import HomeHero from './home/HomeHero'
import LeaderCards from './home/LeaderCards'
import NoticesList from './home/NoticesList'
import QuickActionsBar from './home/QuickActionsBar'
import QuickLinksGrid from './home/QuickLinksGrid'
import QuoteFeature from './home/QuoteFeature'
import StatsRow from './home/StatsRow'

// Each component takes its own block's validated props
export const blockComponents: Record<string, ComponentType<any>> = {
  HomeHero,
  QuickActionsBar,
  StatsRow,
  QuickLinksGrid,
  AboutPreview,
  QuoteFeature,
  FeatureGrid,
  LeaderCards,
  AchievementCards,
  NoticesList,
  HighlightStory,
  CtaBand,
}
