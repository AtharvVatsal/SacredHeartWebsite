import 'server-only'
import { cache } from 'react'
import type { SiteSetting } from '@/payload-types'
import { defaultSiteSettings, type SiteSettings } from '@/lib/site-settings'
import { toSiteSettings } from './settings-map'
import { getPayloadSafe } from './payload'

/**
 * Site settings for this render. Until an administrator saves the settings once, or whenever the database
 * is unreachable, this is exactly the built-in content from src/data/school.ts.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayloadSafe()
  if (!payload) return defaultSiteSettings
  try {
    const g = (await payload.findGlobal({ slug: 'site-settings', depth: 1, overrideAccess: false })) as SiteSetting
    // A global that has never been saved has no updatedAt; keep the built-in values
    if (!g || !(g as { updatedAt?: string }).updatedAt) return defaultSiteSettings
    return toSiteSettings(g)
  } catch (error) {
    console.warn(`[cms] Could not load site settings, using built-in values: ${(error as Error).message}`)
    return defaultSiteSettings
  }
})
