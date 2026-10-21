'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ExternalLink, Phone, Mail } from 'lucide-react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { NavChild, SiteSettings } from '@/lib/site-settings'

const HIDE_AFTER = 120 // px scrolled before the bar may tuck away on scroll down
const CLOSE_DELAY = 140 // ms grace period when the pointer leaves a dropdown
const DESKTOP_QUERY = '(min-width: 1280px)' // keep in sync with the `xl:` classes below
const EASE = [0.16, 1, 0.3, 1] as const

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

function panelId(prefix: string, href: string) {
  return `${prefix}${href.replace(/\W+/g, '-')}`
}

function ChildLink({
  item,
  active,
  className,
  onClick,
}: {
  item: NavChild
  active: boolean
  className: string
  onClick?: () => void
}) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        <span>{item.text}</span>
        <ExternalLink aria-hidden size={14} className="shrink-0 opacity-60" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link href={item.href} className={className} onClick={onClick} aria-current={active ? 'page' : undefined}>
      {item.text}
    </Link>
  )
}

export default function Header({ settings }: { settings: SiteSettings }) {
  const { navigation, identity, contact, onlineServices, header } = settings
  const phone = contact.phones[0]
  const email = contact.emails[0]
  const pathname = usePathname() ?? '/'
  const reduceMotion = useReducedMotion()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  const navRef = useRef<HTMLUListElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openedByHoverRef = useRef(false)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // Shadow once scrolled; tuck the bar away while scrolling down, bring it back on scroll up
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 8)
        if (Math.abs(y - lastY) > 4) {
          setHidden(y > lastY && y > HIDE_AFTER)
          lastY = y
        }
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const openMenu = useCallback(() => {
    // Start with the current page's section unfolded
    const current = navigation.find(item => item.children && isActive(pathname, item.href))
    setExpandedItem(current?.href ?? null)
    setIsMenuOpen(true)
  }, [pathname, navigation])

  // Navigating anywhere closes every menu
  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => cancelClose, [cancelClose])

  // Mobile sheet: lock page scroll, Escape closes, Tab stays inside the button + sheet
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !sheetRef.current || !menuButtonRef.current) return
      const focusables = [
        menuButtonRef.current,
        ...Array.from(sheetRef.current.querySelectorAll<HTMLElement>('a[href], button')),
      ]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    // Growing into the desktop layout leaves no sheet to show
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onWiden = () => desktop.matches && setIsMenuOpen(false)

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onWiden)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onWiden)
    }
  }, [isMenuOpen])

  // Desktop dropdown: a click anywhere outside the nav closes it
  useEffect(() => {
    if (!openDropdown) return
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openDropdown])

  const showDropdown = (href: string) => {
    cancelClose()
    openedByHoverRef.current = true
    setOpenDropdown(href)
  }

  const hideDropdownSoon = () => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), CLOSE_DELAY)
  }

  const toggleDropdown = (href: string) => {
    cancelClose()
    // A mouse click lands after hover has already opened the panel; keep it open rather than toggling it shut
    if (openDropdown === href && openedByHoverRef.current) {
      openedByHoverRef.current = false
      return
    }
    openedByHoverRef.current = false
    setOpenDropdown(prev => (prev === href ? null : href))
  }

  const toggleSubMenu = (href: string) => {
    setExpandedItem(prev => (prev === href ? null : href))
  }

  const tucked = hidden && !isMenuOpen && !openDropdown

  // Let page-level sticky bars (staff, pass-out and office-bearer filters) move with the header
  useEffect(() => {
    document.documentElement.toggleAttribute('data-header-tucked', tucked)
  }, [tucked])

  useEffect(() => () => document.documentElement.removeAttribute('data-header-tucked'), [])

  return (
    <>
      <header
        onFocus={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 h-[72px] bg-white border-b transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          scrolled || isMenuOpen
            ? 'border-gray-200 shadow-[0_8px_24px_-16px_rgba(20,83,45,0.35)]'
            : 'border-transparent'
        } ${tucked ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <nav aria-label="Main" className="container mx-auto h-full px-4 flex items-center justify-between gap-4">
          {/* School name */}
          <Link href="/" className="flex items-center gap-3 min-w-0 shrink-0">
            <Image
              src={identity.logo.src}
              alt=""
              width={44}
              height={44}
              priority
              className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 object-contain"
            />
            <span className="flex flex-col min-w-0">
              <span className="font-heading text-[15px] sm:text-[17px] font-semibold leading-tight text-primary-900 whitespace-nowrap">
                {identity.name}
              </span>
              <span className="text-xs leading-tight text-gray-500 whitespace-nowrap mt-0.5">
                {contact.address.tehsil}, {contact.address.district}
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul ref={navRef} className="hidden xl:flex items-center gap-0.5">
            {navigation.map(item => {
              const active = isActive(pathname, item.href)
              const open = openDropdown === item.href
              const id = panelId('nav-panel', item.href)

              return (
                <li
                  key={item.href}
                  className="relative"
                  onPointerEnter={e => item.children && e.pointerType === 'mouse' && showDropdown(item.href)}
                  onPointerLeave={e => item.children && e.pointerType === 'mouse' && hideDropdownSoon()}
                  onBlur={e => {
                    if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenDropdown(null)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Escape' && open) {
                      setOpenDropdown(null)
                      triggerRefs.current[item.href]?.focus()
                    }
                  }}
                >
                  <div
                    className={`flex items-center rounded-md transition-colors ${
                      open ? 'bg-primary-50' : 'hover:bg-primary-50'
                    }`}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={`flex items-center h-10 text-[15px] font-medium whitespace-nowrap transition-colors ${
                        item.children ? 'pl-2.5 2xl:pl-3 pr-1' : 'px-2.5 2xl:px-3'
                      } ${active ? 'text-primary-800' : 'text-gray-700 hover:text-primary-800'}`}
                    >
                      {item.text}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        ref={el => {
                          triggerRefs.current[item.href] = el
                        }}
                        aria-expanded={open}
                        aria-controls={id}
                        aria-label={`${item.text} pages`}
                        onClick={() => toggleDropdown(item.href)}
                        className={`flex items-center justify-center h-10 w-7 pr-1 transition-colors ${
                          active || open ? 'text-primary-800' : 'text-gray-500 hover:text-primary-800'
                        }`}
                      >
                        <ChevronDown
                          aria-hidden
                          size={16}
                          className={`transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Current section marker, sitting on the bar's bottom edge */}
                  {active && (
                    <span aria-hidden className="pointer-events-none absolute inset-x-2 -bottom-4 h-[3px] rounded-t-full bg-secondary-500" />
                  )}

                  <AnimatePresence>
                    {item.children && open && (
                      <m.div
                        id={id}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
                        transition={{ duration: reduceMotion ? 0 : 0.18, ease: EASE }}
                        // Top padding bridges the gap to the bar so the pointer can travel into the panel
                        className="absolute left-0 top-full pt-5 w-[22rem]"
                      >
                        <div className="rounded-xl bg-white border border-gray-200 shadow-[0_16px_40px_-16px_rgba(20,83,45,0.35)] overflow-hidden">
                          <Link
                            href={item.href}
                            aria-current={pathname === item.href ? 'page' : undefined}
                            className="block px-5 py-4 bg-primary-50/70 border-b border-primary-100 hover:bg-primary-50 transition-colors"
                          >
                            <span className="block font-heading text-base font-semibold text-primary-900">{item.text}</span>
                            {item.summary && (
                              <span className="block mt-0.5 text-sm leading-snug text-gray-600">
                                {item.summary}
                              </span>
                            )}
                          </Link>
                          <ul className="p-2">
                            {item.children.map(child => {
                              const childActive = !child.external && pathname === child.href
                              return (
                                <li key={child.href}>
                                  <ChildLink
                                    item={child}
                                    active={childActive}
                                    className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                                      childActive
                                        ? 'bg-primary-50 text-primary-800 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-800'
                                    }`}
                                  />
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={header.applyHref}
              className="hidden md:inline-flex items-center h-10 px-5 xl:px-4 2xl:px-5 rounded-full bg-primary-700 text-white text-[15px] font-semibold whitespace-nowrap hover:bg-primary-800 transition-colors"
            >
              {header.applyLabel}
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="xl:hidden -mr-2 flex items-center justify-center h-11 w-11 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile and tablet menu. Lives outside <header> so its fixed position isn't
          trapped by the header's transform. */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            ref={sheetRef}
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
            className="xl:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto overscroll-contain bg-primary-900 text-white"
          >
            <nav aria-label="Site menu" className="container mx-auto max-w-2xl min-h-full px-5 pt-3 pb-10 flex flex-col">
              <ul className="divide-y divide-white/10">
                {navigation.map(item => {
                  const active = isActive(pathname, item.href)
                  const expanded = expandedItem === item.href
                  const id = panelId('menu-panel', item.href)

                  return (
                    <li key={item.href}>
                      <div className="flex items-center gap-2">
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={pathname === item.href ? 'page' : undefined}
                          className={`flex-1 py-3.5 font-heading text-[22px] leading-tight transition-colors focus-visible:outline-secondary-300 ${
                            active ? 'text-secondary-300' : 'text-white hover:text-secondary-200'
                          }`}
                        >
                          {item.text}
                        </Link>
                        {item.children && (
                          <button
                            type="button"
                            onClick={() => toggleSubMenu(item.href)}
                            aria-expanded={expanded}
                            aria-controls={id}
                            aria-label={`${item.text} pages`}
                            className="-mr-2 flex items-center justify-center h-11 w-11 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-secondary-300"
                          >
                            <ChevronDown
                              aria-hidden
                              size={22}
                              className={`transition-transform duration-200 motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {item.children && expanded && (
                          <m.div
                            id={id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <ul className="mb-4 ml-0.5 pl-4 border-l border-white/20 grid sm:grid-cols-2 sm:gap-x-6">
                              {item.children.map(child => {
                                const childActive = !child.external && pathname === child.href
                                return (
                                  <li key={child.href}>
                                    <ChildLink
                                      item={child}
                                      active={childActive}
                                      onClick={closeMenu}
                                      className={`flex items-center gap-2 py-2.5 text-base transition-colors focus-visible:outline-secondary-300 ${
                                        childActive ? 'text-secondary-300 font-medium' : 'text-white/75 hover:text-white'
                                      }`}
                                    />
                                  </li>
                                )
                              })}
                            </ul>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-auto pt-8">
                <div className="border-t border-white/15 pt-6 space-y-3">
                  <Link
                    href={header.applyHref}
                    onClick={closeMenu}
                    className="flex items-center justify-center h-12 rounded-full bg-secondary-400 text-primary-950 font-semibold hover:bg-secondary-300 transition-colors focus-visible:outline-secondary-300"
                  >
                    {header.mobileApplyLabel}
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={onlineServices.feePortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-secondary-300"
                    >
                      Pay fee online
                      <ExternalLink aria-hidden size={16} />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <Link
                      href="/admission/online-registration"
                      onClick={closeMenu}
                      className="flex items-center justify-center h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-secondary-300"
                    >
                      Online registration
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                        className="flex items-center justify-center gap-2 h-12 rounded-full border border-white/25 hover:bg-white/10 transition-colors focus-visible:outline-secondary-300"
                      >
                        <Phone aria-hidden size={18} />
                        Call
                      </a>
                    )}
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="flex items-center justify-center gap-2 h-12 rounded-full border border-white/25 hover:bg-white/10 transition-colors focus-visible:outline-secondary-300"
                      >
                        <Mail aria-hidden size={18} />
                        Email
                      </a>
                    )}
                  </div>
                  <p className="pt-2 text-center text-sm text-white/60">
                    {contact.address.street}, {contact.address.tehsil}, {contact.address.district}
                  </p>
                </div>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
