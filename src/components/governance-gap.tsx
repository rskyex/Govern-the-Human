'use client'

import { Reveal } from '@/components/ui/reveal'

export function GovernanceGap() {
  return (
    <section id="governance-gap" className="bg-surface py-36 md:py-48">
      <div className="max-w-[680px] mx-auto px-6 md:px-12">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            04
          </p>
          <div className="w-8 h-px bg-rule mb-8" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.7rem] md:text-[2.2rem] font-normal leading-[1.28] tracking-[-0.01em] text-text-primary mb-8">
            The governance gap
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-10">
            <div className="mb-8">
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                First-order
              </p>
              <p className="font-sans text-[0.9rem] leading-[1.85] text-text-secondary font-light">
                Regulates system behaviour — outputs, fairness, safety, accountability.
                Asks: what should AI systems be permitted to do?
              </p>
            </div>

            <div className="w-6 h-px bg-rule mb-8" />

            <div>
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                Second-order
              </p>
              <p className="font-sans text-[0.9rem] leading-[1.85] text-text-secondary font-light">
                Examines the transformation of the subject who governs, consents, and
                deliberates. Asks: what is happening to the human who is supposed to
                answer that question?
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="font-sans text-[0.88rem] leading-[1.85] text-text-tertiary font-light italic">
            Without the second order, governance protects a version of the human
            that is already being transformed by the systems it seeks to regulate.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
