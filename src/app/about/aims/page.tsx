'use client'

import { Target, Heart, Lightbulb, Users, Globe, Leaf, Star, Sparkles, Quote, BookOpen, HandHeart, ArrowRight, ArrowLeft, GraduationCap } from 'lucide-react'
import { m } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const scjmVision = [
  {
    title: 'Our Foundation',
    content: 'The congregation of the Sisters of Charity of Jesus and Mary, founded by Fr. Peter Joseph Triest in Belgium in 1803, and established in India at Dalhousie in 1901, is missioned to reveal that God is love.',
  },
  {
    title: 'Our Educational Mission',
    content: 'The congregation values the Educational Apostolate of helping individuals to discover their dignity as human persons and children of God. To bring about a society based on love, justice and peace is one of the most important expressions of this mission.',
  },
  {
    title: 'Fostering Growth',
    content: 'The Endeavour of our education apostolate is to foster the personal growth of the individual: Intellectually competent, morally sound, psychologically whole, imbued with the sense of the Divine, respectful of the environment, committed to the cause of justice, love and peace.',
  },
  {
    title: 'Creating Equality',
    content: 'Our educational apostolate aims at creating a human society free from prejudice, superstition and discrimination based on gender, religion, caste and economic status, leading to concern for all, especially the under privileged.',
  },
  {
    title: 'Collaboration',
    content: 'To implement this vision, the congregation expects the collaboration of a supportive management, dedicated staff, concerned parents, and valued assistance of students both past and present, the neighboring community and government authorities.',
  },
]

const aims = [
  {
    title: 'Intellectual Excellence',
    description: 'Fostering critical thinking, creativity, and academic achievement to develop lifelong learners',
    icon: Lightbulb,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'Moral Integrity',
    description: 'Building character rooted in strong ethical principles and spiritual values',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
  },
  {
    title: 'Psychological Wellbeing',
    description: 'Supporting emotional health and nurturing confident, resilient individuals',
    icon: Users,
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Spiritual Development',
    description: 'Instilling a sense of the Divine through prayer, reflection and service',
    icon: Target,
    color: 'from-purple-400 to-violet-500',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Environmental Care',
    description: 'Cultivating respect for nature and sustainable living practices',
    icon: Leaf,
    color: 'from-emerald-400 to-green-500',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Social Justice',
    description: 'Empowering students to champion equality, peace and human dignity',
    icon: Globe,
    color: 'from-cyan-400 to-teal-500',
    bgColor: 'bg-cyan-50',
  },
]

const coreValues = [
  { name: 'Love & Compassion', icon: HandHeart, color: 'from-pink-400 to-rose-500' },
  { name: 'Integrity', icon: Star, color: 'from-amber-400 to-orange-500' },
  { name: 'Respect', icon: Users, color: 'from-blue-400 to-indigo-500' },
  { name: 'Service', icon: Heart, color: 'from-red-400 to-rose-500' },
  { name: 'Excellence', icon: GraduationCap, color: 'from-violet-400 to-purple-500' },
  { name: 'Faith', icon: Sparkles, color: 'from-yellow-400 to-amber-500' },
  { name: 'Justice', icon: Globe, color: 'from-emerald-400 to-teal-500' },
  { name: 'Inclusivity', icon: BookOpen, color: 'from-cyan-400 to-blue-500' },
]

export default function AimsPage() {
  const [activeVisionIndex, setActiveVisionIndex] = useState(0)

  return (
    <div>
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
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group"
            >
              <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </m.span>
              Back to About
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <m.span
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-secondary-400" />
              Vision & Mission
            </m.span>
            
            <m.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Our Aims
            </m.h1>
            
            <m.p 
              className="text-xl md:text-2xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Building future leaders with strong values and vision
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* S.C.J.M Vision - Interactive */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              >
                <Quote className="w-4 h-4" />
                Our Philosophy
              </m.div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900">
                S.C.J.M Vision of Education
              </h2>
              <p className="text-gray-600 mt-2">
                Click each section to learn more
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Navigation Tabs */}
              <div className="space-y-3">
                {scjmVision.map((item, index) => (
                  <m.button
                    type="button"
                    key={index}
                    aria-pressed={activeVisionIndex === index}
                    onClick={() => setActiveVisionIndex(index)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                      activeVisionIndex === index
                        ? 'bg-gradient-to-br from-primary-600 to-primary-700 border-primary-500 shadow-xl text-white'
                        : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeVisionIndex === index ? 'bg-white/20' : 'bg-primary-100'
                      }`}>
                        <span className={`font-bold ${activeVisionIndex === index ? 'text-white' : 'text-primary-600'}`}>
                          {index + 1}
                        </span>
                      </div>
                      <span className={`font-semibold ${activeVisionIndex === index ? 'text-white' : 'text-primary-900'}`}>
                        {item.title}
                      </span>
                    </div>
                  </m.button>
                ))}
              </div>

              {/* Content Display */}
              <m.div
                key={activeVisionIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold">{activeVisionIndex + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{scjmVision[activeVisionIndex].title}</h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {scjmVision[activeVisionIndex].content}
                  </p>
                </div>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Aims Grid - Enhanced */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-50 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              What We Strive For
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
              Our Aims & Objectives
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nurturing well-rounded individuals through comprehensive education
            </p>
          </m.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aims.map((aim, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-2xl hover:border-transparent transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${aim.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className={`w-20 h-20 ${aim.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${aim.color} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                    <aim.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <h3 className="font-display font-bold text-2xl text-primary-900 mb-3">
                  {aim.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {aim.description}
                </p>

                <div className={`h-1 bg-gradient-to-r ${aim.color} rounded-full mt-6 w-12 group-hover:w-20 transition-all duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values - Animated */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div 
            className="absolute top-20 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <m.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-[100px]"
            animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 bg-secondary-400/20 text-secondary-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Guiding Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">
              The principles that shape every aspect of our educational journey
            </p>
          </m.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, type: 'spring' }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 h-full flex flex-col items-center justify-center">
                  <m.div 
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </m.div>
                  <span className="font-bold text-white text-sm md:text-base">{value.name}</span>
                </div>
              </m.div>
            ))}
          </div>
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
              Experience Our Values in Action
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our school community and see how we bring these aims to life every day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  Learn More About Us <ArrowRight className="w-5 h-5" />
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
    </div>
  )
}
