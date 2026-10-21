'use client'

import { useDocumentInfo } from '@payloadcms/ui'

/** "Edit visually" next to Save/Publish on a page's admin screen */
export function OpenEditorButton() {
  const { id } = useDocumentInfo()
  if (!id) return null
  return (
    <a
      href={`/cms/editor/${id}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 34,
        padding: '0 16px',
        borderRadius: 6,
        background: '#15803d',
        color: '#fff',
        fontWeight: 600,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      Edit visually
    </a>
  )
}
