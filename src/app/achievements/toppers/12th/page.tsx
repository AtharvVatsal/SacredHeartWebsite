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

const class12Sessions = [
  {
    year: '2024-25',
    folder: '24-25',
    toppers: [
      { id: '1', name: 'PRIYANSHI', percentage: 98, image: '/images/Students/Toppers/12th/24-25/Priyanshi.webp' },
      { id: '2', name: 'KASHISH', percentage: 96, image: '/images/Students/Toppers/12th/24-25/Kashish.webp' },
      { id: '3', name: 'SHARAJ SHARMA', percentage: 95, image: '/images/Students/Toppers/12th/24-25/Sharaj.webp' },
      { id: '4', name: 'SHIVANG KHANKA', percentage: 95, image: '/images/Students/Toppers/12th/24-25/Shivang.webp' },
      { id: '5', name: 'ADITI AWASTHI', percentage: 94.5, image: '/images/Students/Toppers/12th/24-25/Aditi.webp' },
      { id: '6', name: 'ANANYA GAKHAR', percentage: 94, image: '/images/Students/Toppers/12th/24-25/Ananya.webp' },
      { id: '7', name: 'ABHAY KATOCH', percentage: 93.25, image: '/images/Students/Toppers/12th/24-25/Abhay.webp' },
      { id: '8', name: 'PRATYUSH KASHYAP', percentage: 93.25, image: '/images/Students/Toppers/12th/24-25/Pratyush.webp' },
      { id: '9', name: 'DEVANSHI', percentage: 92.5, image: '/images/Students/Toppers/12th/24-25/Devanshi.webp' },
      { id: '10', name: 'RAHUL VERMA', percentage: 92, image: '/images/Students/Toppers/12th/24-25/Rahul.webp' },
      { id: '11', name: 'SHANTAM VARDHAN', percentage: 92, image: '/images/Students/Toppers/12th/24-25/Shantam.webp' },
      { id: '12', name: 'PARUL ROHIT', percentage: 92, image: '/images/Students/Toppers/12th/24-25/Parul.webp' },
      { id: '13', name: 'SWASTIK SUKTA', percentage: 90.75, image: '/images/Students/Toppers/12th/24-25/Swastik.webp' },
      { id: '14', name: 'SHARA AGNIHOTRI', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Shara.webp' },
      { id: '15', name: 'SHIVAM', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Shivam.webp' },
      { id: '16', name: 'SWAPI', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Swapi.webp' },
      { id: '17', name: 'PRATHANA SINGH', percentage: 94, image: '/images/Students/Toppers/12th/24-25/Prathana.webp' },
      { id: '18', name: 'ANIMESH', percentage: 90.5, image: '/images/Students/Toppers/12th/24-25/Animesh.webp' },
      { id: '19', name: 'PRATYUSH', percentage: 90, image: '/images/Students/Toppers/12th/24-25/Pratyush.webp' },
    ]
  },
  {
    year: '2023-24',
    folder: '23-24',
    toppers: [
      { id: '20', name: 'ASMITA NAROTRA', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Asmita.webp' },
      { id: '21', name: 'SANCHIT SHARMA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Sanchit.webp' },
      { id: '22', name: 'SHREYA GULERIA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Shreya.webp' },
      { id: '23', name: 'AKSHIMA JAGGI', percentage: 95, image: '/images/Students/Toppers/12th/23-24/Akshima.webp' },
      { id: '24', name: 'AISHWARYA SINGH THAPA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Aishwarya.webp' },
      { id: '25', name: 'AADISH', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Aadish.webp' },
      { id: '26', name: 'TRISHA KHAJURIA', percentage: 92, image: '/images/Students/Toppers/12th/23-24/Trisha.webp' },
      { id: '27', name: 'TULIP CHOUHAN', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Tulip.webp' },
      { id: '28', name: 'SARTHAK SHARMA', percentage: 94, image: '/images/Students/Toppers/12th/23-24/Sarthak.webp' },
      { id: '29', name: 'SARANSH SACHIN THAPA', percentage: 96, image: '/images/Students/Toppers/12th/23-24/Saransh.webp' },
      { id: '30', name: 'NIMISH NAVEEN CHOUDHARY', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Tnimish.webp' },
      { id: '31', name: 'KHUSHI BHOGAL', percentage: 90, image: '/images/Students/Toppers/12th/23-24/Khushi.webp' },
      { id: '32', name: 'SWASTIK BHARDWAJ', percentage: 91, image: '/images/Students/Toppers/12th/23-24/Swastik.webp' },
    ]
  },
  {
    year: '2022-23',
    folder: '22-23',
    toppers: [
      { id: '33', name: 'NISHESH', percentage: 97.2, image: '/images/Students/Toppers/12th/22-23/Nishesh.webp' },
      { id: '34', name: 'ARCHIE', percentage: 97.2, image: '/images/Students/Toppers/12th/22-23/Archie.webp' },
      { id: '35', name: 'SHREYAS SHARMA', percentage: 95, image: '/images/Students/Toppers/12th/22-23/Shreyas.webp' },
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

function SessionSection({ sessions }: { sessions: typeof class12Sessions }) {
  const [activeSession, setActiveSession] = useState(0)
  
  return (
    <div className="mb-20">
      <FadeIn blur>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary-100">
            <BookOpen size={14} />Class 12
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">Board Examination Results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Celebrating academic excellence of our Class 12 students</p>
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

export default function Class12ToppersPage() {
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">Class 12 Toppers</h1>
              <p className="text-xl text-primary-200 mb-8">Celebrating the outstanding achievements of our students</p>
              <Link href="/achievements/toppers" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all">
                <ArrowLeft size={18} />View Class 10 Toppers
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SessionSection sessions={class12Sessions} />
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
