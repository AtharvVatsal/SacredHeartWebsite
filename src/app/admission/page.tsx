'use client'

import Link from 'next/link'
import { ArrowRight, FileText, CreditCard, Shield, Calendar, UserPlus, GraduationCap, CheckCircle, BookOpen, Clipboard, Sparkles } from 'lucide-react'
import { m } from 'framer-motion'
import { FadeIn, StaggerContainer, FadeInItem, ParallaxSection } from '@/components/animations'

const steps = [
  { 
    title: 'Register Online', 
    description: 'Fill the online registration form', 
    icon: FileText,
    color: 'from-blue-500 to-indigo-600'
  },
  { 
    title: 'Submit Documents', 
    description: 'Upload required documents', 
    icon: Clipboard,
    color: 'from-purple-500 to-pink-600'
  },
  { 
    title: 'Assessment', 
    description: 'Student assessment/test', 
    icon: Shield,
    color: 'from-emerald-500 to-teal-600'
  },
  { 
    title: 'Confirmation', 
    description: 'Pay fees to confirm admission', 
    icon: CheckCircle,
    color: 'from-amber-500 to-orange-600'
  },
]

const requirements = [
  'Birth Certificate',
  'Previous School TC',
  'Passport Size Photos',
  'Aadhar Card (if available)',
  'Parent ID Proof',
]

const quickLinks = [
  { 
    title: 'Fee Structure', 
    description: 'View detailed fee breakdown', 
    icon: CreditCard,
    href: '/admission/fee-structure',
    color: 'from-green-500 to-emerald-600'
  },
  { 
    title: 'Uniform', 
    description: 'School uniform details', 
    icon: UserPlus,
    href: '/admission/uniform',
    color: 'from-violet-500 to-purple-600'
  },
  { 
    title: 'Rules & Regulations', 
    description: 'School policies and guidelines', 
    icon: BookOpen,
    href: '/admission/rules',
    color: 'from-rose-500 to-pink-600'
  },
]

const importantDates = [
  { label: 'Registration Opens', value: 'March 2025', icon: Calendar },
  { label: 'Last Date', value: 'June 30, 2025', icon: Calendar },
  { label: 'Assessment Date', value: 'July 2025', icon: Shield },
  { label: 'Session Starts', value: 'July 2025', icon: GraduationCap },
]

export default function AdmissionPage() {
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
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
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
          <Sparkles className="w-24 h-24 text-white" />
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
              Admissions 2025
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Admission
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join our school family for a bright future
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

      {/* Admission Process */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <ParallaxSection offset={-80} className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-400/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-500 tracking-wider uppercase mb-3">Step by Step</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                Admission Process
              </h3>
              <div className="w-20 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to secure your child&apos;s future
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {steps.map((step, index) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${step.color} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white relative overflow-hidden group h-full`}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <m.div 
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                    >
                      <step.icon className="w-8 h-8" />
                    </m.div>
                    
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl mb-4 text-primary-900">
                      {index + 1}
                    </div>
                    
                    <h3 className="font-display font-bold text-xl mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>

          <FadeIn blur>
            <div className="text-center mt-12">
              <Link href="/admission/register">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white px-10 py-5 rounded-full font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-xl hover:shadow-2xl"
                >
                  Register Now
                  <ArrowRight size={20} />
                </m.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl p-10 shadow-xl border border-primary-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-400/10 rounded-full blur-[80px]" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-900">Documents Required</h3>
                      <p className="text-gray-500">Please bring these during admission</p>
                    </div>
                  </div>
                  
                  <StaggerContainer className="grid md:grid-cols-2 gap-4" stagger={0.05}>
                    {requirements.map((req, index) => (
                      <FadeInItem key={index} direction="right">
                        <m.div 
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
                        >
                          <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-secondary-600" />
                          </div>
                          <span className="font-medium text-gray-700">{req}</span>
                        </m.div>
                      </FadeInItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary-400/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-secondary-500 tracking-wider uppercase mb-3">Resources</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Quick Links
              </h3>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" stagger={0.1}>
            {quickLinks.map((link, index) => (
              <FadeInItem key={index} direction="up" blur>
                <Link href={link.href}>
                  <m.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`bg-gradient-to-br ${link.color} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white relative overflow-hidden group h-full`}
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className="relative z-10">
                      <m.div 
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 10 }}
                      >
                        <link.icon className="w-8 h-8" />
                      </m.div>
                      
                      <h3 className="font-display font-bold text-2xl mb-2">
                        {link.title}
                      </h3>
                      <p className="text-white/80">
                        {link.description}
                      </p>
                      
                      <div className="mt-6 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                        <span className="font-medium">Learn more</span>
                        <m.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight size={18} />
                        </m.div>
                      </div>
                    </div>
                  </m.div>
                </Link>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-secondary-500 tracking-wider uppercase mb-3">Mark Your Calendar</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Important Dates
              </h3>
              <div className="w-20 mx-auto">
                <div className="h-1 bg-secondary-400 rounded-full mx-auto" />
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" stagger={0.1}>
            {importantDates.map((date, index) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 text-center relative overflow-hidden group"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                      <date.icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{date.label}</p>
                    <p className="font-display font-bold text-xl text-primary-900">{date.value}</p>
                  </div>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Take the first step towards your child&apos;s bright future at Sacred Heart Senior Secondary School
            </p>
          </FadeIn>
          
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/admission/register">
              <m.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-secondary-400 text-primary-900 px-10 py-5 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-xl hover:shadow-2xl"
              >
                Apply Now
                <ArrowRight size={20} />
              </m.button>
            </Link>
          </m.div>
        </div>
      </section>
    </>
  )
}
