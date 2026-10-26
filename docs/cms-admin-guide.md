# Website editing guide

This guide is for the school staff who look after the website. No technical knowledge is needed. If something here does not match what you see, tell whoever looks after the website's hosting.

## 1. What you can change

- **Every page of the website**: all its text, photos, buttons, lists and links. You can also add, remove, reorder and hide sections.
- **New pages**: build them from ready-made sections that match the site's design.
- **School details used everywhere**: phone numbers, emails, address, the main menu, the header button, the footer, social links and an optional announcement bar at the top of every page.
- **Photos and documents**: a shared library of images and PDFs.

The design (colours, fonts, animations) stays the same. Each section offers a set of approved looks, so a page cannot be made to look out of place.

## 2. Signing in and accounts

- Go to **`/admin`** on the website (for example `https://www.example-school.in/admin`) and sign in with your email and password.
- Nobody can create an account by themselves. An **administrator** adds people under **People with access**. The very first administrator is created by whoever installs the website (see `cms-deployment.md`).
- After 5 wrong passwords the account is locked for 10 minutes.
- Sign out from the account menu when you use a shared computer.

### Who can do what

| | Administrator | Editor |
|---|---|---|
| Edit pages and save drafts | Yes | Yes |
| **Publish** (make changes visible to visitors) | Yes | No: an administrator reviews and publishes |
| Upload and describe photos | Yes | Yes |
| Delete pages or photos | Yes | No |
| School details, menu, footer | Yes | No |
| Add or remove people | Yes | No |

## 3. The dashboard

After signing in you see shortcuts: **Edit a page**, **Create a new page**, **Photos and files**, and (for administrators) **School details, menu and footer** and **People with access**. It also tells you how many pages have never been published.

## 4. Editing a page

1. Open **Pages** and click the page (for example *Admission*).
2. Click **Edit visually**. The page opens exactly as visitors see it, inside the editor.
3. Click any section on the page. Its settings open on the right-hand side: change the text, choose photos, add or remove list items.
4. Your changes show on the page straight away, but **visitors do not see them yet**.

### Working with sections

- **Add a section:** drag one from the list on the left onto the page. The list is grouped: *Layout*, *Text and media*, *Cards and highlights*, *Buttons and calls to action*, and sections for each part of the site.
- **Move a section:** drag it up or down, or use the outline list.
- **Duplicate or delete:** use the small toolbar above the selected section. Deleting asks you to confirm.
- **Hide a section** without deleting it: set *Show this section to visitors* to **Hide**. In the editor it stays visible but faded, with a label.
- **Only on phones / only on computers:** use *Show on* at the bottom of a section's settings.
- **Columns:** the *Columns* section holds smaller sections (cards, text, buttons, images) side by side.
- **Undo / redo:** the arrows at the top of the editor, or `Ctrl+Z` / `Ctrl+Shift+Z`.
- **Phone, tablet, computer:** the device buttons above the page show how it looks at each size.

Some sections on the school's original pages cannot be deleted (for example the enquiry form, the fee table or the staff directory), so they are not removed by accident. They can still be hidden.

### Writing text

In the larger text boxes you can use:

| Type | Result |
|---|---|
| `**important**` | **bold** |
| `==Sacred Heart==` | the site's gold highlight |
| `*phrase*` | *italic* |
| `[Contact us](/contact)` | a link (to a page on the site, `https://…`, `mailto:` or `tel:`) |
| an empty line | a new paragraph |

Anything else is shown as plain text. Pasted HTML or scripts are never run.

### Photos

- Click the photo box in a section's settings, then **choose from the library** or **upload** a new one.
- Every photo needs a short **description** (for visitors who use screen readers, and for search engines). Describe what the photo shows, for example "Students at the 2025 Annual Function".
- Accepted files: JPEG, PNG, WebP, AVIF, GIF and PDF. The website makes smaller copies automatically.
- To **replace** a photo everywhere it is used, open it under **Photos and files** and upload a new file there.
- A photo or document that is still used on a page or in the school details **cannot be deleted**. The message lists where it is used.
- **PDF notices:** upload the PDF under **Photos and files**, copy its address, and paste it into the notice's *Attached PDF* box.

## 5. Save draft, preview, publish

The label at the top of the editor shows the page's state: *Unsaved changes*, *Draft · not published yet*, *Draft saved · visitors see the older published version* or *Published · up to date*.

| Button | What it does |
|---|---|
| **Save draft** (or `Ctrl+S`) | Keeps your changes. Visitors still see the published version. |
| **Preview** | Opens the saved draft as a full page, exactly as visitors would see it. A small dark box in the corner reminds you it is a preview. |
| **Publish** (administrators) | Checks the page, then makes it live. It asks you to confirm first. Visitors see it within a few seconds. |
| **History** | Earlier versions of the page, which you can restore. |
| **Page settings** | The page's name, its address and how it appears in search results. |
| **All pages** | Back to the list. |

- If you try to leave the editor with unsaved changes, the browser warns you.
- If publishing finds a problem (for example a link that is not allowed, or a photo with no description), nothing is published. The message says which section needs attention. The version visitors see stays as it was.

### The school's original pages

Every page that existed before the editor was added (Home, About Us, Admission and so on) is in the list already, as a draft copy of the current page. **Until you publish it, visitors keep seeing the original page.** After you publish it, visitors see your version. If you ever **unpublish** it, visitors see the original page again.

## 6. History and undoing a published change

- In the editor, click **History**, open an earlier version and choose **Restore**. Then publish it.
- To take a published page back to the website's original version (for the school's original pages), use **Unpublish** on the page's admin screen.

## 7. Creating a page and changing its address

- **Pages → Create new**: give it a title and an address (for example `/sports-day-2026`). Then click **Edit visually** and add sections. A new page is not visible until it is published.
- Addresses use lower-case letters, numbers and dashes. Addresses the website already uses, or reserves (such as `/admin`), are refused.
- If you change the address of a **published page that you created**, the old address automatically forwards visitors to the new one. The addresses of the school's original pages cannot be changed.
- **Search results:** under *Page settings*, the title and description used by Google. If empty, sensible ones are made from the page.
- New pages do not appear in the main menu by themselves; add them under **Site settings → Menu**.

## 8. Site settings: school details, menu and footer (administrators)

Open **Site settings** (the dashboard card *School details, menu and footer*). It has tabs:

- **School**: name, tagline, affiliation, year established, management and principal's name. The principal's name is used wherever the site names the principal.
- **Contact**: phone numbers, emails, address and map location. These appear in the footer, on the Contact page, the call and email buttons, and the search engine information.
- **Online services**: the fee portal, registration portal, alumni form and app store addresses. Buttons such as *Pay fee online* use these.
- **Menu**: the main menu and its drop-downs.
- **Header** and **Footer**: the header button, the footer description, its quick links and the social media links.
- **Announcement**: an optional strip across the top of every page (for example "Admissions for 2027-28 are open"), with a link.

Saving here updates every page within a few seconds. Earlier versions can be restored.

## 9. Content that appears on more than one page

So that the same facts are never typed twice:

| Edit it on… | It also shows on… |
|---|---|
| **Class 10 Toppers** and **Class 12 Toppers** pages (the *Toppers by session* section) | the top five on **Achievements**, and the counts on **Board Exam Toppers** |
| **Our Staff** page (the staff directory) | "Staff Members" on **About Us**, and the counts on **Our Staff** (where a figure is set to *the number of staff*) |
| **Notifications** page | the notices on the **Home** page (unless that section is set to its own list) |
| **Site settings** | header, footer, Contact page, call and email buttons |

Changes show elsewhere once the page you edited is **published**.

## 10. Special sections

- **Banner at the top of a page**: *Banner style* chooses one of the looks used on the site's pages (for example "As on Our Aims"). Choose *Custom* to set the details yourself. *Words in gold after the title* adds the gold highlight seen on some pages.
- **Fee structure**: classes, then categories (for example *New admission*), then quarters, then fee heads with their amounts. Quarter and year totals are worked out automatically. Change the *Session* when the new fee list is published.
- **Academic calendar**: one row per date. Write dates as `YYYY-MM-DD` (for example `2026-07-01`). The *Kind* sets the colour.
- **Gallery**: albums with a name, description, category and cover. The school's existing albums keep their photos on the server. For a **new album**, add its photos one by one under *Photos*. YouTube videos need only the video's id: in `https://www.youtube.com/watch?v=jwEzWZsKNdE` that is `jwEzWZsKNdE`.
- **Pass out batches**: a year and its photos.
- **Office bearers**: one entry per session (newest first). The first session is shown when the page opens, and only that one shows the *Read Message* buttons.
- **Contact page** and **admission enquiry form**: the forms themselves are fixed. Their wording around the form is editable, and phone numbers, emails and the address come from **Site settings**.

## 11. What is not edited here

- The design itself (new colours, fonts or layouts). Ask a developer.
- The questions on the contact and enquiry forms, and where they send messages.
- The news feed file `/notifications.rss` and the photo entries in the search engine sitemap. They still come from the original site files until a developer updates them.

## 12. If something goes wrong

- **The page looks wrong after publishing:** open *History*, restore the previous version and publish it, or unpublish the page (original pages then return to their original version).
- **"Not published because some sections need attention":** the message names the section and the field. Fix it and publish again.
- **Can't sign in:** check the email address, wait if the account was locked, or ask an administrator to reset your password.
- **Something else:** note the page address and what you did, and contact whoever looks after the website.
