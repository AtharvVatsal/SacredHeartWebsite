import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Office Bearers',
  description: 'Head boy, head girl, captains and prefects of the student council, session by session.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
