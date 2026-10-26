// Photos and achievers shown on the Other Achievements page (and as the defaults of its CMS sections)

export interface AchieverItem {
  id: string
  title: string
  student: string
  class?: string
  description: string
  year: number | string
  category: string
  image?: string
}

export const chandrayaanPhotos = [
  { src: '/images/Students/Achievers/Chandrayaan 3/Chandrayaan_2.webp', alt: 'Chandrayaan-3 Mission Photo 1' },
  { src: '/images/Students/Achievers/Chandrayaan 3/Chandrayaan_1.webp', alt: 'Chandrayaan-3 Mission Photo 2' },
  { src: '/images/Students/Achievers/Chandrayaan 3/Chandrayaan_3.webp', alt: 'Chandrayaan-3 Mission Photo 3' },
  { src: '/images/Students/Achievers/Chandrayaan 3/Chandrayaan_4.webp', alt: 'Chandrayaan-3 Mission Photo 4' },
  { src: '/images/Students/Achievers/Chandrayaan 3/Chandrayaan_5.webp', alt: 'Chandrayaan-3 Mission Photo 5' },
  { src: '/images/Students/Achievers/Chandrayaan 3/Chandrayaan_6.webp', alt: 'Chandrayaan-3 Mission Photo 6' },
]

export const otherAchievements: AchieverItem[] = [
  {
    id: '1',
    title: 'Personalities of Himachal Pradesh Quiz Competition',
    student: 'AARAV KATOCH',
    class: 'VII-C',
    description: 'Won 3rd position in the Personalities of Himachal Pradesh Quiz competition conducted by Zee TV.',
    year: 2024,
    category: 'Academic',
    image: '/images/Students/Achievers/aarav.webp',
  },
]
