'use client'

import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FadeInItem, StaggerContainer } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { Paragraphs } from '../shared/InlineText'
import { SmartLink } from '../shared/SmartLink'
import type { CardGrid as GridDef, InfoCard as CardDef } from './definitions'
import { SectionFrame, SectionHeader, useInColumn } from './Frame'

type Style = 'white' | 'tinted' | 'green' | 'gold'

// The card looks the existing pages use
const STYLE: Record<Style, { box: string; iconBox: string; icon: string; title: string; text: string; link: string }> = {
  white: { box: 'bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200', iconBox: 'bg-primary-50 group-hover:bg-primary-600', icon: 'text-primary-600 group-hover:text-white', title: 'text-primary-900', text: 'text-gray-600', link: 'text-primary-700' },
  tinted: { box: 'bg-gradient-to-br from-primary-50 to-white border border-primary-100 shadow-sm hover:shadow-xl', iconBox: 'bg-white shadow-sm group-hover:bg-primary-600', icon: 'text-primary-700 group-hover:text-white', title: 'text-primary-900', text: 'text-gray-600', link: 'text-primary-700' },
  green: { box: 'bg-gradient-to-br from-primary-600 to-primary-800 shadow-glow hover:shadow-xl', iconBox: 'bg-white/20 backdrop-blur-md', icon: 'text-white', title: 'text-white', text: 'text-primary-100', link: 'text-secondary-300' },
  gold: { box: 'bg-gradient-to-br from-secondary-400 to-secondary-600 shadow-glow-secondary hover:shadow-xl', iconBox: 'bg-white/30 backdrop-blur-md', icon: 'text-primary-900', title: 'text-primary-900', text: 'text-primary-800 font-medium', link: 'text-primary-900' },
}

function Card({ icon, title, body, link, linkLabel, style }: { icon: string; title: string; body: string; link: string; linkLabel?: string; style: Style }) {
  const s = STYLE[style]
  const inner = (
    <m.div whileHover={{ y: -6 }} className={`group h-full rounded-3xl p-7 md:p-8 transition-all duration-300 text-left ${s.box}`}>
      {icon !== 'none' && (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${s.iconBox}`}>
          <Icon name={icon} className={`w-7 h-7 transition-colors ${s.icon}`} />
        </div>
      )}
      {title && <h3 className={`font-display font-bold text-xl mb-3 ${s.title}`}>{title}</h3>}
      <div className="space-y-3">
        <Paragraphs text={body} className={`leading-relaxed ${s.text}`} strongClassName="font-bold" />
      </div>
      {link && (
        <span className={`mt-5 inline-flex items-center gap-1.5 font-semibold ${s.link}`}>
          {linkLabel || 'Read more'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </span>
      )}
    </m.div>
  )
  return link ? (
    <SmartLink href={link} className="block h-full">
      {inner}
    </SmartLink>
  ) : (
    inner
  )
}

const COLS = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'sm:grid-cols-2 lg:grid-cols-4' } as const

export default function CardGrid({ heading, columns, cardStyle, cards, look }: BlockProps<typeof GridDef>) {
  return (
    <SectionFrame look={look}>
      <SectionHeader heading={heading} align={look.align} />
      <StaggerContainer className={`grid grid-cols-1 ${COLS[columns]} gap-6`} delay={0.1}>
        {cards.map((c, i) => (
          <FadeInItem key={i} direction="up" blur>
            <Card icon={c.icon} title={c.title} body={c.text} link={c.link} style={cardStyle} />
          </FadeInItem>
        ))}
      </StaggerContainer>
    </SectionFrame>
  )
}

export function InfoCard(p: BlockProps<typeof CardDef>) {
  const inColumn = useInColumn()
  const card = <Card icon={p.icon} title={p.title} body={p.body} link={p.link.href} linkLabel={p.link.label} style={p.style} />
  if (inColumn) return card
  return (
    <SectionFrame look={{ background: 'white', spacing: 'compact', width: 'narrow', align: 'left' }}>
      {card}
    </SectionFrame>
  )
}
