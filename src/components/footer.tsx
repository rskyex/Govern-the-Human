import Image from 'next/image'

export function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-base border-t border-rule">
      <div className="max-w-[680px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Govern the Human"
          width={48}
          height={48}
          className="object-contain mb-5"
        />
        <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-text-ghost mb-6">
          Govern the Human
        </p>
        <div className="w-6 h-px bg-rule mb-6" />
        <p className="font-sans text-[11px] text-text-ghost/60 font-light">
          Research in progress
        </p>
      </div>
    </footer>
  )
}
