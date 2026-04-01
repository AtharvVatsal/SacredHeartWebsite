'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Download, Sparkles, Star, PartyPopper, BookOpen, GraduationCap, Bell } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'holiday' | 'exam' | 'event' | 'meeting' | 'activity'
  description?: string
}

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

const eventTypeConfig = {
  holiday: { icon: PartyPopper, color: 'bg-green-100 text-green-700 border-green-200', label: 'Holiday' },
  exam: { icon: BookOpen, color: 'bg-red-100 text-red-700 border-red-200', label: 'Exam' },
  event: { icon: Star, color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Event' },
  meeting: { icon: Bell, color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Meeting' },
  activity: { icon: GraduationCap, color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Activity' },
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function AcademicCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [filterType, setFilterType] = useState<string | null>(null)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const goToToday = () => setCurrentDate(new Date())

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startPadding = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const days: { date: number | null; isCurrentMonth: boolean; dateStr: string }[] = []

    for (let i = 0; i < startPadding; i++) {
      const prevDate = new Date(currentYear, currentMonth, -startPadding + i + 1)
      days.push({ date: prevDate.getDate(), isCurrentMonth: false, dateStr: prevDate.toISOString().split('T')[0] })
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({ date: day, isCurrentMonth: true, dateStr })
    }

    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i)
      days.push({ date: i, isCurrentMonth: false, dateStr: nextDate.toISOString().split('T')[0] })
    }

    return days
  }, [currentYear, currentMonth])

  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr && (!filterType || event.type === filterType))
  }

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0]
    return dateStr === today
  }

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-24 overflow-hidden">
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
              <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </m.span>
              Back to Academics
            </Link>
          </m.div>

          <m.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
          >
            <m.div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                <m.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Calendar className="w-4 h-4 text-secondary-400" />
                </m.div>
                <span>Academic Year 2024-25</span>
              </div>
            </m.div>

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
          </m.div>
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
                      <m.button
                        onClick={() => navigateMonth(-1)}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </m.button>
                      <div className="text-center">
                        <h2 className="text-2xl font-bold">{months[currentMonth]} {currentYear}</h2>
                        <m.button
                          onClick={goToToday}
                          className="text-sm text-secondary-400 hover:text-secondary-300 mt-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          Today
                        </m.button>
                      </div>
                      <m.button
                        onClick={() => navigateMonth(1)}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </m.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {weekdays.map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => {
                        const dayEvents = day.date ? getEventsForDate(day.dateStr) : []
                        const hasEvent = dayEvents.length > 0
                        const isTodayDate = day.date && isToday(day.dateStr)

                        return (
                          <m.div
                            key={index}
                            className={`
                              relative aspect-square p-1 rounded-lg transition-all
                              ${day.isCurrentMonth ? 'bg-gray-50' : 'bg-gray-100/50'}
                              ${isTodayDate ? 'ring-2 ring-secondary-400 bg-secondary-50' : ''}
                              ${hasEvent ? 'cursor-pointer hover:bg-primary-50' : ''}
                            `}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.01 }}
                            whileHover={hasEvent ? { scale: 1.05 } : {}}
                            onClick={() => {
                              if (dayEvents.length === 1) {
                                setSelectedEvent(dayEvents[0])
                              }
                            }}
                          >
                            {day.date && (
                              <>
                                <div className={`text-sm font-medium ${day.isCurrentMonth ? 'text-gray-700' : 'text-gray-400'} ${isTodayDate ? 'text-secondary-700 font-bold' : ''}`}>
                                  {day.date}
                                </div>
                                {hasEvent && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {dayEvents.slice(0, 2).map((event) => {
                                      const config = eventTypeConfig[event.type]
                                      return (
                                        <div
                                          key={event.id}
                                          className={`w-2 h-2 rounded-full ${config.color.split(' ')[0]}`}
                                        />
                                      )
                                    })}
                                    {dayEvents.length > 2 && (
                                      <span className="text-xs text-gray-500">+{dayEvents.length - 2}</span>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </m.div>
                        )
                      })}
                    </div>
                  </div>
                </m.div>

                <m.div
                  className="mt-6 flex flex-wrap gap-3 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {Object.entries(eventTypeConfig).map(([key, config]) => {
                    const Icon = config.icon
                    return (
                      <m.button
                        key={key}
                        onClick={() => setFilterType(filterType === key ? null : key)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all
                          ${filterType === key ? config.color : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        {config.label}
                      </m.button>
                    )
                  })}
                </m.div>
              </div>

              <div className="space-y-6">
                <m.div
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      <h3 className="font-bold">Upcoming Events</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {upcomingEvents.map((event, index) => {
                      const config = eventTypeConfig[event.type]
                      const Icon = config.icon
                      const eventDate = new Date(event.date)
                      return (
                        <m.div
                          key={event.id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{event.title}</p>
                            <p className="text-sm text-gray-500">
                              {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </m.div>
                      )
                    })}
                  </div>
                </m.div>

                <m.div
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5" />
                      <h3 className="font-bold">Download Calendar</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <m.a
                      href="#"
                      className="flex items-center justify-between p-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <span className="font-medium text-primary-900">Academic Year 2024-25</span>
                      </div>
                      <Download className="w-5 h-5 text-primary-600 group-hover:translate-y-1 transition-transform" />
                    </m.a>
                  </div>
                </m.div>

                <m.div
                  className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-3xl p-6 text-white"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary-400" />
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/10 rounded-xl">
                      <p className="text-3xl font-bold">{events.filter(e => e.type === 'holiday').length}</p>
                      <p className="text-sm text-gray-300">Holidays</p>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-xl">
                      <p className="text-3xl font-bold">{events.filter(e => e.type === 'exam').length}</p>
                      <p className="text-sm text-gray-300">Exams</p>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-xl">
                      <p className="text-3xl font-bold">{events.filter(e => e.type === 'event').length}</p>
                      <p className="text-sm text-gray-300">Events</p>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-xl">
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-sm text-gray-300">Months</p>
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && (
          <m.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <m.div
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 ${eventTypeConfig[selectedEvent.type].color.split(' ')[0]} ${eventTypeConfig[selectedEvent.type].color.split(' ')[1]}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = eventTypeConfig[selectedEvent.type].icon
                      return <Icon className="w-6 h-6" />
                    })()}
                    <span className="font-semibold">{eventTypeConfig[selectedEvent.type].label}</span>
                  </div>
                  <m.button
                    onClick={() => setSelectedEvent(null)}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xl">&times;</span>
                  </m.button>
                </div>
              </div>
              <div className="p-6">
                <m.h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {selectedEvent.title}
                </m.h3>
                <m.p
                  className="text-gray-500 mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </m.p>
                {selectedEvent.description && (
                  <m.p
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedEvent.description}
                  </m.p>
                )}
                <m.div
                  className="mt-6 flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <m.button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </m.button>
                  <m.button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Calendar
                  </m.button>
                </m.div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
