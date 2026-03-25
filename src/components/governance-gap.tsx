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

// ── Current Governance Diagram (formerly First-order) ──
function CurrentGovernanceDiagram() {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-text-subtitle text-center mb-4">
        Current governance
      </p>
      <div className="flex flex-col items-center gap-2 w-full max-w-[220px]">
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
  )
}

// ── Donut Diagram for Second-order Governance ──
function SecondOrderDonut() {
  const cx = 150, cy = 125, r = 80
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const ptX = (a: number) => cx + r * Math.cos(toRad(a))
  const ptY = (a: number) => cy + r * Math.sin(toRad(a))

  // Node positions: top, bottom-right, bottom-left
  const nodes = [
    { name: 'epistemic', gloss: 'knowing', angle: -90 },
    { name: 'ontological', gloss: 'being', angle: 30 },
    { name: 'political', gloss: 'acting', angle: 150 },
  ]

  const gap = 24 // degrees of gap near each node for arcs
  const arcD = (a1: number, a2: number) => {
    let a2adj = a2
    if (a2adj <= a1) a2adj += 360
    const large = (a2adj - a1) > 180 ? 1 : 0
    return `M ${ptX(a1)} ${ptY(a1)} A ${r} ${r} 0 ${large} 1 ${ptX(a2adj)} ${ptY(a2adj)}`
  }

  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-text-subtitle text-center mb-4">
        Second-order governance
      </p>

      {/* AI System box */}
      <div className="border border-panel-border bg-panel rounded-sm px-4 py-2 text-center mb-1">
        <p className="font-sans text-[11px] tracking-[0.06em] uppercase text-text-tertiary leading-tight font-medium">
          AI System
        </p>
      </div>

      <VerticalArrow label="reshapes &amp; conditions" emphasized />

      {/* Donut SVG */}
      <svg viewBox="0 0 300 260" className="w-full max-w-[300px] -mt-1">
        {/* Dashed ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Arrowhead marker */}
        <defs>
          <marker id="darrow" viewBox="0 0 8 6" refX="7" refY="3" markerWidth="5" markerHeight="4" orient="auto">
            <polyline points="0,0.5 7,3 0,5.5" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
          </marker>
        </defs>

        {/* Arc arrows between nodes */}
        <path d={arcD(-90 + gap, 30 - gap)} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" markerEnd="url(#darrow)" />
        <path d={arcD(30 + gap, 150 - gap)} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" markerEnd="url(#darrow)" />
        <path d={arcD(150 + gap, 270 - gap)} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" markerEnd="url(#darrow)" />

        {/* Node ellipses */}
        {nodes.map((n) => (
          <ellipse
            key={n.name}
            cx={ptX(n.angle)}
            cy={ptY(n.angle)}
            rx="38"
            ry="18"
            fill="white"
            stroke="rgba(140,155,175,0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Node labels */}
        {nodes.map((n) => (
          <g key={`t-${n.name}`}>
            <text
              x={ptX(n.angle)}
              y={ptY(n.angle) - 2}
              textAnchor="middle"
              style={{ fontSize: '10px', fontStyle: 'italic', fill: '#363a45', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {n.name}
            </text>
            <text
              x={ptX(n.angle)}
              y={ptY(n.angle) + 11}
              textAnchor="middle"
              style={{ fontSize: '8px', fill: '#9da2b0', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {n.gloss}
            </text>
          </g>
        ))}

        {/* Center: Human Subject */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          style={{ fontSize: '11px', fontWeight: 600, fill: '#0e1117', fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: '0.06em' }}
        >
          HUMAN SUBJECT
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          style={{ fontSize: '9px', fill: '#6b7080', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          under transformation
        </text>

        {/* Upward arrow below ring */}
        <line x1={cx} y1={cy + r + 22} x2={cx} y2={cy + r + 8} stroke="#9da2b0" strokeWidth="1" opacity="0.5" />
        <polyline
          points={`${cx - 3},${cy + r + 12} ${cx},${cy + r + 6} ${cx + 3},${cy + r + 12}`}
          fill="none"
          stroke="#9da2b0"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* "governance presupposes" label */}
        <text
          x={cx}
          y={cy + r + 38}
          textAnchor="middle"
          style={{ fontSize: '9px', fontStyle: 'italic', fill: '#9da2b0', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          governance presupposes this subject
        </text>
      </svg>

      {/* Governance gap label */}
      <div className="border border-text-primary/10 rounded-sm px-3.5 py-1.5 -mt-1">
        <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-text-subtitle font-medium">
          the governance gap
        </p>
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
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          {/* Section number */}
          <Reveal>
            <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
              04
            </p>
            <div className="w-10 h-px bg-rule mb-10" />
          </Reveal>

          {/* Title */}
          <Reveal delay={0.05}>
            <h2 className="font-display text-[2rem] md:text-[2.6rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-10">
              The governance gap
            </h2>
          </Reveal>

          {/* Description text */}
          <div className="max-w-[700px] mb-16">
            <Reveal delay={0.1}>
              <div className="mb-8">
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-subtitle mb-3">
                  Current approach
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  Regulates system behaviour — outputs, fairness, safety, accountability.
                  Asks: what should AI systems be permitted to do?
                </p>
              </div>
            </Reveal>

            <div className="w-8 h-px bg-rule mb-8" />

            <Reveal delay={0.14}>
              <div className="mb-8">
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-subtitle mb-3">
                  Second-order
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  Examines the transformation of the subject who governs, consents, and
                  deliberates. Asks: what is happening to the human who is supposed to
                  answer that question?
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="font-sans text-[0.93rem] leading-[1.85] text-text-tertiary font-light">
                Without the second order, governance protects a version of the human
                that is already being transformed by the systems it seeks to regulate.
              </p>
            </Reveal>
          </div>

          {/* Diagrams side by side */}
          <Reveal delay={0.22}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-center justify-items-center">
              {/* Left: Current governance */}
              <CurrentGovernanceDiagram />

              {/* ⇔ connector — desktop */}
              <div className="hidden md:flex flex-col items-center gap-1">
                <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-text-subtitle mb-1">
                  reframed as
                </p>
                <span className="text-[1.6rem] text-text-ghost leading-none">⇔</span>
              </div>

              {/* ⇔ connector — mobile */}
              <div className="flex md:hidden items-center justify-center gap-3 w-full">
                <div className="flex-1 h-px bg-rule" />
                <div className="flex flex-col items-center">
                  <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-text-subtitle mb-0.5">
                    reframed as
                  </p>
                  <span className="text-[1.2rem] text-text-ghost leading-none">⇔</span>
                </div>
                <div className="flex-1 h-px bg-rule" />
              </div>

              {/* Right: Second-order governance donut */}
              <SecondOrderDonut />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
