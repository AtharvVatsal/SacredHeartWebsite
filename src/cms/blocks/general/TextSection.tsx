'use client'

import { FadeIn } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { Paragraphs } from '../shared/InlineText'
import type { SectionHeading as HeadingDef, TextSection as Def } from './definitions'
import { SectionFrame, SectionHeader, useDark } from './Frame'

function Body({ text }: { text: string }) {
  const dark = useDark()
  return (
    <FadeIn blur delay={0.1}>
      <div className="space-y-5">
        <Paragraphs text={text} className={`text-lg leading-relaxed ${dark ? 'text-primary-100' : 'text-gray-700'}`} strongClassName={dark ? 'font-bold text-white' : 'font-bold text-primary-900'} linkClassName={dark ? 'font-semibold text-secondary-300 underline underline-offset-2' : 'font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900'} />
      </div>
    </FadeIn>
  )
}

export default function TextSection({ heading, body, look }: BlockProps<typeof Def>) {
  return (
    <SectionFrame look={look}>
      <SectionHeader heading={heading} align={look.align} />
      <Body text={body} />
    </SectionFrame>
  )
}

export function SectionHeading({ heading, look }: BlockProps<typeof HeadingDef>) {
  return (
    <SectionFrame look={{ ...look, spacing: look.spacing }} className="!pb-0">
      <SectionHeader heading={heading} align={look.align} />
    </SectionFrame>
  )
}
