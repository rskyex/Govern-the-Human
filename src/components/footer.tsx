import Image from 'next/image'

export function Footer() {
  return (
    <footer className="py-20 md:py-24 bg-base border-t border-rule">
      <div className="max-w-[1120px] mx-auto px-8 md:px-16 flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Govern the Human"
          width={80}
          height={80}
          className="object-contain mb-7 md:w-[96px] md:h-[96px]"
        />
        <p className="font-sans text-[14px] md:text-[16px] font-medium tracking-[0.25em] uppercase text-text-secondary mb-6">
          Govern the Human
        </p>
        <div className="w-10 h-px bg-rule mb-6" />
        <p className="font-sans text-[13px] text-text-ghost font-light mb-4">
          Research in progress
        </p>
        <p className="font-sans text-[11px] text-text-ghost/60 font-light">
          &copy; risakoyanagi
        </p>
      </div>
    </footer>
  )
}
