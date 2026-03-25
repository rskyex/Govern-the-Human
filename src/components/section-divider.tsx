import Image from 'next/image'

export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-2 md:py-3">
      {/* Gold line — left */}
      <div className="w-12 md:w-16 h-[2.5px] bg-gradient-to-r from-transparent to-[#c9a84c] opacity-60 rounded-full" />

      {/* Logo glyph */}
      <div className="mx-4 md:mx-6 flex-shrink-0">
        <Image
          src="/logo.png"
          alt=""
          width={52}
          height={52}
          className="object-contain opacity-70 md:w-[64px] md:h-[64px]"
        />
      </div>

      {/* Gold line — right */}
      <div className="w-12 md:w-16 h-[2.5px] bg-gradient-to-l from-transparent to-[#c9a84c] opacity-60 rounded-full" />
    </div>
  )
}
