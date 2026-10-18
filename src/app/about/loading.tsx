'use client'

import { m } from 'framer-motion'

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 animate-pulse">
      <div className="container mx-auto px-4">
        {/* Hero skeleton */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-6">
            <div className="h-8 w-24 bg-gray-200 rounded-full" />
            <div className="h-14 w-3/4 bg-gray-200 rounded-lg" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="h-96 bg-gray-100 rounded-3xl" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <m.div
              key={i}
              className="h-64 bg-gray-50 rounded-3xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}