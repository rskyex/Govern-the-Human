'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

// ── Vertical arrow ──
function VerticalArrow({ label, emphasized = false, className = '' }: { label?: string; emphasized?: boolean; className?: string }) {
  const color = emphasized ? 'text-text-primary' : 'text-text-tertiary'
  const weight = emphasized ? 2 : 1.5
  return (
    <div className={`flex flex-col items-center gap-1.5 py-1 ${className}`}>
      <svg width="14" height="32" viewBox="0 0 14 32" className={color} aria-hidden="true">
        <line x1="7" y1="0" x2="7" y2="25" stroke="currentColor" strokeWidth={weight} />
        <polyline points="2,23 7,30 12,23" fill="none" stroke="currentColor" strokeWidth={weight} strokeLinejoin="round" />
      </svg>
      {label && (
        <p className={`font-sans text-[11px] italic leading-tight ${emphasized ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
          {label}
        </p>
      )}
    </div>
  )
}

// ── Upward arrow ──
function UpwardArrow({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 py-1 ${className}`}>
      {label && (
        <p className="font-sans text-[11px] text-text-secondary italic leading-tight">{label}</p>
      )}
      <svg width="14" height="28" viewBox="0 0 14 28" className="text-text-tertiary" aria-hidden="true">
        <line x1="7" y1="28" x2="7" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="2,9 7,2 12,9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ── Three-dimension chips ──
function DimensionChips() {
  const dimensions = [
    { name: 'Epistemic', gloss: 'how we know' },
    { name: 'Ontological', gloss: 'how we are' },
    { name: 'Political', gloss: 'how we act' },
  ]

  return (
    <div className="flex flex-col gap-2 w-full">
      {dimensions.map((d) => (
        <div key={d.name} className="border border-text-primary/10 bg-base rounded px-5 py-2.5 flex items-center justify-between">
          <p className="font-display text-[13px] italic text-text-primary font-medium">{d.name}</p>
          <p className="font-sans text-[11px] text-text-secondary">{d.gloss}</p>
        </div>
      ))}
    </div>
  )
}

// ── Human Subject node ──
function HumanSubjectNode({ className = '' }: { className?: string }) {
  return (
    <div className={`border-2 border-text-primary/20 bg-base rounded px-7 py-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${className}`}>
      <p className="font-sans text-[15px] tracking-[0.08em] uppercase text-text-primary leading-tight font-semibold">
        Human Subject
      </p>
      <p className="font-sans text-[12px] text-text-secondary mt-2 leading-snug">
        under transformation
      </p>
    </div>
  )
}

function Diagram() {
  return (
    <div className="mt-8 lg:mt-0 mb-4">
      <div className="flex flex-col items-center gap-0 max-w-[340px] mx-auto">

        {/* ── First-order framing ── */}
        <div className="w-full mb-10">
          <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-text-secondary text-center mb-5">
            First-order governance
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="border border-text-primary/10 bg-base rounded px-6 py-3.5 text-center w-full shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
              <p className="font-sans text-[13px] tracking-[0.06em] uppercase text-text-primary leading-tight font-medium">
                Governance
              </p>
              <p className="font-sans text-[11px] text-text-secondary mt-1.5">safety, fairness, accountability</p>
            </div>
            <VerticalArrow label="regulates" />
            <div className="border border-text-primary/10 bg-base rounded px-6 py-3.5 text-center w-full shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
              <p className="font-sans text-[13px] tracking-[0.06em] uppercase text-text-primary leading-tight font-medium">
                AI System
              </p>
              <p className="font-sans text-[11px] text-text-secondary mt-1.5">behaviour &amp; outputs</p>
            </div>
            <p className="font-sans text-[11px] text-text-tertiary italic mt-2">assumes a stable subject</p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center justify-center gap-5 w-full mb-10">
          <div className="flex-1 h-px bg-text-primary/10" />
          <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-text-secondary font-medium">
            reframed as
          </p>
          <div className="flex-1 h-px bg-text-primary/10" />
        </div>

        {/* ── Second-order framing ── */}
        <div className="w-full">
          <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-text-secondary text-center mb-5">
            Second-order governance
          </p>

          <div className="flex flex-col items-center gap-3">
            <div className="border border-text-primary/10 bg-base rounded px-6 py-3 text-center w-full shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
              <p className="font-sans text-[13px] tracking-[0.06em] uppercase text-text-primary leading-tight font-medium">
                AI System
              </p>
            </div>

            <VerticalArrow label="reshapes &amp; conditions" emphasized />

            {/* Human Subject — primary focal node */}
            <HumanSubjectNode className="w-full" />

            {/* Three dimensions */}
            <div className="mt-4 w-full">
              <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-text-secondary text-center mb-3">
                Dimensions of transformation
              </p>
              <DimensionChips />
            </div>

            {/* Governance presupposes */}
            <div className="mt-4">
              <UpwardArrow label="governance presupposes this subject" />
            </div>

            {/* Gap label */}
            <div className="mt-4 inline-block border-2 border-text-primary/15 rounded px-5 py-2">
              <p className="font-sans text-[11px] tracking-[0.12em] uppercase text-text-primary font-semibold">
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
    <section id="governance-gap" className="relative overflow-hidden">
      {/* Background image — faded atmospheric layer */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.governanceGap}
          alt=""
          fill
          className="object-cover object-center opacity-[0.07]"
          sizes="100vw"
        />
      </div>

      <div className="relative bg-surface/90 py-36 md:py-48">
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
                <div className="flex items-start gap-5 mb-10">
                  <div
                    className="hidden md:block flex-shrink-0 w-[4px] min-h-[40px] self-stretch rounded-full overflow-hidden"
                    style={{
                      maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                    }}
                  >
                    <Image
                      src={IMAGES.governanceGap}
                      alt=""
                      fill
                      className="object-cover opacity-50"
                      sizes="4px"
                    />
                  </div>
                  <h2 className="font-display text-[2rem] md:text-[2.6rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary">
                    The governance gap
                  </h2>
                </div>
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
      </div>
    </section>
  )
}
