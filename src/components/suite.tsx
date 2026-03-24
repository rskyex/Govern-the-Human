'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'
import { GlassRing, GlassSphere, GlassPlane, GlassMonolith } from '@/components/ui/glass-forms'

/* ━━━ Suite Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function Suite() {
  return (
    <section id="suite" className="relative py-28 md:py-40 bg-surface overflow-hidden">
      {/* Section-level floating objects */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Large ring behind header */}
        <GlassRing
          diameter={400}
          tube={22}
          rx={55}
          ry={-20}
          tint="91,164,201"
          opacity={0.06}
          style={{ top: '-4%', left: '50%', marginLeft: -200 }}
          duration="40s"
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>The Suite</SectionLabel>
          <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[520px] mb-20">
            Three instruments for examining the governed subject
          </h2>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
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

      const cols = 10
      const rows = 8
      const cellW = w / cols
      const cellH = h / rows

      // Vertical lines
      ctx.lineWidth = 0.6
      for (let c = 1; c < cols; c++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(91,164,201,${0.06 + Math.sin(time + c) * 0.015})`
        for (let y = 0; y <= h; y += 2) {
          const warp = Math.sin(y * 0.012 + time + c * 0.5) * 8 + Math.sin(y * 0.025 + time * 1.3) * 3
          const x = c * cellW + warp
          if (y === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Horizontal lines
      for (let r = 1; r < rows; r++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(91,164,201,${0.05 + Math.sin(time * 0.8 + r) * 0.012})`
        for (let x = 0; x <= w; x += 2) {
          const warp = Math.cos(x * 0.01 + time * 1.1 + r * 0.6) * 5 + Math.cos(x * 0.022 + time * 0.7) * 2
          const y = r * cellH + warp
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Intersection nodes with varying sizes
      for (let c = 1; c < cols; c++) {
        for (let r = 1; r < rows; r++) {
          const x = c * cellW + Math.sin(r * cellH * 0.012 + time + c * 0.5) * 8
          const y = r * cellH + Math.cos(x * 0.01 + time * 1.1 + r * 0.6) * 5
          const pulse = 0.5 + Math.sin(time * 2 + c * 1.1 + r * 0.7) * 0.5
          ctx.beginPath()
          ctx.arc(x, y, 2 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(91,164,201,${0.12 * pulse})`
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
    <article className="relative">
      {/* Floating sphere companion */}
      <GlassSphere
        size={180}
        className="absolute hidden lg:block"
        style={{ top: '-30px', right: '-40px', zIndex: 5 }}
        animation="float-2"
        duration="22s"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-6 relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-base border border-panel-border">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--color-base) 100%)' }} />
        </div>
        <div className="md:col-span-6">
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

      // Main contour traces
      for (let i = 0; i < 9; i++) {
        const baseY = h * 0.08 + i * h * 0.1
        const drift = Math.sin(time * 0.7 + i * 1.2) * 24
        const opacity = 0.04 + Math.sin(time + i * 0.6) * 0.015

        ctx.beginPath()
        ctx.strokeStyle = `rgba(139,126,184,${opacity})`
        ctx.lineWidth = 0.9

        for (let x = 0; x <= w; x += 2) {
          const nx = x / w
          const y = baseY + drift +
            Math.sin(nx * 4 + time + i * 0.9) * 14 +
            Math.sin(nx * 9 + time * 1.4 + i * 0.3) * 6 +
            Math.sin(nx * 2.5 + time * 0.6 + i * 1.5) * 8
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Fragmented echo
        if (i % 2 === 0) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(139,126,184,${opacity * 0.35})`
          const startX = w * (0.15 + Math.sin(time + i) * 0.08)
          const endX = w * (0.75 + Math.cos(time + i) * 0.06)
          for (let x = startX; x <= endX; x += 2) {
            const nx = x / w
            const y = baseY + drift + 10 +
              Math.sin(nx * 4 + time + i * 0.9) * 14 +
              Math.sin(nx * 9 + time * 1.4 + i * 0.3) * 6
            if (x === startX) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }

        // Second echo — more faded, more offset
        if (i % 3 === 0) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(139,126,184,${opacity * 0.18})`
          const startX = w * 0.3
          const endX = w * 0.6
          for (let x = startX; x <= endX; x += 2) {
            const nx = x / w
            const y = baseY + drift + 18 +
              Math.sin(nx * 4 + time + i * 0.9) * 14
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
    <article className="relative">
      {/* Floating monolith companion */}
      <GlassMonolith
        w={120}
        h={320}
        rx={5}
        ry={8}
        rz={-2}
        opacity={0.08}
        className="absolute hidden lg:block"
        style={{ top: '-40px', left: '-50px', zIndex: 5 }}
        animation="float-3"
        duration="28s"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-6 md:order-1">
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
        <div className="md:col-span-6 md:order-2 relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-base border border-panel-border">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--color-base) 100%)' }} />
        </div>
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

      // More echoing profiles — 7 layers
      const profiles = [
        { offset: 0, opacity: 0.14, scale: 1 },
        { offset: 16, opacity: 0.07, scale: 0.93 },
        { offset: -16, opacity: 0.07, scale: 0.93 },
        { offset: 32, opacity: 0.04, scale: 0.86 },
        { offset: -32, opacity: 0.04, scale: 0.86 },
        { offset: 48, opacity: 0.02, scale: 0.78 },
        { offset: -48, opacity: 0.02, scale: 0.78 },
      ]

      for (const p of profiles) {
        const drift = Math.sin(time + p.offset * 0.08) * 3
        ctx.save()
        ctx.translate(p.offset * scale + drift, Math.sin(time * 0.7 + p.offset * 0.05) * 2)

        const s = scale * p.scale * 0.75
        ctx.beginPath()
        ctx.moveTo(-5 * s, -55 * s)
        ctx.bezierCurveTo(22 * s, -65 * s, 42 * s, -55 * s, 44 * s, -32 * s)
        ctx.bezierCurveTo(46 * s, -15 * s, 43 * s, -3 * s, 38 * s, 8 * s)
        ctx.bezierCurveTo(34 * s, 15 * s, 32 * s, 22 * s, 27 * s, 28 * s)
        ctx.bezierCurveTo(20 * s, 35 * s, 8 * s, 42 * s, -5 * s, 42 * s)
        ctx.bezierCurveTo(-20 * s, 41 * s, -28 * s, 30 * s, -30 * s, 16 * s)
        ctx.bezierCurveTo(-33 * s, 0, -33 * s, -22 * s, -27 * s, -40 * s)
        ctx.bezierCurveTo(-22 * s, -52 * s, -13 * s, -57 * s, -5 * s, -55 * s)
        ctx.closePath()

        ctx.strokeStyle = `rgba(91,164,201,${p.opacity})`
        ctx.lineWidth = (p.offset === 0 ? 1.4 : 0.6) * scale
        ctx.stroke()

        if (p.offset === 0) {
          ctx.fillStyle = 'rgba(91,164,201,0.008)'
          ctx.fill()
        }

        ctx.restore()
      }

      // Feedback loops — multiple arcs
      for (let i = 0; i < 3; i++) {
        const loopRadius = (55 + i * 18) * scale
        const startAngle = -Math.PI * 0.3 + time * (0.15 - i * 0.03) + i * 0.8
        ctx.beginPath()
        ctx.arc(0, 5 * scale, loopRadius, startAngle, startAngle + Math.PI * (1.0 - i * 0.15))
        ctx.strokeStyle = `rgba(139,126,184,${0.04 - i * 0.01})`
        ctx.lineWidth = (0.7 - i * 0.1) * scale
        ctx.stroke()
      }

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
    <article className="relative">
      {/* Floating plane companion */}
      <GlassPlane
        w={280}
        h={200}
        rx={-8}
        ry={14}
        opacity={0.07}
        blur={12}
        radius={20}
        className="absolute hidden lg:block"
        style={{ bottom: '-30px', right: '-40px', zIndex: 5 }}
        duration="26s"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-6 relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-base border border-panel-border">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--color-base) 100%)' }} />
        </div>
        <div className="md:col-span-6">
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
      </div>
    </article>
  )
}
