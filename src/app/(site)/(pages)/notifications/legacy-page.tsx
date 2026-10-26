'use client'

import { notifications as defaultNotifications } from '@/data/school'
import { useNotifications } from '@/lib/useCMS'
import type { Notification } from '@/types'
import NotificationsView from '@/components/notifications/NotificationsView'

export default function NotificationsPage() {
  const { data: notifications } = useNotifications()
  const notifs: Notification[] = notifications || defaultNotifications

  return <NotificationsView notifications={notifs} />
}
