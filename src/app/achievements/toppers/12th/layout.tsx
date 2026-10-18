import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 12 Toppers',
  description: 'Class 12 board exam toppers, session by session.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
