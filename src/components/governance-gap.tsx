'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Governance Gap — unified canvas composition
 *
 *  Upper area  : governance ring (the lens / analytical instrument)
 *  Centre-right: ghost silhouette sinking downward (the examined subject)
 *  Scattered   : memory orbs at depth-zone boundaries
 *
 *  The ghost descends through the three visibility zones — observed at
 *  the surface, partial in the middle, missed deep below — matching
 *  the information architecture of the depth-chamber UI.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── shared path helpers (same as hero) ── */

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

/* ── Glass-wave ribbon — a single flowing translucent ribbon ── */

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

/* ── Sinking ghost — fades and blurs as it descends ── */

function drawSinkingGhost(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  t: number,
  h: number,
) {
  // Glacial vertical float (~140s) and drift (~175s)
  const drift = Math.sin(t * 0.314) * 6 + Math.sin(t * 0.19) * 3
  const floatY = Math.sin(t * 0.42) * 10 + Math.cos(t * 0.25) * 4
  const breathe = 1 + Math.sin(t * 0.628) * 0.008 + Math.sin(t * 0.42) * 0.004 + Math.sin(t * 0.12) * 0.005
  // Asymmetric deformation (~200s, ~280s)
  const deformX = 1 + Math.sin(t * 0.28) * 0.008

  ctx.save()
  ctx.translate(cx + drift, cy + floatY)
  ctx.scale(breathe * deformX, breathe / deformX)

  // Calculate vertical fade — ghost gets more transparent as it goes deeper
  const depthRatio = Math.max(0, Math.min(1, (cy / h)))
  const fadeMultiplier = 1 - depthRatio * 0.5

  // ── Torso — gel material, depth-faded ──
  const f = fadeMultiplier
  ctx.save()
  ctx.translate(0, 50 * s)

  // Subsurface glow
  ctx.save()
  ctx.shadowColor = `rgba(91,164,201,${0.08 * f})`
  ctx.shadowBlur = 28 * s
  drawTorso(ctx, s)
  ctx.strokeStyle = 'rgba(91,164,201,0.005)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()

  // Primary fill
  drawTorso(ctx, s)
  const tg = ctx.createLinearGradient(-15 * s, 0, 15 * s, 192 * s)
  tg.addColorStop(0, `rgba(91,164,201,${0.038 * f})`)
  tg.addColorStop(0.3, `rgba(91,164,201,${0.022 * f})`)
  tg.addColorStop(0.65, `rgba(91,164,201,${0.01 * f})`)
  tg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = tg
  ctx.fill()

  // Rim — surface tension
  drawTorso(ctx, s)
  const teg = ctx.createLinearGradient(0, 0, 0, 192 * s)
  teg.addColorStop(0, `rgba(145,195,225,${0.07 * f})`)
  teg.addColorStop(0.4, `rgba(91,164,201,${0.06 * f})`)
  teg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.strokeStyle = teg
  ctx.lineWidth = 1.0
  ctx.stroke()

  // Frosted inner echo
  drawTorso(ctx, s * 0.88)
  ctx.fillStyle = `rgba(139,126,184,${0.016 * f})`
  ctx.fill()
  ctx.strokeStyle = `rgba(139,126,184,${0.045 * f})`
  ctx.lineWidth = 0.65
  ctx.stroke()

  ctx.restore()

  // ── Head — blown glass, depth-faded ──
  // Glow
  ctx.save()
  ctx.shadowColor = `rgba(91,164,201,${0.1 * f})`
  ctx.shadowBlur = 22 * s
  drawHead(ctx, s)
  ctx.strokeStyle = 'rgba(91,164,201,0.005)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()

  // Primary subsurface
  drawHead(ctx, s)
  const hg = ctx.createRadialGradient(0, -6 * s, 0, 0, 0, 52 * s)
  hg.addColorStop(0, `rgba(91,164,201,${0.04 * f})`)
  hg.addColorStop(0.4, `rgba(91,164,201,${0.024 * f})`)
  hg.addColorStop(0.8, `rgba(91,164,201,${0.01 * f})`)
  hg.addColorStop(1, `rgba(91,164,201,${0.008 * f})`)
  ctx.fillStyle = hg
  ctx.fill()

  // Rim
  drawHead(ctx, s)
  ctx.strokeStyle = `rgba(145,195,225,${0.08 * f})`
  ctx.lineWidth = 1.0
  ctx.stroke()

  // Frosted inner echo
  drawHead(ctx, s * 0.76)
  ctx.fillStyle = `rgba(139,126,184,${0.014 * f})`
  ctx.fill()
  ctx.strokeStyle = `rgba(139,126,184,${0.06 * f})`
  ctx.lineWidth = 0.8
  ctx.stroke()

  // ── Thought traces ──
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + t * 0.3
    const r1 = 8 * s
    const r2 = 26 * s + Math.sin(t * 0.785 + i * 1.3) * 6 * s
    const a2 = angle + 0.6 + Math.sin(t * 0.628 + i) * 0.3
    ctx.beginPath()
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1)
    ctx.quadraticCurveTo(
      Math.cos(angle + 0.3) * r2 * 0.65,
      Math.sin(angle + 0.3) * r2 * 0.65,
      Math.cos(a2) * r2,
      Math.sin(a2) * r2,
    )
    ctx.strokeStyle = `rgba(91,164,201,${(0.03 + Math.sin(t * 0.35 + i) * 0.011) * fadeMultiplier})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // Highlight
  const hlg = ctx.createRadialGradient(-12 * s, -18 * s, 0, -12 * s, -18 * s, 22 * s)
  hlg.addColorStop(0, `rgba(255,255,255,${0.1 * fadeMultiplier})`)
  hlg.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hlg
  ctx.fillRect(-40 * s, -50 * s, 80 * s, 60 * s)

  ctx.restore()
}

/* ── Ring (same as hero) ── */

function drawRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
) {
  ctx.save()
  ctx.translate(cx, cy)

  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.05)'
  ctx.lineWidth = r * 0.1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.045)'
  ctx.lineWidth = r * 0.04
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139,126,184,0.03)'
  ctx.lineWidth = 1
  ctx.stroke()

  const rot = t * 0.05 // ~20min/revolution
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
    ctx.strokeStyle = `rgba(91,164,201,${major ? 0.09 : 0.035})`
    ctx.lineWidth = major ? 1.7 : 0.9
    ctx.stroke()
  }
  ctx.restore()

  ctx.save()
  ctx.rotate(-rot * 0.6)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const inner = r * 0.78 - r * 0.035
    const outer = r * 0.78 - r * 0.005
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
    ctx.strokeStyle = 'rgba(91,164,201,0.06)'
    ctx.lineWidth = 0.7
    ctx.stroke()
  }
  ctx.restore()

  const handA = t * 0.07 // ~15min/revolution
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(Math.cos(handA) * r * 0.7, Math.sin(handA) * r * 0.7)
  const hg = ctx.createLinearGradient(0, 0, Math.cos(handA) * r * 0.7, Math.sin(handA) * r * 0.7)
  hg.addColorStop(0, 'rgba(91,164,201,0.045)')
  hg.addColorStop(1, 'rgba(91,164,201,0.015)')
  ctx.strokeStyle = hg
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, 2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(91,164,201,0.15)'
  ctx.fill()

  ctx.restore()
}

/* ── Orb (simplified, small) ── */

function drawOrb(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
  phase: number,
) {
  ctx.save()
  // Glacial orbital drift (~150s)
  const orbA = t * 0.21 + phase
  ctx.translate(cx + Math.cos(orbA) * r * 0.8 + Math.sin(t * 0.14 + phase) * 2, cy + Math.sin(orbA) * r * 0.55 + Math.cos(t * 0.11 + phase) * 1.5)

  const og = ctx.createRadialGradient(0, 0, r * 0.6, 0, 0, r * 1.2)
  og.addColorStop(0, 'rgba(91,164,201,0.018)')
  og.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = og
  ctx.beginPath()
  ctx.arc(0, 0, r * 1.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  const sg = ctx.createRadialGradient(-r * 0.2, -r * 0.25, 0, 0, 0, r)
  sg.addColorStop(0, 'rgba(91,164,201,0.03)')
  sg.addColorStop(0.5, 'rgba(91,164,201,0.013)')
  sg.addColorStop(1, 'rgba(91,164,201,0.008)')
  ctx.fillStyle = sg
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.05)'
  ctx.lineWidth = 1
  ctx.stroke()

  for (let i = 0; i < 3; i++) {
    const p = (i / 3) * Math.PI * 2 + t * (0.2 + i * 0.03) + phase
    const oA = r * (0.3 + i * 0.06)
    const oB = r * (0.16 + i * 0.04)
    const tilt = i * 0.5 + phase * 0.2
    ctx.beginPath()
    for (let j = 0; j <= 25; j++) {
      const a = p + (j / 25) * Math.PI
      const x = Math.cos(a) * oA
      const y = Math.sin(a) * oB
      const rx = x * Math.cos(tilt) - y * Math.sin(tilt)
      const ry = x * Math.sin(tilt) + y * Math.cos(tilt)
      if (j === 0) ctx.moveTo(rx, ry)
      else ctx.lineTo(rx, ry)
    }
    ctx.strokeStyle = `rgba(139,126,184,${0.022 + Math.sin(t * 0.7 + i + phase) * 0.008})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  const hlg = ctx.createRadialGradient(-r * 0.25, -r * 0.28, 0, -r * 0.25, -r * 0.28, r * 0.45)
  hlg.addColorStop(0, 'rgba(255,255,255,0.11)')
  hlg.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hlg
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/* ━━━ Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface GapItem {
  label: string
  visibility: 'observed' | 'partial' | 'missed'
}

const GAP_ITEMS: GapItem[] = [
  { label: 'System Outputs', visibility: 'observed' },
  { label: 'Model Risk', visibility: 'observed' },
  { label: 'Explainability', visibility: 'observed' },
  { label: 'Transparency', visibility: 'observed' },
  { label: 'Epistemic Conditioning', visibility: 'partial' },
  { label: 'Narrative Identity Effects', visibility: 'partial' },
  { label: 'Memory Outsourcing', visibility: 'missed' },
  { label: 'Cumulative Personalised Drift', visibility: 'missed' },
  { label: 'Democratic Subject Formation', visibility: 'missed' },
  { label: 'Self-Governance Erosion', visibility: 'missed' },
]

const ZONE_META = {
  observed: {
    label: 'Observed',
    sublabel: 'Surface-level — visible, legible, regulated',
    color: 'var(--color-accent)',
    borderOpacity: 0.25,
    descClass: 'text-text-secondary',
  },
  partial: {
    label: 'Partial',
    sublabel: 'Unstable — acknowledged, incompletely governed',
    color: 'var(--color-violet)',
    borderOpacity: 0.18,
    descClass: 'text-text-tertiary',
  },
  missed: {
    label: 'Missed',
    sublabel: 'Embedded — structurally hidden, ungoverned',
    color: 'var(--color-text-ghost)',
    borderOpacity: 0.12,
    descClass: 'text-text-ghost',
  },
} as const

/* ━━━ Canvas Background ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function GapCanvas() {
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

      // ── Glass-wave ribbons — descending spectral infrastructure ──
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.05, y0: 0.05, x1: 1.06, y1: 0.9,
        cp1x: 0.68, cp1y: 0.22, cp2x: 0.78, cp2y: 0.55,
        width: vmin * 0.09, opacity: 0.39, hue: 'blue', phaseOffset: 0, speed: 0.6,
      })
      drawGlassRibbon(ctx, w, h, t, {
        x0: 1.04, y0: 0.15, x1: -0.04, y1: 0.75,
        cp1x: 0.7, cp1y: 0.4, cp2x: 0.3, cp2y: 0.35,
        width: vmin * 0.055, opacity: 0.24, hue: 'silver', phaseOffset: 3.5, speed: 0.5,
      })
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.2, y0: 1.05, x1: 0.85, y1: 0.2,
        cp1x: 0.35, cp1y: 0.65, cp2x: 0.6, cp2y: 0.55,
        width: vmin * 0.035, opacity: 0.21, hue: 'violet', phaseOffset: 6.0, speed: 0.45,
      })
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.64, y0: 0.12, x1: 0.84, y1: 0.55,
        cp1x: 0.86, cp1y: 0.22, cp2x: 0.88, cp2y: 0.42,
        width: vmin * 0.04, opacity: 0.24, hue: 'violet', phaseOffset: 8.5, speed: 0.45,
      })
      drawMembrane(ctx, w, h, t, {
        points: [[0.1, 0.15], [0.55, 0.05], [0.9, 0.25], [0.85, 0.65], [0.5, 0.8], [0.08, 0.5]],
        opacity: 0.21, hue: 'blue', phaseOffset: 1.5,
      })
      drawMembrane(ctx, w, h, t, {
        points: ghostShellPoints(0.74, 0.35, 1.6),
        opacity: 0.12, hue: 'silver', phaseOffset: 5.0,
      })

      // ── Primary ring — upper-left, the analytical lens ──
      const ringR = vmin * 0.26
      drawRing(
        ctx,
        w * 0.14 + Math.sin(t * 0.42) * 4 + Math.sin(t * 0.19) * 2,
        h * 0.1 + Math.cos(t * 0.30) * 3 + Math.cos(t * 0.15) * 1.5,
        ringR,
        t,
      )

      // ── Sinking ghost — right side, descending, larger ──
      const ghostScale = vmin / 360
      drawSinkingGhost(ctx, w * 0.74, h * 0.3, ghostScale, t, h)

      // ── Orbs at depth-zone boundaries — 3 total ──
      drawOrb(ctx, w * 0.9, h * 0.22, vmin * 0.068, t, 0)
      drawOrb(ctx, w * 0.72, h * 0.58, vmin * 0.052, t, 2.5)
      drawOrb(ctx, w * 0.06, h * 0.48, vmin * 0.057, t, 5.2)

      drawInfrastructureLines(ctx, t, [
        { x: w * 0.14, y: h * 0.1 },
        { x: w * 0.74, y: h * 0.3 },
        { x: w * 0.9, y: h * 0.22 },
        { x: w * 0.72, y: h * 0.58 },
      ], { opacity: 0.22, hue: 'silver', phaseOffset: 0 })

      drawDissolutionZone(ctx, w * 0.74, h * 0.3, vmin / 360, w * 0.78, h * 0.35, t, 0.22)
    }

    resize()
    window.addEventListener('resize', resize)
    let id: number
    const loop = () => { draw(); id = requestAnimationFrame(loop) }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

/* ━━━ Main Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function GovernanceGap() {
  return (
    <section id="gap" className="relative py-28 md:py-40 bg-base overflow-hidden">
      <GapCanvas />

      <div className="relative z-10 max-w-[1040px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>The Governance Gap</SectionLabel>
          <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[600px] mb-6">
            What current frameworks see —{' '}
            <span className="text-text-tertiary">
              and what remains structurally invisible
            </span>
          </h2>
          <p className="font-sans text-[0.92rem] leading-[1.8] text-text-tertiary font-light max-w-[560px] mb-20">
            Governance operates at the surface. The deeper the effect is embedded
            in the subject, the less visible it becomes to existing frameworks.
          </p>
        </Reveal>

        <DepthChamber />
      </div>
    </section>
  )
}

/* ━━━ Depth Chamber ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function DepthChamber() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const zones: Array<'observed' | 'partial' | 'missed'> = ['observed', 'partial', 'missed']

  return (
    <div ref={ref} className="relative">
      {zones.map((zone, zoneIndex) => {
        const meta = ZONE_META[zone]
        const items = GAP_ITEMS.filter((i) => i.visibility === zone)
        const insetPx = zoneIndex * 24

        return (
          <motion.div
            key={zone}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: zoneIndex * 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative mb-4 last:mb-0"
            style={{ marginLeft: insetPx, marginRight: insetPx }}
          >
            <div
              className="rounded-xl px-6 md:px-10 py-8 md:py-10"
              style={{
                border: `1px solid rgba(${zone === 'observed' ? '91,164,201' : zone === 'partial' ? '139,126,184' : '168,179,196'},${meta.borderOpacity})`,
                background: zone === 'missed'
                  ? 'rgba(234,239,245,0.25)'
                  : zone === 'partial'
                    ? 'rgba(243,245,249,0.2)'
                    : 'rgba(255,255,255,0.4)',
                backdropFilter: zone === 'missed' ? 'blur(8px)' : zone === 'partial' ? 'blur(4px)' : 'none',
                boxShadow: zone === 'missed'
                  ? 'inset 0 2px 20px rgba(168,179,196,0.06)'
                  : zone === 'partial'
                    ? 'inset 0 1px 12px rgba(139,126,184,0.03)'
                    : '0 1px 3px rgba(91,164,201,0.04)',
              }}
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span
                  className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </span>
                <span className={`font-sans text-[12px] font-light ${meta.descClass}`}>
                  {meta.sublabel}
                </span>
              </div>

              <div className={`flex flex-wrap gap-3 ${zone === 'missed' ? 'gap-y-4' : ''}`}>
                {items.map((item, i) => (
                  <GapChip
                    key={item.label}
                    item={item}
                    zone={zone}
                    inView={inView}
                    delay={zoneIndex * 0.2 + i * 0.06 + 0.3}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}

      <div className="absolute -left-2 md:left-0 top-4 bottom-4 flex flex-col items-center pointer-events-none">
        <div className="w-px flex-1 bg-gradient-to-b from-accent/20 via-violet/15 to-text-ghost/10" />
        <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-text-ghost mt-2 [writing-mode:vertical-lr] rotate-180">
          Depth
        </span>
      </div>
    </div>
  )
}

/* ━━━ Gap Chip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function GapChip({
  item,
  zone,
  inView,
  delay,
}: {
  item: GapItem
  zone: 'observed' | 'partial' | 'missed'
  inView: boolean
  delay: number
}) {
  const meta = ZONE_META[zone]
  const chipStyles: Record<string, string> = {
    observed: 'bg-base border-accent/20 text-text-primary',
    partial: 'bg-surface border-violet/15 text-text-secondary',
    missed: 'bg-surface-deep/60 border-text-ghost/10 text-text-tertiary',
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: zone === 'missed' ? 0.5 : zone === 'partial' ? 0.72 : 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-sans text-[0.82rem] md:text-[0.85rem] font-light ${chipStyles[zone]}`}
      style={{ filter: zone === 'missed' ? 'blur(0.3px)' : 'none' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          backgroundColor: meta.color,
          opacity: zone === 'missed' ? 0.3 : zone === 'partial' ? 0.5 : 0.7,
          animation: zone === 'partial' ? 'pulse-glow 4s ease-in-out infinite' : 'none',
        }}
      />
      {item.label}
    </motion.span>
  )
}
