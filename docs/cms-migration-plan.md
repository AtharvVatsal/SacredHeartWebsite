# CMS migration plan

How the existing hard-coded site moves into the CMS without breaking it. The architecture is in `cms-architecture.md`. The live status of each page is in the table in §4; it is kept up to date as the work progresses.

## 1. Principles

1. **Nothing switches over in one step.** Each route keeps its existing implementation (`legacy-page.tsx`) as the fallback. It renders CMS content only when an explicitly mapped page exists in the CMS, is **published**, and passes validation.
2. **Same markup, not look-alikes.** Each block is the existing section's JSX moved into `src/cms/blocks/<Name>/Component.tsx`, with its hard-coded strings, links and images turned into props. The current values become the defaults. Shared visual pieces (`HeroDecor`, `FadeIn`, `Section`, `MagneticButton`, and so on) are imported, not copied.
3. **Seeded, not retyped.** `src/cms/seed/pages/*.ts` builds each page document from the same constants and data files the legacy page uses. Running the seed twice is safe: it updates by path, and it never overwrites a page that an editor has changed since the seed, unless `--force` is passed.
4. **A page counts as migrated only after verification.** That means a CMS-rendered screenshot compared with the legacy screenshot at phone and desktop width, a route and metadata check, and a check of interactions and links.

## 2. Stages

| # | Stage | Done when |
|---|---|---|
| 1 | Framework upgrade (Next 16, React 19, ESLint 9) | Type-check, lint and build pass; all 30 routes match the baseline screenshots |
| 2 | Payload foundation: route groups, config, Postgres, Users, Media, Pages, Redirects, SiteSettings, access rules, first-admin script, migrations | Admin login works; unauthenticated writes are refused (tested) |
| 3 | Global settings wired into the Header, Footer and structured data, with a fallback to `data/school.ts` | An edit in the settings appears site-wide after saving; with the database off, the site is unchanged |
| 4 | Block library, renderer, validation and versioning, and the Puck editor with image, link and colour fields | Blocks render identically in the editor canvas and on the page; invalid data is skipped safely |
| 5 | Drafts, preview, publish, revalidation, restore, redirects | End-to-end tests pass (§5) |
| 6 | Page-by-page migration, in the order of §4 | Each row's verification boxes are ticked |
| 7 | Structured collections for widget data (notices, staff, toppers, fees, gallery, pass-out batches, office bearers) | Each widget reads its collection, with the data file as fallback |
| 8 | Hardening, tests, documentation | Every check in §5 passes; limitations are documented |

## 3. Block mapping strategy

- **Shared blocks**, used on many pages:
  - **Page hero:** the green inner-page hero, with title, description, back link, badge, motif icons and variants.
  - **Section heading:** eyebrow, title, divider, intro.
  - **Card grid:** icon cards, in the white, tinted, gradient and dark variants the site uses.
  - **Text section**, **Image and text**, **Quote**, **Statistics**, **Call to action band**, **Accordion / FAQ**, **Steps**, **Notice / callout**, **Button row**.
  - **Columns:** a 2/3/4-column layout with slots for nesting.
  - **Spacer / divider**.
- **Page-specific blocks:** sections whose design exists on one page only, such as the home hero with its slideshow, the history timeline or the aims vision carousel. Each is extracted verbatim and listed under the page's category in the editor.
- **Widget blocks:** interactive features, namely the fee table, toppers list, staff directory, gallery, pass-out batches, calendar, contact form, admission enquiry form and office bearers. Their behaviour stays in code. Their data comes from collections (stage 7), and their headings and intro text are editable. They are marked as non-deletable in the editor (`permissions.delete: false`) so a form or directory cannot be removed by accident. An administrator can still hide one.

## 4. Page inventory and status

Legend:
- ☐ not started
- ◐ blocks exist and the seed exists, but not yet verified
- ☑ migrated and verified (screenshot comparison at phone and desktop width, route and metadata check, interactions)

| Order | Route | Main blocks | Data dependencies | Status |
|---|---|---|---|---|
| 1 | `/` | Home hero, Quick actions bar, Statistics, Quick links, About preview, Principal quote, Facilities, Student leaders, Achievements, Notices list, Highlight story, CTA band | `school.ts`: stats, links, facilities, leaders, achievements, notices | ☐ |
| 2 | `/about` | Page hero, stat cards, card grids, anthem, text | `school.ts` | ☐ |
| 3 | `/about/principal` | Page hero, principal message sections | `school.ts` | ☐ |
| 4 | `/about/history` | Page hero, timeline, text | — | ☐ |
| 5 | `/about/aims` | Page hero, vision carousel, aims grid, values grid | — | ☐ |
| 6 | `/academics` | Page hero, card grids, CTA | — | ☐ |
| 7 | `/academics/syllabus-homework` | Page hero, text and card sections | — | ☐ |
| 8 | `/academics/leave-absence` | Page hero, rules, steps | — | ☐ |
| 9 | `/admission` | Page hero, steps, card grids, CTA | — | ☐ |
| 10 | `/admission/rules` | Page hero, rule lists | — | ☐ |
| 11 | `/admission/uniform` | Page hero, uniform sections | — | ☐ |
| 12 | `/admission/online-fee` | Page hero, step guide, notices | `school.ts` (portal link) | ☐ |
| 13 | `/admission/online-registration` | Page hero, step guide | `school.ts` | ☐ |
| 14 | `/admission/fee-structure` | Page hero, **Fee table** widget, notes | `fees.ts` | ☐ |
| 15 | `/admission/register` | Page hero, **Admission enquiry form** widget | — | ☐ |
| 16 | `/contact` | Page hero, contact cards, **Contact form** widget, careers | `school.ts` | ☐ |
| 17 | `/notifications` | Page hero, **Notices list** widget | notices | ☐ |
| 18 | `/achievements` | Page hero, toppers summary, achievements | `school.ts`, `toppers.ts` | ☐ |
| 19 | `/achievements/other` | Page hero, **Achievements** widget | `school.ts` | ☐ |
| 20 | `/achievements/toppers` | Page hero, toppers overview | `toppers.ts` | ☐ |
| 21 | `/achievements/toppers/10th`, `/12th` | **Toppers** widget | `toppers.ts` | ☐ |
| 22 | `/about/staff` | Page hero, principal card, **Staff directory** widget | staff | ☐ |
| 23 | `/about/office-bearers` | Page hero, **Office bearers** widget | `school.ts` | ☐ |
| 24 | `/about/office-bearers/messages` | Page hero, leader messages | `school.ts` | ☐ |
| 25 | `/about/pass-out-batches` | Page hero, **Pass-out batches** widget | `school.ts` | ☐ |
| 26 | `/academics/calendar` | Page hero, **Calendar** widget | inline | ☐ |
| 27 | `/gallery` | Page hero, **Gallery** widget, videos | `gallery.ts` | ☐ |
| 28 | `/privacy`, `/terms` | Page hero, text sections | `school.ts` | ☐ |
| — | Header, footer, structured data | SiteSettings global | `school.ts` | ☐ |

## 5. Testing strategy

| Layer | Tool | What |
|---|---|---|
| Unit | Vitest | Block schemas (valid, invalid and hostile input), link sanitising, inline-text parser, document validation, version migrations, path rules, access functions |
| Integration | Vitest + Payload Local API against a disposable test database | Role rules (editors cannot publish or delete; anonymous users cannot write); drafts are hidden from public reads; the redirect is created on a path change; the media reference check blocks deletion |
| End to end | Playwright (system Chrome) against `next start` | Login; open editor; edit text; add, move, duplicate and remove sections; upload an image; save draft (public page unchanged); preview; publish (public page changed); restore an earlier version; unauthenticated access to the editor, preview and write APIs is refused |
| Route smoke | Playwright | All 30 existing routes plus custom pages return 200 with the expected title and H1; old WordPress addresses still return 301 |
| Visual | Puppeteer screenshots + pixel diff | Legacy vs CMS rendering of each migrated page, at 390 px and 1440 px |
| Static | `tsc`, ESLint, `next build` | No new errors |

## 6. Rollback procedure

| Situation | Action | Effect |
|---|---|---|
| A published CMS page is wrong | Restore an earlier version (admin → Versions), or **unpublish** it | The restored version goes live after revalidation. If the page is unpublished, the route immediately falls back to the original implementation. |
| CMS content is broken site-wide | Unpublish the affected pages, or set `CMS_PAGES_ENABLED=false` and rebuild | Every built-in route renders its original implementation |
| A settings change is wrong | Restore the previous version of the global | Header and footer revert |
| A database migration is wrong | Restore the pre-deploy database backup (`cms-deployment.md` §Backups) and redeploy the previous build | — |
| The entire CMS change must be removed | Redeploy the last commit before `feature/cms` was merged. The database can be left untouched. | Site returns to its pre-CMS state |

The legacy implementations are not deleted during this project. Removing them is a separate, later decision, to be taken once the CMS has run in production.
