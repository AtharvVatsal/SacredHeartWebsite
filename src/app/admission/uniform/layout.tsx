import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'School Uniform',
  description: 'Summer, winter and sports uniform for girls and boys.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
