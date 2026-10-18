import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Announcements from Sacred Heart Senior Secondary School.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
