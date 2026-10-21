import type { ReactNode } from 'react'
import { blockComponents } from '../blocks/components'
import { blockRegistry } from '../blocks/definitions'
import type { BlockData } from '../document/types'

/**
 * Renders validated blocks with their real components. Hidden sections render nothing for visitors and a
 * small note in preview; "hide on phone/desktop" wraps the block in a box-less element so the layout is
 * identical to rendering the block directly.
 */
export function RenderBlocks({ blocks, preview = false }: { blocks: BlockData[]; preview?: boolean }) {
  return <>{blocks.map((block) => renderBlock(block, preview))}</>
}

function renderBlock(block: BlockData, preview: boolean): ReactNode {
  const Component = blockComponents[block.type]
  const def = blockRegistry[block.type]
  if (!Component || !def) return null
  const { id, hidden, hideOn, ...props } = block.props as Record<string, unknown> & { id: string; hidden?: boolean; hideOn?: string }

  if (hidden) {
    return preview ? (
      <div key={id} className="container mx-auto px-4 py-3">
        <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-600">Hidden section: {def.label} (visitors do not see it)</p>
      </div>
    ) : null
  }

  for (const slot of def.slots ?? []) {
    const children = props[slot]
    props[slot] = Array.isArray(children) ? <RenderBlocks blocks={children as BlockData[]} preview={preview} /> : null
  }

  const element = <Component key={id} {...props} />
  if (hideOn === 'mobile') return <div key={id} className="hidden md:contents">{element}</div>
  if (hideOn === 'desktop') return <div key={id} className="contents md:hidden">{element}</div>
  return element
}
