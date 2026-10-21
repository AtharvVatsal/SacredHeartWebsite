'use client'

import { Bell, Download, ExternalLink, Calendar, AlertCircle, FileText } from 'lucide-react'
import { notifications as defaultNotifications } from '@/data/school'
import { useNotifications } from '@/lib/useCMS'
import type { Notification } from '@/types'
import { m } from 'framer-motion'
import { FadeIn, StaggerContainer, FadeInItem } from '@/components/animations'

export default function NotificationsPage() {
  const { data: notifications } = useNotifications()
  const notifs: Notification[] = notifications || defaultNotifications

  const importantCount = notifs.filter(n => n.important).length

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

        {/* Floating bells */}
        <m.div 
          className="absolute top-32 right-20 opacity-10"
          animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Bell className="w-24 h-24 text-white" />
        </m.div>
        <m.div 
          className="absolute bottom-40 left-20 opacity-10"
          animate={{ rotate: [5, -5, 5], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Bell className="w-16 h-16 text-white" />
        </m.div>

        <m.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <m.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <m.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Bell className="w-4 h-4 text-secondary-400" />
              Latest Updates
            </m.div>
            <m.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Notifications
            </m.h1>
            <m.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Stay updated with latest announcements
            </m.p>
            
            {/* Stats */}
            <m.div 
              className="flex flex-wrap gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/25">
                <p className="text-2xl font-bold text-white">{notifs.length}</p>
                <p className="text-sm text-white/90">Total</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/25">
                <p className="text-2xl font-bold text-secondary-400">{importantCount}</p>
                <p className="text-sm text-white/90">Important</p>
              </div>
            </m.div>
          </m.div>
        </m.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {notifs.length > 0 ? (
              <StaggerContainer className="space-y-5" stagger={0.1} delay={0.2}>
                {notifs.map((notification: Notification, index: number) => (
                  <FadeInItem key={notification.id || `notif-${index}`} direction="up" blur>
                    <m.div
                      whileHover={{ scale: 1.01, x: 4 }}
                      className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-300 overflow-hidden group ${
                        notification.important
                          ? 'bg-gradient-to-r from-primary-50 to-white border-primary-200 shadow-md hover:shadow-lg'
                          : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300'
                      }`}
                    >
                      {/* Important indicator */}
                      {notification.important && (
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-secondary-400 to-secondary-600" />
                      )}
                      
                      {/* Decorative element */}
                      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-30 ${
                        notification.important ? 'bg-primary-200' : 'bg-gray-100'
                      }`} />

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4 md:pl-6 relative z-10">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-800 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100/50">
                              <Calendar size={12} />
                              {notification.date}
                            </span>
                            {notification.important && (
                              <m.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-1.5 bg-secondary-100 text-secondary-700 border border-secondary-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
                                Important
                              </m.span>
                            )}
                          </div>
                          <h2 className="font-display font-bold text-xl text-gray-900 mb-2">
                            {notification.title}
                          </h2>
                          <p className="text-gray-600 leading-relaxed">{notification.description}</p>
                          {notification.attachment && (
                            <a
                              href={notification.attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
                            >
                              <FileText aria-hidden size={16} /> Read the notice (PDF)
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          )}
                        </div>
                        
                      </div>
                    </m.div>
                  </FadeInItem>
                ))}
              </StaggerContainer>
            ) : (
              <FadeIn>
                <div className="text-center py-20">
                  <m.div 
                    className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bell className="w-12 h-12 text-gray-300" />
                  </m.div>
                  <h3 className="text-2xl font-display font-bold text-gray-700 mb-2">No Notifications</h3>
                  <p className="text-gray-600">Check back later for updates</p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <m.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <m.h2 
            className="text-2xl md:text-3xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Need More Information?
          </m.h2>
          <m.p 
            className="text-gray-200 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Contact our school office for any queries regarding admissions, fees, or academics
          </m.p>
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Contact Us
            </a>
          </m.div>
        </div>
      </section>
    </>
  )
}
