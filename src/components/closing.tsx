'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden">
      {/* Background image — soft atmospheric layer */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.closingPortal}
          alt=""
          fill
          className="object-cover object-center opacity-[0.06]"
          sizes="100vw"
        />
      </div>

      {/* Architectural side strip — right margin */}
      <div
        className="hidden lg:block absolute top-20 right-0 w-[50px] xl:w-[65px] bottom-20 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.14) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.14) 0%, transparent 100%)',
        }}
      >
        <Image
          src={IMAGES.fluidAbstract}
          alt=""
          fill
          className="object-cover object-center opacity-35"
          sizes="65px"
        />
      </div>

      <div className="relative bg-base/95 py-44 md:py-60">
        <div className="max-w-[800px] mx-auto px-8 md:px-16 text-center">
          <Reveal>
            <p className="font-display text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary mb-8">
              The system can be governed.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-display text-[1.5rem] md:text-[2.1rem] lg:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.01em] text-text-tertiary">
              But what governs the human it reshapes?
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
