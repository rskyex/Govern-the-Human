'use client'

import { useEffect, useRef } from 'react'
import { Reveal } from '@/components/ui/reveal'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Closing — distant, unresolved chamber
 *
 *  A single ghost silhouette, very far away, very faint, barely there.
 *  Slowly receding. The question left open.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

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

function torsoPath(ctx: CanvasRenderingContext2D, s: number) {
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

function ClosingCanvas() {
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

      // ── Large governance ring — centre, the structure that persists ──
      const ringR = vmin * 0.22
      const ringCx = w * 0.5 + Math.sin(t * 0.74) * 2
      const ringCy = h * 0.46 + Math.cos(t * 0.62) * 2
      ctx.save()
      ctx.translate(ringCx, ringCy)
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.06)'; ctx.shadowBlur = 14
      ctx.beginPath(); ctx.arc(0, 0, ringR, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.035)'; ctx.lineWidth = ringR * 0.07; ctx.stroke(); ctx.restore()
      ctx.beginPath(); ctx.arc(0, 0, ringR * 0.76, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.018)'; ctx.lineWidth = ringR * 0.02; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, ringR * 0.54, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(139,126,184,0.012)'; ctx.lineWidth = 0.5; ctx.stroke()
      // Markers
      ctx.save(); ctx.rotate(t * 0.08)
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2; const major = i % 6 === 0
        const len = major ? ringR * 0.06 : ringR * 0.025
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * (ringR - ringR * 0.035 - len), Math.sin(a) * (ringR - ringR * 0.035 - len))
        ctx.lineTo(Math.cos(a) * (ringR - ringR * 0.035), Math.sin(a) * (ringR - ringR * 0.035))
        ctx.strokeStyle = `rgba(91,164,201,${major ? 0.08 : 0.025})`; ctx.lineWidth = major ? 1 : 0.4
        ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore()
      const ha = t * 0.12; ctx.beginPath(); ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(ha) * ringR * 0.6, Math.sin(ha) * ringR * 0.6)
      ctx.strokeStyle = 'rgba(91,164,201,0.03)'; ctx.lineWidth = 0.6; ctx.stroke()
      ctx.restore()

      // ── Primary ghost — small, centred, distant ──
      const s = vmin / 680
      const gcx = w * 0.5 + Math.sin(t * 0.628) * 2
      const gcy = h * 0.4 + Math.sin(t * 0.82) * 3
      const breathe = 1 + Math.sin(t * 1.57) * 0.003
      ctx.save()
      ctx.translate(gcx, gcy)
      ctx.scale(breathe, breathe)
      // Glow
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.08)'; ctx.shadowBlur = 16 * s
      headPath(ctx, s); ctx.strokeStyle = 'rgba(91,164,201,0.004)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore()
      // Torso
      ctx.save(); ctx.translate(0, 40 * s)
      torsoPath(ctx, s)
      const tg = ctx.createLinearGradient(-10 * s, 0, 10 * s, 192 * s)
      tg.addColorStop(0, 'rgba(91,164,201,0.028)'); tg.addColorStop(0.4, 'rgba(91,164,201,0.014)')
      tg.addColorStop(1, 'rgba(91,164,201,0)'); ctx.fillStyle = tg; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.035)'; ctx.lineWidth = 0.7; ctx.stroke()
      torsoPath(ctx, s * 0.86)
      ctx.fillStyle = 'rgba(139,126,184,0.006)'; ctx.fill()
      ctx.strokeStyle = 'rgba(139,126,184,0.018)'; ctx.lineWidth = 0.4; ctx.stroke()
      ctx.restore()
      // Head
      headPath(ctx, s)
      const hg = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 52 * s)
      hg.addColorStop(0, 'rgba(91,164,201,0.035)'); hg.addColorStop(0.5, 'rgba(91,164,201,0.015)')
      hg.addColorStop(1, 'rgba(91,164,201,0.003)'); ctx.fillStyle = hg; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.05)'; ctx.lineWidth = 0.9; ctx.stroke()
      headPath(ctx, s * 0.68); ctx.fillStyle = 'rgba(139,126,184,0.005)'; ctx.fill()
      ctx.strokeStyle = 'rgba(139,126,184,0.022)'; ctx.lineWidth = 0.4; ctx.stroke()
      ctx.restore()

      // ── Ghost echo — offset, even fainter (the unresolved double) ──
      ctx.save()
      ctx.translate(gcx + 18, gcy + 12 + Math.sin(t * 0.9) * 2)
      ctx.scale(breathe * 0.85, breathe * 0.85)
      ctx.save(); ctx.translate(0, 40 * s * 0.8)
      torsoPath(ctx, s * 0.8)
      ctx.fillStyle = 'rgba(91,164,201,0.008)'; ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.015)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()
      headPath(ctx, s * 0.8)
      ctx.fillStyle = 'rgba(91,164,201,0.01)'; ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.02)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()

      // ── Orbs — 3, faint, at edges ──
      for (const orb of [
        { x: 0.12, y: 0.3, r: 0.05, ph: 0 },
        { x: 0.88, y: 0.65, r: 0.04, ph: 2.3 },
        { x: 0.35, y: 0.8, r: 0.03, ph: 4.7 },
      ]) {
        const or = vmin * orb.r
        const oa = t * (0.4 + orb.ph * 0.015) + orb.ph
        ctx.save()
        ctx.translate(w * orb.x + Math.cos(oa) * or * 0.5, h * orb.y + Math.sin(oa) * or * 0.4)
        ctx.beginPath(); ctx.arc(0, 0, or, 0, Math.PI * 2)
        const og = ctx.createRadialGradient(-or * 0.2, -or * 0.22, 0, 0, 0, or)
        og.addColorStop(0, 'rgba(91,164,201,0.025)'); og.addColorStop(0.5, 'rgba(91,164,201,0.01)')
        og.addColorStop(1, 'rgba(91,164,201,0.002)'); ctx.fillStyle = og; ctx.fill()
        ctx.strokeStyle = 'rgba(145,195,225,0.04)'; ctx.lineWidth = 0.6; ctx.stroke()
        ctx.beginPath(); ctx.arc(0, 0, or * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(139,126,184,0.015)'; ctx.lineWidth = 0.3; ctx.stroke()
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

export function Closing() {
  return (
    <section className="relative py-32 md:py-48 bg-surface overflow-hidden">
      <ClosingCanvas />

      <div className="relative z-10 max-w-[680px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <blockquote className="font-display text-[1.5rem] md:text-[2rem] lg:text-[2.2rem] font-normal leading-[1.35] tracking-[-0.01em] text-text-primary italic mb-8">
            The system can be governed.<br />
            <span className="text-text-tertiary">
              But what governs the human it reshapes?
            </span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-10 h-px bg-rule mx-auto mb-8" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-sans text-[0.92rem] leading-[1.8] text-text-tertiary font-light max-w-[500px] mx-auto mb-12">
            Without a second-order layer, governance protects a version of the
            human already being transformed.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#suite"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-text-primary text-base font-sans text-[13px] font-medium tracking-[0.02em] hover:bg-text-secondary transition-colors duration-400"
          >
            Explore the Suite
          </a>
        </Reveal>
      </div>
    </section>
  )
}
