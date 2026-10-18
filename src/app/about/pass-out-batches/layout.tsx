import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pass Out Batches',
  description: 'Class photographs of the school\x27s graduating batches.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
