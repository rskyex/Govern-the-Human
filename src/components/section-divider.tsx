import Image from 'next/image'

export function SectionDivider({
  image,
  height = 'h-[100px] md:h-[140px]',
  objectPosition = 'object-center',
}: {
  image: string
  height?: string
  objectPosition?: string
}) {
  return (
    <div className={`relative ${height} overflow-hidden`}>
      <Image
        src={image}
        alt=""
        fill
        className={`object-cover ${objectPosition} opacity-[0.09]`}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base pointer-events-none" />
    </div>
  )
}
