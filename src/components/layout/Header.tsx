'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { 
  Menu, X, ChevronDown, 
  Home, Info, Users, BookOpen, Trophy, 
  Calendar, Image, MessageCircle, Phone, 
  ClipboardList,Award, GraduationCap
} from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { navigation, schoolInfo } from '@/data/school'

const iconMap: Record<string, any> = {
  '/': Home,
  '/about': Info,
  '/academics': BookOpen,
  '/achievements': Trophy,
  '/gallery': Image,
  '/contact': Phone,
  '/admission': GraduationCap,
  '/admin': Users,
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleSubMenu = useCallback((href: string) => {
    setExpandedItem(prev => prev === href ? null : href)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setExpandedItem(null)
  }, [])

  const menuVariants = {
    closed: { opacity: 0, height: 0, y: -20 },
    open: { opacity: 1, height: 'auto', y: 0, transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.05 } }
  }

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.3 } }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
  }

  const subMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass' 
          : 'bg-white'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <m.div 
              className="w-12 h-12 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/images/logo_batch.png" 
                alt="School Logo" 
                className="w-full h-full object-contain"
              />
            </m.div>
            <div className="hidden sm:block">
              <h1 className="font-display text-base md:text-lg font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent leading-tight">
                {schoolInfo.name}
              </h1>
              <p className="text-[9px] text-gray-500 font-medium mt-1">{schoolInfo.address.tehsil}, {schoolInfo.address.district}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <m.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="hidden lg:flex items-center gap-1"
          >
            {navigation.map((item) => (
              <m.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
                }}
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-700 font-medium transition-colors rounded-lg hover:bg-primary-50 relative group"
                >
                  {item.text}
                  {item.children && (
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${activeDropdown === item.href ? 'rotate-180' : ''}`} 
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 origin-left transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-x-100" />
                </Link>
                <AnimatePresence>
                  {item.children && activeDropdown === item.href && (
                    <m.div
                      initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-60 glass shadow-xl rounded-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          child.external ? (
                            <a
                              key={child.href}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50/50 hover:text-primary-700 font-medium transition-colors"
                            >
                              {child.text}
                            </a>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50/50 hover:text-primary-700 font-medium transition-colors"
                            >
                              {child.text}
                            </Link>
                          )
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent pointer-events-none" />
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </m.div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <m.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/admission"
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-7 py-2.5 rounded-full font-medium hover:shadow-glow transition-all duration-300"
              >
                Apply Now
              </Link>
            </m.div>
          </div>

          {/* Mobile Menu Button */}
          <m.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-50"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <m.div
              animate={{ rotate: isMenuOpen ? 90 : 0, scale: isMenuOpen ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </m.div>
          </m.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <m.div
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed inset-0 bg-primary-900/20 backdrop-blur-sm lg:hidden z-40"
                onClick={closeMenu}
              />
              
              {/* Mobile Menu Panel */}
              <m.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="fixed top-0 left-0 right-0 lg:hidden z-50 overflow-hidden"
              >
                {/* Decorative background orbs */}
                <div className="absolute inset-0 bg-white" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-300/15 rounded-full blur-3xl pointer-events-none" />
                <div className="noise-overlay opacity-30" />
                
                <div className="relative z-10 max-h-[85vh] overflow-y-auto bg-gradient-to-b from-white to-gray-50">
                  {/* Header with logo and close */}
                  <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
                      <div className="w-9 h-9 relative">
                        <img src="/images/logo_batch.png" alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h1 className="font-display text-sm font-semibold text-gray-800 leading-tight">
                          {schoolInfo.name}
                        </h1>
                        <p className="text-[9px] text-gray-500">{schoolInfo.address.tehsil}, {schoolInfo.address.district}</p>
                      </div>
                    </Link>
                    <m.button
                      onClick={closeMenu}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={18} className="text-gray-600" />
                    </m.button>
                  </div>

                  {/* Menu Items */}
                  <div className="px-3 py-4 space-y-0.5">
                    {navigation.map((item, index) => {
                      const IconComponent = iconMap[item.href] || ChevronDown
                      return (
                        <m.div key={item.href} variants={itemVariants} custom={index}>
                          {item.children ? (
                            <div className="rounded-xl overflow-hidden">
                              <div className="flex items-center justify-between py-3.5 px-4 bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                                    <IconComponent size={16} className="text-primary-600" strokeWidth={1.5} />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                                </div>
                                <m.button
                                  onClick={() => toggleSubMenu(item.href)}
                                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <m.div
                                    animate={{ rotate: expandedItem === item.href ? 180 : 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                  >
                                    <ChevronDown size={14} className="text-gray-500" />
                                  </m.div>
                                </m.button>
                              </div>
                              
                              <AnimatePresence>
                                {expandedItem === item.href && (
                                  <m.div
                                    variants={subMenuVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                  >
                                    <div className="py-1.5 bg-white">
                                      {item.children.map((child) => (
                                        child.external ? (
                                          <a
                                            key={child.href}
                                            href={child.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 py-2.5 px-4 pl-12 text-gray-600 hover:bg-primary-50 hover:text-primary-700 text-sm transition-colors"
                                            onClick={closeMenu}
                                          >
                                            {child.text}
                                          </a>
                                        ) : (
                                          <Link
                                            key={child.href}
                                            href={child.href}
                                            className="flex items-center gap-3 py-2.5 px-4 pl-12 text-gray-600 hover:bg-primary-50 hover:text-primary-700 text-sm transition-colors"
                                            onClick={closeMenu}
                                          >
                                            {child.text}
                                          </Link>
                                        )
                                      ))}
                                    </div>
                                  </m.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="flex items-center gap-3 py-3.5 px-4 bg-gray-50/50 hover:bg-gray-100/50 rounded-xl transition-colors"
                              onClick={closeMenu}
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                                <IconComponent size={16} className="text-primary-600" strokeWidth={1.5} />
                              </div>
                              <span className="text-sm font-medium text-gray-700">{item.text}</span>
                            </Link>
                          )}
                        </m.div>
                      )
                    })}
                  </div>

                  {/* CTA */}
                  <div className="px-4 pb-6 pt-2">
                    <Link
                      href="/admission"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 rounded-xl font-medium shadow-glow hover:shadow-lg transition-all"
                    >
                      Apply for Admission
                    </Link>
                  </div>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
