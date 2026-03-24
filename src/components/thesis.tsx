'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Thesis — quiet, contemplative chamber
 *
 *  Right side: a single transparent lateral head profile, slowly tilting.
 *  Left: 2 small memory orbs drifting. The question being asked.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function drawCranialProfile(ctx: CanvasRenderingContext2D, s: number) {
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

function ThesisCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }

    function draw() {
      if (!c || !ctx) return
      const w = c.offsetWidth, h = c.offsetHeight
      const t = Date.now() * 0.0001
      const vmin = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      // ── Lateral head profile — right side, slowly tilting ──
      const headS = vmin / 280
      const hx = w * 0.78 + Math.sin(t * 0.82) * 3
      const hy = h * 0.48 + Math.sin(t * 1.05) * 5
      const tilt = Math.sin(t * 0.524) * 0.015

      ctx.save()
      ctx.translate(hx, hy)
      ctx.rotate(tilt)

      // Subsurface glow
      ctx.save()
      ctx.shadowColor = 'rgba(91,164,201,0.12)'
      ctx.shadowBlur = 22 * headS
      drawCranialProfile(ctx, headS)
      ctx.strokeStyle = 'rgba(91,164,201,0.006)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      // Primary subsurface fill
      drawCranialProfile(ctx, headS)
      const fg = ctx.createRadialGradient(10 * headS, -20 * headS, 0, 0, 0, 95 * headS)
      fg.addColorStop(0, 'rgba(91,164,201,0.045)')
      fg.addColorStop(0.35, 'rgba(91,164,201,0.025)')
      fg.addColorStop(0.7, 'rgba(91,164,201,0.01)')
      fg.addColorStop(1, 'rgba(91,164,201,0.003)')
      ctx.fillStyle = fg
      ctx.fill()

      // Secondary subsurface — colour shift
      drawCranialProfile(ctx, headS * 0.9)
      const fg2 = ctx.createRadialGradient(-15 * headS, 10 * headS, 0, 0, 0, 70 * headS)
      fg2.addColorStop(0, 'rgba(130,160,210,0.015)')
      fg2.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = fg2
      ctx.fill()

      // Rim edge — surface tension
      drawCranialProfile(ctx, headS)
      ctx.strokeStyle = 'rgba(145,195,225,0.1)'
      ctx.lineWidth = 1.2
      ctx.stroke()
      // Inner tension line
      drawCranialProfile(ctx, headS * 0.97)
      ctx.strokeStyle = 'rgba(180,215,235,0.035)'
      ctx.lineWidth = 0.3
      ctx.stroke()

      // Frosted inner shells — filled membranes, each lagging
      const shells = [0.8, 0.6, 0.42]
      const fillOps = [0.012, 0.006, 0.003]
      const strokeOps = [0.045, 0.025, 0.015]
      const shellColors = ['139,126,184', '91,164,201', '139,126,184']
      shells.forEach((sc, i) => {
        const lag = Math.sin(t * 0.82 - 0.1 * (i + 1)) * 1.5
        ctx.save()
        ctx.translate(lag, Math.cos(t * 1.05 - 0.08 * (i + 1)) * 1)
        drawCranialProfile(ctx, headS * sc)
        ctx.fillStyle = `rgba(${shellColors[i]},${fillOps[i]})`
        ctx.fill()
        ctx.strokeStyle = `rgba(${shellColors[i]},${strokeOps[i]})`
        ctx.lineWidth = 0.55 - i * 0.1
        ctx.stroke()
        ctx.restore()
      })

      // Caustic highlights (clipped)
      ctx.save()
      drawCranialProfile(ctx, headS)
      ctx.clip()
      const hl = ctx.createRadialGradient(-10 * headS, -40 * headS, 0, -10 * headS, -40 * headS, 30 * headS)
      hl.addColorStop(0, 'rgba(255,255,255,0.09)')
      hl.addColorStop(0.3, 'rgba(255,255,255,0.03)')
      hl.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hl
      ctx.fillRect(-55 * headS, -100 * headS, 110 * headS, 90 * headS)
      const hl2 = ctx.createRadialGradient(20 * headS, 25 * headS, 0, 20 * headS, 25 * headS, 18 * headS)
      hl2.addColorStop(0, 'rgba(255,255,255,0.03)')
      hl2.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hl2
      ctx.fillRect(0, 10 * headS, 50 * headS, 40 * headS)
      ctx.restore()

      ctx.restore()

      // ── Two small orbs — left side ──
      for (const orb of [{ x: 0.14, y: 0.3, r: 0.04, ph: 0 }, { x: 0.08, y: 0.7, r: 0.03, ph: 2.5 }]) {
        const or = vmin * orb.r
        const orbA = t * 0.45 + orb.ph
        const ox = w * orb.x + Math.cos(orbA) * or * 0.7
        const oy = h * orb.y + Math.sin(orbA) * or * 0.5

        ctx.save()
        ctx.translate(ox, oy)

        // Subsurface fill
        ctx.beginPath()
        ctx.arc(0, 0, or, 0, Math.PI * 2)
        const og = ctx.createRadialGradient(-or * 0.2, -or * 0.25, 0, 0, 0, or)
        og.addColorStop(0, 'rgba(91,164,201,0.04)')
        og.addColorStop(0.4, 'rgba(91,164,201,0.018)')
        og.addColorStop(1, 'rgba(91,164,201,0.003)')
        ctx.fillStyle = og
        ctx.fill()
        // Rim
        ctx.strokeStyle = 'rgba(145,195,225,0.07)'
        ctx.lineWidth = 0.8
        ctx.stroke()
        // Frosted inner shell
        ctx.beginPath()
        ctx.arc(0, 0, or * 0.65, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(139,126,184,0.006)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(139,126,184,0.025)'
        ctx.lineWidth = 0.4
        ctx.stroke()

        ctx.restore()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => { draw(); id = requestAnimationFrame(loop) }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

export function Thesis() {
  return (
    <section id="thesis" className="relative py-28 md:py-40 bg-surface overflow-hidden">
      <ThesisCanvas />

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
