// How each block renders. Shared by the public renderer and the editor canvas, so what editors see is
// exactly what visitors get.
import type { ComponentType } from 'react'
import CardGrid, { InfoCard } from './general/Cards'
import Columns from './general/Columns'
import ImageText from './general/ImageText'
import { ButtonRow, Callout, ContactCard, Faq, ImageBlock, ImageGallery, Spacer, TextBlock, VideoEmbed } from './general/Misc'
import PageHero from './general/PageHero'
import TextSection, { SectionHeading } from './general/TextSection'
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
import { RuleCards } from './pages/Admission'
import { PolicyIntro, PolicySections, SimpleCta } from './pages/Legal'

// Each component takes its own block's validated props
export const blockComponents: Record<string, ComponentType<any>> = {
  PageHero,
  SectionHeading,
  TextSection,
  ImageText,
  Columns,
  CardGrid,
  Faq,
  ButtonRow,
  Callout,
  InfoCard,
  ImageBlock,
  TextBlock,
  ContactCard,
  VideoEmbed,
  ImageGallery,
  Spacer,
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
  PolicyIntro,
  PolicySections,
  SimpleCta,
  RuleCards,
}
