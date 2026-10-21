import { APIError, Forbidden, type CollectionAfterChangeHook, type CollectionBeforeChangeHook, type CollectionConfig, type PayloadRequest } from 'payload'
import { isAdmin, isAdminField, isAdminUser, isStaff, publishedOrStaff } from '../access'
import { blockRegistry } from '../blocks/definitions'
import { CURRENT_SCHEMA_VERSION } from '../document/migrations'
import { isRecord } from '../document/types'
import { MAX_DOCUMENT_BYTES, validateDocument } from '../document/validate'
import { checkPath, normalizePath } from '../paths'
import { revalidatePaths } from '../revalidate'

export const describeIssues = (issues: { label: string; message: string }[]) =>
  issues
    .slice(0, 8)
    .map((i) => `${i.label}: ${i.message}`)
    .join('\n') + (issues.length > 8 ? `\n…and ${issues.length - 8} more` : '')

/** Structure check on every save (drafts included): the content must be a page document of sane size */
function assertDocumentShape(content: unknown) {
  if (content === undefined || content === null) return
  if (!isRecord(content) || !Array.isArray(content.content)) throw new APIError('The page content is damaged and was not saved.', 400, undefined, true)
  if (JSON.stringify(content).length > MAX_DOCUMENT_BYTES) throw new APIError('The page is too large to save. Split it into smaller pages.', 413, undefined, true)
}

const beforeChange: CollectionBeforeChangeHook = async ({ data, originalDoc, req, operation }) => {
  const publishing = data._status === 'published'

  // Only administrators publish. Editors save drafts for an administrator to review.
  if (publishing && !isAdminUser(req.user) && !req.context?.trustedSeed) throw new Forbidden(req.t)

  // Built-in pages keep the address of the route they replace
  if (operation === 'update' && originalDoc?.kind === 'builtIn' && data.path && data.path !== originalDoc.path) {
    throw new APIError('This is a built-in page, so its address cannot change.', 400, undefined, true)
  }

  assertDocumentShape(data.content)

  if (publishing) {
    const content = data.content ?? originalDoc?.content
    const result = validateDocument(content, blockRegistry, 'strict')
    if (!result.ok) {
      throw new APIError(`The page was not published because some sections need attention:\n${describeIssues(result.issues)}`, 400, { issues: result.issues }, true)
    }
    data.content = result.document
    data.schemaVersion = CURRENT_SCHEMA_VERSION
    data.publishedAt = new Date().toISOString()
  } else if (data.content) {
    data.schemaVersion = CURRENT_SCHEMA_VERSION
  }
  if (req.user) data.updatedBy = req.user.id
  return data
}

/** When a published custom page moves, keep the old address working */
async function redirectOldPath(req: PayloadRequest, from: string, to: string) {
  const existing = await req.payload.find({ collection: 'redirects', where: { from: { equals: from } }, limit: 1, req, overrideAccess: true })
  if (existing.docs[0]) await req.payload.update({ collection: 'redirects', id: existing.docs[0].id, data: { to, permanent: true }, req, overrideAccess: true })
  else await req.payload.create({ collection: 'redirects', data: { from, to, permanent: true }, req, overrideAccess: true })
  // The new address must not itself redirect somewhere else
  await req.payload.delete({ collection: 'redirects', where: { from: { equals: to } }, req, overrideAccess: true })
}

const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const wasPublished = previousDoc?._status === 'published'
  const isPublished = doc._status === 'published'
  if (isPublished && wasPublished && previousDoc.path && previousDoc.path !== doc.path && doc.kind === 'custom') {
    await redirectOldPath(req, previousDoc.path, doc.path)
  }
  if (isPublished || wasPublished) revalidatePaths(req.payload, [doc.path, previousDoc?.path])
  return doc
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'path'],
    group: 'Website',
    description: 'Every page of the website. Open a page and choose "Edit visually" to change its sections.',
    components: {
      edit: { beforeDocumentControls: ['/cms/admin/OpenEditorButton#OpenEditorButton'] },
    },
    preview: (doc) => (typeof doc?.path === 'string' ? `/cms/preview?path=${encodeURIComponent(doc.path)}` : null),
  },
  versions: {
    drafts: { validate: false },
    maxPerDoc: 50,
  },
  access: {
    read: publishedOrStaff,
    readVersions: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && typeof data.path === 'string') data.path = normalizePath(data.path)
        return data
      },
    ],
    beforeChange: [beforeChange],
    afterChange: [afterChange],
    afterDelete: [({ doc, req }) => revalidatePaths(req.payload, [doc.path])],
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120, label: 'Page name', admin: { description: 'Shown in the page list and used as the browser tab title unless an SEO title is set.' } },
    {
      name: 'path',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Address',
      admin: { description: 'The part after the domain, for example /events/sports-day. Built-in pages keep their address.' },
      validate: (value: unknown, { siblingData }: { siblingData: { kind?: 'builtIn' | 'custom' } }) => {
        if (typeof value !== 'string' || !value) return 'Required'
        return checkPath(normalizePath(value), siblingData?.kind === 'builtIn' ? 'builtIn' : 'custom') ?? true
      },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'custom',
      options: [
        { label: 'Built-in page (address fixed)', value: 'builtIn' },
        { label: 'New page', value: 'custom' },
      ],
      access: { create: isAdminField, update: () => false },
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'editorLink', type: 'ui', admin: { components: { Field: '/cms/admin/PageContentSummary#PageContentSummary' } } },
    { name: 'content', type: 'json', admin: { hidden: true } },
    { name: 'schemaVersion', type: 'number', defaultValue: CURRENT_SCHEMA_VERSION, admin: { hidden: true } },
    {
      name: 'seo',
      type: 'group',
      label: 'Search engines and sharing',
      fields: [
        { name: 'title', type: 'text', maxLength: 70, label: 'Title in search results', admin: { description: 'About 50–60 characters. Leave empty to use the page name.' } },
        { name: 'description', type: 'textarea', maxLength: 200, label: 'Description in search results', admin: { description: 'One or two sentences, about 110–160 characters.' } },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Image when shared (WhatsApp, Facebook)', admin: { description: 'Best at 1200 × 630 pixels. Leave empty to use the school photo.' } },
        { name: 'noIndex', type: 'checkbox', label: 'Hide this page from search engines' },
        {
          name: 'canonical',
          type: 'text',
          label: 'Canonical address (advanced)',
          access: { create: isAdminField, update: isAdminField },
          admin: { description: 'Only if this page duplicates another one. Full https:// address.' },
          validate: (value: unknown) => (!value || (typeof value === 'string' && /^https:\/\/[^\s]+$/.test(value)) ? true : 'Use a full https:// address'),
        },
      ],
    },
    { name: 'publishedAt', type: 'date', label: 'Last published', admin: { position: 'sidebar', readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'updatedBy', type: 'relationship', relationTo: 'users', label: 'Last edited by', admin: { position: 'sidebar', readOnly: true } },
  ],
}
