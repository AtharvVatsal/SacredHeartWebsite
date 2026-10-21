'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ExternalLink, Globe, UserPlus, LogIn, ClipboardList, PenLine, Send, CreditCard, Receipt,
  Printer, Building, FileText, AlertTriangle, RotateCcw, FolderCheck, Phone, Sparkles, QrCode,
} from 'lucide-react'
import HeroDecor from '@/components/layout/HeroDecor'
import { FadeIn } from '@/components/animations'
import StepGuide, { type GuideStep } from '@/components/admission/StepGuide'
import { onlineServices } from '@/data/school'
import { schoolPhones, telHref } from '@/lib/contact'
import { UserPlus as HeroMotif, ClipboardList as HeroMotifSmall } from 'lucide-react'

const paymentMethods = ['Credit card', 'Debit card', 'Net banking', 'Bharat QR (UPI)', 'Digital wallets']

const steps: GuideStep[] = [
  {
    title: 'Open the registration portal',
    summary: 'Start your online registration',
    icon: Globe,
    points: [
      'Use the "Open registration portal" button on this page.',
      'The portal shows two options: Login and Register.',
    ],
  },
  {
    title: 'First-time user: register',
    summary: 'Create your registration account',
    icon: UserPlus,
    points: [
      'Click Register and enter the parent’s name, phone number, email ID and a password.',
      'Click Submit / Register and wait for the success message, or for verification by email or SMS.',
      'Keep the phone number and password safe. You will need them to log in again.',
    ],
  },
  {
    title: 'Already registered: log in',
    summary: 'Access your registration account',
    icon: LogIn,
    points: [
      'Click Login and enter your email ID or phone number and password, then click Sign In.',
      'Complete the OTP or email verification if you are asked to.',
      'Forgotten your password? Click Forgot Password to reset it.',
    ],
  },
  {
    title: 'Check class availability',
    summary: 'See whether admission is open',
    icon: ClipboardList,
    points: [
      'If admission is open for a class, an Apply Now button appears.',
      'If there are no vacant seats, the Apply Now button and the registration form are not shown.',
      'Click Apply Now to open the online registration form.',
    ],
  },
  {
    title: 'Fill in the form carefully',
    summary: 'Enter accurate student information',
    icon: PenLine,
    points: [
      'Complete every field marked with an asterisk (*).',
      'Enter the student’s and parents’ details exactly as they appear on the birth certificate, especially the student’s name and date of birth.',
      'Review everything before you continue. Typing mistakes can cause problems when documents are verified at admission.',
    ],
    important: 'Check the student’s name and date of birth carefully before submitting the form.',
  },
  {
    title: 'Submit the form',
    summary: 'Go on to the online payment',
    icon: Send,
    points: [
      'After checking all the details, click Submit.',
      'You will be taken to the payment gateway automatically.',
    ],
  },
  {
    title: 'Pay the registration fee',
    summary: 'Complete the payment',
    icon: CreditCard,
    points: [
      'To pay with Bharat QR: click Pay Now, scan the QR code that appears with any UPI app (Google Pay, PhonePe, BHIM, Paytm or another), and complete the payment on your phone.',
      'On a computer, the QR code appears on screen; scan it with the UPI app on your phone.',
      'After paying, wait until the on-screen timer finishes. The school receipt is generated automatically when it ends.',
    ],
    extra: (
      <div className="mt-5">
        <p className="text-sm font-semibold text-primary-900 mb-2">Accepted payment methods</p>
        <ul className="flex flex-wrap gap-2">
          {paymentMethods.map(method => (
            <li key={method} className="px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-sm text-primary-800">{method}</li>
          ))}
        </ul>
      </div>
    ),
    important: 'Do not close or refresh the page while the timer is running.',
  },
  {
    title: 'Save your payment proof',
    summary: 'Keep your payment records safe',
    icon: Receipt,
    points: [
      'Take a screenshot of the payment confirmation.',
      'Click Download Receipt and save the receipt.',
      'Keep both the screenshot and the receipt until the admission process is complete.',
    ],
  },
  {
    title: 'Check and print the form',
    summary: 'Prepare your registration documents',
    icon: Printer,
    points: [
      'Print the registration form on A4 paper and check every detail.',
      'If you notice a mistake, contact the school’s administrative department before submitting the form, then print the corrected form.',
      'Attach photocopies of the Aadhaar card, birth certificate and address proof, the previous class’s final report card, and any other document the school asks for.',
    ],
  },
  {
    title: 'Submit at the school office',
    summary: 'Hand in the form and documents',
    icon: Building,
    points: [
      'Submit the printed registration form with all the required documents at the school office.',
      'The submission date is announced in the official school notification. Please check it before visiting the school.',
    ],
  },
]

export default function OnlineRegistrationPage() {
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
              <Link href="/admission" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Admission
              </Link>
              <m.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-secondary-400" />
                Admissions
              </m.div>
            </div>
            <m.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-8 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Online Registration
            </m.h1>
            <m.p
              className="text-xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Register for admission on the school&apos;s portal, step by step
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href={onlineServices.registrationPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="active:scale-95 inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-7 py-3.5 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg"
              >
                Open registration portal <ExternalLink aria-hidden size={18} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href="#steps" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all">
                Read the steps first
              </a>
            </m.div>
          </div>
        </m.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="py-16 md:py-20 bg-gradient-to-b from-primary-50 to-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn blur>
              <div className="text-center mb-12">
                <h2 className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-3">Registration Guide</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">Ten Steps to Register</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to complete the online registration and the registration fee payment.</p>
              </div>
            </FadeIn>
            <StepGuide steps={steps} label="Online registration steps" />
          </div>
        </div>
      </section>

      {/* Payment problems and refunds */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <FadeIn blur>
              <div className="h-full rounded-2xl border border-red-200 bg-red-50 p-6">
                <AlertTriangle aria-hidden className="w-8 h-8 text-red-700 mb-3" />
                <h2 className="font-display font-bold text-lg text-red-900 mb-2">Payment failed but money deducted?</h2>
                <ul className="space-y-2 text-sm text-red-950/90 leading-relaxed">
                  <li>Do not pay again straight away. Wait 24–48 hours for the transaction to be processed.</li>
                  <li>If there is still no receipt after 24–48 hours, contact the school IT department. The school will check the payment and guide you.</li>
                  <li>Please do not contact your bank before informing the school.</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn blur delay={0.1}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <RotateCcw aria-hidden className="w-8 h-8 text-primary-700 mb-3" />
                <h2 className="font-display font-bold text-lg text-primary-900 mb-2">Paid twice?</h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">If the registration fee is paid more than once, only the extra amount is refunded. These charges are not refundable:</p>
                <p className="text-sm text-gray-700 leading-relaxed">transaction charges, convenience fees, payment gateway charges, bank charges and taxes.</p>
                <p className="text-xs text-gray-600 mt-3">Refunds follow the school&apos;s refund policy and the usual processing time of the payment gateway or bank.</p>
              </div>
            </FadeIn>
            <FadeIn blur delay={0.2}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <FolderCheck aria-hidden className="w-8 h-8 text-primary-700 mb-3" />
                <h2 className="font-display font-bold text-lg text-primary-900 mb-2">Keep copies of</h2>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {['The filled registration form', 'The payment receipt', 'The documents you submitted', 'The acknowledgement, if one is issued'].map(item => (
                    <li key={item} className="flex gap-2"><FileText aria-hidden className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Ready to register?</h2>
          <p className="text-gray-200 mb-8 max-w-xl mx-auto">The portal is run for the school by IQdigit. For help, call the school office.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={onlineServices.registrationPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="active:scale-95 inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg"
            >
              <QrCode aria-hidden size={18} /> Open registration portal <ExternalLink aria-hidden size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {schoolPhones.map(phone => (
              <a key={phone} href={telHref(phone)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
                <Phone aria-hidden size={16} /> {phone}
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-300">
            Not ready to register yet?{' '}
            <Link href="/admission/register" className="font-semibold text-white underline hover:text-secondary-300">
              Send an enquiry instead <ArrowRight aria-hidden className="inline w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
