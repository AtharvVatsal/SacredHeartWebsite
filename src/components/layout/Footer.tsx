'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, ArrowRight, ExternalLink, CreditCard, UserPlus, Smartphone, GraduationCap } from 'lucide-react'
import { m } from 'framer-motion'
import type { SiteSettings } from '@/lib/site-settings'
import { ParallaxSection } from '@/components/animations'
import { telHref } from '@/lib/contact'

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { identity, contact, navigation, onlineServices, footer, social } = settings
  const schoolEmail = contact.emails[0]
  // Set after mount: the page is pre-rendered at build time, so a year baked into the HTML would go stale (and mismatch on hydration)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  useEffect(() => setCurrentYear(new Date().getFullYear()), [])

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* About */}
          <m.div 
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 relative">
                <Image 
                  src={identity.logo.src}
                  alt={identity.logo.alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold">{identity.name}</h2>
                <p className="text-xs text-gray-300">Since {identity.established}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {footer.description}
            </p>
            {social.length > 0 && (
              <ul aria-label="Social media" className="mt-5 flex flex-wrap gap-2">
                {social.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-gray-200 hover:bg-white/15 hover:text-white transition-colors"
                    >
                      {s.platform}
                      <ExternalLink aria-hidden size={11} className="opacity-70" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </m.div>

          {/* Quick Links */}
          <m.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-2"
          >
            <h2 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary-400 rounded-full"></span>
              Quick Links
            </h2>
            <ul className="space-y-3">
              {footer.quickLinks.map((link, index) => {
                const key = link.href === '#' ? `ql-${index}` : link.href
                return (
                  <li key={key}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-sm group"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary-400" />
                      {link.text}
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
            className="lg:col-span-4"
          >
            <h2 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary-400 rounded-full"></span>
              Navigate
            </h2>
            <ul className="sm:columns-2 sm:gap-8">
              {navigation.map((item) => (
                <li key={item.href} className="mb-3 break-inside-avoid">
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
                          {child.external ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-300 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5 py-0.5"
                            >
                              {child.text}
                              <ExternalLink aria-hidden size={12} />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          ) : (
                            <Link
                              href={child.href}
                              className="text-gray-300 hover:text-white text-sm transition-colors block py-0.5 relative overflow-hidden group/link"
                            >
                              <span className="relative z-10">{child.text}</span>
                              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                            </Link>
                          )}
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
            className="lg:col-span-3"
          >
            <h2 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary-400 rounded-full"></span>
              Contact Us
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <MapPin size={18} className="text-secondary-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-300 text-sm leading-relaxed pt-1 group-hover:text-white transition-colors">
                  {contact.address.street}, {contact.address.tehsil}<br />
                  Distt. {contact.address.district}, {contact.address.state}<br />
                  {contact.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                  <Phone size={18} className="text-secondary-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-gray-300 text-sm group-hover:text-white transition-colors">
                  {contact.phones.map(phone => (
                    <a key={phone} href={telHref(phone)} className="block py-0.5 hover:underline">{phone}</a>
                  ))}
                </div>
              </li>
              {schoolEmail && (
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                    <Mail size={18} className="text-secondary-400 group-hover:text-white transition-colors" />
                  </div>
                  <a href={`mailto:${schoolEmail}`} className="text-gray-300 text-sm group-hover:text-white transition-colors hover:underline break-all">{schoolEmail}</a>
                </li>
              )}
            </ul>
          </m.div>
        </div>
      </div>

      {/* Online services */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <h2 className="font-display text-base font-semibold text-white shrink-0">Online services</h2>
          <ul className="flex flex-wrap gap-2.5">
            {[
              { label: 'Pay school fee', href: onlineServices.feePortal, icon: CreditCard },
              { label: 'Online registration', href: onlineServices.registrationPortal, icon: UserPlus },
              { label: 'School app (Android)', href: onlineServices.androidApp, icon: Smartphone },
              { label: 'School app (iOS)', href: onlineServices.iosApp, icon: Smartphone },
              { label: 'Alumni registration', href: onlineServices.alumniRegistration, icon: GraduationCap },
            ].map(service => (
              <li key={service.label}>
                <a
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <service.icon aria-hidden size={15} className="text-secondary-400" />
                  {service.label}
                  <ExternalLink aria-hidden size={12} className="opacity-70" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright ©{currentYear ? ` ${currentYear}` : ''} <span className="text-white font-medium">{identity.name}</span> - All Rights Reserved
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Use</Link>
            </div>
          </div>
          {/* Site credit */}
          <p className="mt-4 text-center md:text-right text-xs text-gray-400">
            Design, Developed and Deployed by SHSSS Alumni – Atharv Vatsal ·{' '}
            <a
              href="https://www.atharvvatsal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 underline underline-offset-2 decoration-white/30 hover:text-white hover:decoration-white transition-colors"
            >
              www.atharvvatsal.com
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
