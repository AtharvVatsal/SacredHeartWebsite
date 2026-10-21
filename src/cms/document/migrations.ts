// Version-aware upgrades for saved page documents.
//
// When a block's saved shape changes in a way old documents would not satisfy (a prop renamed, a choice
// removed...), bump CURRENT_SCHEMA_VERSION and add a migration that turns version N-1 documents into version N.
// Documents are upgraded when they are read (rendering and the editor) and saved back at the current version
// the next time someone saves the page. Never edit a migration that has shipped; add a new one.
import type { PageDocument } from './types'

export const CURRENT_SCHEMA_VERSION = 1

type Migration = (doc: PageDocument) => PageDocument

/** migrations[i] upgrades a document from version i+1 to version i+2 */
export const migrations: Migration[] = []

export function migrateDocument(doc: PageDocument, fromVersion: number | null | undefined): PageDocument {
  let version = fromVersion && fromVersion > 0 ? Math.floor(fromVersion) : 1
  let current = doc
  while (version < CURRENT_SCHEMA_VERSION) {
    const step = migrations[version - 1]
    if (!step) throw new Error(`No page-document migration from version ${version}`)
    current = step(current)
    version++
  }
  return current
}
