'use client'

// The green title banner used at the top of the inner pages, with the variations those pages use
// (back-link style, stacked layout, title size, glows, motif icons) as design options.
import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import HeroDecor from '@/components/layout/HeroDecor'
import type { BlockProps } from '../../document/definition'
import { ICON_COMPONENTS } from '../shared/Icon'
import type { IconName } from '../shared/icon-names'
import { Icon } from '../shared/Icon'
import type { PageHero as Def } from './definitions'

type P = BlockProps<typeof Def>

const PB = { small: 'pb-20', medium: 'pb-24', large: 'pb-28' } as const

function BackLink({ back, style }: { back: P['back']; style: P['design']['backStyle'] }) {
  if (!back.label || !back.href) return null
  if (style === 'animated') {
    return (
      <m.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <Link href={back.href} className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-all duration-300 hover:gap-3 group">
          <m.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowLeft className="w-4 h-4" />
          </m.span>
          {back.label}
        </Link>
      </m.div>
    )
  }
  if (style === 'subtle') {
    return (
      <Link href={back.href} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
        <m.div whileHover={{ x: -5 }} className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" />
          {back.label}
        </m.div>
      </Link>
    )
  }
  return (
    <Link href={back.href} className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors">
      <ArrowLeft size={16} />
      {back.label}
    </Link>
  )
}

export default function PageHero(p: P) {
  const d = p.design
  const large = d.titleSize === 'large'
  const motif = p.motif !== 'none' ? ICON_COMPONENTS[p.motif as IconName] : null
  const motifSmall = p.motifSmall !== 'none' ? ICON_COMPONENTS[p.motifSmall as IconName] : undefined

  const badge = p.badge ? (
    <m.span
      className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 ${d.stacked ? 'w-fit' : 'mb-6'}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Icon name={p.badgeIcon} className="w-4 h-4 text-secondary-400" />
      {p.badge}
    </m.span>
  ) : null

  const titleClass = `${large ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-display font-bold ${d.stacked ? 'mt-8 ' : ''}${d.titleGap === 'normal' ? 'mb-6' : 'mb-4'}`

  return (
    <section className={`relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 ${PB[d.bottomSpace]} overflow-hidden`}>
      {motif && <HeroDecor icon={motif} secondaryIcon={motifSmall} sparkles={d.sparkles} />}
      {d.glows !== 'none' && (
        <div className="absolute inset-0 overflow-hidden">
          <m.div className="absolute top-20 left-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
          <m.div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }} transition={{ duration: 5, repeat: Infinity }} />
          {d.glows === 'three' && (
            <m.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-400/5 rounded-full blur-[120px]"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          )}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {d.stacked ? (
            <div className="flex flex-col gap-4">
              <BackLink back={p.back} style={d.backStyle} />
              {badge}
            </div>
          ) : (
            <>
              <BackLink back={p.back} style={d.backStyle} />
              {badge}
            </>
          )}
          <m.h1 className={titleClass} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            {p.title}
          </m.h1>
          {p.subtitle && (
            <m.p className={large ? 'text-xl md:text-2xl text-gray-200' : 'text-xl text-gray-200'} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              {p.subtitle}
            </m.p>
          )}
        </div>
      </div>

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
