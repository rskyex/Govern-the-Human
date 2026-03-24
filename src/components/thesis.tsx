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

    function drawOrb(cx: number, cy: number, r: number, t: number, ph: number) {
      if (!ctx) return
      const orbA = t * (0.17 + ph * 0.02) + ph
      const ox = cx + Math.cos(orbA) * r * 0.7
      const oy = cy + Math.sin(orbA) * r * 0.5
      ctx.save()
      ctx.translate(ox, oy)
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.06)'; ctx.shadowBlur = r * 0.5
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.005)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore()
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
      const og = ctx.createRadialGradient(-r * 0.18, -r * 0.22, 0, 0, 0, r)
      og.addColorStop(0, 'rgba(91,164,201,0.07)'); og.addColorStop(0.4, 'rgba(91,164,201,0.03)')
      og.addColorStop(1, 'rgba(91,164,201,0.003)'); ctx.fillStyle = og; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.11)'; ctx.lineWidth = 0.8; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(139,126,184,0.01)'; ctx.fill()
      ctx.strokeStyle = 'rgba(139,126,184,0.035)'; ctx.lineWidth = 0.4; ctx.stroke()
      ctx.restore()
    }

    function drawRingCompact(cx: number, cy: number, r: number, t: number) {
      if (!ctx) return
      ctx.save(); ctx.translate(cx, cy)
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.14)'; ctx.shadowBlur = 12
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.085)'; ctx.lineWidth = r * 0.08; ctx.stroke(); ctx.restore()
      ctx.beginPath(); ctx.arc(0, 0, r * 0.76, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.025)'; ctx.lineWidth = r * 0.025; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, r * 0.56, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(139,126,184,0.018)'; ctx.lineWidth = 0.6; ctx.stroke()
      const rot = t * 0.05; ctx.save(); ctx.rotate(rot)
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2; const major = i % 6 === 0
        const len = major ? r * 0.08 : r * 0.03
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * (r - r * 0.04 - len), Math.sin(a) * (r - r * 0.04 - len))
        ctx.lineTo(Math.cos(a) * (r - r * 0.04), Math.sin(a) * (r - r * 0.04))
        ctx.strokeStyle = `rgba(91,164,201,${major ? 0.2 : 0.065})`; ctx.lineWidth = major ? 1.2 : 0.5
        ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore()
      const ha = t * 0.065; ctx.beginPath(); ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(ha) * r * 0.65, Math.sin(ha) * r * 0.65)
      ctx.strokeStyle = 'rgba(91,164,201,0.08)'; ctx.lineWidth = 0.8; ctx.lineCap = 'round'; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, 1.8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91,164,201,0.1)'; ctx.fill()
      ctx.restore()
    }

    function drawCranialHead(cx: number, cy: number, s: number, t: number, opacity: number) {
      if (!ctx) return
      const tilt = Math.sin(t * 0.21) * 0.03
      ctx.save(); ctx.translate(cx + Math.sin(t * 0.33) * 5, cy + Math.sin(t * 0.42) * 9)
      ctx.rotate(tilt)
      // Glow
      ctx.save(); ctx.shadowColor = `rgba(91,164,201,${0.2 * opacity})`; ctx.shadowBlur = 38 * s
      drawCranialProfile(ctx, s); ctx.strokeStyle = 'rgba(91,164,201,0.005)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore()
      // Fill
      drawCranialProfile(ctx, s)
      const fg = ctx.createRadialGradient(10 * s, -20 * s, 0, 0, 0, 95 * s)
      fg.addColorStop(0, `rgba(91,164,201,${0.075 * opacity})`); fg.addColorStop(0.35, `rgba(91,164,201,${0.042 * opacity})`)
      fg.addColorStop(0.7, `rgba(91,164,201,${0.017 * opacity})`); fg.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = fg; ctx.fill()
      // Secondary subsurface
      drawCranialProfile(ctx, s * 0.9)
      const fg2 = ctx.createRadialGradient(-15 * s, 10 * s, 0, 0, 0, 70 * s)
      fg2.addColorStop(0, `rgba(130,160,210,${0.025 * opacity})`); fg2.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = fg2; ctx.fill()
      // Rim
      drawCranialProfile(ctx, s)
      ctx.strokeStyle = `rgba(145,195,225,${0.17 * opacity})`; ctx.lineWidth = 1.8; ctx.stroke()
      drawCranialProfile(ctx, s * 0.97)
      ctx.strokeStyle = `rgba(180,215,235,${0.06 * opacity})`; ctx.lineWidth = 0.5; ctx.stroke()
      // Frosted inner shells
      const shells = [0.8, 0.6, 0.42]
      shells.forEach((sc, i) => {
        const lag = Math.sin(t * 0.33 - 0.1 * (i + 1)) * 1.5
        ctx.save(); ctx.translate(lag, Math.cos(t * 0.42 - 0.08 * (i + 1)) * 1)
        drawCranialProfile(ctx, s * sc)
        ctx.fillStyle = `rgba(139,126,184,${[0.019, 0.01, 0.005][i] * opacity})`; ctx.fill()
        ctx.strokeStyle = `rgba(139,126,184,${[0.072, 0.04, 0.024][i] * opacity})`
        ctx.lineWidth = 0.55 - i * 0.1; ctx.stroke(); ctx.restore()
      })
      // Caustics
      ctx.save(); drawCranialProfile(ctx, s); ctx.clip()
      const hl = ctx.createRadialGradient(-10 * s, -40 * s, 0, -10 * s, -40 * s, 30 * s)
      hl.addColorStop(0, `rgba(255,255,255,${0.14 * opacity})`); hl.addColorStop(0.3, `rgba(255,255,255,${0.05 * opacity})`)
      hl.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = hl
      ctx.fillRect(-55 * s, -100 * s, 110 * s, 90 * s); ctx.restore()
      ctx.restore()
    }

    function draw() {
      if (!c || !ctx) return
      const w = c.offsetWidth, h = c.offsetHeight
      const t = Date.now() * 0.00005
      const vmin = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      // ── Primary cranial profile — right side, large ──
      drawCranialHead(w * 0.78, h * 0.48, vmin / 170, t, 1)

      // ── Mirror echo — left side, fainter, slightly delayed ──
      drawCranialHead(w * 0.15, h * 0.38, vmin / 240, t - 0.4, 0.45)

      // ── Governance ring — left-centre, large, partially behind text ──
      drawRingCompact(
        w * 0.28 + Math.sin(t * 0.74) * 3,
        h * 0.68 + Math.cos(t * 0.62) * 2,
        vmin * 0.28, t,
      )

      // ── Orbs — 4, scattered at different scales ──
      drawOrb(w * 0.06, h * 0.28, vmin * 0.1, t, 0)
      drawOrb(w * 0.42, h * 0.15, vmin * 0.07, t, 1.8)
      drawOrb(w * 0.92, h * 0.72, vmin * 0.085, t, 3.5)
      drawOrb(w * 0.55, h * 0.82, vmin * 0.055, t, 5.2)
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
