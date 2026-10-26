'use client'

// Sections of the Other Achievements page (featured alumnus, figures, achiever cards...). The page and its
// CMS sections both render these, so the CMS shows exactly the original design; the texts default to the
// page's current wording.
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { m, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Globe, Medal, Quote, Rocket, Satellite, Sparkles, Star as StarIcon, Trophy, Users, X, Zap, type LucideIcon } from 'lucide-react'
import { useRevealAll } from '@/components/animations/RevealContext'
import CountUp from '@/components/animations/CountUp'
import { statistics } from '@/data/school'
import { parseStatValue } from '@/lib/stats'
import { useDialog } from '@/lib/useDialog'
import { chandrayaanPhotos, otherAchievements, type AchieverItem } from '@/content/other-achievements'

export type { AchieverItem }

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

/** Scroll reveals; the CMS editor canvas shows everything at once */
function useReveals() {
  const revealAll = useRevealAll()
  const inView = (from: Record<string, number>, to: Record<string, number>) => (revealAll ? { initial: false as const } : { initial: from, whileInView: to, viewport: { once: true } })
  const staggerInView = revealAll ? { initial: false as const, animate: 'visible' } : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } }
  return { revealAll, inView, staggerInView }
}

function PhotoGallery({ photos }: { photos: { src: string; alt: string }[] }) {
  const { staggerInView } = useReveals()
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog({ open: selectedPhoto !== null, onClose: () => setSelectedPhoto(null), containerRef: dialogRef })

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
        {...staggerInView}
      >
        {photos.map((photo, index) => (
          <m.button
            type="button"
            key={index}
            variants={itemVariants}
            aria-label={`View ${photo.alt}`}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group w-full"
            onClick={() => setSelectedPhoto(index)}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
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
          </m.button>
        ))}
      </m.div>

      <AnimatePresence>
        {selectedPhoto !== null && (
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-photo-title"
            tabIndex={-1}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <m.button
              className="absolute top-4 right-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo viewer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X aria-hidden className="w-8 h-8" />
            </m.button>

            <m.button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={goToPrevious}
              aria-label="Previous photo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft aria-hidden className="w-8 h-8" />
            </m.button>

            <m.button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={goToNext}
              aria-label="Next photo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight aria-hidden className="w-8 h-8" />
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
              <h2 id="achievement-photo-title" className="text-lg font-medium">{photos[selectedPhoto].alt}</h2>
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

interface FeaturedProps {
  pill?: string
  pillIcon?: LucideIcon
  title?: string
  intro?: string
  kicker?: string
  name?: string
  role?: string
  badgeIcon?: LucideIcon
  story?: string[]
  /** Renders a story paragraph (the CMS passes its formatting renderer); plain text by default */
  renderText?: (text: string) => ReactNode
  quote?: string
  quoteBy?: string
  tags?: { icon: LucideIcon; label: string }[]
  galleryTitle?: string
  photos?: { src: string; alt: string }[]
}

const defaultStory = [
  "A proud alumnus of Sacred Heart Senior Secondary School, Sidhpur, Batch of 2004, who reached for the stars and became part of India's historic Chandrayaan-3 mission.",
  'With great pride and enthusiasm, he was welcomed back to his alma mater. In an inspiring address to the students, he shared his incredible journey and motivated young minds to dream big.',
]

/** Original first paragraph, with the school's name in bold */
function defaultRender(text: string): ReactNode {
  const school = 'Sacred Heart Senior Secondary School, Sidhpur'
  const at = text.indexOf(school)
  if (text !== defaultStory[0] || at < 0) return text
  return (
    <>
      {text.slice(0, at)}<span className="font-semibold text-primary-900">{school}</span>{text.slice(at + school.length)}
    </>
  )
}

export function FeaturedAlumnus({
  pill = 'Our Pride',
  pillIcon: PillIcon = Satellite,
  title = 'Chandrayaan-3 Mission',
  intro = 'Making India proud on the global stage',
  kicker = 'ISRO Mission • 2023',
  name = 'Rajat Awasthi',
  role = 'Batch of 2004 • ISRO Scientist',
  badgeIcon: BadgeIcon = Rocket,
  story = defaultStory,
  renderText = defaultRender,
  quote = "'Dreams have no boundaries when you have the courage to pursue them.'",
  quoteBy = 'Rajat Awasthi',
  tags = [
    { icon: Globe, label: 'Space Technology' },
    { icon: StarIcon, label: 'National Pride' },
    { icon: Users, label: 'ISRO Scientist' },
  ],
  galleryTitle = 'Mission Gallery',
  photos = chandrayaanPhotos,
}: FeaturedProps) {
  const { inView } = useReveals()
  return (
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <m.div
              {...inView({ opacity: 0, y: 30 }, { opacity: 1, y: 0 })}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <m.div
                className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                {...inView({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })}
              >
                <PillIcon className="w-4 h-4" />
                <span>{pill}</span>
              </m.div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                {title}
              </h2>
              {intro && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {intro}
                </p>
              )}
            </m.div>

            <m.div
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              {...inView({ opacity: 0, y: 40 }, { opacity: 1, y: 0 })}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", transition: { duration: 0.2, delay: 0 } }}
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
                    <BadgeIcon className="w-7 h-7 text-primary-900" />
                  </m.div>
                  <div>
                    <p className="text-secondary-400 text-sm font-semibold">{kicker}</p>
                    <h3 className="text-2xl font-display font-bold text-white">{name}</h3>
                    <p className="text-primary-200 text-sm">{role}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <m.div
                      {...inView({ opacity: 0, x: -20 }, { opacity: 1, x: 0 })}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {story.map((paragraph, i) => (
                        <p key={i} className={i === 0 ? `text-gray-700 leading-relaxed${story.length > 1 ? ' mb-4' : ''}` : 'text-gray-600 leading-relaxed'}>
                          {renderText(paragraph)}
                        </p>
                      ))}
                    </m.div>

                    <m.div
                      className="bg-gradient-to-br from-secondary-50 to-amber-50 rounded-2xl p-6 border border-secondary-100"
                      {...inView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Quote className="w-8 h-8 text-secondary-400 mb-3" />
                      <p className="text-primary-900 italic font-medium mb-2">
                        {quote}
                      </p>
                      {quoteBy && <p className="text-secondary-800 text-sm">— {quoteBy}</p>}
                    </m.div>

                    <m.div
                      className="flex flex-wrap gap-3"
                      {...inView({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {tags.map((tag, i) => (
                        <m.span
                          key={i}
                          {...inView({ opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="inline-flex"
                        >
                        <m.span
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
                          whileHover={{ scale: 1.05, backgroundColor: "rgb(253, 224, 71)", transition: { duration: 0.2, delay: 0 } }}
                        >
                          <tag.icon className="w-4 h-4" />
                          {tag.label}
                        </m.span>
                        </m.span>
                      ))}
                    </m.div>
                  </div>

                  <m.div
                    className="lg:col-span-3"
                    {...inView({ opacity: 0, x: 20 }, { opacity: 1, x: 0 })}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-secondary-600" />
                          <span className="font-semibold text-primary-900">{galleryTitle}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{photos.length} Photos</span>
                      </div>
                      <PhotoGallery photos={photos} />
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
  )
}

export function StatCounters({ stats = statistics.map((s) => ({ label: s.label, value: s.value, suffix: s.suffix })) }: { stats?: { label: string; value: string; suffix?: string }[] }) {
  const { revealAll } = useReveals()
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  return (
      <section ref={statsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <m.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial={revealAll ? false : "hidden"}
            animate={statsInView || revealAll ? "visible" : "hidden"}
          >
            {stats.map((s, i) => ({
              ...s,
              ...parseStatValue(s.value),
              icon: [StarIcon, Users, Trophy, BookOpen][i % 4],
              color: 'from-primary-600 to-primary-700',
            })).map((stat, i) => (
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
                  <stat.icon aria-hidden className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </m.div>
                <p className="text-3xl md:text-4xl font-bold text-primary-900 mb-1">
                  <CountUp end={stat.end} decimals={stat.decimals} suffix={stat.unit + (stat.suffix || '')} />
                </p>
                <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
  )
}

export function HighlightNote({
  icon: NoteIcon = BookOpen,
  title = 'Rendezvous with Excellence',
  subtitle = 'Interaction with distinguished alumni',
  text = 'Expressed his gratitude for his alma mater and addressed the students, sharing insights about his journey from Sacred Heart to ISRO. The interactive session motivated students to dream big and work towards achieving their goals.',
}: { icon?: LucideIcon; title?: string; subtitle?: string; text?: string }) {
  const { inView } = useReveals()
  return (
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <m.div
              className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100"
              {...inView({ opacity: 0, y: 30 }, { opacity: 1, y: 0 })}
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
                  <NoteIcon className="w-10 h-10 text-primary-900" />
                </m.div>
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-display font-bold text-primary-900 mb-1">
                      {title}
                    </h3>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
  )
}


export function AchieverCards({
  pill = 'More Achievements',
  pillIcon: PillIcon = Trophy,
  title = 'Other Notable Achievements',
  intro = 'Celebrating excellence in academics, sports, and cultural activities',
  items = otherAchievements,
}: { pill?: string; pillIcon?: LucideIcon; title?: string; intro?: string; items?: AchieverItem[] }) {
  const { inView, staggerInView } = useReveals()
  return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <m.div
              className="text-center mb-12"
              {...inView({ opacity: 0, y: 30 }, { opacity: 1, y: 0 })}
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <PillIcon className="w-4 h-4" />
                {pill}
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                {title}
              </h2>
              {intro && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {intro}
                </p>
              )}
            </m.div>

            <m.div
              className="space-y-6"
              variants={containerVariants}
              {...staggerInView}
            >
              {items.map((achievement) => (
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
                          className="text-sm font-semibold text-secondary-800 bg-secondary-50 px-4 py-1.5 rounded-full border border-secondary-100"
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
                        {achievement.class && <span className="text-gray-600 font-normal text-sm">- {achievement.class}</span>}
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
  )
}

export function DreamCta({
  title = 'Achieve Your Dreams!',
  text = 'Join Sacred Heart Senior Secondary School and make your mark in the world',
  button = { label: 'Apply for Admission', href: '/admission' },
}: { title?: string; text?: string; button?: { label: string; href: string } }) {
  const { inView } = useReveals()
  return (
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
            {...inView({ opacity: 0, y: 30 }, { opacity: 1, y: 0 })}
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
              {...inView({ opacity: 0 }, { opacity: 1 })}
            >
              {title}
            </m.h3>
            <m.p
              className="text-xl text-gray-300 mb-8 max-w-xl mx-auto"
              {...inView({ opacity: 0 }, { opacity: 1 })}
              transition={{ delay: 0.2 }}
            >
              {text}
            </m.p>
            <m.div
              {...inView({ opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })}
              transition={{ delay: 0.3 }}
            >
              <Link
                href={button.href}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 px-10 py-4 rounded-full font-bold text-lg hover:from-secondary-300 hover:to-secondary-400 transition-all duration-300 shadow-xl group"
              >
                <span>{button.label}</span>
                <m.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </m.span>
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>
  )
}
