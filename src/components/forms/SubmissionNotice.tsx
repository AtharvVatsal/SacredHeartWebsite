'use client'

import { forwardRef } from 'react'
import { Mail, Phone, AlertCircle, Info } from 'lucide-react'
import { schoolEmail, schoolPhones, telHref } from '@/lib/contact'

interface SubmissionNoticeProps {
  tone: 'info' | 'error'
  title: string
  children: React.ReactNode
  mailto: string
}

// Shown when a form could not be sent from the website: says so plainly and offers the school's real contact details
const SubmissionNotice = forwardRef<HTMLDivElement, SubmissionNoticeProps>(function SubmissionNotice(
  { tone, title, children, mailto },
  ref
) {
  const Icon = tone === 'error' ? AlertCircle : Info
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-2xl border p-6 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
        tone === 'error' ? 'border-red-200 bg-red-50' : 'border-secondary-200 bg-secondary-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon aria-hidden className={`mt-0.5 h-5 w-5 shrink-0 ${tone === 'error' ? 'text-red-700' : 'text-secondary-800'}`} />
        <div className="min-w-0">
          <h3 className="font-display font-bold text-primary-900">{title}</h3>
          <div className="mt-1 text-sm text-gray-700">{children}</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={mailto}
              className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
            >
              <Mail aria-hidden size={16} />
              Open email to the school
            </a>
            {schoolPhones.map(phone => (
              <a
                key={phone}
                href={telHref(phone)}
                className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-800 hover:bg-primary-50 transition-colors"
              >
                <Phone aria-hidden size={16} />
                Call {phone}
              </a>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-700">
            School email: <a href={`mailto:${schoolEmail}`} className="font-medium text-primary-800 underline">{schoolEmail}</a>
          </p>
        </div>
      </div>
    </div>
  )
})

export default SubmissionNotice
