import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Other Achievements',
  description: 'Student and alumni achievements beyond board exams.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
