import Image from 'next/image'

export function Footer() {
  return (
    <footer className="py-20 md:py-24 bg-base border-t border-rule">
      <div className="max-w-[960px] mx-auto px-8 md:px-16 flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Govern the Human"
          width={56}
          height={56}
          className="object-contain mb-6"
        />
        <p className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-text-ghost mb-6">
          Govern the Human
        </p>
        <div className="w-8 h-px bg-rule mb-6" />
        <p className="font-sans text-[12px] text-text-ghost/60 font-light">
          Research in progress
        </p>
      </div>
    </footer>
  )
}
