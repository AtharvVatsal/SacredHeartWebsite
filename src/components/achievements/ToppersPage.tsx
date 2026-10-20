'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy, Medal, Star, Award, BookOpen } from 'lucide-react'
import { FadeIn, StaggerContainer, FadeInItem, ScaleIn } from '@/components/animations'
import HeroDecor from '@/components/layout/HeroDecor'
import Section from '@/components/ui/Section'
import { ordinal, rankToppers, type RankedTopper, type TopperSession } from '@/data/toppers'

function TopperCard({ topper, session }: { topper: RankedTopper; session: string }) {
  const isFirst = topper.rank === 1

  return (
    <FadeInItem direction="up" blur>
      <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full ${isFirst ? 'ring-2 ring-secondary-400' : ''}`}>
        {topper.rank <= 3 && (
          <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg ${
            topper.rank === 1 ? 'bg-secondary-400 text-primary-900' :
            topper.rank === 2 ? 'bg-gray-200 text-gray-800' :
            'bg-amber-700 text-white'
          }`}>
            {topper.rank === 1 && <Trophy aria-hidden size={14} />}
            {topper.rank === 2 && <Medal aria-hidden size={14} />}
            {topper.rank === 3 && <Star aria-hidden size={14} />}
            {ordinal(topper.rank)}
          </div>
        )}

        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          {topper.image ? (
            <Image
              src={topper.image}
              alt={topper.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
              <span className="text-4xl font-bold text-primary-700" aria-hidden="true">{topper.name.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 text-center">
          <div className={`inline-flex items-center justify-center min-w-[3.5rem] h-14 px-2.5 rounded-full mb-3 ${
            isFirst ? 'bg-gradient-to-br from-secondary-400 to-secondary-500 shadow-glow-secondary' : 'bg-primary-50'
          }`}>
            <span className={`font-bold text-base sm:text-lg tabular-nums ${isFirst ? 'text-primary-900' : 'text-primary-800'}`}>{topper.percentage}%</span>
          </div>
          <h3 className="font-display font-bold text-sm sm:text-base text-primary-900 mb-1 break-words hyphens-auto">{topper.name}</h3>
          <p className="text-xs text-gray-600 mt-2">Session {session}</p>
        </div>
      </div>
    </FadeInItem>
  )
}

function SessionSection({ classLabel, sessions }: { classLabel: string; sessions: TopperSession[] }) {
  const [activeSession, setActiveSession] = useState(0)
  const session = sessions[activeSession]

  return (
    <div className="mb-20">
      <FadeIn blur>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary-100">
            <BookOpen aria-hidden size={14} />{classLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">Board Examination Results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Celebrating academic excellence of our {classLabel} students</p>
        </div>
      </FadeIn>

      <div className="flex justify-center gap-2 mb-10 flex-wrap" role="group" aria-label="Choose a session">
        {sessions.map((s, index) => (
          <button
            type="button"
            key={s.folder}
            aria-pressed={activeSession === index}
            onClick={() => setActiveSession(index)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              activeSession === index ? 'bg-primary-700 text-white shadow-glow' : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
            }`}
          >
            Session {s.year}
          </button>
        ))}
      </div>

      <ScaleIn key={activeSession}>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {rankToppers(session.toppers).map(topper => (
            <TopperCard key={topper.id} topper={topper} session={session.year} />
          ))}
        </StaggerContainer>
      </ScaleIn>
    </div>
  )
}

interface ToppersPageProps {
  classLabel: string
  sessions: TopperSession[]
  otherClass: { label: string; href: string }
}

export default function ToppersPage({ classLabel, sessions, otherClass }: ToppersPageProps) {
  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-28 overflow-hidden">
        <HeroDecor icon={Trophy} secondaryIcon={Medal} orbs />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn blur>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                <Award aria-hidden size={16} className="text-secondary-400" />Academic Excellence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">{classLabel} Toppers</h1>
              <p className="text-xl text-primary-200 mb-8">Celebrating the outstanding achievements of our students</p>
              <Link href={otherClass.href} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all">
                View {otherClass.label} Toppers <ArrowRight aria-hidden size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      <Section className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SessionSection classLabel={classLabel} sessions={sessions} />
        </div>
      </Section>

      <div className="bg-primary-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <FadeIn blur>
            <h2 className="text-2xl font-display font-bold text-white mb-4">Be the Next Topper!</h2>
            <p className="text-primary-200 mb-6 max-w-xl mx-auto">Join Sacred Heart Senior Secondary School and excel academically</p>
            <Link href="/admission" className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-3 rounded-full font-bold hover:bg-secondary-300 transition-all shadow-glow-secondary">
              Apply for Admission <ArrowRight aria-hidden size={18} />
            </Link>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
