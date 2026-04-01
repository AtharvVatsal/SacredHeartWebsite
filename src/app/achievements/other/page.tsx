'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy, Medal, Award, Rocket, BookOpen, ArrowLeft, Sparkles, Star as StarIcon, Target, Users, Zap, X, ChevronLeft, ChevronRight, Calendar, Quote, Globe, Satellite } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { m, useInView, AnimatePresence } from 'framer-motion'

const chandrayaanPhotos = [
  { src: '/images/students/achievers/Chandrayaan 3/Chandrayaan_2.png', alt: 'Chandrayaan-3 Mission Photo 1' },
  { src: '/images/students/achievers/Chandrayaan 3/Chandrayaan_1.webp', alt: 'Chandrayaan-3 Mission Photo 2' },
  { src: '/images/students/achievers/Chandrayaan 3/Chandrayaan_3.webp', alt: 'Chandrayaan-3 Mission Photo 3' },
  { src: '/images/students/achievers/Chandrayaan 3/Chandrayaan_4.webp', alt: 'Chandrayaan-3 Mission Photo 4' },
  { src: '/images/students/achievers/Chandrayaan 3/Chandrayaan_5.jpeg', alt: 'Chandrayaan-3 Mission Photo 5' },
  { src: '/images/students/achievers/Chandrayaan 3/Chandrayaan_6.jpg', alt: 'Chandrayaan-3 Mission Photo 6' },
]

const otherAchievements = [
  {
    id: '1',
    title: 'Personalities of Himachal Pradesh Quiz Competition',
    student: 'AARAV KATOCH',
    class: 'VII-C',
    description: 'Won 3rd position in the Personalities of Himachal Pradesh Quiz competition conducted by Zee TV.',
    year: 2024,
    category: 'Academic',
    image: '/images/students/achievers/aarav.jpg',
  },
]

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

const cardHoverVariants = {
  rest: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    y: -4,
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
}

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function PhotoGallery({ photos }: { photos: typeof chandrayaanPhotos }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<number | null>(null)

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPhoto(prev => prev === null ? photos.length - 1 : prev === 0 ? photos.length - 1 : prev - 1)
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPhoto(prev => prev === null ? 0 : prev === photos.length - 1 ? 0 : prev + 1)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto === null) return
      if (e.key === 'Escape') setSelectedPhoto(null)
      if (e.key === 'ArrowLeft') setSelectedPhoto(prev => prev === 0 ? photos.length - 1 : prev! - 1)
      if (e.key === 'ArrowRight') setSelectedPhoto(prev => prev === photos.length - 1 ? 0 : prev! + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, photos.length])

  return (
    <>
      <m.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {photos.map((photo, index) => (
          <m.div
            key={index}
            variants={itemVariants}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedPhoto(index)}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
            />
            <m.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered === index ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
            <m.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
              initial={{ scale: 0.5 }}
              animate={{ scale: isHovered === index ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </m.div>
            <m.p
              className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered === index ? 0 : 10, opacity: isHovered === index ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              View Photo
            </m.p>
          </m.div>
        ))}
      </m.div>

      <AnimatePresence>
        {selectedPhoto !== null && (
          <m.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <m.button
              className="absolute top-4 right-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={() => setSelectedPhoto(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </m.button>

            <m.button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8" />
            </m.button>

            <m.button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8" />
            </m.button>

            <m.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].alt}
                fill
                className="object-contain"
              />
            </m.div>

            <m.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg font-medium">{photos[selectedPhoto].alt}</p>
              <p className="text-sm text-gray-300 mt-1">
                {selectedPhoto + 1} / {photos.length}
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function OtherAchievementsPage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

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

      {/* Chandrayaan-3 Featured Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <m.div
                className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Satellite className="w-4 h-4" />
                <span>Our Pride</span>
              </m.div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Chandrayaan-3 Mission
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Making India proud on the global stage
              </p>
            </m.div>

            <m.div
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 px-8 py-6 relative overflow-hidden">
                <m.div
                  className="absolute -right-8 -top-8 w-40 h-40 bg-secondary-400/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative flex items-center gap-4">
                  <m.div
                    className="w-14 h-14 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)" }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Rocket className="w-7 h-7 text-primary-900" />
                  </m.div>
                  <div>
                    <p className="text-secondary-400 text-sm font-semibold">ISRO Mission • 2023</p>
                    <h3 className="text-2xl font-display font-bold text-white">Rajat Awasthi</h3>
                    <p className="text-primary-200 text-sm">Batch of 2004 • ISRO Scientist</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <m.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <p className="text-gray-700 leading-relaxed mb-4">
                        A proud alumnus of <span className="font-semibold text-primary-900">Sacred Heart Senior Secondary School, Sidhpur</span>, Batch of 2004, who reached for the stars and became part of India's historic Chandrayaan-3 mission.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        With great pride and enthusiasm, he was welcomed back to his alma mater. In an inspiring address to the students, he shared his incredible journey and motivated young minds to dream big.
                      </p>
                    </m.div>

                    <m.div
                      className="bg-gradient-to-br from-secondary-50 to-amber-50 rounded-2xl p-6 border border-secondary-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Quote className="w-8 h-8 text-secondary-400 mb-3" />
                      <p className="text-primary-900 italic font-medium mb-2">
                        "Dreams have no boundaries when you have the courage to pursue them."
                      </p>
                      <p className="text-secondary-600 text-sm">— Rajat Awasthi</p>
                    </m.div>

                    <m.div
                      className="flex flex-wrap gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {[
                        { icon: Globe, label: 'Space Technology' },
                        { icon: StarIcon, label: 'National Pride' },
                        { icon: Users, label: 'ISRO Scientist' },
                      ].map((tag, i) => (
                        <m.span
                          key={i}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgb(253, 224, 71)" }}
                        >
                          <tag.icon className="w-4 h-4" />
                          {tag.label}
                        </m.span>
                      ))}
                    </m.div>
                  </div>

                  <m.div
                    className="lg:col-span-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-secondary-600" />
                          <span className="font-semibold text-primary-900">Mission Gallery</span>
                        </div>
                        <span className="text-gray-500 text-sm">{chandrayaanPhotos.length} Photos</span>
                      </div>
                      <PhotoGallery photos={chandrayaanPhotos} />
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <m.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              { value: 20, suffix: '+', label: 'Years of Excellence', icon: StarIcon, color: 'from-secondary-400 to-secondary-500' },
              { value: 500, suffix: '+', label: 'Students Enrolled', icon: Users, color: 'from-blue-400 to-blue-500' },
              { value: 50, suffix: '+', label: 'Awards Won', icon: Trophy, color: 'from-emerald-400 to-emerald-500' },
              { value: 100, suffix: '%', label: 'Success Rate', icon: Target, color: 'from-purple-400 to-purple-500' },
            ].map((stat, i) => (
              <m.div
                key={i}
                className="text-center"
                variants={itemVariants}
              >
                <m.div
                  className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </m.div>
                <p className="text-3xl md:text-4xl font-bold text-primary-900 mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Rendezvous with Excellence */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <m.div
              className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <m.div
                  className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)" }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  whileHover={{ scale: 1.1 }}
                >
                  <BookOpen className="w-10 h-10 text-primary-900" />
                </m.div>
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-display font-bold text-primary-900 mb-1">
                      Rendezvous with Excellence
                    </h3>
                    <p className="text-sm text-gray-500">Interaction with distinguished alumni</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Expressed his gratitude for his alma mater and addressed the students, sharing insights about his journey from Sacred Heart to ISRO. The interactive session motivated students to dream big and work towards achieving their goals.
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Other Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Trophy className="w-4 h-4" />
                More Achievements
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Other Notable Achievements
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Celebrating excellence in academics, sports, and cultural activities
              </p>
            </m.div>

            <m.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {otherAchievements.map((achievement) => (
                <m.div
                  key={achievement.id}
                  className="group bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100"
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
                    borderColor: "rgba(251, 191, 36, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    <m.div
                      className="w-full md:w-48 flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                        {achievement.image ? (
                          <Image
                            src={achievement.image}
                            alt={achievement.student}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary-300">{achievement.student.charAt(0)}</span>
                          </div>
                        )}
                        <m.div
                          className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      </div>
                    </m.div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <m.span
                          className="text-sm font-semibold text-secondary-600 bg-secondary-50 px-4 py-1.5 rounded-full border border-secondary-100"
                          whileHover={{ scale: 1.05 }}
                        >
                          {achievement.year}
                        </m.span>
                        <m.span
                          className="text-xs px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full border border-primary-100 font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          {achievement.category}
                        </m.span>
                      </div>
                      <m.h3
                        className="font-display font-bold text-xl md:text-2xl text-primary-900 mb-3"
                        whileHover={{ color: "#2563eb" }}
                      >
                        {achievement.title}
                      </m.h3>
                      <p className="font-bold text-lg text-primary-800 mb-4 flex items-center gap-2">
                        {achievement.student}
                        <span className="text-gray-400 font-normal text-sm">- {achievement.class}</span>
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>

                    <m.div
                      className="hidden md:flex w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full items-center justify-center flex-shrink-0 shadow-lg"
                      style={{ boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)" }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Medal className="w-10 h-10 text-primary-900" />
                    </m.div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-500/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <m.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <m.div
              className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              style={{ boxShadow: "0 0 40px rgba(251, 191, 36, 0.5)" }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 40px rgba(251, 191, 36, 0.5)",
                  "0 0 60px rgba(251, 191, 36, 0.7)",
                  "0 0 40px rgba(251, 191, 36, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-10 h-10 text-primary-900" />
            </m.div>
            <m.h3
              className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Achieve Your Dreams!
            </m.h3>
            <m.p
              className="text-xl text-gray-300 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join Sacred Heart Senior Secondary School and make your mark in the world
            </m.p>
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/admission"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 px-10 py-4 rounded-full font-bold text-lg hover:from-secondary-300 hover:to-secondary-400 transition-all duration-300 shadow-xl group"
              >
                <span>Apply for Admission</span>
                <m.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </m.span>
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>
    </>
  )
}
