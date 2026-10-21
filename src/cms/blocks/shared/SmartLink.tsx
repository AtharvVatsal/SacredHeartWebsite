import Link from 'next/link'
import type { ReactNode } from 'react'
import { isSafeHref } from '../../document/fields'

/** Internal addresses use client-side navigation; other websites open in a new tab and say so to screen readers */
export function SmartLink({ href, className, children, newTab }: { href: string; className?: string; children: ReactNode; newTab?: boolean }) {
  if (!href || !isSafeHref(href)) return <span className={className}>{children}</span>
  const internal = href.startsWith('/') || href.startsWith('#')
  const external = newTab ?? /^https?:\/\//i.test(href)
  if (internal && !newTab) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
