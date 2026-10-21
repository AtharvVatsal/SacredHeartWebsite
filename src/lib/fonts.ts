import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google'

// The site's three fonts, shared by the public site and the visual editor's canvas

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

/** Class names that expose the font variables; put them on <html> */
export const fontVariables = `${inter.variable} ${outfit.variable} ${jakarta.variable}`
