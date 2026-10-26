'use client'

// Pay Fee Online / Online Registration sections, moved verbatim from those pages. Portal and app links and
// phone numbers come from Site settings, as on the rest of the site.
import Link from 'next/link'
import { ArrowRight, ExternalLink, Phone, QrCode, ShieldAlert, Smartphone } from 'lucide-react'
import StepGuide, { type GuideStep } from '@/components/admission/StepGuide'
import { FadeIn } from '@/components/animations'
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider'
import { telHref } from '@/lib/contact'
import type { BlockProps } from '../../document/definition'
import { Icon, ICON_COMPONENTS } from '../shared/Icon'
import type { IconName } from '../shared/icon-names'
import type {
  AppHelpBand as AppDef,
  HelpCards as HelpDef,
  InfoTiles as TilesDef,
  PortalCta as PortalDef,
  StepsGuide as StepsDef,
} from './online.definitions'

export function InfoTiles({ tiles }: BlockProps<typeof TilesDef>) {
  return (
    <section className="py-14 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
          {tiles.map((tile, i) => (
            <FadeIn key={i} blur delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-white border border-gray-100 shadow-md p-6 flex gap-4">
                <Icon name={tile.icon} className="w-8 h-8 text-primary-700 shrink-0" />
                <div>
                  <h2 className="font-display font-bold text-lg text-primary-900 mb-1">{tile.title}</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{tile.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

type Step = BlockProps<typeof StepsDef>['steps'][number]

function StepExtra({ step }: { step: Step }) {
  if (!step.tables.length && !step.chips.length) return null
  return (
    <>
      {step.tables.length > 0 && (
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {step.tables.map((table, t) => (
            <div key={t} className="rounded-xl border border-primary-100 overflow-hidden">
              <p className="bg-primary-50 px-4 py-2.5 font-semibold text-primary-900 text-sm">{table.caption}</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th scope="col" className="px-4 py-2 font-medium">{table.headA}</th>
                    <th scope="col" className="px-4 py-2 font-medium">{table.headB}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, r) => (
                    <tr key={r} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-700">{row.a}</td>
                      <td className="px-4 py-2 font-semibold text-primary-800">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      {step.chips.length > 0 && (
        <div className="mt-5">
          {step.chipsTitle && <p className="text-sm font-semibold text-primary-900 mb-2">{step.chipsTitle}</p>}
          <ul className="flex flex-wrap gap-2">
            {step.chips.map((chip, c) => (
              <li key={c} className="px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-sm text-primary-800">
                {chip.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export function StepsGuide({ anchor, background, eyebrow, title, intro, label, steps }: BlockProps<typeof StepsDef>) {
  const guide: GuideStep[] = steps.map((s) => ({
    title: s.title,
    summary: s.summary,
    icon: ICON_COMPONENTS[s.icon as IconName],
    points: s.points.map((p) => p.text),
    important: s.important || undefined,
    extra: <StepExtra step={s} />,
  }))
  const sectionClass = background === 'mint' ? 'py-16 md:py-20 bg-gradient-to-b from-primary-50 to-white scroll-mt-24' : 'pb-16 md:pb-20 bg-white'
  return (
    <section id={anchor || undefined} className={sectionClass}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn blur>
            <div className="text-center mb-12">
              {eyebrow && <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">{eyebrow}</h2>}
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">{title}</h3>
              {intro && <p className="text-gray-600 max-w-2xl mx-auto">{intro}</p>}
            </div>
          </FadeIn>
          <StepGuide steps={guide} label={label} />
        </div>
      </div>
    </section>
  )
}

type Card = BlockProps<typeof HelpDef>['cards'][number]

function HelpCard({ card }: { card: Card }) {
  const red = card.tone === 'red'
  const paragraphs = card.text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  return (
    <div className={red ? 'h-full rounded-2xl border border-red-200 bg-red-50 p-6' : 'h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'}>
      <Icon name={card.icon} className={`w-8 h-8 ${red ? 'text-red-700' : 'text-primary-700'} mb-3`} />
      <h2 className={`font-display font-bold text-lg ${red ? 'text-red-900' : 'text-primary-900'} mb-2`}>{card.title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className={`text-sm ${red ? 'text-red-950/90' : 'text-gray-700'} leading-relaxed${i < paragraphs.length - 1 ? ' mb-2' : ''}`}>
          {p}
        </p>
      ))}
      {card.items.length > 0 &&
        (red ? (
          <ul className="space-y-2 text-sm text-red-950/90 leading-relaxed">
            {card.items.map((item, i) => (
              <li key={i}>{item.text}</li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-1.5 text-sm text-gray-700">
            {card.items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <Icon name="FileText" className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5" />
                {item.text}
              </li>
            ))}
          </ul>
        ))}
      {card.note && <p className="text-xs text-gray-600 mt-3">{card.note}</p>}
    </div>
  )
}

export function HelpCards(p: BlockProps<typeof HelpDef>) {
  return (
    <section className={p.background === 'grey' ? 'py-16 bg-gray-50' : 'py-16 bg-white'}>
      <div className="container mx-auto px-4">
        <div className={`max-w-5xl mx-auto grid ${p.cards.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
          {p.cards.map((card, i) => (
            <FadeIn key={i} blur delay={i * 0.1}>
              <HelpCard card={card} />
            </FadeIn>
          ))}
        </div>
        {p.tableTitle && (
          <FadeIn blur>
            <div className="max-w-5xl mx-auto mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <Icon name={p.tableIcon} className="w-6 h-6 text-primary-700" />
                <h2 className="font-display font-bold text-lg text-primary-900">{p.tableTitle}</h2>
              </div>
              <table className="w-full text-sm">
                <caption className="sr-only">{p.tableTitle}</caption>
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">{p.headA}</th>
                    <th scope="col" className="px-6 py-3 font-medium">{p.headB}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.rows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <th scope="row" className="px-6 py-3 text-left font-semibold text-primary-900 whitespace-nowrap">{row.a}</th>
                      <td className="px-6 py-3 text-gray-700">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {p.footnote && (
                <p className="px-6 py-4 text-xs text-gray-600 border-t border-gray-100 flex gap-2">
                  <ShieldAlert aria-hidden className="w-4 h-4 shrink-0" />
                  {p.footnote}
                </p>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

export function AppHelpBand(p: BlockProps<typeof AppDef>) {
  const { onlineServices, contact } = useSiteSettings()
  return (
    <section className="py-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Smartphone aria-hidden className="w-10 h-10 text-secondary-300 mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{p.appTitle}</h2>
            {p.appText && <p className="text-gray-200 mb-6">{p.appText}</p>}
            <div className="flex flex-wrap gap-3">
              {onlineServices.androidApp && (
                <a href={onlineServices.androidApp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary-900 px-5 py-3 rounded-full font-semibold hover:bg-secondary-100 transition-colors">
                  {p.androidLabel} <ExternalLink aria-hidden size={16} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {onlineServices.iosApp && (
                <a href={onlineServices.iosApp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 px-5 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors">
                  {p.iosLabel} <ExternalLink aria-hidden size={16} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 border border-white/15 p-7">
            <Phone aria-hidden className="w-8 h-8 text-secondary-300 mb-3" />
            <h2 className="font-display font-bold text-xl mb-2">{p.helpTitle}</h2>
            {p.helpText && <p className="text-gray-200 text-sm mb-5">{p.helpText}</p>}
            <div className="flex flex-wrap gap-3">
              {contact.phones.map((phone) => (
                <a key={phone} href={telHref(phone)} className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-5 py-2.5 rounded-full font-semibold hover:bg-secondary-300 transition-colors">
                  <Phone aria-hidden size={16} /> {phone}
                </a>
              ))}
            </div>
            {p.linkLabel && p.linkHref && (
              <Link href={p.linkHref} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline hover:text-secondary-300">
                {p.linkLabel} <ArrowRight aria-hidden size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PortalCta(p: BlockProps<typeof PortalDef>) {
  const { onlineServices, contact } = useSiteSettings()
  return (
    <section className="py-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{p.title}</h2>
        {p.text && <p className="text-gray-200 mb-8 max-w-xl mx-auto">{p.text}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          {onlineServices.registrationPortal && (
            <a
              href={onlineServices.registrationPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="active:scale-95 inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg"
            >
              <QrCode aria-hidden size={18} /> {p.buttonLabel} <ExternalLink aria-hidden size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {contact.phones.map((phone) => (
            <a key={phone} href={telHref(phone)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
              <Phone aria-hidden size={16} /> {phone}
            </a>
          ))}
        </div>
        {p.footLinkLabel && p.footLinkHref && (
          <p className="mt-8 text-sm text-gray-300">
            {p.footText}{' '}
            <Link href={p.footLinkHref} className="font-semibold text-white underline hover:text-secondary-300">
              {p.footLinkLabel} <ArrowRight aria-hidden className="inline w-4 h-4" />
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
