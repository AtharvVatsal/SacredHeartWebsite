'use client'

/* eslint-disable @next/next/no-img-element -- thumbnails inside the editor panel, not page content */
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react'
import type { ImageValue } from '../../document/fields'

interface MediaDoc {
  id: number
  url?: string | null
  alt?: string | null
  label?: string | null
  filename?: string | null
  mimeType?: string | null
  width?: number | null
  height?: number | null
  sizes?: { thumbnail?: { url?: string | null } }
}

const EMPTY: ImageValue = { mediaId: null, src: '', alt: '', position: 'center' }

const POSITIONS: { value: ImageValue['position']; label: string }[] = [
  { value: 'center', label: 'Centre' },
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
]

const s = {
  box: { border: '1px solid #d1d5db', borderRadius: 8, padding: 10, background: '#fff' } as const,
  btn: { padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer', fontSize: 13 } as const,
  primary: { padding: '6px 10px', borderRadius: 6, border: '1px solid #15803d', background: '#15803d', color: '#fff', cursor: 'pointer', fontSize: 13 } as const,
  input: { width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 } as const,
}

async function readError(res: Response) {
  try {
    const body = await res.json()
    return body?.errors?.[0]?.message || body?.message || `The server answered ${res.status}`
  } catch {
    return `The server answered ${res.status}`
  }
}

/** Files on this site are kept as site-relative paths (see toSitePath in src/cms/render/media.ts) */
function sitePath(url: string | null | undefined) {
  if (!url) return ''
  try {
    const u = new URL(url, window.location.origin)
    return u.origin === window.location.origin ? u.pathname + u.search : url
  } catch {
    return url
  }
}

function toValue(doc: MediaDoc, current: ImageValue): ImageValue {
  return { mediaId: doc.id, src: sitePath(doc.url), alt: doc.alt ?? '', position: current.position ?? 'center', width: doc.width ?? undefined, height: doc.height ?? undefined }
}

type Kind = 'image' | 'pdf'

/** Media library browser shown in a dialog: images, or PDF documents */
function Library({ onPick, onClose, kind = 'image' }: { onPick: (doc: MediaDoc) => void; onClose: () => void; kind?: Kind }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const [docs, setDocs] = useState<MediaDoc[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const load = useCallback(async (q: string, p: number) => {
    setState('loading')
    const params = new URLSearchParams({ limit: '24', page: String(p), sort: '-createdAt', depth: '0' })
    params.set('where[mimeType][contains]', kind === 'pdf' ? 'pdf' : 'image')
    if (q) {
      params.set('where[or][0][alt][like]', q)
      params.set('where[or][1][label][like]', q)
      params.set('where[or][2][filename][like]', q)
      params.set('where[or][3][folder][like]', q)
    }
    try {
      const res = await fetch(`/api/media?${params}`, { credentials: 'same-origin' })
      if (!res.ok) throw new Error(await readError(res))
      const body = await res.json()
      setDocs(p === 1 ? body.docs : (prev: MediaDoc[]) => [...prev, ...body.docs])
      setHasMore(Boolean(body.hasNextPage))
      setPage(p)
      setState('ready')
    } catch (e) {
      setError((e as Error).message)
      setState('error')
    }
  }, [kind])

  useEffect(() => {
    const t = setTimeout(() => load(query, 1), query ? 300 : 0)
    return () => clearTimeout(t)
  }, [query, load])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label={kind === 'pdf' ? 'Choose a document' : 'Choose an image'}
      style={{ width: 'min(860px, 92vw)', maxHeight: '86vh', border: 'none', borderRadius: 12, padding: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
    >
      <div style={{ padding: 16, borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 10, alignItems: 'center' }}>
        <strong style={{ flex: 1, fontSize: 16 }}>{kind === 'pdf' ? 'Choose a PDF from the media library' : 'Choose an image from the media library'}</strong>
        <button type="button" style={s.btn} onClick={() => dialogRef.current?.close()}>
          Close
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <input style={s.input} type="search" placeholder="Search by description, name or folder" value={query} onChange={(e) => setQuery(e.target.value)} aria-label={kind === 'pdf' ? 'Search documents' : 'Search images'} />
        {state === 'error' && <p style={{ color: '#b91c1c', fontSize: 14 }}>The library could not be loaded: {error}</p>}
        {state !== 'error' && docs.length === 0 && state === 'ready' && <p style={{ color: '#4b5563', fontSize: 14 }}>{kind === 'pdf' ? 'No PDFs found. Upload one with “Upload a PDF”.' : 'No images found. Upload one with “Upload new image”.'}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginTop: 12, maxHeight: '58vh', overflowY: 'auto' }}>
          {docs.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                onPick(d)
                dialogRef.current?.close()
              }}
              style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 4, background: '#fff', cursor: 'pointer', textAlign: 'left' }}
              title={d.alt || d.filename || ''}
            >
              {kind === 'pdf' ? (
                <span style={{ display: 'grid', placeItems: 'center', aspectRatio: '4 / 3', borderRadius: 6, background: '#fef2f2', color: '#b91c1c', fontWeight: 700, fontSize: 18 }}>PDF</span>
              ) : (
                <img src={d.sizes?.thumbnail?.url || d.url || ''} alt="" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 6, display: 'block' }} />
              )}
              <span style={{ display: 'block', fontSize: 12, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.label || d.alt || d.filename}</span>
            </button>
          ))}
        </div>
        {state === 'loading' && <p style={{ fontSize: 14, color: '#4b5563' }}>Loading…</p>}
        {hasMore && state === 'ready' && (
          <button type="button" style={{ ...s.btn, marginTop: 12 }} onClick={() => load(query, page + 1)}>
            Show more
          </button>
        )}
      </div>
    </dialog>
  )
}

/** The image field: preview, choose from the library, upload a new file, describe it, choose its focus */
export function ImagePickerField({ value, onChange, readOnly, id }: { value: ImageValue | undefined; onChange: (v: ImageValue) => void; readOnly?: boolean; id: string }) {
  const current = { ...EMPTY, ...(value ?? {}) }
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const alt = window.prompt('Describe this image for people who cannot see it (for example "Students at the annual sports day"):', '')
    if (alt === null) return
    if (!alt.trim()) {
      setMessage({ tone: 'error', text: 'The image was not uploaded: a description is required.' })
      return
    }
    setUploading(true)
    setMessage(null)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('_payload', JSON.stringify({ alt: alt.trim(), label: file.name.replace(/\.[^.]+$/, '') }))
      const res = await fetch('/api/media', { method: 'POST', body: form, credentials: 'same-origin' })
      if (!res.ok) throw new Error(await readError(res))
      const body = await res.json()
      onChange(toValue(body.doc as MediaDoc, current))
      setMessage({ tone: 'ok', text: 'Uploaded and added to the media library.' })
    } catch (err) {
      setMessage({ tone: 'error', text: `Upload failed: ${(err as Error).message}` })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={s.box}>
      {current.src ? (
        <img src={current.src} alt="" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', objectPosition: current.position, borderRadius: 6, display: 'block' }} />
      ) : (
        <div style={{ height: 80, display: 'grid', placeItems: 'center', background: '#f3f4f6', borderRadius: 6, color: '#6b7280', fontSize: 13 }}>No image chosen</div>
      )}
      {!readOnly && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          <button type="button" style={s.primary} onClick={() => setLibraryOpen(true)}>
            Choose from library
          </button>
          <button type="button" style={s.btn} onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload new image'}
          </button>
          {current.src && (
            <button type="button" style={s.btn} onClick={() => onChange({ ...EMPTY })}>
              Remove
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" hidden onChange={upload} />
        </div>
      )}
      {message && <p style={{ fontSize: 12, marginTop: 6, color: message.tone === 'error' ? '#b91c1c' : '#15803d' }}>{message.text}</p>}
      {current.src && (
        <>
          <label htmlFor={`${id}-alt`} style={{ display: 'block', fontSize: 12, fontWeight: 600, marginTop: 10 }}>
            Description for screen readers
          </label>
          <input id={`${id}-alt`} style={s.input} value={current.alt} readOnly={readOnly} onChange={(e) => onChange({ ...current, alt: e.target.value })} placeholder="What does the picture show?" />
          <label htmlFor={`${id}-pos`} style={{ display: 'block', fontSize: 12, fontWeight: 600, marginTop: 8 }}>
            Keep this part visible when cropped
          </label>
          <select id={`${id}-pos`} style={s.input} value={current.position} disabled={readOnly} onChange={(e) => onChange({ ...current, position: e.target.value as ImageValue['position'] })}>
            {POSITIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </>
      )}
      {libraryOpen && <Library onPick={(doc) => onChange(toValue(doc, current))} onClose={() => setLibraryOpen(false)} />}
    </div>
  )
}

/**
 * A link to a document: type or paste any allowed address, or pick a PDF from the media library, or upload
 * one. The value is the address (site files are stored as site paths).
 */
export function DocumentLinkField({ value, onChange, readOnly, id, label }: { value: string | undefined; onChange: (v: string) => void; readOnly?: boolean; id: string; label?: string }) {
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    setMessage(null)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('_payload', JSON.stringify({ label: file.name.replace(/\.[^.]+$/, '') }))
      const res = await fetch('/api/media', { method: 'POST', body: form, credentials: 'same-origin' })
      if (!res.ok) throw new Error(await readError(res))
      const body = await res.json()
      onChange(sitePath((body.doc as MediaDoc).url))
      setMessage({ tone: 'ok', text: 'Uploaded and added to the media library.' })
    } catch (err) {
      setMessage({ tone: 'error', text: `Upload failed: ${(err as Error).message}` })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={s.box}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
          {label}
        </label>
      )}
      <input id={id} name={id} style={s.input} value={value ?? ''} readOnly={readOnly} onChange={(e) => onChange(e.target.value)} placeholder="/documents/notice.pdf or https://…" />
      {!readOnly && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          <button type="button" style={s.primary} onClick={() => setLibraryOpen(true)}>
            Choose a PDF
          </button>
          <button type="button" style={s.btn} onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload a PDF'}
          </button>
          {value && (
            <button type="button" style={s.btn} onClick={() => onChange('')}>
              Remove
            </button>
          )}
          <input ref={fileRef} type="file" accept="application/pdf" hidden onChange={upload} />
        </div>
      )}
      {message && <p style={{ fontSize: 12, marginTop: 6, color: message.tone === 'error' ? '#b91c1c' : '#15803d' }}>{message.text}</p>}
      {libraryOpen && <Library kind="pdf" onPick={(doc) => onChange(sitePath(doc.url))} onClose={() => setLibraryOpen(false)} />}
    </div>
  )
}
