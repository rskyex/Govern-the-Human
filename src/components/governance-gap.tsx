'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Governance Gap — unified canvas composition
 *
 *  Upper area  : governance ring (the lens / analytical instrument)
 *  Centre-right: ghost silhouette sinking downward (the examined subject)
 *  Scattered   : memory orbs at depth-zone boundaries
 *
 *  The ghost descends through the three visibility zones — observed at
 *  the surface, partial in the middle, missed deep below — matching
 *  the information architecture of the depth-chamber UI.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── shared path helpers (same as hero) ── */

function drawHead(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  ctx.moveTo(0, -48 * s)
  ctx.bezierCurveTo(30 * s, -48 * s, 48 * s, -28 * s, 48 * s, -2 * s)
  ctx.bezierCurveTo(48 * s, 18 * s, 40 * s, 34 * s, 28 * s, 44 * s)
  ctx.bezierCurveTo(18 * s, 52 * s, 8 * s, 56 * s, 0, 58 * s)
  ctx.bezierCurveTo(-8 * s, 56 * s, -18 * s, 52 * s, -28 * s, 44 * s)
  ctx.bezierCurveTo(-40 * s, 34 * s, -48 * s, 18 * s, -48 * s, -2 * s)
  ctx.bezierCurveTo(-48 * s, -28 * s, -30 * s, -48 * s, 0, -48 * s)
  ctx.closePath()
}

function drawTorso(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  ctx.moveTo(-14 * s, 0)
  ctx.lineTo(-14 * s, 18 * s)
  ctx.bezierCurveTo(-20 * s, 22 * s, -55 * s, 28 * s, -82 * s, 36 * s)
  ctx.bezierCurveTo(-92 * s, 40 * s, -96 * s, 56 * s, -90 * s, 72 * s)
  ctx.bezierCurveTo(-84 * s, 78 * s, -68 * s, 76 * s, -56 * s, 80 * s)
  ctx.bezierCurveTo(-48 * s, 100 * s, -44 * s, 128 * s, -40 * s, 160 * s)
  ctx.bezierCurveTo(-32 * s, 180 * s, -16 * s, 190 * s, 0, 192 * s)
  ctx.bezierCurveTo(16 * s, 190 * s, 32 * s, 180 * s, 40 * s, 160 * s)
  ctx.bezierCurveTo(44 * s, 128 * s, 48 * s, 100 * s, 56 * s, 80 * s)
  ctx.bezierCurveTo(68 * s, 76 * s, 84 * s, 78 * s, 90 * s, 72 * s)
  ctx.bezierCurveTo(96 * s, 56 * s, 92 * s, 40 * s, 82 * s, 36 * s)
  ctx.bezierCurveTo(55 * s, 28 * s, 20 * s, 22 * s, 14 * s, 18 * s)
  ctx.lineTo(14 * s, 0)
  ctx.closePath()
}

/* ── Sinking ghost — fades and blurs as it descends ── */

function drawSinkingGhost(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  t: number,
  h: number,
) {
  const drift = Math.sin(t * 2) * 4
  const breathe = 1 + Math.sin(t * 3.5) * 0.006

  ctx.save()
  ctx.translate(cx + drift, cy + Math.sin(t * 1.4) * 3)
  ctx.scale(breathe, breathe)

  // Calculate vertical fade — ghost gets more transparent as it goes deeper
  const depthRatio = Math.max(0, Math.min(1, (cy / h)))
  const fadeMultiplier = 1 - depthRatio * 0.5

  // ── Torso ──
  ctx.save()
  ctx.translate(0, 50 * s)

  drawTorso(ctx, s * 1.06)
  ctx.fillStyle = `rgba(91,164,201,${0.01 * fadeMultiplier})`
  ctx.fill()

  drawTorso(ctx, s)
  const tg = ctx.createLinearGradient(0, 0, 0, 192 * s)
  tg.addColorStop(0, `rgba(91,164,201,${0.04 * fadeMultiplier})`)
  tg.addColorStop(0.5, `rgba(91,164,201,${0.02 * fadeMultiplier})`)
  tg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = tg
  ctx.fill()
  ctx.strokeStyle = `rgba(91,164,201,${0.06 * fadeMultiplier})`
  ctx.lineWidth = 1.2
  ctx.stroke()

  drawTorso(ctx, s * 0.88)
  ctx.strokeStyle = `rgba(139,126,184,${0.03 * fadeMultiplier})`
  ctx.lineWidth = 0.6
  ctx.stroke()

  ctx.restore()

  // ── Head ──
  drawHead(ctx, s * 1.1)
  ctx.fillStyle = `rgba(91,164,201,${0.012 * fadeMultiplier})`
  ctx.fill()

  drawHead(ctx, s)
  const hg = ctx.createRadialGradient(0, 0, 0, 0, 0, 52 * s)
  hg.addColorStop(0, `rgba(91,164,201,${0.05 * fadeMultiplier})`)
  hg.addColorStop(0.6, `rgba(91,164,201,${0.025 * fadeMultiplier})`)
  hg.addColorStop(1, `rgba(91,164,201,${0.01 * fadeMultiplier})`)
  ctx.fillStyle = hg
  ctx.fill()
  ctx.strokeStyle = `rgba(91,164,201,${0.1 * fadeMultiplier})`
  ctx.lineWidth = 1.3
  ctx.stroke()

  drawHead(ctx, s * 0.76)
  ctx.strokeStyle = `rgba(139,126,184,${0.05 * fadeMultiplier})`
  ctx.lineWidth = 0.7
  ctx.stroke()

  // ── Thought traces ──
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + t * 0.7
    const r1 = 8 * s
    const r2 = 26 * s + Math.sin(t * 2.5 + i * 1.3) * 6 * s
    const a2 = angle + 0.6 + Math.sin(t * 1.8 + i) * 0.3
    ctx.beginPath()
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1)
    ctx.quadraticCurveTo(
      Math.cos(angle + 0.3) * r2 * 0.65,
      Math.sin(angle + 0.3) * r2 * 0.65,
      Math.cos(a2) * r2,
      Math.sin(a2) * r2,
    )
    ctx.strokeStyle = `rgba(91,164,201,${(0.035 + Math.sin(t * 3 + i) * 0.012) * fadeMultiplier})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // Highlight
  const hlg = ctx.createRadialGradient(-12 * s, -18 * s, 0, -12 * s, -18 * s, 22 * s)
  hlg.addColorStop(0, `rgba(255,255,255,${0.07 * fadeMultiplier})`)
  hlg.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hlg
  ctx.fillRect(-40 * s, -50 * s, 80 * s, 60 * s)

  ctx.restore()
}

/* ── Ring (same as hero) ── */

function drawRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
) {
  ctx.save()
  ctx.translate(cx, cy)

  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.065)'
  ctx.lineWidth = r * 0.1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.03)'
  ctx.lineWidth = r * 0.035
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139,126,184,0.02)'
  ctx.lineWidth = 1
  ctx.stroke()

  const rot = t * 0.25
  ctx.save()
  ctx.rotate(rot)
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2
    const major = i % 6 === 0
    const len = major ? r * 0.08 : r * 0.04
    const inner = r - r * 0.05 - len
    const outer = r - r * 0.05
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
    ctx.strokeStyle = `rgba(91,164,201,${major ? 0.12 : 0.05})`
    ctx.lineWidth = major ? 1.3 : 0.7
    ctx.stroke()
  }
  ctx.restore()

  ctx.save()
  ctx.rotate(-rot * 0.6)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const inner = r * 0.78 - r * 0.035
    const outer = r * 0.78 - r * 0.005
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
    ctx.strokeStyle = 'rgba(91,164,201,0.04)'
    ctx.lineWidth = 0.6
    ctx.stroke()
  }
  ctx.restore()

  const handA = t * 0.4
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(Math.cos(handA) * r * 0.7, Math.sin(handA) * r * 0.7)
  const hg = ctx.createLinearGradient(0, 0, Math.cos(handA) * r * 0.7, Math.sin(handA) * r * 0.7)
  hg.addColorStop(0, 'rgba(91,164,201,0.06)')
  hg.addColorStop(1, 'rgba(91,164,201,0.01)')
  ctx.strokeStyle = hg
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, 2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(91,164,201,0.1)'
  ctx.fill()

  ctx.restore()
}

/* ── Orb (simplified, small) ── */

function drawOrb(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
  phase: number,
) {
  ctx.save()
  ctx.translate(cx + Math.sin(t * 2 + phase) * 5, cy + Math.cos(t * 1.5 + phase) * 4)

  const og = ctx.createRadialGradient(0, 0, r * 0.6, 0, 0, r * 1.2)
  og.addColorStop(0, 'rgba(91,164,201,0.018)')
  og.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = og
  ctx.beginPath()
  ctx.arc(0, 0, r * 1.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  const sg = ctx.createRadialGradient(-r * 0.2, -r * 0.25, 0, 0, 0, r)
  sg.addColorStop(0, 'rgba(91,164,201,0.035)')
  sg.addColorStop(0.5, 'rgba(91,164,201,0.015)')
  sg.addColorStop(1, 'rgba(91,164,201,0.006)')
  ctx.fillStyle = sg
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.07)'
  ctx.lineWidth = 1
  ctx.stroke()

  for (let i = 0; i < 3; i++) {
    const p = (i / 3) * Math.PI * 2 + t * (0.5 + i * 0.07) + phase
    const oA = r * (0.3 + i * 0.06)
    const oB = r * (0.16 + i * 0.04)
    const tilt = i * 0.5 + phase * 0.2
    ctx.beginPath()
    for (let j = 0; j <= 25; j++) {
      const a = p + (j / 25) * Math.PI
      const x = Math.cos(a) * oA
      const y = Math.sin(a) * oB
      const rx = x * Math.cos(tilt) - y * Math.sin(tilt)
      const ry = x * Math.sin(tilt) + y * Math.cos(tilt)
      if (j === 0) ctx.moveTo(rx, ry)
      else ctx.lineTo(rx, ry)
    }
    ctx.strokeStyle = `rgba(139,126,184,${0.022 + Math.sin(t * 2 + i + phase) * 0.008})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  const hlg = ctx.createRadialGradient(-r * 0.25, -r * 0.28, 0, -r * 0.25, -r * 0.28, r * 0.45)
  hlg.addColorStop(0, 'rgba(255,255,255,0.08)')
  hlg.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hlg
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/* ━━━ Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

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

/* ━━━ Canvas Background ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function GapCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    function resize() {
      if (!canvas || !ctx) return
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const t = Date.now() * 0.0001
      const vmin = Math.min(w, h)

      ctx.clearRect(0, 0, w, h)

      // ── Ring — upper-left, the analytical lens ──
      const ringR = vmin * 0.17
      drawRing(
        ctx,
        w * 0.15 + Math.sin(t * 1.2) * 5,
        h * 0.12 + Math.cos(t * 1.0) * 4,
        ringR,
        t,
      )

      // ── Sinking ghost — right side, descending through section ──
      const ghostScale = vmin / 650
      drawSinkingGhost(ctx, w * 0.78, h * 0.32, ghostScale, t, h)

      // ── Orbs at depth-zone boundaries ──
      // Near the observed/partial boundary
      drawOrb(ctx, w * 0.88, h * 0.42, vmin * 0.04, t, 0)
      // Near the partial/missed boundary
      drawOrb(ctx, w * 0.7, h * 0.62, vmin * 0.035, t, 1.8)
      // Deep in the missed zone
      drawOrb(ctx, w * 0.85, h * 0.82, vmin * 0.03, t, 3.6)
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => { draw(); id = requestAnimationFrame(loop) }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

/* ━━━ Main Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function GovernanceGap() {
  return (
    <section id="gap" className="relative py-28 md:py-40 bg-base overflow-hidden">
      <GapCanvas />

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
      style={{ filter: zone === 'missed' ? 'blur(0.3px)' : 'none' }}
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
