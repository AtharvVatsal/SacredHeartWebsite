import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Board exam toppers and notable achievements of our students and alumni.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
