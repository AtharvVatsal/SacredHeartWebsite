'use client'

import { m } from 'framer-motion'
import Section from '@/components/ui/Section'
import { CountUp, FadeInItem, StaggerContainer } from '@/components/animations'
import { parseStatValue } from '@/lib/stats'
import type { BlockProps } from '../../document/definition'
import type { StatsRow as Def } from './definitions'

export default function StatsRow({ stats }: BlockProps<typeof Def>) {
  return (
    <div className="relative z-20 py-10 bg-gray-50">
      <Section className="bg-transparent !py-0">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" delay={0.2}>
            {stats.map((stat, index) => {
              const { end, decimals, unit } = parseStatValue(stat.value)
              return (
                <FadeInItem key={index} direction="up" blur>
                  <m.div
                    className="text-center group glass p-6 rounded-2xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="text-4xl md:text-5xl font-display font-bold text-primary-700 mb-2 drop-shadow-sm">
                      <CountUp end={end} decimals={decimals} suffix={unit + (stat.suffix || '')} />
                    </div>
                    <div className="text-gray-600 font-medium group-hover:text-primary-800 transition-colors">{stat.label}</div>
                  </m.div>
                </FadeInItem>
              )
            })}
          </StaggerContainer>
        </div>
      </Section>
    </div>
  )
}
