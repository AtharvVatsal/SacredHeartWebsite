'use client'

import ToppersPage from '@/components/achievements/ToppersPage'
import { class10Sessions } from '@/data/toppers'

export default function Class10ToppersPage() {
  return (
    <ToppersPage
      classLabel="Class 10"
      sessions={class10Sessions}
      otherClass={{ label: 'Class 12', href: '/achievements/toppers/12th' }}
    />
  )
}
