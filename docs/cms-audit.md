# CMS audit: the website as it stood before the CMS work

Audited on 21 October 2026 on branch `feature/cms`, created from `main` at commit `faedc97` ("Final Frontend for showcase (Before CMS)"). The working tree was clean when the branch was created.

This document records what the code actually does, read from the source. It does not record what earlier documents said it does.

---

## 1. Runtime and tooling

| Item | Found |
|---|---|
| Framework | Next.js **14.2.35**, App Router (`src/app`). No `pages/` directory. |
| React | 18.3.1 |
| Language | TypeScript 5.9.3, `strict: true`, path alias `@/*` → `src/*` |
| Styling | Tailwind CSS 3.4.19, with tokens in `tailwind.config.ts` and global CSS in `src/app/globals.css` (523 lines) |
| Animation | framer-motion 11.18.2, used as `LazyMotion features={domAnimation} strict` + `MotionConfig reducedMotion="user"` (`src/components/layout/SmoothScrollProvider.tsx`). With `strict`, every animated element must use `m.*`, not `motion.*`. |
| Icons | lucide-react **0.358.0**. Its peer dependency is `react ^16.5.1 \|\| ^17 \|\| ^18`, so it **blocks a React 19 upgrade** until it is updated. |
| Fonts | `next/font/google`: Inter (body), Outfit (headings), Plus Jakarta Sans (display), exposed as CSS variables |
| Package manager | npm 11.6.1, with `package-lock.json` (lockfileVersion 3) |
| Node | 24.11.0 locally |
| Lint | `next lint` with `.eslintrc.json` → `next/core-web-vitals` (ESLint 8.57.1, eslint-config-next 14.2.0) |
| Tests | **None.** There is no test runner, no test files and no CI configuration. |
| Declared but not installed | `next-themes@^0.4.6` is in `package.json` but missing from `node_modules`. Its only importer, `src/components/providers/ThemeProvider.tsx`, is not imported anywhere. |
| Unused code | `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/lib/cms.ts` (only reached through `useCMS.ts`), `src/components/animations/ScaleIn.tsx` (exported but not imported directly) |
| Stale documentation | `README.md`, `.env.local.example` and the `.sanity/` folder describe a Sanity CMS that is **not installed or used**. `src/lib/cms.ts` returns local data. |

## 2. Baseline checks (before any CMS change)

Run on the untouched code:

| Check | Result |
|---|---|
| `npx tsc --noEmit` | exit 0, no errors |
| `npm run lint` (`next lint`) | "No ESLint warnings or errors" |
| `npm run build` | exit 0; 35 static outputs (30 pages, `/_not-found`, `/robots.txt`, `/sitemap.xml`), all `○ (Static)`. Shared first-load JS 87.5 kB; home page 158 kB first load. Middleware 26.8 kB. |
| Screenshots | All 30 routes at 390 × 844 and 1440 × 900, full page, reduced motion. These were taken from the baseline production build and kept outside the repository as the reference for visual comparison. |
| Runtime errors (pre-existing) | **Home page only:** React hydration errors #418 and #422 in the browser console, on phone and desktop. The page recovers by re-rendering on the client. This existed before the CMS work and must not be attributed to it. |

## 3. Routing

Every route is a static folder. There are **no dynamic segments, no route groups, no API routes, no server actions and no parallel routes**.

`src/middleware.ts` (matcher `'/'` only) permanently redirects the old WordPress query-string addresses (`/?page_id=N`, 25 mappings) and `/?faculty=` to their new pages. `next.config.js` redirects two old WordPress PDF addresses.

`src/app/layout.tsx` is the single root layout. It contains the fonts, metadata defaults, JSON-LD (`StructuredData`, `BreadcrumbJsonLd`), the skip link, `Header`, `<main id="main-content">`, `Footer` and the page-level `GradualBlur`. `src/app/template.tsx` is a pass-through.

Every page folder has a `layout.tsx` whose only job is `export const metadata = pageMeta('<path>')` (from `src/lib/seo.ts`). The page files themselves are all `'use client'` components, so the layout supplies the metadata.

### Page inventory

These are the pages that need to become editable. The **Sections** column counts top-level `<section>`/`<Section>` blocks in the file. **State** counts `useState` calls, which indicate interactive behaviour.

| Route | Lines | Sections | State | Content source | Interactive behaviour |
|---|---|---|---|---|---|
| `/` | 819 | 11 + quick bar | 1 | `data/school.ts` via `useCMS` hooks, plus inline copy | Hero slideshow, count-up stats, parallax |
| `/about` | 483 | 8 | 0 | `data/school.ts`, `useCMS`, inline | Anthem video |
| `/about/history` | 534 | 7 | 2 | inline | Timeline tabs |
| `/about/aims` | 414 | 5 | 2 | inline | Vision carousel |
| `/about/principal` | 429 | 5 | 0 | `data/school.ts`, inline | — |
| `/about/staff` | 542 | 5 | 3 | `data/school.ts` (95 staff) | Search and department filter |
| `/about/office-bearers` | 469 | 2 | 2 | `data/school.ts` (sessions 2023–26) | Session switcher |
| `/about/office-bearers/messages` | 296 | 2 | 0 | `data/school.ts` | — |
| `/about/pass-out-batches` | 684 | 3 | 8 | `data/school.ts` (`batchPhotos`) | Search, year bar, lightbox, download |
| `/academics` | 464 | 6 | 0 | inline | — |
| `/academics/calendar` | 489 | 2 | 5 | inline | Month and event filters |
| `/academics/leave-absence` | 255 | 4 | 0 | inline | — |
| `/academics/syllabus-homework` | 346 | 7 | 0 | inline | — |
| `/achievements` | 169 | 3 | 0 | `data/school.ts`, `data/toppers.ts` | — |
| `/achievements/other` | 714 | 6 | 3 | `data/school.ts`, inline | Category filter |
| `/achievements/toppers` | 196 | 2 | 0 | `data/toppers.ts` | — |
| `/achievements/toppers/10th`, `/12th` | 14 each | — | — | `components/achievements/ToppersPage.tsx` + `data/toppers.ts` | Session switcher |
| `/admission` | 441 | 7 | 0 | inline | — |
| `/admission/fee-structure` | 253 | 5 | 0 | `components/admission/FeeStructure.tsx` + `data/fees.ts` | Class selector |
| `/admission/online-fee` | 303 | 5 | 0 | `StepGuide`, `data/school.ts` | — |
| `/admission/online-registration` | 289 | 4 | 0 | `StepGuide`, `data/school.ts` | — |
| `/admission/register` | 608 | 4 | 4 | inline | Validated enquiry form → `mailto:` |
| `/admission/rules` | 273 | 2 | 0 | inline | — |
| `/admission/uniform` | 384 | 7 | 0 | inline | — |
| `/contact` | 684 | 5 | 4 | `data/school.ts`, inline | Validated contact form → `mailto:` |
| `/gallery` | 517 | 3 | 9 | `data/gallery.ts` (24 albums, 414 photos) | Filters, lightbox, lazy YouTube |
| `/notifications` | 244 | 3 | 0 | `data/school.ts` via `useCMS` | — |
| `/privacy` | 251 | 5 | 0 | inline | — |
| `/terms` | 262 | 5 | 0 | inline | — |

Total: **30 routes, about 139 hand-built sections, about 13,000 lines of page code.** Most content is inline JSX. The structured data is in four typed files: `data/school.ts` (596 lines), `data/fees.ts` (589), `data/toppers.ts` (270) and `data/gallery.ts` (61).

## 4. Shared components and design system

These should stay reusable. The CMS blocks must use them rather than copy them.

| Component | Role |
|---|---|
| `layout/Header.tsx` (534 lines, client) | Sticky header that tucks away on scroll; desktop mega-dropdowns with section summaries; full-screen phone sheet with quick actions (apply, pay fee, registration, call, email). Reads `navigation`, `schoolInfo` and `onlineServices` straight from `data/school.ts`. |
| `layout/Footer.tsx` (255 lines, client) | School block, navigation columns, contact details, online services, copyright and the developer credit. Reads `schoolInfo`, `navigation`, `quickLinks` and `onlineServices` straight from `data/school.ts`. |
| `layout/HeroDecor.tsx` | Floating icon motifs, orbs and sparkles for the green inner-page heroes |
| `ui/Section.tsx` | `<section className="section-padding …">` wrapper |
| `animations/*` | `FadeIn`, `FadeInItem`, `StaggerContainer`, `ParallaxSection`, `CountUp`, `TextReveal`, `MagneticButton`, `GradualBlur` |
| `home/HeroSlideshow.tsx` | Home hero image carousel |
| `admission/FeeStructure.tsx`, `admission/StepGuide.tsx`, `achievements/ToppersPage.tsx` | Data-driven page widgets |
| `forms/Field.tsx`, `forms/SubmissionNotice.tsx` + `lib/forms.ts` | Accessible form fields, validation and honest "finish in your email app" notices |
| `seo/StructuredData.tsx`, `seo/BreadcrumbJsonLd.tsx` | JSON-LD |
| `lib/useDialog.ts` | Focus trap, Escape to close and scroll lock for dialogs |

**Design tokens** (`tailwind.config.ts`):
- `primary` is green, from `#f0fdf4` to `#052e16`. `secondary` is gold, from `#fefce8` to `#713f12`. There are also `accent`, `club` and `dark` colours.
- Fonts: `heading` (Outfit), `body` (Inter), `display` (Plus Jakarta Sans).
- Custom shadows (`glow`, `card`), animations and keyframes.

**Utility classes in `globals.css`:** `glass`, `glass-dark`, `bg-mesh`, `noise-overlay`, `geometric-bg`, `pattern-grid`, `heading-gradient`, `floating`, `section-padding`, and others.

**Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536). The header switches to the desktop layout at 1280 px (`DESKTOP_QUERY`).

## 5. Rendering, caching and performance

- Every page is a client component pre-rendered to static HTML at build time. There is no ISR, no `revalidate`, no `fetch` caching and no runtime data source.
- `useCMS` hooks start with the local data and re-set it after mount. This is left over from the Sanity plan, and it means the client bundles include the data files.
- Images use `next/image` with AVIF/WebP. The 1,170 files in `public/images` (83 MB in `public/` in total) are already WebP. `remotePatterns` still lists `cdn.sanity.io` and `images.unsplash.com`, neither of which is used.
- There are no external runtime requests except YouTube, which loads only when a video is played.

## 6. SEO

- `src/lib/seo.ts` holds one entry per route (30) with title, description, breadcrumb label and sitemap hints. `pageMeta(path)` builds the title, description, canonical, Open Graph and Twitter metadata.
- `app/sitemap.xml/route.ts` (force-static) lists all routes with image entries. `app/robots.ts` disallows `/api/` and points to the sitemap.
- JSON-LD: School, WebSite and BreadcrumbList.
- Canonical base: `https://shsdharamshala.com`.

## 7. Forms and integrations

- The contact form (`/contact`) and the admission enquiry (`/admission/register`) validate in the browser. On submit they open the visitor's email app with a prepared `mailto:` message, and the page says so honestly ("Finish in your email app"). **Nothing is sent to a server** and nothing is stored.
- Fee payment, online registration, the school app and alumni registration are links to the school's provider (IQdigit). There is no API integration.
- There is no authentication, database, API route or server action anywhere.

## 8. Accessibility practices already present

- A skip link, and `<main id="main-content" tabIndex={-1}>`.
- Visible `:focus-visible` outlines (`globals.css` around lines 196–243).
- `prefers-reduced-motion` CSS, `MotionConfig reducedMotion="user"`, and reduced-motion checks in `HeroDecor`.
- Dialogs with focus trap and Escape (`useDialog`). Decorative layers are `aria-hidden`. Forms have labels, error summaries and `aria-describedby`.
- The previous QA work recorded 0 axe-core violations on all 30 pages. That was not re-run in this audit; re-running it is part of the final verification.

## 9. Security posture

- Four headers on every response (`next.config.js`): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN` and `Permissions-Policy`. There is no Content-Security-Policy.
- There is no server-side attack surface today: no APIs, no auth, no uploads. **The CMS will add all of these**, so it must be designed defensively (see `cms-architecture.md`).
- No secrets are in the repository. `.env*` files are gitignored.

## 10. Hosting and deployment

There is **no deployment configuration in the repository**: no `vercel.json`, Netlify config, Dockerfile, CI workflow or hosting adapter. `README.md` suggests Vercel or Netlify generically. The school's live address, shsdharamshala.com, is served today by a separate WordPress site, so this application's production host has not been chosen.

The CMS therefore cannot assume any host. The architecture must work on:
- a persistent Node host (VPS or container) with PostgreSQL; and
- a serverless host (where the local disk is ephemeral) with managed PostgreSQL and S3-compatible object storage.

**Local database:** PostgreSQL 18.4 is installed and running on this machine (`postgresql-x64-18`), and it needs a password. To avoid needing or guessing credentials, local development can instead run a separate project-local cluster using the same installed binaries (`initdb`/`pg_ctl`, trust auth, port 54329, data under a gitignored folder).

## 11. Compatibility findings for the CMS (verified against the npm registry, 21 Oct 2026)

| Package | Latest stable | Licence | Requirement found |
|---|---|---|---|
| `payload` | 3.91.0 | MIT | peer: `graphql ^16.8.1` |
| `@payloadcms/next` | 3.91.0 | MIT | peer: **`next >=15.2.9 <15.3 \|\| >=15.3.9 <15.4 \|\| >=15.4.11 <15.5 \|\| >=16.3.3 <17`** |
| `@puckeditor/core` (formerly `@measured/puck`, now deprecated) | 0.23.0 | MIT | peer: `react ^18 \|\| ^19` |
| `next` | 16.4.2 latest; the 14.x line ends at 14.2.35 | MIT | The 14 line receives no further releases. Backports go to 15.5.x, which Payload does **not** support. |

**Consequence:** Payload 3 cannot run on the current Next 14. The choice of upgrade target is documented in `cms-architecture.md`.

## 12. Risks identified

1. **Framework upgrade risk.** Moving from Next 14 to 16 brings React 19, Turbopack builds, the `middleware` → `proxy` rename, removal of `next lint`, new image defaults and a change in scroll-behaviour handling. Every page must be re-verified visually.
2. **Visual parity risk.** Pages are hand-built and every section is bespoke. Generic CMS templates would visibly change the site, so sections must be extracted into blocks with the *same markup*.
3. **Volume.** About 139 sections across 30 routes. Migration has to be staged and tracked per page.
4. **New attack surface.** The admin panel, authentication, uploads and write APIs. In particular, Payload's "create first user" screen must not be left open on a fresh production database.
5. **Build-time database dependency.** Statically generated pages will read the database during `next build`. The public pages must fall back to the existing content when the database is unreachable.
6. **No existing tests.** Regression protection must be added (unit, end-to-end and visual).
7. **Pre-existing hydration error on `/`.** Must be distinguished from regressions.
