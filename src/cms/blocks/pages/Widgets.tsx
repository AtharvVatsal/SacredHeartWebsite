'use client'

// Interactive pages, rendered by the site's own components with the content edited in the CMS
import { useMemo } from 'react'
import NotificationsView from '@/components/notifications/NotificationsView'
import CalendarView from '@/components/academics/CalendarView'
import GalleryView from '@/components/gallery/GalleryView'
import PassOutView from '@/components/about/PassOutView'
import ContactView from '@/components/contact/ContactView'
import RegisterView from '@/components/admission/RegisterView'
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider'
import type { Album } from '@/data/gallery'
import { ICON_COMPONENTS } from '../shared/Icon'
import type { IconName } from '../shared/icon-names'
import type { BlockProps } from '../../document/definition'
import { toNotifications } from '../shared/linked'
import type {
  CalendarBoard as CalendarDef,
  ContactBoard as ContactDef,
  EnquiryForm as EnquiryDef,
  GalleryBoard as GalleryDef,
  NotificationsBoard as BoardDef,
  PassOutBoard as PassOutDef,
} from './widgets.definitions'

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
      // Photos from the media library carry their small copy for the viewer's thumbnail strip
      const photos = a.photos.filter((p) => p.photo.src).map((p) => ({ src: p.photo.src, thumb: (p.photo as { thumb?: string }).thumb }))
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

export function PassOutBoard({ batches }: BlockProps<typeof PassOutDef>) {
  const { onlineServices } = useSiteSettings()
  const data = useMemo(
    () =>
      batches.map((b) => ({
        year: b.year,
        photos: b.photos
          .filter((p) => p.photo.src)
          .map((p, i) => ({ id: `${b.year}-${i + 1}`, year: b.year, title: p.title, image: p.photo.src })),
      })),
    [batches],
  )
  return <PassOutView batches={data} alumniHref={onlineServices.alumniRegistration} />
}

export function ContactBoard({ officeHours }: BlockProps<typeof ContactDef>) {
  const { contact } = useSiteSettings()
  const a = contact.address
  const details = {
    address: `${a.street}, ${a.tehsil}, District ${a.district}, ${a.state} - ${a.pincode}`,
    phones: contact.phones,
    emails: contact.emails,
    plusCode: contact.mapPlusCode,
  }
  return <ContactView details={details} officeHours={officeHours} />
}

export function EnquiryForm({ ctaTitle, ctaText, ctaButton }: BlockProps<typeof EnquiryDef>) {
  const { contact } = useSiteSettings()
  return <RegisterView email={contact.emails[0]} ctaTitle={ctaTitle} ctaText={ctaText} ctaButton={ctaButton} />
}
