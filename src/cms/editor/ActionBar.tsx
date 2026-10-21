'use client'

import { ActionBar, useGetPuck } from '@puckeditor/core'
import { Copy, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * The small toolbar on a selected section: select parent, duplicate, delete. Deleting asks first, and sections
 * marked as essential (forms, directories) cannot be deleted. Undo (Ctrl+Z) also brings back a deleted section.
 */
export function SectionActionBar({ label, parentAction }: { label?: string; children: ReactNode; parentAction: ReactNode }) {
  const getPuck = useGetPuck()

  const current = () => {
    const puck = getPuck()
    const item = puck.selectedItem
    if (!item) return null
    const selector = puck.getSelectorForId(item.props.id as string)
    if (!selector) return null
    return { puck, item, selector }
  }

  const duplicate = () => {
    const c = current()
    if (!c) return
    c.puck.dispatch({ type: 'duplicate', sourceIndex: c.selector.index, sourceZone: c.selector.zone })
  }

  const remove = () => {
    const c = current()
    if (!c) return
    const allowed = c.puck.getPermissions({ item: c.item }).delete
    if (!allowed) {
      window.alert('This section is an essential feature of the page and cannot be deleted. You can hide it instead (in its settings).')
      return
    }
    const name = c.puck.config.components[c.item.type]?.label ?? 'this section'
    if (window.confirm(`Delete “${name}” from the page?\n\nYou can undo this with Ctrl+Z (or the undo button) until you leave the editor.`)) {
      c.puck.dispatch({ type: 'remove', index: c.selector.index, zone: c.selector.zone })
    }
  }

  return (
    <ActionBar label={label}>
      <ActionBar.Group>
        {parentAction}
        {label && <ActionBar.Label label={label} />}
      </ActionBar.Group>
      <ActionBar.Group>
        <ActionBar.Action onClick={duplicate} label="Duplicate section">
          <Copy size={16} />
        </ActionBar.Action>
        <ActionBar.Action onClick={remove} label="Delete section">
          <Trash2 size={16} />
        </ActionBar.Action>
      </ActionBar.Group>
    </ActionBar>
  )
}
