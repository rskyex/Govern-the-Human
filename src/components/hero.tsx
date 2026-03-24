'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as const

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Hero — single unified canvas composition
 *
 *  Centre-left : large ghost silhouette (head + shoulders + torso)
 *  Right       : governance ring (clock / timing instrument)
 *  Scattered   : 3 memory orbs at different sizes / depths
 *  Background  : ambient glow + faint scan arcs
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── shared path helpers ── */

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

/* ── draw sub-scenes ── */

function drawGhost(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  t: number,
) {
  const breathe = 1 + Math.sin(t * 4) * 0.007
  const drift = Math.sin(t * 2.5) * 5

  ctx.save()
  ctx.translate(cx + drift, cy + Math.sin(t * 1.6) * 3)
  ctx.scale(breathe, breathe)

  // ── Torso ──
  ctx.save()
  ctx.translate(0, 50 * s)

  // Outermost echo
  drawTorso(ctx, s * 1.08)
  ctx.fillStyle = 'rgba(91,164,201,0.01)'
  ctx.fill()

  // Main torso
  drawTorso(ctx, s)
  const tg = ctx.createLinearGradient(0, 0, 0, 192 * s)
  tg.addColorStop(0, 'rgba(91,164,201,0.045)')
  tg.addColorStop(0.4, 'rgba(91,164,201,0.028)')
  tg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = tg
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.07)'
  ctx.lineWidth = 1.3
  ctx.stroke()

  // Inner echo
  drawTorso(ctx, s * 0.88)
  ctx.strokeStyle = 'rgba(139,126,184,0.035)'
  ctx.lineWidth = 0.7
  ctx.stroke()

  // Deep inner echo
  drawTorso(ctx, s * 0.74)
  ctx.strokeStyle = 'rgba(91,164,201,0.015)'
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.restore()

  // ── Head ──
  // Glow halo
  drawHead(ctx, s * 1.2)
  ctx.fillStyle = 'rgba(91,164,201,0.012)'
  ctx.fill()

  // Main head
  drawHead(ctx, s)
  const hg = ctx.createRadialGradient(0, -4 * s, 0, 0, -4 * s, 55 * s)
  hg.addColorStop(0, 'rgba(91,164,201,0.055)')
  hg.addColorStop(0.5, 'rgba(91,164,201,0.03)')
  hg.addColorStop(1, 'rgba(91,164,201,0.012)')
  ctx.fillStyle = hg
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.12)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Inner echoes
  drawHead(ctx, s * 0.78)
  ctx.strokeStyle = 'rgba(139,126,184,0.06)'
  ctx.lineWidth = 0.9
  ctx.stroke()

  drawHead(ctx, s * 0.55)
  ctx.strokeStyle = 'rgba(91,164,201,0.03)'
  ctx.lineWidth = 0.5
  ctx.stroke()

  // ── Thought-stream traces ──
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2 + t * 0.7
    const r1 = 8 * s
    const r2 = 30 * s + Math.sin(t * 2.8 + i * 1.4) * 8 * s
    const a2 = angle + 0.7 + Math.sin(t * 2 + i) * 0.3
    ctx.beginPath()
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1)
    ctx.quadraticCurveTo(
      Math.cos(angle + 0.35) * r2 * 0.65,
      Math.sin(angle + 0.35) * r2 * 0.65,
      Math.cos(a2) * r2,
      Math.sin(a2) * r2,
    )
    ctx.strokeStyle = `rgba(91,164,201,${0.04 + Math.sin(t * 3 + i) * 0.015})`
    ctx.lineWidth = 0.6
    ctx.stroke()

    // Endpoint dot
    const pulse = 0.5 + Math.sin(t * 4 + i * 1.2) * 0.5
    ctx.beginPath()
    ctx.arc(Math.cos(a2) * r2, Math.sin(a2) * r2, 1.1 * pulse, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(91,164,201,${0.08 * pulse})`
    ctx.fill()
  }

  // ── Glass highlight ──
  const hlg = ctx.createRadialGradient(-14 * s, -22 * s, 0, -14 * s, -22 * s, 26 * s)
  hlg.addColorStop(0, 'rgba(255,255,255,0.09)')
  hlg.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hlg
  ctx.fillRect(-45 * s, -55 * s, 90 * s, 70 * s)

  ctx.restore()
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
) {
  ctx.save()
  ctx.translate(cx, cy)

  // Outer band
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.07)'
  ctx.lineWidth = r * 0.1
  ctx.stroke()

  // Middle band
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.035)'
  ctx.lineWidth = r * 0.035
  ctx.stroke()

  // Inner band
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139,126,184,0.025)'
  ctx.lineWidth = 1
  ctx.stroke()

  // 24 outer markers, rotating
  const rot = t * 0.3
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
    ctx.strokeStyle = `rgba(91,164,201,${major ? 0.15 : 0.06})`
    ctx.lineWidth = major ? 1.5 : 0.8
    ctx.stroke()

    if (major) {
      ctx.beginPath()
      ctx.arc(Math.cos(a) * (r * 1.025), Math.sin(a) * (r * 1.025), 1.8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91,164,201,0.1)'
      ctx.fill()
    }
  }
  ctx.restore()

  // 12 inner markers, counter-rotating
  ctx.save()
  ctx.rotate(-rot * 0.6)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const inner = r * 0.78 - r * 0.035
    const outer = r * 0.78 - r * 0.005

    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
    ctx.strokeStyle = 'rgba(91,164,201,0.05)'
    ctx.lineWidth = 0.7
    ctx.stroke()
  }
  ctx.restore()

  // Sweeping hand
  const handA = t * 0.45
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(Math.cos(handA) * r * 0.72, Math.sin(handA) * r * 0.72)
  const hg = ctx.createLinearGradient(
    0, 0,
    Math.cos(handA) * r * 0.72,
    Math.sin(handA) * r * 0.72,
  )
  hg.addColorStop(0, 'rgba(91,164,201,0.07)')
  hg.addColorStop(1, 'rgba(91,164,201,0.01)')
  ctx.strokeStyle = hg
  ctx.lineWidth = 1
  ctx.stroke()

  // Centre
  ctx.beginPath()
  ctx.arc(0, 0, 2.5, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(91,164,201,0.12)'
  ctx.fill()

  ctx.restore()
}

function drawOrb(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
  phase: number,
) {
  const breathe = 1 + Math.sin(t * 3 + phase) * 0.01

  ctx.save()
  ctx.translate(cx + Math.sin(t * 2 + phase) * 6, cy + Math.cos(t * 1.7 + phase) * 5)
  ctx.scale(breathe, breathe)

  // Glow
  const og = ctx.createRadialGradient(0, 0, r * 0.7, 0, 0, r * 1.35)
  og.addColorStop(0, 'rgba(91,164,201,0.02)')
  og.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = og
  ctx.beginPath()
  ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2)
  ctx.fill()

  // Main sphere
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  const sg = ctx.createRadialGradient(-r * 0.2, -r * 0.25, 0, 0, 0, r)
  sg.addColorStop(0, 'rgba(91,164,201,0.04)')
  sg.addColorStop(0.5, 'rgba(91,164,201,0.02)')
  sg.addColorStop(1, 'rgba(91,164,201,0.008)')
  ctx.fillStyle = sg
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.09)'
  ctx.lineWidth = 1.2
  ctx.stroke()

  // Inner shell
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139,126,184,0.04)'
  ctx.lineWidth = 0.6
  ctx.stroke()

  // Internal traces
  for (let i = 0; i < 5; i++) {
    const p = (i / 5) * Math.PI * 2 + t * (0.5 + i * 0.06) + phase
    const oA = r * (0.3 + i * 0.06)
    const oB = r * (0.18 + i * 0.04)
    const tilt = i * 0.45 + phase * 0.3

    ctx.beginPath()
    for (let j = 0; j <= 35; j++) {
      const a = p + (j / 35) * Math.PI * 1.1
      const x = Math.cos(a) * oA
      const y = Math.sin(a) * oB
      const rx = x * Math.cos(tilt) - y * Math.sin(tilt)
      const ry = x * Math.sin(tilt) + y * Math.cos(tilt)
      if (j === 0) ctx.moveTo(rx, ry)
      else ctx.lineTo(rx, ry)
    }
    ctx.strokeStyle = `rgba(139,126,184,${0.025 + Math.sin(t * 2.5 + i + phase) * 0.01})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // Highlight
  const hlg = ctx.createRadialGradient(-r * 0.25, -r * 0.3, 0, -r * 0.25, -r * 0.3, r * 0.5)
  hlg.addColorStop(0, 'rgba(255,255,255,0.1)')
  hlg.addColorStop(0.5, 'rgba(255,255,255,0.03)')
  hlg.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hlg
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/* ━━━ Hero Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function Hero() {
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

      // ── Ambient glow (behind everything) ──
      const ag = ctx.createRadialGradient(w * 0.38, h * 0.4, 0, w * 0.38, h * 0.4, vmin * 0.7)
      ag.addColorStop(0, 'rgba(91,164,201,0.06)')
      ag.addColorStop(0.35, 'rgba(139,126,184,0.03)')
      ag.addColorStop(0.7, 'rgba(91,164,201,0.012)')
      ag.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = ag
      ctx.fillRect(0, 0, w, h)

      // ── Faint scan arcs (atmosphere) ──
      ctx.save()
      ctx.translate(w * 0.38, h * 0.38)
      for (let i = 0; i < 4; i++) {
        const r = (vmin * 0.22 + i * vmin * 0.1)
        const rot = t * (1.2 + i * 0.3) * (i % 2 === 0 ? 1 : -1)
        ctx.save()
        ctx.rotate(rot)
        const segs = 3 + i
        const gap = Math.PI * 0.14
        const seg = (Math.PI * 2 - segs * gap) / segs
        ctx.strokeStyle = `rgba(91,164,201,${0.03 - i * 0.005})`
        ctx.lineWidth = 0.6
        ctx.lineCap = 'round'
        for (let j = 0; j < segs; j++) {
          const a = j * (seg + gap)
          ctx.beginPath()
          ctx.arc(0, 0, r, a, a + seg)
          ctx.stroke()
        }
        ctx.restore()
      }
      ctx.restore()

      // ── Ghost silhouette — dominant, left-of-centre ──
      const ghostScale = vmin / 550
      drawGhost(ctx, w * 0.34, h * 0.3, ghostScale, t)

      // ── Governance ring — right side ──
      const ringR = vmin * 0.2
      const ringX = w * 0.76 + Math.sin(t * 1.5) * 8
      const ringY = h * 0.48 + Math.cos(t * 1.2) * 6
      drawRing(ctx, ringX, ringY, ringR, t)

      // ── Memory orbs — cluster of 3 at different depths ──
      // Large orb — upper-left area
      drawOrb(ctx, w * 0.12, h * 0.22, vmin * 0.08, t, 0)
      // Medium orb — between ghost and ring
      drawOrb(ctx, w * 0.58, h * 0.18, vmin * 0.055, t, 2.1)
      // Small orb — lower-right
      drawOrb(ctx, w * 0.82, h * 0.78, vmin * 0.045, t, 4.3)
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => { draw(); id = requestAnimationFrame(loop) }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6 max-w-[860px] mx-auto pt-14">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-[3.2rem] md:text-[4.8rem] lg:text-[5.5rem] font-normal leading-[0.92] tracking-[-0.025em] text-text-primary mb-6"
        >
          Govern the Human
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display text-[1.25rem] md:text-[1.65rem] lg:text-[1.85rem] leading-[1.35] text-text-tertiary max-w-[580px] mx-auto mb-5 italic"
        >
          If AI Governs Your Mind, Who Governs AI?
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="font-sans text-[0.88rem] md:text-[0.95rem] leading-[1.7] text-text-ghost max-w-[520px] mx-auto mb-12 font-light"
        >
          A research suite on second-order AI governance, narrative identity, and democratic subject formation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#suite"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-text-primary text-base font-sans text-[13px] font-medium tracking-[0.02em] hover:bg-text-secondary transition-colors duration-400"
          >
            Explore the Suite
          </a>
          <a
            href="#thesis"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full border border-rule text-text-tertiary font-sans text-[13px] font-medium tracking-[0.02em] hover:border-text-ghost hover:text-text-secondary transition-colors duration-400"
          >
            Read the Thesis
          </a>
        </motion.div>
      </div>
    </section>
  )
}
