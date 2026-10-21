import path from 'node:path'
import { APIError, type CollectionBeforeDeleteHook, type CollectionConfig } from 'payload'
import { anyone, isAdmin, isStaff } from '../access'

// Raster images and PDFs only. SVG is deliberately not accepted: it can carry script.
export const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'application/pdf']

/** Finds every page (published or draft) and setting that still uses this file */
export async function findMediaReferences(req: Parameters<CollectionBeforeDeleteHook>[0]['req'], id: number | string) {
  const needle = `"mediaId":${Number(id)}`
  const used: string[] = []
  const pages = await req.payload.find({ collection: 'pages', limit: 1000, depth: 0, req, overrideAccess: true, draft: false, pagination: false })
  for (const p of pages.docs) {
    if (JSON.stringify(p.content ?? '').includes(needle) || Number((p.seo as { image?: unknown } | undefined)?.image) === Number(id)) used.push(`${p.title} (published)`)
  }
  const drafts = await req.payload.findVersions({ collection: 'pages', where: { latest: { equals: true } }, limit: 1000, depth: 0, req, overrideAccess: true, pagination: false })
  for (const v of drafts.docs) {
    const version = v.version as { title?: string; content?: unknown; seo?: { image?: unknown } }
    if (JSON.stringify(version.content ?? '').includes(needle) || Number(version.seo?.image) === Number(id)) used.push(`${version.title ?? 'A page'} (draft)`)
  }
  const settings = await req.payload.findGlobal({ slug: 'site-settings', depth: 0, req, overrideAccess: true })
  if (Number((settings as { identity?: { logo?: unknown } }).identity?.logo) === Number(id)) used.push('Site settings (logo)')
  return [...new Set(used)]
}

const refuseIfUsed: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const used = await findMediaReferences(req, id)
  if (used.length) {
    throw new APIError(`This file is still used on: ${used.slice(0, 6).join(', ')}${used.length > 6 ? ` and ${used.length - 6} more` : ''}. Replace it there first.`, 409, undefined, true)
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image or file', plural: 'Media library' },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['filename', 'label', 'alt', 'folder', 'updatedAt'],
    listSearchableFields: ['label', 'alt', 'filename', 'folder'],
    group: 'Website',
    description: 'Photos and documents used on the website. Upload once, reuse anywhere.',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isAdmin,
  },
  hooks: {
    beforeDelete: [refuseIfUsed],
  },
  upload: {
    // Ignored when S3-compatible storage is configured (see payload.config.ts)
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: ACCEPTED_MIME_TYPES,
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: false,
    imageSizes: [
      { name: 'thumbnail', width: 400, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'card', width: 900, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'hero', width: 1920, formatOptions: { format: 'webp', options: { quality: 80 } } },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Description (for screen readers)',
      maxLength: 300,
      admin: { description: 'Describe what the picture shows, for example "Students at the annual sports day". Required for images.' },
      validate: (value: unknown, { siblingData }: { siblingData: Partial<{ mimeType: string }> }) => {
        const isImage = typeof siblingData?.mimeType === 'string' ? siblingData.mimeType.startsWith('image/') : true
        if (isImage && (typeof value !== 'string' || !value.trim())) return 'Please describe the image'
        return true
      },
    },
    { name: 'label', type: 'text', label: 'Name in the library', maxLength: 120, admin: { description: 'Optional. Helps you find the file later.' } },
    { name: 'folder', type: 'text', label: 'Folder', maxLength: 60, index: true, admin: { description: 'Optional, for example "Gallery 2026" or "Home page".' } },
  ],
}
