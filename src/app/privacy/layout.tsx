import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How the school collects, uses and protects personal information.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
