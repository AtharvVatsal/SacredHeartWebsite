'use client'

import { m } from 'framer-motion'

export default function HomeLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="min-h-screen bg-gray-50">
      <span className="sr-only">Loading…</span>

      {/* Hero skeleton */}
      <section className="min-h-[90vh] pt-20 bg-mesh">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-9 w-44 bg-white/60 rounded-full shimmer" />
              <div className="h-14 w-4/5 bg-white/60 rounded-2xl shimmer" />
              <div className="h-14 w-3/5 bg-white/60 rounded-2xl shimmer" />
              <div className="h-6 w-2/3 bg-white/60 rounded-lg shimmer" />
              <div className="flex gap-4 pt-4">
                <div className="h-14 w-40 bg-white/70 rounded-full shimmer" />
                <div className="h-14 w-32 bg-white/70 rounded-full shimmer" />
              </div>
            </div>
            <div className="h-[420px] bg-white/60 rounded-[2rem] shimmer" />
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <div className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <m.div
                key={i}
                className="h-32 bg-white rounded-2xl shimmer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links skeleton */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-4 w-32 bg-gray-100 rounded-full mx-auto mb-3 shimmer" />
          <div className="h-10 w-56 bg-gray-100 rounded-xl mx-auto mb-12 shimmer" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <m.div
                key={i}
                className="h-44 bg-gray-50 rounded-2xl shimmer border border-gray-100"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
