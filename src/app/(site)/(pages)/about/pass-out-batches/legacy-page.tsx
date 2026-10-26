'use client'

import { useBatchYears } from '@/lib/useCMS'
import PassOutView from '@/components/about/PassOutView'

export default function PassOutBatchesPage() {
  const { data: batchData } = useBatchYears()
  return <PassOutView batches={batchData || []} />
}
