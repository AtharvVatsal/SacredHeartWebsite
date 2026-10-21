'use client'

import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { CmsImage } from '../shared/CmsImage'
import { Paragraphs } from '../shared/InlineText'
import { SmartLink } from '../shared/SmartLink'
import type { ImageText as Def } from './definitions'
import { SectionFrame, SectionHeader, useDark } from './Frame'

const SHAPE = { rounded: 'rounded-3xl', square: 'rounded-none', circle: 'rounded-full aspect-square' } as const

function Content(p: BlockProps<typeof Def>) {
  const dark = useDark()
  const imageFirst = p.imageSide === 'left'
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
      <FadeIn direction={imageFirst ? 'right' : 'left'} blur className={imageFirst ? 'lg:order-1' : 'lg:order-2'}>
        {p.image.src ? (
          <div className={`relative overflow-hidden shadow-2xl ${p.imageShape === 'circle' ? 'max-w-md mx-auto' : ''} ${SHAPE[p.imageShape]}`}>
            <div className={`relative ${p.imageShape === 'circle' ? 'aspect-square' : 'aspect-[4/3]'}`}>
              <CmsImage image={p.image} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        ) : (
          <div className="aspect-[4/3] rounded-3xl bg-gray-100" />
        )}
      </FadeIn>
      <FadeIn direction={imageFirst ? 'left' : 'right'} blur className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
        <SectionHeader heading={{ ...p.heading }} align="left" />
        <div className="-mt-6 space-y-4">
          <Paragraphs text={p.body} className={`text-lg leading-relaxed ${dark ? 'text-primary-100' : 'text-gray-600'}`} strongClassName="font-bold" />
        </div>
        {p.button.label && p.button.href && (
          <SmartLink
            href={p.button.href}
            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-primary-800 to-primary-700 text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-glow transition-all group"
          >
            {p.button.label}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </SmartLink>
        )}
      </FadeIn>
    </div>
  )
}

export default function ImageText(p: BlockProps<typeof Def>) {
  return (
    <SectionFrame look={{ ...p.look, width: p.look.width === 'narrow' ? 'normal' : p.look.width }}>
      <Content {...p} />
    </SectionFrame>
  )
}
