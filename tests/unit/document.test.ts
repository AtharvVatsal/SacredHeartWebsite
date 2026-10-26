import { describe, expect, it } from 'vitest'
import { blockDefinitions, blockRegistry, defaultPropsFor } from '@/cms/blocks/definitions'
import { CURRENT_SCHEMA_VERSION, migrateDocument, migrations } from '@/cms/document/migrations'
import type { PageDocument } from '@/cms/document/types'
import { MAX_DEPTH, validateDocument } from '@/cms/document/validate'
import { homePage } from '@/cms/seed/pages/home'
import { toSiteSettings } from '@/cms/render/settings-map'
import { defaultSiteSettings } from '@/lib/site-settings'
import type { SiteSetting } from '@/payload-types'

const doc = (content: unknown[]): unknown => ({ root: { props: {} }, content })
const block = (type: string, props: Record<string, unknown> = {}, id = `${type}-1`) => ({ type, props: { id, ...defaultPropsFor(type), ...props } })

describe('block registry', () => {
  it('gives every block valid defaults (a section added from the library can be published as is)', () => {
    for (const def of blockDefinitions) {
      const result = validateDocument(doc([block(def.type)]), blockRegistry, 'strict')
      expect(result.issues, def.type).toEqual([])
    }
  })

  it('has unique block types with readable labels', () => {
    const types = blockDefinitions.map((d) => d.type)
    expect(new Set(types).size).toBe(types.length)
    for (const d of blockDefinitions) expect(d.label.length).toBeGreaterThan(3)
  })
})

describe('validateDocument', () => {
  it('accepts the seeded home page in strict mode', () => {
    const r = validateDocument(homePage.document, blockRegistry, 'strict')
    expect(r.issues).toEqual([])
    expect(r.ok).toBe(true)
    expect(r.document.content).toHaveLength(12)
  })

  it('reports unknown section types in strict mode and drops them in repair mode', () => {
    const input = doc([block('TextSection'), { type: 'EvilScript', props: { id: 'x1', html: '<script>alert(1)</script>' } }])
    const strict = validateDocument(input, blockRegistry, 'strict')
    expect(strict.ok).toBe(false)
    expect(strict.issues.some((i) => i.type === 'EvilScript')).toBe(true)
    const repaired = validateDocument(input, blockRegistry, 'repair')
    expect(repaired.document.content.map((b) => b.type)).toEqual(['TextSection'])
  })

  it.each(['javascript:alert(1)', 'JAVASCRIPT:alert(1)', 'data:text/html,<script>', '//evil.example/x', 'vbscript:x', ' javascript:alert(1)'])('rejects the unsafe link %s', (bad) => {
    const input = doc([block('ButtonRow', { buttons: [{ label: 'Go', href: bad, style: 'green' }] })])
    const strict = validateDocument(input, blockRegistry, 'strict')
    expect(strict.ok).toBe(false)
    // Repair falls back to the default for that field rather than keeping the bad link
    const repaired = validateDocument(input, blockRegistry, 'repair')
    expect(JSON.stringify(repaired.document)).not.toContain(bad.trim())
  })

  it.each(['/contact', '#apply', 'https://shsd.iqdigit.com/', 'mailto:office@example.org', 'tel:+91 1892 222428'])('accepts the safe link %s', (good) => {
    const input = doc([block('ButtonRow', { buttons: [{ label: 'Go', href: good, style: 'green' }] })])
    expect(validateDocument(input, blockRegistry, 'strict').issues).toEqual([])
  })

  it('rejects image addresses that are not site paths or https', () => {
    const input = doc([block('ImageBlock', { image: { mediaId: null, src: 'http://evil.example/a.png', alt: 'x', position: 'center' } })])
    expect(validateDocument(input, blockRegistry, 'strict').ok).toBe(false)
  })

  it('rejects over-long text and unknown choices in strict mode, repairs them for rendering', () => {
    const input = doc([block('TextSection', { look: { background: 'neon-pink', spacing: 'normal', width: 'normal', align: 'left' }, body: 'x'.repeat(7000) })])
    const strict = validateDocument(input, blockRegistry, 'strict')
    expect(strict.ok).toBe(false)
    const repaired = validateDocument(input, blockRegistry, 'repair')
    const props = repaired.document.content[0].props as unknown as { look: { background: string }; body: string }
    expect(props.look.background).toBe('white')
    expect(props.body.length).toBeLessThan(7000)
  })

  it('strips properties a block does not define', () => {
    const r = validateDocument(doc([block('TextSection', { onclick: 'alert(1)', dangerouslySetInnerHTML: { __html: '<b>x</b>' } })]), blockRegistry, 'strict')
    expect(r.ok).toBe(true)
    expect(r.document.content[0].props).not.toHaveProperty('onclick')
    expect(r.document.content[0].props).not.toHaveProperty('dangerouslySetInnerHTML')
  })

  it('flags duplicate or missing ids in strict mode and fixes them in repair mode', () => {
    const input = doc([block('Spacer', {}, 'same'), block('Spacer', {}, 'same'), { type: 'Spacer', props: { ...defaultPropsFor('Spacer') } }])
    expect(validateDocument(input, blockRegistry, 'strict').ok).toBe(false)
    const ids = validateDocument(input, blockRegistry, 'repair').document.content.map((b) => b.props.id)
    expect(new Set(ids).size).toBe(3)
  })

  it('validates nested blocks inside columns and enforces what may be placed there', () => {
    const allowed = block('Columns', { col1: [block('InfoCard', {}, 'card-1')] })
    expect(validateDocument(doc([allowed]), blockRegistry, 'strict').issues).toEqual([])
    const notAllowed = block('Columns', { col1: [block('HomeHero', {}, 'hero-in-column')] })
    const r = validateDocument(doc([notAllowed]), blockRegistry, 'strict')
    expect(r.ok).toBe(false)
    expect(r.issues[0].message).toMatch(/cannot be placed here/)
    const badNested = block('Columns', { col1: [block('InfoCard', { link: { label: 'x', href: 'javascript:alert(1)' } }, 'card-2')] })
    expect(validateDocument(doc([badNested]), blockRegistry, 'strict').ok).toBe(false)
  })

  it('limits nesting depth', () => {
    let inner: unknown = block('InfoCard', {}, 'deep-card')
    for (let i = 0; i < MAX_DEPTH + 2; i++) inner = { type: 'Columns', props: { id: `cols-${i}`, ...defaultPropsFor('Columns'), col1: [inner] } }
    const r = validateDocument(doc([inner]), { ...blockRegistry, Columns: { ...blockRegistry.Columns, slotAllow: undefined } }, 'strict')
    expect(r.issues.some((i) => /nested too deeply/.test(i.message))).toBe(true)
  })

  it('rejects documents that are not page documents', () => {
    for (const bad of ['<html>', 42, [], { content: 'nope' }]) {
      expect(validateDocument(bad, blockRegistry, 'strict').ok).toBe(false)
    }
  })

  it('rejects oversized documents', () => {
    const big = doc(Array.from({ length: 400 }, (_, i) => block('TextSection', { body: 'y'.repeat(5000) }, `t-${i}`)))
    const r = validateDocument(big, blockRegistry, 'strict')
    expect(r.ok).toBe(false)
    expect(r.issues[0].message).toMatch(/too large/)
  })
})

describe('document migrations', () => {
  it('has exactly one migration per schema version step', () => {
    expect(migrations).toHaveLength(CURRENT_SCHEMA_VERSION - 1)
  })

  it('leaves current documents unchanged and treats missing versions as version 1', () => {
    const d = homePage.document as PageDocument
    expect(migrateDocument(d, CURRENT_SCHEMA_VERSION)).toEqual(d)
    expect(migrateDocument(d, null)).toEqual(d)
  })
})

describe('image addresses', () => {
  const imageDoc = (src: string): PageDocument => ({
    root: { props: {} },
    content: [{ type: 'ImageBlock', props: { id: 'img-1', image: { mediaId: 3, src, alt: 'A photo', position: 'center' } } }],
  })
  const srcOf = (doc: PageDocument) => (doc.content[0].props as unknown as { image: { src: string } }).image.src

  it('stores full addresses of this site’s media files as site paths, so they can be published', () => {
    const result = validateDocument(imageDoc('http://localhost:3000/api/media/file/Hero_1.webp'), blockRegistry, 'strict')
    expect(result.issues).toEqual([])
    expect(srcOf(result.document)).toBe('/api/media/file/Hero_1.webp')
  })

  it('still refuses plain http addresses on other sites', () => {
    const result = validateDocument(imageDoc('http://example.com/photo.jpg'), blockRegistry, 'strict')
    expect(result.issues.length).toBeGreaterThan(0)
  })
})

describe('shared figures', () => {
  type Item = { value?: string; suffix?: string; count?: string }
  const linkedItems = blockDefinitions.flatMap((def) =>
    Object.values(defaultPropsFor(def.type))
      .filter((v): v is Item[] => Array.isArray(v))
      .flatMap((list) => list.filter((i) => i && typeof i === 'object' && typeof i.count === 'string' && i.count !== 'none' && i.count !== 'staff'))
      .map((i) => ({ type: def.type, ...i })),
  )

  it('links the default figures to Site settings values that read the same, so nothing changes on screen', () => {
    expect(linkedItems.length).toBeGreaterThanOrEqual(15)
    const { figures, identity } = defaultSiteSettings
    for (const i of linkedItems) {
      const shown = i.count === 'established' ? String(identity.established) : figures[i.count as keyof typeof figures]
      expect(`${i.value}${i.suffix ?? ''}`, `${i.type} ${i.count}`).toBe(shown)
    }
  })

  it('keeps figures saved before linking existed as typed', () => {
    const r = validateDocument(doc([block('StatsRow', { stats: [{ value: '57', suffix: '+', label: 'Glorious Years' }] })]), blockRegistry, 'strict')
    expect(r.issues).toEqual([])
    expect((r.document.content[0].props as unknown as { stats: Item[] }).stats[0].count).toBe('none')
  })

  it('reads saved Site settings figures, and keeps the built-in figure for an empty one', () => {
    const s = toSiteSettings({ id: 1, figures: { years: '57+', students: '' } } as unknown as SiteSetting)
    expect(s.figures.years).toBe('57+')
    expect(s.figures.students).toBe(defaultSiteSettings.figures.students)
    expect(s.figures.libraryBooks).toBe('24K+')
  })
})
