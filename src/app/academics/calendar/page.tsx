'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Sparkles, Star, PartyPopper, BookOpen, GraduationCap, Bell, Phone, X, Info } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { useDialog } from '@/lib/useDialog'
import { schoolPhones, telHref } from '@/lib/contact'
import HeroDecor from '@/components/layout/HeroDecor'
import { CalendarDays as HeroMotif, Clock as HeroMotifSmall } from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'holiday' | 'exam' | 'event' | 'meeting' | 'activity'
  description?: string
}

// The only calendar published on the website so far (session 2024-25).
// Add the current session's dates here once the school releases them.
const events: CalendarEvent[] = [
  { id: '1', title: 'Summer Vacation', date: '2024-05-20', type: 'holiday', description: 'Summer break for all students' },
  { id: '2', title: 'School Reopens', date: '2024-07-01', type: 'event', description: 'New academic session begins' },
  { id: '3', title: 'First Unit Test', date: '2024-07-15', type: 'exam', description: 'Unit Test 1 for all classes' },
  { id: '4', title: 'Independence Day', date: '2024-08-15', type: 'holiday', description: 'National holiday' },
  { id: '5', title: 'Parent-Teacher Meeting', date: '2024-08-20', type: 'meeting', description: 'PTM for Nursery to Class 12' },
  { id: '6', title: 'Second Unit Test', date: '2024-09-10', type: 'exam', description: 'Unit Test 2' },
  { id: '7', title: 'Annual Day', date: '2024-10-15', type: 'event', description: 'Cultural program and awards ceremony' },
  { id: '8', title: 'Dussehra Vacation', date: '2024-10-11', type: 'holiday', description: 'Dussehra holidays' },
  { id: '9', title: 'Diwali Vacation', date: '2024-10-29', type: 'holiday', description: 'Diwali holidays' },
  { id: '10', title: 'Half Yearly Exams', date: '2024-11-01', type: 'exam', description: 'Half yearly examination begins' },
  { id: '11', title: 'Children\'s Day', date: '2024-11-14', type: 'activity', description: 'Special celebrations for students' },
  { id: '12', title: 'Christmas Day', date: '2024-12-25', type: 'holiday', description: 'Christmas celebration' },
  { id: '13', title: 'Winter Vacation', date: '2024-12-20', type: 'holiday', description: 'Winter break begins' },
  { id: '14', title: 'New Year', date: '2025-01-01', type: 'holiday', description: 'New Year celebration' },
  { id: '15', title: 'Republic Day', date: '2025-01-26', type: 'holiday', description: 'National celebration' },
  { id: '16', title: 'Annual Sports Day', date: '2025-02-10', type: 'event', description: 'Sports meet and competitions' },
  { id: '17', title: 'Final Exams', date: '2025-02-20', type: 'exam', description: 'Final examination begins' },
  { id: '18', title: 'Result Day', date: '2025-03-15', type: 'event', description: 'Final results announcement' },
  { id: '19', title: 'Good Friday', date: '2025-04-18', type: 'holiday', description: 'Religious holiday' },
  { id: '20', title: 'Summer Vacation', date: '2025-05-20', type: 'holiday', description: 'Summer break begins' },
]

const sortedDates = events.map(e => e.date).sort()
const firstEventDate = sortedDates[0]
const lastEventDate = sortedDates[sortedDates.length - 1]
const sessionLabel = `${firstEventDate.slice(0, 4)}-${lastEventDate.slice(2, 4)}`

const eventTypeConfig = {
  holiday: { icon: PartyPopper, color: 'bg-green-100 text-green-800 border-green-200', label: 'Holiday' },
  exam: { icon: BookOpen, color: 'bg-red-100 text-red-800 border-red-200', label: 'Exam' },
  event: { icon: Star, color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Event' },
  meeting: { icon: Bell, color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Meeting' },
  activity: { icon: GraduationCap, color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Activity' },
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Local calendar date as YYYY-MM-DD (toISOString would shift it to UTC)
function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatDate(dateStr: string, options: Intl.DateTimeFormatOptions) {
  const [y, mo, d] = dateStr.split('-').map(Number)
  return new Date(y, mo - 1, d).toLocaleDateString('en-IN', options)
}

export default function AcademicCalendarPage() {
  // Dates depend on the visitor's clock, so they are set after mount; the static HTML must not bake in the build date
  const [today, setToday] = useState<string | null>(null)
  const [view, setView] = useState<{ year: number; month: number } | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const now = new Date()
    setToday(toDateStr(now))
    setView({ year: now.getFullYear(), month: now.getMonth() })
  }, [])

  useDialog({ open: !!selectedDate, onClose: () => setSelectedDate(null), containerRef: dialogRef })

  const navigateMonth = (direction: number) => {
    // Step from the 1st so short months are never skipped
    setView(v => {
      if (!v) return v
      const d = new Date(v.year, v.month + direction, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const goToToday = () => {
    const now = new Date()
    setView({ year: now.getFullYear(), month: now.getMonth() })
  }

  const showPublishedCalendar = () => {
    const [y, mo] = firstEventDate.split('-').map(Number)
    setView({ year: y, month: mo - 1 })
  }

  const calendarDays = useMemo(() => {
    if (!view) return []
    const { year, month } = view
    const startPadding = new Date(year, month, 1).getDay()
    const days: { date: number; isCurrentMonth: boolean; dateStr: string }[] = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(year, month, i - startPadding + 1)
      days.push({ date: d.getDate(), isCurrentMonth: d.getMonth() === month, dateStr: toDateStr(d) })
    }
    return days
  }, [view])

  const getEventsForDate = (dateStr: string) =>
    events.filter(event => event.date === dateStr && (!filterType || event.type === filterType))

  const upcomingEvents = today
    ? events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5)
    : []
  // Decided on the first render too (at build time on the server), so the notice is already in place and nothing moves when the page loads.
  // A calendar that has run out stays out of date, so the build-time answer only errs towards showing the notice late, never wrongly.
  const calendarIsOutOfDate = (today ?? toDateStr(new Date())) > lastEventDate

  const selectedEvents = selectedDate ? events.filter(e => e.date === selectedDate) : []

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-24 overflow-hidden">
        <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} />
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            className="absolute top-20 left-10 w-72 h-72 bg-secondary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/academics"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Academics
            </Link>
          </m.div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Calendar className="w-4 h-4 text-secondary-400" />
              <span>Holidays, exams and events</span>
            </div>

            <m.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Academic <span className="bg-gradient-to-r from-secondary-400 to-secondary-300 bg-clip-text text-transparent">Calendar</span>
            </m.h1>

            <m.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Important dates, holidays, and events throughout the year
            </m.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {calendarIsOutOfDate && (
              <div role="status" className="mb-8 rounded-2xl border border-secondary-200 bg-secondary-50 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                <Info aria-hidden className="w-6 h-6 text-secondary-800 shrink-0" />
                <div className="flex-1 text-gray-800">
                  <p className="font-semibold text-primary-900">The calendar for the current session has not been published on the website yet.</p>
                  <p className="text-sm mt-1">
                    Only the {sessionLabel} calendar is available here. For this year&apos;s holidays and exam dates, please contact the school office.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={showPublishedCalendar}
                    className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
                  >
                    View the {sessionLabel} calendar
                  </button>
                  <a
                    href={telHref(schoolPhones[0])}
                    className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-800 hover:bg-primary-50 transition-colors"
                  >
                    <Phone aria-hidden size={16} />
                    Call {schoolPhones[0]}
                  </a>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <m.div
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => navigateMonth(-1)}
                        disabled={!view}
                        aria-label="Previous month"
                        className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft aria-hidden className="w-5 h-5" />
                      </button>
                      <div className="text-center">
                        <h2 className="text-2xl font-bold" aria-live="polite">
                          {view ? `${months[view.month]} ${view.year}` : 'Calendar'}
                        </h2>
                        <button
                          type="button"
                          onClick={goToToday}
                          className="text-sm text-secondary-300 hover:text-secondary-200 mt-1 px-3 py-1 min-h-[24px]"
                        >
                          Today
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateMonth(1)}
                        disabled={!view}
                        aria-label="Next month"
                        className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronRight aria-hidden className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 sm:p-6">
                    <div className="grid grid-cols-7 gap-1 mb-2" aria-hidden="true">
                      {weekdays.map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Until today's date is known, hold the month's exact space (always 6 weeks) so nothing moves when it fills in */}
                    {!view && (
                      <div className="grid grid-cols-7 gap-1" role="status">
                        <span className="sr-only">Loading calendar…</span>
                        {Array.from({ length: 42 }, (_, i) => (
                          <div key={i} aria-hidden="true" className="aspect-square rounded-lg bg-gray-50 motion-safe:animate-pulse" />
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day) => {
                        const dayEvents = getEventsForDate(day.dateStr)
                        const hasEvent = dayEvents.length > 0
                        const isTodayDate = day.dateStr === today
                        const cellClass = `relative aspect-square p-1 rounded-lg text-left transition-colors w-full ${
                          day.isCurrentMonth ? 'bg-gray-50' : 'bg-gray-100/60'
                        } ${isTodayDate ? 'ring-2 ring-secondary-500 bg-secondary-50' : ''} ${hasEvent ? 'hover:bg-primary-50' : ''}`
                        const content = (
                          <>
                            <span className={`block text-sm font-medium ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-500'} ${isTodayDate ? 'text-secondary-800 font-bold' : ''}`}>
                              {day.date}
                            </span>
                            {hasEvent && (
                              <span className="flex flex-wrap gap-0.5 mt-1" aria-hidden="true">
                                {dayEvents.slice(0, 2).map((event) => {
                                  const config = eventTypeConfig[event.type]
                                  const Icon = config.icon
                                  return <Icon key={event.id} className={`w-3 h-3 ${config.color.split(' ')[1]}`} />
                                })}
                                {dayEvents.length > 2 && (
                                  <span className="text-xs text-gray-600">+{dayEvents.length - 2}</span>
                                )}
                              </span>
                            )}
                          </>
                        )

                        if (!hasEvent) {
                          return (
                            <div key={day.dateStr} className={cellClass} aria-current={isTodayDate ? 'date' : undefined}>
                              {content}
                            </div>
                          )
                        }
                        return (
                          <button
                            key={day.dateStr}
                            type="button"
                            className={cellClass}
                            aria-current={isTodayDate ? 'date' : undefined}
                            aria-label={`${formatDate(day.dateStr, { day: 'numeric', month: 'long' })}: ${dayEvents.map(e => `${e.title} (${eventTypeConfig[e.type].label})`).join(', ')}`}
                            onClick={() => setSelectedDate(day.dateStr)}
                          >
                            {content}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </m.div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center" role="group" aria-label="Show only one type of date">
                  {Object.entries(eventTypeConfig).map(([key, config]) => {
                    const Icon = config.icon
                    return (
                      <button
                        type="button"
                        key={key}
                        aria-pressed={filterType === key}
                        onClick={() => setFilterType(filterType === key ? null : key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          filterType === key ? config.color : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon aria-hidden className={`w-4 h-4 ${filterType === key ? '' : config.color.split(' ')[1]}`} />
                        {config.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-secondary-700 to-secondary-800 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Sparkles aria-hidden className="w-5 h-5" />
                      <h2 className="font-bold">Upcoming Events</h2>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {today === null ? (
                      <p className="text-sm text-gray-600">Loading…</p>
                    ) : upcomingEvents.length === 0 ? (
                      <p className="text-sm text-gray-700">
                        No upcoming dates have been published yet. Please contact the school office for this session&apos;s holidays and exams.
                      </p>
                    ) : (
                      upcomingEvents.map(event => {
                        const config = eventTypeConfig[event.type]
                        const Icon = config.icon
                        return (
                          <button
                            type="button"
                            key={event.id}
                            className="w-full flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                            onClick={() => setSelectedDate(event.date)}
                          >
                            <span className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Icon aria-hidden className="w-5 h-5" />
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block font-semibold text-gray-900">{event.title}</span>
                              <span className="block text-sm text-gray-600">{formatDate(event.date, { month: 'short', day: 'numeric' })}</span>
                            </span>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-3xl p-6 text-white">
                  <h2 className="font-bold text-lg mb-1 flex items-center gap-2">
                    <Star aria-hidden className="w-5 h-5 text-secondary-400" />
                    In the {sessionLabel} calendar
                  </h2>
                  <p className="text-sm text-gray-200 mb-4">The most recent calendar published on this website.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ['Holidays', events.filter(e => e.type === 'holiday').length],
                      ['Exams', events.filter(e => e.type === 'exam').length],
                      ['Events', events.filter(e => e.type === 'event').length],
                      ['Meetings & activities', events.filter(e => e.type === 'meeting' || e.type === 'activity').length],
                    ].map(([label, count]) => (
                      <div key={label} className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-3xl font-bold">{count}</p>
                        <p className="text-sm text-gray-200">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDate && selectedEvents.length > 0 && (
          <m.div
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDate(null)}
          >
            <m.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="calendar-dialog-title"
              tabIndex={-1}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto outline-none"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
                <h2 id="calendar-dialog-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar aria-hidden className="w-5 h-5 text-primary-700" />
                  {formatDate(selectedDate, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  aria-label="Close"
                  className="w-10 h-10 shrink-0 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                >
                  <X aria-hidden className="w-5 h-5" />
                </button>
              </div>
              <ul className="p-6 space-y-5">
                {selectedEvents.map(event => {
                  const config = eventTypeConfig[event.type]
                  const Icon = config.icon
                  return (
                    <li key={event.id}>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${config.color}`}>
                        <Icon aria-hidden className="w-4 h-4" />
                        {config.label}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-gray-900">{event.title}</h3>
                      {event.description && <p className="text-gray-700 mt-1">{event.description}</p>}
                    </li>
                  )
                })}
              </ul>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
