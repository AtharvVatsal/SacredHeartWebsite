// The page document saved by the visual editor (Puck's data format) and stored in pages.content.
// Nested children live in "slot" props, which are themselves arrays of blocks.

export interface BlockData {
  type: string
  props: { id: string; [key: string]: unknown }
}

export interface PageDocument {
  root: { props?: Record<string, unknown> }
  content: BlockData[]
  /** Legacy Puck drop zones; this site uses slots instead, so this stays empty */
  zones?: Record<string, BlockData[]>
}

export const EMPTY_DOCUMENT: PageDocument = { root: { props: {} }, content: [] }

export interface BlockIssue {
  /** id of the block, so the editor can point at it */
  blockId: string
  type: string
  /** Human-readable block name ("Hero section") */
  label: string
  message: string
}

export const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
