'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

const NAV_HOME = [
  { label: 'Thesis', href: '#thesis' },
  { label: 'Framework', href: '#three-layer-model' },
  { label: 'Suite', href: '#the-suite' },
  { label: 'Creator', href: '/creator' },
]

const NAV_SUITE = [
  { label: 'Observatory', href: '/observatory' },
  { label: 'SelfTrace', href: '/selftrace' },
  { label: 'Narrative Drift', href: '/narrative-drift' },
  { label: 'Creator', href: '/creator' },
]

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === ''
  const nav = isHome ? NAV_HOME : NAV_SUITE
  const [open, setOpen] = useState(false)
  const menuId = useId()

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-xl">
      <div className="h-px w-full bg-rule absolute bottom-0 left-0" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Govern the Human"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-text-secondary">
            Govern the Human
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-12">
          {nav.map((item) => {
            const isActive = !isHome && pathname?.replace(/\/$/, '') === item.href
            const isExternal = item.href.startsWith('#')
            return isExternal ? (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-[13px] tracking-[0.02em] text-text-ghost hover:text-text-secondary transition-colors duration-300"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`font-sans text-[13px] tracking-[0.02em] transition-colors duration-300 ${
                  isActive ? 'text-text-secondary' : 'text-text-ghost hover:text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          className="md:hidden font-sans text-[13px] tracking-[0.02em] text-text-secondary px-3 py-2 -mr-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-text-subtitle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id={menuId} aria-label="Main" className="md:hidden border-t border-rule bg-base">
          <ul className="max-w-[1400px] mx-auto px-8 py-2">
            {[...nav, ...(isHome ? NAV_SUITE : [{ label: 'Home', href: '/' }])].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={!isHome && pathname?.replace(/\/$/, '') === item.href ? 'page' : undefined}
                  className="block py-3 font-sans text-[15px] text-text-secondary hover:text-text-primary focus:outline-none focus-visible:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
