'use client'

import type { ReactNode } from 'react'
import type { BlockProps } from '../../document/definition'
import type { Columns as Def } from './definitions'
import { InColumnContext, SectionFrame, SectionHeader } from './Frame'

const GRID = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'sm:grid-cols-2 lg:grid-cols-4' } as const
const GAP = { small: 'gap-4', normal: 'gap-8', large: 'gap-12' } as const

type Props = Omit<BlockProps<typeof Def>, 'col1' | 'col2' | 'col3' | 'col4'> & { col1: ReactNode; col2: ReactNode; col3: ReactNode; col4: ReactNode }

export default function Columns(p: Props) {
  const cols = [p.col1, p.col2, p.col3, p.col4].slice(0, Number(p.count))
  return (
    <SectionFrame look={p.look}>
      <SectionHeader heading={p.heading} align={p.look.align} />
      <InColumnContext.Provider value>
        <div className={`grid grid-cols-1 ${GRID[p.count]} ${GAP[p.gap]} ${p.verticalAlign === 'center' ? 'items-center' : 'items-start'} text-left`}>
          {cols.map((col, i) => (
            <div key={i} className="flex flex-col gap-6 min-w-0">
              {col}
            </div>
          ))}
        </div>
      </InColumnContext.Provider>
    </SectionFrame>
  )
}
