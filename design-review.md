# Design review: refinement pass (18 Oct 2026)

## Direction

**Keep the existing design and polish it; don't redesign.**

The first attempt replaced the site's look:
- headings moved to a serif, body text to Inter;
- glass and gradients became solid colours;
- parallax, blobs, magnetic buttons and the blur and word-reveal motion were removed;
- the homepage was rewritten.

The owner said this removed the core design. They chose to keep all of these as signature elements:
- glass surfaces and gradients;
- the motion and depth effects;
- the Outfit / Plus Jakarta Sans fonts;
- the homepage details: floating badges, scroll cue, uppercase labels and the overlapping CTA.

All of that work was rolled back to commit `d612cba`. It is kept, unapplied, as a patch at `%LOCALAPPDATA%\Temp\shs-qa-audit\design-pass-wip.patch` in case parts are wanted later.

This pass only fixes things that are measurably wrong inside the current design: clipping, overlap, contrast, dead space, column balance and loading-state semantics. The colours, type, radii, shadows and animations are unchanged.

## References consulted

These were used as benchmarks for hierarchy, navigation and restraint. No layout, text, branding or asset was copied, and nothing is hotlinked.

| Site | Takeaway |
|---|---|
| The Lawrence School, Sanawar: https://sanawar.edu.in | Heritage wordmark and real campus photography carry trust. A 14px body and an entry modal are things to avoid. |
| Mayo College: https://mayocollege.com | Calendar and news one click from the home page. |
| Convent of the Sacred Heart, NYC: https://www.cshnyc.org | A single brand colour for actions; values told through real stories. |
| Sacred Heart Greenwich: https://www.shgreenwich.org | Deep-green brand used with photo-led cards. |
| Eton College: https://www.etoncollege.com | Generous whitespace around long-form text. |
| The Doon School: https://www.doonschool.com | Only the first viewport rendered in the headless browser, so it gave little to compare. |
| GOV.UK error summary: https://design-system.service.gov.uk/components/error-summary/ | Pattern check for form errors. The site's forms already meet it, so no change. |
| React Bits: https://reactbits.dev | Animation component showcase (MIT + Commons Clause). Not adopted: the site already has its own motion set. |
| "Eccentricity UI" | No library by this name could be found. Aceternity UI (https://ui.aceternity.com) is the likely intended match. Not adopted, same reason as React Bits. |

## Skills and tools used

- **frontend-design** skill for critique.
- **puppeteer-core** with Chrome 155 for screenshots, sweeps and checks.
- **axe-core 4.10.2** for accessibility scans.
- **Next.js production build** to test the site as deployed.

## Tokens

No new tokens. The existing `tailwind.config.ts` palette (primary green, secondary gold) and the existing `globals.css` utilities (`glass`, `shadow-glow`, `shimmer` and so on) are untouched.

## Routes and components refined

| Where | Change | Why |
|---|---|---|
| `/` hero | Bottom padding below `lg` (`pb-20`; `pb-16` on short screens) | The "Ranked / Top School" badge was cut off by the next band on phones and tablets (ISSUE-049). |
| `/` hero | Scroll cue only at `lg` widths with ≥ 760px height; `aria-hidden` | It overlapped the stacked slideshow (ISSUE-050). |
| `/` stats → Quick Links | Removed the duplicate section padding; tidied the lead paragraph's stray `pt-4 mt-2` | About 230px of dead space, now about 145px (ISSUE-054). |
| Footer | Sub-links `gray-400` → `gray-300` | About 3.6:1 contrast, now about 6.1:1 (ISSUE-051). |
| Footer | 12-column grid; sitemap in two sub-columns from 640px | One column was four times taller than the rest (ISSUE-055). |
| Toppers pages | Percentage badge grows to fit; tabular figures | "97.2%" overflowed its circle (ISSUE-053). |

## Skeletons

The six `loading.tsx` files are Next.js route-transition fallbacks: genuine loading states with no artificial delay. All six now have:
- `role="status"`, `aria-busy` and a visually hidden "Loading…" label;
- a pulse that runs only under `motion-safe:` (the root shimmer was already stopped by the existing reduced-motion CSS);
- the same shapes as before.

The root skeleton no longer paints a fake fixed header over the real one, and its endlessly floating image block is now static. The per-card endless opacity loops are gone.

## Files changed

- `src/app/page.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/achievements/ToppersPage.tsx`
- `src/app/loading.tsx`
- `src/app/about/loading.tsx`
- `src/app/about/staff/loading.tsx`
- `src/app/achievements/loading.tsx`
- `src/app/gallery/loading.tsx`
- `src/app/notifications/loading.tsx`
- `issues.md`: new section appended; existing IDs and statuses untouched.
- `design-review.md`: this file.

## Tests and viewports run

All on the production build, Chrome 155, Windows.

- `tsc --noEmit` clean; `next lint` reports no warnings or errors.
- Functional suites: forms/calendar **30/30**; other issues **75/75**.
- axe-core (WCAG 2.0–2.2 A/AA + best practice) at 1440×900 and 390×844:
  - all 26 routes on the original design: no violations;
  - after the polish, `/`, `/achievements/toppers/10th`, `/about/staff`, `/gallery`, `/notifications`: no violations.
- Responsive sweep at 40 widths (320–2560px) on 11 routes: no horizontal overflow. The only "spill" is the original animated arrow on "Read Their Full Messages", which is a transform and clips nothing.
- Hero check at 320×568, 390×844, 768×1024, 1024×768, 1366×600, 1440×900 and 844×390 landscape: the badge is inside the hero at every size, and the scroll cue shows only where there is room.
- Keyboard sweep on `/`, `/admission/register`, `/academics/calendar` and `/gallery` at desktop and mobile: every stop shows a focus indicator.
  - "Hidden" stops are scroll-reveal items still at opacity 0 at the instant focus lands; they fade in straight after. This is unchanged from before.
- Before and after screenshots at 390, 768 and 1440 widths: `tools/baseline/` and `tools/after/` in the audit workspace.

Not tested: Firefox and Safari, physical devices, screen readers.

## Remaining issues

- **ISSUE-056 (Needs Information):** "Ranked / Top School" has no source.
- **Still open from earlier:** ISSUE-027 (statistics to confirm) and ISSUE-043 (off-palette card colours on `/about`, `/academics`, `/admission`, uniform). The colours are part of the current look and were left alone; change them only if the owner wants them.
- **Floating hero shapes:** on phones they sit partly behind the heading. They are decorative, low-contrast and kept as part of the design.
- **CTA below the fold at 320×568:** the hero call to action ends at 615px, so it starts just below the first screen. This was the case before this pass too.

---

# Follow-up: scroll behaviour, GradualBlur and hero consistency (19 Oct 2026)

## What was asked

- Use React Bits' GradualBlur for the scroll effect.
- Fix the staff page's scroll animation.
- Fix other UI/UX problems.
- Give every route the same green hero with related orbs and small animations, using the existing good heroes as the base and without breaking anything that works.

## Scroll and motion fixes

The full list is ISSUE-057 to 062 in `issues.md`.

- **Reveal timing (staff, pass-out, toppers, gallery, contact, history and others).**
  - The cause was a stagger that started when a grid's top entered view, so deep items waited seconds.
  - `StaggerContainer` / `FadeInItem` now reveal each item when it is reached, staggered only within the batch arriving together, capped at 0.45s.
  - Same blur, rise and easing as before.
- **Sticky filter bars.** One shared behaviour (`.sticky-under-header`): flush under the header, tucking away and returning with it. This also fixes:
  - the 8px gaps and overlaps;
  - the pass-out bar that never stuck;
  - the staff search box crushed to 56px on desktop.
- **Hover timing.** Hover and tap no longer wait for the entrance delay.
- **Nested controls.** 12 `Link > button` CTAs are now single links.
- **Keyboard.** Focus never lands on content that is still invisible.
- **Touch.** Pass-out photo titles show on devices without hover.

## GradualBlur (React Bits)

- **Source:** https://reactbits.dev (GradualBlur, by Ansh, github.com/ansh-dhanani). Ported to TypeScript at `src/components/animations/GradualBlur.tsx`. Behaviour unchanged, attribution kept in the file.
- **Page edge:** `target="page"`, bottom, 3.5rem, strength 1.25, 6 layers, `autoHide`.
  - Content softens into the bottom edge while scrolling and the blur fades away at the end of the page.
  - z-index 30: below the sticky bars, header, mobile menu and lightboxes.
  - `pointer-events: none`, so nothing under it is blocked.
  - `print:hidden`.
- **Chip rows:** left and right edges on the swipeable staff department chips and pass-out year pills, below `lg`, with a white tint and `autoHide`. They show which way there is more to swipe.

## Heroes

- **New shared component:** `src/components/layout/HeroDecor.tsx`. It reuses the About Us pattern:
  - a large, page-related icon drifting top-right at 10% opacity;
  - a smaller motif;
  - five twinkling gold points.
- **Added to:** history, aims, principal, staff, office bearers, messages, pass-out batches, calendar, syllabus & homework, leave & absence, register, rules, fee structure, uniform, toppers, privacy and terms. Each has its own icon pair, e.g. calendar + clock, shirt + ruler, scroll + shield.
- **Class 10/12 toppers hero** (`ToppersPage`) brought in line with the rest: same deep gradient, animated orbs and wave.
- **Left as they were:** About, Academics, Achievements, Admission, Gallery, Notifications, Contact, Other Achievements and Home. They already had their own motif and were the reference.
- **Reduced motion:** the decor stays still.
- **Contact sheets:** all 26 heroes at 1440 and 390 were captured with `tools/hero-sheet.cjs` and reviewed.

## Checks run (production build, Chrome 155)

- `tsc` clean; `next lint` clean.
- Functional suites: forms/calendar 30/30; other issues 75/75.
- axe-core: all 28 routes at 1440×900 and 390×844, no violations.
- 40-width responsive sweep on all 28 routes: no overflow or layout problems.
- Fast-scroll reveal audit (new tool: `tools/reveal-audit.cjs`): the large blanks are gone. Remaining hits are collapsed accordion text, hover-only labels and items in the bottom 40px of the viewport.
- Hover-out timing (`tools/hover-lag.cjs`): settles in about 150ms (was about 450ms).
- Keyboard sweep with a 350ms settle: 0 hidden focus stops on 7 representative routes, visible indicators everywhere.
- Not tested: Safari/Firefox (`backdrop-filter`/`mask-image` support for GradualBlur), real devices, screen readers.
