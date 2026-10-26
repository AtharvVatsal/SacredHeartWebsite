'use client'

import CalendarView from '@/components/academics/CalendarView'
import { calendarEvents } from '@/content/calendar'

export default function AcademicCalendarPage() {
  return <CalendarView events={calendarEvents} />
}
