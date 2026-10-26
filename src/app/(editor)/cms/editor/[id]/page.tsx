import config from '@payload-config'
import type { Data } from '@puckeditor/core'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import type { Page } from '@/payload-types'
import { blockRegistry } from '@/cms/blocks/definitions'
import { migrateDocument } from '@/cms/document/migrations'
import type { PageDocument } from '@/cms/document/types'
import { validateDocument } from '@/cms/document/validate'
import { EditorShell } from '@/cms/editor/EditorShell'
import { loadLinkedData } from '@/cms/render/linked-data'
import { getSiteSettings } from '@/cms/render/settings'
import { fontVariables } from '@/lib/fonts'

// Always rendered per request for the signed-in person; never cached
export const dynamic = 'force-dynamic'

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  const id = Number(rawId)
  if (!Number.isInteger(id) || id <= 0) notFound()

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) redirect(`/admin/login?redirect=${encodeURIComponent(`/cms/editor/${id}`)}`)
  const role = (user as { role?: string }).role === 'admin' ? 'admin' : 'editor'

  // Latest saved version (the draft if there is one) and the version visitors currently see
  const draft = (await payload.findByID({ collection: 'pages', id, draft: true, depth: 0, user, overrideAccess: false }).catch(() => null)) as Page | null
  if (!draft) notFound()
  const live = (await payload.findByID({ collection: 'pages', id, draft: false, depth: 0, user, overrideAccess: false }).catch(() => null)) as Page | null
  const hasPublished = live?._status === 'published'
  const hasUnpublishedChanges = hasPublished && JSON.stringify(live?.content ?? null) !== JSON.stringify(draft.content ?? null)

  // Bring old documents up to date and drop anything the current editor cannot show
  const migrated = migrateDocument((draft.content as unknown as PageDocument) ?? { root: { props: {} }, content: [] }, draft.schemaVersion)
  const { document, issues } = validateDocument(migrated, blockRegistry, 'repair')

  return (
    <EditorShell
      page={{ id, title: draft.title, path: draft.path, kind: draft.kind === 'builtIn' ? 'builtIn' : 'custom', hasPublished, hasUnpublishedChanges }}
      role={role}
      initialData={document as unknown as Data}
      initialIssues={issues}
      settings={await getSiteSettings()}
      linked={await loadLinkedData(payload, document, user)}
      fontClassName={fontVariables}
    />
  )
}
