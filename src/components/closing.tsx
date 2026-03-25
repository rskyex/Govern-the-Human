'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden">
      {/* Background image — full atmospheric layer */}
      <div className="absolute inset-0">
        <Image
          src="/img-hall-solitary.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative py-28 md:py-40">
        <div className="max-w-[800px] mx-auto px-8 md:px-16 text-center">
          <Reveal>
            <p className="font-display text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-white/95 mb-8">
              The system can be governed.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display text-[1.5rem] md:text-[2.1rem] lg:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.01em] text-white/75">
              But what governs the human it reshapes?
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
