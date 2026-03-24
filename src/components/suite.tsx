'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

/* ━━━ Suite Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function Suite() {
  return (
    <section id="suite" className="py-28 md:py-40 bg-surface">
      <div className="max-w-[1040px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>The Suite</SectionLabel>
          <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[520px] mb-20">
            Three instruments for examining the governed subject
          </h2>
        </Reveal>

        <div className="space-y-16 md:space-y-20">
          <Reveal delay={0.05}>
            <ObservatoryCard />
          </Reveal>
          <Reveal delay={0.1}>
            <DriftCard />
          </Reveal>
          <Reveal delay={0.15}>
            <PlatformedCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ━━━ Observatory ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ObservatoryCard() {
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
      const time = Date.now() * 0.0003

      ctx.clearRect(0, 0, w, h)

      // Governance lattice — intersecting lines forming a grid that warps slowly
      const cols = 8
      const rows = 6
      const cellW = w / cols
      const cellH = h / rows

      ctx.strokeStyle = 'rgba(91,164,201,0.08)'
      ctx.lineWidth = 0.6

      // Vertical lines with sine warp
      for (let c = 1; c < cols; c++) {
        ctx.beginPath()
        for (let y = 0; y <= h; y += 2) {
          const warp = Math.sin(y * 0.015 + time + c * 0.5) * 6
          const x = c * cellW + warp
          if (y === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Horizontal lines with cosine warp
      for (let r = 1; r < rows; r++) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const warp = Math.cos(x * 0.012 + time * 1.1 + r * 0.6) * 4
          const y = r * cellH + warp
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Intersection nodes
      for (let c = 1; c < cols; c++) {
        for (let r = 1; r < rows; r++) {
          const x = c * cellW + Math.sin(r * cellH * 0.015 + time + c * 0.5) * 6
          const y = r * cellH + Math.cos(x * 0.012 + time * 1.1 + r * 0.6) * 4
          const pulse = 0.6 + Math.sin(time * 2 + c + r) * 0.4
          ctx.beginPath()
          ctx.arc(x, y, 1.5 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(91,164,201,${0.15 * pulse})`
          ctx.fill()
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => { draw(); id = requestAnimationFrame(loop) }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
      <div className="md:col-span-5 relative h-[240px] md:h-[280px] rounded-2xl overflow-hidden bg-base border border-panel-border">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, var(--color-base) 100%)' }} />
      </div>
      <div className="md:col-span-7">
        <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-2 block">
          Analytical
        </span>
        <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-normal leading-[1.2] text-text-primary mb-2">
          Ontological Governance Observatory
        </h3>
        <p className="font-sans text-[0.88rem] text-text-ghost font-light mb-4">
          Map the governance gap
        </p>
        <p className="font-sans text-[0.92rem] md:text-[0.95rem] leading-[1.8] text-text-secondary font-light max-w-[480px]">
          A systematic mapping of the gap between existing AI governance
          frameworks and the deeper epistemic, ontological, and political
          transformations they fail to address. Where current oversight ends,
          the Observatory begins.
        </p>
      </div>
    </article>
  )
}

/* ━━━ Narrative Drift ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function DriftCard() {
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
      const time = Date.now() * 0.0002

      ctx.clearRect(0, 0, w, h)

      // Drifting contour traces — like memory fragments shifting
      for (let i = 0; i < 7; i++) {
        const baseY = h * 0.12 + i * h * 0.115
        const drift = Math.sin(time * 0.8 + i * 1.2) * 20
        const opacity = 0.04 + Math.sin(time + i * 0.7) * 0.015

        ctx.beginPath()
        ctx.strokeStyle = `rgba(139,126,184,${opacity})`
        ctx.lineWidth = 0.8

        for (let x = 0; x <= w; x += 2) {
          const nx = x / w
          const y = baseY + drift +
            Math.sin(nx * 4 + time + i * 0.9) * 12 +
            Math.sin(nx * 8 + time * 1.5 + i * 0.4) * 5
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Fragmented echo (partial repeat, offset)
        if (i % 2 === 0) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(139,126,184,${opacity * 0.4})`
          const startX = w * 0.2 + Math.sin(time + i) * 30
          const endX = w * 0.7 + Math.cos(time + i) * 20
          for (let x = startX; x <= endX; x += 2) {
            const nx = x / w
            const y = baseY + drift + 8 +
              Math.sin(nx * 4 + time + i * 0.9) * 12 +
              Math.sin(nx * 8 + time * 1.5 + i * 0.4) * 5
            if (x === startX) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => { draw(); id = requestAnimationFrame(loop) }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
      <div className="md:col-span-7 md:order-1">
        <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-violet mb-2 block">
          Experiential
        </span>
        <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-normal leading-[1.2] text-text-primary mb-2">
          Narrative Drift
        </h3>
        <p className="font-sans text-[0.88rem] text-text-ghost font-light mb-4">
          Experience subject formation
        </p>
        <p className="font-sans text-[0.92rem] md:text-[0.95rem] leading-[1.8] text-text-secondary font-light max-w-[480px]">
          An experiential instrument that renders the slow, cumulative drift
          of narrative identity under AI-mediated conditions — making visible
          how the stories we tell about ourselves fragment, shift, and reform
          when memory and self-narration are no longer entirely our own.
        </p>
      </div>
      <div className="md:col-span-5 md:order-2 relative h-[240px] md:h-[280px] rounded-2xl overflow-hidden bg-base border border-panel-border">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, var(--color-base) 100%)' }} />
      </div>
    </article>
  )
}

/* ━━━ Platformed Self ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function PlatformedCard() {
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
      const cx = w / 2
      const cy = h / 2
      const time = Date.now() * 0.0003
      const scale = Math.min(w, h) / 300

      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(cx, cy)

      // Mirrored echoing profiles — original and reflections
      const profiles = [
        { offset: 0, opacity: 0.12, scale: 1 },
        { offset: 14, opacity: 0.06, scale: 0.92 },
        { offset: -14, opacity: 0.06, scale: 0.92 },
        { offset: 28, opacity: 0.03, scale: 0.84 },
        { offset: -28, opacity: 0.03, scale: 0.84 },
      ]

      for (const p of profiles) {
        const drift = Math.sin(time + p.offset * 0.1) * 2
        ctx.save()
        ctx.translate(p.offset * scale + drift, 0)

        // Simplified head contour
        const s = scale * p.scale * 0.7
        ctx.beginPath()
        ctx.moveTo(-5 * s, -50 * s)
        ctx.bezierCurveTo(20 * s, -60 * s, 38 * s, -50 * s, 40 * s, -30 * s)
        ctx.bezierCurveTo(42 * s, -15 * s, 40 * s, -5 * s, 35 * s, 5 * s)
        ctx.bezierCurveTo(32 * s, 12 * s, 30 * s, 20 * s, 25 * s, 25 * s)
        ctx.bezierCurveTo(18 * s, 32 * s, 8 * s, 38 * s, -5 * s, 38 * s)
        ctx.bezierCurveTo(-18 * s, 37 * s, -25 * s, 28 * s, -28 * s, 15 * s)
        ctx.bezierCurveTo(-30 * s, 0, -30 * s, -20 * s, -25 * s, -38 * s)
        ctx.bezierCurveTo(-20 * s, -48 * s, -12 * s, -52 * s, -5 * s, -50 * s)
        ctx.closePath()

        ctx.strokeStyle = `rgba(91,164,201,${p.opacity})`
        ctx.lineWidth = (p.offset === 0 ? 1.2 : 0.6) * scale
        ctx.stroke()

        ctx.restore()
      }

      // Connecting loop / feedback arc
      const loopRadius = 65 * scale
      ctx.beginPath()
      const startAngle = -Math.PI * 0.3 + time * 0.2
      ctx.arc(0, 5 * scale, loopRadius, startAngle, startAngle + Math.PI * 1.2)
      ctx.strokeStyle = 'rgba(139,126,184,0.05)'
      ctx.lineWidth = 0.6 * scale
      ctx.stroke()

      ctx.restore()
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => { draw(); id = requestAnimationFrame(loop) }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
      <div className="md:col-span-5 relative h-[240px] md:h-[280px] rounded-2xl overflow-hidden bg-base border border-panel-border">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, var(--color-base) 100%)' }} />
      </div>
      <div className="md:col-span-7">
        <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-tertiary mb-2 block">
          Reflective
        </span>
        <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-normal leading-[1.2] text-text-primary mb-2">
          The Platformed Self
        </h3>
        <p className="font-sans text-[0.88rem] text-text-ghost font-light mb-4">
          Trace the platformed self
        </p>
        <p className="font-sans text-[0.92rem] md:text-[0.95rem] leading-[1.8] text-text-secondary font-light max-w-[480px]">
          A reflective instrument that traces how identity is constructed,
          mirrored, and looped back through platformed and AI-mediated
          environments — revealing the recursive feedback between the self
          that performs and the system that shapes what it performs as.
        </p>
      </div>
    </article>
  )
}
