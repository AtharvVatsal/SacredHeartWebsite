'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { defaultSiteSettings, type SiteSettings } from '@/lib/site-settings'

const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings)

/** Makes the site settings (contact details, portal links...) available to client components such as page blocks */
export function SiteSettingsProvider({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
}

export const useSiteSettings = () => useContext(SiteSettingsContext)
