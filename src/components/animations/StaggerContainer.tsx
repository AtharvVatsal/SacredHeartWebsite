'use client'

import { createContext, useCallback, useRef, ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  stagger?: number
  className?: string
  once?: boolean
}

// Items arriving within this window count as one batch (one row, or one screenful after a fast scroll)
const BATCH_WINDOW_MS = 120
// Longest wait any single item can have, so deep items in long grids never sit blank
const MAX_ITEM_DELAY = 0.45

export interface StaggerContextValue {
  once: boolean
  /** Called by an item the moment it enters view; returns how long it should wait before revealing */
  nextDelay: () => number
}

export const StaggerContext = createContext<StaggerContextValue | null>(null)

/**
 * Staggers its FadeInItem children as they scroll into view.
 * Each item reveals when it is itself on screen; items that arrive together
 * (a row, or everything visible after a fast scroll) fan out in order.
 */
export default function StaggerContainer({
  children,
  delay = 0,
  stagger = 0.09,
  className = '',
  once = true,
}: StaggerContainerProps) {
  const batch = useRef({ at: -Infinity, count: 0, batches: 0 })

  const nextDelay = useCallback(() => {
    const now = performance.now()
    const b = batch.current
    if (now - b.at > BATCH_WINDOW_MS) {
      b.count = 0
      b.batches += 1
    }
    b.at = now
    // The opening delay applies only to the first batch the visitor sees
    const lead = b.batches === 1 ? delay : 0
    const wait = lead + Math.min(b.count * stagger, MAX_ITEM_DELAY)
    b.count += 1
    return wait
  }, [delay, stagger])

  return (
    <StaggerContext.Provider value={{ once, nextDelay }}>
      <div className={className}>{children}</div>
    </StaggerContext.Provider>
  )
}
