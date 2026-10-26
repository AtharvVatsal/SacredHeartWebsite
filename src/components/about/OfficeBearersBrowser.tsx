'use client'

// The session-by-session list of office bearers (year picker, head boy and girl, captains, prefects).
// Used by the Office Bearers page and by its CMS section.
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { m } from 'framer-motion'
import { ArrowRight, Award, BookOpen, Crown, Medal, Star, User, Users } from 'lucide-react'
import { useRevealAll } from '@/components/animations/RevealContext'
import type { OfficeBearerSession } from '@/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
}

export default function OfficeBearersBrowser({ sessions, messagesHref = '/about/office-bearers/messages' }: { sessions: OfficeBearerSession[]; messagesHref?: string }) {
  // Scroll reveals; the CMS editor canvas shows everything at once
  const revealAll = useRevealAll()
  const inView = (from: Record<string, number>, to: Record<string, number>) => (revealAll ? { initial: false as const } : { initial: from, whileInView: to, viewport: { once: true } })
  const staggerInView = revealAll ? { initial: false as const, animate: 'visible' } : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } }

  // Newest session first in the data
  const [selectedYear, setSelectedYear] = useState(sessions[0]?.year)

  const currentData = sessions.find(o => o.year === selectedYear) || sessions[0]
  if (!currentData) return null
  // The messages page carries the current Head Boy and Head Girl only
  const isCurrentSession = currentData.year === sessions[0].year

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
      {/* Year Selector */}
      <div className="sticky-under-header bg-gray-50 py-4 md:py-6 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <m.div 
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            {...staggerInView}
          >
            {sessions.map((ob) => (
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
              {...inView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })}
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
                    {...inView({ opacity: 0, x: -20 }, { opacity: 1, x: 0 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center">
                      <m.div 
                        className="relative w-40 h-56 mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-white/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        {currentData.headGirlImage ? (
                          <Image
                            src={currentData.headGirlImage}
                            alt={`Head Girl ${currentData.headGirl}`}
                            fill
                            sizes="160px"
                            className="object-contain bg-primary-800"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-primary-800 flex items-center justify-center">
                            <User aria-hidden className="w-14 h-14 text-white/40" />
                          </div>
                        )}
                      </m.div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-5 h-5 text-secondary-400" />
                        <p className="text-secondary-300 text-sm font-medium">Head Girl</p>
                      </div>
                      <p className="text-xl font-display font-bold text-center mb-3">{currentData.headGirl}</p>
                      {isCurrentSession && (
                        <Link
                          href={messagesHref}
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-white transition-all flex items-center gap-2"
                        >
                          Read Message <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </m.div>
                  {/* Head Boy */}
                  <m.div 
                    className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
                    {...inView({ opacity: 0, x: 20 }, { opacity: 1, x: 0 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center">
                      <m.div 
                        className="relative w-40 h-56 mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-white/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        {currentData.headBoyImage ? (
                          <Image
                            src={currentData.headBoyImage}
                            alt={`Head Boy ${currentData.headBoy}`}
                            fill
                            sizes="160px"
                            className="object-contain bg-primary-800"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-primary-800 flex items-center justify-center">
                            <User aria-hidden className="w-14 h-14 text-white/40" />
                          </div>
                        )}
                      </m.div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-5 h-5 text-secondary-400" />
                        <p className="text-secondary-300 text-sm font-medium">Head Boy</p>
                      </div>
                      <p className="text-xl font-display font-bold text-center mb-3">{currentData.headBoy}</p>
                      {isCurrentSession && (
                        <Link
                          href={messagesHref}
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-white transition-all flex items-center gap-2"
                        >
                          Read Message <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>

            {/* Games Captains */}
            <m.div 
              className="bg-white rounded-2xl shadow-sm border p-8 mb-10"
              {...inView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })}
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
                {...inView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })}
                transition={{ duration: 0.8 }}
              >
                <h3 className="flex items-center gap-2 text-lg font-display font-bold text-primary-900 mb-4">
                  <BookOpen className="w-5 h-5 text-secondary-500" />
                  {currentData.editorialMembers ? 'Editorial Team' : 'Editors-in-Chief'}
                </h3>
                <p className="text-gray-700 font-medium">{currentData.editorsInChief}</p>
                {currentData.editorialMembers && (
                  <p className="text-gray-600 mt-3">
                    <span className="font-semibold text-primary-900">Editorial members:</span> {currentData.editorialMembers}
                  </p>
                )}
              </m.div>
            )}

            {/* House Captains */}
            <m.div 
              className="bg-white rounded-2xl shadow-sm border p-8 mb-10"
              {...inView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })}
              transition={{ duration: 0.8 }}
            >
              <h3 className="flex items-center gap-2 text-xl font-display font-bold text-primary-900 mb-6">
                <Award className="w-6 h-6 text-secondary-500" />
                House Captains & Vice Captains
              </h3>
              <m.div 
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                {...staggerInView}
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
              {...inView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })}
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
                    {...inView({ opacity: 0, x: -20 }, { opacity: 1, x: 0 })}
                    transition={{ delay: index * 0.1 }}
                  >
                    {prefect.house ? (
                      <>
                        <span className="font-display font-bold text-primary-900">{prefect.house}</span>
                        <span className="text-gray-600">{prefect.names}</span>
                      </>
                    ) : (
                      <ul className="flex flex-wrap gap-2">
                        {prefect.names.split(', ').map(name => (
                          <li key={name} className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm text-gray-700">{name}</li>
                        ))}
                      </ul>
                    )}
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Junior Captains (only for 2023) */}
            {currentData.juniorCaptains && currentData.juniorCaptains.length > 0 && (
              <m.div 
                className="bg-white rounded-2xl shadow-sm border p-8"
                {...inView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })}
                transition={{ duration: 0.8 }}
              >
                <h3 className="flex items-center gap-2 text-xl font-display font-bold text-primary-900 mb-6">
                  <Star className="w-6 h-6 text-secondary-500" />
                  Junior Captains (Primary Wing)
                </h3>
                <m.div 
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                  variants={containerVariants}
                  {...staggerInView}
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
