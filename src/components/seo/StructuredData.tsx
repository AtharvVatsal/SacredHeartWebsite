import type { SiteSettings } from '@/lib/site-settings'
import { SITE_URL, routes } from '@/lib/seo'

// "01892-222428" -> "+91-1892-222428", "86290-99633" -> "+91-86290-99633"
const intl = (phone: string) => `+91-${phone.replace(/^0/, '')}`

// Site-wide structured data (schema.org JSON-LD): the school as an organisation, and the website itself
export default function StructuredData({ settings }: { settings: SiteSettings }) {
  const { identity, contact } = settings
  const school = {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `${SITE_URL}/#school`,
    name: identity.fullName,
    alternateName: `${identity.name}, Sidhpur`,
    url: SITE_URL,
    logo: identity.logo.src.startsWith('https://') ? identity.logo.src : `${SITE_URL}${identity.logo.src}`,
    image: `${SITE_URL}/og-image.jpg`,
    description: routes['/'].description,
    foundingDate: String(identity.established),
    email: contact.emails[0],
    telephone: contact.phones[0] ? intl(contact.phones[0]) : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.address.street}, Tehsil ${contact.address.tehsil}, District ${contact.address.district}`,
      addressLocality: contact.address.tehsil,
      addressRegion: contact.address.state,
      postalCode: contact.address.pincode,
      addressCountry: 'IN',
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapPlusCode)}`,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '14:30',
    }],
    contactPoint: contact.phones.map(phone => ({
      '@type': 'ContactPoint',
      telephone: intl(phone),
      contactType: 'school office',
      areaServed: 'IN',
    })),
    parentOrganization: { '@type': 'Organization', name: identity.management },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: identity.fullName,
    alternateName: identity.name,
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#school` },
  }

  return (
    <script
      type="application/ld+json"
      // Values come from the site settings; escaping < keeps any text from closing the script element
      dangerouslySetInnerHTML={{ __html: JSON.stringify([school, website]).replace(/</g, '\\u003c') }}
    />
  )
}
