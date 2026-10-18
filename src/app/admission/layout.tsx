import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admission',
  description: 'How to apply for admission and the documents you need.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
