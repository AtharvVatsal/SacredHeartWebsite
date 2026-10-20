'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Crown, Sparkles, Quote } from 'lucide-react'
import { m } from 'framer-motion'
import HeroDecor from '@/components/layout/HeroDecor'
import { MessageSquareQuote as HeroMotif, Heart as HeroMotifSmall } from 'lucide-react'

const headBoyMessage = `Greetings, cherished readers,

I am Vijit Veer Chaudhary, honoured to serve as the Head Boy of this outstanding institution for the academic year 2025-26. Having been a part of this school for the past fourteen years, I can wholeheartedly say that each day here has gifted me joyful and unforgettable memories. It is both a privilege and a responsibility to hold this esteemed position. Ever since I was a young student, I had the dream to become a part of the student council and now, I am not only a part but the head of the student council for which I am extremely grateful to everyone who supported me and trusted in me for this esteemed post.

From the very beginning, I have deeply admired this institution. My love and respect for our school continues to grow with each passing day. Be it group projects, sports, or extracurricular activities, this school has helped me forge lifelong friendships and create bonds that I will always cherish.

One of the many remarkable aspects of our school is the wide array of facilities it offers, helping us grow not just academically, but as well-rounded individuals. From our well-maintained classrooms and fully equipped science and computer labs, to a library that nurtures a love for reading—every corner of our campus reflects a commitment to excellence.

I feel immense pride in saying that our school places equal emphasis on academics as well as sports. We are fortunate to have access to a wide range of sports facilities, including spacious playgrounds, well maintained courts and trained coaches who guide us with dedication and passion. Every student is given the chance to discover and develop their talents through the medium of inter-house and inter-school meets.

As a Head Boy, I aspire to be a leader who listens, supports, and inspires. I wish to be a true representative of the student body voicing their ideas and concerns with honesty, and working to foster a school environment that is inclusive, positive, and full of opportunity.

I take this responsibility with utmost sincerity. I pledge to lead by example, uphold the discipline and values of our institution, and collaborate with our teachers, council members, and every student to make this academic year one of the most memorable and successful yet. I will do my best to ensure that every student in our school has the chance to shine in whatever field they are passionate about.

With warm regards,
Vijit Veer Chaudhary`

const headGirlMessage = `Greetings, Dear Readers,

I am Gurnoor Kaur, the head girl of Sacred Heart Senior Secondary School, Sidhpur, a place where my heart grew roots, my spirit took flight.

My 9-year journey in this esteemed institution has been a transformative odyssey, shaping me from a curious Grade 3 student to a confident Grade 12 leader.

I vividly recall nervous smiles on my first day, gradually blossoming into lasting friendships and unforgettable memories. Through academics, extracurricular activities, and mentorship, this school has nurtured my growth—fostering creativity, kindness, and perseverance.

As I navigated grades, I discovered my passions – debating, writing, and volunteering – and was encouraged to pursue them. Teachers became mentors, guiding me through challenges and celebrating triumphs.

As I stand here today, honoured to serve as Head Girl, I reflect on the values ingrained in me: empathy, integrity, passion, and responsibility. My journey is a testament to the school's dedication to shaping compassionate leaders.

I am grateful for the trust placed in me and committed to:
• Inspire positive change through inclusive initiatives
• Uphold school spirit and traditions
• Foster open communication between students, teachers, and administration
• Empower my peers to embrace their potential

As Head Girl, I promise to listen, to lead with humility, and to make our community proud. This institution has given me so much; now, it's my turn to give back.

I look forward to serve and make this year unforgettable for everyone! I envision a year filled with laughter, learning, and lasting impacts. A year where every student feels heard, valued, and empowered to thrive.

Together, let's create a legacy of kindness, compassion, and excellence. Let's make this year a masterpiece of memories, a testament to the power of collaboration and friendship.

Thank you for entrusting me with this privilege.

I am excited to work alongside our dedicated teachers, passionate students, and supportive parents. Together, we'll address challenges, celebrate successes, and make our school an even better place. My door is always open – please share your ideas, concerns, and dreams with me. Let's achieve greatness together, as one united community!

Regards,
Gurnoor Kaur`

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
                      src="/images/Students/HeadBoy.webp"
                      alt="Vijit Veer Chaudhary - Head Boy"
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
                      Vijit Veer Chaudhary
                    </h2>
                    <p className="text-primary-200 text-lg">
                      Academic Year 2025-26
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
                    <p className="text-gray-500 text-sm">Published: April 2025</p>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-600">
                  {headBoyMessage.split('\n\n').map((paragraph, index) => (
                    <m.p 
                      key={index}
                      className={`mb-6 leading-relaxed ${
                        paragraph.startsWith('With warm regards') ? 'mt-8 pt-4 border-t border-gray-100 font-medium text-primary-800' : ''
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
                      src="/images/Students/HeadGirl.webp"
                      alt="Gurnoor Kaur - Head Girl"
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
                      Gurnoor Kaur
                    </h2>
                    <p className="text-secondary-100 text-lg">
                      Academic Year 2025-26
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
                    <p className="text-gray-500 text-sm">Published: April 2025</p>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-600">
                  {headGirlMessage.split('\n\n').map((paragraph, index) => (
                    <m.p 
                      key={index}
                      className={`mb-6 leading-relaxed ${
                        paragraph.startsWith('Regards') ? 'mt-8 pt-4 border-t border-gray-100 font-medium text-primary-800' : ''
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
