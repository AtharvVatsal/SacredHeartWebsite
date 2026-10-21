// Creates the administrator and editor accounts used by the end-to-end tests (test database only)
import config from '@payload-config'
import { getPayload } from 'payload'

const creds = JSON.parse(process.env.E2E_CREDS || '{}') as Record<'admin' | 'editor', { email: string; password: string; name: string }>
if (!process.env.DATABASE_URL?.includes('_test')) throw new Error('users.ts only runs against a _test database')

const payload = await getPayload({ config })
for (const role of ['admin', 'editor'] as const) {
  const c = creds[role]
  await payload.create({ collection: 'users', data: { ...c, role }, overrideAccess: true, context: { bootstrapAdmin: true } })
  console.log(`created ${role} ${c.email}`)
}
process.exit(0)
