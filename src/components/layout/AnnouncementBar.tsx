'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import type { SiteSettings } from '@/lib/site-settings'

const KEY = 'shs-announcement-dismissed'

/**
 * Optional site-wide message from Site settings → Announcement. It floats above the bottom edge so it never
 * moves the page layout, and a visitor can close it (remembered for the rest of their visit only).
 */
export default function AnnouncementBar({ announcement }: { announcement: SiteSettings['announcement'] }) {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === announcement.message
    } catch {
      // storage can be unavailable (private mode); then the message simply shows each time
    }
    setDismissed(seen)
  }, [announcement.message])

  if (!announcement.enabled || !announcement.message || dismissed) return null

  const important = announcement.tone === 'important'
  const close = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(KEY, announcement.message)
    } catch {
      // ignore
    }
  }
  const external = /^https?:\/\//.test(announcement.linkHref)

  return (
    <div role="region" aria-label="Announcement" className="fixed inset-x-3 bottom-3 z-[35] mx-auto max-w-3xl print:hidden">
      <div
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:px-5 ${
          important ? 'bg-secondary-400 text-primary-950' : 'bg-primary-800 text-white'
        }`}
      >
        <p className="flex-1 text-sm font-medium leading-snug sm:text-[15px]">{announcement.message}</p>
        {announcement.linkLabel && announcement.linkHref && (
          external ? (
            <a
              href={announcement.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${important ? 'bg-primary-900 text-white hover:bg-primary-950' : 'bg-white text-primary-900 hover:bg-secondary-100'}`}
            >
              {announcement.linkLabel}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link
              href={announcement.linkHref}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${important ? 'bg-primary-900 text-white hover:bg-primary-950' : 'bg-white text-primary-900 hover:bg-secondary-100'}`}
            >
              {announcement.linkLabel}
            </Link>
          )
        )}
        <button
          type="button"
          onClick={close}
          aria-label="Close announcement"
          className={`-mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${important ? 'hover:bg-primary-900/10' : 'hover:bg-white/10'}`}
        >
          <X aria-hidden size={18} />
        </button>
      </div>
    </div>
  )
}
