import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Classes, streams and subjects offered from Nursery to Class 12.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
