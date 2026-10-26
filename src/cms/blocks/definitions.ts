// Every block the visual editor offers, as server-safe definitions (schema, name, category).
// To add a block: define it in a family's definitions.ts, render it in the family's components, give it editor
// fields in src/cms/editor/fields, and list it in the arrays below. See docs/cms-architecture.md §6.
import type { z } from 'zod'
import type { BlockDefinition } from '../document/definition'
import { bool, choice } from '../document/fields'
import { generalBlocks } from './general/definitions'
import { homeBlocks } from './home/definitions'
import { academicsBlocks } from './pages/academics.definitions'
import { admissionBlocks } from './pages/admission.definitions'
import { onlineBlocks } from './pages/online.definitions'
import { aboutBlocks } from './pages/about.definitions'
import { legalBlocks } from './pages/legal.definitions'

/** Options every section has: hide it completely, or hide it on one kind of screen */
export const commonShape = {
  hidden: bool(false),
  hideOn: choice(['none', 'mobile', 'desktop'] as const, 'none'),
}

function withCommon(def: BlockDefinition): BlockDefinition {
  return { ...def, schema: def.schema.extend(commonShape) as z.ZodObject }
}

export const blockDefinitions: BlockDefinition[] = [...generalBlocks, ...homeBlocks, ...legalBlocks, ...admissionBlocks, ...onlineBlocks, ...academicsBlocks, ...aboutBlocks].map(withCommon)

export const blockRegistry: Record<string, BlockDefinition> = Object.fromEntries(blockDefinitions.map((d) => [d.type, d]))

/** The props a brand-new block starts with: the schema's defaults */
export function defaultPropsFor(type: string): Record<string, unknown> {
  const def = blockRegistry[type]
  if (!def) return {}
  const parsed = def.schema.safeParse({})
  return parsed.success ? (parsed.data as Record<string, unknown>) : {}
}
