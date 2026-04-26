'use client'

import { Calendar, Users, GraduationCap, Landmark, Sparkles, Heart, ChevronDown, BookOpen, Clock, Award } from 'lucide-react'
import { m } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

const milestones = [
  {
    year: '1803',
    title: 'Foundation',
    subtitle: 'Sisters of Charity Established',
    content: 'The congregation of the Sisters of Charity of Jesus and Mary was founded by Fr. Peter Joseph Triest in Belgium.',
    icon: '🏛️',
  },
  {
    year: '1901',
    title: 'Arrival in India',
    subtitle: 'Beginning the Indian Journey',
    content: 'The congregation established its presence in India, starting in Dalhousie, and Amritsar became well-established hubs for educational work.',
    icon: '🇮🇳',
  },
  {
    year: '1966',
    title: 'New Beginnings',
    subtitle: 'Five Pioneering Sisters',
    content: 'On August 26, 1966, five pioneering sisters led by Sr. Corneliana Heemskeek arrived at Yol Camp to organize the school.',
    icon: '⛺',
  },
  {
    year: '1967',
    title: 'Sacred Heart Garrison School',
    subtitle: 'Name & Growth',
    content: 'By January 1967, the school was officially renamed Sacred Heart Garrison School. It expanded to 300 students following the arrival of the army\'s 4th Mountain Division.',
    icon: '🏫',
  },
  {
    year: '1968',
    title: 'A Vision for Growth',
    subtitle: 'Land Acquisition & New Leadership',
    content: 'A picturesque 16.52-acre plot was acquired along the main road in Sidhpur. Mother Philip Murphy arrived as the new superior.',
    icon: '🔭',
  },
  {
    year: '1969',
    title: 'The Move to Sidhpur',
    subtitle: 'Building Dreams',
    content: 'Under the guidance of Sardar Dharam Singh, the new school and convent were constructed. Classes officially began at the Sidhpur campus.',
    icon: '🏗️',
  },
  {
    year: '1970',
    title: 'Formal Inauguration',
    subtitle: 'A Historic Moment',
    content: 'Dr. Y.S. Parmar, Chief Minister of Himachal Pradesh, formally inaugurated Sacred Heart High School, Sidhpur.',
    icon: '🎉',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  },
}

function MilestoneCard({ milestone, index, isActive, onClick }: { milestone: typeof milestones[0], index: number, isActive: boolean, onClick: () => void }) {
  return (
    <m.div
      variants={cardVariants}
      className="relative"
    >
      <m.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-br from-primary-600 to-primary-700 border-primary-500 shadow-xl' 
            : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-lg'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
            isActive ? 'bg-white/20' : 'bg-gradient-to-br from-primary-100 to-secondary-100'
          }`}>
            {milestone.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-2xl font-bold ${isActive ? 'text-secondary-300' : 'text-primary-600'}`}>
                {milestone.year}
              </span>
              {isActive && (
                <m.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-0.5 bg-secondary-400 text-primary-900 text-xs font-bold rounded-full"
                >
                  Active
                </m.span>
              )}
            </div>
            <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-primary-900'}`}>
              {milestone.title}
            </h3>
            <p className={`text-sm ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
              {milestone.subtitle}
            </p>
          </div>
          <m.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isActive ? 'bg-white/20' : 'bg-gray-100'
            }`}
          >
            <ChevronDown className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
          </m.div>
        </div>

        <m.div
          initial={false}
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={`mt-6 pt-6 border-t ${isActive ? 'border-white/20' : 'border-gray-100'}`}>
            <p className={`leading-relaxed ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
              {milestone.content}
            </p>
          </div>
        </m.div>
      </m.button>

      {!isActive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </m.div>
  )
}

export default function HistoryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-24 overflow-hidden">
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-400/5 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/about" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
              <m.div
                whileHover={{ x: -5 }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to About
              </m.div>
            </Link>
          </m.div>
          
          <div className="max-w-3xl">
            <m.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-secondary-400" />
              Our Journey
            </m.div>
            
            <m.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Our History
            </m.h1>
            
            <m.p 
              className="text-xl md:text-2xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A legacy of excellence since 1969
            </m.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              >
                <Clock className="w-4 h-4" />
                Interactive Timeline
              </m.div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900">
                Click to Explore
              </h2>
              <p className="text-gray-600 mt-2">
                Each milestone shaped our journey
              </p>
            </div>

            <m.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {milestones.map((milestone, index) => (
                <MilestoneCard
                  key={milestone.year}
                  milestone={milestone}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                />
              ))}
            </m.div>

            <m.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="flex justify-center mt-16"
            >
              <div className="flex flex-col items-center">
                <m.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                >
                  <Heart className="w-10 h-10 text-white" />
                </m.div>
                <span className="mt-4 text-primary-700 font-bold text-lg">Legacy Continues</span>
                <span className="text-gray-500 text-sm">Since 1969</span>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div 
            className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-5 mix-blend-overlay"
          />
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
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-14">
              <m.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-16 h-16 bg-secondary-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <Landmark className="w-8 h-8 text-primary-900" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Our Mission</h2>
                  <p className="text-secondary-300 text-sm">Guiding Light</p>
                </div>
              </m.div>
              
              <m.p 
                className="text-gray-200 leading-relaxed text-lg md:text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                To foster a society founded on love, justice, and peace. We are deeply committed to the educational apostolate, dedicating ourselves to helping every individual discover their inherent dignity and potential as human beings and children of God.
              </m.p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Our History & Heritage Section */}
      <section className="py-24 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <m.div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4" />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900">
                Our History & Heritage
              </h2>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
            >
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Sacred Heart Senior Secondary School in Sidhpur is proudly owned and operated by the congregation of the Sisters of Charity of Jesus and Mary. Founded in Belgium in 1803 by Fr. Peter Joseph Triest, the congregation expanded to India in 1901, establishing its early roots in Dalhousie.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                The story of our modern campus began in the aftermath of the 1965 Indo-Pak war. Military officials reached out to the provincial superior in Amritsar, requesting the Sisters to take over the Garrison school at Yol Camp. Given the congregation&apos;s established educational presence in the region, they accepted the mission. On August 26, 1966, five pioneering sisters, led by Sr. Corneliana Heemskeek, arrived at Yol Camp. By January 1967, the primary school—then operating out of six military bungalows with 150 students—was officially renamed Sacred Heart Garrison School.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                As the student body rapidly expanded to 300 following the arrival of the army&apos;s 4th Mountain Division, the need for a larger, permanent home became critical. With the help of Fr. Dominic Perumpanani, a picturesque 16.52-acre plot of land was acquired along the main road in Sidhpur. Under the leadership of Mother Philip Murphy and the architectural guidance of Sardar Dharam Singh, the new school and convent were constructed.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                In March 1970, the late Dr. Y.S. Parmar, then Chief Minister of Himachal Pradesh, formally inaugurated Sacred Heart High School, Sidhpur. From that momentous day onward, the school has grown by leaps and bounds.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* A Standard of Excellence Section */}
      <section className="py-24 bg-gradient-to-br from-secondary-50 via-white to-primary-50 relative overflow-hidden">
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <m.div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                Our Legacy
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900">
                A Standard of Excellence
              </h2>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl shadow-xl p-8 md:p-12 text-white"
            >
              <p className="text-gray-200 leading-relaxed text-lg mb-6">
                Ever since its inception, Sacred Heart has maintained an unwavering commitment to high educational standards. Over the decades, the school has carved a distinct niche for itself, shaping the lives, character, and futures of countless students who have passed through its gates.
              </p>
              <p className="text-gray-200 leading-relaxed text-lg mb-6">
                As the years rolled on, the institution grew in strength and expanded physically to meet the needs of modern education. A major milestone in this journey was the inauguration of our spectacular auditorium in 2012.
              </p>
              <p className="text-gray-200 leading-relaxed text-lg">
                Today, Sacred Heart continues to excel in every facet of student development—fostering outstanding achievements in academics, sports, and co-curricular activities alike.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <m.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <m.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 p-10 rounded-3xl text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Calendar className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-5xl font-display font-bold text-primary-900 mb-2">1969</div>
                  <p className="text-gray-600 font-medium">School Established</p>
                </div>
              </m.div>
              
              <m.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-secondary-400 to-secondary-500 p-10 rounded-3xl text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Users className="w-8 h-8 text-primary-900" />
                  </div>
                  <div className="text-5xl font-display font-bold text-primary-900 mb-2">56+</div>
                  <p className="text-primary-800 font-medium">Years of Excellence</p>
                </div>
              </m.div>
              
              <m.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 p-10 rounded-3xl text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <GraduationCap className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-5xl font-display font-bold text-primary-900 mb-2">10K+</div>
                  <p className="text-gray-600 font-medium">Alumni</p>
                </div>
              </m.div>
            </div>
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
              Explore More About Us
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our achievements, meet our dedicated staff, and learn about the values that guide our school.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Back to About
                </m.button>
              </Link>
              <Link href="/admission">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-secondary-400 text-primary-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Apply for Admission
                </m.button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
