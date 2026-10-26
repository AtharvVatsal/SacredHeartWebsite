# CMS migration plan

How the existing hard-coded site moves into the CMS without breaking it. The architecture is in `cms-architecture.md`. The live status of each page is in the table in §4; it is kept up to date as the work progresses.

## 1. Principles

1. **Nothing switches over in one step.** Each route keeps its existing implementation (`legacy-page.tsx`) as the fallback. It renders CMS content only when an explicitly mapped page exists in the CMS, is **published**, and passes validation.
2. **Same markup, not look-alikes.** Each block is the existing section's JSX moved into `src/cms/blocks/` (or, for large interactive page bodies, into a component under `src/components/` that the original page renders too), with its hard-coded strings, links and images turned into props. The current values become the defaults. Shared visual pieces (`HeroDecor`, `FadeIn`, `Section`, `MagneticButton`, and so on) are imported, not copied.
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
| 7 | Widget data editable (notices, staff, toppers, fees, gallery, pass-out batches, office bearers, calendar) | Each widget reads its data from the CMS, with the data file as fallback (see the decision below) |
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

| Order | Route | Main blocks | Where its data is edited | Status |
|---|---|---|---|---|
| 1 | `/` | Home hero, quick actions, statistics, quick links, about preview, principal quote, facilities, student leaders, achievements, notices, highlight story, CTA band | on the page; notices can follow the Notifications page | ☑ |
| 2 | `/about` | Banner, figure boxes, explore tiles, who we are, journey timeline, anthem, principal preview, join band | on the page; staff count follows the Staff page | ☑ |
| 3 | `/about/principal` | Banner, leader profile, numbered themes, key figures, two-button close | on the page; name from Site settings | ☑ |
| 4 | `/about/history` | Banner, milestone timeline, mission panel, story cards, stat tiles, two-button close | on the page | ☑ |
| 5 | `/about/aims` | Banner, vision topics, aims grid, core values, two-button close | on the page | ☑ |
| 6 | `/academics` | Banner, class levels, streams, subjects, quick links, activities | on the page | ☑ |
| 7 | `/academics/syllabus-homework` | Banner, curriculum card, subject groups, streams, homework card, study tips, join CTA | on the page | ☑ |
| 8 | `/academics/leave-absence` | Banner, notice strip, guidelines card, call band | on the page; phone from Site settings | ☑ |
| 9 | `/admission` | Banner, process steps, checklist, numbered rules, link cards, dates notice, apply band | on the page; phone and email from Site settings | ☑ |
| 10 | `/admission/rules` | Banner, rule cards | on the page | ☑ |
| 11 | `/admission/uniform` | Banner, gold info card, dress code cards | on the page | ☑ |
| 12 | `/admission/online-fee` | Banner with portal buttons, info tiles, step guide, help cards, app and help band | on the page; portal, app links and phones from Site settings | ☑ |
| 13 | `/admission/online-registration` | Banner with portal buttons, step guide, help cards, portal band | on the page; portal and phones from Site settings | ☑ |
| 14 | `/admission/fee-structure` | Banner, **fee table** (classes, categories, quarters, fee heads; totals computed), guidelines, warning card, CTA | on the page | ☑ |
| 15 | `/admission/register` | **Enquiry form** (the page's own component) | wording on the page; email from Site settings | ☑ |
| 16 | `/contact` | **Contact page** (the page's own component) | office hours on the page; address, phones, emails, map from Site settings | ☑ |
| 17 | `/notifications` | **Notifications board** (the page's own component) | notices on the page | ☑ |
| 18 | `/achievements` | Banner, notable achievements, top five per class | top five follow the toppers pages | ☑ |
| 19 | `/achievements/other` | Banner, featured achiever with photo viewer, counting figures, note, achiever cards, CTA (the page's own components) | on the page | ☑ |
| 20 | `/achievements/toppers` | Banner, class chooser with live counts, CTA | counts follow the toppers pages | ☑ |
| 21 | `/achievements/toppers/10th`, `/12th` | Toppers banner, **toppers by session**, CTA | on each page | ☑ |
| 22 | `/about/staff` | Banner, principal spotlight, **staff directory** (search, departments), key figures, close | on the page | ☑ |
| 23 | `/about/office-bearers` | Banner, **office bearers by session** | on the page | ☑ |
| 24 | `/about/office-bearers/messages` | Banner, message cards | on the page | ☑ |
| 25 | `/about/pass-out-batches` | **Pass out batches** (the page's own component) | on the page | ☑ |
| 26 | `/academics/calendar` | **Academic calendar** (the page's own component) | dates on the page | ☑ |
| 27 | `/gallery` | Banner, **gallery** (albums, viewer, videos) | on the page; built-in albums keep their photo folders | ☑ |
| 28 | `/privacy`, `/terms` | Banner, policy intro, policy sections, simple CTA | on the page | ☑ |
| — | Header, footer, structured data | Site settings global | Site settings | ☑ |

### How each page was verified

- **Preview vs original:** every page's CMS draft was screenshotted in preview and compared with the original route at 390 px and 1440 px. All are within 0.1 % of the original pixels (most are identical). Interactive states were compared too: tabs (Our Aims), the timeline (Our History), session and class pickers (Office Bearers, toppers, fee table), filters (Staff, Gallery, Pass Out Batches), the photo viewers (Other Achievements, Gallery), the calendar's published-session view, and the forms' validation messages.
- **Published routes:** all 30 drafts were published in a local database through the normal publish path (strict validation included), and every route was screenshotted again as an anonymous visitor at both widths: 60 of 60 screenshots matched the pre-publish originals, with identical page titles, H1s and status codes, and no console errors.
- **Editor:** every page opens in the visual editor with all its sections rendered in the canvas, and every section's settings panel opens without errors.
- **Shared components:** where a page's interactive body was moved into a component shared by the original page and the CMS block (Office Bearers, Staff, Notifications, Calendar, Gallery, Pass Out Batches, Contact, enquiry form, Other Achievements, toppers), the original page was screenshotted before and after the move and compared.

### Decision on stage 7 (widget data)

Stage 7 planned separate collections for widget data. It was implemented differently: each widget's data lives in the **section on its own page** (the fee table on School Fee, the staff list on Our Staff, and so on), edited in the same visual editor as everything else. Where other pages show the same data (the top five toppers, staff counts, home notices), the server reads it from the source page at render time (`src/cms/render/linked-data.ts`). Publishing a source page refreshes the whole site. Reasons: one editing experience for staff, drafts, preview and history for this data too, and no database schema change. The original data files (`src/data/*.ts`) stay as the seed source and as the fallback while a page is not yet in the CMS.

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
