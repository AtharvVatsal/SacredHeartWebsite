'use client'

import { m } from 'framer-motion'
import { ArrowRight, Calendar, FileText } from 'lucide-react'
import Section from '@/components/ui/Section'
import { FadeIn, MagneticButton } from '@/components/animations'
import { isSafeHref } from '../../document/fields'
import type { BlockProps } from '../../document/definition'
import { useLinkedData } from '../shared/LinkedData'
import { SmartLink } from '../shared/SmartLink'
import type { NoticesList as Def } from './definitions'

export default function NoticesList({ eyebrow, title, items: ownItems, more, source }: BlockProps<typeof Def>) {
  const linked = useLinkedData().notifications
  // The Notifications page's notices, so they are edited in one place (the list above until that page is in the CMS)
  const items =
    source !== 'own' && linked
      ? linked.map((n) => ({ date: n.date, title: n.title, text: n.description, important: n.important, attachment: n.attachment ?? '' }))
      : ownItems
  return (
    <Section className="bg-white py-24 relative overflow-hidden">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[400px] bg-gradient-to-r from-primary-50/50 via-transparent to-primary-50/50 skew-y-3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn blur>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              {eyebrow && <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3 px-4 py-1.5 bg-secondary-50 rounded-full inline-block border border-secondary-100">{eyebrow}</h2>}
              <h3 className="text-3xl md:text-5xl font-display font-bold text-primary-900 mt-4 mb-4">{title}</h3>
            </div>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto space-y-5">
          {items.map((notice, index) => (
            <FadeIn key={`notification-${index}`} delay={index * 0.1} direction="up" blur>
              <m.div
                whileHover={{ scale: 1.01, x: 4 }}
                className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
                  notice.important ? 'bg-gradient-to-r from-primary-50 to-white border-primary-200 shadow-md hover:shadow-lg' : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300'
                }`}
              >
                {notice.important && <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-secondary-400 to-secondary-600" />}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4 md:pl-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {notice.date && (
                        <span className="text-xs font-bold text-primary-800 bg-primary-50 px-3 py-1 rounded-full border border-primary-100/50 flex items-center gap-1">
                          <Calendar size={12} /> {notice.date}
                        </span>
                      )}
                      {notice.important && (
                        <m.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-secondary-100 text-secondary-700 border border-secondary-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse"></span>
                          Important
                        </m.span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{notice.title}</h4>
                    {notice.text && <p className="text-gray-600 leading-relaxed text-sm md:text-base">{notice.text}</p>}
                    {notice.attachment && isSafeHref(notice.attachment) && (
                      <a
                        href={notice.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-800 hover:text-primary-900 hover:underline"
                      >
                        <FileText aria-hidden size={15} /> Read the notice (PDF)
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </m.div>
            </FadeIn>
          ))}
        </div>

        {more.label && more.href && (
          <FadeIn delay={0.3} blur>
            <div className="text-center mt-12">
              <MagneticButton intensity={0.1}>
                <SmartLink href={more.href} className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all group px-6 py-3 rounded-full hover:bg-primary-50">
                  {more.label}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </SmartLink>
              </MagneticButton>
            </div>
          </FadeIn>
        )}
      </div>
    </Section>
  )
}
