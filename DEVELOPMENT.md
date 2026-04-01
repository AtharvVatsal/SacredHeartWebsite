# Developer Guide

Comprehensive technical documentation for developers working on the Sacred Heart Senior Secondary School website.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Project Architecture](#2-project-architecture)
3. [Tech Stack Details](#3-tech-stack-details)
4. [Development Workflow](#4-development-workflow)
5. [Code Structure](#5-code-structure)
6. [Creating Pages](#6-creating-pages)
7. [Creating Components](#7-creating-components)
8. [Working with Data](#8-working-with-data)
9. [CMS Integration](#9-cms-integration)
10. [Styling & Theming](#10-styling--theming)
11. [Animations](#11-animations)
12. [TypeScript Types](#12-typescript-types)
13. [Testing](#13-testing)
14. [Performance](#14-performance)
15. [Security](#15-security)
16. [Advanced Topics](#16-advanced-topics)

---

## 1. Getting Started

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 18.x+ | LTS recommended |
| npm | 9.x+ | Comes with Node.js |
| Git | 2.x+ | Version control |
| VS Code | Latest | Recommended editor |

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/shs-website.git
cd shs-website

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit with your Sanity credentials
nano .env.local

# Start development server
npm run dev
```

### Common Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run sanity       # Start Sanity Studio (port 3001)
```

---

## 2. Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js App Router                     │
├─────────────────────────────────────────────────────────────┤
│  Server Components                    Client Components     │
│  ─────────────────                    ────────────────      │
│  • page.tsx (default)               • useState, useEffect   │
│  • layout.tsx                       • event handlers        │
│  • data fetching                    • animations            │
├─────────────────────────────────────────────────────────────┤
│                        Data Layer                           │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │   Sanity CMS     │──▶│  Static Fallback  │              │
│  │   (Primary)      │    │  (school.ts)     │               │
│  └──────────────────┘    └──────────────────┘               │
├─────────────────────────────────────────────────────────────┤
│                    Styling Layer                            │
│  Tailwind CSS + Custom Theme + Framer Motion                │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Page Request** → Server Component
2. **Fetch from CMS** → `src/lib/cms.ts`
3. **Fallback Check** → If CMS fails, use `src/data/school.ts`
4. **Pass to Client** → Through props
5. **Client Hooks** → `useCMS()` hooks consume data

---

## 3. Tech Stack Details

### Framework: Next.js 14

```typescript
// App Router structure
src/app/
├── page.tsx           // Homepage (Server Component by default)
├── layout.tsx         // Root layout
├── loading.tsx       // Loading UI
├── error.tsx         // Error UI
└── [section]/
    └── page.tsx      // Dynamic routes
```

Key Next.js features used:
- **App Router** - Modern routing
- **Server Components** - Default for data fetching
- **Client Components** - Use `'use client'` directive
- **Layouts** - Shared UI across pages
- **Metadata API** - SEO optimization

### Styling: Tailwind CSS

```typescript
// tailwind.config.ts
colors: {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    // ... custom colors
  },
  secondary: {
    // ... secondary colors
  }
}
```

Common utility classes:
- `container mx-auto px-4` - Centered container
- `grid grid-cols-2 md:grid-cols-4` - Responsive grid
- `text-center` - Center text
- `py-16` - Vertical padding
- `rounded-xl` - Border radius
- `shadow-lg` - Box shadow

### Animations: Framer Motion

```typescript
import { m } from 'framer-motion'

// Basic animation
<m.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</m.div>

// Variants for staggering
const container = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
```

### CMS: Sanity.io

```typescript
// src/lib/sanity.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

---

## 4. Development Workflow

### Creating a Feature

1. **Create branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make changes**
   - Edit files in `src/`
   - Test locally with `npm run dev`

3. **Run linting**
   ```bash
   npm run lint
   ```

4. **Build check**
   ```bash
   npm run build
   ```

5. **Commit**
   ```bash
   git add .
   git commit -m "Add feature description"
   ```

6. **Push**
   ```bash
   git push origin feature/feature-name
   ```

### Code Review Checklist

- [ ] No TypeScript errors
- [ ] No linting warnings
- [ ] Build succeeds
- [ ] Responsive design works
- [ ] Images optimized
- [ ] Performance acceptable

---

## 5. Code Structure

### Directory Layout

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404 page
│   ├── [section]/          # Section folders
│   │   └── page.tsx        # Section page
│   │   └── [page]/         # Sub-pages
│   │       └── page.tsx
│   └── api/                # API routes
│       └── [endpoint]/
│           └── route.ts
├── components/
│   ├── animations/         # Animation components
│   │   ├── FadeIn.tsx
│   │   ├── ParallaxSection.tsx
│   │   └── index.ts
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SmoothScrollProvider.tsx
│   └── ui/                 # Reusable UI
│       └── Section.tsx
├── data/
│   └── school.ts           # Static data
├── lib/
│   ├── cms.ts              # CMS fetch functions
│   ├── useCMS.ts           # React hooks
│   └── sanity.ts           # Sanity client
└── types/
    └── index.ts            # TypeScript types
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Pages | `page.tsx` | `about/page.tsx` |
| Components | `PascalCase.tsx` | `Header.tsx` |
| Utils | `camelCase.ts` | `cms.ts` |
| Types | `camelCase.ts` | `index.ts` |
| Styles | `camelCase.css` | `globals.css` |

---

## 6. Creating Pages

### Basic Page Structure

```typescript
// src/app/section/page.tsx
'use client'  // Add if using hooks/animations

import { m } from 'framer-motion'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import { FadeIn } from '@/components/animations'

export const metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
}

export default function PageName() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Page Title
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <Section>
        <div className="container mx-auto px-4">
          <FadeIn>
            <p>Your content here</p>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
```

### Dynamic Routes

```typescript
// src/app/achievements/toppers/[exam]/page.tsx
interface PageProps {
  params: { exam: string }
}

export default function ToppersPage({ params }: PageProps) {
  const { exam } = params
  
  return (
    <div>
      <h1>Class {exam} Toppers</h1>
    </div>
  )
}
```

### Page with Metadata

```typescript
// src/app/about/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Sacred Heart School',
  description: 'Learn about our school history, mission, and values.',
  openGraph: {
    title: 'About Us',
    description: 'Learn about our school',
    images: ['/images/about-og.jpg'],
  },
}
```

---

## 7. Creating Components

### Animation Component

```typescript
// src/components/animations/FadeIn.tsx
'use client'

import { m, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, type: 'spring' }}
      className={className}
    >
      {children}
    </m.div>
  )
}
```

### Layout Component (Header)

```typescript
// src/components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { navigation, schoolInfo } from '@/data/school'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 ${scrolled ? 'glass' : 'bg-white'}`}>
      {/* Navigation content */}
    </header>
  )
}
```

### UI Component (Section)

```typescript
// src/components/ui/Section.tsx
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}
```

---

## 8. Working with Data

### Static Data Structure

```typescript
// src/data/school.ts
export const schoolInfo: SchoolInfo = {
  name: 'Sacred Heart Sr. Sec. School',
  fullName: 'Sacred Heart Senior Secondary School',
  tagline: 'Nurturing Hearts, Shaping Futures',
  // ... more fields
}
```

### CMS Fetch Functions

```typescript
// src/lib/cms.ts
import { sanityClient } from './sanity'

export async function getSchoolInfo() {
  try {
    const data = await sanityClient.fetch(`*[_type == "schoolInfo"][0]`)
    return data || defaultSchoolInfo
  } catch (error) {
    console.warn('Failed to fetch, using default:', error)
    return defaultSchoolInfo
  }
}
```

### React Hooks

```typescript
// src/lib/useCMS.ts
import { useState, useEffect } from 'react'

export function useCMS<T>(fetchFn: () => Promise<T>, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchFn()
        setData(result)
      } catch (error) {
        setData(defaultValue)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [fetchFn, defaultValue])

  return { data, loading }
}
```

### Using in Components

```typescript
// In a client component
import { useSchoolInfo } from '@/lib/useCMS'

export default function Component() {
  const { data } = useSchoolInfo()
  
  return <h1>{data.name}</h1>
}
```

---

## 9. CMS Integration

### Adding New Schema

```typescript
// sanity/schemas/newType.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newType',
  title: 'New Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
```

### Register Schema

```typescript
// sanity/schemas/schema.ts
import newType from './newType'

export const schemaTypes = [
  newType,
  // ... other types
]
```

### Fetching Custom Content

```typescript
// src/lib/cms.ts
export async function getNewType() {
  const data = await sanityClient.fetch(`*[_type == "newType"] | order(_createdAt desc)`)
  return data
}
```

---

## 10. Styling & Theming

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { /* custom colors */ },
        secondary: { /* custom colors */ },
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(21, 128, 61, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
```

### Custom CSS

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .glass {
    @apply bg-white/80 backdrop-blur-md border border-white/20;
  }
  
  .glass-dark {
    @apply bg-black/20 backdrop-blur-md border border-white/10;
  }
}
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="
  grid grid-cols-1        // Mobile: 1 column
  md:grid-cols-2          // Tablet: 2 columns
  lg:grid-cols-4          // Desktop: 4 columns
  gap-4
">
```

---

## 11. Animations

### Available Animation Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| `FadeIn` | Fade in from direction | `<FadeIn>Content</FadeIn>` |
| `FadeInItem` | Staggered children | Inside `StaggerContainer` |
| `StaggerContainer` | Stagger animation | Wrap multiple items |
| `ParallaxSection` | Scroll parallax | `<ParallaxSection offset={100}>` |
| `CountUp` | Number counter | `<CountUp end={100} />` |
| `TextReveal` | Text reveal | `<TextReveal>Text</TextReveal>` |
| `MagneticButton` | Hover magnetic | `<MagneticButton>Button</MagneticButton>` |
| `ScaleIn` | Scale in animation | `<ScaleIn>Content</ScaleIn>` |

### Example: Staggered List

```typescript
import { StaggerContainer, FadeInItem } from '@/components/animations'

<StaggerContainer>
  <FadeInItem>Item 1</FadeInItem>
  <FadeInItem>Item 2</FadeInItem>
  <FadeInItem>Item 3</FadeInItem>
</StaggerContainer>
```

### Custom Animation

```typescript
<m.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.5, 
    delay: 0.2,
    type: 'spring',
    stiffness: 100
  }}
>
  Content
</m.div>
```

---

## 12. TypeScript Types

### Common Types

```typescript
// src/types/index.ts

// School Info
interface SchoolInfo {
  name: string
  fullName: string
  tagline: string
  affiliation: string
  established: number
  management: string
  address: Address
  contact: ContactInfo
}

interface Address {
  street: string
  tehsil: string
  district: string
  state: string
  pincode: string
  country: string
}

interface ContactInfo {
  emails: string[]
  phones: string[]
  addresses: string[]
}

// Navigation
interface NavigationItem {
  text: string
  href: string
  children?: NavigationItem[]
  external?: boolean
}

// Staff
interface StaffMember {
  id: string
  name: string
  role: string
  designation?: string
  department: string
  qualifications: string
  image?: string
}
```

### Using Types

```typescript
import type { SchoolInfo, NavigationItem } from '@/types'

const info: SchoolInfo = {
  name: 'School Name',
  // ... properties
}
```

---

## 13. Testing

### Basic Testing Commands

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build check
npm run build
```

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] Images load
- [ ] Responsive on all breakpoints
- [ ] Animations play smoothly

---

## 14. Performance

### Optimization Tips

1. **Images**
   ```typescript
   // Use Next.js Image
   import Image from 'next/image'
   
   <Image 
     src="/image.jpg" 
     alt="Description"
     width={500}
     height={300}
   />
   ```

2. **Code Splitting**
   - Use `dynamic()` for heavy components
   - Keep client components minimal

3. **Fonts**
   ```typescript
   // next/font automatically optimizes
   const inter = Inter({ subsets: ['latin'] })
   ```

---

## 15. Security

### Best Practices

1. **Environment Variables**
   - Never commit `.env.local`
   - Use `.env.local.example` as template

2. **External Links**
   ```typescript
   // Always add security attributes
   <a href="..." target="_blank" rel="noopener noreferrer">
   ```

3. **Form Handling**
   - Validate inputs server-side
   - Sanitize outputs

---

## 16. Advanced Topics

### Server Components vs Client Components

| Feature | Server | Client |
|----------|--------|--------|
| `'use client'` | No | Yes |
| Data fetching | Yes | Use hooks |
| Interactivity | No | Yes |
| SEO | Better | Good |

### Static Generation

```typescript
// Force static generation
export const dynamic = 'force-static'

// ISR - Revalidate every 60 seconds
export const revalidate = 60
```

### API Routes

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  // Process form submission
  // Send email, save to database, etc.
  
  return NextResponse.json({ success: true })
}
```

---

**Document Version:** 1.0
**Last Updated:** March 2026
