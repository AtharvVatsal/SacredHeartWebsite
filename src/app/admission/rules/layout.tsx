import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rules & Regulations',
  description: 'School rules on conduct, uniform, attendance and discipline.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
