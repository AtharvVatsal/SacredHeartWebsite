'use client'

export default function NotificationsLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="min-h-screen bg-gray-50 pt-24 pb-16 motion-safe:animate-pulse">
      <span className="sr-only">Loading…</span>
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto mb-12" />
        
        {/* Notifications skeleton */}
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  )
}