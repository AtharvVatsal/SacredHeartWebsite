// Checks a page document against the block registry.
//
//   strict: used before publishing. Every problem is reported; nothing is changed.
//   repair: used when rendering and when loading the editor. Unknown or unusable blocks are dropped and bad
//           fields fall back to their defaults, so stored data can never crash a page.
import { z } from 'zod'
import type { BlockDefinition } from './definition'
import { EMPTY_DOCUMENT, isRecord, type BlockData, type BlockIssue, type PageDocument } from './types'

export const MAX_DOCUMENT_BYTES = 1_500_000
export const MAX_DEPTH = 4
const ID = /^[\w-]{1,80}$/

export interface ValidationResult {
  ok: boolean
  document: PageDocument
  issues: BlockIssue[]
}

type Registry = Record<string, BlockDefinition>

const describe = (error: z.ZodError) =>
  error.issues.map((i) => (i.path.length ? `${i.path.join(' › ')}: ${i.message}` : i.message)).join('; ')

let counter = 0
const freshId = (type: string) => `${type}-${Date.now().toString(36)}-${(counter++).toString(36)}`

/** Parses props field by field, replacing any field that fails with its default (repair mode) */
function repairProps(def: BlockDefinition, props: Record<string, unknown>) {
  const shape = def.schema.shape as Record<string, z.ZodType>
  const out: Record<string, unknown> = {}
  for (const [key, field] of Object.entries(shape)) {
    const parsed = field.safeParse(props[key])
    if (parsed.success) out[key] = parsed.data
    else {
      const fallback = field.safeParse(undefined)
      if (!fallback.success) return null // a required field with no default: the block can't be shown
      out[key] = fallback.data
    }
  }
  return out
}

function walk(blocks: unknown, registry: Registry, mode: 'strict' | 'repair', issues: BlockIssue[], seen: Set<string>, depth: number, allow?: readonly string[]): BlockData[] {
  if (!Array.isArray(blocks)) {
    if (blocks !== undefined) issues.push({ blockId: '', type: '', label: 'Page', message: 'Section list is not a list' })
    return []
  }
  const out: BlockData[] = []
  for (const raw of blocks) {
    if (!isRecord(raw) || typeof raw.type !== 'string' || !isRecord(raw.props)) {
      issues.push({ blockId: '', type: '', label: 'Unknown section', message: 'A section is damaged and was removed' })
      continue
    }
    const type = raw.type
    const rawProps = raw.props
    let id = typeof rawProps.id === 'string' ? rawProps.id : ''
    const def = registry[type]
    if (!def) {
      issues.push({ blockId: id, type, label: type, message: 'This kind of section no longer exists' })
      continue
    }
    if (allow && !allow.includes(type)) {
      issues.push({ blockId: id, type, label: def.label, message: `${def.label} cannot be placed here` })
      continue
    }
    if (!ID.test(id) || seen.has(id)) {
      if (mode === 'strict') issues.push({ blockId: id, type, label: def.label, message: 'Section has a missing or duplicate id' })
      id = freshId(type)
    }
    seen.add(id)

    const { id: _ignored, ...props } = rawProps
    void _ignored
    const slots = def.slots ?? []
    const plain: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(props)) if (!slots.includes(k)) plain[k] = v

    let parsedProps: Record<string, unknown> | null
    const parsed = def.schema.safeParse(plain)
    if (parsed.success) parsedProps = parsed.data as Record<string, unknown>
    else {
      issues.push({ blockId: id, type, label: def.label, message: describe(parsed.error) })
      parsedProps = mode === 'repair' ? repairProps(def, plain) : null
    }
    if (!parsedProps && mode === 'repair') continue

    const children: Record<string, BlockData[]> = {}
    for (const s of slots) {
      if (depth >= MAX_DEPTH) {
        issues.push({ blockId: id, type, label: def.label, message: 'Sections are nested too deeply' })
        children[s] = []
      } else {
        children[s] = walk(props[s] ?? [], registry, mode, issues, seen, depth + 1, def.slotAllow)
      }
    }
    out.push({ type, props: { id, ...(parsedProps ?? plain), ...children } })
  }
  return out
}

export function validateDocument(input: unknown, registry: Registry, mode: 'strict' | 'repair'): ValidationResult {
  const issues: BlockIssue[] = []
  if (!isRecord(input) || !Array.isArray(input.content)) {
    if (input !== null && input !== undefined) issues.push({ blockId: '', type: '', label: 'Page', message: 'The page content is damaged' })
    return { ok: input === null || input === undefined ? mode === 'repair' : false, document: EMPTY_DOCUMENT, issues }
  }
  let size = 0
  try {
    size = JSON.stringify(input).length
  } catch {
    return { ok: false, document: EMPTY_DOCUMENT, issues: [{ blockId: '', type: '', label: 'Page', message: 'The page content cannot be saved' }] }
  }
  if (size > MAX_DOCUMENT_BYTES) {
    issues.push({ blockId: '', type: '', label: 'Page', message: 'The page is too large. Split it into smaller pages.' })
    if (mode === 'strict') return { ok: false, document: EMPTY_DOCUMENT, issues }
  }
  const content = walk(input.content, registry, mode, issues, new Set(), 1)
  const rootProps = isRecord(input.root) && isRecord(input.root.props) ? input.root.props : {}
  const title = typeof rootProps.title === 'string' ? rootProps.title.slice(0, 200) : undefined
  const document: PageDocument = { root: { props: title === undefined ? {} : { title } }, content }
  return { ok: issues.length === 0, document, issues }
}
