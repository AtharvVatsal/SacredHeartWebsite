// Content of the School Uniform page, as used by the CMS migration.
// The original page (legacy-page.tsx) keeps its own copy of the same text.
import type { IconName } from '@/cms/blocks/shared/icon-names'

type Item = { text: string; note: string }
const items = (list: string[]): Item[] => list.map((text) => ({ text, note: '' }))

export interface DressCardContent {
  tone: 'pink' | 'blue' | 'slate' | 'green' | 'primary'
  layout: 'list' | 'groups' | 'columns' | 'boxes' | 'centred'
  background: 'white' | 'fade'
  icon: IconName
  title: string
  subtitle: string
  intro: string
  groups: { title: string; twoColumns: boolean; items: Item[] }[]
  note: string
}

export const whereToBuy = {
  icon: 'ShoppingBag' as IconName,
  title: 'Where to Buy',
  text: 'School uniforms are to be bought from **DCN shop in Dharamshala**. The colour, material and pattern must be approved by the school only.',
}

export const dressCards: DressCardContent[] = [
  {
    tone: 'pink',
    layout: 'list',
    background: 'white',
    icon: 'Shirt',
    title: 'Girls Summer Uniform',
    subtitle: 'Essential items for daily wear',
    intro: '',
    groups: [
      {
        title: '',
        twoColumns: false,
        items: [
          { text: 'Pale Green skirt (just below the knees)', note: 'Pattern differs for LKG-VI' },
          { text: 'Cream coloured blouse', note: '' },
          { text: 'Black shoes with one strap', note: '' },
          { text: 'White socks (calf length)', note: '' },
          { text: 'School tie', note: '' },
          { text: 'Bloomers', note: 'Must be worn at all times' },
          { text: 'Hair plaited or white hair band', note: 'For those with short hair' },
        ],
      },
    ],
    note: '',
  },
  {
    tone: 'blue',
    layout: 'groups',
    background: 'fade',
    icon: 'Shirt',
    title: 'Boys Summer Uniform',
    subtitle: 'Essential items for daily wear',
    intro: '',
    groups: [
      { title: 'L.K.G. to Class 4', twoColumns: false, items: items(['Steel Grey shorts', 'White shirt']) },
      {
        title: 'Class 5 to XII',
        twoColumns: true,
        items: items(['Steel Grey pants', 'White shirt with half sleeves', 'Black laced shoes', 'White socks', 'School tie and belt']),
      },
    ],
    note: '',
  },
  {
    tone: 'slate',
    layout: 'columns',
    background: 'white',
    icon: 'Wind',
    title: 'Winter Uniform',
    subtitle: 'October to March',
    intro: '',
    groups: [
      {
        title: 'Girls',
        twoColumns: false,
        items: items([
          'Terry wool worsted steel grey pants (L.K.G. to IV) with belt',
          'Terry wool worsted steel grey skirt (V-XII, just below knee)',
          'White blouse',
          'School tie',
          'Bottle green twine',
          'Blazer',
          'Black shoes with one strap',
          'White socks',
        ]),
      },
      {
        title: 'Boys',
        twoColumns: false,
        items: items(['Terry wool worsted steel grey pants', 'White shirt', 'Green Turban (for Sikh Boys)', 'School tie', 'Bottle Green Pullover', 'Blazer', 'White socks', 'Black shoes']),
      },
    ],
    note: '',
  },
  {
    tone: 'green',
    layout: 'boxes',
    background: 'fade',
    icon: 'Trophy',
    title: 'Sports & Games',
    subtitle: 'Physical Education Attire',
    intro: '',
    groups: [
      { title: 'Girls', twoColumns: false, items: items(['White divided skirts (just below the knee)', 'House T-shirt', 'White canvas shoes', 'White socks']) },
      { title: 'Boys', twoColumns: false, items: items(['White pants', 'House T-shirt', 'White P.T. Shoes', 'White socks']) },
    ],
    note: '**Note:** The white uniform is only for students from Classes VI to XII. They should be in their house uniform on all the days stipulated for Mass P.T.',
  },
  {
    tone: 'primary',
    layout: 'centred',
    background: 'white',
    icon: 'Scissors',
    title: 'School Badges, Belts & Ties',
    subtitle: 'Available at School Office',
    intro: 'School Badges, belts and ties will be available in the school office.',
    groups: [
      {
        title: '',
        twoColumns: false,
        items: items(['Identity cards are mandatory with the uniform.', 'The uniform must be neat, clean and well ironed.', 'Follow the pattern and guidelines given by the school.']),
      },
    ],
    note: '',
  },
]
