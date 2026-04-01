'use client'

import { BookOpen, Shield, AlertCircle, CheckCircle, Users, Clock, Scissors, Backpack, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { m } from 'framer-motion'

export default function RulesPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
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
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/admission"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admission
              </Link>
            </m.div>

            <m.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20 w-fit"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Shield className="w-4 h-4 text-secondary-400" />
              <span>Guidelines</span>
            </m.div>

            <m.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Rules & Regulations
            </m.h1>

            <m.p
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Guidelines for students and parents
            </m.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-4 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-secondary-400" />
                <h2 className="text-xl font-display font-bold text-white">General Rules</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The school day commences with a prayer at assembly. At the sound of the bell, all must line up for the assembly after which they shall walk in silence to their respective class rooms.
                </p>
                <ul className="space-y-3">
                  {[
                    "All the students should attend the morning and afternoon assembly.",
                    "The students should come to school daily in full uniform; they must be clean and tidy.",
                    "Rules of politeness must be observed by all the pupils; they must respect everyone.",
                    "Every student is expected to have a school diary which must be brought to school daily.",
                    "All must speak English only on the school premises and in their respective vehicles while travelling in a group.",
                    "Except when it rains, no one is allowed inside the classroom during games and break.",
                    "Students are forbidden to write or scribble on the walls, desks, or throw paper or ink in the classroom or outside.",
                    "Any damage to school property is to be made good by the defaulter. In case the defaulter is not traceable, then collectively all the students of the particular class shall make good the loss. This is intended to develop a civil sense."
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 rule-item">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-secondary-400" />
                <h2 className="text-xl font-display font-bold text-white">Uniform & Grooming</h2>
              </div>
              <div className="p-6 space-y-4">
                <ul className="space-y-3">
                  {[
                    "Wearing of jewelry of any sort is not allowed in school except for a pair of simple earrings in case of girl students.",
                    "Students are not allowed to come to school with any fancy haircut following the fashion of the day.",
                    "Girls with long hair must make two plaits with white ribbons and those with short hair must have plain bob and wear a white hair band.",
                    "Use of henna/mehandi, nail polish, kajal etc. is forbidden in the school."
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 rule-item">
                      <Scissors className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover border-red-200">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-white" />
                <h2 className="text-xl font-display font-bold text-white">Prohibited Items</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Students are forbidden to bring to school articles such as mobile phones, walkman, watches, iPods, cameras, CDs, video games, other games, cassettes, other valuables, objectionable literature or any equipment which may cause injury or hurt others. Silver foil and tissue papers are also not allowed in the school.
                </p>
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent" />
                  <div className="flex items-start gap-3 relative">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800 font-semibold">
                      If any student is seen with any of these items, it will be taken away and never returned and the student will be suspended from the school.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-4 flex items-center gap-3">
                <Backpack className="w-5 h-5 text-secondary-400" />
                <h2 className="text-xl font-display font-bold text-white">School Bag & Property</h2>
              </div>
              <div className="p-6 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 rule-item">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Pupils are responsible for the safe custody of their books and belongings.</span>
                  </li>
                  <li className="flex items-start gap-3 rule-item">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Metal cases and fancy bags should not be used as school bags. Proposed colors are brown, black, dark blue or grey.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary-400" />
                <h2 className="text-xl font-display font-bold text-white">Attendance & Discipline</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The school accepts no responsibility if a student is obliged to return home during class hours because of failure to:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2 bg-gray-50 rounded-lg p-4">
                  <li>Wear proper school uniform.</li>
                  <li>Bring proper class books.</li>
                  <li>Get parent&apos;s/guardian&apos;s signature wherever necessary.</li>
                  <li>Attend the class on time.</li>
                </ol>
                <ul className="space-y-3 mt-4">
                  {[
                    "Every student must take part in the school games and other activities unless found physically unfit or exempted by the principal for a specific reason.",
                    "Exemption from P.T. and Judo/Karate will require explicit written application from the parents.",
                    "Sick students should not be sent to school.",
                    "If a student falls sick or gets hurt in the school, the parents will be informed. The student will be sent home only with the parents. Under unavoidable circumstances, the student may be sent home with a guardian, provided there is a written authority letter from the parents concerned.",
                    "Attendance for all school functions is compulsory. Irregular attendance, habitual idleness, disobedience or conduct injurious to the moral tone of the school will be dealt with severely."
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 rule-item">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-4 flex items-center gap-3">
                <Shield className="w-5 h-5 text-secondary-400" />
                <h2 className="text-xl font-display font-bold text-white">Discipline Card System</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  To ensure proper discipline, pink, grey and white card system is introduced. For minor breach of discipline a pink card and for major ones grey card is given. Three pink cards are equivalent to one grey card. These cards are cumulative.
                </p>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent" />
                  <div className="flex items-start gap-3 relative">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-800 font-semibold">
                      A student who possesses a grey card will neither be allowed to take part in any school functions like annual function, cultural programmes, election of office bearers, etc., nor represent the school in outside activities. A holder of three grey cards will have to leave the school.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 font-medium">
                    A white card is given for outstanding meritorious deeds.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-secondary-400" />
                <h2 className="text-xl font-display font-bold text-white">Important Notes</h2>
              </div>
              <div className="p-6 space-y-4">
                <ul className="space-y-3">
                  {[
                    "The school authorities reserve the right to dismiss any student at any time if they deem it necessary.",
                    "Students are not allowed to receive visitors, make phone calls or leave the school premises during school hours without the permission of the principal.",
                    "No books or magazines other than the text or library books may be brought to school.",
                    "No collection of money for any purpose whatsoever may be made in the school without the permission of the Principal.",
                    "If the report card is lost, parents must apply in writing for issuing a new one with a fine of Rs. 100/-.",
                    "To ensure their own safety, students are not permitted to visit shops or buy from vendors outside the school gate. In case of breach of this rule, the school does not accept responsibility for any mishap."
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 rule-item">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-8 border border-primary-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Sparkles className="w-24 h-24 text-primary-900" />
              </div>
              <div className="relative">
                <h3 className="text-lg font-display font-bold text-primary-900 mb-3">Our Expectation</h3>
                <p className="text-gray-700 leading-relaxed font-medium">
                  Sacred Heart school students should be polite among themselves and behave at all times in a friendly and loving manner, remembering that their school is judged by their conduct. They should maintain cleanliness and discipline everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
