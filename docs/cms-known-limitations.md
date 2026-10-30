# CMS: known limitations

What the CMS does not do (yet), and the risks to keep in mind. Each item says what happens today and what would remove the limitation.

## Content and editing

| Limitation | Today | To remove it |
|---|---|---|
| Form questions are fixed | The contact form and the admission enquiry form are the site's own components. Their surrounding wording is editable; their fields, validation and destination are code. | A form-builder section, plus a server endpoint that stores submissions. |
| Forms do not send anything by themselves | Without `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` / `NEXT_PUBLIC_ADMISSION_FORM_ENDPOINT`, a form opens the visitor's email app with the message filled in. The page says so. | Configure an endpoint (a form service), or add a submissions collection. |
| Gallery album photos need a one-off import | Until `npm run cms:import-gallery` has been run (and the Gallery draft published), the 23 built-in albums read their numbered photos from `/public/images/Gallery/`; their names, covers and order are editable but the photos inside them are not. After the import every photo is in the media library and editable. | Run the import once after seeding (see `cms-deployment.md` §3). |
| Figures linked only where set up | Toppers, staff, notices and the school's figures (years, staff and students strength, library books, year established) are edited once and shown everywhere. A figure is linked only when its section says *Figure comes from: Site settings*; the school's figures are set up this way when the pages are seeded; a figure typed into a new section is not linked until that setting is chosen. A page saved before this change (so far only in a development database) keeps its typed figures until it is re-seeded or the setting is chosen. | — |
| Linked content in the editor | A page that shows another page's content (for example the top five toppers) shows that page's latest saved draft when the editor opens; it does not update live while the other page is being edited. | Live subscription between editor sessions (not needed in practice). |
| Original data files remain | `src/data/*.ts`, `src/content/*.ts` and each route's `legacy-page.tsx` still hold the original content. They are the fallback whenever a page is not published in the CMS, so editing them no longer changes a page that is published in the CMS. | After the CMS has run in production for a while, retire the legacy pages and data files deliberately. |
| Editing on a phone | The visual editor is designed for a computer or tablet. Pages can be previewed at phone width inside it. | — |

## Technical

| Limitation | Notes |
|---|---|
| Development server and block changes | In development, after changing a block's definition, restart `next dev`; Payload keeps the earlier schema in memory. Production builds are unaffected. |
| Rendering cost | Published pages are generated statically and rebuilt on publish. Publishing a page that other pages read from (toppers, staff, notifications) refreshes every page, which is cheap for a 30-page site but would need narrowing on a much larger one. |
| Dependency advisories | See `cms-deployment.md` §8: dompurify and undici are pinned to fixed versions; the remaining esbuild (development server) and happy-dom (unused rich-text field) advisories have no compatible fix yet. |
| Payload version | Pinned to 3.91.0, with Next.js 16.4.2. Upgrading needs the full test suite; see `cms-deployment.md`. |
| Visual checks are a script, not CI | `scripts/visual-compare.mjs` repeats the screenshot comparison used during the migration, but it is run by hand; it is not part of `npm test`. Compare its screenshots only with its own: in phone screenshots, styles meant for touch screens (such as the captions under pass-out photos) are missing, because Playwright briefly treats the phone as a mouse screen while capturing a full page. Visitors see them. |
| No email sending | Password resets are done by an administrator (no email adapter is configured, so Payload's "forgot password" email is only logged). |

## What was verified, for context

See `cms-migration-plan.md` §4: all 30 routes were compared with the original pages at two widths, before and after publishing, and every page was opened in the editor.
