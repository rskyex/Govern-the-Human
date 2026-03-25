'use client'

import { Reveal } from '@/components/ui/reveal'

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center bg-base overflow-hidden">
      {/* Subtle geometric background element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[520px] h-[520px] rounded-full border border-rule/60 opacity-40" />
        <div className="absolute w-[380px] h-[380px] rounded-full border border-rule/40 opacity-30" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-rule/30 opacity-20" />
      </div>

      <div className="relative z-10 max-w-[880px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-text-ghost mb-10">
            Research Project
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-normal leading-[1.05] tracking-[-0.025em] text-text-primary mb-8">
            Govern<br />
            <span className="italic text-text-tertiary">the Human</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="w-12 h-px bg-rule mx-auto mb-8" />
        </Reveal>

        <Reveal delay={0.25}>
          <p className="font-sans text-[0.95rem] md:text-[1.05rem] leading-[1.8] text-text-tertiary font-light max-w-[540px] mx-auto">
            On second-order AI governance, subject formation,
            and the conditions of self-governance under
            AI-mediated environments.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
