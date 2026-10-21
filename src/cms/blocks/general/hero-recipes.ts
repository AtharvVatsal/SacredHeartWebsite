// How the green title banner is put together. The inner pages were designed one by one, so their banners
// differ in small ways (entrance timing, glows, where the back link sits); each page's banner is described
// here as a recipe, and editors pick one by name ("Banner style") instead of setting a dozen options.
import type { PageHero as Def } from './definitions'
import type { BlockProps } from '../../document/definition'

export type BackStyle =
  | 'animated' // grey, fades in from the left, arrow gently moving
  | 'animatedStill' // as above with a still arrow
  | 'grey' // grey, fades in from the left
  | 'subtle' // soft white, nudges left on hover (turned arrow)
  | 'subtleLeft' // soft white, nudges left on hover
  | 'subtleStatic' // soft white, no motion
  | 'subtleBare' // soft white, no motion, arrow and text directly in the link
  | 'history' // soft white, fades in, nudges on hover, more space below
  | 'plain' // light green
  | 'plainFit' // light green, text in its own span
  | 'plainBare' // light green, no space below

export interface HeroRecipe {
  pb: 'pb-20' | 'pb-24' | 'pb-28'
  /** The drifting motif layer: with or without the twinkling points, or with its own colour orbs */
  decor: 'none' | 'decor' | 'decorPlain' | 'decorOrbs'
  glows: 'none' | 'two' | 'twoLarge'
  /** A large faint glow in the middle */
  halo: 'none' | 'spin600' | 'spin800' | 'still150' | 'still120'
  /** Faint gold motif icons floating among the glows */
  goldFloat: boolean
  /** Large faint white motif icons floating over the banner */
  float: 'none' | 'drift' | 'bells'
  /** The whole text column fades up on load */
  containerFade: boolean
  back: BackStyle
  /** outside: above the text column; inside: first in the column; stack: grouped with the badge */
  backPlace: 'outside' | 'inside' | 'stack' | 'stack3'
  narrow: boolean
  wrapperMotion: 'none' | 'fade20' | 'fade20slow' | 'fade30' | 'fade30late' | 'stagger'
  badge: {
    motion: 'pop2' | 'pop3' | 'none' | 'stagger'
    tag: 'span' | 'div'
    border: 'soft' | 'strong'
    /** Sized to its text with no space below (the title then carries the space) */
    fit: boolean
    iconMotion: 'none' | 'spin'
    textSpan: boolean
  }
  title: { large: boolean; mt8: boolean; mb: 'mb-4' | 'mb-6'; motion: 'd2' | 'd3' | 'none' | 'stagger' }
  subtitle: { large: boolean; tone: 'text-gray-200' | 'text-gray-300'; mb8: boolean; motion: 'd4' | 'd5' | 'none' | 'stagger' }
  /** Colours of the gold words after the title */
  highlight: 'two' | 'three'
}

type Design = BlockProps<typeof Def>['design']

const PB = { small: 'pb-20', medium: 'pb-24', large: 'pb-28' } as const

/** The "Custom" style: built from the individual design options */
export function recipeFromDesign(d: Design): HeroRecipe {
  return {
    pb: PB[d.bottomSpace],
    decor: d.sparkles ? 'decor' : 'decorPlain',
    glows: d.glows === 'twoLarge' ? 'twoLarge' : d.glows === 'none' ? 'none' : 'two',
    halo: d.glows === 'three' ? 'spin600' : 'none',
    goldFloat: false,
    float: 'none',
    containerFade: false,
    back: d.backStyle,
    backPlace: d.stacked ? 'stack' : 'inside',
    narrow: d.narrow,
    wrapperMotion: 'none',
    badge: { motion: 'pop2', tag: 'span', border: d.badgeBorder, fit: d.stacked, iconMotion: 'none', textSpan: false },
    title: { large: d.titleSize === 'large', mt8: d.stacked, mb: d.titleGap === 'normal' ? 'mb-6' : 'mb-4', motion: 'd3' },
    subtitle: { large: d.titleSize === 'large', tone: 'text-gray-200', mb8: false, motion: 'd5' },
    highlight: 'two',
  }
}

const landing: HeroRecipe = {
  pb: 'pb-20',
  decor: 'none',
  glows: 'two',
  halo: 'none',
  goldFloat: false,
  float: 'drift',
  containerFade: true,
  back: 'plain',
  backPlace: 'inside',
  narrow: true,
  wrapperMotion: 'fade30late',
  badge: { motion: 'pop3', tag: 'div', border: 'strong', fit: false, iconMotion: 'none', textSpan: false },
  title: { large: false, mt8: false, mb: 'mb-4', motion: 'd2' },
  subtitle: { large: false, tone: 'text-gray-200', mb8: false, motion: 'd4' },
  highlight: 'two',
}

const leadership: HeroRecipe = {
  pb: 'pb-28',
  decor: 'decor',
  glows: 'two',
  halo: 'spin600',
  goldFloat: false,
  float: 'none',
  containerFade: false,
  back: 'subtle',
  backPlace: 'stack',
  narrow: true,
  wrapperMotion: 'none',
  badge: { motion: 'pop2', tag: 'div', border: 'soft', fit: true, iconMotion: 'none', textSpan: false },
  title: { large: true, mt8: true, mb: 'mb-6', motion: 'd3' },
  subtitle: { large: true, tone: 'text-gray-200', mb8: false, motion: 'd5' },
  highlight: 'two',
}

const goldWords: HeroRecipe = {
  pb: 'pb-24',
  decor: 'decor',
  glows: 'twoLarge',
  halo: 'still150',
  goldFloat: false,
  float: 'none',
  containerFade: false,
  back: 'animated',
  backPlace: 'outside',
  narrow: true,
  wrapperMotion: 'none',
  badge: { motion: 'none', tag: 'div', border: 'strong', fit: false, iconMotion: 'none', textSpan: true },
  title: { large: false, mt8: false, mb: 'mb-4', motion: 'd2' },
  subtitle: { large: false, tone: 'text-gray-300', mb8: false, motion: 'd4' },
  highlight: 'two',
}

const financial: HeroRecipe = {
  ...leadership,
  halo: 'still120',
  glows: 'twoLarge',
  back: 'subtleStatic',
  badge: { ...leadership.badge, motion: 'none' },
  title: { large: true, mt8: true, mb: 'mb-4', motion: 'none' },
  subtitle: { large: true, tone: 'text-gray-200', mb8: false, motion: 'none' },
}

/** Banner styles, named after the page that first used them */
export const HERO_RECIPES = {
  landing, // About Us, Academics, Achievements, Admission, Gallery
  bells: { ...landing, float: 'bells' }, // Notifications
  aims: {
    ...leadership,
    halo: 'spin600',
    back: 'animated',
    backPlace: 'outside',
    wrapperMotion: 'fade20',
    badge: { ...leadership.badge, tag: 'span', fit: false },
    title: { large: true, mt8: false, mb: 'mb-6', motion: 'd3' },
  },
  history: {
    ...leadership,
    pb: 'pb-24',
    halo: 'spin800',
    back: 'history',
    backPlace: 'outside',
    badge: { ...leadership.badge, fit: false },
    title: { large: true, mt8: false, mb: 'mb-6', motion: 'd3' },
  },
  principal: leadership,
  staff: { ...leadership, back: 'subtleLeft' },
  officeBearers: {
    ...leadership,
    pb: 'pb-20',
    halo: 'none',
    back: 'plainFit',
    badge: { ...leadership.badge, motion: 'pop3', border: 'strong' },
    title: { large: true, mt8: true, mb: 'mb-6', motion: 'd2' },
    subtitle: { large: true, tone: 'text-gray-200', mb8: false, motion: 'd4' },
  },
  messages: {
    ...leadership,
    pb: 'pb-20',
    halo: 'none',
    containerFade: true,
    back: 'plainBare',
    backPlace: 'stack3',
    wrapperMotion: 'fade30late',
    badge: { ...leadership.badge, motion: 'pop3', border: 'strong' },
    title: { large: false, mt8: false, mb: 'mb-4', motion: 'd2' },
    subtitle: { large: false, tone: 'text-gray-200', mb8: false, motion: 'd4' },
  },
  calendar: { ...goldWords, back: 'animatedStill' },
  syllabus: {
    ...goldWords,
    wrapperMotion: 'fade20slow',
    badge: { ...goldWords.badge, fit: true, iconMotion: 'spin' },
    title: { large: true, mt8: true, mb: 'mb-4', motion: 'none' },
    subtitle: { large: true, tone: 'text-gray-300', mb8: false, motion: 'none' },
  },
  toppers: {
    ...goldWords,
    wrapperMotion: 'fade30late',
    badge: { ...goldWords.badge, iconMotion: 'spin' },
    title: { large: false, mt8: false, mb: 'mb-4', motion: 'none' },
    subtitle: { large: false, tone: 'text-gray-300', mb8: true, motion: 'none' },
  },
  otherAchievements: {
    ...goldWords,
    decor: 'none',
    goldFloat: true,
    wrapperMotion: 'stagger',
    badge: { ...goldWords.badge, motion: 'stagger', iconMotion: 'spin' },
    title: { large: false, mt8: false, mb: 'mb-4', motion: 'stagger' },
    subtitle: { large: false, tone: 'text-gray-300', mb8: false, motion: 'stagger' },
    highlight: 'three',
  },
  financial, // School Fee, School Uniform
  onlineService: {
    ...leadership,
    decor: 'decorOrbs',
    glows: 'none',
    halo: 'none',
    containerFade: true,
    back: 'subtleBare',
    badge: { ...leadership.badge, motion: 'pop3', border: 'strong' },
    title: { large: false, mt8: true, mb: 'mb-4', motion: 'd2' },
    subtitle: { large: false, tone: 'text-gray-200', mb8: true, motion: 'd4' },
  },
} satisfies Record<string, HeroRecipe>

export type HeroStyle = 'custom' | keyof typeof HERO_RECIPES
export const HERO_STYLES = ['custom', ...(Object.keys(HERO_RECIPES) as (keyof typeof HERO_RECIPES)[])] as const

export const HERO_STYLE_LABELS: Record<HeroStyle, string> = {
  custom: 'Custom (use the design options below)',
  landing: 'As on About Us, Academics and Gallery',
  bells: 'As on Notifications (floating bells)',
  aims: 'As on Our Aims',
  history: 'As on Our History',
  principal: 'As on Principal’s Message',
  staff: 'As on Our Staff',
  officeBearers: 'As on Office Bearers',
  messages: 'As on Head Boy & Head Girl',
  calendar: 'As on Academic Calendar',
  syllabus: 'As on Syllabus & Homework',
  toppers: 'As on Board Exam Toppers',
  otherAchievements: 'As on Other Achievements',
  financial: 'As on School Fee and School Uniform',
  onlineService: 'As on Pay Fee Online',
}
