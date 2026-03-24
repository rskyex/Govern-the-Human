'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Suite — three distinct object ecologies
 *
 *  Observatory : governance ring + small scanning arcs
 *  Drift       : drifting head contour echoes that slowly separate
 *  Platformed  : mirrored ghost pair facing each other
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── shared paths ── */

function headPath(ctx: CanvasRenderingContext2D, s: number) {
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

function cranialProfile(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  ctx.moveTo(-15 * s, -95 * s)
  ctx.bezierCurveTo(30 * s, -115 * s, 75 * s, -105 * s, 85 * s, -72 * s)
  ctx.bezierCurveTo(92 * s, -48 * s, 88 * s, -30 * s, 78 * s, -15 * s)
  ctx.bezierCurveTo(72 * s, -5 * s, 75 * s, 8 * s, 72 * s, 18 * s)
  ctx.bezierCurveTo(68 * s, 30 * s, 60 * s, 38 * s, 52 * s, 42 * s)
  ctx.bezierCurveTo(44 * s, 48 * s, 32 * s, 60 * s, 18 * s, 68 * s)
  ctx.bezierCurveTo(6 * s, 74 * s, -12 * s, 72 * s, -24 * s, 64 * s)
  ctx.bezierCurveTo(-36 * s, 56 * s, -42 * s, 40 * s, -44 * s, 22 * s)
  ctx.bezierCurveTo(-48 * s, -8 * s, -50 * s, -38 * s, -42 * s, -66 * s)
  ctx.bezierCurveTo(-36 * s, -86 * s, -26 * s, -94 * s, -15 * s, -95 * s)
  ctx.closePath()
}

/* ── Observatory canvas: ring + scan arcs ── */

function ObservatoryCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }

    function draw() {
      if (!c || !ctx) return
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.0001
      const r = Math.min(w, h) * 0.38
      const cx = w * 0.5 + Math.sin(t * 0.82) * 2
      const cy = h * 0.5 + Math.cos(t * 0.68) * 2
      ctx.clearRect(0, 0, w, h)

      ctx.save()
      ctx.translate(cx, cy)

      // Ring bands
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.06)'; ctx.lineWidth = r * 0.08; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, r * 0.76, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.03)'; ctx.lineWidth = r * 0.025; ctx.stroke()

      // Markers
      const rot = t * 0.12
      ctx.save(); ctx.rotate(rot)
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2
        const major = i % 6 === 0
        const len = major ? r * 0.08 : r * 0.035
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * (r - r * 0.04 - len), Math.sin(a) * (r - r * 0.04 - len))
        ctx.lineTo(Math.cos(a) * (r - r * 0.04), Math.sin(a) * (r - r * 0.04))
        ctx.strokeStyle = `rgba(91,164,201,${major ? 0.14 : 0.05})`
        ctx.lineWidth = major ? 1.3 : 0.6; ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore()

      // Hand
      const ha = t * 0.18
      ctx.beginPath(); ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(ha) * r * 0.68, Math.sin(ha) * r * 0.68)
      ctx.strokeStyle = 'rgba(91,164,201,0.06)'; ctx.lineWidth = 0.8; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91,164,201,0.12)'; ctx.fill()

      ctx.restore()
    }

    resize(); window.addEventListener('resize', resize)
    let id: number; const loop = () => { draw(); id = requestAnimationFrame(loop) }; loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}

/* ── Drift canvas: drifting cranial echoes separating ── */

function DriftCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }

    function draw() {
      if (!c || !ctx) return
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.0001
      const s = Math.min(w, h) / 340
      ctx.clearRect(0, 0, w, h)

      ctx.save()
      ctx.translate(w * 0.5, h * 0.48)

      // 5 echoes of the same cranial profile, slowly drifting apart
      for (let i = 0; i < 5; i++) {
        const spread = Math.sin(t * 0.524 + i * 0.3) * (3 + i * 2.5)
        const vertDrift = Math.sin(t * 0.785 + i * 0.7) * (1 + i * 1.2)
        const scale = 1 - i * 0.08
        const op = 0.07 - i * 0.012
        const color = i % 2 === 0 ? '91,164,201' : '139,126,184'

        ctx.save()
        ctx.translate(spread, vertDrift)
        cranialProfile(ctx, s * scale)
        ctx.strokeStyle = `rgba(${color},${op})`
        ctx.lineWidth = 0.7 - i * 0.08
        ctx.stroke()
        if (i === 0) {
          const fg = ctx.createRadialGradient(10 * s, -20 * s, 0, 0, 0, 80 * s)
          fg.addColorStop(0, 'rgba(91,164,201,0.02)')
          fg.addColorStop(1, 'rgba(91,164,201,0)')
          ctx.fillStyle = fg
          ctx.fill()
        }
        ctx.restore()
      }

      ctx.restore()
    }

    resize(); window.addEventListener('resize', resize)
    let id: number; const loop = () => { draw(); id = requestAnimationFrame(loop) }; loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}

/* ── Platformed canvas: mirrored ghost heads facing each other ── */

function PlatformedCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }

    function draw() {
      if (!c || !ctx) return
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.0001
      const s = Math.min(w, h) / 320
      ctx.clearRect(0, 0, w, h)

      const gap = 28 * s + Math.sin(t * 0.698) * 3 * s // gap oscillates
      const floatY = Math.sin(t * 1.05) * 3

      // Left-facing head
      ctx.save()
      ctx.translate(w * 0.5 - gap, h * 0.48 + floatY)
      headPath(ctx, s * 0.85)
      const lg = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 48 * s)
      lg.addColorStop(0, 'rgba(91,164,201,0.04)')
      lg.addColorStop(1, 'rgba(91,164,201,0.008)')
      ctx.fillStyle = lg; ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.08)'; ctx.lineWidth = 1; ctx.stroke()
      headPath(ctx, s * 0.62)
      ctx.strokeStyle = 'rgba(139,126,184,0.04)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()

      // Right-facing head (mirrored)
      ctx.save()
      ctx.translate(w * 0.5 + gap, h * 0.48 + floatY)
      ctx.scale(-1, 1)
      headPath(ctx, s * 0.85)
      const rg = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 48 * s)
      rg.addColorStop(0, 'rgba(91,164,201,0.035)')
      rg.addColorStop(1, 'rgba(91,164,201,0.006)')
      ctx.fillStyle = rg; ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.065)'; ctx.lineWidth = 1; ctx.stroke()
      headPath(ctx, s * 0.62)
      ctx.strokeStyle = 'rgba(139,126,184,0.03)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()

      // Connecting arc between them — the feedback loop
      ctx.save()
      ctx.translate(w * 0.5, h * 0.48 + floatY)
      ctx.beginPath()
      ctx.arc(0, -10 * s, gap + 20 * s, Math.PI * 0.15, Math.PI * 0.85)
      ctx.strokeStyle = 'rgba(91,164,201,0.025)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.beginPath()
      ctx.arc(0, 10 * s, gap + 20 * s, -Math.PI * 0.85, -Math.PI * 0.15)
      ctx.strokeStyle = 'rgba(139,126,184,0.02)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()
    }

    resize(); window.addEventListener('resize', resize)
    let id: number; const loop = () => { draw(); id = requestAnimationFrame(loop) }; loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}

/* ━━━ Suite ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Section-level ambient canvas — large forms floating behind the cards ── */

function SuiteAmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }

    function draw() {
      if (!c || !ctx) return
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.0001
      const vmin = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      // ── Large ghost silhouette — right edge, tall, faint ──
      const gs = vmin / 600
      const gx = w * 0.88 + Math.sin(t * 0.74) * 3
      const gy = h * 0.22 + Math.sin(t * 0.92) * 5
      ctx.save()
      ctx.translate(gx, gy)
      ctx.scale(1 + Math.sin(t * 1.57) * 0.003, 1 + Math.sin(t * 1.57) * 0.003)
      // Torso
      ctx.save(); ctx.translate(0, 45 * gs)
      ctx.beginPath()
      ctx.moveTo(-14 * gs, 0); ctx.lineTo(-14 * gs, 18 * gs)
      ctx.bezierCurveTo(-20 * gs, 22 * gs, -55 * gs, 28 * gs, -82 * gs, 36 * gs)
      ctx.bezierCurveTo(-92 * gs, 40 * gs, -96 * gs, 56 * gs, -90 * gs, 72 * gs)
      ctx.bezierCurveTo(-84 * gs, 78 * gs, -68 * gs, 76 * gs, -56 * gs, 80 * gs)
      ctx.bezierCurveTo(-48 * gs, 100 * gs, -44 * gs, 128 * gs, -40 * gs, 160 * gs)
      ctx.bezierCurveTo(-32 * gs, 180 * gs, -16 * gs, 190 * gs, 0, 192 * gs)
      ctx.bezierCurveTo(16 * gs, 190 * gs, 32 * gs, 180 * gs, 40 * gs, 160 * gs)
      ctx.bezierCurveTo(44 * gs, 128 * gs, 48 * gs, 100 * gs, 56 * gs, 80 * gs)
      ctx.bezierCurveTo(68 * gs, 76 * gs, 84 * gs, 78 * gs, 90 * gs, 72 * gs)
      ctx.bezierCurveTo(96 * gs, 56 * gs, 92 * gs, 40 * gs, 82 * gs, 36 * gs)
      ctx.bezierCurveTo(55 * gs, 28 * gs, 20 * gs, 22 * gs, 14 * gs, 18 * gs)
      ctx.lineTo(14 * gs, 0); ctx.closePath()
      const tg = ctx.createLinearGradient(0, 0, 0, 192 * gs)
      tg.addColorStop(0, 'rgba(91,164,201,0.025)'); tg.addColorStop(0.5, 'rgba(91,164,201,0.012)')
      tg.addColorStop(1, 'rgba(91,164,201,0)'); ctx.fillStyle = tg; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.04)'; ctx.lineWidth = 0.8; ctx.stroke()
      ctx.restore()
      // Head
      headPath(ctx, gs)
      const hfg = ctx.createRadialGradient(0, -6 * gs, 0, 0, 0, 52 * gs)
      hfg.addColorStop(0, 'rgba(91,164,201,0.03)'); hfg.addColorStop(0.5, 'rgba(91,164,201,0.012)')
      hfg.addColorStop(1, 'rgba(91,164,201,0.003)'); ctx.fillStyle = hfg; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.055)'; ctx.lineWidth = 1; ctx.stroke()
      headPath(ctx, gs * 0.72); ctx.strokeStyle = 'rgba(139,126,184,0.025)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()

      // ── Governance ring — upper left area ──
      const rr = vmin * 0.15
      const rx = w * 0.08 + Math.sin(t * 0.82) * 2
      const ry = h * 0.12 + Math.cos(t * 0.68) * 2
      ctx.save(); ctx.translate(rx, ry)
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.06)'; ctx.shadowBlur = 10
      ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.035)'; ctx.lineWidth = rr * 0.07; ctx.stroke(); ctx.restore()
      ctx.beginPath(); ctx.arc(0, 0, rr * 0.74, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.018)'; ctx.lineWidth = rr * 0.02; ctx.stroke()
      ctx.save(); ctx.rotate(t * 0.1)
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2; const major = i % 6 === 0
        const len = major ? rr * 0.06 : rr * 0.025
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * (rr - rr * 0.035 - len), Math.sin(a) * (rr - rr * 0.035 - len))
        ctx.lineTo(Math.cos(a) * (rr - rr * 0.035), Math.sin(a) * (rr - rr * 0.035))
        ctx.strokeStyle = `rgba(91,164,201,${major ? 0.08 : 0.025})`; ctx.lineWidth = major ? 0.9 : 0.4
        ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore(); ctx.restore()

      // ── 4 orbs scattered ──
      for (const orb of [
        { x: 0.05, y: 0.48, r: 0.05, ph: 0 },
        { x: 0.72, y: 0.08, r: 0.04, ph: 1.8 },
        { x: 0.94, y: 0.7, r: 0.035, ph: 3.5 },
        { x: 0.32, y: 0.92, r: 0.03, ph: 5.1 },
      ]) {
        const or = vmin * orb.r
        const oa = t * (0.4 + orb.ph * 0.015) + orb.ph
        ctx.save()
        ctx.translate(w * orb.x + Math.cos(oa) * or * 0.6, h * orb.y + Math.sin(oa) * or * 0.4)
        ctx.beginPath(); ctx.arc(0, 0, or, 0, Math.PI * 2)
        const og = ctx.createRadialGradient(-or * 0.18, -or * 0.2, 0, 0, 0, or)
        og.addColorStop(0, 'rgba(91,164,201,0.03)'); og.addColorStop(0.5, 'rgba(91,164,201,0.012)')
        og.addColorStop(1, 'rgba(91,164,201,0.002)'); ctx.fillStyle = og; ctx.fill()
        ctx.strokeStyle = 'rgba(145,195,225,0.045)'; ctx.lineWidth = 0.6; ctx.stroke()
        ctx.beginPath(); ctx.arc(0, 0, or * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(139,126,184,0.018)'; ctx.lineWidth = 0.3; ctx.stroke()
        ctx.restore()
      }
    }

    resize(); window.addEventListener('resize', resize)
    let id: number; const loop = () => { draw(); id = requestAnimationFrame(loop) }; loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

export function Suite() {
  return (
    <section id="suite" className="relative py-28 md:py-40 bg-surface overflow-hidden">
      <SuiteAmbientCanvas />
      <div className="relative z-10 max-w-[1040px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>The Suite</SectionLabel>
          <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[520px] mb-20">
            Three instruments for examining the governed subject
          </h2>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          <Reveal delay={0.05}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-6 relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-base border border-panel-border">
                <ObservatoryCanvas />
              </div>
              <div className="md:col-span-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-2 block">Analytical</span>
                <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-normal leading-[1.2] text-text-primary mb-2">Ontological Governance Observatory</h3>
                <p className="font-sans text-[0.88rem] text-text-ghost font-light mb-4">Map the governance gap</p>
                <p className="font-sans text-[0.92rem] md:text-[0.95rem] leading-[1.8] text-text-secondary font-light max-w-[480px]">
                  A systematic mapping of the gap between existing AI governance frameworks and the deeper epistemic, ontological, and political transformations they fail to address. Where current oversight ends, the Observatory begins.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-6 md:order-1">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-violet mb-2 block">Experiential</span>
                <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-normal leading-[1.2] text-text-primary mb-2">Narrative Drift</h3>
                <p className="font-sans text-[0.88rem] text-text-ghost font-light mb-4">Experience subject formation</p>
                <p className="font-sans text-[0.92rem] md:text-[0.95rem] leading-[1.8] text-text-secondary font-light max-w-[480px]">
                  An experiential instrument that renders the slow, cumulative drift of narrative identity under AI-mediated conditions — making visible how the stories we tell about ourselves fragment, shift, and reform when memory and self-narration are no longer entirely our own.
                </p>
              </div>
              <div className="md:col-span-6 md:order-2 relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-base border border-panel-border">
                <DriftCanvas />
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.15}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-6 relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-base border border-panel-border">
                <PlatformedCanvas />
              </div>
              <div className="md:col-span-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-tertiary mb-2 block">Reflective</span>
                <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-normal leading-[1.2] text-text-primary mb-2">The Platformed Self</h3>
                <p className="font-sans text-[0.88rem] text-text-ghost font-light mb-4">Trace the platformed self</p>
                <p className="font-sans text-[0.92rem] md:text-[0.95rem] leading-[1.8] text-text-secondary font-light max-w-[480px]">
                  A reflective instrument that traces how identity is constructed, mirrored, and looped back through platformed and AI-mediated environments — revealing the recursive feedback between the self that performs and the system that shapes what it performs as.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
