'use client'

import type { LucideIcon } from 'lucide-react'
import { AlertTriangle } from 'lucide-react'
import { StaggerContainer, FadeInItem } from '@/components/animations'

export interface GuideStep {
  title: string
  summary: string
  icon: LucideIcon
  points: string[]
  // Something the reader must not miss, shown in an amber box under the step
  important?: string
  // Optional extra content (a table, a list of payment methods)
  extra?: React.ReactNode
}

// Numbered, vertical step-by-step guide used by the online registration and fee payment pages
export default function StepGuide({ steps, label }: { steps: GuideStep[]; label: string }) {
  return (
    <StaggerContainer className="relative space-y-6" stagger={0.06}>
      {/* Connecting line behind the step numbers */}
      <div aria-hidden className="absolute left-6 md:left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-200 via-primary-100 to-transparent" />
      <ol aria-label={label} className="space-y-6">
        {steps.map((step, index) => (
          <li key={step.title}>
            <FadeInItem direction="up">
              <div className="relative flex gap-4 md:gap-6">
                <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white font-display font-bold text-lg flex items-center justify-center shadow-lg" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0 bg-white rounded-2xl p-5 md:p-7 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <step.icon aria-hidden className="w-6 h-6 text-secondary-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary-900">
                        <span className="sr-only">Step {index + 1}: </span>{step.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-0.5">{step.summary}</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {step.points.map(point => (
                      <li key={point} className="flex gap-3 text-gray-700 leading-relaxed">
                        <span aria-hidden className="mt-2.5 w-1.5 h-1.5 rounded-full bg-secondary-500 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {step.extra}
                  {step.important && (
                    <p className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                      <AlertTriangle aria-hidden className="w-5 h-5 shrink-0 text-amber-600" />
                      <span><strong>Important:</strong> {step.important}</span>
                    </p>
                  )}
                </div>
              </div>
            </FadeInItem>
          </li>
        ))}
      </ol>
    </StaggerContainer>
  )
}
