'use client'

import Image from 'next/image'
import Link from 'next/link'
import { staffMembers as defaultStaffMembers, statistics, schoolInfo } from '@/data/school'
import { formatStat } from '@/lib/stats'
import { Users, ArrowLeft, Sparkles, Award, Heart, GraduationCap, Mail } from 'lucide-react'
import { m } from 'framer-motion'
import HeroDecor from '@/components/layout/HeroDecor'
import { Users as HeroMotif, GraduationCap as HeroMotifSmall } from 'lucide-react'
import StaffDirectory from '@/components/about/StaffDirectory'

export default function StaffPage() {
  const staff = defaultStaffMembers

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

      <StaffDirectory staff={staff} />

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
