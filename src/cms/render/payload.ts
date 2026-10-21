import 'server-only'
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

/**
 * Payload for server components. Returns null (and logs once) when the database cannot be reached, so
 * public pages fall back to their built-in content instead of failing to build or render.
 */
let warned = false
export async function getPayloadSafe(): Promise<Payload | null> {
  if (!process.env.DATABASE_URL) {
    if (!warned) console.warn('[cms] DATABASE_URL is not set; serving built-in content only')
    warned = true
    return null
  }
  try {
    return await getPayload({ config })
  } catch (error) {
    if (!warned) console.warn(`[cms] Database unavailable, serving built-in content: ${(error as Error).message}`)
    warned = true
    return null
  }
}
