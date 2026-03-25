'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as const

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Hero — single composed canvas
 *
 *  Centre-left : ghost silhouette (head + shoulders + torso)
 *  Right       : governance ring
 *  Scattered   : 3 memory orbs
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── paths ── */

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

/* ── glass-wave ribbon — flowing translucent sculptural form ── */

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

/* ── identity-shell membrane points — echoes human outline at larger scale ── */

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

/* ── ghost silhouette ── */

function drawGhost(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  t: number,
) {
  // ── Motion: glacial, weighty, psychologically present ──
  // Dominant vertical float: ~140s cycle
  const floatY = Math.sin(t * 0.45) * 16 + Math.sin(t * 0.27) * 7
  // Gentle horizontal drift: ~175s cycle
  const driftX = Math.sin(t * 0.36) * 6 + Math.sin(t * 0.21) * 3
  // Breathing: ~75s cycle, visible but slow
  const breathe = 1 + Math.sin(t * 0.84) * 0.01 + Math.sin(t * 0.55) * 0.005
  // Non-uniform deformation: asymmetric, unsettling (~200s, ~280s)
  const deformX = 1 + Math.sin(t * 0.31) * 0.008
  const deformY = 1 + Math.cos(t * 0.23) * 0.012
  // Slow head tilt: ~250s — feels like it's turning toward you
  const headTilt = Math.sin(t * 0.25) * 0.028

  // Inner echo lag — echoes trail the outer form by a time offset
  const lagDriftX = Math.sin(t * 0.36 - 0.15) * 6 + Math.sin(t * 0.21 - 0.1) * 3
  const lagFloatY = Math.sin(t * 0.45 - 0.12) * 16 + Math.sin(t * 0.27 - 0.08) * 7
  const echoOffsetX = (driftX - lagDriftX) * 0.6
  const echoOffsetY = (floatY - lagFloatY) * 0.6

  ctx.save()
  ctx.translate(cx + driftX, cy + floatY)
  ctx.scale(breathe * deformX, breathe * deformY)

  // ── Torso — translucent gel / blown glass material ──
  ctx.save()
  ctx.translate(0, 50 * s)

  // Subsurface glow — large, diffuse, physically present
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.22)'
  ctx.shadowBlur = 40 * s
  torsoPath(ctx, s)
  ctx.strokeStyle = 'rgba(91,164,201,0.012)'
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.restore()

  // Layered subsurface fill — heavy, luminous volume
  torsoPath(ctx, s)
  const tg = ctx.createLinearGradient(-20 * s, 0, 20 * s, 192 * s)
  tg.addColorStop(0, 'rgba(91,164,201,0.09)')
  tg.addColorStop(0.25, 'rgba(91,164,201,0.06)')
  tg.addColorStop(0.6, 'rgba(91,164,201,0.025)')
  tg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = tg
  ctx.fill()

  // Second subsurface layer — warmer, offset centre
  torsoPath(ctx, s * 0.94)
  const tg2 = ctx.createRadialGradient(8 * s, 40 * s, 0, 0, 60 * s, 90 * s)
  tg2.addColorStop(0, 'rgba(120,170,210,0.035)')
  tg2.addColorStop(0.5, 'rgba(91,164,201,0.015)')
  tg2.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = tg2
  ctx.fill()

  // Rim edge — taut, present, the boundary of a form
  torsoPath(ctx, s)
  const eg = ctx.createLinearGradient(0, 0, 0, 192 * s)
  eg.addColorStop(0, 'rgba(145,195,225,0.2)')
  eg.addColorStop(0.3, 'rgba(91,164,201,0.12)')
  eg.addColorStop(0.6, 'rgba(91,164,201,0.04)')
  eg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.strokeStyle = eg
  ctx.lineWidth = 1.8
  ctx.stroke()

  // Inner tension line
  torsoPath(ctx, s * 0.97)
  const itl = ctx.createLinearGradient(0, 0, 0, 186 * s)
  itl.addColorStop(0, 'rgba(180,215,235,0.1)')
  itl.addColorStop(0.4, 'rgba(145,195,225,0.04)')
  itl.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.strokeStyle = itl
  ctx.lineWidth = 0.6
  ctx.stroke()

  // Frosted inner echo — filled, not just stroked
  ctx.save()
  ctx.translate(echoOffsetX * 0.7, echoOffsetY * 0.7)
  torsoPath(ctx, s * 0.86)
  const ifg = ctx.createLinearGradient(0, 0, 0, 165 * s)
  ifg.addColorStop(0, 'rgba(139,126,184,0.03)')
  ifg.addColorStop(0.5, 'rgba(139,126,184,0.014)')
  ifg.addColorStop(1, 'rgba(139,126,184,0)')
  ctx.fillStyle = ifg
  ctx.fill()
  ctx.strokeStyle = 'rgba(139,126,184,0.055)'
  ctx.lineWidth = 0.8
  ctx.stroke()
  ctx.restore()

  ctx.restore()

  // ── Head — blown glass with subsurface scattering ──

  ctx.save()
  ctx.rotate(headTilt)

  // Outer glow halo — large, imposing
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.26)'
  ctx.shadowBlur = 48 * s
  headPath(ctx, s)
  ctx.strokeStyle = 'rgba(91,164,201,0.01)'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  // Primary subsurface fill — luminous core
  headPath(ctx, s)
  const hg = ctx.createRadialGradient(0, -8 * s, 0, 0, -2 * s, 56 * s)
  hg.addColorStop(0, 'rgba(91,164,201,0.11)')
  hg.addColorStop(0.3, 'rgba(91,164,201,0.065)')
  hg.addColorStop(0.65, 'rgba(91,164,201,0.03)')
  hg.addColorStop(1, 'rgba(91,164,201,0.008)')
  ctx.fillStyle = hg
  ctx.fill()

  // Secondary subsurface — offset, warmer, creates colour shift
  headPath(ctx, s * 0.92)
  const hg2 = ctx.createRadialGradient(12 * s, 8 * s, 0, 5 * s, 0, 42 * s)
  hg2.addColorStop(0, 'rgba(130,160,210,0.04)')
  hg2.addColorStop(0.5, 'rgba(120,145,200,0.018)')
  hg2.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = hg2
  ctx.fill()

  // Rim edge — taut, defined, the boundary of something real
  headPath(ctx, s)
  ctx.strokeStyle = 'rgba(145,195,225,0.22)'
  ctx.lineWidth = 2
  ctx.stroke()

  // Inner tension line
  headPath(ctx, s * 0.97)
  ctx.strokeStyle = 'rgba(180,215,235,0.08)'
  ctx.lineWidth = 0.5
  ctx.stroke()

  // Frosted inner echo 1 — filled membrane
  ctx.save()
  ctx.translate(echoOffsetX, echoOffsetY)
  headPath(ctx, s * 0.76)
  const ie1 = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 42 * s)
  ie1.addColorStop(0, 'rgba(139,126,184,0.035)')
  ie1.addColorStop(1, 'rgba(139,126,184,0.008)')
  ctx.fillStyle = ie1
  ctx.fill()
  ctx.strokeStyle = 'rgba(139,126,184,0.08)'
  ctx.lineWidth = 0.9
  ctx.stroke()
  ctx.restore()

  // Frosted inner echo 2 — deeper
  ctx.save()
  ctx.translate(echoOffsetX * 1.5, echoOffsetY * 1.5)
  headPath(ctx, s * 0.52)
  ctx.fillStyle = 'rgba(91,164,201,0.014)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.035)'
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.restore()

  // Primary caustic highlight (clipped) — upper left
  ctx.save()
  headPath(ctx, s)
  ctx.clip()
  const hl = ctx.createRadialGradient(-14 * s, -24 * s, 0, -14 * s, -24 * s, 28 * s)
  hl.addColorStop(0, 'rgba(255,255,255,0.18)')
  hl.addColorStop(0.3, 'rgba(255,255,255,0.07)')
  hl.addColorStop(0.7, 'rgba(255,255,255,0.015)')
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.fillRect(-50 * s, -55 * s, 100 * s, 80 * s)
  // Secondary caustic — lower right (refraction)
  const hl2 = ctx.createRadialGradient(18 * s, 20 * s, 0, 18 * s, 20 * s, 16 * s)
  hl2.addColorStop(0, 'rgba(255,255,255,0.06)')
  hl2.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl2
  ctx.fillRect(0, 5 * s, 40 * s, 35 * s)
  ctx.restore()

  ctx.restore() // end head tilt

  // ── Thought-stream traces — glacial rotation, varied weight ──
  for (let i = 0; i < 7; i++) {
    // Very slow rotation: ~225s per revolution
    const angle = (i / 7) * Math.PI * 2 + t * 0.14
    const r1 = 10 * s
    // Reach oscillates slowly (~100s)
    const r2 = (30 + i * 3) * s + Math.sin(t * 0.31 + i * 1.6) * 10 * s
    const a2 = angle + 0.65 + Math.sin(t * 0.25 + i) * 0.4
    const weight = 0.5 + (i % 3) * 0.2
    // Opacity pulses slowly (~90s, phase-offset per trace)
    const op = 0.05 + Math.sin(t * 0.35 + i * 0.9) * 0.02

    ctx.beginPath()
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1)
    ctx.quadraticCurveTo(
      Math.cos(angle + 0.3) * r2 * 0.6,
      Math.sin(angle + 0.3) * r2 * 0.6,
      Math.cos(a2) * r2,
      Math.sin(a2) * r2,
    )
    ctx.strokeStyle = `rgba(91,164,201,${op})`
    ctx.lineWidth = weight
    ctx.stroke()

    // Endpoint node — slow pulse (~45s)
    const pulse = 0.5 + Math.sin(t * 0.698 + i * 1.3) * 0.4
    ctx.beginPath()
    ctx.arc(Math.cos(a2) * r2, Math.sin(a2) * r2, 1.2 * pulse, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(91,164,201,${0.07 * pulse})`
    ctx.fill()
  }

  ctx.restore()
}

/* ── governance ring ── */

function drawRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
) {
  // ── Motion: suspended instrument, immense, barely drifting ──
  // Slow drift: ~150s / ~225s cycles
  const driftX = Math.sin(t * 0.42) * 6 + Math.sin(t * 0.18) * 3
  const driftY = Math.cos(t * 0.33) * 5 + Math.cos(t * 0.15) * 2
  // Tilt — circle becomes noticeably oval (~225s)
  const tiltX = 1 + Math.sin(t * 0.28) * 0.03
  // Slow pulse: ~100s
  const pulse = 1 + Math.sin(t * 0.63) * 0.005

  ctx.save()
  ctx.translate(cx + driftX, cy + driftY)
  ctx.scale(tiltX * pulse, (1 / tiltX) * pulse) // tilt preserves area

  // ── Disc body — frosted glass fill, heavier ──
  ctx.beginPath()
  ctx.arc(0, 0, r * 1.02, 0, Math.PI * 2)
  const df = ctx.createRadialGradient(-r * 0.15, -r * 0.15, 0, 0, 0, r * 1.02)
  df.addColorStop(0, 'rgba(91,164,201,0.028)')
  df.addColorStop(0.4, 'rgba(91,164,201,0.014)')
  df.addColorStop(0.8, 'rgba(91,164,201,0.005)')
  df.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = df
  ctx.fill()

  // ── Outer band — frosted glass tubing with imposing glow ──
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.16)'
  ctx.shadowBlur = 28
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.09)'
  ctx.lineWidth = r * 0.1
  ctx.stroke()
  ctx.restore()
  // Inner rim of outer band — surface tension
  ctx.beginPath()
  ctx.arc(0, 0, r - r * 0.05, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(145,195,225,0.065)'
  ctx.lineWidth = 0.6
  ctx.stroke()
  // Outer rim of outer band
  ctx.beginPath()
  ctx.arc(0, 0, r + r * 0.05, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(145,195,225,0.05)'
  ctx.lineWidth = 0.4
  ctx.stroke()

  // Middle band — frosted
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.05)'
  ctx.lineWidth = r * 0.04
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(145,195,225,0.025)'
  ctx.lineWidth = 0.4
  ctx.stroke()

  // Inner band
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139,126,184,0.035)'
  ctx.lineWidth = 1
  ctx.stroke()

  // ── 24 outer markers — glacial rotation: ~17min/revolution ──
  const rot = t * 0.06
  ctx.save()
  ctx.rotate(rot)
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2
    const major = i % 6 === 0
    const mid = i % 3 === 0 && !major
    const len = major ? r * 0.09 : mid ? r * 0.055 : r * 0.035
    const inner = r - r * 0.05 - len
    const outer = r - r * 0.05

    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
    ctx.strokeStyle = `rgba(91,164,201,${major ? 0.22 : mid ? 0.12 : 0.065})`
    ctx.lineWidth = major ? 2 : mid ? 1.3 : 0.8
    ctx.lineCap = 'round'
    ctx.stroke()

    if (major) {
      ctx.beginPath()
      ctx.arc(Math.cos(a) * (r * 1.03), Math.sin(a) * (r * 1.03), 1.8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91,164,201,0.16)'
      ctx.fill()
    }
  }
  ctx.restore()

  // ── 12 inner markers — counter-rotating, even slower ──
  ctx.save()
  ctx.rotate(-rot * 0.4)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const inner = r * 0.78 - r * 0.03
    const outer = r * 0.78 - r * 0.005

    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
    ctx.strokeStyle = 'rgba(91,164,201,0.065)'
    ctx.lineWidth = 0.8
    ctx.lineCap = 'round'
    ctx.stroke()
  }
  ctx.restore()

  // ── Sweeping hand — glacial: ~12min/revolution ──
  const handA = t * 0.08
  // Trail (longer, fainter)
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.55, handA - 1.0, handA)
  ctx.strokeStyle = 'rgba(91,164,201,0.02)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Hand line
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(Math.cos(handA) * r * 0.72, Math.sin(handA) * r * 0.72)
  const hg = ctx.createLinearGradient(
    0, 0,
    Math.cos(handA) * r * 0.72,
    Math.sin(handA) * r * 0.72,
  )
  hg.addColorStop(0, 'rgba(91,164,201,0.12)')
  hg.addColorStop(1, 'rgba(91,164,201,0.02)')
  ctx.strokeStyle = hg
  ctx.lineWidth = 1.3
  ctx.lineCap = 'round'
  ctx.stroke()

  // Centre
  ctx.beginPath()
  ctx.arc(0, 0, 2.2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(91,164,201,0.2)'
  ctx.fill()

  // ── Disc highlight ──
  const dhl = ctx.createRadialGradient(-r * 0.2, -r * 0.22, 0, -r * 0.2, -r * 0.22, r * 0.6)
  dhl.addColorStop(0, 'rgba(255,255,255,0.06)')
  dhl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = dhl
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/* ── memory orb ── */

function drawOrb(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
  phase: number,
) {
  // ── Glacial elliptical orbit: ~150s, phase-offset ──
  const orbSpeed = 0.21 + phase * 0.012
  const orbAngle = t * orbSpeed + phase
  const orbRx = r * 0.9
  const orbRy = r * 0.6
  const dx = Math.cos(orbAngle) * orbRx + Math.sin(t * 0.15 + phase) * 1.5
  const dy = Math.sin(orbAngle) * orbRy + Math.cos(t * 0.12 + phase) * 1.2
  // Breathing: ~75s, phase-offset
  const breathe = 1 + Math.sin(t * 0.42 + phase) * 0.01 + Math.sin(t * 0.29 + phase) * 0.005

  ctx.save()
  ctx.translate(cx + dx, cy + dy)
  ctx.scale(breathe, breathe)

  // Subsurface glow — imposing
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.14)'
  ctx.shadowBlur = r * 1.2
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.01)'
  ctx.lineWidth = 2.5
  ctx.stroke()
  ctx.restore()

  // Primary subsurface fill — heavier, more luminous
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  const sg = ctx.createRadialGradient(-r * 0.18, -r * 0.22, 0, 0, 0, r)
  sg.addColorStop(0, 'rgba(91,164,201,0.085)')
  sg.addColorStop(0.3, 'rgba(91,164,201,0.045)')
  sg.addColorStop(0.7, 'rgba(91,164,201,0.018)')
  sg.addColorStop(1, 'rgba(91,164,201,0.005)')
  ctx.fillStyle = sg
  ctx.fill()

  // Secondary subsurface — warmer offset
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.88, 0, Math.PI * 2)
  const sg2 = ctx.createRadialGradient(r * 0.12, r * 0.1, 0, 0, 0, r * 0.88)
  sg2.addColorStop(0, 'rgba(130,165,210,0.025)')
  sg2.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = sg2
  ctx.fill()

  // Rim edge — taut, bright
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(145,195,225,0.09)'
  ctx.lineWidth = 1
  ctx.stroke()
  // Inner tension line
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.97, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(180,215,235,0.03)'
  ctx.lineWidth = 0.3
  ctx.stroke()

  // Frosted inner shells
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.68, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(139,126,184,0.008)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(139,126,184,0.03)'
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.42, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(91,164,201,0.005)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.018)'
  ctx.lineWidth = 0.35
  ctx.stroke()

  // Internal traces — very slow orbital drift
  for (let i = 0; i < 4; i++) {
    const p = (i / 4) * Math.PI * 2 + t * (0.2 + i * 0.03) + phase
    const oA = r * (0.28 + i * 0.07)
    const oB = r * (0.16 + i * 0.04)
    const tilt = i * 0.5 + phase * 0.25

    ctx.beginPath()
    for (let j = 0; j <= 30; j++) {
      const a = p + (j / 30) * Math.PI * 1.05
      const x = Math.cos(a) * oA
      const y = Math.sin(a) * oB
      const rx = x * Math.cos(tilt) - y * Math.sin(tilt)
      const ry = x * Math.sin(tilt) + y * Math.cos(tilt)
      if (j === 0) ctx.moveTo(rx, ry)
      else ctx.lineTo(rx, ry)
    }
    ctx.strokeStyle = `rgba(139,126,184,${0.022 + Math.sin(t * 0.785 + i + phase) * 0.008})`
    ctx.lineWidth = 0.45
    ctx.stroke()
  }

  // Caustic highlights — clipped to sphere
  ctx.save()
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.clip()
  // Primary caustic — upper left
  const hl = ctx.createRadialGradient(-r * 0.25, -r * 0.3, 0, -r * 0.25, -r * 0.3, r * 0.5)
  hl.addColorStop(0, 'rgba(255,255,255,0.13)')
  hl.addColorStop(0.25, 'rgba(255,255,255,0.04)')
  hl.addColorStop(0.6, 'rgba(255,255,255,0.01)')
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.fillRect(-r, -r, r * 2, r * 2)
  // Secondary caustic — lower right refraction
  const hl2 = ctx.createRadialGradient(r * 0.2, r * 0.22, 0, r * 0.2, r * 0.22, r * 0.25)
  hl2.addColorStop(0, 'rgba(255,255,255,0.035)')
  hl2.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl2
  ctx.fillRect(0, 0, r, r)
  ctx.restore()

  ctx.restore()
}

/* ━━━ Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

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
      const t = Date.now() * 0.00005
      const vmin = Math.min(w, h)

      ctx.clearRect(0, 0, w, h)

      // ── Ambient glow — heavier, the room these presences inhabit ──
      const ag = ctx.createRadialGradient(w * 0.36, h * 0.38, 0, w * 0.36, h * 0.38, vmin * 0.9)
      ag.addColorStop(0, 'rgba(91,164,201,0.08)')
      ag.addColorStop(0.3, 'rgba(139,126,184,0.04)')
      ag.addColorStop(0.65, 'rgba(91,164,201,0.015)')
      ag.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = ag
      ctx.fillRect(0, 0, w, h)

      // ── Key positions for spatial composition ──
      const gx = w * 0.34, gy = h * 0.26  // primary ghost
      const gs = vmin / 340               // ghost scale
      const rx = w * 0.76, ry = h * 0.48  // primary ring

      // ── Glass-wave ribbons — contour-tracing, body-aware flows ──

      // Primary ribbon: traces cranial crown → shoulder line of ghost
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.08, y0: 0.15, x1: 1.1, y1: 0.65,
        cp1x: 0.32, cp1y: 0.18,  // near ghost crown
        cp2x: 0.50, cp2y: 0.42,  // near ghost shoulder line
        width: vmin * 0.12, opacity: 1, hue: 'blue', phaseOffset: 0, speed: 0.8,
      })

      // Silver ribbon: flows past ring, counter-tracing the governance structure
      drawGlassRibbon(ctx, w, h, t, {
        x0: 1.05, y0: -0.05, x1: -0.05, y1: 0.55,
        cp1x: 0.74, cp1y: 0.35,  // near ring centre
        cp2x: 0.20, cp2y: 0.25,
        width: vmin * 0.08, opacity: 0.7, hue: 'silver', phaseOffset: 2.5, speed: 0.6,
      })

      // Mint ribbon: rises through lower body zone
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.15, y0: 1.08, x1: 0.92, y1: 0.35,
        cp1x: 0.30, cp1y: 0.60,  // torso region
        cp2x: 0.55, cp2y: 0.45,
        width: vmin * 0.06, opacity: 0.55, hue: 'mint', phaseOffset: 5.0, speed: 0.7,
      })

      // Body-wrapping ribbon: curves around the ghost silhouette
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.24, y0: 0.10,   // above-left of ghost
        x1: 0.44, y1: 0.58,   // below-right of ghost
        cp1x: 0.50, cp1y: 0.18,  // swings right of head
        cp2x: 0.52, cp2y: 0.44,  // swings right of torso
        width: vmin * 0.04, opacity: 0.5, hue: 'violet', phaseOffset: 8.0, speed: 0.5,
      })

      // Violet structural thread: weaves between ghost and ring
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.04, y0: 0.52, x1: 1.06, y1: 0.18,
        cp1x: 0.34, cp1y: 0.38,  // near ghost torso
        cp2x: 0.72, cp2y: 0.40,  // near ring
        width: vmin * 0.03, opacity: 0.4, hue: 'violet', phaseOffset: 7.5, speed: 0.5,
      })

      // ── Identity-shell membrane — preserved outline of selfhood ──
      drawMembrane(ctx, w, h, t, {
        points: ghostShellPoints(0.34, 0.32, 1.8),
        opacity: 0.25, hue: 'silver', phaseOffset: 5.0,
      })

      // ── Membrane surface — translucent area behind centre text ──
      drawMembrane(ctx, w, h, t, {
        points: [[0.18, 0.2], [0.55, 0.08], [0.82, 0.25], [0.75, 0.65], [0.4, 0.72], [0.12, 0.5]],
        opacity: 0.5, hue: 'blue', phaseOffset: 1.2,
      })

      // ── Scan arcs — glacial rotation, larger ──
      ctx.save()
      ctx.translate(w * 0.36, h * 0.36)
      for (let i = 0; i < 4; i++) {
        const r = vmin * 0.3 + i * vmin * 0.14
        const rot = t * (0.14 + i * 0.03) * (i % 2 === 0 ? 1 : -1)
        ctx.save()
        ctx.rotate(rot)
        const segs = 3 + i
        const gap = Math.PI * 0.14
        const seg = (Math.PI * 2 - segs * gap) / segs
        ctx.strokeStyle = `rgba(91,164,201,${0.04 - i * 0.006})`
        ctx.lineWidth = 0.7
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

      // ── Ghost echo — distant, behind everything ──
      drawGhost(ctx, w * 0.62, h * 0.55, vmin / 560, t - 0.5)

      // ── Ghost — dominant, imposing, left-of-centre ──
      drawGhost(ctx, w * 0.34, h * 0.26, vmin / 340, t)

      // ── Ring — right side, large ──
      drawRing(ctx, w * 0.76, h * 0.48, vmin * 0.3, t)

      // ── Second ring — upper area, partially off-screen ──
      drawRing(ctx, w * 0.16, h * 0.04, vmin * 0.2, t + 3.0)

      // ── Orbs — larger, fewer feel more deliberate ──
      drawOrb(ctx, w * 0.1, h * 0.2, vmin * 0.12, t, 0)
      drawOrb(ctx, w * 0.56, h * 0.14, vmin * 0.085, t, 2.1)
      drawOrb(ctx, w * 0.85, h * 0.76, vmin * 0.065, t, 4.3)
      drawOrb(ctx, w * 0.04, h * 0.74, vmin * 0.055, t, 5.8)
      drawOrb(ctx, w * 0.93, h * 0.3, vmin * 0.048, t, 7.2)

      // ── Infrastructure lines — soft control network ──
      drawInfrastructureLines(ctx, t, [
        { x: gx, y: gy },
        { x: gx, y: gy + 50 * gs },
        { x: (gx + rx) / 2, y: (gy + ry) / 2, r: 2.5 },
        { x: rx, y: ry },
      ], { opacity: 0.5, hue: 'silver', phaseOffset: 0 })

      drawInfrastructureLines(ctx, t, [
        { x: gx, y: gy - 30 * gs },
        { x: w * 0.1, y: h * 0.2 },
      ], { opacity: 0.3, hue: 'blue', phaseOffset: 2.0 })

      drawInfrastructureLines(ctx, t, [
        { x: rx, y: ry },
        { x: w * 0.85, y: h * 0.76 },
      ], { opacity: 0.25, hue: 'violet', phaseOffset: 4.0 })

      // ── Dissolution zones — where ribbons meet the ghost ──
      drawDissolutionZone(ctx, gx, gy, gs, w * 0.34, h * 0.22, t, 0.5)
      drawDissolutionZone(ctx, gx, gy, gs, w * 0.44, h * 0.45, t, 0.4)
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
