'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, History, Target, Users, Award, BookOpen, Music, Sparkles, Heart, Building, GraduationCap, Star, Palette, Flower2, Monitor, Dumbbell, Compass } from 'lucide-react'
import { schoolInfo as defaultSchoolInfo, principalMessage as defaultPrincipalMessage, staffMembers } from '@/data/school'
import { useSchoolInfo, usePrincipalMessage, useSchoolHistory, useSchoolAnthem } from '@/lib/useCMS'
import { m } from 'framer-motion'
import { FadeIn, StaggerContainer, FadeInItem, ParallaxSection } from '@/components/animations'

const aboutNav = [
  { href: '/about/history', label: 'History', icon: History, color: 'from-amber-500 to-orange-600' },
  { href: '/about/aims', label: 'Our Aims', icon: Target, color: 'from-emerald-500 to-teal-600' },
  { href: '/about/principal', label: "Principal's Message", icon: Users, color: 'from-blue-500 to-indigo-600' },
  { href: '/about/staff', label: 'Staff', icon: BookOpen, color: 'from-purple-500 to-pink-600' },
  { href: '/about/office-bearers', label: 'Office Bearers', icon: Award, color: 'from-rose-500 to-red-600' },
  { href: '/about/pass-out-batches', label: 'Pass Out Batches', icon: GraduationCap, color: 'from-cyan-500 to-blue-600' },
]

// What the school sets out to build in every student
const growthAreas = [
  { label: 'Indian art & culture', icon: Palette },
  { label: 'Music, theatre & dance', icon: Music },
  { label: 'Yoga', icon: Flower2 },
  { label: 'Computer literacy', icon: Monitor },
  { label: 'Physical fitness', icon: Dumbbell },
  { label: 'Leadership', icon: Compass },
]

const stats = [
  { icon: GraduationCap, value: '1969', label: 'Established', color: 'from-emerald-500 to-teal-600' },
  // Counted from the staff list so it always matches /about/staff
  { icon: Users, value: String(staffMembers.length), label: 'Staff Members', color: 'from-blue-500 to-indigo-600' },
  { icon: Heart, value: 'CISCE', label: 'Affiliation', color: 'from-rose-500 to-pink-600' },
  { icon: Star, value: '56+', label: 'Years of Excellence', color: 'from-amber-500 to-orange-600' },
]

export default function AboutPage() {
  const { data: schoolInfo } = useSchoolInfo()
  const { data: principalMsg } = usePrincipalMessage()
  const { data: history } = useSchoolHistory()
  const { data: anthem } = useSchoolAnthem()

  const info = schoolInfo || defaultSchoolInfo
  const principal = principalMsg?.message || defaultPrincipalMessage

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
          <Building className="w-32 h-32 text-white" />
        </m.div>
        <m.div 
          className="absolute bottom-32 left-20 opacity-10"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Heart className="w-24 h-24 text-white" />
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
              <Sparkles className="w-4 h-4 text-secondary-400" />
              Our Story
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About Us
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover the legacy and values that define Sacred Heart Senior Secondary School
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto" stagger={0.1}>
            {stats.map((stat, index) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white relative overflow-hidden group`}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative z-10 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                    <p className="text-2xl min-[360px]:text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm opacity-80">{stat.label}</p>
                  </div>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Explore</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Discover More About Us
              </h3>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.08}>
            {aboutNav.map((item, index) => (
              <FadeInItem key={item.href} direction="up" blur>
                <Link href={item.href}>
                  <m.div
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group h-full flex flex-col items-center justify-center text-center"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-white group-hover:to-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                      <item.icon className="w-7 h-7 text-primary-900 group-hover:text-primary-700 transition-colors" />
                    </div>
                    <span className="font-medium text-gray-800 group-hover:text-white text-sm relative z-10 transition-colors">
                      {item.label}
                    </span>
                  </m.div>
                </Link>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <FadeIn blur className="lg:col-span-3">
              <span className="text-sm font-semibold text-secondary-800 tracking-wider uppercase">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mt-3 mb-6 leading-tight">
                We don&apos;t only teach our students. We help them grow.
              </h2>
              <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
                <p>
                  The school aims at the holistic growth of every student, nurturing a positive and healthy physical, emotional and intellectual attitude. We build an awareness of social responsibility and an appreciation of Indian art, culture, music, theatre, dance and yoga, alongside computer literacy and an understanding of physical fitness. Together, these form the core of a well-balanced personality.
                </p>
                <p>
                  Our objective is to equip students mentally, morally, physically and culturally to become worthy global citizens, who guard the noble traditions they inherit while making progress in a modern, scientific way. We develop initiative and leadership in students who are disciplined and educated in mind and spirit, ready to serve their country, to lead others and to fulfil their own dreams and aspirations.
                </p>
              </div>
            </FadeIn>
            <StaggerContainer className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4" stagger={0.06}>
              {growthAreas.map(area => (
                <FadeInItem key={area.label} direction="up">
                  <div className="h-full bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-3">
                      <area.icon aria-hidden className="w-5 h-5 text-primary-700" />
                    </div>
                    <p className="font-semibold text-primary-900 text-sm sm:text-base leading-snug">{area.label}</p>
                  </div>
                </FadeInItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Our Journey Through Time */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn blur>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-secondary-800 tracking-wider uppercase">Our Heritage</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-900 mt-3">
                Our Journey Through Time
              </h2>
              <div className="w-16 h-1 bg-secondary-400 rounded-full mx-auto mt-6" />
            </div>
          </FadeIn>

          <div className="max-w-6xl mx-auto mt-16">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
            >
              {/* Desktop Timeline */}
              <div className="hidden md:block">
                <div className="flex justify-between">
                  {[
                    { year: '1803', title: 'The Foundation', desc: 'Sisters of Charity founded by Fr. Peter Joseph Triest in Belgium' },
                    { year: '1901', title: 'Arrival in India', desc: 'Established in Dalhousie as educational hub' },
                    { year: '1966', title: 'New Beginnings', desc: 'Five sisters arrived at Yol camp' },
                    { year: '1967', title: 'Sacred Heart', desc: 'School renamed, grew to 300 students' },
                    { year: '1969', title: 'Move to Sidhpur', desc: 'New campus completed, 16.52 acres' },
                    { year: '1970', title: 'Inauguration', desc: 'Dr. Y.S. Parmar inaugurated school' },
                  ].map((item, index) => (
                    <m.div
                      key={item.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex-1 flex flex-col items-center text-center px-3"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex flex-col items-center justify-center shadow-lg mb-5">
                        <span className="text-white font-bold text-lg">{item.year}</span>
                      </div>
                      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-5 rounded-xl w-full">
                        <h3 className="font-bold text-primary-900 text-base mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { year: '1803', title: 'The Foundation', desc: 'Sisters of Charity founded in Belgium' },
                    { year: '1901', title: 'Arrival in India', desc: 'Established in Dalhousie' },
                    { year: '1966', title: 'New Beginnings', desc: 'Five sisters arrived at Yol camp' },
                    { year: '1967', title: 'Sacred Heart', desc: 'School renamed, grew to 300 students' },
                    { year: '1969', title: 'Move to Sidhpur', desc: 'New campus completed' },
                    { year: '1970', title: 'Inauguration', desc: 'Dr. Y.S. Parmar inaugurated' },
                  ].map((item, index) => (
                    <m.div
                      key={item.year}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-gradient-to-br from-primary-50 to-secondary-50 p-3 min-[360px]:p-5 rounded-xl text-center break-words hyphens-auto"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow mb-4 mx-auto">
                        <span className="text-white font-bold text-base">{item.year}</span>
                      </div>
                      <h3 className="font-bold text-primary-900 text-sm min-[360px]:text-base mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </m.div>
                  ))}
                </div>
              </div>

              {/* End marker */}
              <div className="flex justify-center mt-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <span className="mt-3 text-primary-700 font-semibold">Legacy Continues</span>
                </div>
              </div>
            </m.div>
          </div>

          <FadeIn blur>
            <div className="mt-12 text-center">
              <Link href="/about/history" className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl">
                Read Full History <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* School Anthem */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <m.div 
            className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <m.div 
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <m.div 
                className="inline-flex items-center justify-center w-20 h-20 bg-secondary-400 rounded-full mb-6 shadow-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Music className="w-10 h-10 text-primary-900" />
              </m.div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">School Anthem</h2>
              <div className="w-20 mx-auto">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
            </div>
          </FadeIn>
          
          <m.div 
            className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              {anthem.split('\n\n').map((stanza: string, index: number) => (
                <m.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  {stanza.split('\n').map((line: string, lineIndex: number) => (
                    <p key={lineIndex} className={`italic ${lineIndex === 0 ? 'font-medium text-lg text-secondary-300' : 'text-white/80'}`}>
                      {line}
                    </p>
                  ))}
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* Principal Message Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-primary-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary-50/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-white to-primary-50 rounded-3xl shadow-2xl p-10 md:p-14 border border-primary-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-400/10 rounded-full blur-[80px]" />
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <m.div 
                      className="relative w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full shadow-xl" />
                      <div className="absolute inset-2 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center overflow-hidden">
                        <Image
                          src="/images/principal.webp"
                          alt={info.principal}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-secondary-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <GraduationCap className="w-6 h-6 text-primary-900" />
                      </div>
                    </m.div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <Users className="w-4 h-4" />
                        Leadership
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-2">
                        Principal&apos;s Message
                      </h2>
                      <p className="text-xl text-secondary-800 font-medium mb-6">{info.principal}</p>
                      <p className="text-gray-600 leading-relaxed mb-8 text-lg italic">
                        &quot;{principal.split('.')[0]}...&quot;
                      </p>
                      <m.div whileHover={{ scale: 1.05 }} className="inline-flex">
                        <Link href="/about/principal" className="active:scale-[0.98] inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:from-primary-500 hover:to-primary-600 transition-all shadow-lg hover:shadow-xl">
                          Read Full Message
                          <m.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <ArrowRight size={18} />
                          </m.div>
                        </Link>
                      </m.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn blur>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Join Our School Family
            </h2>
            <p className="text-gray-200 mb-10 max-w-2xl mx-auto text-lg">
              Give your child the gift of quality education rooted in values and excellence. Contact the school office to ask about admissions for the coming session.
            </p>
          </FadeIn>
          
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <m.div whileHover={{ scale: 1.05, y: -2 }} className="inline-flex">
              <Link href="/admission" className="active:scale-[0.98] inline-flex items-center gap-3 bg-secondary-400 text-primary-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-secondary-300 transition-all shadow-xl hover:shadow-2xl">
                Apply Now
                <ArrowRight size={20} />
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>
    </>
  )
}
