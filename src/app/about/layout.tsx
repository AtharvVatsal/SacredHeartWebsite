import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The history, values and people of Sacred Heart Senior Secondary School, Sidhpur, Dharamshala.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
