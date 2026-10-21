'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown, Mail, MapPin, Phone, Play } from 'lucide-react'
import { FadeIn } from '@/components/animations'
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider'
import { telHref } from '@/lib/contact'
import type { BlockProps } from '../../document/definition'
import { CmsImage } from '../shared/CmsImage'
import { Icon } from '../shared/Icon'
import { Paragraphs } from '../shared/InlineText'
import { SmartLink } from '../shared/SmartLink'
import type { ButtonRow as ButtonsDef, Callout as CalloutDef, ContactCard as ContactDef, Faq as FaqDef, ImageBlock as ImageDef, ImageGallery as GalleryDef, Spacer as SpacerDef, TextBlock as TextDef, VideoEmbed as VideoDef } from './definitions'
import { SectionFrame, SectionHeader, useDark, useInColumn } from './Frame'

const compact = { background: 'white', spacing: 'compact', width: 'normal', align: 'left' } as const

/** Column items render bare inside Columns, and in a simple white section on their own */
function Standalone({ children }: { children: React.ReactNode }) {
  return useInColumn() ? <>{children}</> : <SectionFrame look={compact}>{children}</SectionFrame>
}

export function Faq({ heading, items, look }: BlockProps<typeof FaqDef>) {
  const [open, setOpen] = useState<number | null>(0)
  const dark = useDark() || look.background === 'green'
  return (
    <SectionFrame look={look}>
      <SectionHeader heading={heading} align={look.align} />
      <div className="space-y-3 text-left">
        {items.map((item, i) => {
          const expanded = open === i
          return (
            <div key={i} className={`rounded-2xl border ${dark ? 'border-white/15 bg-white/5' : 'border-gray-200 bg-white'} overflow-hidden`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  onClick={() => setOpen(expanded ? null : i)}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-lg ${dark ? 'text-white' : 'text-primary-900'}`}
                >
                  {item.question}
                  <ChevronDown aria-hidden className={`shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} size={20} />
                </button>
              </h3>
              {expanded && (
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`} className="px-5 pb-5 space-y-3">
                  <Paragraphs text={item.answer} className={dark ? 'text-primary-100 leading-relaxed' : 'text-gray-600 leading-relaxed'} strongClassName="font-bold" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </SectionFrame>
  )
}

const BUTTON = {
  green: 'bg-primary-700 text-white hover:bg-primary-800 shadow-glow',
  gold: 'bg-gradient-to-r from-secondary-500 to-secondary-400 text-primary-900 hover:shadow-glow-secondary',
  outline: 'border-2 border-primary-700 text-primary-800 hover:bg-primary-50',
} as const

export function ButtonRow({ buttons, align, look }: BlockProps<typeof ButtonsDef>) {
  const row = (
    <div className={`flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
      {buttons
        .filter((b) => b.label && b.href)
        .map((b, i) => (
          <SmartLink key={i} href={b.href} className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all ${BUTTON[b.style]}`}>
            {b.label}
          </SmartLink>
        ))}
    </div>
  )
  return useInColumn() ? row : <SectionFrame look={{ ...look, spacing: look.spacing === 'normal' ? 'compact' : look.spacing }}>{row}</SectionFrame>
}

const TONE = {
  info: { box: 'bg-primary-50 border-primary-200', icon: 'bg-primary-100 text-primary-700', title: 'text-primary-900' },
  important: { box: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200', icon: 'bg-amber-100 text-amber-700', title: 'text-amber-900' },
  success: { box: 'bg-emerald-50 border-emerald-200', icon: 'bg-emerald-100 text-emerald-700', title: 'text-emerald-900' },
} as const

export function Callout({ tone, icon, title, body, look }: BlockProps<typeof CalloutDef>) {
  const t = TONE[tone]
  const box = (
    <div className={`flex items-start gap-4 rounded-2xl border p-6 text-left ${t.box}`} role={tone === 'important' ? 'note' : undefined}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${t.icon}`}>
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        {title && <h3 className={`font-display font-bold text-lg ${t.title}`}>{title}</h3>}
        <Paragraphs text={body} className="text-gray-700 leading-relaxed" strongClassName="font-bold" />
      </div>
    </div>
  )
  return useInColumn() ? box : <SectionFrame look={look}>{box}</SectionFrame>
}

const RATIO = { original: '', landscape: 'aspect-[4/3]', square: 'aspect-square', portrait: 'aspect-[3/4]' } as const
const IMG_SHAPE = { rounded: 'rounded-3xl', square: 'rounded-none', circle: 'rounded-full' } as const

export function ImageBlock({ image, caption, shape, ratio }: BlockProps<typeof ImageDef>) {
  if (!image.src) return null
  const r = shape === 'circle' ? 'aspect-square' : RATIO[ratio]
  return (
    <Standalone>
      <figure>
        <div className={`relative overflow-hidden shadow-lg ${IMG_SHAPE[shape]} ${r}`}>
          {r ? (
            <CmsImage image={image} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          ) : (
            <CmsImage image={image} width={image.width ?? 1200} height={image.height ?? 800} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-auto" />
          )}
        </div>
        {caption && <figcaption className="mt-3 text-sm text-gray-500 text-center">{caption}</figcaption>}
      </figure>
    </Standalone>
  )
}

export function TextBlock({ title, body, size }: BlockProps<typeof TextDef>) {
  const dark = useDark()
  return (
    <Standalone>
      <div className="space-y-4 text-left">
        {title && <h3 className={`font-display font-bold text-2xl ${dark ? 'text-white' : 'text-primary-900'}`}>{title}</h3>}
        <Paragraphs text={body} className={`${size === 'large' ? 'text-lg' : ''} leading-relaxed ${dark ? 'text-primary-100' : 'text-gray-700'}`} strongClassName="font-bold" />
      </div>
    </Standalone>
  )
}

export function ContactCard(p: BlockProps<typeof ContactDef>) {
  const { contact } = useSiteSettings()
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapPlusCode)}`
  return (
    <Standalone>
      <div className="rounded-3xl bg-white border border-gray-100 shadow-lg p-7 text-left space-y-5">
        {p.title && <h3 className="font-display font-bold text-xl text-primary-900">{p.title}</h3>}
        {p.showAddress && (
          <p className="flex items-start gap-3 text-gray-700">
            <MapPin aria-hidden className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
            <span>
              {contact.address.street}, {contact.address.tehsil}
              <br />
              Distt. {contact.address.district}, {contact.address.state} {contact.address.pincode}
            </span>
          </p>
        )}
        {p.showPhones && contact.phones.length > 0 && (
          <p className="flex items-start gap-3 text-gray-700">
            <Phone aria-hidden className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
            <span className="flex flex-col">
              {contact.phones.map((ph) => (
                <a key={ph} href={telHref(ph)} className="hover:text-primary-800 hover:underline">
                  {ph}
                </a>
              ))}
            </span>
          </p>
        )}
        {p.showEmail && contact.emails[0] && (
          <p className="flex items-start gap-3 text-gray-700">
            <Mail aria-hidden className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
            <a href={`mailto:${contact.emails[0]}`} className="break-all hover:text-primary-800 hover:underline">
              {contact.emails[0]}
            </a>
          </p>
        )}
        {p.showDirections && contact.mapPlusCode && (
          <a href={mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800">
            Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
          </a>
        )}
        {p.note && <p className="text-sm text-gray-500">{p.note}</p>}
      </div>
    </Standalone>
  )
}

function youtubeId(value: string) {
  if (/^[\w-]{11}$/.test(value)) return value
  const m1 = value.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/)
  return m1?.[1] ?? ''
}

export function VideoEmbed({ heading, youtube, title, look }: BlockProps<typeof VideoDef>) {
  const [playing, setPlaying] = useState(false)
  const id = youtubeId(youtube)
  return (
    <SectionFrame look={look}>
      <SectionHeader heading={heading} align={look.align} />
      <FadeIn blur>
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-primary-950 shadow-2xl">
          {!id ? (
            <p className="absolute inset-0 grid place-items-center text-white/70">Paste a YouTube link in the settings</p>
          ) : playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // The video loads from YouTube only when someone chooses to play it
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 grid place-items-center" aria-label={`Play video: ${title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's thumbnail service, not a site image */}
              <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy" />
              <m.span whileHover={{ scale: 1.08 }} className="relative flex h-20 w-20 items-center justify-center rounded-full bg-secondary-400 text-primary-950 shadow-xl">
                <Play aria-hidden size={32} fill="currentColor" />
              </m.span>
            </button>
          )}
        </div>
      </FadeIn>
    </SectionFrame>
  )
}

const GALLERY_COLS = { '2': 'sm:grid-cols-2', '3': 'sm:grid-cols-2 lg:grid-cols-3', '4': 'sm:grid-cols-3 lg:grid-cols-4' } as const

export function ImageGallery({ heading, columns, photos, look }: BlockProps<typeof GalleryDef>) {
  return (
    <SectionFrame look={{ ...look, width: look.width === 'narrow' ? 'normal' : look.width }}>
      <SectionHeader heading={heading} align={look.align} />
      <div className={`grid grid-cols-1 ${GALLERY_COLS[columns]} gap-4`}>
        {photos
          .filter((p) => p.image.src)
          .map((p, i) => (
            <figure key={i} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                <CmsImage image={p.image} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              {p.caption && <figcaption className="mt-2 text-sm text-gray-600">{p.caption}</figcaption>}
            </figure>
          ))}
      </div>
    </SectionFrame>
  )
}

const SPACE = { small: 'h-8', medium: 'h-16', large: 'h-28' } as const
const SPACER_BG = { white: 'bg-white', light: 'bg-gray-50', mint: 'bg-primary-50', gold: 'bg-secondary-50', green: 'bg-primary-900' } as const

export function Spacer({ size, line, background }: BlockProps<typeof SpacerDef>) {
  return (
    <div aria-hidden className={`${SPACE[size]} ${SPACER_BG[background]} flex items-center`}>
      {line && <div className="container mx-auto px-4"><div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" /></div>}
    </div>
  )
}
