'use client'

import { Reveal } from '@/components/ui/reveal'

// ── Vertical arrow ──
function VerticalArrow({ label, emphasized = false, className = '' }: { label?: string; emphasized?: boolean; className?: string }) {
  const color = emphasized ? 'text-text-secondary' : 'text-text-ghost/60'
  const weight = emphasized ? 1.5 : 1
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <svg width="12" height="28" viewBox="0 0 12 28" className={color} aria-hidden="true">
        <line x1="6" y1="0" x2="6" y2="22" stroke="currentColor" strokeWidth={weight} />
        <polyline points="2,20 6,26 10,20" fill="none" stroke="currentColor" strokeWidth={weight} />
      </svg>
      {label && (
        <p className={`font-sans text-[10px] italic leading-tight ${emphasized ? 'text-text-secondary font-medium' : 'text-text-ghost'}`}>
          {label}
        </p>
      )}
    </div>
  )
}

// ── Upward arrow ──
function UpwardArrow({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {label && (
        <p className="font-sans text-[10px] text-text-ghost italic leading-tight">{label}</p>
      )}
      <svg width="12" height="24" viewBox="0 0 12 24" className="text-text-ghost/60" aria-hidden="true">
        <line x1="6" y1="24" x2="6" y2="6" stroke="currentColor" strokeWidth="1" />
        <polyline points="2,8 6,2 10,8" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  )
}

// ── Three-dimension chips ──
function DimensionChips() {
  const dimensions = [
    { name: 'epistemic', gloss: 'knowing' },
    { name: 'ontological', gloss: 'being' },
    { name: 'political', gloss: 'acting' },
  ]

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {dimensions.map((d) => (
        <div key={d.name} className="border border-panel-border bg-panel rounded-sm px-4 py-2 flex items-center justify-between">
          <p className="font-display text-[12px] italic text-text-secondary">{d.name}</p>
          <p className="font-sans text-[10px] text-text-ghost">how we {d.gloss === 'knowing' ? 'know' : d.gloss === 'being' ? 'are' : 'act'}</p>
        </div>
      ))}
    </div>
  )
}

// ── Human Subject node ──
function HumanSubjectNode({ className = '' }: { className?: string }) {
  return (
    <div className={`border-2 border-text-primary/12 bg-base rounded px-6 py-5 text-center shadow-[0_1px_8px_rgba(0,0,0,0.04)] ${className}`}>
      <p className="font-sans text-[14px] tracking-[0.08em] uppercase text-text-primary leading-tight font-semibold">
        Human Subject
      </p>
      <p className="font-sans text-[11px] text-text-tertiary mt-1.5 leading-snug">
        under transformation
      </p>
    </div>
  )
}

function Diagram() {
  return (
    <div className="mt-8 lg:mt-0 mb-4">
      <div className="flex flex-col items-center gap-0 max-w-[300px] mx-auto">

        {/* ── First-order framing ── */}
        <div className="w-full mb-8">
          <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-text-ghost text-center mb-4">
            First-order governance
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="border border-panel-border bg-panel rounded-sm px-5 py-3 text-center w-full">
              <p className="font-sans text-[12px] tracking-[0.06em] uppercase text-text-tertiary leading-tight font-medium">
                Governance
              </p>
              <p className="font-sans text-[10px] text-text-ghost mt-1">safety, fairness, accountability</p>
            </div>
            <VerticalArrow label="regulates" />
            <div className="border border-panel-border bg-panel rounded-sm px-5 py-3 text-center w-full">
              <p className="font-sans text-[12px] tracking-[0.06em] uppercase text-text-tertiary leading-tight font-medium">
                AI System
              </p>
              <p className="font-sans text-[10px] text-text-ghost mt-1">behaviour &amp; outputs</p>
            </div>
            <p className="font-sans text-[10px] text-text-ghost italic mt-1">assumes a stable subject</p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center justify-center gap-4 w-full mb-8">
          <div className="flex-1 h-px bg-rule" />
          <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-text-ghost">
            reframed as
          </p>
          <div className="flex-1 h-px bg-rule" />
        </div>

        {/* ── Second-order framing ── */}
        <div className="w-full">
          <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-text-ghost text-center mb-4">
            Second-order governance
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="border border-panel-border bg-panel rounded-sm px-5 py-2.5 text-center w-full">
              <p className="font-sans text-[11px] tracking-[0.06em] uppercase text-text-tertiary leading-tight font-medium">
                AI System
              </p>
            </div>

            <VerticalArrow label="reshapes &amp; conditions" emphasized />

            {/* Human Subject — primary focal node */}
            <HumanSubjectNode className="w-full" />

            {/* Three dimensions */}
            <div className="mt-3 w-full">
              <p className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-text-ghost text-center mb-2">
                Dimensions of transformation
              </p>
              <DimensionChips />
            </div>

            {/* Governance presupposes */}
            <div className="mt-3">
              <UpwardArrow label="governance presupposes this subject" />
            </div>

            {/* Gap label */}
            <div className="mt-3 inline-block border border-text-primary/10 rounded-sm px-3.5 py-1.5">
              <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-text-secondary font-medium">
                the governance gap
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GovernanceGap() {
  return (
    <section id="governance-gap" className="bg-surface py-36 md:py-48">
      <div className="max-w-[1120px] mx-auto px-8 md:px-16">
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
