'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Crown, Sparkles, Quote } from 'lucide-react'
import { m } from 'framer-motion'
import { studentLeaders } from '@/data/school'
import HeroDecor from '@/components/layout/HeroDecor'
import { MessageSquareQuote as HeroMotif, Heart as HeroMotifSmall } from 'lucide-react'

const headBoy = studentLeaders.find(l => l.role === 'Head Boy')!
const headGirl = studentLeaders.find(l => l.role === 'Head Girl')!

const headBoyMessage = `Respected Members of the School Community,

I am Udit Thakur, privileged to serve as the Head Boy of this esteemed institution for the academic year 2026-27.

Having been a part of this school for many years, I have witnessed its legacy of academic excellence, co-curricular achievements, and strong values. It is with gratitude that I accept this responsibility, aware of both the honour it brings and the duties it demands.

The opportunity to lead the student council, a role I have aspired to, is a milestone made possible through the trust and encouragement of my principal, mentors, peers, and the school administration.

As Head Boy, I am committed to serving with diligence, integrity, and fairness. I will strive to be an approachable leader, representing students with honesty while upholding the values of our institution.

I pledge to lead by example and foster an environment that is inclusive and respectful. Together, I hope to make this academic year one of achievement and meaningful experiences for all.

With highest regards,
Udit Thakur`

const headGirlMessage = `Greetings to all our Readers,

I am Mehul Dhiman, honored to serve as the Head Girl of Sacred Heart Senior Secondary School, Sidhpur.

This school has been more than just a place of learning for me – it has been a second home where I have grown, discovered myself, and built dreams for the future.

My journey here, which began 7 years ago as a young and curious student, has gradually shaped me into the person I am today. From the nervous excitement of my early days to the confidence I carry now as a senior student, every moment has contributed to my growth.

The memories I have created here – whether in classrooms, during school events, or through meaningful friendships – will always hold a special place in my heart.

Our school has not only focused on academics but has also encouraged us to explore our talents, develop values, and become confident and responsible individuals.

I am deeply grateful to our principal, mentors, teachers, and the entire school community for their constant guidance, encouragement, and support.

As I take on this responsibility, I will carry out my duties with honesty and dedication. And I look forward to contributing positively and upholding the values our school stands for.

With gratitude and pride,
Mehul Dhiman`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
}

export default function MessagesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
        <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} />
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
            <div className="flex flex-col gap-3">
              <Link href="/about/office-bearers" className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors">
                <ArrowLeft size={16} />Back to Office Bearers
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
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Head Boy & Head Girl
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Messages from our student leaders
            </m.p>
          </m.div>
        </m.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Messages Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <m.div 
            className="max-w-4xl mx-auto space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Head Boy Card */}
            <m.div 
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 relative overflow-hidden">
                <m.div 
                  className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-[80px]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  {/* Photo */}
                  <m.div 
                    className="relative w-32 h-40 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={headBoy.image!}
                      alt={`${headBoy.name}, Head Boy`}
                      fill
                      className="object-contain bg-primary-800"
                    />
                  </m.div>
                  
                  {/* Info */}
                  <div className="text-center md:text-left flex-1">
                    <div className="inline-flex items-center gap-2 bg-secondary-400/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-secondary-300 mb-3">
                      <Crown className="w-4 h-4 text-secondary-400" />
                      Head Boy
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                      {headBoy.name}
                    </h2>
                    <p className="text-primary-200 text-lg">
                      Academic Year {headBoy.year}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-primary-900 mb-2">
                      A Message to the Sacred Heart Family
                    </h3>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-600">
                  {headBoyMessage.split('\n\n').map((paragraph, index, paragraphs) => (
                    <m.p 
                      key={index}
                      className={`mb-6 leading-relaxed ${
                        index === paragraphs.length - 1 ? 'mt-8 pt-4 border-t border-gray-100 font-medium text-primary-800 whitespace-pre-line' : ''
                      }`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {paragraph}
                    </m.p>
                  ))}
                </div>
              </div>
            </m.div>

            {/* Head Girl Card */}
            <m.div 
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-secondary-600 via-secondary-500 to-secondary-700 p-8 relative overflow-hidden">
                <m.div 
                  className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  {/* Photo */}
                  <m.div 
                    className="relative w-32 h-40 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={headGirl.image!}
                      alt={`${headGirl.name}, Head Girl`}
                      fill
                      className="object-contain bg-secondary-700"
                    />
                  </m.div>
                  
                  {/* Info */}
                  <div className="text-center md:text-left flex-1">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-white mb-3">
                      <Crown className="w-4 h-4" />
                      Head Girl
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                      {headGirl.name}
                    </h2>
                    <p className="text-secondary-100 text-lg">
                      Academic Year {headGirl.year}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-primary-900 mb-2">
                      A Message to the Sacred Heart Family
                    </h3>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-600">
                  {headGirlMessage.split('\n\n').map((paragraph, index, paragraphs) => (
                    <m.p 
                      key={index}
                      className={`mb-6 leading-relaxed ${
                        index === paragraphs.length - 1 ? 'mt-8 pt-4 border-t border-gray-100 font-medium text-primary-800 whitespace-pre-line' : ''
                      }`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {paragraph}
                    </m.p>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>
    </>
  )
}
