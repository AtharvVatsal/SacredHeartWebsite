import { page } from '../builders'

export const notificationsPage = page('/notifications', 'Notifications', [['NotificationsBoard']])

export const calendarPage = page('/academics/calendar', 'Academic Calendar', [['CalendarBoard']])
