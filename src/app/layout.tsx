import type { Metadata } from 'next'
import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import GradualBlur from '@/components/animations/GradualBlur'
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
      <head>
        {/* Entrance animations start hidden and are revealed by JavaScript; without it, show everything */}
        <noscript>
          {/* dangerouslySetInnerHTML keeps the quotes in the selector from being HTML-escaped */}
          <style
            dangerouslySetInnerHTML={{
              __html: '[style*="opacity:0;"],[style$="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary-800 focus:px-5 focus:py-3 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-grow outline-none">{children}</main>
          <Footer />
          {/* Soft blur at the bottom edge while there is more page to scroll; fades away at the end of the page */}
          <GradualBlur
            target="page"
            position="bottom"
            height="3.5rem"
            strength={1.25}
            layers={6}
            curve="bezier"
            exponential
            autoHide
            zIndex={30}
            className="print:hidden"
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

