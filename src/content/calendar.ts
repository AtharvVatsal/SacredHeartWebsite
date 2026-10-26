// Academic calendar dates (server-safe: the calendar page and its CMS section both start from these)

export interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'holiday' | 'exam' | 'event' | 'meeting' | 'activity'
  description?: string
}

// The only calendar published on the website so far (session 2024-25).
// Add the current session's dates here once the school releases them.
export const calendarEvents: CalendarEvent[] = [
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
