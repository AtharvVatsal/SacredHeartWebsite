// Interactive pages (notices, calendar, gallery, batches, forms): their content is edited here and shown by
// the site's own components
import { z } from 'zod'
import { defineBlock } from '../../document/definition'
import { bool, href, list, text } from '../../document/fields'
import { button } from '../common'
import { notifications } from '@/data/school'

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

export const widgetBlocks = [NotificationsBoard]
