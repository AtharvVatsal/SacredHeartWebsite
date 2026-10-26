# Deploying the website with the CMS

This guide is for whoever hosts the site. The editing guide for school staff is `cms-admin-guide.md`; the design of the system is in `cms-architecture.md`.

> Nothing in this repository deploys automatically. Every step below is run by a person, and production data changes (migrations, seeding) are run only after a backup.

## 1. What the site needs

| Part | What | Notes |
|---|---|---|
| App server | Node.js **20.9 or newer** (developed on 24), running `next start` | One long-running Node process. Payload runs inside the same Next.js app. |
| Database | **PostgreSQL 14+** | Holds pages, versions, users, settings and media records. |
| File storage for uploads | **S3-compatible bucket** *or* a persistent, backed-up disk | The app refuses to start in production without one of the two (see §3). |
| Email | none | No email is sent: form messages are prepared in the visitor's email app unless a form endpoint is configured. |

All software used is free and open source: Next.js, React, Payload CMS, Puck, PostgreSQL drivers and zod (MIT), PostgreSQL itself (PostgreSQL licence). There are no paid plugins, keys or subscriptions in the code.

### Free and low-cost hosting options

These are options, not recommendations tied to any account. Free tiers and their limits change, so check each provider's current terms (including any rules on non-commercial use) before choosing one.

| Need | Examples with a free tier |
|---|---|
| PostgreSQL | Neon, Supabase, Aiven, or PostgreSQL on your own VPS |
| Object storage | Cloudflare R2, Backblaze B2, or MinIO on your own server |
| Node hosting | a small VPS (Docker or plain Node), Render, Railway, Fly.io. Serverless hosts also work, but then uploads **must** go to object storage. |

A single small VPS running Node and PostgreSQL, with media on its disk (`CMS_MEDIA_PERSISTENT_DISK=true`) and a nightly backup, is the simplest setup.

## 2. Environment variables

Copy `.env.example` to `.env` (locally), or set the same names in the host's secret settings (production). Never commit real values. All of them are read on the server only.

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | `postgres://user:password@host:5432/database`. Use SSL parameters if your provider requires them. |
| `PAYLOAD_SECRET` | yes | At least 32 random characters. It signs sessions; changing it signs everybody out. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `CMS_SERVER_URL` | yes | The public address, for example `https://www.example-school.in` (no trailing slash). Used for CSRF/CORS checks and to keep media addresses relative. |
| `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_FORCE_PATH_STYLE`, `S3_PUBLIC_HOST` | one storage option | Object storage for uploads. `S3_PUBLIC_HOST` is the host files are served from, so `next/image` may optimise them. |
| `CMS_MEDIA_PERSISTENT_DISK=true` | one storage option | Keep uploads in `./media` (or `CMS_MEDIA_DIR`). Only on a disk that survives restarts and redeploys, and is backed up. |
| `CMS_MEDIA_DIR` | no | Folder for uploads when using the disk option (default `./media`). |
| `CMS_MAX_UPLOAD_MB` | no | Largest upload, in MB (default 10). |
| `CMS_PAGES_ENABLED=false` | no | Rollback switch: ignore CMS page content and serve the original built-in pages. |
| `CMS_ALLOW_FIRST_USER=true` | no | Lets the very first administrator be created from the admin screen. Prefer `npm run cms:create-admin`. Never leave it on. |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, `NEXT_PUBLIC_ADMISSION_FORM_ENDPOINT` | no | A service that accepts a JSON POST for the contact and enquiry forms. Without them, the forms prepare an email in the visitor's email app (nothing is sent by the site). These two are public by design. |

## 3. First deployment

Run these from a machine that can reach the production database, with the production environment variables set.

```bash
npm ci                                   # exact versions from package-lock.json
npm run cms:migrate:status               # shows which migrations are pending
npm run cms:migrate                      # creates the tables (first time) or applies new migrations
npm run cms:create-admin -- admin@example-school.in "Office Admin"   # prompts for a password (hidden)
npm run cms:seed                         # copies the 30 original pages into the CMS as DRAFTS and imports their images
npm run build
npm start                                # or your host's start command; serves on port 3000 by default
```

Notes:

- **The seed never publishes.** Visitors keep seeing the original pages until an administrator reviews each draft and publishes it in the editor. Running the seed again skips pages that already exist; `npm run cms:seed -- force` replaces drafts (it is meant for empty or test databases).
- The seed imports about 400 images from `/public` into the media library, one at a time. Expect it to take several minutes.
- The schema is **never** changed automatically (`push` is off). Only `cms:migrate` changes the database.
- `cms:create-admin` reads `CMS_ADMIN_EMAIL`, `CMS_ADMIN_NAME` and `CMS_ADMIN_PASSWORD` instead of prompting, if they are set (useful in CI; do not leave them set).
- The build reads published pages from the database. If the database cannot be reached during the build, pages are built from the original implementation and pick up CMS content when they are next revalidated.

## 4. Updating the site later

```bash
# 1. back up the database (and the media folder, if on disk)
# 2. then:
npm ci
npm run cms:migrate:status
npm run cms:migrate          # only if the status shows pending migrations
npm run build
# restart the Node process
```

When a developer changes a collection, global or field, they create a migration with `npm run cms:migrate:create -- <name>`, review the generated SQL, and commit it. Page **content** is versioned separately: each saved page records a `schemaVersion`, and `src/cms/document/migrations.ts` upgrades older page documents when they are read, so no database migration is needed for section changes.

## 5. Backups and recovery

- **Database:** a nightly `pg_dump --format=custom` kept for at least 14 days, plus one before every update. Restore with `pg_restore --clean --if-exists -d <database> <file>`. Most managed PostgreSQL providers also offer automatic backups.
- **Uploads:** with object storage, turn on bucket versioning or a lifecycle copy. With the disk option, back up the media folder together with the database dump (the database records point at the files).
- **Restoring a single page:** no backup needed. Use the page's **History** in the editor.
- Test a restore once on a spare database, so the procedure is known before it is needed.

## 6. Rollback

| Situation | What to do |
|---|---|
| One published page is wrong | Restore an earlier version from **History**, or **unpublish** it (original pages then show their built-in version). |
| CMS content is broken site-wide | Set `CMS_PAGES_ENABLED=false` and restart: every original route serves its built-in implementation. Pages created in the CMS are not shown while this is off. |
| A settings change is wrong | Restore the previous version of **Site settings**. |
| An update or migration failed | Restore the pre-update database backup and redeploy the previous build. |
| Remove the CMS entirely | Deploy the last commit before the CMS branch was merged. The database can stay; the old build ignores it. |

The original page implementations (`legacy-page.tsx` next to each route) are kept, so every rollback above returns the site to its exact previous design.

## 7. Security checklist

- [ ] `PAYLOAD_SECRET` is long, random and only in the host's secret store.
- [ ] `CMS_SERVER_URL` is the real `https://` address (CSRF and CORS checks depend on it).
- [ ] HTTPS everywhere (the host or a reverse proxy terminates TLS). Session cookies are `Secure` in production.
- [ ] `CMS_ALLOW_FIRST_USER` is unset.
- [ ] Database user has rights to this database only; network access to PostgreSQL is restricted.
- [ ] Object storage keys are limited to the one bucket.
- [ ] `/admin` and `/cms` are served with `X-Robots-Tag: noindex` and `no-store` (already configured in `next.config.mjs`); `/api/` is disallowed in `robots.txt`.
- [ ] Backups run and a restore has been tested.
- [ ] `npm audit --omit=dev` reviewed after each update (see §8).

Accounts: there is no public sign-up. Only administrators (or the `cms:create-admin` script) create accounts; after 5 wrong passwords an account is locked for 10 minutes.

## 8. Known dependency advisories

Status on 26 October 2026, from `npm audit --omit=dev`:

| Package | Severity | How it is handled |
|---|---|---|
| `dompurify` (via Payload's admin code editor) | critical / high | Pinned to the fixed 3.4.17 with `overrides` in `package.json`. |
| `undici` (Payload's HTTP client) | high / moderate | Pinned to the fixed 7.30.1 with `overrides`. |
| `esbuild` (via `drizzle-kit`, the migration tool) | moderate | The advisory concerns esbuild's own development server (`esbuild serve`), which this site never runs. No fixed release for this dependency chain yet. |
| `happy-dom` (via Puck's rich-text field, `@tiptap/html`) | high | No compatible fix (Puck 0.23 requires happy-dom 20). The site does not use rich-text fields, so this code path is not reached. Re-check when Puck updates. |

Payload 3.92.0 was released on 25 October 2026 and updates some of these dependencies. Upgrade `payload` and all `@payloadcms/*` packages together, to the same version, once a release has been out long enough to trust; then remove the overrides that are no longer needed and run every check in §9. Re-run `npm audit --omit=dev` after every `npm ci`.

## 9. Checks before going live

```bash
npx tsc --noEmit        # types
npm run lint            # ESLint
npm test                # unit tests
npm run test:e2e        # end-to-end tests: builds the site against a throwaway database (needs a local PostgreSQL)
npm run build
```

The end-to-end setup (`tests/e2e/setup/prepare.mjs`) only ever resets a database whose name ends in `_test`; it refuses anything else.
