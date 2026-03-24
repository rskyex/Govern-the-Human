'use client'

import { Reveal } from '@/components/ui/reveal'

export function Closing() {
  return (
    <section className="py-32 md:py-44 bg-surface">
      <div className="max-w-[680px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <blockquote className="font-display text-[1.5rem] md:text-[2rem] lg:text-[2.2rem] font-normal leading-[1.35] tracking-[-0.01em] text-text-primary italic mb-8">
            The system can be governed.<br />
            <span className="text-text-tertiary">
              But what governs the human it reshapes?
            </span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-10 h-px bg-rule mx-auto mb-8" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-sans text-[0.92rem] leading-[1.8] text-text-tertiary font-light max-w-[500px] mx-auto mb-12">
            Without a second-order layer, governance protects a version of the
            human already being transformed.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#suite"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-text-primary text-base font-sans text-[13px] font-medium tracking-[0.02em] hover:bg-text-secondary transition-colors duration-400"
          >
            Explore the Suite
          </a>
        </Reveal>
      </div>
    </section>
  )
}
