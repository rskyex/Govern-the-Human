'use client'

import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'
import { GlassMonolith, GlassSphere } from '@/components/ui/glass-forms'

export function Thesis() {
  return (
    <section id="thesis" className="relative py-28 md:py-40 bg-surface overflow-hidden">
      {/* ── Floating objects ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Large monolith — right edge, partially off-screen */}
        <GlassMonolith
          w={200}
          h={480}
          rx={6}
          ry={-10}
          rz={2}
          opacity={0.1}
          className="absolute hidden md:block"
          style={{ top: '10%', right: '-3%' }}
          duration="36s"
        />

        {/* Small sphere — left side */}
        <GlassSphere
          size={160}
          tint="139,126,184"
          glowColor="139,126,184"
          className="absolute"
          style={{ top: '15%', left: '3%' }}
          animation="float-2"
          duration="20s"
        />

        {/* Medium sphere — bottom right */}
        <GlassSphere
          size={220}
          className="absolute hidden lg:block"
          style={{ bottom: '5%', right: '15%' }}
          animation="float-3"
          duration="26s"
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-6 md:px-12">
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
