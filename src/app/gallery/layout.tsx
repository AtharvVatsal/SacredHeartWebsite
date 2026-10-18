import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Photos from school events, celebrations and campus life.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
