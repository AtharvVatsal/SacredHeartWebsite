'use client'

/* eslint-disable @next/next/no-html-link-for-pages -- the admin panel is a separate root layout, so these are full page loads by design */

import { Puck, type Data } from '@puckeditor/core'
import '@puckeditor/core/puck.css'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { SiteSettings } from '@/lib/site-settings'
import type { BlockIssue } from '../document/types'
import { publishAction, saveDraftAction, type SaveResult } from './actions'
import { SectionActionBar } from './ActionBar'
import { createPuckConfig } from './config'

export interface EditorPageInfo {
  id: number
  title: string
  path: string
  kind: 'builtIn' | 'custom'
  /** Whether a published version exists (visitors see it) */
  hasPublished: boolean
  /** Whether the saved draft differs from what visitors see */
  hasUnpublishedChanges: boolean
}

interface Props {
  page: EditorPageInfo
  role: 'admin' | 'editor'
  initialData: Data
  initialIssues: BlockIssue[]
  settings: SiteSettings
  fontClassName: string
}

type Notice = { tone: 'ok' | 'error' | 'info'; text: string; issues?: BlockIssue[] }

interface EditorState {
  page: EditorPageInfo
  role: Props['role']
  dirty: boolean
  busy: 'save' | 'publish' | null
  status: { hasPublished: boolean; hasUnpublishedChanges: boolean }
  save: () => Promise<boolean>
  publish: () => Promise<void>
  preview: () => Promise<void>
}

const EditorContext = createContext<EditorState | null>(null)
const useEditor = () => useContext(EditorContext)!

const btn = (variant: 'plain' | 'primary' | 'gold', disabled?: boolean): React.CSSProperties => ({
  height: 36,
  padding: '0 14px',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  whiteSpace: 'nowrap',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.55 : 1,
  border: variant === 'plain' ? '1px solid #d1d5db' : 'none',
  background: variant === 'primary' ? '#15803d' : variant === 'gold' ? '#facc15' : '#fff',
  color: variant === 'primary' ? '#fff' : '#111827',
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
})

function StatusPill() {
  const { dirty, status } = useEditor()
  const [text, bg] = dirty
    ? ['Unsaved changes', '#fef3c7']
    : !status.hasPublished
      ? ['Draft · not published yet', '#e5e7eb']
      : status.hasUnpublishedChanges
        ? ['Draft saved · visitors see the older published version', '#fef3c7']
        : ['Published · up to date', '#dcfce7']
  return (
    <span role="status" style={{ fontSize: 13, fontWeight: 600, padding: '6px 10px', borderRadius: 999, background: bg, color: '#1f2937', whiteSpace: 'nowrap' }}>
      {text}
    </span>
  )
}

function HeaderActions() {
  const { page, role, dirty, busy, save, publish, preview } = useEditor()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'flex-end' }}>
      <StatusPill />
      <a href="/admin/collections/pages" style={btn('plain')} title="Back to the list of pages">
        All pages
      </a>
      <a href={`/admin/collections/pages/${page.id}`} style={btn('plain')} title="Page name, address and search engine settings">
        Page settings
      </a>
      <a href={`/admin/collections/pages/${page.id}/versions`} style={btn('plain')} title="See and restore earlier versions">
        History
      </a>
      <button type="button" style={btn('plain', !!busy)} disabled={!!busy} onClick={preview}>
        Preview
      </button>
      <button type="button" style={btn('primary', !!busy || !dirty)} disabled={!!busy || !dirty} onClick={() => void save()}>
        {busy === 'save' ? 'Saving…' : 'Save draft'}
      </button>
      {role === 'admin' ? (
        <button type="button" style={btn('gold', !!busy)} disabled={!!busy} onClick={publish}>
          {busy === 'publish' ? 'Publishing…' : 'Publish'}
        </button>
      ) : (
        <span style={{ fontSize: 12, color: '#4b5563', maxWidth: 180 }}>An administrator publishes your draft.</span>
      )}
    </div>
  )
}

function NoticeBar({ notice, onClose }: { notice: Notice | null; onClose: () => void }) {
  if (!notice) return null
  const colors = { ok: ['#dcfce7', '#14532d'], error: ['#fee2e2', '#7f1d1d'], info: ['#e0f2fe', '#0c4a6e'] }[notice.tone]
  return (
    <div role={notice.tone === 'error' ? 'alert' : 'status'} style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1000, maxWidth: 460, background: colors[0], color: colors[1], borderRadius: 12, padding: '12px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', fontSize: 14 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <p style={{ margin: 0, flex: 1, fontWeight: 600 }}>{notice.text}</p>
        <button type="button" onClick={onClose} aria-label="Close message" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, lineHeight: 1, color: 'inherit' }}>
          ×
        </button>
      </div>
      {notice.issues && notice.issues.length > 0 && (
        <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
          {notice.issues.slice(0, 8).map((i, n) => (
            <li key={n}>
              <strong>{i.label}:</strong> {i.message}
            </li>
          ))}
          {notice.issues.length > 8 && <li>…and {notice.issues.length - 8} more</li>}
        </ul>
      )}
    </div>
  )
}

export function EditorShell({ page, role, initialData, initialIssues, settings, fontClassName }: Props) {
  const config = useMemo(() => createPuckConfig(settings), [settings])
  const [data, setData] = useState<Data>(initialData)
  const savedJson = useRef(JSON.stringify(initialData))
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState<EditorState['busy']>(null)
  const [status, setStatus] = useState({ hasPublished: page.hasPublished, hasUnpublishedChanges: page.hasUnpublishedChanges })
  const [notice, setNotice] = useState<Notice | null>(
    initialIssues.length ? { tone: 'info', text: 'Some saved sections had problems and were adjusted or removed in this view. Review the page before saving.', issues: initialIssues } : null,
  )
  const dataRef = useRef(data)
  dataRef.current = data

  const onChange = useCallback((next: Data) => {
    setData(next)
    setDirty(JSON.stringify(next) !== savedJson.current)
  }, [])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const handleResult = useCallback((result: SaveResult, sent: Data, okText: string) => {
    if (!result.ok) {
      setNotice({ tone: 'error', text: result.error, issues: result.issues })
      return false
    }
    savedJson.current = JSON.stringify(sent)
    setDirty(JSON.stringify(dataRef.current) !== savedJson.current)
    setStatus((s) => (result.status === 'published' ? { hasPublished: true, hasUnpublishedChanges: false } : { ...s, hasUnpublishedChanges: true }))
    setNotice({
      tone: 'ok',
      text: result.issues.length ? `${okText} Some sections still need attention before publishing.` : okText,
      issues: result.issues.length ? result.issues : undefined,
    })
    return true
  }, [])

  const save = useCallback(async () => {
    const sent = dataRef.current
    setBusy('save')
    try {
      return handleResult(await saveDraftAction(page.id, sent), sent, 'Draft saved. Visitors do not see it until it is published.')
    } catch {
      setNotice({ tone: 'error', text: 'The draft could not be saved (no connection to the server). Your changes are still here; try again.' })
      return false
    } finally {
      setBusy(null)
    }
  }, [page.id, handleResult])

  const publish = useCallback(async () => {
    if (!window.confirm(`Publish “${page.title}” now?\n\nVisitors will see these changes at ${page.path} within a few seconds.`)) return
    const sent = dataRef.current
    setBusy('publish')
    try {
      handleResult(await publishAction(page.id, sent), sent, 'Published. The page is now live for visitors.')
    } catch {
      setNotice({ tone: 'error', text: 'The page could not be published (no connection to the server). Nothing was changed for visitors; try again.' })
    } finally {
      setBusy(null)
    }
  }, [page.id, page.title, page.path, handleResult])

  const preview = useCallback(async () => {
    if (JSON.stringify(dataRef.current) !== savedJson.current) {
      if (!window.confirm('Preview shows the saved draft. Save your changes as a draft first?')) return
      if (!(await save())) return
    }
    window.open(`/cms/preview?path=${encodeURIComponent(page.path)}`, '_blank', 'noopener')
  }, [page.path, save])

  // Ctrl/Cmd+S saves a draft
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (!busy) void save()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, save])

  const state: EditorState = { page, role, dirty, busy, status, save, publish, preview }

  const overrides = useMemo(
    () => ({
      headerActions: () => <HeaderActions />,
      actionBar: SectionActionBar,
      // The canvas is an iframe: give it the site's fonts and body classes
      iframe: ({ children, document: doc }: { children: ReactNode; document?: Document }) => {
        if (doc) {
          doc.documentElement.className = fontClassName
          doc.documentElement.lang = 'en-IN'
          doc.body.className = 'min-h-screen flex flex-col font-body'
        }
        return <>{children}</>
      },
    }),
    [fontClassName],
  )

  return (
    <EditorContext.Provider value={state}>
      <Puck
        config={config}
        data={initialData}
        onChange={onChange}
        headerTitle={page.title}
        headerPath={page.path}
        overrides={overrides as never}
        iframe={{ enabled: true, waitForStyles: true }}
        viewports={[
          { width: 390, height: 'auto', label: 'Phone', icon: 'Smartphone' },
          { width: 820, height: 'auto', label: 'Tablet', icon: 'Tablet' },
          { width: 1440, height: 'auto', label: 'Computer', icon: 'Monitor' },
        ]}
      />
      <NoticeBar notice={notice} onClose={() => setNotice(null)} />
    </EditorContext.Provider>
  )
}
