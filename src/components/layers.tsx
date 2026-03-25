'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Three-Layer Model — descending chamber
 *
 *  Three forms descend and become more embedded:
 *  Layer I  (Epistemic): a clear, legible head profile — surface-level
 *  Layer II (Ontological): a fragmenting torso — self-relation destabilised
 *  Layer III (Political): a fading full silhouette — deeply submerged
 *
 *  Each form is dimmer and more enclosed than the last.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface LayerData {
  depth: string
  title: string
  subtitle: string
  body: string
  accent: string
}

const LAYERS: LayerData[] = [
  {
    depth: 'I',
    title: 'Epistemic',
    subtitle: 'What you can know',
    body: 'AI systems restructure the conditions of knowledge: what counts as credible, how beliefs are formed, which sources are surfaced, and which are suppressed. The epistemic subject — the one who knows, doubts, and judges — is being reorganized at the level of its informational environment, often without awareness that any transformation has occurred.',
    accent: 'var(--color-accent)',
  },
  {
    depth: 'II',
    title: 'Ontological',
    subtitle: 'Who you can be',
    body: "Beneath the epistemic layer, AI destabilizes the subject's relation to itself. When machine-generated content becomes indistinguishable from human expression, when memory is outsourced to retrieval systems, when self-narration is mediated by algorithmic surfaces — the boundary of the self becomes undecidable. The question is no longer what you know, but whether the one who knows is still coherently you.",
    accent: 'var(--color-violet)',
  },
  {
    depth: 'III',
    title: 'Political',
    subtitle: 'How you can govern',
    body: 'At the deepest layer, the political subject required by democratic governance — capable of deliberation, dissent, and autonomous judgment — is being reshaped by the same systems democracy is supposed to regulate. If the subject who votes, protests, and consents has been epistemically narrowed and ontologically destabilized, then the foundations of self-governance are not merely threatened. They are structurally altered.',
    accent: 'var(--color-text-primary)',
  },
]

/* ── Shared head/torso paths ── */

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

/* ── Glass-wave ribbon helper ── */

function drawGlassRibbon(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  config: {
    // Start/end as fractions of w/h
    x0: number; y0: number; x1: number; y1: number
    // Control point offsets (animated)
    cp1x: number; cp1y: number; cp2x: number; cp2y: number
    // Visual
    width: number       // ribbon width in px
    opacity: number     // base opacity multiplier
    hue: 'blue' | 'silver' | 'mint' | 'violet'
    // Motion
    phaseOffset?: number
    speed?: number
  },
) {
  const p = config.phaseOffset ?? 0
  const spd = config.speed ?? 1

  // Animated control points — slow, flowing undulation
  const cx1 = w * config.cp1x + Math.sin(t * 0.18 * spd + p) * w * 0.04 + Math.sin(t * 0.07 * spd + p * 1.3) * w * 0.02
  const cy1 = h * config.cp1y + Math.cos(t * 0.14 * spd + p) * h * 0.06 + Math.sin(t * 0.05 * spd + p * 0.7) * h * 0.03
  const cx2 = w * config.cp2x + Math.cos(t * 0.16 * spd + p) * w * 0.04 + Math.cos(t * 0.06 * spd + p * 1.1) * w * 0.02
  const cy2 = h * config.cp2y + Math.sin(t * 0.12 * spd + p) * h * 0.06 + Math.cos(t * 0.04 * spd + p * 0.9) * h * 0.03

  const sx = w * config.x0 + Math.sin(t * 0.1 * spd + p) * w * 0.01
  const sy = h * config.y0 + Math.cos(t * 0.08 * spd + p) * h * 0.015
  const ex = w * config.x1 + Math.cos(t * 0.09 * spd + p) * w * 0.01
  const ey = h * config.y1 + Math.sin(t * 0.07 * spd + p) * h * 0.015

  const rw = config.width
  const op = config.opacity

  // Colour palette
  const colors = {
    blue:   { r: '91,164,201',  h: '145,195,225', g: '120,180,215' },
    silver: { r: '180,195,210', h: '200,215,228', g: '190,205,220' },
    mint:   { r: '130,195,185', h: '160,215,205', g: '145,205,195' },
    violet: { r: '139,126,184', h: '165,155,200', g: '150,140,192' },
  }
  const c = colors[config.hue]

  ctx.save()

  // ── Outer glow — the luminous halo around the ribbon ──
  ctx.save()
  ctx.shadowColor = `rgba(${c.r},${0.15 * op})`
  ctx.shadowBlur = rw * 1.5
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey)
  ctx.strokeStyle = `rgba(${c.r},${0.008 * op})`
  ctx.lineWidth = rw * 0.8
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.restore()

  // ── Main ribbon body — wide, translucent glass fill ──
  // Draw as thick stroke with glass-like gradient
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey)

  // Glass gradient along the path (approximated with linear gradient)
  const grad = ctx.createLinearGradient(sx, sy, ex, ey)
  grad.addColorStop(0, `rgba(${c.r},${0.0})`)
  grad.addColorStop(0.15, `rgba(${c.r},${0.06 * op})`)
  grad.addColorStop(0.4, `rgba(${c.g},${0.08 * op})`)
  grad.addColorStop(0.6, `rgba(${c.r},${0.07 * op})`)
  grad.addColorStop(0.85, `rgba(${c.g},${0.05 * op})`)
  grad.addColorStop(1, `rgba(${c.r},${0.0})`)
  ctx.strokeStyle = grad
  ctx.lineWidth = rw
  ctx.lineCap = 'round'
  ctx.stroke()

  // ── Secondary fill layer — warmer, offset, creates depth ──
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.bezierCurveTo(cx1 + rw * 0.1, cy1 - rw * 0.05, cx2 - rw * 0.1, cy2 + rw * 0.05, ex, ey)
  const grad2 = ctx.createLinearGradient(sx, sy, ex, ey)
  grad2.addColorStop(0, `rgba(${c.h},0)`)
  grad2.addColorStop(0.3, `rgba(${c.h},${0.04 * op})`)
  grad2.addColorStop(0.7, `rgba(${c.h},${0.035 * op})`)
  grad2.addColorStop(1, `rgba(${c.h},0)`)
  ctx.strokeStyle = grad2
  ctx.lineWidth = rw * 0.6
  ctx.lineCap = 'round'
  ctx.stroke()

  // ── Rim edges — surface tension lines on both sides of the ribbon ──
  for (const offset of [-1, 1]) {
    // Approximate offset by shifting control points perpendicular to path
    const nx1 = cx1 + offset * rw * 0.35
    const ny1 = cy1 + offset * rw * 0.15
    const nx2 = cx2 + offset * rw * 0.25
    const ny2 = cy2 - offset * rw * 0.2

    ctx.beginPath()
    ctx.moveTo(sx + offset * rw * 0.2, sy)
    ctx.bezierCurveTo(nx1, ny1, nx2, ny2, ex + offset * rw * 0.15, ey)
    const rimGrad = ctx.createLinearGradient(sx, sy, ex, ey)
    rimGrad.addColorStop(0, `rgba(${c.h},0)`)
    rimGrad.addColorStop(0.2, `rgba(${c.h},${0.12 * op})`)
    rimGrad.addColorStop(0.5, `rgba(${c.h},${0.15 * op})`)
    rimGrad.addColorStop(0.8, `rgba(${c.h},${0.1 * op})`)
    rimGrad.addColorStop(1, `rgba(${c.h},0)`)
    ctx.strokeStyle = rimGrad
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  // ── Centre structural line — elegant thin line through the middle ──
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey)
  const centreGrad = ctx.createLinearGradient(sx, sy, ex, ey)
  centreGrad.addColorStop(0, `rgba(${c.h},0)`)
  centreGrad.addColorStop(0.25, `rgba(${c.h},${0.08 * op})`)
  centreGrad.addColorStop(0.5, `rgba(255,255,255,${0.06 * op})`)
  centreGrad.addColorStop(0.75, `rgba(${c.h},${0.07 * op})`)
  centreGrad.addColorStop(1, `rgba(${c.h},0)`)
  ctx.strokeStyle = centreGrad
  ctx.lineWidth = 0.5
  ctx.stroke()

  // ── Caustic highlight — bright spot where light collects ──
  const midX = (sx + ex) / 2 + (cx1 + cx2) / 2 - (sx + ex) / 2
  const midY = (sy + ey) / 2 + (cy1 + cy2) / 2 - (sy + ey) / 2
  const hlR = rw * 0.8
  const hl = ctx.createRadialGradient(midX, midY, 0, midX, midY, hlR)
  hl.addColorStop(0, `rgba(255,255,255,${0.08 * op})`)
  hl.addColorStop(0.4, `rgba(255,255,255,${0.025 * op})`)
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.beginPath()
  ctx.arc(midX, midY, hlR, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/* ── membrane surface — large flowing translucent area ── */

function drawMembrane(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  config: {
    points: Array<[number, number]>  // 4+ points as fractions of w/h
    opacity: number
    hue: 'blue' | 'silver' | 'mint'
    phaseOffset?: number
  },
) {
  const p = config.phaseOffset ?? 0
  const op = config.opacity
  const pts = config.points.map(([px, py], i) => ({
    x: w * px + Math.sin(t * (0.12 + i * 0.03) + p + i) * w * 0.02,
    y: h * py + Math.cos(t * (0.1 + i * 0.025) + p + i * 0.7) * h * 0.025,
  }))

  const colors = {
    blue:   { r: '91,164,201',  h: '145,195,225' },
    silver: { r: '180,195,210', h: '200,215,228' },
    mint:   { r: '130,195,185', h: '160,215,205' },
  }
  const c = colors[config.hue]

  ctx.save()

  // Glow
  ctx.save()
  ctx.shadowColor = `rgba(${c.r},${0.08 * op})`
  ctx.shadowBlur = 40

  // Build a smooth closed path through the points
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i]
    const next = pts[(i + 1) % pts.length]
    const mx = (curr.x + next.x) / 2
    const my = (curr.y + next.y) / 2
    ctx.quadraticCurveTo(curr.x, curr.y, mx, my)
  }
  ctx.closePath()

  // Translucent glass fill
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
  const gr = Math.max(w, h) * 0.3
  const fill = ctx.createRadialGradient(cx - gr * 0.2, cy - gr * 0.15, 0, cx, cy, gr)
  fill.addColorStop(0, `rgba(${c.r},${0.045 * op})`)
  fill.addColorStop(0.4, `rgba(${c.h},${0.025 * op})`)
  fill.addColorStop(0.8, `rgba(${c.r},${0.01 * op})`)
  fill.addColorStop(1, `rgba(${c.r},0)`)
  ctx.fillStyle = fill
  ctx.fill()
  ctx.restore()

  // Edge rim
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i]
    const next = pts[(i + 1) % pts.length]
    const mx = (curr.x + next.x) / 2
    const my = (curr.y + next.y) / 2
    ctx.quadraticCurveTo(curr.x, curr.y, mx, my)
  }
  ctx.closePath()
  ctx.strokeStyle = `rgba(${c.h},${0.08 * op})`
  ctx.lineWidth = 0.8
  ctx.stroke()

  // Caustic
  const hl = ctx.createRadialGradient(cx - gr * 0.15, cy - gr * 0.2, 0, cx, cy, gr * 0.5)
  hl.addColorStop(0, `rgba(255,255,255,${0.05 * op})`)
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.beginPath()
  ctx.arc(cx - gr * 0.1, cy - gr * 0.1, gr * 0.4, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/* ── Per-layer canvas (one per layer, embedded in the section) ── */

function LayerCanvas({ layerIndex }: { layerIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }

    // Depth multiplier: 0=bright/surface, 2=dim/submerged
    const depth = layerIndex
    const opMul = 1 - depth * 0.3 // 1.0, 0.7, 0.4

    function draw() {
      if (!c || !ctx) return
      const w = c.offsetWidth, h = c.offsetHeight
      const t = Date.now() * 0.00005
      const vmin = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      // ── Glass-wave ribbons — flowing through each layer ──
      // Ribbons become more enclosing/layered with depth

      // Primary ribbon — varies per depth
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.05, y0: 0.3 + depth * 0.1, x1: 1.05, y1: 0.6 - depth * 0.05,
        cp1x: 0.3, cp1y: 0.15 + depth * 0.1, cp2x: 0.7, cp2y: 0.7 - depth * 0.05,
        width: vmin * (0.07 + depth * 0.02), opacity: (0.7 - depth * 0.15) * opMul,
        hue: depth === 0 ? 'blue' : depth === 1 ? 'violet' : 'silver',
        phaseOffset: depth * 2.5, speed: 0.6,
      })

      // Secondary counter-ribbon
      drawGlassRibbon(ctx, w, h, t, {
        x0: 1.06, y0: 0.2 + depth * 0.15, x1: -0.06, y1: 0.7 + depth * 0.05,
        cp1x: 0.65, cp1y: 0.5, cp2x: 0.35, cp2y: 0.4 + depth * 0.1,
        width: vmin * (0.04 + depth * 0.015), opacity: (0.45 - depth * 0.1) * opMul,
        hue: 'silver', phaseOffset: depth * 3.5 + 1.5, speed: 0.5,
      })

      // Membrane — gets more enclosing with depth
      if (depth >= 1) {
        drawMembrane(ctx, w, h, t, {
          points: [
            [0.1 - depth * 0.03, 0.2], [0.6, 0.1 - depth * 0.03],
            [0.95 + depth * 0.02, 0.4], [0.85, 0.8 + depth * 0.05],
            [0.3, 0.85], [0.05 - depth * 0.02, 0.55],
          ],
          opacity: (0.3 + depth * 0.1) * opMul, hue: depth === 1 ? 'blue' : 'silver',
          phaseOffset: depth * 4.0,
        })
      }

      // ── Supporting objects per layer ──

      // Orb — positioned differently per layer
      const orbR = vmin * (0.085 - depth * 0.012)
      const orbX = w * (0.12 + depth * 0.06) + Math.cos(t * (0.168 + depth * 0.02) + depth * 2) * orbR * 0.5
      const orbY = h * (0.3 + depth * 0.15) + Math.sin(t * (0.152 + depth * 0.016) + depth * 2) * orbR * 0.4
      ctx.save(); ctx.translate(orbX, orbY)
      ctx.beginPath(); ctx.arc(0, 0, orbR, 0, Math.PI * 2)
      const og = ctx.createRadialGradient(-orbR * 0.18, -orbR * 0.2, 0, 0, 0, orbR)
      og.addColorStop(0, `rgba(91,164,201,${0.054 * opMul})`); og.addColorStop(0.5, `rgba(91,164,201,${0.024 * opMul})`)
      og.addColorStop(1, 'rgba(91,164,201,0)'); ctx.fillStyle = og; ctx.fill()
      ctx.strokeStyle = `rgba(145,195,225,${0.094 * opMul})`; ctx.lineWidth = 0.78; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, orbR * 0.6, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(139,126,184,${0.034 * opMul})`; ctx.lineWidth = 0.39; ctx.stroke()
      ctx.restore()

      // Ring fragment — arc, not full circle. Gets more enclosing with depth.
      const ringR = vmin * (0.18 + depth * 0.06)
      const ringX = w * (0.92 - depth * 0.04) + Math.sin(t * 0.248 + depth) * 2
      const ringY = h * 0.5 + Math.cos(t * 0.208 + depth) * 2
      const arcSpan = Math.PI * (0.8 + depth * 0.4) // deeper = more enclosing
      const arcStart = -Math.PI * 0.5 + t * (0.032 + depth * 0.008) + depth * 1.2
      ctx.save(); ctx.translate(ringX, ringY)
      ctx.save(); ctx.shadowColor = `rgba(91,164,201,${0.085 * opMul})`; ctx.shadowBlur = 12
      ctx.beginPath(); ctx.arc(0, 0, ringR, arcStart, arcStart + arcSpan)
      ctx.strokeStyle = `rgba(91,164,201,${0.068 * opMul})`; ctx.lineWidth = ringR * 0.078
      ctx.lineCap = 'round'; ctx.stroke(); ctx.restore()
      // Inner arc
      ctx.beginPath(); ctx.arc(0, 0, ringR * 0.78, arcStart + 0.15, arcStart + arcSpan - 0.15)
      ctx.strokeStyle = `rgba(139,126,184,${0.034 * opMul})`; ctx.lineWidth = ringR * 0.026
      ctx.lineCap = 'round'; ctx.stroke()
      ctx.restore()

      // ── Primary form — larger, right side ──
      const s = vmin / 210
      const cx = w * 0.78 + Math.sin(t * 0.328 + depth * 1.5) * 2
      const cy = h * 0.5 + Math.sin(t * 0.42 + depth * 1.2) * 4

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(Math.sin(t * 0.21 + depth) * 0.01)

      if (depth === 0) {
        // Layer I: Clear head profile — the knowable subject
        ctx.save()
        ctx.shadowColor = `rgba(91,164,201,${0.136 * opMul})`
        ctx.shadowBlur = 24 * s
        headPath(ctx, s)
        ctx.strokeStyle = 'rgba(91,164,201,0.017)'
        ctx.lineWidth = 1.3
        ctx.stroke()
        ctx.restore()

        headPath(ctx, s)
        const hg = ctx.createRadialGradient(0, -6 * s, 0, 0, 0, 55 * s)
        hg.addColorStop(0, `rgba(91,164,201,${0.085 * opMul})`)
        hg.addColorStop(0.6, `rgba(91,164,201,${0.034 * opMul})`)
        hg.addColorStop(1, 'rgba(91,164,201,0)')
        ctx.fillStyle = hg
        ctx.fill()
        ctx.strokeStyle = `rgba(91,164,201,${0.17 * opMul})`
        ctx.lineWidth = 1.56
        ctx.stroke()

        headPath(ctx, s * 0.75)
        ctx.strokeStyle = `rgba(139,126,184,${0.085 * opMul})`
        ctx.lineWidth = 0.78
        ctx.stroke()
      } else if (depth === 1) {
        // Layer II: Fragmenting torso — self-relation destabilised
        // Draw head smaller, torso prominent, with visible separation
        const deform = 1 + Math.sin(t * 0.279) * 0.012
        ctx.scale(deform, 1 / deform)

        ctx.save()
        ctx.translate(0, 45 * s)
        torsoPath(ctx, s * 0.7)
        const tg = ctx.createLinearGradient(0, 0, 0, 135 * s)
        tg.addColorStop(0, `rgba(139,126,184,${0.06 * opMul})`)
        tg.addColorStop(0.6, `rgba(139,126,184,${0.026 * opMul})`)
        tg.addColorStop(1, 'rgba(139,126,184,0)')
        ctx.fillStyle = tg
        ctx.fill()
        ctx.strokeStyle = `rgba(139,126,184,${0.102 * opMul})`
        ctx.lineWidth = 1.3
        ctx.stroke()

        // Fragmenting inner echo — offset, suggesting instability
        ctx.save()
        ctx.translate(Math.sin(t * 0.314) * 3.5, Math.cos(t * 0.251) * 2.5)
        torsoPath(ctx, s * 0.58)
        ctx.strokeStyle = `rgba(91,164,201,${0.043 * opMul})`
        ctx.lineWidth = 0.65
        ctx.stroke()
        ctx.restore()
        ctx.restore()

        // Small head above — slightly displaced
        ctx.save()
        ctx.translate(Math.sin(t * 0.251) * 2.5, 0)
        headPath(ctx, s * 0.55)
        ctx.fillStyle = `rgba(139,126,184,${0.034 * opMul})`
        ctx.fill()
        ctx.strokeStyle = `rgba(139,126,184,${0.085 * opMul})`
        ctx.lineWidth = 1.04
        ctx.stroke()
        ctx.restore()
      } else {
        // Layer III: Fading full silhouette — deeply submerged
        const breathe = 1 + Math.sin(t * 0.628) * 0.007
        ctx.scale(breathe, breathe)

        // Faint full body
        ctx.save()
        ctx.translate(0, 40 * s)
        torsoPath(ctx, s * 0.6)
        const tg = ctx.createLinearGradient(0, 0, 0, 115 * s)
        tg.addColorStop(0, `rgba(91,164,201,${0.034 * opMul})`)
        tg.addColorStop(1, 'rgba(91,164,201,0)')
        ctx.fillStyle = tg
        ctx.fill()
        ctx.strokeStyle = `rgba(91,164,201,${0.051 * opMul})`
        ctx.lineWidth = 1.04
        ctx.stroke()
        ctx.restore()

        headPath(ctx, s * 0.5)
        ctx.fillStyle = `rgba(91,164,201,${0.02 * opMul})`
        ctx.fill()
        ctx.strokeStyle = `rgba(91,164,201,${0.043 * opMul})`
        ctx.lineWidth = 0.78
        ctx.stroke()

        // A faint ring enclosing the form — the governance structure
        ctx.beginPath()
        ctx.arc(0, 30 * s, 85 * s, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91,164,201,${0.026 * opMul})`
        ctx.lineWidth = 0.65
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
  }, [layerIndex])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

export function Layers() {
  return (
    <section id="layers">
      <div className="relative pt-28 md:pt-40 pb-16 md:pb-24 bg-base overflow-hidden">
        <div className="relative z-10 max-w-[1040px] mx-auto px-6 md:px-12">
          <Reveal>
            <SectionLabel>Three-Layer Model</SectionLabel>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[540px]">
              Descending into the governed subject
            </h2>
          </Reveal>
        </div>
      </div>

      {LAYERS.map((layer, i) => (
        <div
          key={layer.depth}
          className={`relative ${i % 2 === 1 ? 'bg-surface' : 'bg-base'} ${i === 2 ? 'pb-28 md:pb-40 pt-16 md:pt-24' : 'py-16 md:py-24'} overflow-hidden`}
        >
          <LayerCanvas layerIndex={i} />

          <div className="relative z-10 max-w-[1040px] mx-auto px-6 md:px-12">
            <Reveal delay={i * 0.08}>
              <div
                className="relative border-l-2 pl-8 md:pl-12"
                style={{
                  borderColor: layer.accent,
                  marginLeft: `${i * 24}px`,
                  marginRight: `${i * 24}px`,
                }}
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span
                    className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase"
                    style={{ color: layer.accent }}
                  >
                    Layer {layer.depth}
                  </span>
                  <span className="font-sans text-[12px] text-text-ghost font-light">
                    {layer.subtitle}
                  </span>
                </div>
                <h3 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.01em] text-text-primary mb-6">
                  {layer.title}
                </h3>
                <p className="font-sans text-[0.92rem] md:text-[0.97rem] leading-[1.85] text-text-secondary font-light max-w-[640px]">
                  {layer.body}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  )
}
