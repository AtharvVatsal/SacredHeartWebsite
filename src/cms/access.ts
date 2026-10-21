// Role checks shared by every collection. These run on the server for every REST, admin and Local API
// request (Local API calls must pass `overrideAccess: false` and the user for them to apply).
import type { Access, FieldAccess, PayloadRequest } from 'payload'

export type Role = 'admin' | 'editor'

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  editor: 'Editor',
}

type MaybeUser = { id?: number | string; role?: Role | null } | null | undefined

export const roleOf = (user: MaybeUser): Role | null => (user?.role === 'admin' || user?.role === 'editor' ? user.role : null)
export const isAdminUser = (user: MaybeUser) => roleOf(user) === 'admin'
export const isStaffUser = (user: MaybeUser) => roleOf(user) !== null

export const isAdmin: Access = ({ req }) => isAdminUser(req.user)
export const isStaff: Access = ({ req }) => isStaffUser(req.user)
export const anyone: Access = () => true

export const isAdminField: FieldAccess = ({ req }) => isAdminUser(req.user)

/** Administrators see every user; everyone else only themselves */
export const adminOrSelf: Access = ({ req }) => {
  if (isAdminUser(req.user)) return true
  if (req.user) return { id: { equals: req.user.id } }
  return false
}

/** Signed-in staff see drafts too; the public only ever gets published documents */
export const publishedOrStaff: Access = ({ req }) => {
  if (isStaffUser(req.user)) return true
  return { _status: { equals: 'published' } }
}

export const userFromReq = (req: PayloadRequest) => req.user as MaybeUser
