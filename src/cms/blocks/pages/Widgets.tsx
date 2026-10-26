'use client'

// Interactive pages, rendered by the site's own components with the content edited in the CMS
import { useMemo } from 'react'
import NotificationsView from '@/components/notifications/NotificationsView'
import CalendarView from '@/components/academics/CalendarView'
import GalleryView from '@/components/gallery/GalleryView'
import type { Album } from '@/data/gallery'
import { ICON_COMPONENTS } from '../shared/Icon'
import type { IconName } from '../shared/icon-names'
import type { BlockProps } from '../../document/definition'
import { toNotifications } from '../shared/linked'
import type { CalendarBoard as CalendarDef, GalleryBoard as GalleryDef, NotificationsBoard as BoardDef } from './widgets.definitions'

export function NotificationsBoard({ badge, title, subtitle, notices, ctaTitle, ctaText, ctaButton }: BlockProps<typeof BoardDef>) {
  const list = useMemo(() => toNotifications(notices), [notices])
  return <NotificationsView notifications={list} badge={badge} title={title} subtitle={subtitle} ctaTitle={ctaTitle} ctaText={ctaText} ctaButton={ctaButton} />
}

export function CalendarBoard({ badge, title, highlight, subtitle, events }: BlockProps<typeof CalendarDef>) {
  const list = useMemo(() => events.map((e, i) => ({ id: String(i), title: e.title, date: e.date, type: e.type, ...(e.description ? { description: e.description } : {}) })), [events])
  return <CalendarView events={list} badge={badge} title={title} highlight={highlight} subtitle={subtitle} />
}

export function GalleryBoard({ eyebrow, title, albums, videosTitle, videos }: BlockProps<typeof GalleryDef>) {
  const data = useMemo(() => {
    const list: Album[] = albums.map((a) => {
      const photos = a.photos.filter((p) => p.photo.src).map((p) => ({ src: p.photo.src }))
      return {
        id: a.key,
        name: a.name,
        description: a.description,
        category: a.category,
        cover: a.cover.src || photos[0]?.src || '',
        // Photos chosen in the CMS, or the numbered photos in the album's folder
        count: photos.length || a.folderCount,
        ...(photos.length ? { photos } : {}),
      }
    })
    const icons = Object.fromEntries(albums.map((a) => [a.key, ICON_COMPONENTS[a.icon as IconName]]))
    return { list: list.filter((a) => a.count > 0 && a.cover), icons }
  }, [albums])
  const videoList = useMemo(() => videos.map((v) => ({ id: v.youtubeId, title: v.title, note: v.note })), [videos])
  return <GalleryView albums={data.list} videos={videoList} icons={data.icons} eyebrow={eyebrow} title={title} videosTitle={videosTitle} />
}
