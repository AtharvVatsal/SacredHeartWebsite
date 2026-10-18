import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Principal\x27s Message',
  description: 'A message from Sr. Archana, Principal of Sacred Heart Senior Secondary School.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
