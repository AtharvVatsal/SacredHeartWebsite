import type { Metadata } from 'next'
import '../(site)/globals.css'
import { fontVariables } from '@/lib/fonts'

// Root layout for the visual editor: the site's own styles and fonts (so the canvas matches the public pages),
// without the public header and footer.
export const metadata: Metadata = {
  title: 'Visual editor · Sacred Heart website',
  robots: { index: false, follow: false },
}

export default function EditorRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables}>
      <body className="font-body">{children}</body>
    </html>
  )
}
