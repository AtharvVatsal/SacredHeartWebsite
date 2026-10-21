import { APIError, Forbidden, type CollectionBeforeChangeHook, type CollectionBeforeDeleteHook, type CollectionConfig } from 'payload'
import { adminOrSelf, isAdmin, isAdminField, isAdminUser, ROLE_LABELS, type Role } from '../access'

const production = process.env.NODE_ENV === 'production'

const countAdmins = async (req: Parameters<CollectionBeforeChangeHook>[0]['req']) =>
  (await req.payload.count({ collection: 'users', where: { role: { equals: 'admin' } }, req, overrideAccess: true })).totalDocs

/**
 * Nobody may create an account without being signed in as an administrator. Payload's own "create first user"
 * screen bypasses access control, so it is blocked here unless the operator has explicitly opened it with
 * CMS_ALLOW_FIRST_USER=true, or the account is being created by the trusted CLI script (scripts/cms-create-admin).
 */
const guardAccountCreation: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data
  if (isAdminUser(req.user)) return data

  // The CLI script runs with server access, which is already full trust
  if (req.context?.bootstrapAdmin === true) return data

  // The admin screen's "create first user" form only works while explicitly enabled and only on an empty database
  const existing = await req.payload.count({ collection: 'users', req, overrideAccess: true })
  if (process.env.CMS_ALLOW_FIRST_USER !== 'true' || existing.totalDocs > 0) {
    throw new Forbidden(req.t)
  }
  // The very first account always becomes an administrator
  return { ...data, role: 'admin' satisfies Role }
}

/** The site must always keep at least one administrator */
const keepOneAdmin: CollectionBeforeChangeHook = async ({ data, originalDoc, operation, req }) => {
  if (operation === 'update' && originalDoc?.role === 'admin' && data.role && data.role !== 'admin') {
    if ((await countAdmins(req)) <= 1) {
      throw new APIError('This is the only administrator. Make another person an administrator first.', 400, undefined, true)
    }
  }
  return data
}

const keepOneAdminOnDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const user = await req.payload.findByID({ collection: 'users', id, req, overrideAccess: true, depth: 0 })
  if (user?.role === 'admin' && (await countAdmins(req)) <= 1) {
    throw new APIError('This is the only administrator and cannot be removed.', 400, undefined, true)
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Person', plural: 'People with access' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Settings',
    description: 'Who can sign in to the website editor. Only administrators can add people or change roles.',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
    tokenExpiration: 2 * 60 * 60, // 2 hours
    cookies: { secure: production, sameSite: 'Lax' },
  },
  access: {
    // Both roles may open the admin panel; what they can do there is decided per collection
    admin: ({ req }) => Boolean(req.user),
    read: adminOrSelf,
    create: isAdmin,
    update: adminOrSelf,
    delete: isAdmin,
    unlock: isAdmin,
  },
  hooks: {
    beforeChange: [guardAccountCreation, keepOneAdmin],
    beforeDelete: [keepOneAdminOnDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 80, label: 'Full name' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: (Object.keys(ROLE_LABELS) as Role[]).map((value) => ({ value, label: ROLE_LABELS[value] })),
      access: { create: isAdminField, update: isAdminField },
      admin: {
        description: 'Administrators can publish, delete pages, change site settings and manage people. Editors can edit and save drafts, but cannot publish.',
      },
    },
  ],
}
