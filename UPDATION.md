# Sacred Heart Senior Secondary School - Website Update Guide

Complete guide for updating the school website. Designed for both **non-technical users** and **developers**.

---

# TABLE OF CONTENTS

1. [Quick Start](#1-quick-start)
2. [Understanding the Website](#2-understanding-the-website)
3. [Using the Admin Panel](#3-using-the-admin-panel)
4. [Editing the Data File](#4-editing-the-data-file)
5. [Updating School Information](#5-updating-school-information)
6. [Updating Contact Details](#6-updating-contact-details)
7. [Updating Navigation Menu](#7-updating-navigation-menu)
8. [Updating Homepage Content](#8-updating-homepage-content)
9. [Updating Notifications](#9-updating-notifications)
10. [Updating Staff List](#10-updating-staff-list)
11. [Updating Office Bearers](#11-updating-office-bearers)
12. [Updating Achievements & Toppers](#12-updating-achievements--toppers)
13. [Updating Facilities](#13-updating-facilities)
14. [Adding New Pages](#14-adding-new-pages)
15. [Technical Reference](#15-technical-reference)
16. [Troubleshooting](#16-troubleshooting)

---

# 1. QUICK START

## For Non-Coders - Most Common Updates

### Where to Make Changes
Navigate to this folder:
```
shs-website → src → data → school.ts
```

### Step-by-Step

1. **Open the file** using VS Code, Notepad, or TextEdit
2. **Find the section** you need (see table below)
3. **Edit the text** between quotes
4. **Save the file** (Ctrl+S or Cmd+S)
5. **Refresh the website** to see changes

## Quick Reference Table

| What to Update | Section Name | Line Number |
|---------------|--------------|-------------|
| School Name | `schoolInfo.name` | ~20 |
| Phone Numbers | `schoolInfo.contact.phones` | ~37 |
| Email Address | `schoolInfo.contact.emails` | ~36 |
| Address | `schoolInfo.address` | ~27-34 |
| Navigation Menu | `navigation` | ~43 |
| Hero Section | `heroSection` | ~100 |
| Statistics | `statistics` | ~108 |
| Quick Links | `quickLinks` | ~116 |
| Notifications | `notifications` | ~389 |
| Staff List | `staffMembers` | ~125 |
| Office Bearers | `officeBearers` | ~239 |
| Achievements | `achievements` | ~315 |
| Class 10 Toppers | `class10Toppers` | ~348 |
| Class 12 Toppers | `class12Toppers` | ~360 |
| Facilities | `facilities` | ~377 |
| Principal's Message | `principalMessage` | ~421 |
| School Anthem | `schoolAnthem` | ~457 |

---

# 2. UNDERSTANDING THE WEBSITE

## Architecture

This website uses a **CMS-first with Static Fallback** system:

```
┌─────────────────────────────────────────┐
│           Your Website                  │
│                                         │
│  ┌─────────────┐    ┌────────────────┐  │
│  │   Sanity    │ ──►│  Next.js App    │  │
│  │     CMS     │    │  (Server)       │  │
│  └─────────────┘    └───────┬────────┘  │
│                             │            │
│                      ┌──────▼────────┐   │
│                      │  React Hooks   │   │
│                      │  (Client)      │   │
│                      └───────┬────────┘   │
│                              │            │
│                      ┌──────▼────────┐   │
│                      │ Static Data   │   │
│                      │ (Fallback)    │   │
│                      └───────────────┘   │
└─────────────────────────────────────────┘
```

## File Organization

```
shs-website/
├── src/
│   ├── app/                    # Website pages (Next.js)
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About pages
│   │   ├── academics/         # Academics
│   │   ├── admission/         # Admission
│   │   ├── achievements/      # Achievements
│   │   └── ...
│   ├── components/            # Reusable parts
│   │   ├── animations/        # Animation components
│   │   └── layout/           # Header, Footer
│   ├── data/
│   │   └── school.ts         # ⭐ MAIN DATA FILE
│   └── types/                 # Type definitions
├── public/                    # Images, files
├── sanity/                    # CMS configuration
└── package.json              # Project settings
```

---

# 3. USING THE ADMIN PANEL

## What Is the Admin Panel?

The Admin Panel is a **visual editor** - no coding required! It connects to Sanity CMS and lets you:
- Add/edit/delete content
- Upload images
- Preview changes before publishing

## How to Access

1. Visit: `https://yourwebsite.com/admin`
2. Login with your Sanity account
3. Select content type from sidebar

## What You Can Manage

| Content | Fields You Can Edit |
|---------|---------------------|
| **School Info** | Name, address, phone, email, affiliation |
| **Navigation** | Menu items, links, order |
| **Hero Section** | Title, subtitle, button text |
| **Statistics** | Numbers, labels |
| **Quick Links** | Link titles, URLs |
| **Staff** | Names, roles, departments, photos |
| **Office Bearers** | Head Boy/Girl, captains, prefects |
| **Toppers** | Student names, percentages |
| **Achievements** | Titles, descriptions, years |
| **Notifications** | Titles, descriptions, dates |
| **Gallery** | Event names, photos |

## How to Update via Admin Panel

1. **Login** at `/admin`
2. **Click** on content type (e.g., "Staff")
3. **Create new** or **edit existing**
4. **Upload images** by clicking the upload button
5. **Publish** to save changes

---

# 4. EDITING THE DATA FILE

## Opening the File

### Method 1: VS Code (Recommended)
1. Download VS Code (free): https://code.visualstudio.com/
2. Open VS Code → File → Open Folder → Select `shs-website`
3. Navigate to `src/data/school.ts`

### Method 2: Notepad (Windows)
1. Navigate to folder
2. Right-click `school.ts`
3. Select "Open with" → "Notepad"

### Method 3: TextEdit (Mac)
1. Navigate to folder
2. Right-click `school.ts`
3. Select "Open with" → "TextEdit"

## Understanding the Format

```typescript
// This is a COMMENT - explains the data
export const VARIABLE_NAME = {
  field1: 'Value in quotes',    // Text value
  field2: 'Another value',      // Text value
  field3: 123,                  // Number (no quotes)
  field4: true,                 // Boolean (yes/no)
  field5: [item1, item2],       // List
  field6: {key: 'value'},      // Object
}
```

### Key Rules

1. **Text values** go in 'single quotes' or "double quotes"
2. **Numbers** go without quotes: `established: 1969`
3. **Yes/No** use `true` or `false` (no quotes)
4. **Lists** use square brackets: `[item1, item2]`
5. **Objects** use curly braces: `{field: 'value'}`
6. **End each item** with a comma (except last in list)
7. **Closing brackets matter!** Don't forget `]}` 

---

# 5. UPDATING SCHOOL INFORMATION

## Location
File: `src/data/school.ts`
Lines: ~19-40

## Current Format
```typescript
export const schoolInfo: SchoolInfo = {
  name: 'Sacred Heart Sr. Sec. School',
  fullName: 'Sacred Heart Senior Secondary School',
  tagline: 'Nurturing Hearts, Shaping Futures',
  affiliation: 'CISCE, New Delhi',
  established: 1969,
  management: 'Sisters of Charity of Jesus and Mary',
  address: {
    street: 'P.O. Sidhpur',
    tehsil: 'Dharamshala',
    district: 'Kangra',
    state: 'Himachal Pradesh',
    pincode: '176057',
    country: 'India'
  },
  contact: {
    emails: ['scjmshs.sidhpur@gmail.com'],
    phones: ['01892-222428', '86290-99633'],
    addresses: []
  }
}
```

### How to Change Each Field

| Field | Example | How to Edit |
|-------|----------|-------------|
| `name` | 'New School Name' | Change text in quotes |
| `fullName` | 'Full School Name' | Change text in quotes |
| `tagline` | 'Your New Tagline' | Change text in quotes |
| `affiliation` | 'CBSE, New Delhi' | Change text in quotes |
| `established` | 2020 | Change number (no quotes) |

---

# 6. UPDATING CONTACT DETAILS

## Location
File: `src/data/school.ts`
Lines: ~27-38

### Changing Email

```typescript
// Before
emails: ['scjmshs.sidhpur@gmail.com'],

// After
emails: ['newemail@school.com'],
```

### Adding Multiple Emails

```typescript
emails: ['primary@school.com', 'secondary@school.com'],
```

### Changing Phone Numbers

```typescript
// Before
phones: ['01892-222428', '86290-99633'],

// After  
phones: ['0123-456789', '987-6543210'],
```

### Changing Address

```typescript
address: {
  street: 'New Street Address',
  tehsil: 'New Tehsil',
  district: 'New District',
  state: 'New State',
  pincode: '123456',
  country: 'Country Name'
},
```

---

# 7. UPDATING NAVIGATION MENU

## Location
File: `src/data/school.ts`
Lines: ~42-98

## Current Format
```typescript
export const navigation: NavigationItem[] = [
  { text: 'Home', href: '/' },
  { 
    text: 'About Us', 
    href: '/about',
    children: [
      { text: 'History', href: '/about/history' },
      { text: 'Our Aims', href: '/about/aims' },
    ]
  },
  { text: 'Contact', href: '/contact' },
]
```

## Types of Menu Items

### 1. Simple Link
```typescript
{ text: 'Page Name', href: '/page-url' },
```

### 2. Dropdown (Parent with Children)
```typescript
{
  text: 'Menu Title',
  href: '/menu-url',
  children: [
    { text: 'Sub Page 1', href: '/menu/sub-page-1' },
    { text: 'Sub Page 2', href: '/menu/sub-page-2' },
  ]
},
```

### 3. External Link (PDF)
```typescript
{ text: 'Download PDF', href: 'https://example.com/file.pdf', external: true },
```

## Adding a New Menu Item

**Simple page:**
```typescript
{ text: 'Alumni', href: '/alumni' },
```

**Dropdown under About Us:**
```typescript
{
  text: 'About Us',
  href: '/about',
  children: [
    { text: 'History', href: '/about/history' },
    { text: 'New Page', href: '/about/new-page' },  // ADD THIS
  ]
},
```

---

# 8. UPDATING HOMEPAGE CONTENT

## 8.1 Hero Section

**Location:** Lines ~100-106

```typescript
export const heroSection: HeroSection = {
  title: 'Welcome to Sacred Heart Senior Secondary School',
  subtitle: 'Where Education Meets Values - Nurturing young minds since 1969',
  ctaText: 'Apply for Admission',
  ctaLink: '/admission',
}
```

| Field | What It Controls | Example |
|-------|-----------------|---------|
| `title` | Main headline | 'Welcome to Our School' |
| `subtitle` | Description | 'Excellence in Education' |
| `ctaText` | Button text | 'Enroll Now' |
| `ctaLink` | Button link | '/admission' |

## 8.2 Statistics

**Location:** Lines ~108-114

```typescript
export const statistics: Stat[] = [
  { label: 'Glorious Years', value: '56', suffix: '+' },
  { label: 'Teacher Strength', value: '112', suffix: '+' },
  { label: 'Students Strength', value: '2.6K', suffix: '+' },
  { label: 'Library Books', value: '9K', suffix: '+' },
]
```

**Updating numbers:**
```typescript
{ label: 'Glorious Years', value: '57', suffix: '+' },
```

## 8.3 Quick Links

**Location:** Lines ~116-123

```typescript
export const quickLinks: QuickLink[] = [
  { title: 'Online Registration', href: '/admission/register', icon: 'FileText' },
  { title: 'Fee Payment', href: '/admission/fee-structure', icon: 'CreditCard' },
]
```

**Available icons:** FileText, CreditCard, Calendar, Smartphone, BookOpen, Users, Award

---

# 9. UPDATING NOTIFICATIONS

## Location
File: `src/data/school.ts`
Lines: ~389-419

## Format
```typescript
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Notification Title',
    description: 'Full description of the notification.',
    date: '2025-05',
    important: true,
  },
]
```

## Fields Explained

| Field | What It Does | Example |
|-------|-------------|---------|
| `id` | Unique ID (never repeat) | '1', '2', '3' |
| `title` | Notification heading | 'Fee Structure Updated' |
| `description` | Full details | 'New fees for 2025...' |
| `date` | Month-Year | '2025-05' |
| `important` | Highlighted? | `true` or `false` |

## Adding New Notification
```typescript
{
  id: '5',
  title: 'Your Title Here',
  description: 'Your description here.',
  date: '2025-06',
  important: true,
},
```

---

# 10. UPDATING STAFF LIST

## Location
File: `src/data/school.ts`
Lines: ~125-219

## Format
```typescript
export const staffMembers: StaffMember[] = [
  { id: '1', name: 'Sr. Archana', role: 'Principal', department: 'Administration', qualifications: '' },
  { id: '2', name: 'POOJA SONI', role: 'Teacher', department: 'English', qualifications: 'MA ENGLISH, B.ED' },
]
```

## Fields

| Field | What It Shows | Example |
|-------|--------------|---------|
| `id` | Unique ID | '1', '2' |
| `name` | Staff name | 'John Smith' |
| `role` | Job title | 'Teacher', 'Principal' |
| `department` | Subject | 'English', 'Science' |
| `qualifications` | Education | 'M.Sc, B.Ed' |

## Adding New Staff
```typescript
{ id: '93', name: 'NEW TEACHER', role: 'Teacher', department: 'Mathematics', qualifications: 'M.Sc Math, B.Ed' },
```

---

# 11. UPDATING OFFICE BEARERS

## Location
File: `src/data/school.ts`
Lines: ~239-313

## Format
```typescript
export const officeBearers: OfficeBearerSession[] = [
  {
    year: '2025',
    headGirl: 'Gurnoor Kaur XII A',
    headBoy: 'Vijit Veer Chaudhary XII A',
    gamesCaptainGirls: 'Astha Sharma XII B',
    gamesViceCaptainGirls: 'Aanandi Nag XI A',
    gamesCaptainBoys: 'Rishit Sapahiya XII A',
    gamesViceCaptainBoys: 'Varnika Thakur X C',
    editorsInChief: 'Aditi Awasthi XII A',
    houseCaptains: [
      { house: 'Eagles', captain: 'Name IX C', viceCaptain: 'Name X B' },
    ],
    prefects: [
      { names: 'Name X D', house: 'Eagles' },
    ],
  },
]
```

## Updating for New Year

1. Copy the previous year's block
2. Change `year: '2025'` to `'2026'`
3. Update all names

---

# 12. UPDATING ACHIEVEMENTS & TOPPERS

## 12.1 Achievements

**Location:** Lines ~315-346

```typescript
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Chandrayaan-3 Mission',
    description: 'Rajat Awasthi, alumnus (2004)...',
    year: 2023,
    studentName: 'Rajat Awasthi',
    category: 'academic',
  },
]
```

**Categories:** 'academic', 'sports', 'cultural', 'other'

## 12.2 Class 10 Toppers

**Location:** Lines ~348-358

```typescript
export const class10Toppers: Topper[] = [
  { id: '1', name: 'KASHISH', boardExam: 'Class 10', year: 2024, percentage: 96 },
]
```

## 12.3 Class 12 Toppers

**Location:** Lines ~360-370

```typescript
export const class12Toppers: Topper[] = [
  { id: '1', name: 'PARUL ROHIT', boardExam: 'Class 12', year: 2024, percentage: 92 },
]
```

---

# 13. UPDATING FACILITIES

## Location
File: `src/data/school.ts`
Lines: ~377-387

## Format
```typescript
export const facilities: Facility[] = [
  { id: '1', name: 'Smart Classrooms', description: 'Interactive digital learning' },
  { id: '2', name: 'Computer Lab', description: 'Well-equipped computer lab' },
]
```

## Adding New Facility
```typescript
{ id: '9', name: 'Facility Name', description: 'Description here' },
```

---

# 14. ADDING NEW PAGES

## For Developers

### Step 1: Create Page File
```bash
# File location: src/app/[section]/[page-name]/page.tsx
# Example: src/app/about/alumni/page.tsx
```

### Step 2: Add Basic Template
```typescript
'use client'

import { m } from 'framer-motion'

export default function PageName() {
  return (
    <>
      <section className="bg-primary-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Page Title</h1>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Content here */}
        </div>
      </section>
    </>
  )
}
```

### Step 3: Register the page for search engines
Add an entry for the page to `routes` in `src/lib/seo.ts` (title, description, breadcrumb label, sitemap hints), then create `src/app/[section]/[page-name]/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta('/section/page-name')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```
This gives the page its title, description, canonical URL and sharing card, and adds it to `/sitemap.xml` and the breadcrumb data. Pages marked `'use client'` cannot export `metadata` themselves, which is why it lives in the layout.

### Step 4: Add to Navigation
In `src/data/school.ts`:
```typescript
{ text: 'Page Name', href: '/section/page-name' },
```

---

# 15. TECHNICAL REFERENCE

## Running the Website

```bash
# Development
npm run dev

# Production build
npm run build

# Production server
npm start

# Sanity Studio
npm run sanity
```

## Image Guidelines

| Image | Path | Size |
|-------|------|------|
| Logo | `public/images/logo_batch.png` | 512x512 |
| Hero | `public/images/hero_photo.jpg` | 1920x1080 |
| Gallery | `public/images/gallery/*` | Various |

## Color Reference

| Color | Usage |
|-------|-------|
| `primary-900` | Dark backgrounds |
| `primary-700` | Buttons |
| `secondary-400` | Accents |
| `gray-50` | Section backgrounds |

---

# 16. TROUBLESHOOTING

## Common Problems

| Problem | Solution |
|---------|----------|
| **Website not loading** | Check if you saved the file |
| **Text showing wrong** | Check quotes and commas |
| **Website crashed** | Compare with original format |
| **Changes not appearing** | Clear browser cache (Ctrl+Shift+R) |

## Getting More Help

1. Check README.md for complete documentation
2. Review types in `src/types/index.ts`
3. Check components in `src/components/`

---

**Document Version:** 2.0
**Last Updated:** March 2026
**For:** Sacred Heart Senior Secondary School Website
