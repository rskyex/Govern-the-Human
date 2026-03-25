'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden">
      {/* Background image — warm atmospheric layer */}
      <div className="absolute inset-0">
        <Image
          src="/img-panoramic-calm.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.10]"
          sizes="100vw"
        />
      </div>

      <div className="relative bg-base/90 py-24 md:py-32">
        <div className="max-w-[800px] mx-auto px-8 md:px-16 text-center">
          <Reveal>
            <p className="font-display text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-[#1e3a5f] mb-8">
              The system can be governed.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display text-[1.5rem] md:text-[2.1rem] lg:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.01em] text-[#3a5a7c]">
              But what governs the human it reshapes?
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
