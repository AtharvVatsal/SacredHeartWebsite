'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Lock, FileText, Users, Mail, AlertCircle } from 'lucide-react'
import { m } from 'framer-motion'
import { schoolInfo } from '@/data/school'
import HeroDecor from '@/components/layout/HeroDecor'
import { ShieldCheck as HeroMotif, Lock as HeroMotifSmall } from 'lucide-react'

const sections = [
  {
    icon: Shield,
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, including:
    
• Personal Information: Name, date of birth, address, and contact details when you submit admission forms or contact us
• Academic Information: Student records, grades, attendance, and performance data
• Technical Information: IP address, browser type, and usage data when you visit our website
• Images and Media: Photos and videos taken during school events (with appropriate consent)`
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Process admissions and enrollment applications
• Communicate with parents and guardians about student progress
• Maintain academic records and reports
• Organize school events and activities
• Improve our website and services
• Comply with legal obligations and educational requirements`
  },
  {
    icon: Lock,
    title: 'Data Protection',
    content: `We take the security of your personal information seriously:

• We implement appropriate technical and organizational measures to protect your data
• Access to personal information is restricted to authorized personnel only
• Our staff undergo regular training on data protection practices
• We regularly review and update our security measures
• All digital records are stored in secure, password-protected systems`
  },
  {
    icon: Users,
    title: 'Information Sharing',
    content: `We do not sell, trade, or rent personal information to third parties. We may share information:

• With educational authorities as required by law (CISCE, State Education Department)
• With service providers who assist in our operations (under strict confidentiality)
• When required by law or to protect our rights
• With parent/guardian consent for student-related matters

All sharing is conducted in compliance with applicable data protection laws.`
  },
  {
    icon: FileText,
    title: 'Cookies and Website Usage',
    content: `Our website may use cookies to:

• Remember your preferences and settings
• Analyze website traffic and usage
• Provide personalized content where applicable

You can control cookie settings through your browser. Note that disabling cookies may affect some website functionality.`
  },
  {
    icon: Mail,
    title: 'Contact Us',
    content: `If you have questions about this Privacy Policy or wish to exercise your rights regarding your personal data, please contact us:

Sacred Heart Senior Secondary School
Sidhpur, Dharamshala
Himachal Pradesh - 176057

Email: ${schoolInfo.contact.emails.join(', ')}
Phone: ${schoolInfo.contact.phones.join(', ')}

We aim to respond to all inquiries within 30 days.`
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
        <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} />
        <div className="absolute inset-0 overflow-hidden">
          <m.div 
            className="absolute top-20 left-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <m.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl">
            <Link href="/" className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={16} />Back to Home
            </Link>
            <m.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Shield className="w-4 h-4 text-secondary-400" />
              Legal
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Privacy Policy
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              How we collect, use, and protect your information
            </m.p>
          </div>
        </m.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="container mx-auto px-4">
          <m.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-primary-900 mb-2">Last Updated</h2>
                  <p className="text-gray-600">April 2025</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Sacred Heart Senior Secondary School (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our school services.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <m.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary-200 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                      <section.icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-primary-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <m.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Have More Questions?
          </m.h2>
          <m.p 
            className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We&apos;re here to help. Reach out to us for any questions about our privacy practices.
          </m.p>
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Contact Us <ArrowLeft className="rotate-180" size={20} />
            </Link>
          </m.div>
        </div>
      </section>
    </>
  )
}
