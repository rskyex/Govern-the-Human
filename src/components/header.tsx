'use client'

const NAV = [
  { label: 'Premise', href: '#premise' },
  { label: 'Domains', href: '#domains' },
  { label: 'Framework', href: '#framework' },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-xl border-b border-rule">
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <a href="#" className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-text-tertiary hover:text-text-primary transition-colors">
          Govern the Human
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
