import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages from the Head Boy and Head Girl',
  description: 'Messages from the student leaders of Sacred Heart Senior Secondary School.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
