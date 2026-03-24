'use client'

const NAV = [
  { label: 'Thesis', href: '#thesis' },
  { label: 'Framework', href: '#layers' },
  { label: 'Suite', href: '#suite' },
  { label: 'Gap', href: '#gap' },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/70 backdrop-blur-2xl border-b border-rule/60">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <span className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-text-tertiary">
          Govern the Human
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-sans text-[13px] text-text-ghost hover:text-text-secondary transition-colors duration-400"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
