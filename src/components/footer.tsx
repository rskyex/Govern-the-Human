import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative py-20 md:py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/img-architecture-wide.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative max-w-[1120px] mx-auto px-8 md:px-16">
        <div className="flex flex-col items-center text-center mb-10">
          <Image
            src="/logo.png"
            alt="Govern the Human"
            width={80}
            height={80}
            className="object-contain mb-7 md:w-[96px] md:h-[96px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          />
          <p className="font-sans text-[14px] md:text-[16px] font-medium tracking-[0.25em] uppercase text-white/90 mb-6">
            Govern the Human
          </p>
          <div className="w-10 h-px bg-white/30 mb-6" />
          <p className="font-sans text-[13px] text-white/70 font-light">
            Research in progress
          </p>
        </div>

        <div className="w-full h-px bg-white/20 mt-10 mb-8" />

        <div className="flex flex-col items-center text-center">
          <p className="font-sans text-[0.8rem] leading-[1.7] text-white/60 font-light max-w-[520px] mb-4">
            Born in 2003, Risa Koyanagi is a Cambridge Future Scholar and researcher at the intersection of space governance, nuclear governance, cyber governance, strategic risk, and emerging technology governance.
          </p>
          <a
            href="https://risakoyanagi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] tracking-[0.06em] text-white/50 hover:text-white/90 transition-colors duration-300"
          >
            risakoyanagi.com &rarr;
          </a>
        </div>

        <p className="font-sans text-[11px] text-white/50 font-light mt-8 text-center">
          &copy; Risa Koyanagi
        </p>
      </div>
    </footer>
  )
}
