'use client'

import { useState } from 'react'
import { Info, Receipt } from 'lucide-react'
import { classFees, feeSession, admissionFee, formatRupees, type FeeQuarter } from '@/data/fees'

// The quarter's span is the longest period among its rows ("February 2026 to March 2026" rather than "February 2026")
const quarterPeriod = (q: FeeQuarter) => q.rows.reduce((p, r) => (r.period.length > p.length ? r.period : p), '')

function QuarterCard({ quarter, index }: { quarter: FeeQuarter; index: number }) {
  const itemised = quarter.rows.length > 1
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col">
      <div className="px-5 py-4 bg-gradient-to-r from-primary-700 to-primary-800 text-white">
        <p className="font-display font-bold text-lg">Quarter {index + 1}</p>
        <p className="text-primary-100 text-sm">{quarterPeriod(quarter)}</p>
      </div>
      {itemised ? (
        <table className="w-full text-sm">
          <caption className="sr-only">Quarter {index + 1} fee heads</caption>
          <thead className="sr-only">
            <tr><th scope="col">Fee head</th><th scope="col">Amount</th></tr>
          </thead>
          <tbody>
            {quarter.rows.map(row => (
              <tr key={row.item} className="border-b border-gray-100 last:border-0">
                <th scope="row" className="text-left font-normal text-gray-700 px-5 py-2.5">
                  {row.item}
                  {row.period !== quarterPeriod(quarter) && <span className="block text-xs text-gray-500">{row.period}</span>}
                </th>
                <td className="text-right font-medium text-gray-900 tabular-nums px-5 py-2.5 whitespace-nowrap">{formatRupees(row.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="px-5 pt-5 text-sm text-gray-600">Total payable for the quarter</p>
      )}
      <div className="mt-auto px-5 py-4 bg-primary-50 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-primary-900">Quarter total</span>
        <span className="font-display font-bold text-xl text-primary-900 tabular-nums">{formatRupees(quarter.total)}</span>
      </div>
    </div>
  )
}

export default function FeeStructure() {
  const [classId, setClassId] = useState(classFees[0].id)
  const [categoryIndex, setCategoryIndex] = useState(0)
  const current = classFees.find(c => c.id === classId) ?? classFees[0]
  const category = current.categories[Math.min(categoryIndex, current.categories.length - 1)]
  const yearTotal = category.quarters.reduce((t, q) => t + q.total, 0)

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
      active ? 'bg-primary-700 text-white border-primary-700 shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
    }`

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Session {feeSession.replace('-', '–')}</h2>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">Class-wise Fee Structure</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">Choose a class to see what is payable each quarter. Fees are paid quarter by quarter, online or at PNB Sidhpur.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6" role="group" aria-label="Choose a class">
        {classFees.map(c => (
          <button
            key={c.id}
            type="button"
            aria-pressed={c.id === current.id}
            onClick={() => { setClassId(c.id); setCategoryIndex(0) }}
            className={chip(c.id === current.id)}
          >
            Class {c.label}
          </button>
        ))}
      </div>

      {current.categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Choose a category">
          {current.categories.map((c, i) => (
            <button key={c.name} type="button" aria-pressed={c === category} onClick={() => setCategoryIndex(i)} className={chip(c === category)}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite">
        <p className="text-center font-display font-bold text-xl text-primary-900 mb-6">
          Class {current.label}
          <span className="font-sans font-medium text-gray-600 text-base"> · {category.name}</span>
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {category.quarters.map((q, i) => (
            <QuarterCard key={`${current.id}-${category.name}-${i}`} quarter={q} index={i} />
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl bg-primary-900 text-white px-6 py-5">
          <span className="inline-flex items-center gap-2 font-semibold"><Receipt aria-hidden className="w-5 h-5 text-secondary-400" /> Total for the session (four quarters)</span>
          <span className="font-display font-bold text-2xl tabular-nums">{formatRupees(yearTotal)}</span>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 rounded-2xl border border-secondary-200 bg-secondary-50 p-5">
          <Info aria-hidden className="w-5 h-5 text-secondary-700 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-800 leading-relaxed">
            The <strong>Admission Fee of {formatRupees(admissionFee)}</strong> is paid only once, at the time of admission, whether a student joins LKG or any class from UKG to XI. It and other one-time admission charges are not charged again on promotion to the next class.
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <Info aria-hidden className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Fees for Classes IX, X and XII are not published on the website. Please contact the school office for them.
          </p>
        </div>
      </div>
    </div>
  )
}
