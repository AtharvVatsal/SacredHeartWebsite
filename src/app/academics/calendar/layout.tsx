import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academic Calendar',
  description: 'School holidays, exams and events.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
