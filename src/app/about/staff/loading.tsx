'use client'

export default function StaffLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="min-h-screen bg-gray-50 pt-24 pb-16 motion-safe:animate-pulse">
      <span className="sr-only">Loading…</span>
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto mb-12" />
        
        {/* Staff grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  )
}