'use client'

import { useRevealAll } from '@/components/animations/RevealContext'

/**
 * Props for a scroll-triggered reveal (framer-motion whileInView). Inside the editor canvas, where scroll
 * triggers do not fire reliably, the element is shown straight away instead.
 */
export function useInView(from: Record<string, number>, to: Record<string, number>) {
  return useRevealAll() ? { initial: false as const } : { initial: from, whileInView: to, viewport: { once: true } }
}
