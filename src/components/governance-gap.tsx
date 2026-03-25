'use client'

import { Reveal } from '@/components/ui/reveal'

function Diagram() {
  return (
    <div className="mt-16 mb-4">
      {/* ── Conventional framing ── */}
      <div className="mb-10">
        <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-6 text-center">
          Conventional framing
        </p>
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <div className="flex-shrink-0 text-center">
            <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-text-tertiary leading-tight">
              Human Subject
            </p>
            <p className="font-sans text-[9px] text-text-ghost font-light mt-0.5">
              assumed stable
            </p>
          </div>

          <svg width="40" height="12" viewBox="0 0 40 12" className="flex-shrink-0 text-text-ghost/50" aria-hidden="true">
            <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1" />
            <polyline points="30,2 36,6 30,10" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="flex-shrink-0 text-center">
            <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-text-tertiary leading-tight">
              Governance
            </p>
          </div>

          <svg width="40" height="12" viewBox="0 0 40 12" className="flex-shrink-0 text-text-ghost/50" aria-hidden="true">
            <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1" />
            <polyline points="30,2 36,6 30,10" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="flex-shrink-0 text-center">
            <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-text-tertiary leading-tight">
              AI System
            </p>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center justify-center gap-4 my-10">
        <div className="w-12 h-px bg-rule" />
        <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-text-ghost">
          reframed as
        </p>
        <div className="w-12 h-px bg-rule" />
      </div>

      {/* ── Second-order framing ── */}
      <div>
        <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-8 text-center">
          Second-order framing
        </p>

        <div className="flex items-start justify-center gap-4 md:gap-6">
          {/* Left: AI System */}
          <div className="flex-shrink-0 text-center pt-6">
            <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-text-tertiary leading-tight">
              AI System
            </p>
            <p className="font-sans text-[9px] text-text-ghost font-light mt-1">
              reshapes
            </p>
          </div>

          <svg width="40" height="48" viewBox="0 0 40 48" className="flex-shrink-0 text-text-ghost/50 mt-4" aria-hidden="true">
            <line x1="0" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1" />
            <polyline points="30,12 36,16 30,20" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Centre: Human Subject (contested) */}
          <div className="flex-shrink-0">
            <div className="border border-panel-border bg-panel backdrop-blur-sm rounded-sm px-5 py-4 text-center">
              <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-text-primary leading-tight">
                Human Subject
              </p>
              <p className="font-sans text-[9px] text-text-ghost font-light mt-1">
                under transformation
              </p>
            </div>
            {/* Three conditions */}
            <div className="flex justify-center gap-3 mt-4">
              <p className="font-display text-[11px] text-text-ghost">epistemic</p>
              <span className="text-text-ghost/30 text-[11px]">/</span>
              <p className="font-display text-[11px] text-text-ghost">ontological</p>
              <span className="text-text-ghost/30 text-[11px]">/</span>
              <p className="font-display text-[11px] text-text-ghost">political</p>
            </div>
          </div>

          <svg width="40" height="48" viewBox="0 0 40 48" className="flex-shrink-0 text-text-ghost/50 mt-4" aria-hidden="true">
            <line x1="40" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
            <polyline points="10,12 4,16 10,20" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Right: Governance */}
          <div className="flex-shrink-0 text-center pt-6">
            <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-text-tertiary leading-tight">
              Governance
            </p>
            <p className="font-sans text-[9px] text-text-ghost font-light mt-1">
              presupposes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GovernanceGap() {
  return (
    <section id="governance-gap" className="bg-surface py-36 md:py-48">
      <div className="max-w-[960px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            04
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column: text */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[2rem] md:text-[2.6rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-10">
                The governance gap
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mb-10">
                <div className="mb-8">
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                    First-order
                  </p>
                  <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                    Regulates system behaviour — outputs, fairness, safety, accountability.
                    Asks: what should AI systems be permitted to do?
                  </p>
                </div>

                <div className="w-8 h-px bg-rule mb-8" />

                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                    Second-order
                  </p>
                  <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                    Examines the transformation of the subject who governs, consents, and
                    deliberates. Asks: what is happening to the human who is supposed to
                    answer that question?
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="font-sans text-[0.93rem] leading-[1.85] text-text-tertiary font-light">
                Without the second order, governance protects a version of the human
                that is already being transformed by the systems it seeks to regulate.
              </p>
            </Reveal>
          </div>

          {/* Right column: diagram */}
          <div className="flex items-center">
            <Reveal delay={0.22}>
              <Diagram />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
