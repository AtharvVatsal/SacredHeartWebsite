import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Staff',
  description: 'Teachers and staff of Sacred Heart Senior Secondary School, with their departments and qualifications.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
