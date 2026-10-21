import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './cms/collections/Media'
import { Pages } from './cms/collections/Pages'
import { Redirects } from './cms/collections/Redirects'
import { Users } from './cms/collections/Users'
import { SiteSettings } from './cms/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const production = process.env.NODE_ENV === 'production'
const serverURL = (process.env.CMS_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
const maxUploadMB = Number(process.env.CMS_MAX_UPLOAD_MB || 10)

const useS3 = Boolean(process.env.S3_BUCKET)

// Uploads must survive a restart or redeploy. On hosts with a temporary disk (most serverless platforms) that
// means object storage; on a VPS with a persistent volume, local disk is fine but has to be confirmed.
if (production && !useS3 && process.env.CMS_MEDIA_PERSISTENT_DISK !== 'true' && process.env.NEXT_PHASE !== 'phase-production-build') {
  throw new Error(
    'Media storage is not configured. Set S3_BUCKET (and the S3_* variables) for object storage, or set ' +
      'CMS_MEDIA_PERSISTENT_DISK=true if ./media is on a persistent volume. See docs/cms-deployment.md.',
  )
}

const secret = process.env.PAYLOAD_SECRET
if (!secret || secret.length < 32) {
  throw new Error('PAYLOAD_SECRET must be set to a random string of at least 32 characters (see .env.example).')
}

export default buildConfig({
  serverURL,
  secret,
  telemetry: false,
  graphQL: { disable: true },
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Sacred Heart website editor' },
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      beforeDashboard: ['/cms/admin/Dashboard#Dashboard'],
      beforeLogin: ['/cms/admin/LoginNote#LoginNote'],
      graphics: { Logo: '/cms/admin/Brand#Logo', Icon: '/cms/admin/Brand#Icon' },
    },
  },
  collections: [Pages, Media, Users, Redirects],
  globals: [SiteSettings],
  // Only requests from the site's own address may use the sign-in cookie
  csrf: [serverURL],
  cors: [serverURL],
  upload: { limits: { fileSize: maxUploadMB * 1024 * 1024 } },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Schema changes always go through committed migrations (npm run cms:migrate), never automatic pushes
    push: false,
    // Migrations are never run automatically on server start; run them deliberately with npm run cms:migrate
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: useS3
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.S3_BUCKET || '',
          config: {
            region: process.env.S3_REGION || 'auto',
            endpoint: process.env.S3_ENDPOINT || undefined,
            forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
            },
          },
        }),
      ]
    : [],
})
