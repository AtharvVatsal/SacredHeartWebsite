// Every block the visual editor offers, as server-safe definitions (schema, name, category).
// Add a block here, in src/cms/blocks/components.tsx (how it renders) and in src/cms/editor/config.tsx (its fields).
import type { BlockDefinition } from '../document/definition'

export const blockDefinitions: BlockDefinition[] = []

export const blockRegistry: Record<string, BlockDefinition> = Object.fromEntries(blockDefinitions.map((d) => [d.type, d]))
