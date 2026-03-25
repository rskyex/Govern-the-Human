'use client'

import { Reveal } from '@/components/ui/reveal'

export function Closing() {
  return (
    <section id="closing" className="bg-base py-40 md:py-56">
      <div className="max-w-[640px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <p className="font-display text-[1.6rem] md:text-[2.2rem] lg:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.015em] text-text-primary mb-6">
            The system can be governed.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display text-[1.3rem] md:text-[1.8rem] lg:text-[2rem] font-normal leading-[1.35] tracking-[-0.01em] text-text-ghost italic">
            But what governs the human it reshapes?
          </p>
        </Reveal>
      </div>
    </section>
  )
}
