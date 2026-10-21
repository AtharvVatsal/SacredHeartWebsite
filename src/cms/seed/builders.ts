// Helpers for building page documents from the site's existing content
import { defaultPropsFor } from '../blocks/definitions'
import type { BlockData, PageDocument } from '../document/types'

export interface SeedPage {
  path: string
  title: string
  document: PageDocument
}

/** A block with its default props (the current content), optionally overridden */
export function block(type: string, index: number, overrides: Record<string, unknown> = {}): BlockData {
  const defaults = defaultPropsFor(type)
  if (!Object.keys(defaults).length) throw new Error(`Unknown or invalid block type in seed: ${type}`)
  return { type, props: { id: `${type}-${index}`, ...defaults, ...overrides } }
}

export function page(path: string, title: string, blocks: [type: string, overrides?: Record<string, unknown>][]): SeedPage {
  return { path, title, document: { root: { props: {} }, content: blocks.map(([type, overrides], i) => block(type, i + 1, overrides)) } }
}
