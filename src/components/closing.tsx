'use client'

import { Reveal } from '@/components/ui/reveal'

export function Closing() {
  return (
    <section className="relative py-32 md:py-48 bg-surface overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[600px] h-[600px] rounded-full border border-rule/40 opacity-20" />
      </div>

      <div className="relative z-10 max-w-[640px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <blockquote className="font-display text-[1.5rem] md:text-[2.2rem] lg:text-[2.6rem] font-normal leading-[1.3] tracking-[-0.015em] text-text-primary mb-10">
            The system can be governed.
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display text-[1.3rem] md:text-[1.8rem] lg:text-[2.1rem] font-normal leading-[1.3] tracking-[-0.01em] text-text-ghost italic">
            But what governs the human it reshapes?
          </p>
        </Reveal>
      </div>
    </section>
  )
}
