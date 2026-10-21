'use client'

// School Fee sections, moved verbatim from that page. The fee table is the site's own FeeStructure component,
// fed with the fees edited in the CMS.
import Link from 'next/link'
import { useMemo } from 'react'
import { ArrowRight, CreditCard } from 'lucide-react'
import FeeStructure from '@/components/admission/FeeStructure'
import { FadeIn } from '@/components/animations'
import type { ClassFees } from '@/data/fees'
import type { BlockProps } from '../../document/definition'
import { Icon } from '../shared/Icon'
import { Inline } from '../shared/InlineText'
import type { FeeGuidelines as GuidelinesDef, FeeTable as TableDef, WarningCard as WarningDef } from './admission.definitions'

export function FeeTable({ session, admissionFee, title, intro, otherClassesNote, classes, payTitle, payText, payButton }: BlockProps<typeof TableDef>) {
  const fees: ClassFees[] = useMemo(
    () =>
      classes.map((c, i) => ({
        id: String(i),
        label: c.label,
        categories: c.categories.map((cat) => ({
          name: cat.name,
          quarters: cat.quarters.map((q) => ({ rows: q.rows, total: q.rows.reduce((t, r) => t + r.amount, 0) })),
        })),
      })),
    [classes],
  )
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn blur>
            <FeeStructure classes={fees} session={session} admission={admissionFee} title={title} intro={intro} otherClassesNote={otherClassesNote} />
          </FadeIn>
          {payTitle && (
            <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-5 rounded-3xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-6 md:p-8 text-white shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <CreditCard aria-hidden className="w-7 h-7 text-secondary-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl">{payTitle}</h3>
                {payText && <p className="text-primary-100 mt-1">{payText}</p>}
              </div>
              {payButton.label && payButton.href && (
                <Link href={payButton.href} className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-6 py-3 rounded-full font-semibold hover:bg-secondary-300 transition-colors whitespace-nowrap">
                  {payButton.label} <ArrowRight aria-hidden size={18} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function FeeGuidelines(p: BlockProps<typeof GuidelinesDef>) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-3">{p.title}</h2>
            {p.intro && <p className="text-gray-600">{p.intro}</p>}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {p.cards.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={item.icon} className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-primary-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {p.noticeTitle && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon name="Info" className="w-6 h-6 text-yellow-900" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-900 text-lg mb-2">{p.noticeTitle}</h3>
                  <p className="text-yellow-800">
                    <Inline text={p.noticeText} />
                  </p>
                </div>
              </div>
            </div>
          )}

          {p.listTitle && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon name={p.listIcon} className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">{p.listTitle}</h3>
                  {p.listSubtitle && <p className="text-primary-200 text-sm">{p.listSubtitle}</p>}
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {p.listItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function WarningCard({ icon, title, subtitle, itemIcon, text }: BlockProps<typeof WarningDef>) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name={icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">{title}</h3>
                {subtitle && <p className="text-red-100 text-sm">{subtitle}</p>}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-red-100">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={itemIcon} className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    <Inline text={text} strongClassName="text-red-600" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
