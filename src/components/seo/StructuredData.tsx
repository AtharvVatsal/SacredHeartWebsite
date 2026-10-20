import { schoolInfo, schoolLocation } from '@/data/school'
import { SITE_URL, routes } from '@/lib/seo'

// "01892-222428" -> "+91-1892-222428", "86290-99633" -> "+91-86290-99633"
const intl = (phone: string) => `+91-${phone.replace(/^0/, '')}`

// Site-wide structured data (schema.org JSON-LD): the school as an organisation, and the website itself
export default function StructuredData() {
  const school = {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `${SITE_URL}/#school`,
    name: schoolInfo.fullName,
    alternateName: `${schoolInfo.name}, Sidhpur`,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo_batch.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description: routes['/'].description,
    foundingDate: String(schoolInfo.established),
    email: schoolInfo.contact.emails[0],
    telephone: intl(schoolInfo.contact.phones[0]),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${schoolInfo.address.street}, Tehsil ${schoolInfo.address.tehsil}, District ${schoolInfo.address.district}`,
      addressLocality: schoolInfo.address.tehsil,
      addressRegion: schoolInfo.address.state,
      postalCode: schoolInfo.address.pincode,
      addressCountry: 'IN',
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolLocation.plusCode)}`,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '14:30',
    }],
    contactPoint: schoolInfo.contact.phones.map(phone => ({
      '@type': 'ContactPoint',
      telephone: intl(phone),
      contactType: 'school office',
      areaServed: 'IN',
    })),
    parentOrganization: { '@type': 'Organization', name: schoolInfo.management },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: schoolInfo.fullName,
    alternateName: schoolInfo.name,
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#school` },
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: it contains only our own static data
      dangerouslySetInnerHTML={{ __html: JSON.stringify([school, website]) }}
    />
  )
}
