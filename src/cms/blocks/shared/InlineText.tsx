// Text typed in the editor becomes React elements here, never HTML. A small, safe set of formatting is
// understood: **bold**, ==highlight== (the site's gold emphasis), *italic* and [link text](/address).
// Blank lines start a new paragraph.
import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { isSafeHref } from '../../document/fields'

const TOKEN = /(\*\*[^*\n]+\*\*|==[^=\n]+==|\*[^*\s][^*\n]*\*|\[[^\]\n]+\]\([^)\s]+\))/g

interface InlineProps {
  text: string | null | undefined
  /** Classes for **bold** parts */
  strongClassName?: string
  /** Classes for ==highlighted== parts (default: the site's gold emphasis) */
  highlightClassName?: string
  linkClassName?: string
}

function renderLink(label: string, href: string, key: number, className?: string) {
  if (!isSafeHref(href)) return <Fragment key={key}>{label}</Fragment>
  const cls = className ?? 'font-semibold underline underline-offset-2'
  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link key={key} href={href} className={cls}>
        {label}
      </Link>
    )
  }
  const external = /^https?:/i.test(href)
  return (
    <a key={key} href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

function parseLine(line: string, props: InlineProps): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  for (const match of line.matchAll(TOKEN)) {
    const token = match[0]
    const start = match.index ?? 0
    if (start > last) out.push(line.slice(last, start))
    if (token.startsWith('**')) out.push(<strong key={i++} className={props.strongClassName}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('==')) out.push(<strong key={i++} className={props.highlightClassName ?? 'text-secondary-400 font-bold'}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('*')) out.push(<em key={i++}>{token.slice(1, -1)}</em>)
    else {
      const [, label, href] = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/) ?? []
      out.push(renderLink(label ?? token, href ?? '', i++, props.linkClassName))
    }
    last = start + token.length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

/** One line of text with inline formatting; line breaks become <br /> */
export function Inline(props: InlineProps) {
  const text = props.text ?? ''
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, n) => (
        <Fragment key={n}>
          {n > 0 && <br />}
          {parseLine(line, props)}
        </Fragment>
      ))}
    </>
  )
}

/** Several paragraphs (separated by a blank line), each rendered as <p className={className}> */
export function Paragraphs({ text, className, ...rest }: InlineProps & { className?: string }) {
  const paragraphs = (text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  return (
    <>
      {paragraphs.map((p, n) => (
        <p key={n} className={className}>
          <Inline text={p} {...rest} />
        </p>
      ))}
    </>
  )
}

/** Plain text without the formatting markers, e.g. for alt text or titles */
export function plainText(text: string | null | undefined) {
  return (text ?? '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/==([^=]+)==/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}
