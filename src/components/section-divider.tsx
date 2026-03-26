import Image from 'next/image'

export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-0 md:py-0">
      {/* Gold line — left */}
      <div className="w-36 md:w-48 h-[2.5px] bg-gradient-to-r from-transparent to-[#c9a84c] opacity-60 rounded-full" />

      {/* Logo glyph */}
      <div className="mx-4 md:mx-6 flex-shrink-0">
        <Image
          src="/logo.png"
          alt=""
          width={72}
          height={72}
          className="object-contain opacity-70 md:w-[88px] md:h-[88px]"
        />
      </div>

      {/* Gold line — right */}
      <div className="w-36 md:w-48 h-[2.5px] bg-gradient-to-l from-transparent to-[#c9a84c] opacity-60 rounded-full" />
    </div>
  )
}
