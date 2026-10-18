import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 10 Toppers',
  description: 'Class 10 board exam toppers, session by session.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
