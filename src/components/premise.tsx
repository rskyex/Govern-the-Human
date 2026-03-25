'use client'

import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

export function Premise() {
  return (
    <section id="premise" className="relative py-28 md:py-40 bg-base">
      <div className="max-w-[720px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>Premise</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.8rem] md:text-[2.4rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary mb-8">
            AI governance addresses what systems do.{' '}
            <span className="italic text-text-tertiary">
              It does not yet address what they do to the human who encounters them.
            </span>
          </h2>
        </Reveal>

        <div className="w-10 h-px bg-rule mb-10" />

        <Reveal delay={0.1}>
          <p className="font-sans text-[0.92rem] leading-[1.85] text-text-secondary font-light mb-6">
            Current governance frameworks regulate AI outputs, enforce fairness constraints,
            and manage systemic risks. These are necessary. But they operate on a single plane:
            the behaviour of the system itself.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-sans text-[0.92rem] leading-[1.85] text-text-secondary font-light mb-6">
            What remains unaddressed is the second-order question: how does sustained
            interaction with AI systems reshape the human subject who is meant to govern,
            consent, resist, or deliberate?
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-sans text-[0.92rem] leading-[1.85] text-text-secondary font-light">
            If the subject is being transformed by the very systems it is supposed to
            oversee, then governance without a theory of the subject is governance
            of a moving target — by a moving governor.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
