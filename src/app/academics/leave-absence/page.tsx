'use client'

import { FileText, AlertCircle, Calendar, CheckCircle, Clock, Shield, Phone, ArrowLeft } from 'lucide-react'
import { m } from 'framer-motion'
import Link from 'next/link'
import { schoolPhones, telHref } from '@/lib/contact'

export default function LeaveAbsencePage() {
  const rules = [
    {
      title: 'Regular Attendance',
      description: 'The school does not appreciate frequent requests for grant of leave as regular attendance is very important for the progress of the students.',
      icon: Calendar,
    },
    {
      title: 'Exam Period Leave',
      description: 'School is not responsible for any leave after the announcement of examination dates.',
      icon: AlertCircle,
    },
    {
      title: 'Short Leave (1-2 days)',
      description: 'Leave of absence for 1-2 days may be requested through the pages of the school diary.',
      icon: FileText,
    },
    {
      title: 'Extended Leave (3+ days)',
      description: 'For leave of absence for more than 2 days, a written application is required. In such cases the reason must be clearly stated.',
      icon: FileText,
    },
    {
      title: 'Medical Leave',
      description: 'Medical leave must be followed by a Medical Certificate.',
      icon: Shield,
    },
    {
      title: 'Attendance Record',
      description: 'Every absence (sick leave or otherwise) must be entered briefly in the NON ATTENDANCE and leave record page and be signed by the parent or guardian.',
      icon: CheckCircle,
    },
    {
      title: 'No Half-Day Leave',
      description: 'School will not grant half day leave to the students.',
      icon: Clock,
    },
    {
      title: 'Term Opening & Closing',
      description: 'Presence of the Student on the opening and closing days of each term is compulsory. In case of illness the school authorities must be notified in time and a medical certificate be produced.',
      icon: Calendar,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  }

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

        <m.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/academics"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group"
            >
              <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </m.span>
              Back to Academics
            </Link>
          </m.div>

          <m.span
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FileText className="w-4 h-4 text-secondary-400" />
            School Policies
          </m.span>
          <m.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Leave & Absence
          </m.h1>
          <m.p
            className="text-xl md:text-2xl text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Guidelines for leave and attendance policies
          </m.p>
        </m.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container mx-auto px-4">
          <m.div 
            className="flex items-center justify-center gap-3 text-amber-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="w-6 h-6" />
            <span className="font-medium text-lg">Regular attendance is crucial for student progress</span>
          </m.div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <m.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-8 py-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-500/10 rounded-full blur-[60px]" />
                <m.h2 
                  className="text-2xl font-display font-bold text-white flex items-center gap-3 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <FileText className="w-7 h-7 text-secondary-400" />
                  Leave & Absence Guidelines
                </m.h2>
              </div>
              <div className="p-8">
                <m.div 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {rules.map((rule, index) => (
                    <m.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                    >
                      <m.div 
                        className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary-600 group-hover:to-primary-700 transition-all"
                        whileHover={{ rotate: 5 }}
                      >
                        <rule.icon className="w-6 h-6 text-primary-900 group-hover:text-white transition-colors" />
                      </m.div>
                      <div>
                        <m.h3 className="font-display font-bold text-primary-900 mb-1">
                          {rule.title}
                        </m.h3>
                        <m.p className="text-gray-600 text-sm leading-relaxed">
                          {rule.description}
                        </m.p>
                      </div>
                    </m.div>
                  ))}
                </m.div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div 
            className="absolute top-20 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <m.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"
            animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <m.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Questions?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              For any clarification regarding leave policies, please contact the school office.
            </p>
            <a
              href={telHref(schoolPhones[0])}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Phone aria-hidden className="w-5 h-5 text-secondary-400" />
              <span>Call {schoolPhones[0]}</span>
            </a>
          </m.div>
        </div>
      </section>
    </>
  )
}