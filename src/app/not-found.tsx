'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { m } from 'framer-motion'
import { FadeIn } from '@/components/animations'

const EASE = [0.16, 1, 0.3, 1] as const

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center relative overflow-hidden py-20">
      {/* Animated background blobs */}
      <m.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary-200/40 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/40 rounded-full blur-3xl"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.4, 0.6, 0.4], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn blur>
            {/* Large 404 with animated gradient */}
            <m.div
              className="text-[150px] md:text-[220px] font-display font-bold leading-none heading-gradient drop-shadow-sm"
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              404
            </m.div>

            {/* Decorative elements */}
            <m.div
              className="flex justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
            >
              {[0, 1, 2].map((i) => (
                <m.div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${i === 1 ? 'bg-primary-500' : 'bg-secondary-400'}`}
                  animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
                />
              ))}
            </m.div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
              Page Not Found
            </h1>

            <p className="text-gray-600 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.
            </p>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-700 to-primary-600 text-white px-7 py-3.5 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg hover:shadow-glow hover:-translate-y-0.5 sheen overflow-hidden relative"
              >
                <Home size={18} className="group-hover:-rotate-12 transition-transform duration-500" />
                <span className="relative z-10">Go Home</span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-primary-700 border-2 border-primary-200 px-7 py-3.5 rounded-full font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              >
                <Search size={18} className="group-hover:scale-110 transition-transform duration-500" />
                Contact Us
              </Link>
            </div>

            {/* School info card */}
            <m.div
              className="glass rounded-3xl p-7 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
            >
              <p className="text-sm text-gray-500 mb-3 font-medium">You might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Academics', href: '/academics' },
                  { label: 'Admission', href: '/admission' },
                  { label: 'Gallery', href: '/gallery' },
                  { label: 'Contact', href: '/contact' },
                ].map((item, i) => (
                  <m.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="text-xs px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300 font-medium border border-primary-100 hover:border-primary-600"
                    >
                      {item.label}
                    </Link>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Back button */}
            <m.button
              onClick={() => window.history.back()}
              className="mt-8 inline-flex items-center gap-2 text-gray-500 hover:text-primary-700 transition-colors text-sm group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Go back to previous page
            </m.button>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
