'use client'

// The visual editor's configuration, built from the same block registry and components the public site
// renders, so the canvas shows the real sections.
import type { ComponentConfig, Config, Fields } from '@puckeditor/core'
import type { ReactNode } from 'react'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import { RevealAllContext } from '@/components/animations/RevealContext'
import { SiteSettingsProvider } from '@/components/providers/SiteSettingsProvider'
import type { SiteSettings } from '@/lib/site-settings'
import { blockComponents } from '../blocks/components'
import { blockDefinitions, defaultPropsFor } from '../blocks/definitions'
import { CATEGORIES, type CategoryKey } from '../document/definition'
import { commonFields } from './fields/helpers'
import { generalFields } from './fields/general'
import { homeFields } from './fields/home'

const FIELDS: Record<string, Fields> = { ...generalFields, ...homeFields }

const HIDE_ON_LABEL: Record<string, string> = { mobile: 'Shown on computers and tablets only', desktop: 'Shown on phones only' }

function EditorBlockFrame({ hidden, hideOn, label, children }: { hidden?: boolean; hideOn?: string; label: string; children: ReactNode }) {
  if (!hidden && (!hideOn || hideOn === 'none')) return <>{children}</>
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ opacity: hidden ? 0.35 : 1 }}>{children}</div>
      <span
        style={{ position: 'absolute', top: 8, left: 8, zIndex: 50, background: '#111827', color: '#fff', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}
      >
        {hidden ? `Hidden from visitors: ${label}` : HIDE_ON_LABEL[hideOn ?? ''] ?? ''}
      </span>
    </div>
  )
}

export function createPuckConfig(settings: SiteSettings): Config {
  const components: Record<string, ComponentConfig> = {}

  for (const def of blockDefinitions) {
    const Component = blockComponents[def.type]
    if (!Component) continue
    const slots = def.slots ?? []
    const slotFields: Fields = Object.fromEntries(slots.map((s) => [s, { type: 'slot', allow: def.slotAllow ? [...def.slotAllow] : undefined }]))

    components[def.type] = {
      label: def.label,
      fields: { ...(FIELDS[def.type] ?? {}), ...slotFields, ...commonFields } as Fields,
      defaultProps: defaultPropsFor(def.type),
      permissions: def.locked ? { delete: false } : undefined,
      render: (renderProps: Record<string, unknown>) => {
        // puck, editMode and id are Puck internals, not block props
        const { puck, editMode, id, hidden, hideOn, ...props } = renderProps as Record<string, unknown> & { hidden?: boolean; hideOn?: string }
        for (const s of slots) {
          const SlotArea = props[s] as ((p?: object) => ReactNode) | undefined
          props[s] = SlotArea ? <SlotArea /> : null
        }
        return (
          <EditorBlockFrame hidden={hidden} hideOn={hideOn} label={def.label}>
            <Component {...props} />
          </EditorBlockFrame>
        )
      },
    }
  }

  const categories = Object.fromEntries(
    (Object.keys(CATEGORIES) as CategoryKey[])
      .map((key) => [key, { title: CATEGORIES[key], components: blockDefinitions.filter((d) => d.category === key).map((d) => d.type) }])
      .filter(([, c]) => (c as { components: string[] }).components.length > 0),
  )

  return {
    components,
    categories,
    root: {
      fields: {},
      render: ({ children }: { children: ReactNode }) => (
        <SmoothScrollProvider>
          {/* Show every section straight away: scroll-triggered reveals do not fire reliably in the canvas iframe */}
          <RevealAllContext.Provider value>
            <SiteSettingsProvider settings={settings}>
              <main className="flex-grow outline-none">{children}</main>
            </SiteSettingsProvider>
          </RevealAllContext.Provider>
        </SmoothScrollProvider>
      ),
    },
  } as Config
}
