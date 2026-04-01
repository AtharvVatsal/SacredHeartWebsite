'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navigation } from '@/data/school'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-lg font-heading font-bold text-primary-900 leading-tight">
                Sacred Heart Sr. Sec. School
              </h1>
              <p className="text-xs text-gray-600">Sidhpur, Dharamshala</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.text} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-900 font-medium transition-colors"
                >
                  {item.text}
                  {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>
                {item.children && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.text}
                          href={child.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-900 transition-colors mx-2 rounded-lg first:mt-0"
                        >
                          {child.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <div key={item.text}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.text}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.text}
                        href={child.href}
                        className="block px-3 py-2 text-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
