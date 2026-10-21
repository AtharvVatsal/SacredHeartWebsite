# CMS architecture

Status: **adopted**, 21 October 2026. The facts this rests on are in `cms-audit.md`.

## 1. Decision summary

| Concern | Choice | Version | Licence | Cost |
|---|---|---|---|---|
| Framework | Next.js, upgraded from 14.2.35 | 16.4.x (pinned) | MIT | free |
| UI runtime | React | 19.2.x | MIT | free |
| CMS, auth, media, versions, APIs | Payload CMS, embedded in the same Next app | 3.91.0 (pinned) | MIT | free, self-hosted |
| Visual page builder | Puck (`@puckeditor/core`) | 0.23.0 (pinned) | MIT | free, runs in our own app |
| Database | PostgreSQL via `@payloadcms/db-postgres` | adapter 3.91.0 | MIT (PostgreSQL licence for the server) | free locally. A host is needed in production. |
| Media storage | Local disk in development. In production, S3-compatible object storage via `@payloadcms/storage-s3`, or local disk only on a host with a persistent volume. | 3.91.0 | MIT | free tiers exist; see `cms-deployment.md` |
| Validation | `zod` | 3.x (pinned) | MIT | free |
| Tests | Vitest (unit) and Playwright (end-to-end, using the installed Chrome) | pinned | MIT / Apache-2.0 | free |

No paid service, account or proprietary page-builder is required to develop or run the CMS.

## 2. Why the framework must be upgraded, and why to 16

**The CMS cannot run on Next 14.** `@payloadcms/next@3.91.0` declares the peer range `next >=15.2.9 <15.3 || >=15.3.9 <15.4 || >=15.4.11 <15.5 || >=16.3.3 <17`, and Payload's installation guide repeats it. The alternatives were considered and rejected:

| Option | Why rejected |
|---|---|
| Payload 2.x (Express, separate server) | Legacy major version, superseded by 3.x. It would add a second server process and a second admin stack to maintain. |
| Payload 3 as a separate Next 16 app, with the site staying on Next 14 | The page editor must render the site's *real* components, which live in the Next 14 app. This option needs two deployments, cross-origin cookie authentication, and two copies of every block. It also leaves the public site on an end-of-life framework. |
| Another CMS (Strapi, Directus, Sanity, Keystone) | Each is either a separate server and admin to host, or a hosted service. None gives Puck a same-process, typed backend. Sanity's hosted dataset is a third-party service, which the brief rules out. |
| Next 15.4.11 | Allowed by Payload, but the 15.4 line no longer receives releases: security backports now go to 15.5.x, which Payload excludes. Choosing it would pin the site to an unpatched line. |
| **Next 16.4.x** | **Chosen.** It is the actively maintained release line, explicitly supported by Payload (≥ 16.3.3), and the Next 14 line is end-of-life anyway (last release 14.2.35). |

**How the upgrade is made safe:**
- It is done in its own commit, before any CMS code.
- Every changed behaviour from the official upgrade guide is handled explicitly:
  - `middleware.ts` → `proxy.ts`;
  - `next lint` → the ESLint 9 CLI with a flat config;
  - `data-scroll-behavior="smooth"` on `<html>` to keep the old instant scroll-to-top on navigation;
  - `images.qualities` is not needed, because no `quality` props are used;
  - `imageSizes` was already set explicitly;
  - there are no dynamic request APIs to migrate.
- `lucide-react` is updated, because its peer range stops at React 18.
- The commit is verified with type-check, lint, build and screenshots of all 30 routes, compared pixel by pixel against the Next 14 baseline.

## 3. System layers

```
┌───────────────────────────────── one Next.js 16 application ─────────────────────────────────┐
│ A. Public site            app/(site)/…      existing pages + CMS renderer, statically built    │
│ B. CMS administration     app/(payload)/admin  Payload admin: pages list, media, users, settings│
│ C. Visual editor          app/(editor)/cms/editor/[id]  Puck canvas using the site's own blocks │
│ D. Persistence/services   Payload Local API, REST at /api/*, PostgreSQL, media storage          │
│ E. Future business layer  src/server/* + Payload collections/endpoints/jobs (extension points)  │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Each layer has its own root layout through route groups. The public site's root layout (header, footer, fonts) moves unchanged from `app/layout.tsx` to `app/(site)/layout.tsx`. Route groups do not change URLs.

**Source layout for the CMS:**

```
src/payload.config.ts          Payload config (collections, globals, db, storage, auth, csrf)
src/cms/collections/*          Users, Media, Pages, Redirects (+ structured content collections)
src/cms/globals/*              SiteSettings
src/cms/access.ts              role checks used by every collection (server-side)
src/cms/hooks/*                publish metadata, revalidation, redirects on path change, media reference check
src/cms/blocks/<Name>/         one folder per block: schema.ts (zod + defaults), Component.tsx (render), fields.ts (editor fields)
src/cms/blocks/registry.ts     render-only map type → { schema, Component } (no editor code)
src/cms/editor/*               Puck config, custom fields (image picker, link, colour), editor shell (client only)
src/cms/document/*             page-document types, validation, version migrations
src/cms/render/*               server-side page loading, media resolution, PageRenderer
src/cms/seed/*                 repeatable migration scripts from the existing data files and pages
```

## 4. Data model

### `users` (Payload auth collection)

| Field | Notes |
|---|---|
| `email`, `password` | Payload auth: hashed, salted (PBKDF2); login lockout after 5 failed attempts for 10 minutes |
| `name` | Shown in the version history |
| `role` | `admin` (Administrator) or `editor` (Editor). **Only administrators can set roles.** |

- Public registration is disabled: `create` is allowed for administrators only.
- The "create first user" screen and endpoint are **blocked unless `CMS_ALLOW_FIRST_USER=true`**. The first administrator is created with a CLI script (`npm run cms:create-admin`) that prompts for the password, so no credential is ever committed.
- The last remaining administrator cannot be demoted or deleted.

### `media` (Payload upload collection)

| Field | Notes |
|---|---|
| file | Accepted types: JPEG, PNG, WebP, AVIF, GIF, PDF. **SVG is excluded** because it can carry script. The size limit is set by `CMS_MAX_UPLOAD_MB`, 10 MB by default. |
| `alt` | Required for images, for screen readers |
| `label` | Human-readable name in the library |
| `folder` | Optional text tag for organising |
| sizes | Generated by sharp (thumbnail, card, hero) |

Deletion is refused while a page, a draft or the site settings still reference the file. The error lists where it is used.

### `pages`

| Field | Notes |
|---|---|
| `id` | Payload ID (serial) |
| `title` | Required; shown in the page list and the editor |
| `path` | Unique and indexed. `/` or `/segment/segment`, lowercase `a–z 0–9 -`. Reserved prefixes (`/admin`, `/api`, `/cms`, `/_next`, …) are rejected. Paths that belong to built-in routes are rejected for custom pages. |
| `kind` | `builtIn` (one of the 30 existing routes; its path is locked) or `custom` (a new page served by the catch-all route) |
| `content` | JSON: the Puck document (`{ root, content, zones? }`) |
| `schemaVersion` | Integer. The block-schema version the document was saved with (see §6). |
| `seo` | Group: `title`, `description`, `image` (media), `noIndex`, `canonical` (administrators only, absolute URL) |
| `publishedAt` | Set by a hook when the page is published |
| `updatedBy` | Relationship to `users`, set by a hook |
| `createdAt`, `updatedAt` | Automatic |
| `_status` | `draft` or `published` (Payload drafts) |

- `versions: { drafts: true, maxPerDoc: 50 }` keeps a revision history with restore in the admin.
- Drafts are stored in a separate versions table. The main row only ever holds the last **published** state, so the public site cannot read draft content by accident.

### `redirects`

| Field | Notes |
|---|---|
| `from` | Unique path |
| `to` | Path or absolute URL |
| `permanent` | Boolean |

Created automatically when a published custom page's path changes. Administrators can also edit them by hand.

### Global `site-settings`

Everything the header, footer and structured data read today from `data/school.ts`:
- school names, tagline, affiliation, year established, management, principal;
- logo;
- address, phones, emails, map code;
- online-service links (fee portal, registration, apps, alumni);
- social links;
- the navigation tree (top items with children, external flag);
- the header call to action;
- the footer description;
- an optional announcement banner (on/off, text, link, tone).

Versions and drafts are enabled. Only administrators can change it.

`data/school.ts` stays as the **typed default**. If the database is unreachable, or the global was never saved, the site renders exactly as it does today.

### Structured content collections

These hold data the existing widgets display: notices, staff, toppers, fees, gallery albums, pass-out batches, office-bearer sessions and calendar entries. They are introduced as each widget is migrated (see `cms-migration-plan.md`). Each is seeded from its data file and falls back to that file in the same way.

## 5. Access control (server-side)

Every rule is a Payload access function or hook. Payload enforces these for the REST API, the admin and the Local API whenever `overrideAccess: false`. **The editor's server actions always pass the signed-in user with `overrideAccess: false`.**

| Collection | read | create | update | delete |
|---|---|---|---|---|
| pages | public: published only (`_status = published`). Signed-in users: all. | admin, editor | admin, editor. **Editors cannot set `_status: published`**: a hook rejects the change with 403. | admin |
| media | public | admin, editor | admin, editor | admin (and only when unreferenced) |
| redirects | public | admin | admin | admin |
| users | self, or admin | admin | self (except role), or admin | admin (never the last admin) |
| site-settings | public | — | admin | — |

- **CSRF:** Payload's `csrf` allow-list is set to the site's origins. Next server actions have their own origin check.
- **Cookies:** `HttpOnly`, `SameSite=Lax`, and `Secure` in production. Sessions expire after 2 hours.
- **Rate limiting:** Payload 3 has no built-in request rate limiter, so login lockout covers brute force. A reverse proxy or the host's firewall should add general rate limits (`cms-deployment.md`).
- **Secrets** (`PAYLOAD_SECRET`, `DATABASE_URL`, storage keys) are server-only environment variables. None has a `NEXT_PUBLIC_` prefix, and none is read in client modules.

## 6. The page document: validation, rendering and versioning

- **Shape:** `{ root: { props: {...} }, content: Block[] }`, where `Block = { type, props: { id, ... } }`. Nested children live in slot props, which are also `Block[]`.
- **Block registry:** each block has a zod schema with defaults. Unknown props are stripped; strings are length-bounded; links are restricted to `/…`, `#…`, `http(s)://`, `mailto:` and `tel:` (so `javascript:` is rejected); colours and spacing are chosen from fixed lists.
- **Rich text:** there is no raw HTML anywhere. Text fields support a tiny inline syntax (`**bold**`, `*italic*`, `[text](/link)`) that is parsed into React elements. Nothing is rendered with `dangerouslySetInnerHTML`.
- **When documents are checked:**
  - On every write, a hook normalises the document and rejects unknown block types and oversized documents.
  - On **publish**, full validation must pass. Errors are returned per block ("Hero section: Button link must start with /, https://, mailto: or tel:").
- **Rendering:** `PageRenderer` is a server component. It runs the version migration, then validates each block. An unknown or invalid block is **skipped**, not crashed on. The public site shows nothing for it; preview and the editor show a visible warning box. A broken block therefore can never take a page down.
- **Versioning:** `schemaVersion` on the page, plus `src/cms/document/migrations.ts`, an ordered list of `(data) => data` functions. Documents are migrated on read and re-saved at the current version on the next save. A schema-breaking block change must add a migration; a unit test enforces that the migration list matches `CURRENT_SCHEMA_VERSION`.

## 7. Publishing, preview and caching

1. The editor saves drafts through a server action, `payload.update({ draft: true, user, overrideAccess: false })`.
2. **Preview:** `/cms/preview?path=…` checks the Payload session on the server, enables Next `draftMode`, and redirects to the page. In draft mode the page loads the latest draft version for the signed-in user. Without a session the route returns 401, so a public visitor can never enable draft mode. `/cms/exit-preview` turns it off.
3. **Publish:** a server action validates the document, then calls `payload.update({ _status: 'published' })`. The UI reports success only after the update has resolved and the returned document has `_status === 'published'`.
4. **Revalidation:** the `afterChange` hooks on `pages` call `revalidatePath(path)`. On `site-settings` they call `revalidatePath('/', 'layout')`. On `redirects` they revalidate the affected path. Pages stay statically generated. The database is read at build time and when a path is revalidated, **not on every visit**.
5. **Fallback:**
   - The 30 existing routes render the published CMS page when one exists and passes validation.
   - Otherwise they render the existing implementation, which is kept unchanged as `legacy-page.tsx` beside each route.
   - If the database is unreachable at build or revalidation time, they render the existing implementation.
   - **Unpublishing a CMS page therefore restores the original page immediately.** This is the rollback path.
6. **Restore:** Payload's version history (admin → page → Versions → Restore) restores any of the last 50 versions as a draft or a published page.
7. **Paths and redirects:**
   - Built-in pages have locked paths.
   - Custom pages are served by `app/(site)/[...path]/page.tsx`. Static routes always win over this catch-all, so it cannot shadow an existing page.
   - When a published custom page's path changes, a permanent redirect from the old path is created. The catch-all checks redirects before returning 404.

## 8. Media storage

| Environment | Storage |
|---|---|
| Development | `./media` (gitignored), served by Payload at `/api/media/file/…` |
| Production, serverless (ephemeral disk) | `@payloadcms/storage-s3`, enabled when `S3_BUCKET` is set. Works with AWS S3, Cloudflare R2, Backblaze B2 and MinIO. |
| Production, VPS with a persistent volume | Local disk, but only when `CMS_MEDIA_PERSISTENT_DISK=true` is set to confirm the volume is persistent |

**In production, if neither S3 nor `CMS_MEDIA_PERSISTENT_DISK=true` is configured, the server refuses to start.** This prevents silent loss of uploads.

The site's existing 1,170 images stay in `public/images`. Blocks can use them, and the migration scripts copy the images that migrated blocks use into the media library.

## 9. Performance boundaries

- Puck, the editor fields and their CSS are imported only under `app/(editor)`. Public pages import `src/cms/render/*` and the block components only.
- Public pages remain static: there are no client-side calls to the CMS and no database access per visit.
- Media lookups for a page are batched into one query at render time.
- Indexes are on `pages.path` (unique), `redirects.from` (unique) and Payload's default version indexes.

## 10. Extension points for future business features

- New data and workflows go in new Payload collections (for example, admission enquiries) with their own access rules. They get admin screens, REST and Local API automatically.
- Server-side logic goes in `src/server/*` services called from route handlers or server actions. Payload `endpoints` and the jobs queue are available for background work.
- The forms can later post to a `submissions` collection instead of `mailto:`. The visual editor is unaffected: forms are blocks, and their delivery target is a block setting.

## 11. Deployment assumptions

- A Node.js 20.9+ runtime that can run `next start`. Fully static export is not possible once the CMS is present.
- A PostgreSQL 14+ database, with migrations run via `npm run cms:migrate` before `next build`.
- Persistent media storage (see §8).
- Environment variables are documented in `.env.example`.
- Nothing is deployed automatically. See `cms-deployment.md`.

## 12. Known trade-offs

- **Global brand colours and fonts are not editable from the CMS.** Blocks offer approved palette choices instead. Changing the Tailwind theme at runtime would need the whole design system moved onto CSS variables and re-verified for contrast, which is out of scope for this phase.
- **Two implementations of each migrated page** (CMS blocks and the legacy fallback) exist until the CMS version has been proven in production. The legacy files are frozen and can be deleted later.
- **Payload's admin user interface is English only and Payload-styled.** The visual editor is custom-branded.
