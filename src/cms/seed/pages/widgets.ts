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

export const passOutPage = page('/about/pass-out-batches', 'Pass Out Batches', [['PassOutBoard']])

export const contactPage = page('/contact', 'Contact Us', [['ContactBoard']])

export const enquiryPage = page('/admission/register', 'Admission Enquiry', [['EnquiryForm']])
