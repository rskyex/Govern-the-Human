'use client'

import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

export function Thesis() {
  return (
    <section id="thesis" className="py-28 md:py-40 bg-surface">
      <div className="max-w-[1040px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>Why This Exists</SectionLabel>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-6" delay={0.05}>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary">
              Current AI governance frameworks regulate systems and harms —{' '}
              <span className="text-text-tertiary">
                but do not adequately govern what those systems do to the epistemic,
                ontological, and political conditions of the human beings governance
                exists to protect.
              </span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:pt-2" delay={0.15}>
            <div className="space-y-6 font-sans text-[0.95rem] md:text-[1rem] leading-[1.8] text-text-secondary font-light">
              <p>
                We regulate AI outputs, biases, and deployment risks. But we have not yet
                built governance for the deeper transformation: the reshaping of the human
                subject who is supposed to be doing the governing.
              </p>
              <p>
                When AI systems mediate how people form beliefs, perceive themselves,
                and participate in politics — the foundations of democratic governance
                are altered at the level of the subject, not just the system.
              </p>
              <p>
                This project asks what governance looks like when it starts not with
                the machine, but with the question of what kind of human is being
                produced on the other side.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
