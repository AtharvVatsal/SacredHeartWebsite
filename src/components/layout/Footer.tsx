'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react'
import { m } from 'framer-motion'
import { schoolInfo, navigation, quickLinks } from '@/data/school'
import { ParallaxSection } from '@/components/animations'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-primary-900 via-primary-950 to-[#031c0d] text-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary-400/60 to-transparent z-10" />
      {/* Wave Separator */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,114.7,190.61,96.8,236.41,83.05,279.8,70.53,321.39,56.44Z" className="fill-primary-900"></path>
        </svg>
      </div>

      {/* Decorative elements */}
      <ParallaxSection offset={-100} className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-primary-700/50 rounded-full blur-3xl animate-blob" />
      </ParallaxSection>
      <ParallaxSection offset={100} className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 opacity-20 pointer-events-none text-right">
        <div className="w-full h-full bg-secondary-500/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s'}} />
      </ParallaxSection>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <m.div 
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 relative">
                <Image 
                  src="/images/logo_batch.png" 
                  alt="School Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{schoolInfo.name}</h3>
                <p className="text-xs text-gray-400">Since {schoolInfo.established}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              {schoolInfo.tagline}. {schoolInfo.affiliation} affiliated school run by {schoolInfo.management}.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', color: 'hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' },
                { icon: Twitter, href: '#', color: 'hover:text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]' },
              ].map((social, index) => (
                <m.a
                  key={index}
                  href={social.href}
                  aria-label={social.icon.displayName || 'social-link'}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-sm border border-white/10`}
                  whileHover={{ scale: 1.12, rotate: -6, backgroundColor: 'rgba(255,255,255,0.2)', y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <social.icon size={18} />
                </m.a>
              ))}
            </div>
          </m.div>

          {/* Quick Links */}
          <m.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary-400 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => {
                const key = link.href === '#' ? `ql-${index}` : link.href
                return (
                  <li key={key}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-sm group"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary-400" />
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </m.div>

          {/* Navigation */}
          <m.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary-400 rounded-full"></span>
              Navigate
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-sm group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary-400" />
                    {item.text}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link 
                            href={child.href} 
                            className="text-gray-400 hover:text-gray-300 text-sm transition-colors block py-0.5 relative overflow-hidden group/link"
                          >
                            <span className="relative z-10">{child.text}</span>
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </m.div>

          {/* Contact */}
          <m.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary-400 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <MapPin size={18} className="text-secondary-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-300 text-sm leading-relaxed pt-1 group-hover:text-white transition-colors">
                  {schoolInfo.address.street}, {schoolInfo.address.tehsil}<br />
                  Distt. {schoolInfo.address.district}, {schoolInfo.address.state}<br />
                  {schoolInfo.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <Phone size={18} className="text-secondary-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-gray-300 text-sm group-hover:text-white transition-colors">
                  {schoolInfo.contact.phones.map((phone, i) => (
                    <div key={i}>{phone}</div>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <Mail size={18} className="text-secondary-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{schoolInfo.contact.emails[0]}</span>
              </li>
            </ul>
          </m.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright © {currentYear} <span className="text-white font-medium">{schoolInfo.name}</span> - All Rights Reserved
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
