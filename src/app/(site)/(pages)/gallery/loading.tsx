'use client'

export default function GalleryLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="min-h-screen bg-gray-50 pt-24 pb-16 motion-safe:animate-pulse">
      <span className="sr-only">Loading…</span>
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
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  )
}