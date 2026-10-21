'use client'

// The home page hero, moved verbatim from src/app/(site)/legacy home page with its text, buttons and photos as props
import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowRight, Award, GraduationCap, Sparkles } from 'lucide-react'
import HeroSlideshow from '@/components/home/HeroSlideshow'
import { FadeIn, MagneticButton, ParallaxSection, TextReveal } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import type { HomeHero as Def } from './definitions'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
} as const

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export default function HomeHero(p: BlockProps<typeof Def>) {
  const slides = p.slides.map((s) => s.image).filter((s) => s.src)
  return (
    <section className="relative min-h-[90vh] flex items-center bg-mesh overflow-hidden pt-20 pb-20 lg:pb-0 [@media(max-height:760px)]:pt-24 [@media(max-height:760px)]:pb-16">
      <div className="noise-overlay" />
      <div className="geometric-bg absolute inset-0" />

      {/* Animated Orbs with Parallax */}
      <ParallaxSection offset={-150} className="absolute inset-0 pointer-events-none">
        <m.div
          className="absolute top-20 right-10 w-[500px] h-[500px] bg-secondary-300/30 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxSection>
      <ParallaxSection offset={100} className="absolute inset-0 pointer-events-none">
        <m.div
          className="absolute -bottom-32 -left-10 w-[600px] h-[600px] bg-primary-400/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </ParallaxSection>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-16 h-16 border-4 border-primary-500/20 rounded-full floating" />
        <div className="absolute top-[60%] right-[15%] w-24 h-24 border-4 border-secondary-500/20 rounded-full floating-delayed" />
        <div className="absolute top-[30%] right-[25%] w-12 h-12 bg-primary-500/10 rotate-45 floating" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <m.div initial="hidden" animate="visible" variants={staggerContainer}>
            {p.badge && (
              <m.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 glass px-6 py-2.5 rounded-full text-sm font-medium text-primary-900 mb-8 [@media(max-height:760px)]:mb-5 border-white/40 shadow-xl"
              >
                <Sparkles size={16} className="text-secondary-600 animate-pulse" />
                {p.badge}
              </m.div>
            )}

            <h1 className="text-5xl md:text-6xl lg:text-7xl lg:[@media(max-height:760px)]:text-5xl xl:[@media(max-height:760px)]:text-6xl font-display font-bold text-primary-950 mb-6 [@media(max-height:760px)]:mb-4 leading-[1.1] tracking-tight text-shadow-lg">
              {p.headingLead && (
                <>
                  <TextReveal delay={2}>{p.headingLead}</TextReveal>
                  <br />
                </>
              )}
              <TextReveal delay={4} className="heading-gradient">
                {p.headingMain}
              </TextReveal>
            </h1>

            {p.subtitle && (
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                className="text-xl md:text-2xl text-primary-800/90 mb-10 [@media(max-height:760px)]:mb-6 max-w-2xl leading-relaxed font-medium"
              >
                {p.subtitle}
              </m.p>
            )}

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              className="flex flex-wrap gap-5"
            >
              {p.primary.label && p.primary.href && (
                <MagneticButton>
                  <Link
                    href={p.primary.href}
                    className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-800 transition-all shadow-glow hover:shadow-glow-secondary"
                  >
                    {p.primary.label}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>
              )}
              {p.secondary.label && p.secondary.href && (
                <MagneticButton intensity={0.2}>
                  <Link href={p.secondary.href} className="inline-flex items-center gap-2 glass text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-white/80 transition-all">
                    {p.secondary.label}
                  </Link>
                </MagneticButton>
              )}
            </m.div>
          </m.div>

          {/* Right Side - Image Slideshow */}
          <FadeIn direction="left" delay={0.3} blur>
            <m.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-400/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl" />

                <div className="relative bg-white p-3 rounded-[2rem] shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-[2rem] pointer-events-none" />
                  {slides.length > 0 && <HeroSlideshow images={slides.map((s) => s.src)} alts={slides.map((s) => s.alt)} interval={p.interval * 1000} />}
                </div>

                {p.badgeOneShow && (
                  <m.div
                    className="absolute -bottom-12 left-3 sm:-bottom-6 sm:-left-6 glass px-5 py-3 rounded-2xl shadow-xl border border-white/40"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">{p.badgeOneSmall}</p>
                        <p className="text-sm font-bold text-primary-900">{p.badgeOneMain}</p>
                      </div>
                    </div>
                  </m.div>
                )}

                {p.badgeTwoShow && (
                  <m.div
                    className="absolute -top-4 -right-4 glass px-4 py-3 rounded-2xl shadow-xl border border-white/40"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-secondary-500" />
                      <span className="text-sm font-bold text-primary-900">{p.badgeTwoText}</span>
                    </div>
                  </m.div>
                )}
              </div>
            </m.div>
          </FadeIn>
        </div>
      </div>

      {p.scrollHint && (
        <m.div
          aria-hidden="true"
          className="hidden lg:block [@media(max-height:760px)]:hidden absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-8 h-12 glass rounded-full flex justify-center pt-2 shadow-lg">
            <m.div
              className="w-1.5 h-3 bg-primary-700 rounded-full"
              animate={{ opacity: [1, 0.2, 1], y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </m.div>
      )}
    </section>
  )
}
