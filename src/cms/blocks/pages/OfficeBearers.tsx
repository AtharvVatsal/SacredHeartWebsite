'use client'

// Office bearers by session: the site's own OfficeBearersBrowser, fed with the sessions edited in the CMS
import { useMemo } from 'react'
import OfficeBearersBrowser from '@/components/about/OfficeBearersBrowser'
import type { OfficeBearerSession } from '@/types'
import type { BlockProps } from '../../document/definition'
import type { OfficeBearersList as ListDef } from './about.definitions'

export function OfficeBearersList({ sessions, messagesHref }: BlockProps<typeof ListDef>) {
  const data: OfficeBearerSession[] = useMemo(
    () =>
      sessions.map((s) => ({
        ...s,
        headGirlImage: s.headGirlImage.src || undefined,
        headBoyImage: s.headBoyImage.src || undefined,
        editorialMembers: s.editorialMembers || undefined,
        prefects: s.prefects.map((p) => ({ names: p.names, ...(p.house ? { house: p.house } : {}) })),
        juniorCaptains: s.juniorCaptains.length ? s.juniorCaptains : undefined,
      })),
    [sessions],
  )
  return <OfficeBearersBrowser sessions={data} messagesHref={messagesHref || undefined} />
}
