import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fee Structure',
  description: 'Fee payment guidelines, refunds and examination rules.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
