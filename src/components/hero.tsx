'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as const

function drawCranialPath(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  ctx.moveTo(-18 * s, -115 * s)
  ctx.bezierCurveTo(35 * s, -140 * s, 85 * s, -128 * s, 96 * s, -88 * s)
  ctx.bezierCurveTo(103 * s, -58 * s, 100 * s, -38 * s, 90 * s, -22 * s)
  ctx.bezierCurveTo(84 * s, -10 * s, 87 * s, 6 * s, 84 * s, 18 * s)
  ctx.bezierCurveTo(82 * s, 32 * s, 74 * s, 42 * s, 68 * s, 46 * s)
  ctx.bezierCurveTo(62 * s, 50 * s, 58 * s, 54 * s, 56 * s, 56 * s)
  ctx.bezierCurveTo(52 * s, 66 * s, 42 * s, 78 * s, 22 * s, 86 * s)
  ctx.bezierCurveTo(4 * s, 92 * s, -18 * s, 90 * s, -32 * s, 82 * s)
  ctx.bezierCurveTo(-44 * s, 72 * s, -50 * s, 52 * s, -54 * s, 28 * s)
  ctx.bezierCurveTo(-58 * s, -8 * s, -60 * s, -48 * s, -52 * s, -82 * s)
  ctx.bezierCurveTo(-45 * s, -105 * s, -32 * s, -114 * s, -18 * s, -115 * s)
  ctx.closePath()
}

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
      const cx = w / 2
      const cy = h * 0.44
      const time = Date.now() * 0.0004
      const scale = Math.min(w / 780, h / 780, 1.2)

      ctx.clearRect(0, 0, w, h)

      // Ambient glow
      const ag = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280 * scale)
      ag.addColorStop(0, 'rgba(91,164,201,0.07)')
      ag.addColorStop(0.4, 'rgba(139,126,184,0.03)')
      ag.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = ag
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.translate(cx, cy)

      // Scan arcs
      for (let i = 0; i < 4; i++) {
        const r = (150 + i * 50) * scale
        const op = 0.055 - i * 0.01
        const rot = time * (0.12 + i * 0.035) * (i % 2 === 0 ? 1 : -1)
        ctx.save()
        ctx.rotate(rot)
        const segs = 3 + i
        const gap = Math.PI * 0.14
        const seg = (Math.PI * 2 - segs * gap) / segs
        ctx.strokeStyle = `rgba(91,164,201,${op})`
        ctx.lineWidth = Math.max((1.1 - i * 0.12) * scale, 0.5)
        ctx.lineCap = 'round'
        for (let j = 0; j < segs; j++) {
          const a = j * (seg + gap)
          ctx.beginPath()
          ctx.arc(0, 0, r, a, a + seg)
          ctx.stroke()
        }
        ctx.restore()
      }

      const breathe = 1 + Math.sin(time * 0.5) * 0.006
      ctx.scale(breathe, breathe)

      const s = scale * 1.1
      drawCranialPath(ctx, s)
      const fg = ctx.createLinearGradient(-60 * s, -120 * s, 96 * s, 86 * s)
      fg.addColorStop(0, 'rgba(91,164,201,0.025)')
      fg.addColorStop(0.4, 'rgba(139,126,184,0.015)')
      fg.addColorStop(1, 'rgba(91,164,201,0.008)')
      ctx.fillStyle = fg
      ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.16)'
      ctx.lineWidth = 1.4 * scale
      ctx.stroke()

      drawCranialPath(ctx, s * 0.78)
      ctx.strokeStyle = 'rgba(139,126,184,0.07)'
      ctx.lineWidth = 0.7 * scale
      ctx.stroke()

      // Scan line
      const sy = Math.sin(time * 0.55) * 75 * s
      const sg = ctx.createLinearGradient(-110 * s, 0, 110 * s, 0)
      sg.addColorStop(0, 'rgba(91,164,201,0)')
      sg.addColorStop(0.25, 'rgba(91,164,201,0.1)')
      sg.addColorStop(0.75, 'rgba(91,164,201,0.1)')
      sg.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.beginPath()
      ctx.moveTo(-110 * s, sy)
      ctx.lineTo(110 * s, sy)
      ctx.strokeStyle = sg
      ctx.lineWidth = 0.7 * scale
      ctx.stroke()

      // Nodes
      for (const n of [{ x: 96, y: -88 }, { x: 90, y: -22 }, { x: 68, y: 46 }, { x: -52, y: -82 }, { x: -54, y: 28 }]) {
        const p = 1 + Math.sin(time * 1.8 + n.x * 0.05) * 0.35
        ctx.beginPath()
        ctx.arc(n.x * s, n.y * s, 1.6 * scale * p, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91,164,201,0.22)'
        ctx.fill()
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

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
