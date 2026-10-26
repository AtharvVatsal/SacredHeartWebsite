'use client'

import Link from 'next/link'
import { Trophy, Award, ArrowLeft } from 'lucide-react'
import { m } from 'framer-motion'
import { AchieverCards, DreamCta, FeaturedAlumnus, HighlightNote, StatCounters } from '@/components/achievements/OtherAchievementsSections'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
}

export default function OtherAchievementsPage() {
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

          <m.div className="absolute top-40 right-20" animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Trophy className="w-16 h-16 text-secondary-400/20" />
          </m.div>
          <m.div className="absolute bottom-40 left-32" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <Award className="w-12 h-12 text-secondary-400/20" />
          </m.div>
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
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <m.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                <m.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Award className="w-4 h-4 text-secondary-400" />
                </m.div>
                <span>Our Achievers</span>
              </div>
            </m.div>

            <m.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              variants={itemVariants}
            >
              Other <span className="bg-gradient-to-r from-secondary-400 via-secondary-300 to-secondary-500 bg-clip-text text-transparent">Achievements</span>
            </m.h1>

            <m.p
              className="text-xl text-gray-300"
              variants={itemVariants}
            >
              Celebrating excellence in academics, sports, and beyond
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>
      <FeaturedAlumnus />
      <StatCounters />
      <HighlightNote />
      <AchieverCards />
      <DreamCta />
    </>
  )
}
