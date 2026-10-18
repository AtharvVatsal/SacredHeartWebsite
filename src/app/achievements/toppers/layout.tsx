import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Board Exam Toppers',
  description: 'Class 10 and Class 12 board exam toppers of Sacred Heart Senior Secondary School.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
