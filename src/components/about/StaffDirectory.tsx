'use client'

// The searchable staff list (search box, department chips and the staff cards). Used by the Staff page and
// by its CMS section.
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { BookOpen, Clipboard, Monitor, Search, User, Users } from 'lucide-react'
import { FadeInItem, GradualBlur, StaggerContainer } from '@/components/animations'
import { useRevealAll } from '@/components/animations/RevealContext'
import type { StaffMember } from '@/types'
import { getStaffImage } from './staff-images'

const departmentIcons: Record<string, React.ElementType> = {
  'Administration': Users,
  'Science': BookOpen,
  'Mathematics': BookOpen,
  'English': BookOpen,
  'Hindi': BookOpen,
  'Commerce': BookOpen,
  'Computer Science': Monitor,
  'Physical Education': Users,
  'Art': BookOpen,
  'Music': Users,
  'Library': BookOpen,
  'Office Staff': Clipboard,
  'Geography': BookOpen,
  'Cultural': Users,
}

const OFFICE_ROLES = ['nurse', 'clerk', 'receptionist', 'it staff', 'librarian']

function inDepartment(member: StaffMember, dept: string) {
  if (dept === 'All' || member.department === dept) return true
  const role = (member.role || '').toLowerCase()
  return dept === 'Office Staff' && (role.includes('staff') || OFFICE_ROLES.includes(role))
}

/** Filter chips come from the departments that actually have staff, largest first */
function departmentsOf(members: StaffMember[]) {
  const names = Array.from(new Set(members.map(m => m.department).filter(Boolean)))
  const counts = Object.fromEntries(names.map(d => [d, members.filter(m => inDepartment(m, d)).length])) as Record<string, number>
  return { counts, list: ['All', ...names.sort((x, y) => counts[y] - counts[x] || x.localeCompare(y))] }
}


function StaffCard({ staff }: { staff: StaffMember }) {
  const imgSrc = staff.image ?? getStaffImage(staff.name, staff.qualifications)
  const Icon = departmentIcons[staff.department] || User
  
  return (
    <FadeInItem direction="up" distance={30} blur={false}>
    <m.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full"
    >
      <div className="h-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={staff.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <Icon size={36} className="text-primary-300" />
              </div>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Department badge */}
          {staff.department && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-medium text-primary-700">{staff.department}</span>
            </div>
          )}
        </div>
        
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-primary-900 text-base sm:text-lg mb-1 break-words hyphens-auto group-hover:text-primary-700 transition-colors">
            {staff.name}
          </h3>
          <p className="text-secondary-800 font-medium text-sm mb-2">{staff.role}</p>
          {staff.qualifications && (
            <p className="text-gray-600 text-xs break-words pt-2 border-t border-gray-100">
              {staff.qualifications}
            </p>
          )}
        </div>
      </div>
    </m.div>
    </FadeInItem>
  )
}

export default function StaffDirectory({ staff }: { staff: StaffMember[] }) {
  const revealAll = useRevealAll()
  const inView = (from: Record<string, number>, to: Record<string, number>) => (revealAll ? { initial: false as const } : { initial: from, whileInView: to, viewport: { once: true } })
  const { counts: departmentCounts, list: departments } = useMemo(() => departmentsOf(staff), [staff])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')

  const filteredStaff = staff.filter((staffMember: StaffMember) => {
    const searchLower = searchTerm.trim().toLowerCase()
    const qualLower = (staffMember.qualifications || '').toLowerCase()
    const matchesSearch = staffMember.name.toLowerCase().includes(searchLower) || qualLower.includes(searchLower)
    const matchesDept = inDepartment(staffMember, selectedDept)
    return matchesSearch && matchesDept
  })

  return (
    <>
      {/* Search & Filter Section */}
      <div className="sticky-under-header bg-white/95 backdrop-blur-md border-b border-gray-100 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row lg:items-start gap-2.5 lg:gap-5">
            {/* Search Bar + count */}
            <div className="flex items-center gap-3 lg:w-72 lg:shrink-0 lg:flex-col lg:items-stretch lg:gap-1.5">
            <div className="relative flex-1">
              <Search aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="search"
                aria-label="Search staff by name or qualification"
                placeholder="Search by name or qualification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 text-sm"
              />
            </div>
            <p className="text-xs text-gray-600 whitespace-nowrap lg:pl-1" aria-live="polite">
              {filteredStaff.length} staff members
            </p>
            </div>

            {/* Department Pills: one swipeable row on smaller screens (blurred edges show there is more), wrapped on desktop */}
            <div className="relative min-w-0 lg:flex-1">
            <div className="flex gap-1.5 overflow-x-auto lg:overflow-visible lg:flex-wrap pb-1 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by department">
              {departments.map((dept) => {
                const Icon = dept === 'All' ? Users : departmentIcons[dept] || BookOpen
                const isActive = selectedDept === dept
                return (
                  <button
                    type="button"
                    key={dept}
                    aria-pressed={isActive}
                    onClick={() => setSelectedDept(dept)}
                    className={`shrink-0 inline-flex items-center gap-1 px-3 py-1.5 min-h-[32px] rounded-full font-medium text-xs whitespace-nowrap transition-all ${
                      isActive ? 'bg-primary-700 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon aria-hidden className="w-3 h-3" />
                    {dept}
                    {dept !== 'All' && <span className={isActive ? 'text-white/90' : 'text-gray-600'}>({departmentCounts[dept]})</span>}
                  </button>
                )
              })}
            </div>
            <GradualBlur position="left" height="2rem" strength={0.5} layers={5} tint="rgba(255,255,255,0.9)" autoHide zIndex={1} className="lg:hidden" />
            <GradualBlur position="right" height="2.5rem" strength={0.5} layers={5} tint="rgba(255,255,255,0.9)" autoHide zIndex={1} className="lg:hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredStaff.length > 0 ? (
              <StaggerContainer key={selectedDept} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" stagger={0.05}>
                {filteredStaff.map((staff) => (
                  <StaffCard key={staff.id} staff={staff} />
                ))}
              </StaggerContainer>
            ) : (
              <m.div
                {...inView({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Staff Found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </m.div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
