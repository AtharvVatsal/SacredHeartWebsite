'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { staffMembers as defaultStaffMembers } from '@/data/school'
import { Search, Users, BookOpen, Monitor, Clipboard, ArrowLeft, Sparkles, Award, Heart, GraduationCap, Mail, User } from 'lucide-react'
import { m } from 'framer-motion'
import type { StaffMember } from '@/types'

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

const departments = [
  { name: 'All', icon: Users, color: 'from-gray-400 to-gray-500' },
  { name: 'Administration', icon: Award, color: 'from-amber-400 to-orange-500' },
  { name: 'Office Staff', icon: Clipboard, color: 'from-blue-400 to-indigo-500' },
  { name: 'English', icon: BookOpen, color: 'from-pink-400 to-rose-500' },
  { name: 'Mathematics', icon: BookOpen, color: 'from-purple-400 to-violet-500' },
  { name: 'Science', icon: BookOpen, color: 'from-emerald-400 to-green-500' },
  { name: 'Commerce', icon: BookOpen, color: 'from-cyan-400 to-teal-500' },
  { name: 'Hindi', icon: BookOpen, color: 'from-red-400 to-orange-500' },
  { name: 'Computer Science', icon: Monitor, color: 'from-blue-400 to-cyan-500' },
]

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
    'AMITA MISHRA': '/images/Staff/Amita Mishra.png',
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
    'POOJA VASHISTH': '/images/Staff/Pooja Vashisth.webp',
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
    'POOJA VASHISHT': '/images/Staff/Pooja Vashisht.webp',
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
    'MEENAKSHI SHARMA': '/images/Staff/dummy_female.webp',
    'SWATI RANA': '/images/Staff/dummy_female.webp',
    'DR. JYOTI BHARDWAJ': '/images/Staff/Jyoti Bhardwaj.webp',
    'ARCHITA MEHTA': '/images/Staff/dummy_female.webp',
    'ABHINANDAN SHARMA': '/images/Staff/dummy_male.webp',
    'DEEPIKA SHARMA': '/images/Staff/dummy_female.webp',
    'DEEPALI KATOCH': '/images/Staff/dummy_female.webp',
    'BHARTI ATTRI': '/images/Staff/dummy_female.webp',
    'JAGTAR SINGH': '/images/Staff/dummy_male.webp',
    'SHIVANI KUMARI': '/images/Staff/dummy_female.webp',
  }
  return nameMap[name.toUpperCase()] || ''
}

function StaffCard({ staff, index }: { staff: StaffMember, index: number }) {
  const imgSrc = getStaffImage(staff.name, staff.qualifications)
  const Icon = departmentIcons[staff.department] || User
  
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300">
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
        
        <div className="p-5">
          <h3 className="font-bold text-primary-900 text-lg mb-1 truncate group-hover:text-primary-700 transition-colors">
            {staff.name}
          </h3>
          <p className="text-secondary-600 font-medium text-sm mb-2">{staff.role}</p>
          {staff.qualifications && (
            <p className="text-gray-500 text-xs line-clamp-2 pt-2 border-t border-gray-100">
              {staff.qualifications}
            </p>
          )}
        </div>
      </div>
    </m.div>
  )
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [searchVisible, setSearchVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 200) {
        setSearchVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setSearchVisible(false)
      } else {
        setSearchVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  const staff = defaultStaffMembers

  const filteredStaff = staff.filter((staffMember: StaffMember) => {
    const searchLower = searchTerm.toLowerCase()
    const roleLower = (staffMember.role || '').toLowerCase()
    const qualLower = (staffMember.qualifications || '').toLowerCase()
    const matchesSearch = staffMember.name.toLowerCase().includes(searchLower) || qualLower.includes(searchLower)
    const matchesDept = selectedDept === 'All' || staffMember.department === selectedDept || 
                       (selectedDept === 'Office Staff' && (roleLower.includes('staff') || roleLower === 'nurse' || roleLower === 'clerk' || roleLower === 'receptionist' || roleLower === 'it staff' || roleLower === 'librarian'))
    return matchesSearch && matchesDept
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-28 overflow-hidden">
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
                        alt="Principal Sr. Archana"
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
                      Sr. Archana
                    </h2>
                    
                    <p className="text-primary-100 text-lg leading-relaxed max-w-2xl mb-8">
                      Leading Sacred Heart Senior Secondary School with dedication and vision. 
                      Committed to academic excellence and holistic development of every student.
                    </p>
                    
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      {[
                        { value: '15+', label: 'Years Experience' },
                        { value: '5000+', label: 'Students Guided' },
                        { value: '112+', label: 'Team Members' },
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
      <m.div 
        className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-20 z-40 shadow-sm"
        animate={{ 
          y: searchVisible ? 0 : -100,
          opacity: searchVisible ? 1 : 0,
          pointerEvents: searchVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 text-sm"
              />
            </div>
            
            {/* Department Pills */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {departments.slice(0, 5).map((dept) => {
                const Icon = dept.icon
                const isActive = selectedDept === dept.name
                return (
                  <button
                    key={dept.name}
                    onClick={() => setSelectedDept(dept.name)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-medium text-xs transition-all ${
                      isActive 
                        ? `bg-gradient-to-r ${dept.color} text-white shadow` 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {dept.name}
                  </button>
                )
              })}
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-2 md:hidden">
              {filteredStaff.length} staff members
            </p>
          </div>
        </div>
      </m.div>

      {/* Staff Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredStaff.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredStaff.map((staff, index) => (
                  <StaffCard key={staff.id} staff={staff} index={index} />
                ))}
              </div>
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
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
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
              { icon: GraduationCap, value: '112+', label: 'Teaching Staff' },
              { icon: Users, value: '90+', label: 'Qualified Teachers' },
              { icon: Award, value: '56+', label: 'Years Legacy' },
              { icon: Heart, value: '100%', label: 'Dedication' },
            ].map((stat, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -8 }}
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
              <Link href="/about">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  Back to About <ArrowLeft className="w-5 h-5" />
                </m.button>
              </Link>
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-secondary-400 text-primary-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </m.button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
