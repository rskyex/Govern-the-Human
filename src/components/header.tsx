'use client'

import Image from 'next/image'

const NAV = [
  { label: 'Thesis', href: '#thesis' },
  { label: 'Framework', href: '#three-layer-model' },
  { label: 'Suite', href: '#the-suite' },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-xl">
      <div className="h-px w-full bg-rule absolute bottom-0 left-0" />
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 h-[56px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Govern the Human"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-text-tertiary">
            Govern the Human
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-sans text-[12px] text-text-ghost hover:text-text-secondary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
