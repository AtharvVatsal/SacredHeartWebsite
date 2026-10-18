'use client'

import { m } from 'framer-motion'

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto mb-12" />
        
        {/* Filter skeleton */}
        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* Gallery grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <m.div
              key={i}
              className="aspect-square bg-gray-200 rounded-2xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}