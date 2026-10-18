import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syllabus & Homework',
  description: 'Curriculum, subjects, streams and homework guidelines.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
