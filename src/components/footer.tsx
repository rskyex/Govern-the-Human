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
        <div className="w-10 h-px bg-rule mb-6" />
        <p className="font-sans text-[0.85rem] leading-[1.8] text-text-tertiary font-light max-w-[520px] mb-6">
          Born in 2003, Risa Koyanagi is a Cambridge Future Scholar and researcher working at the intersection of space governance, nuclear governance, cyber governance, strategic risk, and emerging technology governance. Her research is especially concerned with legitimation theory, dual-use governance, authority architecture, responsible behaviour norms, and international security.
        </p>
        <a
          href="https://risakoyanagi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[12px] tracking-[0.06em] text-text-ghost hover:text-text-secondary transition-colors duration-300"
        >
          risakoyanagi.com &rarr;
        </a>
        <p className="font-sans text-[11px] text-text-ghost/60 font-light mt-4">
          &copy; Risa Koyanagi
        </p>
      </div>
    </footer>
  )
}
