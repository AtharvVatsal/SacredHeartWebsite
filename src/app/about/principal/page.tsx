'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, GraduationCap, Sparkles, Quote, BookOpen, Users, Heart, Star, Mail } from 'lucide-react'
import { principalMessage } from '@/data/school'
import { schoolInfo } from '@/data/school'
import { m } from 'framer-motion'

const messageParagraphs = [
  {
    icon: BookOpen,
    text: "Welcome to the Sacred Heart school website. The purpose of this website is to provide parents, students, and our school community with easy access to a wealth of information on our school programs, policies and activities.",
  },
  {
    icon: Users,
    text: "Sacred Heart school is a great place to teach and learn. Our teachers are committed to a high-quality learning experience focused on the individual needs of each child. We are striving to be creative and innovative in our instruction to engage students in their learning through a variety of activities, applications of technology and 21st century skills.",
  },
  {
    icon: Heart,
    text: "Education aims at a holistic and integral development of a student/person. It is a collective responsibility based on a deep and healthy relationship between teachers, students, parents and among students themselves. We try to connect our deep relationship with the creator, God almighty to achieve our dreams and goals.",
  },
]

const highlights = [
  { icon: GraduationCap, label: 'CISCE Affiliated', value: 'Since 1969' },
  { icon: Users, label: 'Student Strength', value: '2,600+' },
  { icon: Award, label: 'Staff Members', value: '112+' },
  { icon: Star, label: 'Years Legacy', value: '56+' },
]

export default function PrincipalPage() {
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
                  <ArrowRight className="w-4 h-4 rotate-180" />
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
                Leadership Message
              </m.div>
            </div>

            <m.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mt-8 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Principal&apos;s Message
            </m.h1>
            
            <m.p 
              className="text-xl md:text-2xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Words of wisdom from our visionary leader
            </m.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Side */}
            <m.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <m.div 
                className="absolute -top-8 -left-8 w-40 h-40 bg-secondary-400/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <m.div 
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-400/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              <div className="relative">
                <m.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl"
                >
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5]">
                    <Image 
                      src="/images/principal.webp" 
                      alt="Sr. Archana - Principal" 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary-900/90 to-transparent">
                      <m.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-white/80 mb-2"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span className="text-sm">{schoolInfo.name}</span>
                      </m.div>
                    </div>
                  </div>
                </m.div>

                {/* Floating Badge */}
                <m.div 
                  className="absolute -bottom-6 -left-6 glass px-6 py-4 rounded-2xl shadow-xl border border-white/40 backdrop-blur-md bg-white/80"
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-4">
                    <m.div 
                      className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Award className="w-6 h-6 text-white" />
                    </m.div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Experience</p>
                      <p className="text-lg font-bold text-primary-900">15+ Years</p>
                    </div>
                  </div>
                </m.div>

                {/* Quote Badge */}
                <m.div 
                  className="absolute -top-4 -right-4 glass px-4 py-3 rounded-xl shadow-xl border border-white/40 backdrop-blur-md bg-white/80"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="flex items-center gap-2">
                    <Quote className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm font-medium text-primary-900">CISCE</span>
                  </div>
                </m.div>
              </div>
            </m.div>

            {/* Content Side */}
            <m.div 
              className="lg:pt-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <m.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-100 to-secondary-50 text-secondary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-secondary-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Star className="w-4 h-4 text-secondary-500" />
                School Leadership
              </m.div>
              
              <m.h2 
                className="text-4xl md:text-5xl font-display font-bold text-primary-900 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Sr. Archana
              </m.h2>
              <p className="text-xl text-secondary-600 font-medium mb-8">Principal, {schoolInfo.name}</p>

              {/* Message Cards */}
              <div className="space-y-6 mb-10">
                {messageParagraphs.map((para, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ x: 10 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <para.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <p className="text-gray-600 leading-relaxed">{para.text}</p>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* Featured Quote */}
              <m.div 
                className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 text-white relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <Quote className="w-12 h-12 text-secondary-300 mb-4" />
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                    Education aims at a holistic and integral development of a student.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 font-medium">Sr. Archana</span>
                  </div>
                </div>
              </m.div>

              {/* Contact */}
              <m.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 group"
                >
                  <Mail className="w-5 h-5" />
                  Contact School
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </m.div>
            </m.div>
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
            {highlights.map((stat, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -10 }}
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
              Experience Our Leadership
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Under Sr. Archana&apos;s guidance, Sacred Heart continues to nurture young minds with values and excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  Back to About <ArrowRight className="w-5 h-5" />
                </m.button>
              </Link>
              <Link href="/admission">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-secondary-400 text-primary-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  Apply for Admission <ArrowRight className="w-5 h-5" />
                </m.button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
