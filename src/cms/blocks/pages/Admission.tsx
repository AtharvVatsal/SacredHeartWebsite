'use client'

// Admission page sections, moved verbatim from those pages
import { AlertCircle, CheckCircle, Scissors, Sparkles } from 'lucide-react'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import type { RuleCards as RuleCardsDef } from './admission.definitions'

const BULLET_ICON = { CheckCircle, Scissors, AlertCircle } as const

export function RuleCards({ cards, closingTitle, closingText }: BlockProps<typeof RuleCardsDef>) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {cards.map((c, i) => {
            const red = c.tone === 'red'
            const Bullet = BULLET_ICON[c.bulletIcon]
            return (
              <div key={i} className={`bg-white rounded-2xl shadow-sm border overflow-hidden card-hover${red ? ' border-red-200' : ''}`}>
                <div className={`bg-gradient-to-r ${red ? 'from-red-600 to-red-700' : 'from-primary-700 to-primary-800'} px-6 py-4 flex items-center gap-3`}>
                  <Icon name={c.icon} className={`w-5 h-5 ${red ? 'text-white' : 'text-secondary-400'}`} />
                  <h2 className="text-xl font-display font-bold text-white">{c.title}</h2>
                </div>
                <div className="p-6 space-y-4">
                  {c.intro && <p className="text-gray-700 leading-relaxed">{c.intro}</p>}
                  {c.numbered.length > 0 && (
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2 bg-gray-50 rounded-lg p-4">
                      {c.numbered.map((n, k) => (
                        <li key={k}>{n.text}</li>
                      ))}
                    </ol>
                  )}
                  {c.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {c.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3 rule-item">
                          <Bullet className={`w-5 h-5 ${c.bulletTone === 'red' ? 'text-red-600' : 'text-primary-600'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700">{b.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {c.alertTone !== 'none' && c.alert && (
                    <div className={`${c.alertTone === 'red' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'} border-2 rounded-xl p-4 relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${c.alertTone === 'red' ? 'from-red-500/5' : 'from-yellow-500/5'} to-transparent`} />
                      <div className="flex items-start gap-3 relative">
                        <AlertCircle className={`w-5 h-5 ${c.alertTone === 'red' ? 'text-red-600' : 'text-yellow-600'} mt-0.5 flex-shrink-0`} />
                        <p className={`${c.alertTone === 'red' ? 'text-red-800' : 'text-yellow-800'} font-semibold`}>{c.alert}</p>
                      </div>
                    </div>
                  )}
                  {c.note && (
                    <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-green-800 font-medium">{c.note}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {(closingTitle || closingText) && (
            <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-8 border border-primary-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Sparkles className="w-24 h-24 text-primary-900" />
              </div>
              <div className="relative">
                {closingTitle && <h3 className="text-lg font-display font-bold text-primary-900 mb-3">{closingTitle}</h3>}
                {closingText && <p className="text-gray-700 leading-relaxed font-medium">{closingText}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
