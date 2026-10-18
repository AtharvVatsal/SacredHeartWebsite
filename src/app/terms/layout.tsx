import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using the Sacred Heart Senior Secondary School website.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
