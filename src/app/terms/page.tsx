'use client'

import Link from 'next/link'
import { ArrowLeft, Scale, FileText, AlertTriangle, Users, Globe, BookOpen, Mail } from 'lucide-react'
import { m } from 'framer-motion'

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: `By accessing and using the Sacred Heart Senior Secondary School website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.

The school reserves the right to modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the modified terms.`
  },
  {
    icon: Globe,
    title: 'Website Use',
    content: `The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of Sacred Heart Senior Secondary School and is protected by applicable intellectual property laws.

You may:
• View and print content for personal, non-commercial use
• Share content for educational purposes with proper attribution

You may not:
• Modify, reproduce, or distribute content without written permission
• Use the website for any unlawful or prohibited purpose
• Attempt to gain unauthorized access to any part of the website
• Interfere with the website's operation or security`
  },
  {
    icon: BookOpen,
    title: 'Academic Information',
    content: `While we strive to keep all information on this website accurate and up-to-date:

• Academic calendars, exam schedules, and fee structures are subject to change
• Results and academic records published online are for informational purposes
• Students and parents should confirm important dates with the school directly
• The school is not liable for any discrepancies arising from reliance on website information

For the most current academic information, please contact the school office directly.`
  },
  {
    icon: Users,
    title: 'User Conduct',
    content: `When using this website, you agree to:

• Provide accurate and truthful information when submitting forms
• Not use automated tools or bots to access the website
• Not upload or transmit any viruses, malware, or harmful content
• Not attempt to interfere with the proper functioning of the website
• Respect the privacy and rights of other users

Users found violating these terms may have their access restricted or terminated.`
  },
  {
    icon: AlertTriangle,
    title: 'Disclaimer of Warranties',
    content: `This website is provided "as is" and "as available" without warranties of any kind, either express or implied.

The school does not warrant that:
• The website will be uninterrupted, secure, or error-free
• The information on the website is complete, accurate, or current
• The website is free from viruses or other harmful components
• Any errors or defects will be corrected

The school shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.`
  },
  {
    icon: Scale,
    title: 'Privacy and Data',
    content: `Your use of this website is also governed by our Privacy Policy. By using this website, you consent to the collection and use of information as described in the Privacy Policy.

We are committed to protecting the personal information of students, parents, and visitors in accordance with applicable data protection laws. Please review our Privacy Policy for more details on how we handle your data.`
  },
  {
    icon: Mail,
    title: 'Contact Information',
    content: `If you have questions about these Terms of Use, please contact us:

Sacred Heart Senior Secondary School
Sidhpur, Dharamshala
Himachal Pradesh - 176057

Email: info@sacredheartsidhhpur.edu.in
Phone: [School Contact Number]

We will respond to your inquiries as soon as reasonably possible.`
  },
]

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
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
              <Scale className="w-4 h-4 text-secondary-400" />
              Legal
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Terms of Use
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Guidelines for using our website responsibly
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
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-primary-900 mb-2">Effective Date</h2>
                  <p className="text-gray-600">April 2025</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Welcome to the website of Sacred Heart Senior Secondary School. These Terms of Use (&quot;Terms&quot;) govern your access to and use of our website located at [website URL]. By using this website, you agree to comply with and be bound by these Terms. Please read them carefully before using our site.
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
            Have Questions?
          </m.h2>
          <m.p 
            className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We&apos;re here to help. Reach out to us for any questions about these terms or our services.
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
