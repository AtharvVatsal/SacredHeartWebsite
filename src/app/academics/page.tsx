'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, FlaskConical, Calculator, Languages, Palette, Music, Dumbbell, Clipboard, GraduationCap, Star, Sparkles, Calendar } from 'lucide-react'
import { m } from 'framer-motion'
import { FadeIn, StaggerContainer, FadeInItem, ParallaxSection } from '@/components/animations'

const classes = [
  { 
    name: 'Nursery & KG', 
    description: 'Early childhood education with play-based learning',
    icon: Star,
    color: 'from-pink-400 to-rose-500'
  },
  { 
    name: 'Classes 1-5', 
    description: 'Primary education building foundational skills',
    icon: BookOpen,
    color: 'from-blue-400 to-indigo-500'
  },
  { 
    name: 'Classes 6-8', 
    description: 'Middle school with comprehensive curriculum',
    icon: GraduationCap,
    color: 'from-purple-400 to-violet-500'
  },
  { 
    name: 'Classes 9-10', 
    description: 'Secondary education (ICSE Board)',
    icon: Star,
    color: 'from-amber-400 to-orange-500'
  },
  { 
    name: 'Classes 11-12', 
    description: 'Senior secondary with stream options',
    icon: Sparkles,
    color: 'from-green-400 to-emerald-500'
  },
]

const streams = [
  { 
    name: 'Science', 
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'], 
    icon: FlaskConical,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  { 
    name: 'Commerce', 
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'], 
    icon: Calculator,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  { 
    name: 'Arts/Humanities', 
    subjects: ['History', 'Geography', 'Political Science', 'Economics'], 
    icon: BookOpen,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
]

const subjects = [
  { category: 'Languages', items: ['English', 'Hindi', 'Sanskrit'], color: 'bg-violet-100 text-violet-700' },
  { category: 'Science', items: ['Physics', 'Chemistry', 'Biology'], color: 'bg-blue-100 text-blue-700' },
  { category: 'Mathematics', items: ['Algebra', 'Geometry', 'Arithmetic'], color: 'bg-emerald-100 text-emerald-700' },
  { category: 'Social Studies', items: ['History', 'Geography', 'Civics'], color: 'bg-amber-100 text-amber-700' },
]

const activities = [
  { name: 'Art & Craft', icon: Palette, color: 'bg-pink-100 text-pink-600' },
  { name: 'Music & Dance', icon: Music, color: 'bg-purple-100 text-purple-600' },
  { name: 'Sports', icon: Dumbbell, color: 'bg-green-100 text-green-600' },
  { name: 'Reading Club', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
]

export default function AcademicsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
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
        </div>

        {/* Floating elements */}
        <m.div 
          className="absolute top-40 right-20 opacity-10"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <GraduationCap className="w-32 h-32 text-white" />
        </m.div>
        <m.div 
          className="absolute bottom-32 left-20 opacity-10"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <BookOpen className="w-24 h-24 text-white" />
        </m.div>

        <m.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <m.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <m.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <GraduationCap className="w-4 h-4 text-secondary-400" />
              Curriculum
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Academics
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Excellence in education with a comprehensive curriculum
            </m.p>
          </m.div>
        </m.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <ParallaxSection offset={-80} className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-400/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Our Programs</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                Classes We Offer
              </h3>
              <div className="w-20 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" stagger={0.1}>
            {classes.map((cls, index) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${cls.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white h-full relative overflow-hidden group`}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative z-10">
                    <m.div 
                      className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                    >
                      <cls.icon className="w-7 h-7" />
                    </m.div>
                    <h3 className="font-display font-bold text-lg mb-2">{cls.name}</h3>
                    <p className="text-sm text-white/80">{cls.description}</p>
                  </div>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Streams Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Senior Secondary</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                Streams in Class 11-12
              </h3>
              <div className="w-20 mx-auto">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.15}>
            {streams.map((stream, index) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -5 }}
                  className={`${stream.bgColor} border ${stream.borderColor} rounded-3xl p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stream.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <m.div 
                      className={`w-16 h-16 bg-gradient-to-br ${stream.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 10 }}
                    >
                      <stream.icon className="w-8 h-8 text-white" />
                    </m.div>
                    
                    <h3 className="font-display font-bold text-2xl text-primary-900 mb-4 break-words">
                      {stream.name}
                    </h3>
                    
                    <ul className="space-y-3">
                      {stream.subjects.map((subject, i) => (
                        <m.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <span className={`w-2 h-2 bg-gradient-to-br ${stream.color} rounded-full`} />
                          {subject}
                        </m.li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Subject Overview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary-400/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Core Subjects</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                Subject Overview
              </h3>
              <div className="w-20 mx-auto">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {subjects.map((subject, index) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className={`w-14 h-14 ${subject.color} rounded-xl flex items-center justify-center mb-5`}>
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-primary-900 mb-4">
                    {subject.category}
                  </h3>
                  <ul className="space-y-2">
                    {subject.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Resources</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Quick Links
              </h3>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto" stagger={0.1}>
            <FadeInItem direction="left" blur>
              <Link href="/academics/syllabus-homework">
                <m.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="bg-gradient-to-r from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-xl hover:border-primary-300 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-5">
                    <m.div 
                      className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                    >
                      <Clipboard className="w-8 h-8 text-white" />
                    </m.div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary-900 mb-1">Syllabus & Homework</h3>
                      <p className="text-gray-500">Curriculum details and study guidelines</p>
                    </div>
                    <m.div 
                      className="ml-auto"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 text-primary-400" />
                    </m.div>
                  </div>
                </m.div>
              </Link>
            </FadeInItem>

            <FadeInItem direction="right" blur>
              <Link href="/academics/calendar">
                <m.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="bg-gradient-to-r from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-xl hover:border-purple-300 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-5">
                    <m.div
                      className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                    >
                      <Calendar className="w-8 h-8 text-white" />
                    </m.div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary-900 mb-1">Academic Calendar</h3>
                      <p className="text-gray-500">Important dates, holidays & events</p>
                    </div>
                    <m.div
                      className="ml-auto"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 text-purple-400" />
                    </m.div>
                  </div>
                </m.div>
              </Link>
            </FadeInItem>

            <FadeInItem direction="left" blur>
              <a href="/documents/cisce-rules-for-documents.pdf" target="_blank" rel="noopener noreferrer">
                <m.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="bg-gradient-to-r from-secondary-50 to-white p-8 rounded-2xl border border-secondary-100 hover:shadow-xl hover:border-secondary-300 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-5">
                    <m.div
                      className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                    >
                      <BookOpen className="w-8 h-8 text-primary-900" />
                    </m.div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary-900 mb-1">CISCE Documents</h3>
                      <p className="text-gray-500">Rules for issuing documents</p>
                    </div>
                    <m.div
                      className="ml-auto"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 text-secondary-400" />
                    </m.div>
                  </div>
                </m.div>
              </a>
            </FadeInItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <m.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-secondary-400 tracking-wider uppercase mb-3">Beyond Classroom</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Co-Curricular Activities
              </h3>
              <div className="w-20 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We offer a wide range of activities to develop talents beyond academics
              </p>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" stagger={0.1}>
            {activities.map((activity, index) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/20 hover:border-white/20 transition-all duration-300"
                >
                  <m.div 
                    className={`w-16 h-16 ${activity.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 10 }}
                  >
                    <activity.icon className="w-8 h-8" />
                  </m.div>
                  <p className="font-display font-bold text-lg">{activity.name}</p>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
