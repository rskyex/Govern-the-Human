import Image from 'next/image'

export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-4 md:py-6">
      {/* Gold line — left */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-[#c9a84c] opacity-50" />

      {/* Logo glyph */}
      <div className="mx-4 md:mx-6 flex-shrink-0">
        <Image
          src="/logo.png"
          alt=""
          width={32}
          height={32}
          className="object-contain opacity-70 md:w-[38px] md:h-[38px]"
        />
      </div>

      {/* Gold line — right */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#c9a84c] to-[#c9a84c] opacity-50" />
    </div>
  )
}
