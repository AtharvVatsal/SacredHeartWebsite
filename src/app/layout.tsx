import type { Metadata } from 'next'
import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import GradualBlur from '@/components/animations/GradualBlur'
import { schoolInfo } from '@/data/school'
import { pageMeta, routes, SITE_URL } from '@/lib/seo'
import StructuredData from '@/components/seo/StructuredData'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

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

// The home page has no layout of its own, so its title, description, canonical URL and social card live here;
// every other page overrides them from its own layout (see src/lib/seo.ts).
const home = pageMeta('/')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...home,
  title: {
    default: routes['/'].title,
    template: `%s | ${schoolInfo.name}`,
  },
  applicationName: schoolInfo.fullName,
  keywords: ['Sacred Heart School Sidhpur', 'Sacred Heart Senior Secondary School', 'school in Dharamshala', 'CISCE school Himachal Pradesh', 'ICSE ISC school Kangra', 'Sidhpur', 'Dharamshala'],
  authors: [{ name: schoolInfo.fullName, url: SITE_URL }],
  creator: 'Atharv Vatsal',
  publisher: schoolInfo.fullName,
  category: 'education',
  icons: {
    icon: [{ url: '/images/logo_batch.png', type: 'image/png', sizes: '183x182' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    ...home.alternates,
    types: { 'application/rss+xml': [{ url: '/notifications.rss', title: `${schoolInfo.name} notifications` }] },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${inter.variable} ${outfit.variable} ${jakarta.variable}`}>
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
        {/* Structured data for search engines: the school, the website and this page's breadcrumb trail */}
        <StructuredData />
        <BreadcrumbJsonLd />
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
            height="4rem"
            strength={0.5}
            layers={8}
            autoHide
            zIndex={30}
            className="print:hidden"
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

