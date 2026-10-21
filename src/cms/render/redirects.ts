import 'server-only'
import { getPayloadSafe } from './payload'

/** The redirect registered for an old address, if any */
export async function findRedirect(path: string): Promise<{ to: string; permanent: boolean } | null> {
  const payload = await getPayloadSafe()
  if (!payload) return null
  try {
    const { docs } = await payload.find({ collection: 'redirects', where: { from: { equals: path } }, limit: 1, depth: 0, overrideAccess: false })
    const r = docs[0]
    return r ? { to: r.to, permanent: r.permanent !== false } : null
  } catch {
    return null
  }
}

/** Addresses of published pages created in the CMS (not the built-in routes) */
export async function publishedCustomPaths(): Promise<{ path: string; updatedAt: string; noIndex: boolean }[]> {
  const payload = await getPayloadSafe()
  if (!payload) return []
  try {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { and: [{ kind: { equals: 'custom' } }, { _status: { equals: 'published' } }] },
      limit: 1000,
      depth: 0,
      pagination: false,
      overrideAccess: false,
      select: { path: true, updatedAt: true, seo: { noIndex: true } },
    })
    return docs.map((d) => ({ path: d.path, updatedAt: d.updatedAt, noIndex: Boolean(d.seo?.noIndex) }))
  } catch {
    return []
  }
}
