'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, Trophy, Award, BookOpen, GraduationCap } from 'lucide-react'
import { m } from 'framer-motion'
import { FadeIn } from '@/components/animations'
import Section from '@/components/ui/Section'

export default function ToppersPage() {
  return (
    <>
      {/* Hero Section */}
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
              href="/achievements"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group"
            >
              <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </m.span>
              Back to Achievements
            </Link>
          </m.div>

          <m.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
              <m.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Award className="w-4 h-4 text-secondary-400" />
              </m.div>
              <span>Academic Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              Board Exam <span className="bg-gradient-to-r from-secondary-400 to-secondary-300 bg-clip-text text-transparent">Toppers</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Celebrating the outstanding achievements of our students
            </p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Choose Class Section */}
      <Section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="absolute -left-32 top-32 w-96 h-96 bg-secondary-100 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Select Class
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose your class to view the list of board exam toppers
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Class 10 Card */}
            <FadeIn delay={0.1} direction="up" blur>
              <Link href="/achievements/toppers/10th">
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                      Class 10
                    </h3>
                    <p className="text-gray-600 mb-6">
                      View toppers from Secondary School Examination (Class 10)
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary-700 font-semibold group-hover:gap-3 transition-all">
                      View Toppers <ArrowRight size={18} className="group-hover:translate-x-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Link>
            </FadeIn>

            {/* Class 12 Card */}
            <FadeIn delay={0.2} direction="up" blur>
              <Link href="/achievements/toppers/12th">
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <GraduationCap className="w-10 h-10 text-primary-900" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                      Class 12
                    </h3>
                    <p className="text-gray-600 mb-6">
                      View toppers from Senior School Certificate Examination (Class 12)
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary-700 font-semibold group-hover:gap-3 transition-all">
                      View Toppers <ArrowRight size={18} className="group-hover:translate-x-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-400 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Link>
            </FadeIn>
          </div>

          {/* Stats */}
          <FadeIn delay={0.3} blur>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Trophy, value: '100%', label: 'Pass Rate' },
                { icon: Award, value: '35+', label: 'Sessions Covered' },
                { icon: BookOpen, value: '200+', label: 'Toppers Listed' },
                { icon: GraduationCap, value: '15+', label: 'Years of Excellence' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                  <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-3xl font-display font-bold text-primary-900">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* CTA Section */}
      <div className="bg-primary-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <FadeIn blur>
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Be the Next Topper!
            </h3>
            <p className="text-primary-200 mb-6 max-w-xl mx-auto">
              Join Sacred Heart Senior Secondary School and excel academically
            </p>
            <Link 
              href="/admission"
              className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-3 rounded-full font-bold hover:bg-secondary-300 transition-all shadow-glow-secondary"
            >
              Apply for Admission
              <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
