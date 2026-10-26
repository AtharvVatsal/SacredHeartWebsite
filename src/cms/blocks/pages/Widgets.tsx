'use client'

// Interactive pages, rendered by the site's own components with the content edited in the CMS
import { useMemo } from 'react'
import NotificationsView from '@/components/notifications/NotificationsView'
import type { BlockProps } from '../../document/definition'
import { toNotifications } from '../shared/linked'
import type { NotificationsBoard as BoardDef } from './widgets.definitions'

export function NotificationsBoard({ badge, title, subtitle, notices, ctaTitle, ctaText, ctaButton }: BlockProps<typeof BoardDef>) {
  const list = useMemo(() => toNotifications(notices), [notices])
  return <NotificationsView notifications={list} badge={badge} title={title} subtitle={subtitle} ctaTitle={ctaTitle} ctaText={ctaText} ctaButton={ctaButton} />
}
