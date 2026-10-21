// Pure mapping from the saved global to SiteSettings (no server-only guard, so scripts and tests can use it)
import type { Media, SiteSetting } from '@/payload-types'
import { defaultSiteSettings, type SiteSettings } from '@/lib/site-settings'
import { mediaUrl } from './media'

const str = (value: string | null | undefined, fallback: string) => (typeof value === 'string' ? value : fallback)

/** Saved global -> the shape the header, footer and structured data use. Unset values keep the default. */
export function toSiteSettings(g: SiteSetting): SiteSettings {
  const d = defaultSiteSettings
  const logo = typeof g.identity?.logo === 'object' && g.identity.logo ? (g.identity.logo as Media) : null
  return {
    identity: {
      name: str(g.identity?.name, d.identity.name) || d.identity.name,
      fullName: str(g.identity?.fullName, d.identity.fullName) || d.identity.fullName,
      tagline: str(g.identity?.tagline, d.identity.tagline),
      affiliation: str(g.identity?.affiliation, d.identity.affiliation),
      established: g.identity?.established ?? d.identity.established,
      management: str(g.identity?.management, d.identity.management),
      principal: str(g.identity?.principal, d.identity.principal),
      logo: logo && mediaUrl(logo) ? { src: mediaUrl(logo)!, alt: logo.alt || d.identity.logo.alt } : d.identity.logo,
    },
    contact: {
      phones: g.contact?.phones ? g.contact.phones.map((p) => p.number) : d.contact.phones,
      emails: g.contact?.emails ? g.contact.emails.map((e) => e.email) : d.contact.emails,
      address: {
        street: str(g.contact?.address?.street, d.contact.address.street),
        tehsil: str(g.contact?.address?.tehsil, d.contact.address.tehsil),
        district: str(g.contact?.address?.district, d.contact.address.district),
        state: str(g.contact?.address?.state, d.contact.address.state),
        pincode: str(g.contact?.address?.pincode, d.contact.address.pincode),
      },
      mapPlusCode: str(g.contact?.mapPlusCode, d.contact.mapPlusCode),
    },
    onlineServices: {
      feePortal: str(g.onlineServices?.feePortal, d.onlineServices.feePortal),
      registrationPortal: str(g.onlineServices?.registrationPortal, d.onlineServices.registrationPortal),
      alumniRegistration: str(g.onlineServices?.alumniRegistration, d.onlineServices.alumniRegistration),
      androidApp: str(g.onlineServices?.androidApp, d.onlineServices.androidApp),
      iosApp: str(g.onlineServices?.iosApp, d.onlineServices.iosApp),
    },
    navigation: g.navigation?.length
      ? g.navigation.map((item) => ({
          text: item.text,
          href: item.href,
          external: Boolean(item.external),
          summary: item.summary || undefined,
          children: item.children?.length ? item.children.map((c) => ({ text: c.text, href: c.href, external: Boolean(c.external) })) : undefined,
        }))
      : d.navigation,
    header: {
      applyLabel: str(g.header?.applyLabel, d.header.applyLabel) || d.header.applyLabel,
      applyHref: str(g.header?.applyHref, d.header.applyHref) || d.header.applyHref,
      mobileApplyLabel: str(g.header?.mobileApplyLabel, d.header.mobileApplyLabel) || d.header.mobileApplyLabel,
    },
    footer: {
      description: str(g.footer?.description, d.footer.description),
      quickLinks: g.footer?.quickLinks ? g.footer.quickLinks.map((l) => ({ text: l.text, href: l.href })) : d.footer.quickLinks,
    },
    social: g.footer?.social?.map((s) => ({ platform: s.platform, url: s.url })) ?? d.social,
    announcement: {
      enabled: Boolean(g.announcement?.enabled && g.announcement.message),
      message: str(g.announcement?.message, ''),
      linkLabel: str(g.announcement?.linkLabel, ''),
      linkHref: str(g.announcement?.linkHref, ''),
      tone: g.announcement?.tone === 'important' ? 'important' : 'info',
    },
  }
}
