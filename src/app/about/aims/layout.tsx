import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Aims',
  description: 'The vision, mission and core values that guide Sacred Heart Senior Secondary School.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
