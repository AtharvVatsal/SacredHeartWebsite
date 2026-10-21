'use client'

import { Scissors, CheckCircle, AlertCircle, ShoppingBag, Sparkles, ArrowLeft, Shirt, Wind, Trophy } from 'lucide-react'
import Link from 'next/link'
import { m } from 'framer-motion'
import HeroDecor from '@/components/layout/HeroDecor'
import { Shirt as HeroMotif, Ruler as HeroMotifSmall } from 'lucide-react'

const girlsSummer = [
  { item: 'Pale Green skirt (just below the knees)', note: 'Pattern differs for LKG-VI' },
  { item: 'Cream coloured blouse', note: null },
  { item: 'Black shoes with one strap', note: null },
  { item: 'White socks (calf length)', note: null },
  { item: 'School tie', note: null },
  { item: 'Bloomers', note: 'Must be worn at all times' },
  { item: 'Hair plaited or white hair band', note: 'For those with short hair' },
]

const boysSummerLkg4 = [
  { item: 'Steel Grey shorts', note: null },
  { item: 'White shirt', note: null },
]

const boysSummer5to12 = [
  { item: 'Steel Grey pants', note: null },
  { item: 'White shirt with half sleeves', note: null },
  { item: 'Black laced shoes', note: null },
  { item: 'White socks', note: null },
  { item: 'School tie and belt', note: null },
]

const girlsWinter = [
  'Terry wool worsted steel grey pants (L.K.G. to IV) with belt',
  'Terry wool worsted steel grey skirt (V-XII, just below knee)',
  'White blouse',
  'School tie',
  'Bottle green twine',
  'Blazer',
  'Black shoes with one strap',
  'White socks',
]

const boysWinter = [
  'Terry wool worsted steel grey pants',
  'White shirt',
  'Green Turban (for Sikh Boys)',
  'School tie',
  'Bottle Green Pullover',
  'Blazer',
  'White socks',
  'Black shoes',
]

const sportsGirls = [
  'White divided skirts (just below the knee)',
  'House T-shirt',
  'White canvas shoes',
  'White socks',
]

const sportsBoys = [
  'White pants',
  'House T-shirt',
  'White P.T. Shoes',
  'White socks',
]

export default function UniformPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-28 overflow-hidden">
        <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-4">
              <Link href="/admission" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Admission
                </span>
              </Link>
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 w-fit">
                <Sparkles className="w-4 h-4 text-secondary-400" />
                Dress Code
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mt-8 mb-4">
              School Uniform
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Uniform specifications for all students
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Where to Buy */}
      <section className="py-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-secondary-100 to-amber-50 rounded-2xl p-6 md:p-8 border border-secondary-200 shadow-lg">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-primary-900 mb-2">Where to Buy</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    School uniforms are to be bought from <strong className="text-secondary-600">DCN shop in Dharamshala</strong>. The colour, material and pattern must be approved by the school only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Girls Summer Uniform */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow group">
              <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shirt className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">Girls Summer Uniform</h2>
                    <p className="text-pink-100">Essential items for daily wear</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid gap-4">
                  {girlsSummer.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-pink-50 transition-colors group/item">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:from-pink-200 group-hover/item:to-rose-200 transition-colors">
                        <CheckCircle className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{item.item}</p>
                        {item.note && <p className="text-amber-800 text-sm mt-1">{item.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boys Summer Uniform */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shirt className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">Boys Summer Uniform</h2>
                    <p className="text-blue-100">Essential items for daily wear</p>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    L.K.G. to Class 4
                  </h3>
                  <div className="grid gap-3">
                    {boysSummerLkg4.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{item.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                  <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Class 5 to XII
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {boysSummer5to12.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                        <span className="text-gray-700">{item.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winter Uniform */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow group">
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wind className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">Winter Uniform</h2>
                    <p className="text-slate-300">October to March</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Shirt className="w-4 h-4 text-pink-600" />
                      </span>
                      Girls
                    </h3>
                    <div className="space-y-2">
                      {girlsWinter.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shirt className="w-4 h-4 text-blue-600" />
                      </span>
                      Boys
                    </h3>
                    <div className="space-y-2">
                      {boysWinter.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & Games */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow group">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">Sports & Games</h2>
                    <p className="text-green-100">Physical Education Attire</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <h3 className="font-bold text-green-800 mb-4">Girls</h3>
                    <div className="space-y-3">
                      {sportsGirls.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
                    <h3 className="font-bold text-emerald-800 mb-4">Boys</h3>
                    <div className="space-y-3">
                      {sportsBoys.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <p className="text-blue-800 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span><strong>Note:</strong> The white uniform is only for students from Classes VI to XII. They should be in their house uniform on all the days stipulated for Mass P.T.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Accessories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl shadow-xl border border-primary-100 overflow-hidden hover:shadow-2xl transition-shadow group">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Scissors className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">School Badges, Belts & Ties</h2>
                    <p className="text-primary-200">Available at School Office</p>
                  </div>
                </div>
              </div>
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <p className="text-gray-700 text-lg">
                  School Badges, belts and ties will be available in the school office.
                </p>
                <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
                  {['Identity cards are mandatory with the uniform.', 'The uniform must be neat, clean and well ironed.', 'Follow the pattern and guidelines given by the school.'].map(rule => (
                    <li key={rule} className="flex items-start gap-2 rounded-xl bg-primary-50 p-4 text-sm text-gray-700">
                      <CheckCircle aria-hidden className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
