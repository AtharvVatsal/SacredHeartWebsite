import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Address, phone numbers, email and office hours of Sacred Heart Senior Secondary School.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
