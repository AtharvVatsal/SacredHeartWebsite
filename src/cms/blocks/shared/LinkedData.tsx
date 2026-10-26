'use client'

// Content that one page shows from another (e.g. the top five toppers on Achievements come from the toppers
// pages). The server collects it before rendering (src/cms/render/linked-data.ts) and hands it down here.
import { createContext, useContext, type ReactNode } from 'react'
import type { LinkedData } from './linked'

const EMPTY: LinkedData = { toppers: {} }
const LinkedDataContext = createContext<LinkedData>(EMPTY)

export function LinkedDataProvider({ value, children }: { value: LinkedData | undefined; children: ReactNode }) {
  return <LinkedDataContext.Provider value={value ?? EMPTY}>{children}</LinkedDataContext.Provider>
}

export const useLinkedData = () => useContext(LinkedDataContext)
