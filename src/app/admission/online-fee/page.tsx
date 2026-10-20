'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ExternalLink, LogIn, ListChecks, CreditCard, CalendarClock, AlertTriangle, RotateCcw, Smartphone,
  Landmark, Phone, Sparkles, ShieldAlert, Wallet,
} from 'lucide-react'
import HeroDecor from '@/components/layout/HeroDecor'
import { FadeIn } from '@/components/animations'
import StepGuide, { type GuideStep } from '@/components/admission/StepGuide'
import { onlineServices } from '@/data/school'
import { schoolPhones, telHref } from '@/lib/contact'
import { Wallet as HeroMotif, CreditCard as HeroMotifSmall } from 'lucide-react'

// Which month to select so the portal fetches the whole quarter
const monthGroups = [
  {
    classes: 'LKG to Class X',
    groups: [['February and March', 'March'], ['April, May and June', 'June'], ['July to October', 'October'], ['November to January', 'January']],
  },
  {
    classes: 'Classes XI and XII',
    groups: [['April, May and June', 'June'], ['July, August and September', 'September'], ['October to December', 'December'], ['January to March', 'March']],
  },
]

const gatewayCharges = [
  ['UPI', 'Charges are generally minimal, as UPI is a direct bank transfer.'],
  ['Net banking', 'May carry a nominal fee, depending on your bank.'],
  ['Credit card', 'Usually the highest charges, set by the payment gateway and the card issuer.'],
  ['Debit card', 'Usually lower than credit cards, though charges vary by bank.'],
]

const steps: GuideStep[] = [
  {
    title: 'Log in',
    summary: 'Open the online fee portal',
    icon: LogIn,
    points: [
      'Use the "Pay fee online" button on this page to open the portal.',
      'Enter the user name and password issued to you by the school.',
      'If you are still using the default password, change it straight after logging in with the Change Password link.',
    ],
  },
  {
    title: 'Fetch your due fees',
    summary: 'Choose the right month group',
    icon: ListChecks,
    points: [
      'Click PAY FEE NOW, the first option in the menu.',
      'Select the month up to which you want to pay. The portal shows your pending months by the quarterly schedule below.',
      'Review the fee details shown, scroll to the bottom and click PAY FEE. You will be taken to the payment gateway.',
    ],
    extra: (
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {monthGroups.map(group => (
          <div key={group.classes} className="rounded-xl border border-primary-100 overflow-hidden">
            <p className="bg-primary-50 px-4 py-2.5 font-semibold text-primary-900 text-sm">{group.classes}</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th scope="col" className="px-4 py-2 font-medium">To pay for</th>
                  <th scope="col" className="px-4 py-2 font-medium">Select</th>
                </tr>
              </thead>
              <tbody>
                {group.groups.map(([months, select]) => (
                  <tr key={months} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-700">{months}</td>
                    <td className="px-4 py-2 font-semibold text-primary-800">{select}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ),
    important: 'Check that the payable amount is right before you pay. If a fine or late fee shows before the due date, it may be a technical error: do not pay, and contact the school instead. Once the fee is paid, a wrongly charged fine or late fee cannot be refunded.',
  },
  {
    title: 'Pay and get your receipt',
    summary: 'Complete the payment securely',
    icon: CreditCard,
    points: [
      'Choose UPI, credit card, debit card or net banking, and click MAKE PAYMENT.',
      'To pay with Bharat QR on a computer: click Pay Now, scan the QR code that appears with Google Pay, PhonePe, BHIM or another UPI app, and complete the payment on your phone.',
      'Wait until the on-screen timer finishes. The receipt is generated automatically.',
      'To check your receipt later, open the school app and tap the Receipt icon.',
    ],
  },
]

export default function OnlineFeePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-28 overflow-hidden">
        <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} orbs />
        <m.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl">
            <div className="flex flex-col gap-4">
              <Link href="/admission/fee-structure" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Fee Structure
              </Link>
              <m.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-secondary-400" />
                Financials
              </m.div>
            </div>
            <m.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-8 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Pay Fee Online
            </m.h1>
            <m.p
              className="text-xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Pay the school fee safely in three steps
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href={onlineServices.feePortal}
                target="_blank"
                rel="noopener noreferrer"
                className="active:scale-95 inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-7 py-3.5 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg"
              >
                Pay fee online <ExternalLink aria-hidden size={18} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Link href="/admission/fee-structure" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all">
                See the fee structure
              </Link>
            </m.div>
          </div>
        </m.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* When and where */}
      <section className="py-14 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
            <FadeIn blur>
              <div className="h-full rounded-2xl bg-white border border-gray-100 shadow-md p-6 flex gap-4">
                <CalendarClock aria-hidden className="w-8 h-8 text-primary-700 shrink-0" />
                <div>
                  <h2 className="font-display font-bold text-lg text-primary-900 mb-1">Portal open 1st to 25th</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">The online portal is open from the 1st to the 25th of every month, and closes for that month after the 25th.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn blur delay={0.1}>
              <div className="h-full rounded-2xl bg-white border border-gray-100 shadow-md p-6 flex gap-4">
                <Landmark aria-hidden className="w-8 h-8 text-primary-700 shrink-0" />
                <div>
                  <h2 className="font-display font-bold text-lg text-primary-900 mb-1">Two ways to pay</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">Fees can be paid only through the online school app portal, or offline at Punjab National Bank, Sidhpur.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn blur>
              <div className="text-center mb-12">
                <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Payment Guide</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">Pay in Three Steps</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">Please read every step carefully before making your payment.</p>
              </div>
            </FadeIn>
            <StepGuide steps={steps} label="Online fee payment steps" />
          </div>
        </div>
      </section>

      {/* Problems, refunds, charges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <FadeIn blur>
              <div className="h-full rounded-2xl border border-red-200 bg-red-50 p-6">
                <AlertTriangle aria-hidden className="w-8 h-8 text-red-700 mb-3" />
                <h2 className="font-display font-bold text-lg text-red-900 mb-2">Payment failed but money deducted?</h2>
                <ul className="space-y-2 text-sm text-red-950/90 leading-relaxed">
                  <li>Do not pay again straight away. Wait 24–48 hours for the transaction to be processed and the receipt to be generated.</li>
                  <li>If the problem is still there after that, contact the school IT department. They will check the transaction and help you.</li>
                  <li>If you have already paid a second time, inform the school first, not your bank. The school will check its records and guide you.</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn blur delay={0.1}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <RotateCcw aria-hidden className="w-8 h-8 text-primary-700 mb-3" />
                <h2 className="font-display font-bold text-lg text-primary-900 mb-2">Duplicate payment refunds</h2>
                <p className="text-sm text-gray-700 leading-relaxed">If a fee is paid twice, the school refunds only the excess amount. Transaction charges, convenience fees, payment gateway charges, bank charges and taxes are not refundable. Refunds follow the school&apos;s refund policy and the usual processing time of the gateway or bank.</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn blur>
            <div className="max-w-5xl mx-auto mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <Wallet aria-hidden className="w-6 h-6 text-primary-700" />
                <h2 className="font-display font-bold text-lg text-primary-900">Payment gateway charges</h2>
              </div>
              <table className="w-full text-sm">
                <caption className="sr-only">Payment gateway charges by payment method</caption>
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Method</th>
                    <th scope="col" className="px-6 py-3 font-medium">What to expect</th>
                  </tr>
                </thead>
                <tbody>
                  {gatewayCharges.map(([method, note]) => (
                    <tr key={method} className="border-t border-gray-100">
                      <th scope="row" className="px-6 py-3 text-left font-semibold text-primary-900 whitespace-nowrap">{method}</th>
                      <td className="px-6 py-3 text-gray-700">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-6 py-4 text-xs text-gray-600 border-t border-gray-100 flex gap-2">
                <ShieldAlert aria-hidden className="w-4 h-4 shrink-0" />
                Charges are set by the payment gateway and banks, and can vary with the payment method, the amount and the bank&apos;s own policies.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* School app + help */}
      <section className="py-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Smartphone aria-hidden className="w-10 h-10 text-secondary-300 mb-4" />
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">The school app</h2>
              <p className="text-gray-200 mb-6">Pay fees and see your receipts on your phone with the school&apos;s app, IQdigit.</p>
              <div className="flex flex-wrap gap-3">
                <a href={onlineServices.androidApp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary-900 px-5 py-3 rounded-full font-semibold hover:bg-secondary-100 transition-colors">
                  Get it on Google Play <ExternalLink aria-hidden size={16} /><span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={onlineServices.iosApp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 px-5 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors">
                  Download on the App Store <ExternalLink aria-hidden size={16} /><span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 border border-white/15 p-7">
              <Phone aria-hidden className="w-8 h-8 text-secondary-300 mb-3" />
              <h2 className="font-display font-bold text-xl mb-2">Need help?</h2>
              <p className="text-gray-200 text-sm mb-5">For help with online fee payment, contact the school help desk.</p>
              <div className="flex flex-wrap gap-3">
                {schoolPhones.map(phone => (
                  <a key={phone} href={telHref(phone)} className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-5 py-2.5 rounded-full font-semibold hover:bg-secondary-300 transition-colors">
                    <Phone aria-hidden size={16} /> {phone}
                  </a>
                ))}
              </div>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline hover:text-secondary-300">
                All contact details <ArrowRight aria-hidden size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
