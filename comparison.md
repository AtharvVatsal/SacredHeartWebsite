# Sacred Heart Sr. Sec. School website: the current site and the proposed new site

**Current site:** https://shsdharamshala.com/ (WordPress)
**Proposed new site:** this project (Next.js), tested as a production build, source at https://github.com/AtharvVatsal/SacredHeartWebsite
**Measured:** 20 October 2026, with Google Chrome 155, Google Lighthouse 12.6.1 and axe-core 4.10.2. Lighthouse is the engine behind Google's PageSpeed Insights; axe-core is the accessibility engine used by Google's and Microsoft's developer tools.

Every number in this document was measured for it, on the same day and the same computer, using the same settings for both sites. The raw results are in [`comparison-assets/current/data/`](comparison-assets/current/data/). Where the new site is weaker, this document says so ([section 12](#12-where-the-new-site-is-weaker-and-what-is-still-open)).

> This replaces the earlier comparison in `comparison_before_fixes.md`. That one was measured before the new site was brought up to date with the current site's content (session 2026–27, the full photo gallery, online fee and registration guides, and search-engine work). Everything below is measured on the new site as it is today.

---

## Contents

1. [Summary for the school](#1-summary-for-the-school)
2. [How the comparison was done](#2-how-the-comparison-was-done)
3. [First impressions: what a parent sees](#3-first-impressions-what-a-parent-sees)
4. [Speed](#4-speed)
5. [Phones, tablets and computers](#5-phones-tablets-and-computers)
6. [Accessibility](#6-accessibility)
7. [Everyday tasks: how many taps](#7-everyday-tasks-how-many-taps)
8. [Design and user experience](#8-design-and-user-experience)
9. [Being found on Google](#9-being-found-on-google)
10. [Reliability, safety and maintenance](#10-reliability-safety-and-maintenance)
11. [Content: everything the current site has, and more](#11-content-everything-the-current-site-has-and-more)
12. [Where the new site is weaker, and what is still open](#12-where-the-new-site-is-weaker-and-what-is-still-open)
13. [Test results for the new site](#13-test-results-for-the-new-site)
14. [How this helps the school](#14-how-this-helps-the-school)
15. [What has to happen before switching](#15-what-has-to-happen-before-switching)
- [Appendices](#appendix-a-page-mapping)

---

## 1. Summary for the school

Averages over the same 15 pages on both sites (home, about, principal, staff, pass-out batches, admission, online registration, fee structure, pay fee online, calendar, Class 10 and 12 toppers, gallery, notifications, contact).

| What matters to parents and staff | Current site | New site | Difference |
|---|---|---|---|
| Google speed score on a **phone** (0–100) | **52** | **85** | +33 points |
| Google speed score on a **computer** | **59** | **99** | +40 points |
| Time until the main content appears on a phone | **14.5 s** | **3.8 s** | 3.8× faster |
| …on the **home page** | **33.9 s** | **4.1 s** | 8× faster |
| Data needed to open a page on a phone | **2.81 MB** | **0.46 MB** | 6× less |
| Data used scrolling through the whole **home page** on a phone | **16.95 MB** | **0.78 MB** | 22× less |
| Content jumping while a page loads, computer (lower is better; Google's "good" is under 0.1) | **0.25** | **0.00** | |
| Google accessibility score | **85** | **100** on every page | |
| Accessibility errors found by axe-core on phones (all pages) | **122** on 24 pages | **0** on 30 pages | |
| Text smaller than 12 px on phones (hard to read) | **16.6%** of all text (up to **48.5%** on one page) | **0%** | |
| Pages with JavaScript errors / failed downloads / broken images | **3 / 21 / 6** | **0 / 0 / 0** | |
| Pages with no main heading | **10 of 24** | **0 of 30** | |
| Pages with a description for Google results | **0 of 24** | **30 of 30** | |
| Google SEO score | **91** | **100** on every page | |
| Readable web addresses | No (`?page_id=10136`) | Yes (`/admission/fee-structure`) | |
| Security headers sent by the server | **None** | 4 | |

![Speed score on a phone, every page](comparison-assets/current/perf-mobile.png)

**In plain words:** on a phone, the new site shows its main content about four times sooner than the current site and uses a fraction of the mobile data. Its text is readable, and automated checks find no accessibility errors and nothing broken. It gives Google a description of every page, and it carries everything the current site offers parents (online registration, fee payment, fee tables, gallery, notices), session 2026–27 included.

**Where it is not yet better:** office staff cannot edit it in a browser the way they can edit WordPress today ([section 12](#12-where-the-new-site-is-weaker-and-what-is-still-open)). One page (Pass-out batches) is slower to respond on low-end phones than the rest of the site.

---

## 2. How the comparison was done

| | |
|---|---|
| **Devices** | Phone (390 × 844 px, iPhone browser identity), tablet (768 × 1024, iPad identity), computer (1440 × 900). |
| **Pages** | Current site: all 24 published pages, taken from the site's own page list. New site: all 30 pages. |
| **Speed** | Google Lighthouse on 15 matching pages × phone and computer × 3 runs per site (180 runs), median reported. Lighthouse simulates the same slow 4G network and the same mid-range phone processor for both sites. |
| **Per-page checks** | Every page on every device was opened in Chrome and scrolled to the end like a visitor. Measured: data downloaded, sideways scrolling, text size, tap-target size, broken images, JavaScript errors, failed downloads, accessibility (axe-core, WCAG 2.1 A/AA), headings, page descriptions. |
| **Content** | Every page of the current site was read in full through the site's public WordPress interface, and its 888-file media library was catalogued (see `live-site-port.md`). |
| **New-site tests** | The full test suite was re-run on today's build ([section 13](#13-test-results-for-the-new-site)). |

**Fairness notes:**
- **Pacing:** the current site was tested one page at a time, 10 seconds apart, so its host was never overloaded. The site had not changed since the morning: all 24 pages had the same "last modified" date as in the morning audit.
- **Local build:** the new site is not online yet, so it was measured from a local production build. What a local build cannot show is the hosting server's own response time. The current site's server took **1.4–2.9 s** to start responding (Lighthouse, phone, per page); the local build took about 0.01 s.
- **Conservative check:** add the current site's average server delay (1.5 s) to every new-site result. The new site's average phone time to main content becomes **5.3 s**, against **14.5 s** for the current site, so it is still about 2.7× faster.
- **What hosting doesn't change:** data size, number of downloads, text size, accessibility and errors don't depend on hosting at all.
- **One failed run:** in 1 of the 90 current-site runs (Fee structure, computer, run 2), the page never drew anything on screen ("no first paint"). That page's median uses its other two runs.

---

## 3. First impressions: what a parent sees

The first screen of the home page, as loaded on each device.

| Phone | Computer |
|---|---|
| ![Home page on a phone](comparison-assets/current/home-phone.jpg) | ![Home page on a computer](comparison-assets/current/home-desktop.jpg) |

- **Current site, phone:**
  - The top of the screen is a two-line dark bar of small links and contact details, followed by the logo.
  - The slideshow's numbered markers (01–10) sit over the photo, and the welcome text starts below the first screen.
  - Lighthouse measured **33.9 s** before the main slide image appeared on a phone.
- **New site, phone:** opens with the school's name, an "Apply for Admission" button and an "About Our School" button, with the campus slideshow below. The main content appears in **4.1 s**.

More pages, each image showing both sites side by side:

| Page | Phone | Tablet | Computer |
|---|---|---|---|
| About Us | [phone](comparison-assets/current/about-phone.jpg) | [tablet](comparison-assets/current/about-tablet.jpg) | [computer](comparison-assets/current/about-desktop.jpg) |
| Principal's message | [phone](comparison-assets/current/about_principal-phone.jpg) | [tablet](comparison-assets/current/about_principal-tablet.jpg) | [computer](comparison-assets/current/about_principal-desktop.jpg) |
| Teachers and staff | [phone](comparison-assets/current/about_staff-phone.jpg) | [tablet](comparison-assets/current/about_staff-tablet.jpg) | [computer](comparison-assets/current/about_staff-desktop.jpg) |
| History | [phone](comparison-assets/current/about_history-phone.jpg) | [tablet](comparison-assets/current/about_history-tablet.jpg) | [computer](comparison-assets/current/about_history-desktop.jpg) |
| Pass-out batches | [phone](comparison-assets/current/about_pass-out-batches-phone.jpg) | [tablet](comparison-assets/current/about_pass-out-batches-tablet.jpg) | [computer](comparison-assets/current/about_pass-out-batches-desktop.jpg) |
| Admission | [phone](comparison-assets/current/admission-phone.jpg) | [tablet](comparison-assets/current/admission-tablet.jpg) | [computer](comparison-assets/current/admission-desktop.jpg) |
| Online registration | [phone](comparison-assets/current/admission_online-registration-phone.jpg) | [tablet](comparison-assets/current/admission_online-registration-tablet.jpg) | [computer](comparison-assets/current/admission_online-registration-desktop.jpg) |
| Fee structure | [phone](comparison-assets/current/admission_fee-structure-phone.jpg) | [tablet](comparison-assets/current/admission_fee-structure-tablet.jpg) | [computer](comparison-assets/current/admission_fee-structure-desktop.jpg) |
| Pay fee online | [phone](comparison-assets/current/admission_online-fee-phone.jpg) | [tablet](comparison-assets/current/admission_online-fee-tablet.jpg) | [computer](comparison-assets/current/admission_online-fee-desktop.jpg) |
| Calendar | [phone](comparison-assets/current/academics_calendar-phone.jpg) | [tablet](comparison-assets/current/academics_calendar-tablet.jpg) | [computer](comparison-assets/current/academics_calendar-desktop.jpg) |
| Class 10 toppers | [phone](comparison-assets/current/achievements_toppers_10th-phone.jpg) | [tablet](comparison-assets/current/achievements_toppers_10th-tablet.jpg) | [computer](comparison-assets/current/achievements_toppers_10th-desktop.jpg) |
| Class 12 toppers | [phone](comparison-assets/current/achievements_toppers_12th-phone.jpg) | [tablet](comparison-assets/current/achievements_toppers_12th-tablet.jpg) | [computer](comparison-assets/current/achievements_toppers_12th-desktop.jpg) |
| Photo gallery | [phone](comparison-assets/current/gallery-phone.jpg) | [tablet](comparison-assets/current/gallery-tablet.jpg) | [computer](comparison-assets/current/gallery-desktop.jpg) |
| Notifications | [phone](comparison-assets/current/notifications-phone.jpg) | [tablet](comparison-assets/current/notifications-tablet.jpg) | [computer](comparison-assets/current/notifications-desktop.jpg) |
| Contact | [phone](comparison-assets/current/contact-phone.jpg) | [tablet](comparison-assets/current/contact-tablet.jpg) | [computer](comparison-assets/current/contact-desktop.jpg) |

**Fee structure, computer:**

![Fee structure on a computer](comparison-assets/current/admission_fee-structure-desktop.jpg)

- **Current site:** shows one class and one quarter at a time.
- **New site:**
  - shows all four quarters of the chosen class, with the total for the session;
  - adds Class XI (Non-Medical, Medical, Commerce), which the current site's fee page does not have.

---

## 4. Speed

### 4.1 Results per page (Lighthouse, median of 3 runs)

**Main content appears** (Largest Contentful Paint) is when the biggest thing on screen, usually the main photo or heading, has loaded. Google rates under 2.5 s as good and over 4 s as poor.

![Time until the main content appears on a phone](comparison-assets/current/lcp-mobile.png)

#### Phone

| Page | Speed score | Main content appears | First content appears | Page frozen (blocking time) | Content jumping (layout shift) | Data downloaded | Downloads |
|---|---|---|---|---|---|---|---|
| Home | **37 → 84** | 33.9 s → 4.1 s | 8.1 s → 1.8 s | 849 ms → 60 ms | 0.00 → 0.00 | 8.82 MB → 0.46 MB | 130 → 34 |
| About | **61 → 88** | 12.9 s → 3.6 s | 3.2 s → 1.8 s | 261 ms → 30 ms | 0.00 → 0.00 | 1.97 MB → 0.39 MB | 85 → 30 |
| Principal’s message | **53 → 87** | 11.3 s → 3.9 s | 5.0 s → 1.8 s | 260 ms → 70 ms | 0.11 → 0.00 | 2.36 MB → 0.44 MB | 78 → 33 |
| Staff | **43 → 83** | 10.1 s → 4.3 s | 5.3 s → 1.8 s | 526 ms → 108 ms | 0.08 → 0.00 | 2.73 MB → 0.51 MB | 179 → 47 |
| Pass-out batches | **56 → 57** | 17.0 s → 4.4 s | 7.6 s → 1.8 s | 0 ms → 1374 ms ⚠ | 0.08 → 0.00 | 3.07 MB → 0.58 MB | 82 → 40 |
| Admission | **63 → 90** | 12.8 s → 3.5 s | 2.8 s → 1.7 s | 243 ms → 29 ms | 0.03 → 0.00 | 2.14 MB → 0.38 MB | 93 → 29 |
| Online registration | **48 → 88** | 11.8 s → 3.7 s | 4.3 s → 1.8 s | 551 ms → 52 ms | 0.03 → 0.00 | 1.93 MB → 0.40 MB | 82 → 32 |
| Fee structure | **57 → 82** | 10.3 s → 4.2 s | 5.1 s → 2.6 s | 219 ms → 32 ms | 0.00 → 0.00 | 1.65 MB → 0.50 MB | 78 → 33 |
| Pay fee online | **52 → 89** | 12.2 s → 3.7 s | 8.0 s → 1.8 s | 157 ms → 43 ms | 0.06 → 0.00 | 1.79 MB → 0.40 MB | 110 → 32 |
| Calendar | **56 → 90** | 11.2 s → 3.5 s | 8.8 s → 1.7 s | 64 ms → 33 ms | 0.03 → 0.00 | 1.65 MB → 0.40 MB | 80 → 32 |
| Class 10 toppers | **56 → 91** | 11.1 s → 3.4 s | 5.3 s → 1.7 s | 179 ms → 29 ms | 0.05 → 0.00 | 1.82 MB → 0.39 MB | 77 → 34 |
| Class 12 toppers | **56 → 89** | 12.7 s → 3.5 s | 7.7 s → 1.7 s | 66 ms → 86 ms | 0.07 → 0.00 | 2.02 MB → 0.48 MB | 94 → 50 |
| Photo gallery | **49 → 80** | 24.1 s → 4.6 s | 5.6 s → 1.9 s | 386 ms → 79 ms | 0.03 → 0.00 | 5.82 MB → 0.87 MB | 115 → 57 |
| Notifications | **40 → 90** | 14.5 s → 3.5 s | 4.7 s → 1.7 s | 458 ms → 32 ms | 0.15 → 0.00 | 2.17 MB → 0.38 MB | 83 → 30 |
| Contact | **52 → 89** | 11.7 s → 3.6 s | 5.8 s → 1.7 s | 260 ms → 40 ms | 0.03 → 0.00 | 2.26 MB → 0.39 MB | 118 → 30 |
| **Average (15 pages)** | **52 → 85** | **14.5 s → 3.8 s** | **5.8 s → 1.8 s** | **299 ms → 140 ms** | **0.05 → 0.00** | **2.81 MB → 0.46 MB** | **99 → 36** |

⚠ = the new site is worse on that measure ([section 12](#12-where-the-new-site-is-weaker-and-what-is-still-open)). Without the Pass-out page, the new site's average blocking time is 51 ms.

#### Computer

| Page | Speed score | Main content appears | First content appears | Page frozen (blocking time) | Content jumping (layout shift) | Data downloaded | Downloads |
|---|---|---|---|---|---|---|---|
| Home | **38 → 98** | 7.1 s → 1.1 s | 1.9 s → 0.4 s | 87 ms → 0 ms | 0.56 → 0.00 | 9.36 MB → 0.60 MB | 131 → 57 |
| About | **68 → 98** | 2.9 s → 1.1 s | 1.3 s → 0.4 s | 0 ms → 0 ms | 0.01 → 0.00 | 2.32 MB → 0.52 MB | 85 → 61 |
| Principal’s message | **62 → 99** | 3.1 s → 1.0 s | 1.5 s → 0.4 s | 0 ms → 0 ms | 0.24 → 0.00 | 2.43 MB → 0.53 MB | 78 → 50 |
| Staff | **55 → 97** | 2.7 s → 1.1 s | 1.5 s → 0.5 s | 23 ms → 0 ms | 0.46 → 0.00 | 2.80 MB → 0.72 MB | 179 → 85 |
| Pass-out batches | **53 → 98** | 3.5 s → 1.0 s | 1.8 s → 0.4 s | 0 ms → 2 ms | 0.28 → 0.00 | 3.14 MB → 0.56 MB | 82 → 59 |
| Admission | **64 → 99** | 2.9 s → 0.9 s | 1.4 s → 0.4 s | 7 ms → 0 ms | 0.24 → 0.00 | 2.81 MB → 0.47 MB | 93 → 52 |
| Online registration | **60 → 99** | 2.9 s → 0.9 s | 2.2 s → 0.4 s | 0 ms → 0 ms | 0.24 → 0.00 | 2.00 MB → 0.46 MB | 82 → 50 |
| Fee structure ¹ | **71 → 99** | 2.3 s → 0.8 s | 1.4 s → 0.6 s | 0 ms → 0 ms | 0.17 → 0.00 | 1.73 MB → 0.56 MB | 79 → 51 |
| Pay fee online | **60 → 99** | 2.7 s → 1.0 s | 1.9 s → 0.4 s | 0 ms → 0 ms | 0.22 → 0.00 | 1.86 MB → 0.47 MB | 110 → 52 |
| Calendar | **61 → 99** | 2.7 s → 0.9 s | 1.8 s → 0.4 s | 4 ms → 0 ms | 0.24 → 0.00 | 1.72 MB → 0.46 MB | 80 → 50 |
| Class 10 toppers | **73 → 100** | 2.7 s → 0.7 s | 1.8 s → 0.4 s | 0 ms → 0 ms | 0.05 → 0.00 | 1.88 MB → 0.46 MB | 77 → 52 |
| Class 12 toppers | **57 → 100** | 2.8 s → 0.7 s | 1.8 s → 0.4 s | 0 ms → 0 ms | 0.28 → 0.00 | 2.09 MB → 0.55 MB | 94 → 68 |
| Photo gallery | **52 → 97** | 5.8 s → 1.3 s | 1.5 s → 0.4 s | 28 ms → 0 ms | 0.24 → 0.00 | 7.11 MB → 0.93 MB | 116 → 74 |
| Notifications | **56 → 99** | 2.9 s → 0.9 s | 1.8 s → 0.4 s | 0 ms → 0 ms | 0.30 → 0.00 | 2.24 MB → 0.45 MB | 83 → 47 |
| Contact | **62 → 99** | 2.9 s → 0.9 s | 2.0 s → 0.4 s | 0 ms → 0 ms | 0.17 → 0.00 | 2.29 MB → 0.45 MB | 119 → 47 |
| **Average (15 pages)** | **59 → 99** | **3.3 s → 0.9 s** | **1.7 s → 0.4 s** | **10 ms → 0 ms** | **0.25 → 0.00** | **3.05 MB → 0.55 MB** | **99 → 57** |

¹ Median of the 2 runs in which the current site's page drew on screen (see section 2).

![Speed score on a computer, every page](comparison-assets/current/perf-desktop.png)

**What the measures mean:**
- **Content jumping** (Cumulative Layout Shift): how much the page moves while it loads, the "I tapped the wrong thing" problem. Google rates under 0.1 as good and over 0.25 as poor. On a computer, 12 of the current site's 15 pages are at 0.17 or above, and its home page scores 0.56. Every new-site page scores 0.00.
- **Page frozen** (Total Blocking Time): how long the page ignores taps while it is busy.

### 4.2 Why the current site is slow

Lighthouse's own diagnosis of the current home page on a phone:

| Cause | Measured |
|---|---|
| Images below the screen loaded straight away instead of when scrolled to | **4.98 MB** could wait |
| Photos not in a modern format (WebP/AVIF) | **2.42 MB** could be saved |
| Photos larger than they are shown | **0.93 MB** could be saved |
| Stylesheets and scripts that hold back the first paint | about **2.7 s** |
| Processor work on a mid-range phone | **19.2 s** (new home page: **4.1 s**) |
| Server time before the page starts to arrive | **1.4 s** |
| The main slide image is a CSS background of the "Prime Slider" plugin | Appeared after **33.9 s** |
| Files downloaded to show the home page | **128** files, **9.0 MB**: 31 images (7.1 MB), 14 font files (1.2 MB), 31 scripts, 50 stylesheets, and 34 files from other companies' servers |
| The same for the new home page | **33** files, **0.47 MB**: 22 scripts (0.20 MB), 3 font files (0.10 MB), 2 images, 2 stylesheets, **nothing from outside servers** |

The new site avoids these by design:
- images in WebP, sized for each screen and loaded only as they come into view;
- three fonts stored with the site instead of requested from Google Fonts;
- no page-builder plugins;
- every page pre-built as a finished HTML file, so the server has nothing to work out when a visitor arrives.

### 4.3 Mobile data

Each page was opened on a phone and scrolled to the end, as a visitor would.

![Mobile data used scrolling through each page](comparison-assets/current/scroll-data-phone.png)

| | Current site | New site |
|---|---|---|
| Home page | **16.95 MB** | **0.78 MB** |
| Average page | **3.08 MB** | **0.71 MB** |
| Heaviest page | 16.95 MB (Home) | 2.64 MB (Pass-out batches, 68 class photos) |
| Every page once | **73.8 MB** (24 pages) | **21.2 MB** (30 pages) |

For a parent on a prepaid mobile plan, one visit to the current home page uses about as much data as 22 visits to the new one.

### 4.4 Against the world's websites

| Google's standard (Core Web Vitals) | Share of the world's **mobile** websites that meet it ([Web Almanac 2025](https://almanac.httparchive.org/en/2025/performance)) | Current site, phone | New site, phone |
|---|---|---|---|
| Main content within 2.5 s ("good" LCP) | 62% of sites | 0 of 15 pages (10.1–33.9 s) | 0 of 15 pages (3.4–4.6 s) |
| Content jumping under 0.1 ("good" CLS) | 81% of sites | 13 of 15 pages | **15 of 15 pages** |
| On a computer: main content within 2.5 s | 74% of desktop sites | 1 of 15 pages | **15 of 15 pages** (0.7–1.3 s) |

The Web Almanac figures come from real visitors (Chrome user data); the site results here are from Lighthouse's simulated slow phone, which is harsher. Taken on the same scale, the current site is deep in Google's "poor" band on phones. The new site is in the "needs improvement" band (2.5–4 s) on 10 pages and just past 4 s on 5 pages. On computers it is "good" everywhere.

Google says Core Web Vitals "align with what our core ranking systems seek to reward" ([Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals)).

---

## 5. Phones, tablets and computers

**Why phones matter most:** in September 2026, **77.76%** of web page views in India came from mobile phones ([StatCounter](https://gs.statcounter.com/platform-market-share/desktop-mobile/india)).

All pages were checked at all three sizes (current site 24 pages × 3, new site 30 pages × 3), scrolled to the end:

| Device | Measure | Current site (24 pages) | New site (30 pages) |
|---|---|---|---|
| **Phone** | Pages that scroll sideways (broken layout) | 0 of 24 | 0 of 30 |
| | Text smaller than 12 px (average share) | **16.6%** (worst: History, 48.5%) | **0%** |
| | Text smaller than 14 px | 58.8% | 6.8% |
| | Accessibility errors (axe-core, elements) | **122** on 24 pages | **0** |
| | Pages with JavaScript errors | 3 | 0 |
| | Failed downloads / broken images | 21 / 6 | 0 / 0 |
| | Images much larger than shown | 42 | 0 |
| | Data per page, scrolled to the end (average) | 3.08 MB (heaviest: Home, 16.95 MB) | 0.71 MB (heaviest: Pass-out batches, 2.64 MB) |
| | Every page once, total | 73.84 MB | 21.17 MB |
| **Tablet** | Pages that scroll sideways | 0 of 24 | 0 of 30 |
| | Text smaller than 12 px | **12.5%** (worst: About Us, 42.1%) | **0%** |
| | Accessibility errors | **119** | **0** |
| | Failed downloads / broken images | 20 / 6 | 0 / 0 |
| | Images much larger than shown | 36 | 0 |
| **Computer** | Pages that scroll sideways | 0 of 24 | 0 of 30 |
| | Text smaller than 12 px | **10.7%** (worst: Class 10 toppers, 36.2%) | **0%** |
| | Accessibility errors | **119** | **0** |
| | Failed downloads / broken images | 20 / 6 | 0 / 0 |
| | Images much larger than shown | 72 | 0 |
| | Data per page (average) | 3.40 MB (heaviest: Home, 19.41 MB) | 0.69 MB |

![Share of text smaller than 12 px on a phone](comparison-assets/current/small-text-phone.png)

**Credit to the current site:** its layout does not break on any device. Its weaknesses on phones are small text, heavy pages and small tap targets, not broken layouts.

**Tap targets:** averaging the same measure (links and buttons smaller than 24 × 24 px), the current site has 22.6 per page on a phone, and **110** on the Staff page, where every teacher's name is a link. The new site has 16.4 per page. These are text links in the footer and menu lists, which are 20 px tall but spaced apart, and the hidden "skip to content" link. That meets WCAG 2.2's spacing exception, and axe's target-size check passes on every page.

### Phone menu

![Phone menu on both sites](comparison-assets/current/menu-phone.jpg)

| | Current site | New site |
|---|---|---|
| Menu button | 45 × 29 px | 44 × 44 px (the size Apple recommends; Google's Material guidelines say 48 dp) |
| Menu items | 9 sections; 6 open sub-menus | 8 sections; 4 open sub-menus |
| Quick actions inside the menu | None | Apply for admission, Pay fee online, Online registration, Call, Email |
| Behaviour | Side drawer | Full-screen sheet; the page behind is locked; Escape closes it; keyboard focus stays inside |

---

## 6. Accessibility

| | Current site | New site |
|---|---|---|
| Google Lighthouse accessibility score (15 pages, phone) | **85** on average (80–88) | **100** on every page |
| axe-core WCAG 2.1 A/AA errors, phone, all pages | **122** errors on 24 pages | **0** on 30 pages (also 0 on tablet and computer) |
| axe-core WCAG 2.0–2.2 A/AA **and best practice**, phone and computer | not run | **0** on all 30 pages |
| Keyboard use | not tested | every control reachable; focus outline visible at every stop; "skip to main content" link ([section 13](#13-test-results-for-the-new-site)) |
| "Reduce motion" device setting | not tested | respected: movement animations stop |
| Page language declared | `en-US` | `en-IN` |

**What axe found on the current site (phone):**

| Problem | Seriousness | Pages | Elements |
|---|---|---|---|
| Text with too little contrast against its background | serious | 24 | 74 |
| Links with no readable text (icon-only or empty) | serious | 24 | 34 |
| Images marked as pictures with no description | serious | 1 | 8 |
| Buttons with no readable text | **critical** | 1 | 2 |
| Hidden element that can still receive keyboard focus | serious | 2 | 2 |
| Scrolling area that a keyboard cannot reach | serious | 1 | 1 |
| Menu or list structure broken for screen readers | **critical** | 1 | 1 |

**Against the world:** the [WebAIM Million 2025](https://webaim.org/projects/million/2025) report tested the home pages of the top one million websites and found detectable WCAG 2 failures on **94.8%** of them, averaging **51 errors per home page**. The most common failure was low-contrast text, on 79.1% of home pages, which is also the current site's most common problem.

The new site is among the minority with no detectable errors. Note that WebAIM uses a different tool (WAVE), and that no automated tool can prove a site fully accessible.

---

## 7. Everyday tasks: how many taps

These are the minimum taps on a phone, starting from the home page and counted from each site's menus and buttons. Scrolling is not counted.

| Task | Current site | New site |
|---|---|---|
| **See the fee for Class V for all four quarters** | **7**: Menu → open Admission → Fee structure → Class V → Quarter 2 → Quarter 3 → Quarter 4 (one quarter is shown at a time) | **2**: "Fee Structure" button on the home page → Class V. All four quarters and the session total are on one screen. |
| **Pay the school fee online** | **1** from the home page ("School Fee Payment" card). From any other page: **4** (Menu → open Admission → Instructions For Online Fee → Pay now) | **2** from any page (Menu → Pay fee online), or **1** from the footer of any page |
| **Start online registration** | **2** from any page: "Online Registration" in the top bar → instructions → "Apply Online Registration" | **2** from the home page ("Online Registration" button → "Open registration portal"), **3** from the menu, or **1** from the footer of any page. **About equal.** |
| **Find a teacher's qualifications** | Menu → open About Us → Teachers & Office Staff, then scroll through all 94 cards. There is no search. | Menu → open About Us → Staff, then type the name (the list filters as you type) or tap a department |
| **See every photo of one event** | Menu → open Gallery → Photo Gallery → album → viewer | Menu → Gallery → album → viewer with "Photo 3 of 64", thumbnails, keyboard arrows and zoom |
| **Read a notice's PDF** | Menu → Notification → notice | Menu → Notifications → "Read the notice (PDF)". **Equal.** The new site hosts the PDF itself. |
| **Call the school** | Tap a number in the footer | Menu → Call, or tap a number in the footer, on the contact page or in the admission section |

On the current site, tapping a section's name in the phone menu (for example "Admission") opens that page rather than its sub-menu, so reaching a sub-page means finding the small arrow beside the name.

---

## 8. Design and user experience

### 8.1 Measured against today's standards

| Standard used across the industry | Current site | New site |
|---|---|---|
| **WCAG 2.2 AA** (W3C accessibility standard) | 122 automated failures; 16.6% of phone text under 12 px | 0 automated failures; no text under 12 px |
| **Google Core Web Vitals** | Phone: main content 10–34 s, content jumps on computers (CLS 0.25 average) | Phone: 3.4–4.6 s in the simulated test; no content jumping on any page |
| **Touch-target size** (Apple 44 pt, Google 48 dp, WCAG 2.2 minimum 24 px) | Menu button 45 × 29 px; 110 small targets on the Staff page | Menu button 44 × 44 px; WCAG 2.2 target check passes |
| **Respect "reduce motion"** (WCAG 2.3.3, iOS/Android settings) | not tested | Movement animations stop when the setting is on |
| **Mobile-first layout** | Desktop elements carried onto phones (e.g. the two-line dark top bar above the logo) | Layouts designed per screen size; checked at 40 widths from 320 px to 2560 px |
| **Readable addresses and clear page titles** | `?page_id=` numbers; no page descriptions | Readable paths; unique title and description per page |

### 8.2 Consistency

- **Current site:**
  - Pages built at different times look different. History uses a navy-and-gold card design, Staff uses blue frames with underlined names, and Notifications uses a dark purple card.
  - The pages between them request **9 different Google font families** (Alegreya SC, Caprasimo, Nunito, Oswald, Poppins, Prata, Raleway, Roboto, Roboto Slab).
  - Several pages use emoji pictures as icons (the Pay fee online page loads 28 emoji images).
- **New site:**
  - One green-and-gold colour system and three fonts (Inter for text, Outfit and Plus Jakarta Sans for headings).
  - One icon set (Lucide, drawn as SVG).
  - The same page-header design on every page: the green hero with its title, a short line of description, a back link and a page-specific motif.

### 8.3 What makes it easier to use

| | Current site | New site |
|---|---|---|
| Finding staff | Scroll through 94 cards | Search box and department filters |
| Finding a pass-out batch | Scroll through a carousel of 50 photos | Search box and a bar of years to jump to; 68 photos in 46 batches |
| Gallery | Album covers open a lightbox | 24 albums with photo counts, category filters, a full-screen viewer with thumbnails, arrow keys and zoom; 3 school videos that load from YouTube only when played |
| Fee structure | One class, one quarter at a time; LKG–VIII | One class at a time with all four quarters and the session total; LKG–VIII **and XI**; the one-time admission fee explained |
| Online fee and registration | Long instruction pages with emoji | Numbered step-by-step guides, the "which month to select" table, and clear warnings (failed payment, duplicate payment, wrong fines) |
| Student council | Current session only | Sessions 2023–2026 with a session switcher |
| Toppers | Current session only | Four sessions each for Class 10 and Class 12, ties ranked fairly (two students on 97.50% are both 2nd) |
| Forms | Careers form with file upload and a sum-based captcha | The enquiry form checks every field and **never says "submitted" unless the message was really sent**. Today it prepares an email to the school. |
| Calendar | A generic Indian and world holiday widget, which showed "Holiday data could not be loaded" during the audit | The school's published calendar, with a clear notice that the current session's calendar has not been published yet |
| Getting back | No back links on sub-pages | A "Back to …" link on sub-pages; breadcrumbs for search engines |
| Motion | Plugin sliders and a marquee photo strip that keeps moving | Gentle entrance animations and hover feedback, which stop when the device asks for reduced motion |

### 8.4 For the people who maintain it

| | Current site | New site |
|---|---|---|
| Platform | WordPress 7.1.3 + Elementor 4.3.5 page builder on the "Twenty Twenty" theme, LiteSpeed shared server | Next.js 14 (React) and TypeScript, Tailwind CSS; every page pre-built at build time |
| Add-ons that need updating | **10 plugins**: Elementor, Elementor Pro, ElementsKit Lite, Element Pack, Prime Slider Lite, Popup Maker, Site Kit by Google, Header Footer Elementor, FileBird, WPForms | **7 runtime packages**, compiled into the site |
| Home page code | 422 KB of HTML with 48 `<script>` and 49 stylesheet tags; 1,220 page elements | 0.47 MB in total for the whole page; 976 page elements |
| Where content lives | In the WordPress database, edited through the page builder | In plain, typed data files (`school.ts`, `fees.ts`, `toppers.ts`, `gallery.ts`). A wrong entry fails the build instead of breaking the live site. |
| Editing in a browser | **Yes** (WordPress dashboard) | **No**: a developer edits the files. The code is structured so that a content-management system can be connected later. |
| Change history and backup | Depends on the host | Every change is recorded in Git and kept on GitHub; any earlier version can be restored |
| Checks before a change goes live | None | TypeScript, the linter and a full production build must pass; an automated test suite exists ([section 13](#13-test-results-for-the-new-site)) |
| Documentation | None found | `README.md`, `DEVELOPMENT.md` (developers), `UPDATION.md` (step-by-step updates), `live-site-port.md` (where every piece of content came from) |
| Size of the code | (not applicable) | 109 source files, about 17,500 lines, 25 shared components |

---

## 9. Being found on Google

| | Current site | New site |
|---|---|---|
| Google Lighthouse SEO score (15 pages) | **91** average (home page 83) | **100** on every page |
| Page descriptions for search results | **0 of 24** pages | **30 of 30**, each unique, 110–160 characters, mentioning Sidhpur/Dharamshala |
| Main heading (H1) | missing on **10 of 24** pages (Home among them), and 2 on one page | exactly one on every page |
| Page titles | 24 unique | 30 unique, each ending in the school's name, all 60 characters or fewer |
| Canonical address | Yes (credit) | Yes |
| `sitemap.xml` / `robots.txt` | **Neither exists** (both return "not found") | Both generated automatically. The sitemap lists all 30 pages and **615 photos** for Google Images. |
| Structured data (lets Google show the school's details) | None | School (address, phones, email, office hours, map, parent organisation), Website, and a breadcrumb trail on every page |
| Link previews (WhatsApp, Facebook, X) | None | A preview card on every page: title, description and a 1200 × 630 image of the campus and logo |
| Web addresses | `?page_id=10136` | `/admission/fee-structure` |
| Moving to the new site without losing rankings | n/a | **All 25 old `?page_id=` addresses, the staff links and the two PDF links redirect permanently to their new pages**, so bookmarks and Google results keep working after the switch |

---

## 10. Reliability, safety and maintenance

### 10.1 Problems on the current site, all checked on 20 October 2026

| Finding | Where | Why it matters |
|---|---|---|
| The fee portal's **default password is printed on a public page** | Instructions For Online Fee (`?page_id=782`) | Anyone can try it on any account that still uses it (the password is deliberately not repeated here) |
| The site's interface **publicly lists its user accounts**, including one named **"admin"** | `/?rest_route=/wp/v2/users` | Gives attackers half of a login. Common on WordPress and easy to switch off. |
| A filled-in registration form with a **parent's name and phone number** is publicly downloadable | Media library, `output.pdf` | Personal data on the open internet |
| **No security headers** (no HTTPS enforcement header, no content security policy, no framing protection) | Every page | Basic protections modern browsers rely on |
| A draft page is public, showing raw code (`[wpdatatable id=7]`), 20 missing images and 20 JavaScript errors | "Important Grid Use" (`?page_id=3562`) | Visible to anyone who finds it |
| A link to a page that does not exist ("Our Aims", HTTP 404) | `?page_id=717` | Broken link |
| A chart labelled *"Illustrative figures for demonstration, not verified school records"* | Admission page | Unverified figures on an official page |
| 3 of the 5 notification slots say "Coming Soon"; the newest real notice is from 2025 | Notifications | Looks unmaintained |
| The calendar is a generic holiday widget, which failed to load during the audit | Calendar | No school dates |
| The anthem "video" is the page builder's stock "Video Placeholder" | Prayer and Anthem | Not a recording of the anthem |
| 21 failed downloads and 6 broken images, mostly on the draft page; `/favicon.ico` missing | Device audit | |
| The server takes **1.4–2.9 s** to start sending each page | Every page | Delay before anything can happen, on every visit |

### 10.2 Robustness by design

| | Current site | New site |
|---|---|---|
| Work done by the server for each visit | WordPress (PHP and a database) plus 10 plugins build every page | Nothing: pages are finished files, served as they are |
| What needs regular security updates | WordPress core, 10 plugins and a theme | The site's packages, updated and checked when the site is rebuilt |
| If an update breaks something | It breaks on the live site (the raw shortcode above is an example) | The build fails and the old version stays live |
| Login and admin area on the public site | Yes (`/wp-admin`) | None |
| Servers each page loads files from | 7 on average: the site's own plus others such as Google Fonts, Google Tag Manager, Cloudflare CDN and WordPress.org | 1, the site's own (YouTube loads only when a video is played) |
| Security headers | None | 4 (no content-type guessing, referrer policy, framing protection, camera/microphone/location blocked) |

---

## 11. Content: everything the current site has, and more

Every one of the current site's 24 pages was read in full and its 888 media files were catalogued (record: `live-site-port.md`).

| On the current site | On the new site |
|---|---|
| Principal Sr. Gracy M.D and her full message | Same, with the ten-part message laid out by theme |
| Head Boy Udit Thakur and Head Girl Mehul Dhiman (2026–27), full messages | Same |
| Office bearers, session 2026 | Same, plus 2023–2025. The 2025 list was **corrected** from the school's signed document. |
| 94 staff with photos | 95 including the principal; every one with a real photo (9 placeholders replaced) |
| ICSE and ISC toppers 2025–26 | Same, plus three earlier sessions for each class |
| Fee structure 2026–27, LKG–VIII | Same, **plus Class XI**, from the school's own fee slips |
| Online registration and online fee instructions, with portal links | Both, as step-by-step guides. The default password is left out. |
| School app (Android, iOS) and alumni registration links | In the footer of every page, the menu, the fee guide and the pass-out page |
| Photo gallery: 23 albums, 371 photos | **24 albums, 414 photos**, including 43 more from the school's own media library |
| Video gallery: 3 YouTube videos | Same 3 videos, which load only when played |
| Pass-out batches: 50 photos, newest batch 2020–21 | 68 photos in 46 batches, including the 2021–22 to 2024–25 batches that the current page does not show |
| History, aims, rules, uniform, leave, syllabus, contact | All covered. Facts were updated where the current site is newer (e.g. office hours 8:00 AM – 2:30 PM, 24,000+ library books). |
| Notices with PDFs | Same; the PDFs are hosted by the new site so they survive the switch |
| Careers form with resume upload | A careers section that explains how to email a resume |
| Embedded Google map | A precise directions link (map code 59R3+G4 Sidhpur) |

---

## 12. Where the new site is weaker, and what is still open

| Issue | Measured | What would fix it |
|---|---|---|
| **No browser-based editing.** Office staff cannot change the site themselves the way they can with WordPress. | — | Either the developer updates the data files, which costs nothing to run, or a content-management system is connected later; the code is structured for it. **A decision for the school.** |
| **Pass-out batches page is busy on low-end phones** | Phone speed score 57 (current site 56); blocking time 889–1,617 ms across 3 runs (current site 0 ms). On a computer it scores 98. | Lighter animation on the 46 batch sections, and loading the photo list in parts |
| Phone "main content" time is in Google's "needs improvement" band | 3.4–4.6 s in Lighthouse's simulated slow phone; 5 pages just over 4 s | Partly hosting (a fast server or CDN); partly the entrance animations on page headings, which delay when the headline first shows. These were kept on purpose for the site's look and feel. |
| "Ranked · Top School" badge on the home page | No source for this claim | Confirm with the school, or remove |
| "15+ Years Experience" and "5000+ Students Guided" on the principal's card (Staff page) | No source for these figures | Confirm with the school, or remove |
| Not online yet | — | Choose hosting (section 15) |
| Not tested | Safari, Firefox, real phones, screen readers used by people | Test on real devices before launch |

---

## 13. Test results for the new site

All run on 20 October 2026 against the same production build that was speed-tested.

| Test | Result |
|---|---|
| Accessibility, axe-core WCAG 2.0–2.2 A/AA + best practice, all 30 pages at phone and computer size | **0 violations** (60 page checks) |
| Device audit, all 30 pages × phone, tablet and computer | 0 sideways scrolling, 0 JavaScript errors, 0 failed downloads, 0 broken images, 0 images missing alt text |
| Layout sweep, all 30 pages at **40 widths** (320–2560 px), resized live | **1,230 checks: 0 pages scrolling sideways; the header never covers a page heading.** One cosmetic flag: on the home page, the gently moving arrow on the "Read Their Full Messages" link reaches 3–5 px past its own box while it animates. Nothing is cut off. |
| Keyboard sweep, all 30 pages at phone and computer size (Tab through every control) | **3,796 Tab stops: every one shows a visible focus outline, none lands on hidden content, and every focused control scrolls into view** (re-checked with a normal pause between key presses, because the page scrolls smoothly). The first stop on every page is "Skip to main content". |
| Forms and calendar checks (validation, honest "sent" messages, calendar behaviour) | **30 of 30 passed** |
| Regression checks for the 48 issues fixed earlier | **53 passed, 14 out of date.** The 14 hardcode content from before today's update (e.g. "Sr. Archana", 92 staff, 17 "Sharma" results, the old PDF address). Each was re-checked against today's content and behaves correctly: 95 staff on both the About and Staff pages, 18 search results for "Sharma", the principal's photo present, the footer PDF opening in a new tab, and the gallery viewer closing and returning focus to its album. |
| Gallery checks the regression suite could not reach | **Passed**: 24 album cards, all lazy-loaded and optimised; no clipped titles; first screen on a phone downloads 167 KB of images; no YouTube code loads until a video is played |
| Search-engine checks, all 30 pages | Unique title and description, correct canonical address and link preview, exactly one main heading, valid structured data, no "noindex"; Lighthouse SEO 100 |
| Build and code checks | Production build passes with every page pre-built; TypeScript clean; linter reports no warnings |

---

## 14. How this helps the school

| Benefit | Based on |
|---|---|
| **Parents on phones get information about four times sooner** | Main content in 3.8 s instead of 14.5 s on a simulated mid-range phone over slow 4G; home page 4.1 s instead of 33.9 s |
| **Families use far less mobile data** | Home page 0.78 MB instead of 16.95 MB per visit; the whole site 21 MB instead of 74 MB |
| **A better first impression for prospective parents** | Home page speed score 84 instead of 37 on phones, 98 instead of 38 on computers; one consistent design on every page |
| **Easier for everyone to read and use, including people with disabilities** | 0 accessibility errors instead of 122; no text under 12 px instead of 16.6% |
| **Fewer embarrassing errors** | No draft pages, placeholder charts, "Coming Soon" notices, raw code or published passwords |
| **Safer** | No public admin login, no list of user accounts, no outside scripts on page load, security headers on every page |
| **Easier to find, and nicer to share** | A description on every page (currently none), a sitemap with 615 photos, school details for Google, preview cards on WhatsApp |
| **Nothing lost in the move** | Every old address redirects to its new page; every piece of current content is carried over |
| **Admissions in front** | "Apply now" in the header of every page; fee structure, online registration and fee payment one or two taps from the home page |
| **Lower running risk** | No WordPress, plugins or database to keep patched; every change is built and checked before it goes live, and recorded in Git |

---

## 15. What has to happen before switching

1. **Decide how content will be edited:** the developer updates the data files, or a content-management system is connected.
2. **Confirm three facts with the school:**
   - the uniform shop's name ("DCN" or "DCM");
   - the "Top School" badge and the principal card's "15+ years" and "5000+ students" figures;
   - the year of establishment (the current home page says 1972; its history says 1966, 1969 and 1970).
3. **Host the site.** As pre-built pages, it can run on a static host or CDN.
4. **Point the domain** `shsdharamshala.com` to the new site. The redirects are already in place.
5. **Register the site** in Google Search Console and submit `https://shsdharamshala.com/sitemap.xml`, and check that the school's Google Business Profile shows the same name, address, phones and hours.
6. **On the current site, until it is retired:**
   - remove the published default password;
   - delete `output.pdf`;
   - unpublish the draft page.
7. **Test on real phones** (Android and iPhone) and in Safari.

---

## Appendix A: Page mapping

| Page | Current site | New site |
|---|---|---|
| Home | `/` | `/` |
| About | `?page_id=83` | `/about` |
| Principal's message | `?page_id=1313` | `/about/principal` |
| Staff | `?page_id=6424` | `/about/staff` |
| Pass-out batches | `?page_id=718` | `/about/pass-out-batches` |
| Admission | `?page_id=702` | `/admission` |
| Online registration | `?page_id=3277` | `/admission/online-registration` |
| Fee structure | `?page_id=10136` | `/admission/fee-structure` |
| Pay fee online | `?page_id=782` | `/admission/online-fee` |
| Calendar | `?page_id=780` | `/academics/calendar` |
| Class 10 toppers | `?page_id=2097` | `/achievements/toppers/10th` |
| Class 12 toppers | `?page_id=755` | `/achievements/toppers/12th` |
| Photo gallery | `?page_id=756` | `/gallery` |
| Notifications | `?page_id=648` | `/notifications` |
| Contact | `?page_id=84` | `/contact` |

## Appendix B: Lighthouse category scores (median, phone / computer)

| Page | Accessibility | Best practices | SEO | Server response, current site (phone) |
|---|---|---|---|---|
| Home | 83/85 → 100/100 | 96/96 → 100/100 | 83/83 → 100/100 | 1.5 s |
| About | 86/87 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |
| Principal’s message | 84/86 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |
| Staff | 80/81 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 2.9 s |
| Pass-out batches | 86/88 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.5 s |
| Admission | 86/87 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.5 s |
| Online registration | 86/87 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |
| Fee structure | 87/88 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |
| Pay fee online | 87/88 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |
| Calendar | 81/84 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |
| Class 10 toppers | 86/87 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |
| Class 12 toppers | 86/87 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.5 s |
| Photo gallery | 86/87 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.5 s |
| Notifications | 82/84 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.5 s |
| Contact | 88/89 → 100/100 | 96/96 → 100/100 | 92/92 → 100/100 | 1.4 s |

## Appendix C: Raw data and sources

| File | Contents |
|---|---|
| [`comparison-assets/current/data/lh-old.jsonl`](comparison-assets/current/data/lh-old.jsonl), [`lh-new.jsonl`](comparison-assets/current/data/lh-new.jsonl) | Every Lighthouse run (90 per site) |
| [`med-old.json`](comparison-assets/current/data/med-old.json), [`med-new.json`](comparison-assets/current/data/med-new.json), [`summary-lh.json`](comparison-assets/current/data/summary-lh.json) | Medians per page and the averages above |
| [`audit-old.json`](comparison-assets/current/data/audit-old.json), [`audit-new.json`](comparison-assets/current/data/audit-new.json), [`audit-summary.json`](comparison-assets/current/data/audit-summary.json) | Device audit, every page × device |
| [`qa/`](comparison-assets/current/data/qa/) | New-site test logs: accessibility, layout sweep, keyboard sweep, forms and regression checks |
| [`pairs.txt`](comparison-assets/current/data/pairs.txt) | The page pairs used for the speed tests |

**Outside sources:**
- Google Search Central, [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals): thresholds and their role in ranking.
- HTTP Archive, [Web Almanac 2025, Performance](https://almanac.httparchive.org/en/2025/performance): share of websites meeting each Core Web Vital.
- WebAIM, [The WebAIM Million 2025](https://webaim.org/projects/million/2025): accessibility of the top one million home pages.
- StatCounter, [Desktop vs Mobile Market Share in India](https://gs.statcounter.com/platform-market-share/desktop-mobile/india): September 2026.

**Not covered by this comparison:**
- Safari and Firefox.
- Real phones (all device tests were simulated in Chrome).
- People using real screen readers.
- The new site's speed on its final host.
- Comparisons with other schools' websites.
