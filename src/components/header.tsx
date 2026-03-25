'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_HOME = [
  { label: 'Thesis', href: '#thesis' },
  { label: 'Framework', href: '#three-layer-model' },
  { label: 'Suite', href: '#the-suite' },
]

const NAV_SUITE = [
  { label: 'Observatory', href: '/observatory' },
  { label: 'SelfTrace', href: '/selftrace' },
  { label: 'Narrative Drift', href: '/narrative-drift' },
]

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const nav = isHome ? NAV_HOME : NAV_SUITE

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
            const isActive = !isHome && pathname === item.href
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
      </div>
    </header>
  )
}
