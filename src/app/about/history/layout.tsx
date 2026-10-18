import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our History',
  description: 'How Sacred Heart Senior Secondary School grew from the Garrison School at Yol Camp to its campus in Sidhpur.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
