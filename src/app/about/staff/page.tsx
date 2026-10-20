'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { staffMembers as defaultStaffMembers, statistics, schoolInfo } from '@/data/school'
import { formatStat } from '@/lib/stats'
import { Search, Users, BookOpen, Monitor, Clipboard, ArrowLeft, Sparkles, Award, Heart, GraduationCap, Mail, User } from 'lucide-react'
import { m } from 'framer-motion'
import { StaggerContainer, FadeInItem, GradualBlur } from '@/components/animations'
import type { StaffMember } from '@/types'
import HeroDecor from '@/components/layout/HeroDecor'
import { Users as HeroMotif, GraduationCap as HeroMotifSmall } from 'lucide-react'

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

// Filter chips come from the departments that actually have staff, largest first
const departmentNames = Array.from(new Set(defaultStaffMembers.map(m => m.department).filter(Boolean)))
const departmentCounts = Object.fromEntries(
  departmentNames.map(d => [d, defaultStaffMembers.filter(m => inDepartment(m, d)).length])
) as Record<string, number>
const departments = ['All', ...departmentNames.sort((x, y) => departmentCounts[y] - departmentCounts[x] || x.localeCompare(y))]

function getStaffImage(name: string, qualifications: string = ''): string {
  if (name === 'AARTI SHARMA') {
    if (qualifications.includes('M.A ENGLISH') || qualifications.includes('MA ENGLISH')) {
      return '/images/Staff/Aarti Sharma.webp'
    } else if (qualifications.includes('M.SC') || qualifications.includes('MSC')) {
      return '/images/Staff/Aarti Sharma (2).webp'
    }
  }
  
  if (name === 'SHILPA') {
    if (qualifications.includes('B.ED, M.ED')) {
      return '/images/Staff/Shilpa.webp'
    } else if (qualifications.includes('M.SC')) {
      return '/images/Staff/Shilpa (2).webp'
    }
  }
  
  const nameMap: Record<string, string> = {
    'SR. GRACY M.D': '/images/principal.webp',
    'POOJA SONI': '/images/Staff/Pooja Soni.webp',
    'ANSHU SHAROTRI': '/images/Staff/Anshu Sharotari.webp',
    'RANJAN DIXIT': '/images/Staff/Rajan Dixit.webp',
    'DOLLY THAKUR': '/images/Staff/Dolly Thakur.webp',
    'AARTI SHARMA': '/images/Staff/Aarti Sharma.webp',
    'ASHISH MAHAJAN': '/images/Staff/Ashish Mahajan.webp',
    'LALIT SOOD': '/images/Staff/Lalit Sood.webp',
    'SHAILJA CHAUHAN': '/images/Staff/Shailja Chauhan.webp',
    'ARCHANA SAPEHYA': '/images/Staff/Archana Sapehya.webp',
    'NITIKA SHARMA': '/images/Staff/Nitika Sharma.webp',
    'MONA SOOD': '/images/Staff/Mona Sood.webp',
    'NEHA SAMUEL': '/images/Staff/Neha Samuel.webp',
    'SHILPI WALIA': '/images/Staff/Shilpi Walia.webp',
    'ANUPAMA': '/images/Staff/Anupama.webp',
    'RAJ KUMAR SHARMA': '/images/Staff/Rajkumar Sharma.webp',
    'SAKSHI SHARMA': '/images/Staff/Sakshi Sharma.webp',
    'HIMANI MISHRA': '/images/Staff/Himani Mishra.webp',
    'SUMITA CHAKRABARTI SEN': '/images/Staff/Sumita Chakrabarti Sen.webp',
    'RENU INDORIA': '/images/Staff/Renu Indoria.webp',
    'NIVEDITA CHOPRA': '/images/Staff/Nivedita Chopra.webp',
    'ANKUSH KUMAR': '/images/Staff/Ankush Kumar.webp',
    'ANAMIKA GUPTA': '/images/Staff/Anamika Gupta.webp',
    'SHALINI KATOCH': '/images/Staff/Shalini Katoch.webp',
    'SUREKHA CHIB': '/images/Staff/Surekha Chib.webp',
    'ANUPA ARORA': '/images/Staff/Anupa Arora.webp',
    'GOLDY PARMAR': '/images/Staff/Goldy Parmar.webp',
    'NIDHI THAKUR': '/images/Staff/Nidhi Thakur.webp',
    'CHANDER KIRAN': '/images/Staff/Chander Kiran.webp',
    'ROHITA CHETTRI': '/images/Staff/Rohita Chettri.webp',
    'DR. SUDHA THAPA': '/images/Staff/Dr. Sudha Thapa.webp',
    'SANGEETA SHARMA': '/images/Staff/Sangeeta Sharma.webp',
    'RITU BALA': '/images/Staff/Ritu Bala.webp',
    'MANISHA GURUNG': '/images/Staff/Manisha Gurung.webp',
    'AMITA MISHRA': '/images/Staff/Amita Mishra.webp',
    'ANITA KUMARI': '/images/Staff/Anita Kumari.webp',
    'SUNITA DEVI': '/images/Staff/Sunita Devi.webp',
    'KAVITA SHARMA': '/images/Staff/Kavita Sharma.webp',
    'SONIKA ACHARYA': '/images/Staff/Sonika Acharya.webp',
    'MONIKA VYAS': '/images/Staff/Monika Vyas.webp',
    'SUNIL KUMAR': '/images/Staff/Sunil Kumar.webp',
    'AMANDEEP': '/images/Staff/Amandeep.webp',
    'SHALU RANA': '/images/Staff/Shalu Rana.webp',
    'PARUL RANA': '/images/Staff/Parul Rana.webp',
    'RUCHI GROVER': '/images/Staff/Ruchi Grover.webp',
    'AMIT WALIA': '/images/Staff/Amit Walia.webp',
    'RICHA SHARMA': '/images/Staff/Richa Sharma.webp',
    'SHILPA': '/images/Staff/Shilpa.webp',
    'MONIKA RANI': '/images/Staff/Monika Rani.webp',
    'RENU MANHAS': '/images/Staff/Renu Manhas.webp',
    'POOJA VASHISTH': '/images/Staff/Pooja Vashisht.webp',
    'JYOTI BHARDWAJ': '/images/Staff/Jyoti Bhardwaj.webp',
    'NAGESH THAKUR': '/images/Staff/Nagesh Thakur.webp',
    'SHANTIRANI HASDA': '/images/Staff/Shantirani Hasda.webp',
    'AMIT KUMAR': '/images/Staff/Amit Kumar.webp',
    'GULSHAN KUMAR': '/images/Staff/Gulshan Kumar.webp',
    'RUCHIKA SHARMA': '/images/Staff/Ruchika Sharma.webp',
    'ANNU GULERIA': '/images/Staff/Anu Guleria.webp',
    'ABKASHIKA SHARMA': '/images/Staff/Abkashika Sharma.webp',
    'BALVINDER SINGH': '/images/Staff/Balvinder Singh.webp',
    'POOJA SHARMA': '/images/Staff/Pooja Sharma.webp',
    'SONIA SHARMA': '/images/Staff/Sonia Sharma.webp',
    'CHANDER REKHA': '/images/Staff/Chander Rekha.webp',
    'JAISHREE KASHYAP': '/images/Staff/Jaishree Kashyap.webp',
    'PRASHANT SHARMA': '/images/Staff/Prashant Sharma.webp',
    'VARSHA GURUNG': '/images/Staff/Varsha Gurung.webp',
    'RASHIM': '/images/Staff/Rashmi.webp',
    'AKRITI SHARMA': '/images/Staff/Akriti Sharma.webp',
    'RISHTA GURUNG': '/images/Staff/Rishta Gurung.webp',
    'DALJIT KAUR': '/images/Staff/Daljit Kaur.webp',
    'KOMAL GULERIA': '/images/Staff/Komal Guleria.webp',
    'VANDANA BARWAL': '/images/Staff/Vandana Barwal.webp',
    'PALAK WALIA': '/images/Staff/Palak Walia.webp',
    'VANDNA VERMA': '/images/Staff/Vandana Verma.webp',
    'BHARTI BHATLI': '/images/Staff/Bharti Bhatli.webp',
    'AMBIKA DHIMAN': '/images/Staff/Ambika Dhiman.webp',
    'KAVESH CHAUHAN': '/images/Staff/Kavesh Chauhan.webp',
    'RISHI KUMSR': '/images/Staff/Rishi Kumar.webp',
    'MAHINDER SINGH CHOUDHARY': '/images/Staff/Mahinder Singh Choudhary.webp',
    'MEENAKSHI SHARMA': '/images/Staff/Meenakshi Sharma.webp',
    'SWATI RANA': '/images/Staff/Swati Rana.webp',
    'DR. JYOTI BHARDWAJ': '/images/Staff/Dr. Jyoti Bhardwaj.webp',
    'ARCHITA MEHTA': '/images/Staff/Archita Mehta.webp',
    'ABHINANDAN SHARMA': '/images/Staff/Abhinandan Sharma.webp',
    'DEEPIKA SHARMA': '/images/Staff/Deepika Sharma.webp',
    'DEEPALI KATOCH': '/images/Staff/Deepali Katoch.webp',
    'BHARTI ATTRI': '/images/Staff/Bharti Attri.webp',
    'JAGTAR SINGH': '/images/Staff/Jagtar Singh.webp',
    'SHIVANI KUMARI': '/images/Staff/Shivani Kumari.webp',
    'SONIKA SHARMA': '/images/Staff/Sonika Sharma.webp',
    'SHOBHA': '/images/Staff/Shobha.webp',
    'NANDNA': '/images/Staff/Nandna.webp',
    'KANCHAN KUMARI': '/images/Staff/Kanchan Kumari.webp',
  }
  return nameMap[name.toUpperCase()] || ''
}

function StaffCard({ staff }: { staff: StaffMember }) {
  const imgSrc = getStaffImage(staff.name, staff.qualifications)
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

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const staff = defaultStaffMembers

  const filteredStaff = staff.filter((staffMember: StaffMember) => {
    const searchLower = searchTerm.trim().toLowerCase()
    const qualLower = (staffMember.qualifications || '').toLowerCase()
    const matchesSearch = staffMember.name.toLowerCase().includes(searchLower) || qualLower.includes(searchLower)
    const matchesDept = inDepartment(staffMember, selectedDept)
    return matchesSearch && matchesDept
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-28 overflow-hidden">
        <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} />
        <div className="absolute inset-0 overflow-hidden">
          <m.div 
            className="absolute top-20 left-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <m.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-400/5 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
                <m.div whileHover={{ x: -5 }} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to About
                </m.div>
              </Link>
              
              <m.div 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-secondary-400" />
                Our Team
              </m.div>
            </div>

            <m.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mt-8 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Our Staff
            </m.h1>
            
            <m.p 
              className="text-xl md:text-2xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Dedicated educators shaping futures with passion and excellence
            </m.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 rounded-[2rem] p-2">
              <div className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-500/20 rounded-full blur-[80px]" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                  <m.div 
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-[2rem] blur opacity-40" />
                    <div className="relative w-52 h-64 md:w-64 md:h-80 rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-white/20">
                      <Image
                        src="/images/principal.webp"
                        alt={`Principal ${schoolInfo.principal}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </m.div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/10"
                    >
                      <Award className="w-4 h-4 text-secondary-400" />
                      Principal
                    </m.div>
                    
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                      {schoolInfo.principal}
                    </h2>
                    
                    <p className="text-primary-100 text-lg leading-relaxed max-w-2xl mb-8">
                      Leading Sacred Heart Senior Secondary School with dedication and vision. 
                      Committed to academic excellence and holistic development of every student.
                    </p>
                    
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      {[
                        { value: '15+', label: 'Years Experience' },
                        { value: '5000+', label: 'Students Guided' },
                        { value: String(staff.length), label: 'Staff Listed Below' },
                      ].map((stat, i) => (
                        <m.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4 rounded-2xl text-center"
                        >
                          <div className="text-2xl font-bold text-secondary-400">{stat.value}</div>
                          <div className="text-xs text-primary-200 mt-1">{stat.label}</div>
                        </m.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              // Shared figures + the count of the list above, so nothing contradicts another page
              { icon: GraduationCap, value: formatStat(statistics.find(s => s.label === 'Staff Strength')!), label: 'Staff Strength' },
              { icon: Users, value: String(staff.length), label: 'Staff Listed' },
              { icon: Award, value: formatStat(statistics.find(s => s.label === 'Glorious Years')!), label: 'Glorious Years' },
              { icon: Heart, value: '100%', label: 'Dedication' },
            ].map((stat, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
              <m.div
                whileHover={{ y: -8, transition: { duration: 0.2, delay: 0 } }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-secondary-400" />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-primary-200 text-sm font-medium">{stat.label}</div>
              </m.div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-4">
              Want to Learn More?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore more about our school, our history, and our achievements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                <Link href="/about" className="active:scale-95 px-8 py-4 bg-primary-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                  Back to About <ArrowLeft className="w-5 h-5" />
                </Link>
              </m.div>
              <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                <Link href="/contact" className="active:scale-95 px-8 py-4 bg-secondary-400 text-primary-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Us
                </Link>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
