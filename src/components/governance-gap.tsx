'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'
import { NestedChambers, GlassPlane, GlassSphere } from '@/components/ui/glass-forms'

/* ━━━ Governance Gap Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface GapItem {
  label: string
  visibility: 'observed' | 'partial' | 'missed'
}

const GAP_ITEMS: GapItem[] = [
  { label: 'System Outputs', visibility: 'observed' },
  { label: 'Model Risk', visibility: 'observed' },
  { label: 'Explainability', visibility: 'observed' },
  { label: 'Transparency', visibility: 'observed' },
  { label: 'Epistemic Conditioning', visibility: 'partial' },
  { label: 'Narrative Identity Effects', visibility: 'partial' },
  { label: 'Memory Outsourcing', visibility: 'missed' },
  { label: 'Cumulative Personalised Drift', visibility: 'missed' },
  { label: 'Democratic Subject Formation', visibility: 'missed' },
  { label: 'Self-Governance Erosion', visibility: 'missed' },
]

const ZONE_META = {
  observed: {
    label: 'Observed',
    sublabel: 'Surface-level — visible, legible, regulated',
    color: 'var(--color-accent)',
    borderOpacity: 0.25,
    descClass: 'text-text-secondary',
  },
  partial: {
    label: 'Partial',
    sublabel: 'Unstable — acknowledged, incompletely governed',
    color: 'var(--color-violet)',
    borderOpacity: 0.18,
    descClass: 'text-text-tertiary',
  },
  missed: {
    label: 'Missed',
    sublabel: 'Embedded — structurally hidden, ungoverned',
    color: 'var(--color-text-ghost)',
    borderOpacity: 0.12,
    descClass: 'text-text-ghost',
  },
} as const

/* ━━━ Main Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function GovernanceGap() {
  return (
    <section id="gap" className="relative py-28 md:py-40 bg-base overflow-hidden">
      {/* ── Large floating objects ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Nested chambers — large, right side */}
        <div className="absolute hidden lg:block" style={{ top: '8%', right: '2%' }}>
          <NestedChambers outerSize={300} />
        </div>

        {/* Glass plane — left, behind content */}
        <GlassPlane
          w={440}
          h={320}
          rx={10}
          ry={12}
          opacity={0.06}
          blur={14}
          radius={28}
          className="absolute hidden md:block"
          style={{ bottom: '5%', left: '-6%' }}
          duration="34s"
        />

        {/* Sphere — bottom right */}
        <GlassSphere
          size={200}
          tint="139,126,184"
          glowColor="139,126,184"
          className="absolute hidden lg:block"
          style={{ bottom: '10%', right: '8%' }}
          animation="float-3"
          duration="28s"
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>The Governance Gap</SectionLabel>
          <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[600px] mb-6">
            What current frameworks see —{' '}
            <span className="text-text-tertiary">
              and what remains structurally invisible
            </span>
          </h2>
          <p className="font-sans text-[0.92rem] leading-[1.8] text-text-tertiary font-light max-w-[560px] mb-20">
            Governance operates at the surface. The deeper the effect is embedded
            in the subject, the less visible it becomes to existing frameworks.
          </p>
        </Reveal>

        <DepthChamber />
      </div>
    </section>
  )
}

/* ━━━ Depth Chamber ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function DepthChamber() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const zones: Array<'observed' | 'partial' | 'missed'> = ['observed', 'partial', 'missed']

  return (
    <div ref={ref} className="relative">
      {zones.map((zone, zoneIndex) => {
        const meta = ZONE_META[zone]
        const items = GAP_ITEMS.filter((i) => i.visibility === zone)
        const insetPx = zoneIndex * 24

        return (
          <motion.div
            key={zone}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: zoneIndex * 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative mb-4 last:mb-0"
            style={{ marginLeft: insetPx, marginRight: insetPx }}
          >
            <div
              className="rounded-xl px-6 md:px-10 py-8 md:py-10"
              style={{
                border: `1px solid rgba(${zone === 'observed' ? '91,164,201' : zone === 'partial' ? '139,126,184' : '168,179,196'},${meta.borderOpacity})`,
                background: zone === 'missed'
                  ? 'rgba(234,239,245,0.25)'
                  : zone === 'partial'
                    ? 'rgba(243,245,249,0.2)'
                    : 'rgba(255,255,255,0.4)',
                backdropFilter: zone === 'missed' ? 'blur(8px)' : zone === 'partial' ? 'blur(4px)' : 'none',
                boxShadow: zone === 'missed'
                  ? 'inset 0 2px 20px rgba(168,179,196,0.06)'
                  : zone === 'partial'
                    ? 'inset 0 1px 12px rgba(139,126,184,0.03)'
                    : '0 1px 3px rgba(91,164,201,0.04)',
              }}
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span
                  className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </span>
                <span className={`font-sans text-[12px] font-light ${meta.descClass}`}>
                  {meta.sublabel}
                </span>
              </div>

              <div className={`flex flex-wrap gap-3 ${zone === 'missed' ? 'gap-y-4' : ''}`}>
                {items.map((item, i) => (
                  <GapChip
                    key={item.label}
                    item={item}
                    zone={zone}
                    inView={inView}
                    delay={zoneIndex * 0.2 + i * 0.06 + 0.3}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Depth arrow */}
      <div className="absolute -left-2 md:left-0 top-4 bottom-4 flex flex-col items-center pointer-events-none">
        <div className="w-px flex-1 bg-gradient-to-b from-accent/20 via-violet/15 to-text-ghost/10" />
        <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-text-ghost mt-2 [writing-mode:vertical-lr] rotate-180">
          Depth
        </span>
      </div>
    </div>
  )
}

/* ━━━ Gap Chip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function GapChip({
  item,
  zone,
  inView,
  delay,
}: {
  item: GapItem
  zone: 'observed' | 'partial' | 'missed'
  inView: boolean
  delay: number
}) {
  const meta = ZONE_META[zone]

  const chipStyles: Record<string, string> = {
    observed: 'bg-base border-accent/20 text-text-primary',
    partial: 'bg-surface border-violet/15 text-text-secondary',
    missed: 'bg-surface-deep/60 border-text-ghost/10 text-text-tertiary',
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: zone === 'missed' ? 0.5 : zone === 'partial' ? 0.72 : 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-sans text-[0.82rem] md:text-[0.85rem] font-light ${chipStyles[zone]}`}
      style={{
        filter: zone === 'missed' ? 'blur(0.3px)' : 'none',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          backgroundColor: meta.color,
          opacity: zone === 'missed' ? 0.3 : zone === 'partial' ? 0.5 : 0.7,
          animation: zone === 'partial' ? 'pulse-glow 4s ease-in-out infinite' : 'none',
        }}
      />
      {item.label}
    </motion.span>
  )
}
