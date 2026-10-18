'use client'

import { useState } from 'react'
import Image from 'next/image'
import { officeBearers } from '@/data/school'
import { User, Award, Users, Crown, Medal, BookOpen, Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { m } from 'framer-motion'
import Link from 'next/link'

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

export default function OfficeBearersPage() {
  const [selectedYear, setSelectedYear] = useState('2025')

  const currentData = officeBearers.find(o => o.year === selectedYear) || officeBearers[0]

  // House colours, dark enough for readable text on top (fg)
  const houseColors: Record<string, { bg: string; fg: string; text: string; border: string }> = {
    'Eagles': { bg: 'bg-red-700', fg: 'text-white', text: 'text-red-700', border: 'border-red-200' },
    'Pelicans': { bg: 'bg-yellow-400', fg: 'text-gray-900', text: 'text-yellow-700', border: 'border-yellow-200' },
    'Pioneers': { bg: 'bg-green-700', fg: 'text-white', text: 'text-green-700', border: 'border-green-200' },
    'Trekkers': { bg: 'bg-blue-700', fg: 'text-white', text: 'text-blue-700', border: 'border-blue-200' },
    'Lotus': { bg: 'bg-pink-700', fg: 'text-white', text: 'text-pink-700', border: 'border-pink-200' },
    'Pansy': { bg: 'bg-purple-700', fg: 'text-white', text: 'text-purple-700', border: 'border-purple-200' },
    'Rose': { bg: 'bg-red-700', fg: 'text-white', text: 'text-red-700', border: 'border-red-200' },
    'Shamrock': { bg: 'bg-emerald-700', fg: 'text-white', text: 'text-emerald-700', border: 'border-emerald-200' },
  }

  const sortedHouses = [...currentData.houseCaptains].sort((a, b) => {
    const order = ['Eagles', 'Pelicans', 'Pioneers', 'Trekkers']
    return order.indexOf(a.house) - order.indexOf(b.house)
  })

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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors w-fit">
                <ArrowLeft size={16} />
                <span>Back to About</span>
              </Link>
              
              <m.div 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-secondary-400" />
                Student Leadership
              </m.div>
            </div>

            <m.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mt-8 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Office Bearers
            </m.h1>
            <m.p 
              className="text-xl md:text-2xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Student leaders of Sacred Heart Senior Secondary School
            </m.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Year Selector */}
      <div className="bg-gray-50 py-6 sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <m.div 
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {officeBearers.map((ob) => (
              <m.button
                key={ob.year}
                type="button"
                aria-pressed={selectedYear === ob.year}
                onClick={() => setSelectedYear(ob.year)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedYear === ob.year
                    ? 'bg-primary-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Session {ob.year}
              </m.button>
            ))}
          </m.div>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Head Boy & Head Girl */}
            <m.div 
              className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 rounded-3xl p-8 mb-10 text-white relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <m.div 
                className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative z-10">
                <h2 className="text-sm font-semibold text-secondary-400 tracking-wider uppercase mb-6 text-center">
                  Session {selectedYear}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Head Girl */}
                  <m.div 
                    className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center">
                      <m.div 
                        className="relative w-40 h-56 mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-white/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src="/images/Students/HeadGirl.webp"
                          alt="Head Girl"
                          fill
                          className="object-contain bg-primary-800"
                        />
                      </m.div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-5 h-5 text-secondary-400" />
                        <p className="text-secondary-300 text-sm font-medium">Head Girl</p>
                      </div>
                      <p className="text-xl font-display font-bold text-center mb-3">{currentData.headGirl}</p>
                      <Link
                        href="/about/office-bearers/messages"
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-white transition-all flex items-center gap-2"
                      >
                        Read Message <ArrowRight size={14} />
                      </Link>
                    </div>
                  </m.div>
                  {/* Head Boy */}
                  <m.div 
                    className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center">
                      <m.div 
                        className="relative w-40 h-56 mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-white/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src="/images/Students/HeadBoy.webp"
                          alt="Head Boy"
                          fill
                          className="object-contain bg-primary-800"
                        />
                      </m.div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-5 h-5 text-secondary-400" />
                        <p className="text-secondary-300 text-sm font-medium">Head Boy</p>
                      </div>
                      <p className="text-xl font-display font-bold text-center mb-3">{currentData.headBoy}</p>
                      <Link
                        href="/about/office-bearers/messages"
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-white transition-all flex items-center gap-2"
                      >
                        Read Message <ArrowRight size={14} />
                      </Link>
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>

            {/* Games Captains */}
            <m.div 
              className="bg-white rounded-2xl shadow-sm border p-8 mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="flex items-center gap-2 text-xl font-display font-bold text-primary-900 mb-6">
                <Medal className="w-6 h-6 text-secondary-500" />
                Games Captains & Vice Captains
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <m.div 
                  className="bg-gradient-to-r from-pink-50 to-white rounded-xl p-5 border border-pink-100"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs font-semibold text-pink-600 uppercase mb-3">Girls</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Captain</span>
                      <span className="font-medium text-gray-900">{currentData.gamesCaptainGirls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vice Captain</span>
                      <span className="font-medium text-gray-900">{currentData.gamesViceCaptainGirls}</span>
                    </div>
                  </div>
                </m.div>
                <m.div 
                  className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5 border border-blue-100"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs font-semibold text-blue-600 uppercase mb-3">Boys</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Captain</span>
                      <span className="font-medium text-gray-900">{currentData.gamesCaptainBoys}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vice Captain</span>
                      <span className="font-medium text-gray-900">{currentData.gamesViceCaptainBoys}</span>
                    </div>
                  </div>
                </m.div>
              </div>
            </m.div>

            {/* Editors in Chief */}
            {currentData.editorsInChief && (
              <m.div 
                className="bg-gradient-to-r from-secondary-50 to-white rounded-2xl shadow-sm border p-6 mb-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="flex items-center gap-2 text-lg font-display font-bold text-primary-900 mb-4">
                  <BookOpen className="w-5 h-5 text-secondary-500" />
                  Editors-in-Chief
                </h3>
                <p className="text-gray-700 font-medium">{currentData.editorsInChief}</p>
              </m.div>
            )}

            {/* House Captains */}
            <m.div 
              className="bg-white rounded-2xl shadow-sm border p-8 mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="flex items-center gap-2 text-xl font-display font-bold text-primary-900 mb-6">
                <Award className="w-6 h-6 text-secondary-500" />
                House Captains & Vice Captains
              </h3>
              <m.div 
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {sortedHouses.map((house) => {
                  const colors = houseColors[house.house] || { bg: 'bg-primary-700', fg: 'text-white', text: 'text-primary-700', border: 'border-primary-200' }
                  return (
                    <m.div
                      key={house.house}
                      variants={itemVariants}
                      className={`rounded-xl p-5 ${colors.fg} ${colors.bg} relative overflow-hidden`}
                      whileHover={{ y: -5 }}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-4 h-4" />
                          <span className="font-display font-bold">{house.house}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Captain</span>
                            <span className="font-medium truncate ml-2">{house.captain}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vice</span>
                            <span className="font-medium truncate ml-2">{house.viceCaptain}</span>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  )
                })}
              </m.div>
            </m.div>

            {/* Prefects */}
            <m.div 
              className="bg-white rounded-2xl shadow-sm border p-8 mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="flex items-center gap-2 text-xl font-display font-bold text-primary-900 mb-6">
                <Users className="w-6 h-6 text-secondary-500" />
                Prefects
              </h3>
              <div className="space-y-3">
                {currentData.prefects.map((prefect, index) => (
                  <m.div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-display font-bold text-primary-900">{prefect.house}</span>
                    <span className="text-gray-600">{prefect.names}</span>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Junior Captains (only for 2023) */}
            {currentData.juniorCaptains && currentData.juniorCaptains.length > 0 && (
              <m.div 
                className="bg-white rounded-2xl shadow-sm border p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="flex items-center gap-2 text-xl font-display font-bold text-primary-900 mb-6">
                  <Star className="w-6 h-6 text-secondary-500" />
                  Junior Captains (Primary Wing)
                </h3>
                <m.div 
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {currentData.juniorCaptains.map((junior) => {
                    const colors = houseColors[junior.house] || { bg: 'bg-primary-700', fg: 'text-white', text: 'text-primary-700', border: 'border-primary-200' }
                    return (
                      <m.div
                        key={junior.house}
                        variants={itemVariants}
                        className={`rounded-xl p-5 ${colors.fg} ${colors.bg}`}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-4 h-4" />
                          <span className="font-display font-bold">{junior.house}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Captain</span>
                            <span className="font-medium truncate ml-2">{junior.captain}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vice</span>
                            <span className="font-medium truncate ml-2">{junior.viceCaptain}</span>
                          </div>
                        </div>
                      </m.div>
                    )
                  })}
                </m.div>
              </m.div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
