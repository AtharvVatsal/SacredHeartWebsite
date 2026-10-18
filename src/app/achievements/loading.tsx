'use client'

import { m } from 'framer-motion'

export default function AchievementsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto mb-12" />
        
        {/* Cards skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <m.div
              key={i}
              className="h-48 bg-gray-200 rounded-2xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}