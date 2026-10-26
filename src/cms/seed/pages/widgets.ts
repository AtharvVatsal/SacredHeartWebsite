import { page } from '../builders'

export const notificationsPage = page('/notifications', 'Notifications', [['NotificationsBoard']])

export const calendarPage = page('/academics/calendar', 'Academic Calendar', [['CalendarBoard']])

export const galleryPage = page('/gallery', 'Photo Gallery', [
  [
    'PageHero',
    {
      style: 'landing',
      badge: 'Memories',
      badgeIcon: 'Camera',
      title: 'Photo Gallery',
      subtitle: 'Capturing moments of joy and achievement',
      motif: 'Camera',
      motifSmall: 'Image',
    },
  ],
  ['GalleryBoard'],
])
