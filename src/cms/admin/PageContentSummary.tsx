'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

/** In place of the raw content data: what the page contains and a button to the visual editor */
export function PageContentSummary() {
  const { id, hasPublishedDoc, unpublishedVersionCount } = useDocumentInfo()
  const content = useFormFields(([fields]) => fields.content?.value) as { content?: unknown[] } | undefined
  const sections = Array.isArray(content?.content) ? content.content.length : 0

  return (
    <div style={{ margin: '8px 0 28px', padding: '18px 20px', borderRadius: 10, border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-elevation-50)' }}>
      <strong style={{ display: 'block', marginBottom: 4 }}>Page sections</strong>
      {id ? (
        <>
          <p style={{ margin: '0 0 12px', color: 'var(--theme-elevation-700)' }}>
            {sections ? `This page has ${sections} section${sections === 1 ? '' : 's'}.` : 'This page has no sections yet.'}{' '}
            {hasPublishedDoc ? (unpublishedVersionCount > 0 ? 'There are unpublished changes.' : 'It is published.') : 'It has not been published yet.'}
          </p>
          <a href={`/cms/editor/${id}`} style={{ color: '#15803d', fontWeight: 600 }}>
            Edit the sections visually →
          </a>
        </>
      ) : (
        <p style={{ margin: 0, color: 'var(--theme-elevation-700)' }}>Save the page name and address first; then you can build it in the visual editor.</p>
      )}
    </div>
  )
}
