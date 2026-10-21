'use client'

import Section from '@/components/ui/Section'
import { FadeIn, ParallaxSection } from '@/components/animations'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { Paragraphs } from '../shared/InlineText'
import type { HighlightStory as Def } from './definitions'

export default function HighlightStory(p: BlockProps<typeof Def>) {
  return (
    <Section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-20 relative overflow-hidden">
      <ParallaxSection offset={-50} className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn blur>
            <div className="text-center mb-10">
              {p.badge && (
                <div className="inline-flex items-center gap-2 bg-secondary-400/20 text-secondary-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  <Icon name={p.badgeIcon} size={16} />
                  {p.badge}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{p.title}</h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {/* ==highlighted== words are gold and **bold** words white, as on the original page */}
              <Paragraphs text={p.lead} className="text-lg leading-relaxed mb-4" strongClassName="font-bold" />
              <Paragraphs text={p.body} className="text-primary-200 leading-relaxed" strongClassName="font-bold" />
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
