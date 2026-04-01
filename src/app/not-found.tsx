'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { m } from 'framer-motion'
import { schoolInfo } from '@/data/school'
import { FadeIn } from '@/components/animations'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn blur>
            {/* Large 404 */}
            <m.div 
              className="text-[150px] md:text-[200px] font-display font-bold text-primary-900 leading-none opacity-90"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              404
            </m.div>
            
            {/* Decorative elements */}
            <m.div 
              className="flex justify-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-3 h-3 bg-secondary-400 rounded-full" />
              <div className="w-3 h-3 bg-primary-500 rounded-full" />
              <div className="w-3 h-3 bg-secondary-400 rounded-full" />
            </m.div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
              Page Not Found
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
              Oops! The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.
            </p>
            
            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Home size={18} />
                Go Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-700 border-2 border-primary-200 px-6 py-3 rounded-full font-medium hover:bg-primary-50 transition-all"
              >
                <Search size={18} />
                Contact Us
              </Link>
            </div>
            
            {/* School info card */}
            <m.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-gray-500 mb-2">You might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['About Us', 'Academics', 'Admission', 'Gallery', 'Contact'].map((item, i) => (
                  <Link
                    key={item}
                    href={item === 'About Us' ? '/about' : item === 'Academics' ? '/academics' : item === 'Admission' ? '/admission' : item === 'Gallery' ? '/gallery' : '/contact'}
                    className="text-xs px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </m.div>
            
            {/* Back button hint */}
            <m.button
              onClick={() => window.history.back()}
              className="mt-8 inline-flex items-center gap-2 text-gray-500 hover:text-primary-700 transition-colors text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ArrowLeft size={16} />
              Go back to previous page
            </m.button>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
