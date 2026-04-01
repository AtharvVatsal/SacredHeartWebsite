# Sacred Heart Senior Secondary School Website

A modern, responsive school website built with **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Sanity CMS**. This website serves as the official online presence for Sacred Heart Senior Secondary School, Sidhpur, Dharamshala.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [CMS Integration](#cms-integration)
- [Data Management](#data-management)
- [Customization](#customization)
- [Deployment](#deployment)
- [Development Scripts](#development-scripts)
- [Environment Variables](#environment-variables)
- [Image Guidelines](#image-guidelines)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## Quick Start

### Prerequisites

- **Node.js** 18.x or later
- **npm** or **yarn**
- **Sanity.io account** (for CMS functionality)

### Installation

```bash
# Clone the repository
cd shs-website

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your Sanity project ID

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **School Name** | Sacred Heart Senior Secondary School |
| **Location** | Sidhpur, Dharamshala, Himachal Pradesh |
| **Affiliation** | CISCE, New Delhi |
| **Established** | 1969 |
| **Management** | Sisters of Charity of Jesus and Mary |
| **Framework** | Next.js 14 (App Router) |
| **Current Version** | 1.0 |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.0 | App Router framework |
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.4.1 | Styling |
| **Framer Motion** | 11.0.0 | Animations |
| **Lucide React** | 0.358.0 | Icons |
| **Sanity CMS** | 3.29.0 | Headless CMS |
| **Next Sanity** | 7.0.0 | Sanity integration |
| **Next Themes** | 0.4.6 | Dark mode support |

---

## Features

### Core Features
- **Responsive Design** - Works on mobile, tablet, and desktop
- **CMS Integration** - Easy content management via Sanity.io
- **Static Fallback** - Works even without CMS connection
- **SEO Optimized** - Metadata for search engines
- **Fast Loading** - Static generation and code splitting

### UI/UX Features
- **Smooth Animations** - Framer Motion transitions
- **Parallax Effects** - Scroll-based animations
- **Glassmorphism** - Modern frosted glass effects
- **Gradient Backgrounds** - Mesh gradients
- **Interactive Elements** - Hover effects, magnetic buttons
- **Count-up Animations** - Animated statistics
- **Text Reveal** - Animated text on load

### Content Management
- **Staff Directory** - 90+ staff members with details
- **Office Bearers** - Head Boy/Girl, House Captains
- **Academic Toppers** - Class 10 & 12 toppers
- **Achievements** - School achievements and milestones
- **Gallery** - Event photo gallery
- **Notifications** - School notices and updates

---

## Project Structure

```
shs-website/
├── public/                      # Static assets
│   ├── images/                  # Images
│   │   ├── hero_photo.jpg       # Homepage hero
│   │   ├── logo_batch.png       # School logo
│   │   ├── noise.png            # Texture overlay
│   │   └── gallery/             # Gallery images
│   └── favicon.ico
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   ├── about/               # About pages
│   │   │   ├── page.tsx         # About overview
│   │   │   ├── history/         # School history
│   │   │   ├── aims/            # Mission & aims
│   │   │   ├── principal/       # Principal's message
│   │   │   ├── staff/           # Staff directory
│   │   │   ├── office-bearers/  # Student leaders
│   │   │   └── pass-out-batches/# Alumni batches
│   │   ├── academics/           # Academics pages
│   │   │   ├── page.tsx         # Academics overview
│   │   │   ├── syllabus-homework/
│   │   │   └── leave-absence/
│   │   ├── admission/           # Admission pages
│   │   │   ├── page.tsx         # Admission overview
│   │   │   ├── fee-structure/
│   │   │   ├── uniform/
│   │   │   └── rules/
│   │   ├── achievements/        # Achievements pages
│   │   │   ├── page.tsx         # Achievements overview
│   │   │   ├── toppers/         # Academic toppers
│   │   │   └── other/           # Other achievements
│   │   ├── gallery/             # Photo gallery
│   │   ├── notifications/       # School notices
│   │   ├── contact/             # Contact page
│   │   └── admin/               # Sanity CMS admin
│   │       └── [[...index]]/
│   ├── components/
│   │   ├── animations/          # Animation components
│   │   │   ├── CountUp.tsx      # Number counter
│   │   │   ├── FadeIn.tsx       # Fade in animation
│   │   │   ├── FadeInItem.tsx   # Staggered fade in
│   │   │   ├── MagneticButton.tsx # Magnetic hover effect
│   │   │   ├── ParallaxSection.tsx # Parallax scrolling
│   │   │   ├── ScaleIn.tsx      # Scale animation
│   │   │   ├── StaggerContainer.tsx # Stagger children
│   │   │   ├── TextReveal.tsx   # Text reveal animation
│   │   │   └── index.ts         # Export all
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   └── SmoothScrollProvider.tsx
│   │   ├── providers/           # React context providers
│   │   │   └── ThemeProvider.tsx
│   │   └── ui/                  # Reusable UI components
│   │       └── Section.tsx      # Section wrapper
│   ├── data/
│   │   └── school.ts            # Static fallback data
│   ├── lib/
│   │   ├── sanity.ts            # Sanity client config
│   │   ├── cms.ts               # Server-side data fetching
│   │   └── useCMS.ts            # Client-side React hooks
│   └── types/
│       └── index.ts             # TypeScript definitions
├── sanity/
│   ├── config.ts                # Sanity configuration
│   ├── client.ts                # Sanity client
│   ├── structure.ts             # Studio structure
│   └── schemas/                 # CMS content schemas
│       ├── schema.ts            # Schema exports
│       ├── staff.ts
│       ├── officeBearer.ts
│       ├── topper.ts
│       ├── galleryEvent.ts
│       ├── notification.ts
│       ├── schoolInfo.ts
│       ├── navigation.ts
│       ├── heroSection.ts
│       ├── statistic.ts
│       ├── quickLink.ts
│       ├── achievement.ts
│       ├── principalMessage.ts
│       ├── pageContent.ts
│       ├── pageSection.ts
│       ├── homePageContent.ts
│       └── websitePage.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .env.local.example
├── README.md
├── UPDATION.md
└── .gitignore
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero section, stats, quick links, principal message, facilities, achievements, notifications |
| **About** | `/about` | Overview, navigation cards, history, anthem, principal preview |
| History | `/about/history` | School history and heritage |
| Aims | `/about/aims` | Mission and objectives |
| Principal | `/about/principal` | Full principal's message |
| Staff | `/about/staff` | Complete staff directory (90+ members) |
| Office Bearers | `/about/office-bearers` | Student council and leaders |
| Pass Out Batches | `/about/pass-out-batches` | Alumni batch years |
| Academics | `/academics` | Academic information overview |
| Syllabus & Homework | `/academics/syllabus-homework` | Curriculum and assignments |
| Leave & Absence | `/academics/leave-absence` | Leave policies |
| Admission | `/admission` | Admission process and requirements |
| Fee Structure | `/admission/fee-structure` | Fee details |
| Uniform | `/admission/uniform` | Uniform guidelines |
| Rules | `/admission/rules` | School regulations |
| Achievements | `/achievements` | All achievements overview |
| Toppers | `/achievements/toppers` | Academic toppers overview |
| Class 10 Toppers | `/achievements/toppers/10th` | Class 10 board toppers |
| Class 12 Toppers | `/achievements/toppers/12th` | Class 12 board toppers |
| Other Achievements | `/achievements/other` | Sports, cultural achievements |
| Gallery | `/gallery` | Photo gallery |
| Notifications | `/notifications` | School notices |
| Contact | `/contact` | Contact form and information |

---

## CMS Integration

### For Non-Technical Users

The easiest way to update content is through the **Sanity Studio Admin Panel**.

#### Access Admin Panel

1. Visit: `http://localhost:3000/admin` (or `/admin` on deployed site)
2. Login with your Sanity.io account

#### What You Can Manage

| Content Type | Fields |
|-------------|--------|
| **School Info** | Name, address, contact, affiliation |
| **Navigation** | Menu items, order, external links |
| **Hero Section** | Title, subtitle, CTA button |
| **Statistics** | Label, value, suffix, order |
| **Quick Links** | Title, URL, icon |
| **Staff** | Name, role, department, qualifications, photo |
| **Office Bearers** | Head Boy/Girl, captains, prefects |
| **Toppers** | Name, percentage, year, class |
| **Achievements** | Title, description, year, category |
| **Notifications** | Title, description, date, importance |
| **Gallery Events** | Name, description, category, images |
| **Principal Message** | Name, title, message |

### Setting Up CMS (First Time)

1. Go to [sanity.io](https://www.sanity.io/) and create an account
2. Create a new project: `npm create sanity@latest`
3. Copy the **Project ID** from Sanity dashboard
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. Run `npm run dev`
6. Visit `/admin` and login
7. Deploy the Studio: `npm run sanity deploy`

---

## Data Management

### How It Works

The website uses a **CMS-first with static fallback** architecture:

1. **Server Components** fetch data from Sanity CMS via `src/lib/cms.ts`
2. **Client Hooks** (`src/lib/useCMS.ts`) consume the data
3. **Static Fallback** - If CMS is unavailable, uses `src/data/school.ts`

### Main Data File (`src/data/school.ts`)

95% of content updates can be done in this single file:

| Section | Lines | Content |
|---------|-------|---------|
| `schoolInfo` | 19-40 | School name, address, contact |
| `navigation` | 42-98 | Menu structure |
| `heroSection` | 100-106 | Homepage hero |
| `statistics` | 108-114 | Stats display |
| `quickLinks` | 116-123 | Quick action links |
| `staffMembers` | 125-219 | Staff directory |
| `studentLeaders` | 221-237 | Head Boy/Girl |
| `officeBearers` | 239-313 | Student council |
| `achievements` | 315-346 | School achievements |
| `class10Toppers` | 348-358 | Class 10 toppers |
| `class12Toppers` | 360-370 | Class 12 toppers |
| `facilities` | 377-387 | School facilities |
| `notifications` | 389-419 | School notices |
| `principalMessage` | 421-426 | Principal's message |
| `schoolHistory` | 428-436 | History text |
| `schoolAnthem` | 457-477 | School anthem lyrics |
| `batchYears` | 441-446 | Alumni years |

---

## Customization

### Theme Colors

Edit in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#f0fdf4',
    // ... custom primary colors
  },
  secondary: {
    50: '#fefce8',
    // ... custom secondary colors
  },
}
```

### Adding New Pages

1. Create: `src/app/[section]/[page]/page.tsx`
2. Add to navigation: Edit `navigation` in `src/data/school.ts`
3. Optionally add metadata in `metadata.ts`

### Adding External Links

In navigation:
```typescript
{ text: 'PDF Name', href: 'https://...', external: true }
```

---

## Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import on Vercel
# Go to https://vercel.com
# Import repository
# Add environment variables:
#   - NEXT_PUBLIC_SANITY_PROJECT_ID
#   - NEXT_PUBLIC_SANITY_DATASET

# 3. Deploy
```

### Other Platforms

| Platform | Command |
|----------|---------|
| **Netlify** | `npm run build` then deploy `out/` folder |
| **Railway** | `npm run build` then `npm start` |
| **AWS** | Deploy with Docker or Node.js |

---

## Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run sanity` | Start Sanity Studio (port 3001) |

---

## Environment Variables

Create `.env.local` in project root:

```env
# Required for CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Optional (defaults work)
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

---

## Image Guidelines

### Required Images

| Image | Path | Size | Format |
|-------|------|------|--------|
| Logo | `public/images/logo_batch.png` | 512x512 | PNG |
| Hero | `public/images/hero_photo.jpg` | 1920x1080 | JPG |
| Noise Texture | `public/images/noise.png` | 100x100 | PNG (transparent) |

### Gallery Images

Place in: `public/images/gallery/[category]/`

Categories: `events/`, `sports/`, `cultural/`, `academic/`

### Photo Naming

- Staff: `[id].jpg` (e.g., `1.jpg`)
- Toppers: `[name].jpg` (e.g., `KASHISH.jpg`)
- Events: `[event-name].jpg`

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| **Images not showing** | Check path format: `/images/folder/file.jpg` |
| **CMS not loading** | Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` |
| **Build errors** | Run `npm install` and check terminal for errors |
| **TypeScript errors** | Run `npm run lint` to identify issues |
| **Changes not appearing** | Clear browser cache (Ctrl+Shift+R) |

### Getting Help

1. Check [UPDATION.md](./UPDATION.md) for detailed update guides
2. Review TypeScript types in `src/types/index.ts`
3. Check component implementations in `src/components/`

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/name`
5. Open a Pull Request

---

## License

This project is for Sacred Heart Senior Secondary School. All rights reserved.

---

## Credits

- **School:** Sacred Heart Senior Secondary School, Sidhpur
- **Location:** Dharamshala, Kangra, Himachal Pradesh
- **Affiliation:** CISCE, New Delhi
- **Management:** Sisters of Charity of Jesus and Mary
- **Founded:** 1969
- **Alumni:** Notable - Rajat Awasthi (ISRO - Chandrayaan-3 Mission)

### Built With

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Sanity.io](https://www.sanity.io/)
- [Lucide](https://lucide.dev/)

---

**Document Version:** 3.0  
**Last Updated:** March 2026  
**Maintained by:** Lead Developer
