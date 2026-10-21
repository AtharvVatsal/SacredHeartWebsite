import type { z } from 'zod'

/** Groups shown in the editor's section library, in this order */
export const CATEGORIES = {
  layout: 'Layout',
  content: 'Text and media',
  cards: 'Cards and highlights',
  actions: 'Buttons and calls to action',
  home: 'Home page sections',
  about: 'About sections',
  academics: 'Academics sections',
  admission: 'Admission sections',
  features: 'Interactive features',
} as const
export type CategoryKey = keyof typeof CATEGORIES

/**
 * Server-safe description of a block: its name, where it appears in the library and the schema its saved
 * props must satisfy. The React component and the editor fields live in separate files so that validation
 * (Payload hooks, scripts) never loads React or the editor.
 */
export interface BlockDefinition<S extends z.ZodObject = z.ZodObject> {
  type: string
  label: string
  category: CategoryKey
  schema: S
  /** Props that hold nested blocks */
  slots?: readonly string[]
  /** Block types allowed inside the slots (default: any non-section block) */
  slotAllow?: readonly string[]
  /** Essential features (forms, directories) can be hidden but not deleted from the page */
  locked?: boolean
}

export type BlockProps<D extends BlockDefinition> = z.infer<D['schema']>

export function defineBlock<S extends z.ZodObject>(def: BlockDefinition<S>) {
  return def
}
