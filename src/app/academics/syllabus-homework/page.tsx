'use client'

import { BookOpen, Clipboard, Lightbulb, Pen, Calendar, Award, GraduationCap, Brain, Sparkles, ArrowLeft, Target, Clock, Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { m } from 'framer-motion'

const subjects = [
  { 
    category: 'Core Subjects', 
    items: ['English', 'Hindi', 'Mathematics', 'Social Studies', 'Sanskrit'],
    color: 'from-blue-500 to-indigo-600',
    icon: BookOpen
  },
  { 
    category: 'Science', 
    items: ['Physics', 'Chemistry', 'Biology', 'General Science'],
    color: 'from-emerald-500 to-green-600',
    icon: Star
  },
  { 
    category: 'Computer & Other', 
    items: ['Computer Science', 'Environmental Education', 'SUPW'],
    color: 'from-purple-500 to-violet-600',
    icon: Brain
  },
]

const streams = [
  { 
    name: 'Medical', 
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Hindi'], 
    color: 'from-green-400 to-emerald-600',
    description: 'For students aspiring to pursue medicine and healthcare careers'
  },
  { 
    name: 'Non-Medical', 
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Hindi'], 
    color: 'from-blue-400 to-indigo-600',
    description: 'For students interested in engineering and technology'
  },
  { 
    name: 'Commerce', 
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Hindi'], 
    color: 'from-amber-400 to-orange-500',
    description: 'For students aiming for business and finance careers'
  },
]

const suggestions = [
  { icon: Pen, title: 'Start with Difficult Subjects', description: 'Take up first the subject you dislike the most. Once you have done that, the rest of your work will be easy.', color: 'from-red-400 to-rose-500' },
  { icon: Brain, title: 'Ask Questions', description: 'Do not hesitate to ask your teacher or companions lessons you do not grasp clearly. Never leave difficulties unanswered.', color: 'from-purple-400 to-violet-500' },
  { icon: Lightbulb, title: 'Take Breaks', description: 'Do not continue when you are tired. Take pleasant interruptions to refresh your mind.', color: 'from-amber-400 to-orange-500' },
  { icon: Award, title: 'Exercise & Yoga', description: 'Get enough exercise and yoga every day, it keeps the mind fresh and focused.', color: 'from-emerald-400 to-green-500' },
  { icon: Clock, title: 'Practice Meditation', description: 'Practice meditation to improve focus, concentration and mental clarity.', color: 'from-blue-400 to-indigo-500' },
  { icon: Heart, title: 'Pray for Guidance', description: 'Pray often to God to help you make progress in your studies and life.', color: 'from-pink-400 to-rose-500' },
]

export default function SyllabusHomeworkPage() {
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
              href="/academics"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group w-fit"
            >
              <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </m.span>
              Back to Academics
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 w-fit">
              <m.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-4 h-4 text-secondary-400" />
              </m.div>
              <span>Academics</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mt-8 mb-4">
              Syllabus & <span className="bg-gradient-to-r from-secondary-400 to-secondary-300 bg-clip-text text-transparent">Homework</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Curriculum details and study guidelines
            </p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Academic Overview */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-8 py-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-500/10 rounded-full blur-[60px]" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-secondary-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-white">Academic Curriculum</h2>
                    <p className="text-primary-200 text-sm">CISCE Affiliated School</p>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  All the courses are designed to lead to the <strong className="text-primary-700">Indian School Certificate of Secondary Education Examination</strong> conducted by the Council for the Indian School Certificate Examination, New Delhi, which will be held at the conclusion of Class X and XII.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  A place of learning that transcends educational boundaries to ethics and life experiences; the school upholds its standards as one of the best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Our Subjects
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-3">
              Subjects Offered
            </h2>
            <p className="text-gray-600">Comprehensive curriculum for holistic development</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subjects.map((group, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${group.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className={`w-16 h-16 bg-gradient-to-br ${group.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <group.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-display font-bold text-xl text-primary-900 mb-4">
                  {group.category}
                </h3>
                
                <ul className="space-y-3">
                  {group.items.map((subject, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 group-hover:text-gray-800 transition-colors">
                      <span className={`w-2.5 h-2.5 bg-gradient-to-br ${group.color} rounded-full flex-shrink-0`} />
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streams */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Career Paths
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-3">
              Streams for Class XI & XII
            </h2>
            <p className="text-gray-600">Choose your path to success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {streams.map((stream, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${stream.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full blur-2xl`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stream.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl text-primary-900 mb-2">
                    {stream.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{stream.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {stream.subjects.map((subject, i) => (
                      <span key={i} className={`px-3 py-1 bg-gradient-to-r ${stream.color} text-white text-xs font-medium rounded-full`}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Homework */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-secondary-50 to-amber-50 rounded-3xl p-8 md:p-10 border border-secondary-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Clipboard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-primary-900 mb-4">Homework Guidelines</h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    Parents should encourage their children to do their homework regularly and independently.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Lightbulb className="w-4 h-4" />
                    Private tuition must be discouraged
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Tips */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div
            className="absolute top-20 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.1, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary-400/20 text-secondary-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              Study Tips
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              How to Make Learning Easy
            </h2>
            <p className="text-primary-200">Suggestions for effective studying</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {suggestions.map((tip, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <tip.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-primary-100 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-4">
              Ready to Join Us?
            </h2>
            <p className="text-gray-600 mb-8">
              Discover the Sacred Heart experience and begin your journey to excellence.
            </p>
            <Link 
              href="/admission"
              className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-primary-800 transition-all"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
