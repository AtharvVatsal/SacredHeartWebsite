import type { Metadata } from 'next'
import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import { schoolInfo } from '@/data/school'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${schoolInfo.name} | ${schoolInfo.tagline}`,
    template: `%s | ${schoolInfo.name}`,
  },
  description: `${schoolInfo.fullName}, ${schoolInfo.address.tehsil}, ${schoolInfo.address.district}. ${schoolInfo.affiliation} affiliated school run by ${schoolInfo.management}.`,
  keywords: ['school', 'education', 'sacred heart', 'dharmashala', 'himachal pradesh', 'CISCE'],
  authors: [{ name: schoolInfo.name }],
  icons: {
    icon: '/images/logo_batch.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-body">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

