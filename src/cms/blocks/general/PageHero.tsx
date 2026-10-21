'use client'

// The green title banner used at the top of the inner pages. Each page's banner is reproduced from a recipe
// (hero-recipes.ts); the "Custom" style builds one from the individual design options.
import Link from 'next/link'
import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import HeroDecor from '@/components/layout/HeroDecor'
import type { BlockProps } from '../../document/definition'
import { ICON_COMPONENTS } from '../shared/Icon'
import type { IconName } from '../shared/icon-names'
import { Icon } from '../shared/Icon'
import type { PageHero as Def } from './definitions'
import { HERO_RECIPES, recipeFromDesign, type BackStyle, type HeroRecipe } from './hero-recipes'

type P = BlockProps<typeof Def>

const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } } }

function BackLink({ back, style }: { back: P['back']; style: BackStyle }) {
  if (!back.label || !back.href) return null
  switch (style) {
    case 'animated':
    case 'animatedStill':
      return (
        <m.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link href={back.href} className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group">
            {style === 'animated' ? (
              <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </m.span>
            ) : (
              <ArrowLeft className="w-4 h-4" />
            )}
            {back.label}
          </Link>
        </m.div>
      )
    case 'grey':
      return (
        <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href={back.href} className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {back.label}
          </Link>
        </m.div>
      )
    case 'subtle':
    case 'subtleLeft':
      return (
        <Link href={back.href} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
          <m.div whileHover={{ x: -5 }} className="flex items-center gap-2">
            {style === 'subtle' ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowLeft className="w-4 h-4" />}
            {back.label}
          </m.div>
        </Link>
      )
    case 'subtleStatic':
      return (
        <Link href={back.href} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
          <span className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {back.label}
          </span>
        </Link>
      )
    case 'subtleBare':
      return (
        <Link href={back.href} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          {back.label}
        </Link>
      )
    case 'history':
      return (
        <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href={back.href} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
            <m.div whileHover={{ x: -5 }} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {back.label}
            </m.div>
          </Link>
        </m.div>
      )
    case 'plainFit':
      return (
        <Link href={back.href} className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors w-fit">
          <ArrowLeft size={16} />
          <span>{back.label}</span>
        </Link>
      )
    case 'plainBare':
      return (
        <Link href={back.href} className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          {back.label}
        </Link>
      )
    default:
      return (
        <Link href={back.href} className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} />
          {back.label}
        </Link>
      )
  }
}

function Badge({ p, r }: { p: P; r: HeroRecipe }) {
  if (!p.badge) return null
  const b = r.badge
  const className = `inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border ${b.border === 'strong' ? 'border-white/20' : 'border-white/10'} ${b.fit ? 'w-fit' : 'mb-6'}`
  const icon = <Icon name={p.badgeIcon} className="w-4 h-4 text-secondary-400" />
  const content = (
    <>
      {b.iconMotion === 'spin' ? (
        <m.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          {icon}
        </m.div>
      ) : (
        icon
      )}
      {b.textSpan ? <span>{p.badge}</span> : p.badge}
    </>
  )
  if (b.motion === 'none') return <div className={className}>{content}</div>
  if (b.motion === 'stagger') {
    return (
      <m.div variants={staggerItem}>
        <div className={className}>{content}</div>
      </m.div>
    )
  }
  const Tag = b.tag === 'span' ? m.span : m.div
  return (
    <Tag className={className} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: b.motion === 'pop3' ? 0.3 : 0.2 }}>
      {content}
    </Tag>
  )
}

const RISE = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } }
const DELAYS = { d2: 0.2, d3: 0.3, d4: 0.4, d5: 0.5 } as const

function Rising({ as, motion, className, children }: { as: 'h1' | 'p'; motion: 'd2' | 'd3' | 'd4' | 'd5' | 'none' | 'stagger'; className: string; children: ReactNode }) {
  if (motion === 'none') return as === 'h1' ? <h1 className={className}>{children}</h1> : <p className={className}>{children}</p>
  const Tag = as === 'h1' ? m.h1 : m.p
  if (motion === 'stagger') {
    return (
      <Tag className={className} variants={staggerItem}>
        {children}
      </Tag>
    )
  }
  return (
    <Tag className={className} {...RISE} transition={{ duration: 0.8, delay: DELAYS[motion] }}>
      {children}
    </Tag>
  )
}

function Column({ r, children }: { r: HeroRecipe; children: ReactNode }) {
  const className = r.narrow ? 'max-w-3xl' : undefined
  switch (r.wrapperMotion) {
    case 'none':
      return <div className={className}>{children}</div>
    case 'stagger':
      return (
        <m.div className={className} initial="hidden" animate="visible" variants={staggerContainer}>
          {children}
        </m.div>
      )
    case 'fade20':
    case 'fade20slow':
      return (
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={r.wrapperMotion === 'fade20slow' ? { duration: 0.8 } : undefined} className={className}>
          {children}
        </m.div>
      )
    default:
      return (
        <m.div className={className} {...RISE} transition={r.wrapperMotion === 'fade30late' ? { duration: 0.8, delay: 0.2 } : { duration: 0.8 }}>
          {children}
        </m.div>
      )
  }
}

const HALO_BASE = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full'

function Glows({ r, motif, motifSmall }: { r: HeroRecipe; motif?: typeof ArrowLeft; motifSmall?: typeof ArrowLeft }) {
  if (r.glows === 'none') return null
  const Motif = motif
  const Small = motifSmall
  return (
    <div className="absolute inset-0 overflow-hidden">
      {r.glows === 'twoLarge' ? (
        <>
          <m.div className="absolute top-20 left-10 w-72 h-72 bg-secondary-500/20 rounded-full blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
          <m.div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }} transition={{ duration: 5, repeat: Infinity }} />
        </>
      ) : (
        <>
          <m.div className="absolute top-20 left-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
          <m.div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }} transition={{ duration: 5, repeat: Infinity }} />
        </>
      )}
      {(r.halo === 'spin600' || r.halo === 'spin800') && (
        <m.div
          className={`${HALO_BASE} ${r.halo === 'spin800' ? 'w-[800px] h-[800px]' : 'w-[600px] h-[600px]'} bg-secondary-400/5 blur-[120px]`}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      )}
      {r.halo === 'still150' && <div className={`${HALO_BASE} w-[600px] h-[600px] bg-secondary-500/5 blur-[150px]`} />}
      {r.halo === 'still120' && <div className={`${HALO_BASE} w-[600px] h-[600px] bg-secondary-400/5 blur-[120px]`} />}
      {r.goldFloat && Motif && (
        <m.div className="absolute top-40 right-20" animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <Motif className="w-16 h-16 text-secondary-400/20" />
        </m.div>
      )}
      {r.goldFloat && Small && (
        <m.div className="absolute bottom-40 left-32" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <Small className="w-12 h-12 text-secondary-400/20" />
        </m.div>
      )}
    </div>
  )
}

function Floating({ r, motif: Motif, motifSmall: Small }: { r: HeroRecipe; motif?: typeof ArrowLeft; motifSmall?: typeof ArrowLeft }) {
  if (r.float === 'drift') {
    return (
      <>
        {Motif && (
          <m.div className="absolute top-40 right-20 opacity-10" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Motif className="w-32 h-32 text-white" />
          </m.div>
        )}
        {Small && (
          <m.div className="absolute bottom-32 left-20 opacity-10" animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <Small className="w-24 h-24 text-white" />
          </m.div>
        )}
      </>
    )
  }
  if (r.float === 'bells') {
    return (
      <>
        {Motif && (
          <m.div className="absolute top-32 right-20 opacity-10" animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Motif className="w-24 h-24 text-white" />
          </m.div>
        )}
        {Small && (
          <m.div className="absolute bottom-40 left-20 opacity-10" animate={{ rotate: [5, -5, 5], y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Small className="w-16 h-16 text-white" />
          </m.div>
        )}
      </>
    )
  }
  return null
}

export default function PageHero(p: P) {
  const r: HeroRecipe = (p.style !== 'custom' && HERO_RECIPES[p.style]) || recipeFromDesign(p.design)
  const motif = p.motif !== 'none' ? ICON_COMPONENTS[p.motif as IconName] : undefined
  const motifSmall = p.motifSmall !== 'none' ? ICON_COMPONENTS[p.motifSmall as IconName] : undefined

  const back = <BackLink back={p.back} style={r.back} />
  const badge = <Badge p={p} r={r} />
  const titleClass = `${r.title.large ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-display font-bold ${r.title.mt8 ? 'mt-8 ' : ''}${r.title.mb}`
  const subtitleClass = `${r.subtitle.large ? 'text-xl md:text-2xl' : 'text-xl'} ${r.subtitle.tone}${r.subtitle.mb8 ? ' mb-8' : ''}`
  const highlightClass = r.highlight === 'three' ? 'from-secondary-400 via-secondary-300 to-secondary-500' : 'from-secondary-400 to-secondary-300'

  const inner = (
    <>
      {r.backPlace === 'outside' && back}
      <Column r={r}>
        {r.backPlace === 'stack' || r.backPlace === 'stack3' ? (
          <div className={`flex flex-col ${r.backPlace === 'stack3' ? 'gap-3' : 'gap-4'}`}>
            {back}
            {badge}
          </div>
        ) : (
          <>
            {r.backPlace === 'inside' && back}
            {badge}
          </>
        )}
        <Rising as="h1" motion={r.title.motion} className={titleClass}>
          {p.title}
          {p.highlight && (
            <>
              {' '}
              <span className={`bg-gradient-to-r ${highlightClass} bg-clip-text text-transparent`}>{p.highlight}</span>
            </>
          )}
        </Rising>
        {p.subtitle && (
          <Rising as="p" motion={r.subtitle.motion} className={subtitleClass}>
            {p.subtitle}
          </Rising>
        )}
      </Column>
    </>
  )

  return (
    <section className={`relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 ${r.pb} overflow-hidden`}>
      {r.decor !== 'none' && motif && <HeroDecor icon={motif} secondaryIcon={motifSmall} sparkles={r.decor !== 'decorPlain'} orbs={r.decor === 'decorOrbs'} />}
      <Glows r={r} motif={motif} motifSmall={motifSmall} />
      <Floating r={r} motif={motif} motifSmall={motifSmall} />

      {r.containerFade ? (
        <m.div className="container mx-auto px-4 relative z-10" {...RISE} transition={{ duration: 0.8 }}>
          {inner}
        </m.div>
      ) : (
        <div className="container mx-auto px-4 relative z-10">{inner}</div>
      )}

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-primary-50"
          ></path>
        </svg>
      </div>
    </section>
  )
}
