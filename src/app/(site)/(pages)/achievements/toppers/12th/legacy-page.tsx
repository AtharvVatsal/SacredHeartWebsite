'use client'

import ToppersPage from '@/components/achievements/ToppersPage'
import { class12Sessions } from '@/data/toppers'

export default function Class12ToppersPage() {
  return (
    <ToppersPage
      classLabel="Class 12"
      sessions={class12Sessions}
      otherClass={{ label: 'Class 10', href: '/achievements/toppers/10th' }}
    />
  )
}
