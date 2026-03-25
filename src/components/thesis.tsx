'use client'

import { Reveal } from '@/components/ui/reveal'

export function Thesis() {
  return (
    <section id="thesis" className="bg-base py-36 md:py-48">
      <div className="max-w-[960px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            01
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <div className="max-w-[740px]">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[2rem] md:text-[2.6rem] lg:text-[3rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-10">
              AI governance addresses what systems do.{' '}
              <span className="italic text-text-tertiary">
                It does not yet address what they do to the human who encounters them.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              Current governance frameworks regulate AI outputs, enforce fairness
              constraints, and manage systemic risks. These are necessary. But they
              operate on a single plane: the behaviour of the system itself.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              What remains unaddressed is the second-order question: how does sustained
              interaction with AI systems reshape the human subject who is meant to
              govern, consent, resist, or deliberate?
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
              If the subject is being transformed by the very systems it is supposed to
              oversee, then governance without a theory of the subject is governance of
              a moving target — by a moving governor.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
