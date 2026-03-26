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

        <div className="w-full h-px bg-white/20 mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Bio — left */}
          <div>
            <p className="font-sans text-[0.85rem] leading-[1.8] text-white/75 font-light">
              Born in 2003, Risa Koyanagi is a Cambridge Future Scholar and researcher working at the intersection of space governance, nuclear governance, cyber governance, strategic risk, and emerging technology governance. Her research is especially concerned with legitimation theory, dual-use governance, authority architecture, responsible behaviour norms, and international security.
            </p>
          </div>

          {/* Thumbnail + link — right */}
          <div className="flex flex-col items-center md:items-end">
            <a
              href="https://risakoyanagi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative w-[240px] h-[126px] rounded-sm overflow-hidden mb-4 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                <Image
                  src="/og-builder.png"
                  alt="Risa Koyanagi"
                  fill
                  className="object-cover object-center"
                  sizes="240px"
                />
              </div>
              <p className="font-sans text-[12px] tracking-[0.06em] text-white/60 group-hover:text-white/90 transition-colors duration-300 text-center md:text-right">
                risakoyanagi.com &rarr;
              </p>
            </a>
          </div>
        </div>

        <p className="font-sans text-[11px] text-white/50 font-light mt-10 text-center">
          &copy; Risa Koyanagi
        </p>
      </div>
    </footer>
  )
}
