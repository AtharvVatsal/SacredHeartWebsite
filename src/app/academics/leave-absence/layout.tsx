import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leave & Absence',
  description: 'School rules for leave, absence and attendance.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
