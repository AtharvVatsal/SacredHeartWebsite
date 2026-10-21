import type { CollectionConfig } from 'payload'
import { anyone, isAdmin } from '../access'
import { checkPath, normalizePath } from '../paths'
import { isSafeHref } from '../document/fields'
import { revalidatePaths } from '../revalidate'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Redirect', plural: 'Redirects' },
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'permanent', 'updatedAt'],
    group: 'Settings',
    description: 'Send visitors from an old address to a new one. Created automatically when a published page moves.',
  },
  access: { read: anyone, create: isAdmin, update: isAdmin, delete: isAdmin },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.from && typeof data.from === 'string') data.from = normalizePath(data.from)
        return data
      },
    ],
    afterChange: [({ doc, previousDoc, req }) => revalidatePaths(req.payload, [doc.from, previousDoc?.from])],
    afterDelete: [({ doc, req }) => revalidatePaths(req.payload, [doc.from])],
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Old address',
      admin: { description: 'For example /events/old-name' },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !value) return 'Required'
        // A redirect can only take over an address that no page uses
        return checkPath(value, 'custom') ?? true
      },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      label: 'New address',
      admin: { description: 'A page address such as /events/new-name, or a full https:// link' },
      validate: (value: unknown) => (typeof value === 'string' && value && (value.startsWith('/') || value.startsWith('https://')) && isSafeHref(value) ? true : 'Use a page address starting with / or a full https:// link'),
    },
    { name: 'permanent', type: 'checkbox', defaultValue: true, label: 'Permanent (tells search engines the page has moved for good)' },
  ],
}
