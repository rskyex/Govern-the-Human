'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Figurative Forms
 *
 *  Large, slow, translucent, human-centric canvas objects.
 *  Each is meant to be placed at 300–600 px and to shape the composition
 *  of the section it inhabits.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface FormProps {
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
}

/* ── canvas boilerplate ── */
function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void,
) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      c.width = c.offsetWidth * dpr
      c.height = c.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => {
      draw(ctx, c.offsetWidth, c.offsetHeight, Date.now() * 0.0001)
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(id)
    }
  }, [draw])

  return ref
}

/* ━━━ 1. Ghost Silhouette ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  A translucent humanoid upper-body form — head, shoulders, torso —
 *  rendered as layered translucent fills with slow breathing.
 *  Feels like a liquid-glass figure suspended in space.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

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
  // neck
  ctx.moveTo(-14 * s, 0)
  ctx.lineTo(-14 * s, 18 * s)
  // left shoulder
  ctx.bezierCurveTo(-20 * s, 22 * s, -55 * s, 28 * s, -82 * s, 36 * s)
  // left upper arm
  ctx.bezierCurveTo(-92 * s, 40 * s, -96 * s, 56 * s, -90 * s, 72 * s)
  // left armpit → torso
  ctx.bezierCurveTo(-84 * s, 78 * s, -68 * s, 76 * s, -56 * s, 80 * s)
  // left torso
  ctx.bezierCurveTo(-48 * s, 100 * s, -44 * s, 128 * s, -40 * s, 160 * s)
  // waist → center
  ctx.bezierCurveTo(-32 * s, 180 * s, -16 * s, 190 * s, 0, 192 * s)
  // right waist
  ctx.bezierCurveTo(16 * s, 190 * s, 32 * s, 180 * s, 40 * s, 160 * s)
  // right torso
  ctx.bezierCurveTo(44 * s, 128 * s, 48 * s, 100 * s, 56 * s, 80 * s)
  // right armpit
  ctx.bezierCurveTo(68 * s, 76 * s, 84 * s, 78 * s, 90 * s, 72 * s)
  // right upper arm
  ctx.bezierCurveTo(96 * s, 56 * s, 92 * s, 40 * s, 82 * s, 36 * s)
  // right shoulder → neck
  ctx.bezierCurveTo(55 * s, 28 * s, 20 * s, 22 * s, 14 * s, 18 * s)
  ctx.lineTo(14 * s, 0)
  ctx.closePath()
}

export function GhostSilhouette({
  width = 480,
  height = 640,
  className = '',
  style = {},
}: FormProps) {
  const draw = useRef(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)
      const s = Math.min(w / 220, h / 320) * 0.85
      const cx = w * 0.5
      const headY = h * 0.2
      const breathe = 1 + Math.sin(t * 4) * 0.008
      const drift = Math.sin(t * 2.5) * 4

      ctx.save()
      ctx.translate(cx + drift, headY)
      ctx.scale(breathe, breathe)

      // ── Torso (behind head) ──
      ctx.save()
      ctx.translate(0, 50 * s)
      // Outermost echo
      drawTorso(ctx, s * 1.06)
      ctx.fillStyle = 'rgba(91,164,201,0.012)'
      ctx.fill()
      // Main torso
      drawTorso(ctx, s)
      const tg = ctx.createLinearGradient(0, 0, 0, 192 * s)
      tg.addColorStop(0, 'rgba(91,164,201,0.04)')
      tg.addColorStop(0.5, 'rgba(91,164,201,0.025)')
      tg.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = tg
      ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.06)'
      ctx.lineWidth = 1.2
      ctx.stroke()
      // Inner echo torso
      drawTorso(ctx, s * 0.88)
      ctx.strokeStyle = 'rgba(139,126,184,0.03)'
      ctx.lineWidth = 0.7
      ctx.stroke()
      ctx.restore()

      // ── Head ──
      // Outer glow
      drawHead(ctx, s * 1.12)
      ctx.fillStyle = 'rgba(91,164,201,0.015)'
      ctx.fill()
      // Main head
      drawHead(ctx, s)
      const hg = ctx.createRadialGradient(0, 0, 0, 0, 0, 52 * s)
      hg.addColorStop(0, 'rgba(91,164,201,0.05)')
      hg.addColorStop(0.6, 'rgba(91,164,201,0.03)')
      hg.addColorStop(1, 'rgba(91,164,201,0.015)')
      ctx.fillStyle = hg
      ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.1)'
      ctx.lineWidth = 1.4
      ctx.stroke()
      // Inner echo
      drawHead(ctx, s * 0.8)
      ctx.strokeStyle = 'rgba(139,126,184,0.05)'
      ctx.lineWidth = 0.8
      ctx.stroke()
      // Innermost echo
      drawHead(ctx, s * 0.58)
      ctx.strokeStyle = 'rgba(91,164,201,0.025)'
      ctx.lineWidth = 0.5
      ctx.stroke()

      // ── Internal traces (thought streams) ──
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + t * 0.8
        const r1 = 8 * s
        const r2 = 28 * s + Math.sin(t * 3 + i * 1.3) * 6 * s
        const a2 = angle + 0.6 + Math.sin(t * 2 + i) * 0.3
        ctx.beginPath()
        ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1)
        ctx.quadraticCurveTo(
          Math.cos(angle + 0.3) * r2 * 0.7,
          Math.sin(angle + 0.3) * r2 * 0.7,
          Math.cos(a2) * r2,
          Math.sin(a2) * r2,
        )
        ctx.strokeStyle = `rgba(91,164,201,${0.04 + Math.sin(t * 3 + i) * 0.015})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // ── Highlight spot ──
      const hlg = ctx.createRadialGradient(-12 * s, -18 * s, 0, -12 * s, -18 * s, 22 * s)
      hlg.addColorStop(0, 'rgba(255,255,255,0.08)')
      hlg.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hlg
      ctx.fillRect(-40 * s, -50 * s, 80 * s, 60 * s)

      ctx.restore()
    },
  ).current

  const canvasRef = useCanvas(draw)

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width, height, ...style }}
    />
  )
}

/* ━━━ 2. Transparent Head (lateral profile) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  A large cranial volume seen from the side, with layered contours
 *  and internal neural-like traces. Feels like a glass specimen jar
 *  in the shape of a human skull.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function drawCranialProfile(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  ctx.moveTo(-15 * s, -95 * s)
  ctx.bezierCurveTo(30 * s, -115 * s, 75 * s, -105 * s, 85 * s, -72 * s)
  ctx.bezierCurveTo(92 * s, -48 * s, 88 * s, -30 * s, 78 * s, -15 * s)
  ctx.bezierCurveTo(72 * s, -5 * s, 75 * s, 8 * s, 72 * s, 18 * s)
  ctx.bezierCurveTo(68 * s, 30 * s, 60 * s, 38 * s, 52 * s, 42 * s)
  // jaw / chin area
  ctx.bezierCurveTo(44 * s, 48 * s, 32 * s, 60 * s, 18 * s, 68 * s)
  ctx.bezierCurveTo(6 * s, 74 * s, -12 * s, 72 * s, -24 * s, 64 * s)
  // neck / back of head
  ctx.bezierCurveTo(-36 * s, 56 * s, -42 * s, 40 * s, -44 * s, 22 * s)
  ctx.bezierCurveTo(-48 * s, -8 * s, -50 * s, -38 * s, -42 * s, -66 * s)
  ctx.bezierCurveTo(-36 * s, -86 * s, -26 * s, -94 * s, -15 * s, -95 * s)
  ctx.closePath()
}

export function TransparentHead({
  width = 420,
  height = 460,
  className = '',
  style = {},
}: FormProps) {
  const draw = useRef(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)
      const s = Math.min(w / 200, h / 220) * 0.88
      const cx = w * 0.48
      const cy = h * 0.48
      const breathe = 1 + Math.sin(t * 3.5) * 0.006
      const drift = Math.sin(t * 2) * 5

      ctx.save()
      ctx.translate(cx + drift, cy + Math.sin(t * 1.8) * 3)
      ctx.scale(breathe, breathe)

      // Outermost glow
      drawCranialProfile(ctx, s * 1.15)
      ctx.fillStyle = 'rgba(91,164,201,0.012)'
      ctx.fill()

      // Main volume
      drawCranialProfile(ctx, s)
      const rg = ctx.createRadialGradient(10 * s, -20 * s, 0, 0, 0, 95 * s)
      rg.addColorStop(0, 'rgba(91,164,201,0.045)')
      rg.addColorStop(0.5, 'rgba(91,164,201,0.025)')
      rg.addColorStop(1, 'rgba(91,164,201,0.01)')
      ctx.fillStyle = rg
      ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.12)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Inner shells
      const shells = [0.82, 0.64, 0.46]
      const shellColors = ['rgba(139,126,184,0.06)', 'rgba(91,164,201,0.035)', 'rgba(139,126,184,0.02)']
      shells.forEach((sc, i) => {
        drawCranialProfile(ctx, s * sc)
        ctx.strokeStyle = shellColors[i]
        ctx.lineWidth = 0.8 - i * 0.15
        ctx.stroke()
      })

      // Neural traces inside
      for (let i = 0; i < 8; i++) {
        const baseAngle = (i / 8) * Math.PI * 2
        const wander = Math.sin(t * 2.5 + i * 1.7) * 0.4
        const r1 = (12 + Math.sin(t * 2 + i) * 4) * s
        const r2 = (40 + Math.sin(t * 1.5 + i * 0.9) * 10) * s
        const a1 = baseAngle + wander
        const a2 = baseAngle + 0.8 + wander + Math.sin(t * 1.8 + i) * 0.3
        const cp = (r1 + r2) * 0.5
        const cpa = (a1 + a2) * 0.5 + 0.2

        ctx.beginPath()
        ctx.moveTo(Math.cos(a1) * r1, Math.sin(a1) * r1 - 12 * s)
        ctx.quadraticCurveTo(
          Math.cos(cpa) * cp,
          Math.sin(cpa) * cp - 12 * s,
          Math.cos(a2) * r2,
          Math.sin(a2) * r2 - 12 * s,
        )
        ctx.strokeStyle = `rgba(91,164,201,${0.03 + Math.sin(t * 3 + i * 0.8) * 0.012})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        // Node at end
        ctx.beginPath()
        ctx.arc(Math.cos(a2) * r2, Math.sin(a2) * r2 - 12 * s, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91,164,201,0.08)'
        ctx.fill()
      }

      // Highlight crescent
      const hlg = ctx.createRadialGradient(-10 * s, -40 * s, 0, -10 * s, -40 * s, 35 * s)
      hlg.addColorStop(0, 'rgba(255,255,255,0.07)')
      hlg.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hlg
      ctx.fillRect(-50 * s, -100 * s, 100 * s, 80 * s)

      ctx.restore()
    },
  ).current

  const canvasRef = useCanvas(draw)

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width, height, ...style }}
    />
  )
}

/* ━━━ 3. Memory Orb ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  A large translucent sphere with slowly drifting internal traces —
 *  like a thought or memory captured in glass. Has a highlight crescent
 *  and faint internal particle motion.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function MemoryOrb({
  width = 320,
  height = 320,
  className = '',
  style = {},
}: FormProps) {
  const draw = useRef(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)
      const r = Math.min(w, h) * 0.42
      const cx = w * 0.5
      const cy = h * 0.5
      const breathe = 1 + Math.sin(t * 3) * 0.008

      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(breathe, breathe)

      // Outer glow
      const og = ctx.createRadialGradient(0, 0, r * 0.8, 0, 0, r * 1.3)
      og.addColorStop(0, 'rgba(91,164,201,0.02)')
      og.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = og
      ctx.beginPath()
      ctx.arc(0, 0, r * 1.3, 0, Math.PI * 2)
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
      ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(139,126,184,0.04)'
      ctx.lineWidth = 0.7
      ctx.stroke()

      // Internal drifting traces — slow elliptical orbits
      for (let i = 0; i < 6; i++) {
        const phase = (i / 6) * Math.PI * 2 + t * (0.6 + i * 0.08)
        const orbitA = r * (0.35 + i * 0.05)
        const orbitB = r * (0.2 + i * 0.04)
        const tilt = i * 0.4

        ctx.beginPath()
        const segments = 40
        for (let j = 0; j <= segments; j++) {
          const a = phase + (j / segments) * Math.PI * 1.2
          const x = Math.cos(a) * orbitA
          const y = Math.sin(a) * orbitB
          const rx = x * Math.cos(tilt) - y * Math.sin(tilt)
          const ry = x * Math.sin(tilt) + y * Math.cos(tilt)
          if (j === 0) ctx.moveTo(rx, ry)
          else ctx.lineTo(rx, ry)
        }
        ctx.strokeStyle = `rgba(139,126,184,${0.025 + Math.sin(t * 2.5 + i) * 0.01})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Highlight crescent
      const hlg = ctx.createRadialGradient(-r * 0.25, -r * 0.3, 0, -r * 0.25, -r * 0.3, r * 0.5)
      hlg.addColorStop(0, 'rgba(255,255,255,0.1)')
      hlg.addColorStop(0.5, 'rgba(255,255,255,0.03)')
      hlg.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hlg
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    },
  ).current

  const canvasRef = useCanvas(draw)

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width, height, ...style }}
    />
  )
}

/* ━━━ 4. Governance Ring ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  A large circular clock-like ring with governance timing markers.
 *  Rotates slowly. Feels like a suspended analytical instrument.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function GovernanceRing({
  width = 400,
  height = 400,
  className = '',
  style = {},
}: FormProps) {
  const draw = useRef(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)
      const r = Math.min(w, h) * 0.42
      const cx = w * 0.5
      const cy = h * 0.5

      ctx.save()
      ctx.translate(cx, cy)

      // Outer ring
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.08)'
      ctx.lineWidth = 18
      ctx.stroke()

      // Inner ring
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.04)'
      ctx.lineWidth = 6
      ctx.stroke()

      // Innermost ring
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(139,126,184,0.03)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Timing markers on outer ring — 24 marks, rotating slowly
      const rot = t * 0.3
      ctx.save()
      ctx.rotate(rot)
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2
        const isMajor = i % 6 === 0
        const len = isMajor ? 14 : 7
        const inner = r - 9 - len
        const outer = r - 9

        ctx.beginPath()
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner)
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer)
        ctx.strokeStyle = `rgba(91,164,201,${isMajor ? 0.14 : 0.06})`
        ctx.lineWidth = isMajor ? 1.5 : 0.8
        ctx.stroke()

        if (isMajor) {
          ctx.beginPath()
          ctx.arc(Math.cos(angle) * (r + 4), Math.sin(angle) * (r + 4), 1.5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(91,164,201,0.1)'
          ctx.fill()
        }
      }
      ctx.restore()

      // Secondary markers — counter-rotating
      ctx.save()
      ctx.rotate(-rot * 0.6)
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        const inner = r * 0.78 - 3 - 5
        const outer = r * 0.78 - 3

        ctx.beginPath()
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner)
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer)
        ctx.strokeStyle = 'rgba(91,164,201,0.05)'
        ctx.lineWidth = 0.7
        ctx.stroke()
      }
      ctx.restore()

      // Sweeping hand
      const handAngle = t * 0.5
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(handAngle) * r * 0.75, Math.sin(handAngle) * r * 0.75)
      const hg = ctx.createLinearGradient(0, 0, Math.cos(handAngle) * r * 0.75, Math.sin(handAngle) * r * 0.75)
      hg.addColorStop(0, 'rgba(91,164,201,0.06)')
      hg.addColorStop(1, 'rgba(91,164,201,0.01)')
      ctx.strokeStyle = hg
      ctx.lineWidth = 1
      ctx.stroke()

      // Center dot
      ctx.beginPath()
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91,164,201,0.12)'
      ctx.fill()

      ctx.restore()
    },
  ).current

  const canvasRef = useCanvas(draw)

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width, height, ...style }}
    />
  )
}

/* ━━━ 5. Shell Form (nested cranial profiles) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Multiple concentric head profiles at different scales and opacities,
 *  slowly oscillating relative to each other. Feels like peeling back
 *  layers of identity to see what's underneath.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function ShellForm({
  width = 460,
  height = 500,
  className = '',
  style = {},
}: FormProps) {
  const draw = useRef(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)
      const s = Math.min(w / 200, h / 220) * 0.82
      const cx = w * 0.5
      const cy = h * 0.46

      ctx.save()
      ctx.translate(cx, cy)

      const layers = [
        { scale: 1.3, opacity: 0.02, strokeOp: 0.04, offset: 0 },
        { scale: 1.15, opacity: 0.015, strokeOp: 0.05, offset: 0.3 },
        { scale: 1.0, opacity: 0.025, strokeOp: 0.08, offset: 0.6 },
        { scale: 0.84, opacity: 0.02, strokeOp: 0.06, offset: 0.9 },
        { scale: 0.68, opacity: 0.015, strokeOp: 0.04, offset: 1.2 },
        { scale: 0.5, opacity: 0.03, strokeOp: 0.03, offset: 1.5 },
      ]

      for (const layer of layers) {
        const dx = Math.sin(t * 2.2 + layer.offset) * 3 * layer.scale
        const dy = Math.cos(t * 1.8 + layer.offset) * 2 * layer.scale

        ctx.save()
        ctx.translate(dx, dy)

        drawCranialProfile(ctx, s * layer.scale)

        // Fill with gradient
        const fg = ctx.createRadialGradient(10 * s, -20 * s, 0, 0, 0, 95 * s * layer.scale)
        fg.addColorStop(0, `rgba(91,164,201,${layer.opacity})`)
        fg.addColorStop(1, `rgba(91,164,201,${layer.opacity * 0.3})`)
        ctx.fillStyle = fg
        ctx.fill()

        ctx.strokeStyle = `rgba(91,164,201,${layer.strokeOp})`
        ctx.lineWidth = layer.scale > 1 ? 0.7 : 1.2
        ctx.stroke()

        ctx.restore()
      }

      // Faint highlight on the outermost shell
      const hlg = ctx.createRadialGradient(-8 * s, -45 * s, 0, -8 * s, -45 * s, 40 * s)
      hlg.addColorStop(0, 'rgba(255,255,255,0.05)')
      hlg.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = hlg
      ctx.fillRect(-60 * s, -120 * s, 120 * s, 90 * s)

      ctx.restore()
    },
  ).current

  const canvasRef = useCanvas(draw)

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width, height, ...style }}
    />
  )
}
