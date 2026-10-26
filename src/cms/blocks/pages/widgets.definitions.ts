// Interactive pages (notices, calendar, gallery, batches, forms): their content is edited here and shown by
// the site's own components
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, choice, href, list, text } from '../../document/fields'
import { button } from '../common'
import { notifications } from '@/data/school'
import { calendarEvents } from '@/content/calendar'

export const noticeItem = z.object({ title: text(200), text: text(1000), date: text(20), important: bool(false), attachment: href('') })
export const noticeItems = notifications.map((n) => ({ title: n.title, text: n.description, date: n.date, important: n.important, attachment: n.attachment ?? '' }))

export const NotificationsBoard = defineBlock({
  type: 'NotificationsBoard',
  label: 'Notifications (banner with counts and the notices)',
  category: 'features',
  schema: z.object({
    badge: text(60, 'Latest Updates'),
    title: text(120, 'Notifications'),
    subtitle: text(300, 'Stay updated with latest announcements'),
    notices: list(noticeItem, 100, noticeItems),
    ctaTitle: text(120, 'Need More Information?'),
    ctaText: text(400, 'Contact our school office for any queries regarding admissions, fees, or academics'),
    ctaButton: button('Contact Us', '/contact'),
  }),
})

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Write the date as YYYY-MM-DD, e.g. 2025-07-01')
  .default('2025-01-01')

export const CalendarBoard = defineBlock({
  type: 'CalendarBoard',
  label: 'Academic calendar (month view and events)',
  category: 'features',
  schema: z.object({
    badge: text(80, 'Holidays, exams and events'),
    title: text(80, 'Academic'),
    highlight: text(80, 'Calendar'),
    subtitle: text(300, 'Important dates, holidays, and events throughout the year'),
    events: list(
      z.object({ title: text(120), date: isoDate, type: choice(['holiday', 'exam', 'event', 'meeting', 'activity'] as const, 'event'), description: text(300) }),
      300,
      calendarEvents.map((e) => ({ title: e.title, date: e.date, type: e.type, description: e.description ?? '' })),
    ),
  }),
})

export const widgetBlocks = [NotificationsBoard, CalendarBoard]
