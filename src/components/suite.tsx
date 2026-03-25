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

/* ── glass-wave ribbon — flowing translucent band ── */

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

/* ── ghost-shell points — boundary shape around the ghost ── */

function ghostShellPoints(
  gx: number, gy: number, s: number,
): Array<[number, number]> {
  return [
    [gx, gy - 0.18 * s],
    [gx + 0.12 * s, gy - 0.12 * s],
    [gx + 0.16 * s, gy + 0.02 * s],
    [gx + 0.14 * s, gy + 0.18 * s],
    [gx, gy + 0.24 * s],
    [gx - 0.14 * s, gy + 0.18 * s],
    [gx - 0.16 * s, gy + 0.02 * s],
    [gx - 0.12 * s, gy - 0.12 * s],
  ]
}

/* ── infrastructure lines — soft control network between objects ── */

function drawInfrastructureLines(
  ctx: CanvasRenderingContext2D,
  t: number,
  nodes: Array<{ x: number; y: number; r?: number }>,
  config: { opacity: number; hue: 'blue' | 'silver' | 'violet'; phaseOffset?: number },
) {
  const p = config.phaseOffset ?? 0
  const op = config.opacity
  const colors = { blue: '91,164,201', silver: '180,195,210', violet: '139,126,184' }
  const c = colors[config.hue]

  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i], b = nodes[i + 1]
    const mx = (a.x + b.x) / 2 + Math.sin(t * 0.2 + p + i) * 8
    const my = (a.y + b.y) / 2 + Math.cos(t * 0.15 + p + i) * 6

    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.quadraticCurveTo(mx, my, b.x, b.y)
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
    grad.addColorStop(0, `rgba(${c},0)`)
    grad.addColorStop(0.2, `rgba(${c},${0.04 * op})`)
    grad.addColorStop(0.5, `rgba(${c},${0.06 * op})`)
    grad.addColorStop(0.8, `rgba(${c},${0.04 * op})`)
    grad.addColorStop(1, `rgba(${c},0)`)
    ctx.strokeStyle = grad
    ctx.lineWidth = 0.6
    ctx.stroke()
  }

  for (const node of nodes) {
    const pulse = 0.6 + Math.sin(t * 0.5 + p + node.x * 0.01) * 0.4
    const nr = (node.r ?? 2) * pulse

    ctx.save()
    ctx.shadowColor = `rgba(${c},${0.3 * op * pulse})`
    ctx.shadowBlur = 6
    ctx.beginPath()
    ctx.arc(node.x, node.y, nr, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${c},${0.15 * op * pulse})`
    ctx.fill()
    ctx.restore()

    ctx.beginPath()
    ctx.arc(node.x, node.y, nr * 0.4, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${0.12 * op * pulse})`
    ctx.fill()
  }
}

/* ── dissolution zone — where ribbons meet the ghost, forms blur together ── */

function drawDissolutionZone(
  ctx: CanvasRenderingContext2D,
  ghostX: number, ghostY: number, ghostScale: number,
  ribbonMidX: number, ribbonMidY: number,
  t: number, opacity: number,
) {
  const dx = ribbonMidX - ghostX, dy = ribbonMidY - ghostY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const maxDist = ghostScale * 200
  if (dist > maxDist) return

  const proximity = 1 - dist / maxDist
  const pulse = 0.7 + Math.sin(t * 0.3) * 0.3
  const op = opacity * proximity * pulse * 0.15

  const ix = ghostX + dx * 0.3, iy = ghostY + dy * 0.3
  const ir = ghostScale * 60

  const g = ctx.createRadialGradient(ix, iy, 0, ix, iy, ir)
  g.addColorStop(0, `rgba(145,195,225,${op})`)
  g.addColorStop(0.5, `rgba(91,164,201,${op * 0.4})`)
  g.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(ix, iy, ir, 0, Math.PI * 2)
  ctx.fill()
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
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.00005
      const r = Math.min(w, h) * 0.52
      const cx = w * 0.5 + Math.sin(t * 0.33) * 2
      const cy = h * 0.5 + Math.cos(t * 0.27) * 2
      ctx.clearRect(0, 0, w, h)

      // Glass ribbon flowing through the observatory
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.05, y0: 0.4, x1: 1.05, y1: 0.55,
        cp1x: 0.3, cp1y: 0.2, cp2x: 0.7, cp2y: 0.75,
        width: Math.min(w, h) * 0.06, opacity: 0.5, hue: 'silver', phaseOffset: 1.0, speed: 0.6,
      })

      ctx.save()
      ctx.translate(cx, cy)

      // Shadow glow
      ctx.save()
      ctx.shadowColor = 'rgba(91,164,201,0.1)'; ctx.shadowBlur = 18

      // Ring bands
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.1)'; ctx.lineWidth = r * 0.08; ctx.stroke()
      ctx.restore()
      ctx.beginPath(); ctx.arc(0, 0, r * 0.76, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.05)'; ctx.lineWidth = r * 0.025; ctx.stroke()

      // Markers
      const rot = t * 0.05
      ctx.save(); ctx.rotate(rot)
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2
        const major = i % 6 === 0
        const len = major ? r * 0.08 : r * 0.035
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * (r - r * 0.04 - len), Math.sin(a) * (r - r * 0.04 - len))
        ctx.lineTo(Math.cos(a) * (r - r * 0.04), Math.sin(a) * (r - r * 0.04))
        ctx.strokeStyle = `rgba(91,164,201,${major ? 0.22 : 0.08})`
        ctx.lineWidth = major ? 1.69 : 0.78; ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore()

      // Hand
      const ha = t * 0.07
      ctx.beginPath(); ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(ha) * r * 0.68, Math.sin(ha) * r * 0.68)
      ctx.strokeStyle = 'rgba(91,164,201,0.1)'; ctx.lineWidth = 0.8; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91,164,201,0.2)'; ctx.fill()

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
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.00005
      const s = Math.min(w, h) / 220
      ctx.clearRect(0, 0, w, h)

      // Flowing ribbon behind the drifting profiles
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.1, y0: -0.05, x1: 0.9, y1: 1.05,
        cp1x: 0.40, cp1y: 0.32, cp2x: 0.60, cp2y: 0.55,
        width: Math.min(w, h) * 0.05, opacity: 0.4, hue: 'mint', phaseOffset: 4.0, speed: 0.5,
      })

      ctx.save()
      ctx.translate(w * 0.5, h * 0.48)

      // 5 echoes of the same cranial profile, slowly drifting apart
      for (let i = 0; i < 5; i++) {
        const spread = Math.sin(t * 0.21 + i * 0.3) * (5 + i * 4)
        const vertDrift = Math.sin(t * 0.314 + i * 0.7) * (1.6 + i * 2)
        const scale = 1 - i * 0.08
        const op = 0.12 - i * 0.02
        const color = i % 2 === 0 ? '91,164,201' : '139,126,184'

        ctx.save()
        ctx.translate(spread, vertDrift)
        cranialProfile(ctx, s * scale)
        ctx.strokeStyle = `rgba(${color},${op})`
        ctx.lineWidth = 0.91 - i * 0.1
        ctx.stroke()
        if (i === 0) {
          const fg = ctx.createRadialGradient(10 * s, -20 * s, 0, 0, 0, 80 * s)
          fg.addColorStop(0, 'rgba(91,164,201,0.04)')
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
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.00005
      const s = Math.min(w, h) / 210
      ctx.clearRect(0, 0, w, h)

      // Connecting ribbon between the mirrored heads
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.15, y0: 0.5, x1: 0.85, y1: 0.5,
        cp1x: 0.35, cp1y: 0.38, cp2x: 0.65, cp2y: 0.38,
        width: Math.min(w, h) * 0.045, opacity: 0.4, hue: 'violet', phaseOffset: 7.0, speed: 0.5,
      })

      const gap = 35 * s + Math.sin(t * 0.28) * 3 * s // gap oscillates
      const floatY = Math.sin(t * 0.42) * 3

      // Left-facing head
      ctx.save()
      ctx.translate(w * 0.5 - gap, h * 0.48 + floatY)
      headPath(ctx, s * 0.85)
      const lg = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 48 * s)
      lg.addColorStop(0, 'rgba(91,164,201,0.068)')
      lg.addColorStop(1, 'rgba(91,164,201,0.014)')
      ctx.fillStyle = lg; ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.136)'; ctx.lineWidth = 1; ctx.stroke()
      headPath(ctx, s * 0.62)
      ctx.strokeStyle = 'rgba(139,126,184,0.068)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()

      // Right-facing head (mirrored)
      ctx.save()
      ctx.translate(w * 0.5 + gap, h * 0.48 + floatY)
      ctx.scale(-1, 1)
      headPath(ctx, s * 0.85)
      const rg = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 48 * s)
      rg.addColorStop(0, 'rgba(91,164,201,0.06)')
      rg.addColorStop(1, 'rgba(91,164,201,0.01)')
      ctx.fillStyle = rg; ctx.fill()
      ctx.strokeStyle = 'rgba(91,164,201,0.11)'; ctx.lineWidth = 1; ctx.stroke()
      headPath(ctx, s * 0.62)
      ctx.strokeStyle = 'rgba(139,126,184,0.051)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()

      // Connecting arc between them — the feedback loop
      ctx.save()
      ctx.translate(w * 0.5, h * 0.48 + floatY)
      ctx.beginPath()
      ctx.arc(0, -10 * s, gap + 20 * s, Math.PI * 0.15, Math.PI * 0.85)
      ctx.strokeStyle = 'rgba(91,164,201,0.04)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.beginPath()
      ctx.arc(0, 10 * s, gap + 20 * s, -Math.PI * 0.85, -Math.PI * 0.15)
      ctx.strokeStyle = 'rgba(139,126,184,0.032)'; ctx.lineWidth = 0.5; ctx.stroke()
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
      const w = c.offsetWidth, h = c.offsetHeight, t = Date.now() * 0.00005
      const vmin = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      // ── Glass-wave ribbons — flowing behind all suite cards ──
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.06, y0: 0.1, x1: 1.08, y1: 0.85,
        cp1x: 0.82, cp1y: 0.15, cp2x: 0.7, cp2y: 0.95,
        width: vmin * 0.1, opacity: 0.7, hue: 'blue', phaseOffset: 0, speed: 0.7,
      })
      drawGlassRibbon(ctx, w, h, t, {
        x0: 1.05, y0: 0.05, x1: -0.03, y1: 0.7,
        cp1x: 0.75, cp1y: 0.35, cp2x: 0.25, cp2y: 0.3,
        width: vmin * 0.065, opacity: 0.45, hue: 'silver', phaseOffset: 3.0, speed: 0.55,
      })
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.1, y0: 1.05, x1: 0.9, y1: 0.15,
        cp1x: 0.3, cp1y: 0.6, cp2x: 0.65, cp2y: 0.5,
        width: vmin * 0.04, opacity: 0.35, hue: 'mint', phaseOffset: 6.5, speed: 0.5,
      })
      drawMembrane(ctx, w, h, t, {
        points: [[0.15, 0.15], [0.6, 0.05], [0.92, 0.3], [0.8, 0.7], [0.4, 0.8], [0.08, 0.45]],
        opacity: 0.35, hue: 'blue', phaseOffset: 2.0,
      })

      // ── Body-wrapping ribbon ──
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.78, y0: 0.05, x1: 0.98, y1: 0.55,
        cp1x: 0.96, cp1y: 0.15, cp2x: 0.98, cp2y: 0.38,
        width: vmin * 0.03, opacity: 0.35, hue: 'violet', phaseOffset: 8.5, speed: 0.45,
      })

      // ── Identity-shell membrane ──
      drawMembrane(ctx, w, h, t, {
        points: ghostShellPoints(0.88, 0.35, 1.3),
        opacity: 0.15, hue: 'silver', phaseOffset: 6.0,
      })

      // ── Large ghost silhouette — right edge, tall, faint ──
      const gs = vmin / 380
      const gx = w * 0.88 + Math.sin(t * 0.296) * 3
      const gy = h * 0.22 + Math.sin(t * 0.368) * 5
      ctx.save()
      ctx.translate(gx, gy)
      ctx.scale(1 + Math.sin(t * 0.628) * 0.003, 1 + Math.sin(t * 0.628) * 0.003)
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
      tg.addColorStop(0, 'rgba(91,164,201,0.0425)'); tg.addColorStop(0.5, 'rgba(91,164,201,0.02)')
      tg.addColorStop(1, 'rgba(91,164,201,0)'); ctx.fillStyle = tg; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.068)'; ctx.lineWidth = 1.04; ctx.stroke()
      ctx.restore()
      // Head
      headPath(ctx, gs)
      const hfg = ctx.createRadialGradient(0, -6 * gs, 0, 0, 0, 52 * gs)
      hfg.addColorStop(0, 'rgba(91,164,201,0.051)'); hfg.addColorStop(0.5, 'rgba(91,164,201,0.02)')
      hfg.addColorStop(1, 'rgba(91,164,201,0.005)'); ctx.fillStyle = hfg; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.094)'; ctx.lineWidth = 1.3; ctx.stroke()
      headPath(ctx, gs * 0.72); ctx.strokeStyle = 'rgba(139,126,184,0.0425)'; ctx.lineWidth = 0.65; ctx.stroke()
      ctx.restore()

      // ── Governance ring — upper left area ──
      const rr = vmin * 0.24
      const rx = w * 0.08 + Math.sin(t * 0.328) * 2
      const ry = h * 0.12 + Math.cos(t * 0.272) * 2
      ctx.save(); ctx.translate(rx, ry)
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.1)'; ctx.shadowBlur = 13
      ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.06)'; ctx.lineWidth = rr * 0.07; ctx.stroke(); ctx.restore()
      ctx.beginPath(); ctx.arc(0, 0, rr * 0.74, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.031)'; ctx.lineWidth = rr * 0.02; ctx.stroke()
      ctx.save(); ctx.rotate(t * 0.04)
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2; const major = i % 6 === 0
        const len = major ? rr * 0.06 : rr * 0.025
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * (rr - rr * 0.035 - len), Math.sin(a) * (rr - rr * 0.035 - len))
        ctx.lineTo(Math.cos(a) * (rr - rr * 0.035), Math.sin(a) * (rr - rr * 0.035))
        ctx.strokeStyle = `rgba(91,164,201,${major ? 0.136 : 0.0425})`; ctx.lineWidth = major ? 1.17 : 0.52
        ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore(); ctx.restore()

      // ── 4 orbs scattered ──
      for (const orb of [
        { x: 0.05, y: 0.48, r: 0.08, ph: 0 },
        { x: 0.72, y: 0.08, r: 0.064, ph: 1.8 },
        { x: 0.94, y: 0.7, r: 0.056, ph: 3.5 },
        { x: 0.32, y: 0.92, r: 0.048, ph: 5.1 },
      ]) {
        const or = vmin * orb.r
        const oa = t * (0.16 + orb.ph * 0.006) + orb.ph
        ctx.save()
        ctx.translate(w * orb.x + Math.cos(oa) * or * 0.6, h * orb.y + Math.sin(oa) * or * 0.4)
        ctx.beginPath(); ctx.arc(0, 0, or, 0, Math.PI * 2)
        const og = ctx.createRadialGradient(-or * 0.18, -or * 0.2, 0, 0, 0, or)
        og.addColorStop(0, 'rgba(91,164,201,0.051)'); og.addColorStop(0.5, 'rgba(91,164,201,0.02)')
        og.addColorStop(1, 'rgba(91,164,201,0.0034)'); ctx.fillStyle = og; ctx.fill()
        ctx.strokeStyle = 'rgba(145,195,225,0.077)'; ctx.lineWidth = 0.78; ctx.stroke()
        ctx.beginPath(); ctx.arc(0, 0, or * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(139,126,184,0.031)'; ctx.lineWidth = 0.39; ctx.stroke()
        ctx.restore()
      }

      // ── Infrastructure lines connecting ghost to governance objects ──
      drawInfrastructureLines(ctx, t, [
        { x: w * 0.88, y: h * 0.22 },
        { x: w * 0.08, y: h * 0.12 },
        { x: w * 0.05, y: h * 0.48 },
      ], { opacity: 0.3, hue: 'silver', phaseOffset: 0 })
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
