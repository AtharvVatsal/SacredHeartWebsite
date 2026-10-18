'use client'

import { Banknote, Calendar, AlertCircle, CheckCircle, Clock, Building, GraduationCap, Sparkles, ArrowLeft, Info, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { m } from 'framer-motion'

const feeInfo = [
  {
    icon: Calendar,
    title: 'Annual Payment',
    description: 'Tuition fee is to be paid for 12 months and deposited at PNB Sidhpur on prescribed dates.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: AlertCircle,
    title: 'Subject to Revision',
    description: 'Fees and other dues are liable to be revised at any time without prior notice.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: GraduationCap,
    title: 'Readmission',
    description: 'Readmission facility available in Classes I, V, and VIII only.',
    color: 'from-emerald-500 to-green-600',
  },
]

const securityInfo = [
  {
    icon: ShieldCheck,
    text: 'Security amount (less school dues if any) is refundable',
  },
  {
    icon: Clock,
    text: 'Application must be made within three months of leaving',
  },
  {
    icon: CheckCircle,
    text: 'Clearance of all pending dues required',
  },
]

export default function FeeStructurePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            className="absolute top-20 left-10 w-72 h-72 bg-secondary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-4">
              <Link href="/admission" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Admission
                </span>
              </Link>
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 w-fit">
                <Sparkles className="w-4 h-4 text-secondary-400" />
                Financials
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mt-8 mb-4">
              School Fee
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Fee structure and payment information
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Fee Information Cards */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-3">
                Fee Payment Guidelines
              </h2>
              <p className="text-gray-600">Essential information for parents and guardians</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {feeInfo.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                  <div className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-primary-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Info className="w-6 h-6 text-yellow-900" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-900 text-lg mb-2">Early Payment Discount</h3>
                  <p className="text-yellow-800">
                    If desired, fees for the whole year may be deposited in <strong>February</strong> each year to avail early payment benefits.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Amount */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">Security Amount Refund</h3>
                  <p className="text-primary-200 text-sm">Terms and conditions apply</p>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {securityInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examination Rules */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">Examination Rules</h3>
                  <p className="text-red-100 text-sm">Important notice for students and parents</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">
                      Students who have not paid the tuition fee and other dues before the examination will 
                      <strong className="text-red-600"> NOT be allowed to sit for the final examinations</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Banknote className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-4">
              Need More Information?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              For detailed fee structure per class, please contact the school office or refer to the fee book provided at the time of admission.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-primary-800 transition-all"
            >
              <Building className="w-5 h-5" />
              Contact School
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
