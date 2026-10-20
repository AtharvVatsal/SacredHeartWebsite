'use client'

import Link from 'next/link'
import Image from 'next/image'
import { m, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Award, BookOpen, Users, Trophy, Calendar, GraduationCap, Star, Sparkles, CheckCircle, CreditCard, Rocket, Monitor, Laptop, FlaskConical, Library, Flower2, Bus, Stethoscope, FileText, type LucideIcon } from 'lucide-react'
import { schoolInfo as defaultSchoolInfo, heroSection as defaultHeroSection, heroImages as defaultHeroImages, statistics as defaultStatistics, quickLinks as defaultQuickLinks, notifications as defaultNotifications, achievements as defaultAchievements, facilities as defaultFacilities, principalMessage as defaultPrincipalMessage, studentLeaders as defaultStudentLeaders } from '@/data/school'
import { useSchoolInfo, useHeroSection, useStatistics, useQuickLinks, useNotifications, useAchievements, usePrincipalMessage, useFacilities, useStudentLeaders } from '@/lib/useCMS'
import Section from '@/components/ui/Section'
import HeroSlideshow from '@/components/home/HeroSlideshow'
import { FadeIn, StaggerContainer, FadeInItem, ScaleIn, ParallaxSection, CountUp, TextReveal, MagneticButton } from '@/components/animations'
import type { Stat, QuickLink, Achievement, Notification, Facility, StudentLeader } from '@/types'
import { parseStatValue } from '@/lib/stats'

const iconMap: Record<string, LucideIcon> = {
  FileText, CreditCard, Calendar, Monitor, Laptop, FlaskConical, Library, Trophy, Flower2, Bus, Stethoscope,
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

export default function Home() {
  const { data: schoolInfo } = useSchoolInfo()
  const { data: heroSection } = useHeroSection()
  const { data: statistics } = useStatistics()
  const { data: quickLinks } = useQuickLinks()
  const { data: notifications } = useNotifications()
  const { data: achievements } = useAchievements()
  const { data: principalMessage } = usePrincipalMessage()
  const { data: facilities } = useFacilities()
  const { data: studentLeaders } = useStudentLeaders()
  
  const hero = heroSection || defaultHeroSection
  const stats = statistics || defaultStatistics
  const links = quickLinks || defaultQuickLinks
  const notifs = notifications || defaultNotifications
  const achvs = achievements || defaultAchievements
  const principal = principalMessage.message || defaultPrincipalMessage
  const facilityList = facilities || defaultFacilities
  const leaders = studentLeaders || defaultStudentLeaders
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-mesh overflow-hidden pt-20 pb-20 lg:pb-0 [@media(max-height:760px)]:pt-24 [@media(max-height:760px)]:pb-16">
        <div className="noise-overlay" />
        <div className="geometric-bg absolute inset-0" />
        
        {/* Animated Orbs with Parallax */}
        <ParallaxSection offset={-150} className="absolute inset-0 pointer-events-none">
          <m.div 
            className="absolute top-20 right-10 w-[500px] h-[500px] bg-secondary-300/30 rounded-full blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </ParallaxSection>
        <ParallaxSection offset={100} className="absolute inset-0 pointer-events-none">
          <m.div 
            className="absolute -bottom-32 -left-10 w-[600px] h-[600px] bg-primary-400/20 rounded-full blur-[100px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              y: [0, -30, 0],
            }}
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
            <m.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <m.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 glass px-6 py-2.5 rounded-full text-sm font-medium text-primary-900 mb-8 [@media(max-height:760px)]:mb-5 border-white/40 shadow-xl"
              >
                <Sparkles size={16} className="text-secondary-600 animate-pulse" />
                {schoolInfo.affiliation} • Est. {schoolInfo.established}
              </m.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl lg:[@media(max-height:760px)]:text-5xl xl:[@media(max-height:760px)]:text-6xl font-display font-bold text-primary-950 mb-6 [@media(max-height:760px)]:mb-4 leading-[1.1] tracking-tight text-shadow-lg">
                <TextReveal delay={2}>Welcome to</TextReveal><br />
                <TextReveal delay={4} className="heading-gradient">{schoolInfo.fullName}</TextReveal>
              </h1>
              
              <m.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                className="text-xl md:text-2xl text-primary-800/90 mb-10 [@media(max-height:760px)]:mb-6 max-w-2xl leading-relaxed font-medium"
              >
                {heroSection.subtitle}
              </m.p>
              
              <m.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                className="flex flex-wrap gap-5"
              >
                <MagneticButton>
                  <Link
                    href={heroSection.ctaLink}
                    className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-800 transition-all shadow-glow hover:shadow-glow-secondary"
                  >
                    {heroSection.ctaText}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>
                <MagneticButton intensity={0.2}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 glass text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-white/80 transition-all"
                  >
                    Learn More
                  </Link>
                </MagneticButton>
              </m.div>
            </m.div>

            {/* Right Side - Image Slideshow */}
            <FadeIn direction="left" delay={0.3} blur>
              <m.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Main Image Container */}
                <div className="relative">
                  {/* Decorative Elements Behind */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-400/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl" />
                  
                  {/* Image Frame with Rounded Corners */}
                  <div className="relative bg-white p-3 rounded-[2rem] shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-[2rem] pointer-events-none" />
                    <HeroSlideshow images={defaultHeroImages} interval={5000} />
                  </div>

                  {/* Floating Badge */}
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
                        <p className="text-xs text-gray-600 font-medium">Ranked</p>
                        <p className="text-sm font-bold text-primary-900">Top School</p>
                      </div>
                    </div>
                  </m.div>

                  {/* Floating Badge 2 */}
                  <m.div 
                    className="absolute -top-4 -right-4 glass px-4 py-3 rounded-2xl shadow-xl border border-white/40"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-secondary-500" />
                      <span className="text-sm font-bold text-primary-900">56+ Years</span>
                    </div>
                  </m.div>
                </div>
              </m.div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
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
      </section>

      {/* Quick Actions Bar */}
      <div className="bg-primary-800 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admission/fee-structure" className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-5 py-2.5 rounded-full font-semibold hover:bg-secondary-300 transition-all text-sm">
              <CreditCard size={16} />
              Fee Structure
            </Link>
            <Link href="/admission/register" className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/20 transition-all text-sm border border-white/20">
              Register Interest in Admission
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-20 py-10 bg-gray-50">
        <Section className="bg-transparent !py-0">
          <div className="container mx-auto px-4">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" delay={0.2}>
              {stats.map((stat: Stat, index: number) => (
                <FadeInItem key={index} direction="up" blur>
                  <m.div 
                    className="text-center group glass p-6 rounded-2xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="text-4xl md:text-5xl font-display font-bold text-primary-700 mb-2 drop-shadow-sm">
                      {(() => {
                        const { end, decimals, unit } = parseStatValue(stat.value)
                        return <CountUp end={end} decimals={decimals} suffix={unit + (stat.suffix || '')} />
                      })()}
                    </div>
                    <div className="text-gray-600 font-medium group-hover:text-primary-800 transition-colors">{stat.label}</div>
                  </m.div>
                </FadeInItem>
              ))}
            </StaggerContainer>
          </div>
        </Section>
      </div>

      {/* Quick Links */}
      <Section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 text-gray-900/[0.02]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Navigate Fast</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
                Quick Links
              </h3>
              <div className="w-20 pl-2 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
              </div>
              <p className="text-gray-600 max-w-xl mx-auto text-lg">
                Access important information and resources
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {links.map((link: QuickLink, index: number) => {
              const Icon = iconMap[link.icon || ''] || Star
              const key = link.href
              return (
                <FadeInItem key={key} direction="up" blur>
                  <Link href={link.href}>
                    <m.div 
                      className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-card-hover border border-gray-100 transition-all duration-300 h-full flex flex-col justify-center items-center text-center relative overflow-hidden"
                      whileHover={{ y: -8 }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                      
                      <div className="w-16 h-16 bg-primary-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm relative z-10 group-hover:rotate-12">
                        <Icon size={28} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-primary-900 transition-colors relative z-10">{link.title}</h4>
                      
                    </m.div>
                  </Link>
                </FadeInItem>
              )
            })}
          </StaggerContainer>
        </div>
      </Section>

      {/* About Preview */}
      <Section className="bg-white relative overflow-hidden py-24">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="absolute -left-32 top-32 w-96 h-96 bg-secondary-100 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" blur>
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 text-left">Our Heritage</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6 leading-tight">
                <TextReveal>About Our School</TextReveal>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {schoolInfo.tagline}. We are committed to providing quality education that nurtures the holistic development of each student - intellectual, spiritual, physical, and social.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our school is run by the Sisters of Charity of Jesus and Mary, who have been serving in the field of education since 1901. We strive to instill strong moral values and academic excellence in our students.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                {['CISCE Affiliated', 'Expert Faculty', 'Holistic Education'].map((item, i) => (
                  <m.span 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 border border-primary-200 bg-white text-primary-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:border-primary-400 hover:shadow-md transition-all"
                  >
                    <CheckCircle size={16} className="text-secondary-500" />
                    {item}
                  </m.span>
                ))}
              </div>
              
              <MagneticButton intensity={0.2}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-800 to-primary-700 text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-glow transition-all group"
                >
                  Know More About Us 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2} blur>
              <div className="grid grid-cols-2 gap-5 relative">
                {/* Center graphic piece */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl z-10 hidden sm:flex">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full animate-pulse-slow"></div>
                </div>

                <div className="space-y-5 mt-8">
                  <m.div 
                    className="bg-white p-5 sm:p-6 md:p-8 rounded-3xl shadow-card hover:shadow-xl border border-gray-50 transition-all group break-words hyphens-auto"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors">
                      <Users className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-display font-bold text-lg sm:text-xl text-primary-900 mb-2">Expert Faculty</h4>
                    <p className="text-gray-600 leading-relaxed">Experienced educators molding young minds</p>
                  </m.div>
                  <m.div 
                    className="bg-gradient-to-br from-primary-600 to-primary-800 p-5 sm:p-6 md:p-8 rounded-3xl shadow-glow hover:shadow-xl transition-all group break-words hyphens-auto"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-md">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-lg sm:text-xl text-white mb-2">CISCE Curriculum</h4>
                    <p className="text-primary-100 leading-relaxed">Rigorous academic framework from Nursery to Class 12</p>
                  </m.div>
                </div>
                <div className="space-y-5">
                  <m.div 
                    className="bg-gradient-to-br from-secondary-400 to-secondary-600 p-5 sm:p-6 md:p-8 rounded-3xl shadow-glow-secondary hover:shadow-xl transition-all group break-words hyphens-auto"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-md">
                      <Trophy className="w-7 h-7 text-primary-900" />
                    </div>
                    <h4 className="font-display font-bold text-lg sm:text-xl text-primary-900 mb-2">Excellence</h4>
                    <p className="text-primary-800 font-medium leading-relaxed">Consistent 100% board pass rate</p>
                  </m.div>
                  <m.div 
                    className="bg-white p-5 sm:p-6 md:p-8 rounded-3xl shadow-card hover:shadow-xl border border-gray-50 transition-all group break-words hyphens-auto"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors">
                      <GraduationCap className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-display font-bold text-lg sm:text-xl text-primary-900 mb-2">10K+ Alumni</h4>
                    <p className="text-gray-500 leading-relaxed">Global network making us proud worldwide</p>
                  </m.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Principal's Message */}
      <Section className="bg-gradient-to-br from-primary-50 to-white relative overflow-hidden py-24">
        {/* Background Elements */}
        <ParallaxSection offset={-80} className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-400/5 rounded-full blur-[100px] pointer-events-none" />
        <ParallaxSection offset={60} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-200/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 text-center">Leadership</h2>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6">
                  Principal&apos;s Message
                </h3>
                <div className="w-20 mx-auto">
                  <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
                </div>
              </div>
              
              <m.div 
                className="glass rounded-3xl shadow-xl border border-white/60 p-8 md:p-12 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-[100px] pointer-events-none opacity-50"></div>
                <div className="absolute -top-6 -left-6 text-9xl text-primary-100 font-serif leading-none opacity-50 pointer-events-none">&quot;</div>
                
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                  <m.div 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full flex-shrink-0 shadow-xl border-4 border-white relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-primary-200 opacity-50 scale-110 animate-ping" style={{ animationDuration: '3s' }}></div>
                    <Image
                      src="/images/principal.webp"
                      alt="Sr. Archana - Principal"
                      fill
                      className="object-cover rounded-full"
                    />
                  </m.div>
                  <div className="text-center md:text-left">
                    <p className="text-gray-700 italic mb-8 leading-relaxed text-xl md:text-2xl font-body">
                      &quot;Welcome to Sacred Heart Senior Secondary School, where we nurture young minds with values, faith, and academic excellence.&quot;
                    </p>
                    <div className="inline-block">
                      <h4 className="font-display font-bold text-xl md:text-2xl text-primary-900 mb-1">Sr. Archana</h4>
                      <p className="text-secondary-800 font-medium tracking-wide uppercase text-sm">Principal, {schoolInfo.fullName}</p>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Facilities */}
      <Section className="bg-white relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 pattern-grid opacity-30 select-none"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary-50 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Campus Life</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6">
                Our Facilities
              </h3>
              <div className="w-20 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg pt-2 leading-relaxed">
                We provide modern infrastructure and amenities to support comprehensive student development
              </p>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" delay={0.1}>
            {facilityList.map((facility: Facility, index: number) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -8 }}
                  className="bg-white border border-gray-100/50 rounded-3xl p-8 hover:shadow-2xl hover:border-primary-100 transition-all duration-300 group h-full flex flex-col items-center text-center relative overflow-hidden"
                >
                  {/* subtle gradient hover bg inside card */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50/0 to-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300 shadow-sm relative z-10 group-hover:-rotate-6 transform">
                    {(() => {
                      const Icon = iconMap[facility.icon || ''] || BookOpen
                      return <Icon aria-hidden className="w-10 h-10 text-primary-700 group-hover:text-white transition-colors duration-300" />
                    })()}
                  </div>
                  <h3 className="font-display font-bold text-xl text-primary-900 mb-4 relative z-10">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed relative z-10">{facility.description}</p>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>

      {/* Student Leaders */}
      <Section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden py-24">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary-900/50 to-transparent"></div>
        <ParallaxSection offset={-120} className="absolute -top-40 right-[-10%] w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[120px] pointer-events-none" />
        <ParallaxSection offset={80} className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-400 tracking-wider uppercase mb-3 text-center">Student Council</h2>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
                Student Leaders
              </h2>
              {leaders[0]?.year && <p className="text-primary-200">Academic Year {leaders[0].year}</p>}
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" delay={0.2}>
            {leaders.map((leader: StudentLeader, index: number) => (
              <FadeInItem key={index} direction={index % 2 === 0 ? 'left' : 'right'} blur>
                <Link href="/about/office-bearers/messages">
                  <m.div 
                    className="glass-dark rounded-3xl p-8 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all relative overflow-hidden group h-full cursor-pointer"
                    whileHover={{ y: -5, scale: 1.01 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-center gap-5 mb-6">
                    <m.div 
                      className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow-secondary transition-shadow relative z-10"
                      whileHover={{ scale: 1.05, rotate: 6 }}
                    >
                      <span className="text-primary-900 font-bold text-lg font-display">{leader.initials || leader.name.charAt(0)}</span>
                    </m.div>
                      <div className="relative z-10">
                        <h3 className="font-display font-bold text-2xl text-white mb-1 group-hover:text-secondary-300 transition-colors">{leader.name}</h3>
                        <p className="text-secondary-400 font-medium text-sm tracking-wide uppercase">{leader.role}</p>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <span className="text-3xl text-white/20 font-serif absolute -top-4 -left-2"></span>
                      <p className="text-primary-100 italic leading-relaxed pl-4 relative z-10">{leader.message}</p>
                    </div>
                  </m.div>
                </Link>
              </FadeInItem>
            ))}
          </StaggerContainer>
          
          <FadeIn blur>
            <div className="text-center mt-10">
              <Link
                href="/about/office-bearers/messages"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group"
              >
                Read Their Full Messages
                <m.span
                  className="flex items-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </m.span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Achievements */}
      <Section className="bg-gradient-to-b from-white to-gray-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 text-center">Hall of Fame</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-6">
                Our Achievements
              </h3>
              <div className="w-20 mx-auto mb-6">
                <div className="h-1 bg-secondary-400 rounded-full w-full mx-auto" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg pt-2 leading-relaxed">
                Proud moments and milestones that define our journey of excellence
              </p>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" delay={0.1}>
            {achvs.map((achievement: Achievement, index: number) => (
              <FadeInItem key={index} direction="up" blur>
                <m.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group h-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center group-hover:bg-secondary-100 transition-colors">
                      <Trophy className="w-5 h-5 text-secondary-500" />
                    </div>
                    <span className="text-sm font-bold text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">{achievement.year}</span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-primary-800 transition-colors relative z-10">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed relative z-10">{achievement.description}</p>
                </m.div>
              </FadeInItem>
            ))}
          </StaggerContainer>
          
          <FadeIn delay={0.3} blur>
            <div className="text-center mt-12 pb-4">
              <MagneticButton intensity={0.1}>
                <Link
                  href="/achievements"
                  className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all group px-6 py-3 rounded-full hover:bg-primary-50"
                >
                  View All Achievements 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Notifications */}
      <Section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[400px] bg-gradient-to-r from-primary-50/50 via-transparent to-primary-50/50 skew-y-3 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 px-4 py-1.5 bg-secondary-50 rounded-full inline-block border border-secondary-100">Updates</h2>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mt-4 mb-4">
                  Notifications
                </h3>
              </div>
            </div>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto space-y-5">
            {notifs.map((notification: Notification, index: number) => (
              <FadeIn key={notification.id || `notification-${index}`} delay={index * 0.1} direction="up" blur>
                <m.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
                    notification.important
                      ? 'bg-gradient-to-r from-primary-50 to-white border-primary-200 shadow-md hover:shadow-lg'
                      : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300'
                  }`}
                >
                  {notification.important && (
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-secondary-400 to-secondary-600" />
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4 md:pl-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-primary-800 bg-primary-50 px-3 py-1 rounded-full border border-primary-100/50 flex items-center gap-1">
                          <Calendar size={12} /> {notification.date}
                        </span>
                        {notification.important && (
                          <m.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-secondary-100 text-secondary-700 border border-secondary-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse"></span>
                            Important
                          </m.span>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                        {notification.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{notification.description}</p>
                    </div>
                  </div>
                </m.div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.3} blur>
            <div className="text-center mt-12">
              <MagneticButton intensity={0.1}>
                <Link
                  href="/notifications"
                  className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all group px-6 py-3 rounded-full hover:bg-primary-50"
                >
                  View All Notifications 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Chandrayaan-3 Achievement */}
      <Section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-20 relative overflow-hidden">
        <ParallaxSection offset={-50} className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeIn blur>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-secondary-400/20 text-secondary-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  <Rocket size={16} />
                  Our Achiever
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Chandrayaan-3 Mission
                </h2>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <p className="text-lg leading-relaxed mb-4">
                  <span className="text-secondary-400 font-bold">Rajat Awasthi</span> who passed out from Sacred Heart Senior Secondary School, Sidhpur in the year <span className="font-bold">2004</span>, made the institution and every Indian proud by being part of the successful mission of <span className="font-bold">Chandrayaan-3</span>.
                </p>
                <p className="text-primary-200 leading-relaxed">
                  With great pride and enthusiasm he was welcomed to his alma mater. He inspired the young minds with his motivational speech to strive hard and reach the pinnacle of success.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden py-32 rounded-t-[3rem] -mt-10 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="absolute inset-0 pattern-grid opacity-20 select-none"></div>
        
        <ParallaxSection offset={-50} className="absolute top-0 right-0">
           <div className="w-[800px] h-[800px] bg-secondary-400/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        </ParallaxSection>
        <ParallaxSection offset={100} className="absolute bottom-0 left-0">
           <div className="w-[600px] h-[600px] bg-primary-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        </ParallaxSection>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn blur direction="up">
            <h2 className="text-sm font-semibold text-secondary-400 tracking-wider uppercase mb-4 text-center">Admissions</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white drop-shadow-sm">
              Join Our School Family
            </h3>
            <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Give your child the gift of quality education and strong values. Shape their future with our holistic approach to learning.
            </p>
          </FadeIn>
          
          <StaggerContainer className="flex flex-col sm:flex-row justify-center items-center gap-5" delay={0.2}>
            <FadeInItem direction="up" blur>
              <MagneticButton intensity={0.3}>
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-secondary-400 text-primary-900 px-10 py-4 rounded-full font-bold hover:shadow-glow-secondary transition-all text-lg group relative overflow-hidden"
                >
                  <span className="relative z-10">Apply for Admission</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
              </MagneticButton>
            </FadeInItem>
            
            <FadeInItem direction="up" blur>
              <MagneticButton intensity={0.1}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-lg group shadow-lg"
                >
                  Contact Us
                </Link>
              </MagneticButton>
            </FadeInItem>
          </StaggerContainer>
        </div>
      </Section>

    </>
  )
}
