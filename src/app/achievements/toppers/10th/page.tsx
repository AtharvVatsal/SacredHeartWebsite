'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy, Medal, Star, Award, ArrowLeft, BookOpen } from 'lucide-react'
import { FadeIn, StaggerContainer, FadeInItem, ParallaxSection, ScaleIn } from '@/components/animations'
import Section from '@/components/ui/Section'

type TopperSession = {
  id: string
  name: string
  percentage: number
  year: number
  image?: string
}

const class10Sessions = [
  {
    year: '2024-25',
    folder: '24-25',
    toppers: [
      { id: '1', name: 'NANDIKA BHARDWAJ', percentage: 97.2, image: '/images/students/toppers/10th/24-25/nandika.jpg' },
      { id: '2', name: 'UDIT THAKUR', percentage: 97.2, image: '/images/students/toppers/10th/24-25/udit.jpg' },
      { id: '3', name: 'TWISHA RANA', percentage: 97, image: '/images/students/toppers/10th/24-25/twisha.jpg' },
      { id: '4', name: 'AMOLIK MISHRA', percentage: 97, image: '/images/students/toppers/10th/24-25/amolik.jpg' },
      { id: '5', name: 'AAHANA', percentage: 96.8, image: '/images/students/toppers/10th/24-25/aahana.jpg' },
      { id: '6', name: 'SHOURYA JARYAL', percentage: 96.4, image: '/images/students/toppers/10th/24-25/shourya.jpg' },
      { id: '7', name: 'ADITI MAHAJAN', percentage: 96, image: '/images/students/toppers/10th/24-25/aditi.jpg' },
      { id: '8', name: 'EERA SHARMA', percentage: 95.6, image: '/images/students/toppers/10th/24-25/eera.jpg' },
      { id: '9', name: 'AKSHIT PATIAL', percentage: 95.6, image: '/images/students/toppers/10th/24-25/akshat.jpg' },
      { id: '10', name: 'NISTHA CHANDRA', percentage: 95.5, image: '/images/students/toppers/10th/24-25/nistha.jpg' },
      { id: '11', name: 'SHAURYA BHARDWAJ', percentage: 95.3, image: '/images/students/toppers/10th/24-25/shaurya.jpg' },
      { id: '12', name: 'HIMAKSHI', percentage: 94.2, image: '/images/students/toppers/10th/24-25/himakshi.jpg' },
      { id: '13', name: 'MEHUL DHIMAN', percentage: 95, image: '/images/students/toppers/10th/24-25/mehul.jpg' },
      { id: '14', name: 'ANSHUMAN KUMAR', percentage: 93.8, image: '/images/students/toppers/10th/24-25/anshuman.jpg' },
      { id: '15', name: 'ARNAV KATOCH', percentage: 93.6, image: '/images/students/toppers/10th/24-25/arnav.jpg' },
      { id: '16', name: 'HARSHVARDHAN', percentage: 93.4, image: '/images/students/toppers/10th/24-25/harsh.jpg' },
      { id: '17', name: 'SHYLA SHARMA', percentage: 93.2, image: '/images/students/toppers/10th/24-25/shyla.jpg' },
      { id: '18', name: 'RUDRANSH SAPEYA', percentage: 93.2, image: '/images/students/toppers/10th/24-25/rudransh.jpg' },
      { id: '19', name: 'ALISHA PATHANIA', percentage: 93, image: '/images/students/toppers/10th/24-25/alisha.jpg' },
      { id: '20', name: 'VANIKA SHARMA', percentage: 93, image: '/images/students/toppers/10th/24-25/vanika.jpg' },
      { id: '21', name: 'DEEPSHIKHA', percentage: 93, image: '/images/students/toppers/10th/24-25/deepshikha.jpg' },
      { id: '22', name: 'SURBHI SHARMA', percentage: 93, image: '/images/students/toppers/10th/24-25/surbhi.jpg' },
      { id: '23', name: 'ARSHIYA THAKUR', percentage: 93, image: '/images/students/toppers/10th/24-25/arshiya.jpg' },
      { id: '24', name: 'ANAYA KANWAR', percentage: 92.8, image: '/images/students/toppers/10th/24-25/anaya.jpg' },
      { id: '25', name: 'KARTIK THAKUR', percentage: 92.8, image: '/images/students/toppers/10th/24-25/kartik.jpg' },
      { id: '26', name: 'RAJAT KUMAR', percentage: 92.8, image: '/images/students/toppers/10th/24-25/rajat.jpg' },
      { id: '27', name: 'KRITIKA GULERIA', percentage: 92.6, image: '/images/students/toppers/10th/24-25/kritika.jpg' },
      { id: '28', name: 'AANANDI NAG', percentage: 92.4, image: '/images/students/toppers/10th/24-25/aandi.jpg' },
      { id: '29', name: 'SHAHI MARKER', percentage: 94.4, image: '/images/students/toppers/10th/24-25/shahi.jpg' },
      { id: '30', name: 'KANISHKA RAWAT', percentage: 92.4, image: '/images/students/toppers/10th/24-25/kanishka.jpg' },
      { id: '31', name: 'AASHI', percentage: 92.4, image: '/images/students/toppers/10th/24-25/aashi.jpg' },
      { id: '32', name: 'INAYAT SEHGAL', percentage: 92, image: '/images/students/toppers/10th/24-25/inayat.jpg' },
      { id: '33', name: 'ARNAV PARASHAR', percentage: 91.6, image: '/images/students/toppers/10th/24-25/arnavp.jpg' },
      { id: '34', name: 'AAYUSH GULERIA', percentage: 91.6, image: '/images/students/toppers/10th/24-25/aayush.jpg' },
      { id: '35', name: 'ISHAN', percentage: 91.4, image: '/images/students/toppers/10th/24-25/ishan.jpg' },
      { id: '36', name: 'RIHAM RAJ', percentage: 91.4, image: '/images/students/toppers/10th/24-25/riham.jpg' },
      { id: '37', name: 'ANAHITA BHASIN', percentage: 91.4, image: '/images/students/toppers/10th/24-25/anahita.jpg' },
      { id: '38', name: 'VANSH AJ THAKUR', percentage: 91.4, image: '/images/students/toppers/10th/24-25/vanshaj.jpg' },
      { id: '39', name: 'ADITYA MAHAJAN', percentage: 91.4, image: '/images/students/toppers/10th/24-25/aditya.jpg' },
      { id: '40', name: 'VANSHIKA GUPTA', percentage: 91.4, image: '/images/students/toppers/10th/24-25/vanshika.jpg' },
      { id: '41', name: 'ADWITA RANA', percentage: 91.2, image: '/images/students/toppers/10th/24-25/adwita.jpg' },
      { id: '42', name: 'AARAV SHARMA', percentage: 91.2, image: '/images/students/toppers/10th/24-25/aarav.jpg' },
      { id: '43', name: 'PARIBHASHA', percentage: 90.8, image: '/images/students/toppers/10th/24-25/paribhasha.jpg' },
      { id: '44', name: 'SPARSH CHAUDHARY', percentage: 90.8, image: '/images/students/toppers/10th/24-25/sparsh.jpg' },
      { id: '45', name: 'ANCHAL DHADWAL', percentage: 90.8, image: '/images/students/toppers/10th/24-25/anchal.jpg' },
      { id: '46', name: 'ALKSHENDRA DUTTA', percentage: 90.8, image: '/images/students/toppers/10th/24-25/akshendra.jpg' },
      { id: '47', name: 'ARUSH SAMIYAL', percentage: 90.6, image: '/images/students/toppers/10th/24-25/arush.jpg' },
      { id: '48', name: 'AARAV ACHARYA', percentage: 90.6, image: '/images/students/toppers/10th/24-25/aarava.jpg' },
      { id: '49', name: 'PRANAV NAIR', percentage: 90.6, image: '/images/students/toppers/10th/24-25/pranav.jpg' },
      { id: '50', name: 'VATSAL DOGRA', percentage: 90.4, image: '/images/students/toppers/10th/24-25/vatsal.jpg' },
      { id: '51', name: 'VIPUL', percentage: 90.4, image: '/images/students/toppers/10th/24-25/vipul.jpg' },
      { id: '52', name: 'AVNEET SINGH', percentage: 90.2, image: '/images/students/toppers/10th/24-25/avneet.jpg' },
      { id: '53', name: 'ANCHAL RANA', percentage: 90.1, image: '/images/students/toppers/10th/24-25/anchal.jpg' },
    ]
  },
  {
    year: '2023-24',
    folder: '23-24',
    toppers: [
      { id: '54', name: 'AAKARSH GUPTA', percentage: 97.8, image: '/images/students/toppers/10th/23-24/aakarsh.jpg' },
      { id: '55', name: 'AADIT DHIMAN', percentage: 95, image: '/images/students/toppers/10th/23-24/aadit.jpg' },
      { id: '56', name: 'AGRIMA DIXIT', percentage: 97.4, image: '/images/students/toppers/10th/23-24/agrima.jpg' },
      { id: '57', name: 'AKSHAJ SHARMA', percentage: 97.4, image: '/images/students/toppers/10th/23-24/akshaj.jpg' },
      { id: '58', name: 'ANANYA RANA', percentage: 96.4, image: '/images/students/toppers/10th/23-24/ananya.jpg' },
      { id: '59', name: 'ARICA SHARMA', percentage: 95.4, image: '/images/students/toppers/10th/23-24/arica.jpg' },
      { id: '60', name: 'ARYA BHANDARI', percentage: 97.2, image: '/images/students/toppers/10th/23-24/arya.jpg' },
      { id: '61', name: 'BHAVYA GAUTAM', percentage: 95, image: '/images/students/toppers/10th/23-24/bhavya.jpg' },
      { id: '62', name: 'DISHA KUMARI', percentage: 96.6, image: '/images/students/toppers/10th/23-24/disha.jpg' },
      { id: '63', name: 'DIVANSHI', percentage: 97.6, image: '/images/students/toppers/10th/23-24/divanshi.jpg' },
      { id: '64', name: 'KAYNA GUPTA', percentage: 95.8, image: '/images/students/toppers/10th/23-24/kayna.jpg' },
      { id: '65', name: 'MOHAMMED WAZID', percentage: 97, image: '/images/students/toppers/10th/23-24/wazid.jpg' },
      { id: '66', name: 'NISHKARSH MAHAJAN', percentage: 96.4, image: '/images/students/toppers/10th/23-24/nishkarsh.jpg' },
      { id: '67', name: 'PRANJLI KAUSHAL', percentage: 95.4, image: '/images/students/toppers/10th/23-24/pranjli.jpg' },
      { id: '68', name: 'PRIYANI SHARMA', percentage: 95.8, image: '/images/students/toppers/10th/23-24/priyani.jpg' },
      { id: '69', name: 'RIDHIMA SHARMA', percentage: 96.2, image: '/images/students/toppers/10th/23-24/ridhima.jpg' },
      { id: '70', name: 'RITVIK GUPTA', percentage: 95.8, image: '/images/students/toppers/10th/23-24/ritvik.jpg' },
      { id: '71', name: 'RIYA DEWAN', percentage: 97.4, image: '/images/students/toppers/10th/23-24/riya.jpg' },
      { id: '72', name: 'SHREYAN ANAND', percentage: 95, image: '/images/students/toppers/10th/23-24/shreyan.jpg' },
      { id: '73', name: 'SIDHESHWAR DEWAN', percentage: 97.2, image: '/images/students/toppers/10th/23-24/sidheshwar.jpg' },
      { id: '74', name: 'VEDIKA', percentage: 95, image: '/images/students/toppers/10th/23-24/vedika.jpg' },
      { id: '75', name: 'VIJIT VEER CHAUDHARY', percentage: 95, image: '/images/students/toppers/10th/23-24/vijit.jpg' },
      { id: '76', name: 'KANISH KATOCH', percentage: 95, image: '/images/students/toppers/10th/23-24/kanish.jpg' },
    ]
  },
  {
    year: '2022-23',
    folder: '22-23',
    toppers: [
      { id: '77', name: 'AARAV PATHANI', percentage: 98.4, image: '/images/students/toppers/10th/22-23/aarav.jpg' },
      { id: '78', name: 'DRISHTI', percentage: 98.4, image: '/images/students/toppers/10th/22-23/drishti.jpg' },
      { id: '79', name: 'PRIAYANSHI', percentage: 97.2, image: '/images/students/toppers/10th/22-23/priyanshi.jpg' },
    ]
  },
]

function TopperCard({ topper, rank }: { topper: TopperSession; rank: number }) {
  const isFirst = rank === 0
  
  return (
    <FadeInItem direction="up" blur>
      <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ${isFirst ? 'ring-2 ring-secondary-400' : ''}`}>
        {rank < 3 && (
          <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg ${
            rank === 0 ? 'bg-secondary-400 text-primary-900' :
            rank === 1 ? 'bg-gray-300 text-gray-700' :
            'bg-amber-600 text-white'
          }`}>
            {rank === 0 && <Trophy size={14} />}
            {rank === 1 && <Medal size={14} />}
            {rank === 2 && <Star size={14} />}
            {rank + 1}{rank === 0 ? 'st' : rank === 1 ? 'nd' : 'rd'}
          </div>
        )}

        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          {topper.image ? (
            <Image src={topper.image} alt={topper.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
              <span className="text-4xl font-bold text-primary-300">{topper.name.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white font-bold text-center">{topper.name}</p>
          </div>
        </div>

        <div className="p-4 text-center">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 ${
            isFirst ? 'bg-gradient-to-br from-secondary-400 to-secondary-500 shadow-glow-secondary' : 'bg-primary-50'
          }`}>
            <span className={`font-bold text-lg ${isFirst ? 'text-primary-900' : 'text-primary-700'}`}>{topper.percentage}%</span>
          </div>
          <h3 className="font-display font-bold text-primary-900 mb-1 group-hover:text-primary-700 transition-colors">{topper.name}</h3>
          <p className="text-xs text-gray-400 mt-2">Session {topper.year}</p>
        </div>

        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-bl-full" />
        </div>
      </div>
    </FadeInItem>
  )
}

function SessionSection({ sessions }: { sessions: typeof class10Sessions }) {
  const [activeSession, setActiveSession] = useState(0)
  
  return (
    <div className="mb-20">
      <FadeIn blur>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary-100">
            <BookOpen size={14} />Class 10
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">Board Examination Results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Celebrating academic excellence of our Class 10 students</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1} blur>
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {sessions.map((session, index) => (
            <button
              key={session.folder}
              onClick={() => setActiveSession(index)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeSession === index ? 'bg-primary-700 text-white shadow-glow' : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              Session {session.year}
            </button>
          ))}
        </div>
      </FadeIn>

      <ScaleIn key={activeSession}>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sessions[activeSession].toppers.map((topper, index) => (
            <TopperCard key={topper.id} topper={{...topper, year: parseInt(sessions[activeSession].year.split('-')[0]) + 2000}} rank={index} />
          ))}
        </StaggerContainer>
      </ScaleIn>
    </div>
  )
}

export default function Class10ToppersPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <ParallaxSection offset={-50} className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                <Award size={16} className="text-secondary-400" />Academic Excellence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">Class 10 Toppers</h1>
              <p className="text-xl text-primary-200 mb-8">Celebrating the outstanding achievements of our students</p>
              <Link href="/achievements/toppers" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all">
                <ArrowLeft size={18} />View Class 12 Toppers
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SessionSection sessions={class10Sessions} />
        </div>
      </Section>

      <div className="bg-primary-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <FadeIn blur>
            <h3 className="text-2xl font-display font-bold text-white mb-4">Be the Next Topper!</h3>
            <p className="text-primary-200 mb-6 max-w-xl mx-auto">Join Sacred Heart Senior Secondary School and excel academically</p>
            <Link href="/admission" className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-3 rounded-full font-bold hover:bg-secondary-300 transition-all shadow-glow-secondary">
              Apply for Admission <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
