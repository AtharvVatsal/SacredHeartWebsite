'use client'

import Link from 'next/link'
import { ArrowRight, Trophy, Star, Medal, Sparkles, Award } from 'lucide-react'
import { achievements as defaultAchievements, class10Toppers as defaultClass10Toppers, class12Toppers as defaultClass12Toppers } from '@/data/school'
import { useAchievements, useClass10Toppers, useClass12Toppers } from '@/lib/useCMS'
import type { Achievement, Topper } from '@/types'
import { m } from 'framer-motion'
import { FadeIn } from '@/components/animations'

export default function AchievementsPage() {
  const { data: achievements } = useAchievements()
  const { data: class10 } = useClass10Toppers()
  const { data: class12 } = useClass12Toppers()

  const achvs: Achievement[] = achievements || defaultAchievements
  const top10: Topper[] = class10 || defaultClass10Toppers
  const top12: Topper[] = class12 || defaultClass12Toppers

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
          <Trophy className="w-32 h-32 text-white" />
        </m.div>
        <m.div 
          className="absolute bottom-32 left-20 opacity-10"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Award className="w-24 h-24 text-white" />
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
              <Trophy className="w-4 h-4 text-secondary-400" />
              Excellence
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Achievements
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Celebrating excellence in academics, sports, and beyond
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-primary-900 mb-8 text-center">
              Notable Achievements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achvs.map((achievement: Achievement) => (
                <div key={achievement.id} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm font-medium text-secondary-600">{achievement.year}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">{achievement.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                  {achievement.studentName && (
                    <p className="text-primary-900 font-medium text-sm mt-2">
                      Student: {achievement.studentName}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-primary-900 mb-6">
                  Class 10 Toppers 2024
                </h2>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {top10.slice(0, 5).map((topper: Topper, index: number) => (
                    <div key={topper.id} className="flex items-center justify-between p-4 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-secondary-400 text-primary-900' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{topper.name}</span>
                      </div>
                      <span className="font-display font-bold text-primary-900">{topper.percentage}%</span>
                    </div>
                  ))}
                </div>
                <Link href="/achievements/toppers" className="inline-flex items-center gap-2 mt-4 text-primary-900 font-semibold">
                  View All <ArrowRight size={16} />
                </Link>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-primary-900 mb-6">
                  Class 12 Toppers 2024
                </h2>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {top12.slice(0, 5).map((topper: Topper, index: number) => (
                    <div key={topper.id} className="flex items-center justify-between p-4 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-secondary-400 text-primary-900' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{topper.name}</span>
                      </div>
                      <span className="font-display font-bold text-primary-900">{topper.percentage}%</span>
                    </div>
                  ))}
                </div>
                <Link href="/achievements/toppers" className="inline-flex items-center gap-2 mt-4 text-primary-900 font-semibold">
                  View All <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
