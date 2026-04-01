'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { navigation, schoolInfo } from '@/data/school'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

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
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </m.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-gray-700 hover:bg-gray-50 font-medium rounded-lg mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.text}
                    </Link>
                    {item.children && (
                      <div className="pl-8 space-y-1 mt-1">
                        {item.children.map((child) => (
                          child.external ? (
                            <a
                              key={child.href}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block py-2 px-4 text-gray-600 hover:bg-gray-50 text-sm rounded-lg"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.text}
                            </a>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2 px-4 text-gray-600 hover:bg-gray-50 text-sm rounded-lg"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.text}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 px-4">
                  <m.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/admission"
                      className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center py-3 rounded-xl font-medium shadow-glow"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Apply for Admission
                    </Link>
                  </m.div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
