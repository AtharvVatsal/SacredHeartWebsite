import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { isSafeHref } from '@/cms/document/fields'
import { Inline, Paragraphs, plainText } from '@/cms/blocks/shared/InlineText'
import { checkPath, isReservedPath, normalizePath } from '@/cms/paths'
import { toSitePath } from '@/cms/render/media'

describe('inline text rendering', () => {
  it('escapes HTML instead of rendering it', () => {
    const html = renderToStaticMarkup(<Inline text={'<script>alert(1)</script><img src=x onerror=alert(1)>'} />)
    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<img')
    expect(html).toContain('&lt;script&gt;')
  })

  it('understands bold, highlight, italic and links', () => {
    const html = renderToStaticMarkup(<Inline text="A **bold** and ==gold== and *italic* [link](/contact)" />)
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('class="text-secondary-400 font-bold">gold</strong>')
    expect(html).toContain('<em>italic</em>')
    expect(html).toContain('href="/contact"')
  })

  it('never turns an unsafe link into an anchor', () => {
    const html = renderToStaticMarkup(<Inline text="[click](javascript:alert(1)) [data](data:text/html,x)" />)
    expect(html).not.toContain('href=')
    expect(html).toContain('click')
  })

  it('opens other websites in a new tab with a screen-reader note', () => {
    const html = renderToStaticMarkup(<Inline text="[portal](https://shsd.iqdigit.com/)" />)
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).toContain('opens in a new tab')
  })

  it('splits paragraphs on blank lines', () => {
    const html = renderToStaticMarkup(<Paragraphs text={'One\n\nTwo\nline'} className="p" />)
    expect(html).toBe('<p class="p">One</p><p class="p">Two<br/>line</p>')
  })

  it('strips formatting for plain text', () => {
    expect(plainText('**A** ==B== *C* [D](/x)')).toBe('A B C D')
  })
})

describe('link safety', () => {
  it.each(['javascript:alert(1)', 'data:text/html,x', '//evil.example', 'file:///etc/passwd', 'http ://x', ''])('rejects %j', (v) => expect(isSafeHref(v)).toBe(false))
  it.each(['/', '/about/history', '#top', 'https://example.org/a?b=c', 'http://example.org', 'mailto:a@b.co', 'tel:01892-222428'])('accepts %j', (v) => expect(isSafeHref(v)).toBe(true))
})

describe('page addresses', () => {
  it('tidies what people type', () => {
    expect(normalizePath(' Events/Sports Day 2026/ ')).toBe('/events/sports-day-2026')
    expect(normalizePath('/About__Us?x=1#top')).toBe('/about-us')
    expect(normalizePath('')).toBe('/')
  })

  it('keeps system addresses reserved', () => {
    for (const p of ['/admin', '/admin/x', '/api/pages', '/cms/editor/1', '/_next/static', '/robots.txt', '/sitemap.xml', '/images/a.png']) expect(isReservedPath(p)).toBe(true)
    expect(isReservedPath('/administration')).toBe(false)
  })

  it('stops new pages from taking a built-in or reserved address', () => {
    expect(checkPath('/about', 'custom')).toMatch(/built-in/)
    expect(checkPath('/admin', 'custom')).toMatch(/system/)
    expect(checkPath('/events/sports-day', 'custom')).toBeNull()
    expect(checkPath('/Events', 'custom')).toMatch(/lowercase/)
    expect(checkPath('/a/b/c/d/e', 'custom')).toMatch(/four levels/)
  })

  it('only lets built-in pages use built-in addresses', () => {
    expect(checkPath('/about', 'builtIn')).toBeNull()
    expect(checkPath('/new-thing', 'builtIn')).toMatch(/not one of the built-in/)
  })
})

describe('media addresses', () => {
  it('stores files on this site as site-relative paths', () => {
    expect(toSitePath('http://localhost:3000/api/media/file/a.webp', 'http://localhost:3000')).toBe('/api/media/file/a.webp')
    expect(toSitePath('https://shsdharamshala.com/api/media/file/a.webp', 'https://shsdharamshala.com')).toBe('/api/media/file/a.webp')
    expect(toSitePath('/api/media/file/a.webp', 'https://shsdharamshala.com')).toBe('/api/media/file/a.webp')
  })

  it('keeps files hosted elsewhere (object storage) as they are', () => {
    expect(toSitePath('https://media.example.org/a.webp', 'https://shsdharamshala.com')).toBe('https://media.example.org/a.webp')
  })
})
