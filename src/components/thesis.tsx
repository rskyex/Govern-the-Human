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
      og.addColorStop(0, 'rgba(91,164,201,0.035)'); og.addColorStop(0.4, 'rgba(91,164,201,0.015)')
      og.addColorStop(1, 'rgba(91,164,201,0.003)'); ctx.fillStyle = og; ctx.fill()
      ctx.strokeStyle = 'rgba(145,195,225,0.055)'; ctx.lineWidth = 0.8; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(139,126,184,0.01)'; ctx.fill()
      ctx.strokeStyle = 'rgba(139,126,184,0.035)'; ctx.lineWidth = 0.4; ctx.stroke()
      ctx.restore()
    }

    function drawRingCompact(cx: number, cy: number, r: number, t: number) {
      if (!ctx) return
      ctx.save(); ctx.translate(cx, cy)
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.07)'; ctx.shadowBlur = 12
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.045)'; ctx.lineWidth = r * 0.08; ctx.stroke(); ctx.restore()
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
        ctx.strokeStyle = `rgba(91,164,201,${major ? 0.1 : 0.03})`; ctx.lineWidth = major ? 1.2 : 0.5
        ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore()
      const ha = t * 0.065; ctx.beginPath(); ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(ha) * r * 0.65, Math.sin(ha) * r * 0.65)
      ctx.strokeStyle = 'rgba(91,164,201,0.04)'; ctx.lineWidth = 0.8; ctx.lineCap = 'round'; ctx.stroke()
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
      ctx.save(); ctx.shadowColor = `rgba(91,164,201,${0.1 * opacity})`; ctx.shadowBlur = 24 * s
      drawCranialProfile(ctx, s); ctx.strokeStyle = 'rgba(91,164,201,0.005)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore()
      // Fill
      drawCranialProfile(ctx, s)
      const fg = ctx.createRadialGradient(10 * s, -20 * s, 0, 0, 0, 95 * s)
      fg.addColorStop(0, `rgba(91,164,201,${0.04 * opacity})`); fg.addColorStop(0.35, `rgba(91,164,201,${0.022 * opacity})`)
      fg.addColorStop(0.7, `rgba(91,164,201,${0.008 * opacity})`); fg.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = fg; ctx.fill()
      // Secondary subsurface
      drawCranialProfile(ctx, s * 0.9)
      const fg2 = ctx.createRadialGradient(-15 * s, 10 * s, 0, 0, 0, 70 * s)
      fg2.addColorStop(0, `rgba(130,160,210,${0.025 * opacity})`); fg2.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = fg2; ctx.fill()
      // Rim
      drawCranialProfile(ctx, s)
      ctx.strokeStyle = `rgba(145,195,225,${0.09 * opacity})`; ctx.lineWidth = 1.1; ctx.stroke()
      drawCranialProfile(ctx, s * 0.97)
      ctx.strokeStyle = `rgba(180,215,235,${0.03 * opacity})`; ctx.lineWidth = 0.5; ctx.stroke()
      // Frosted inner shells
      const shells = [0.8, 0.6, 0.42]
      shells.forEach((sc, i) => {
        const lag = Math.sin(t * 0.33 - 0.1 * (i + 1)) * 1.5
        ctx.save(); ctx.translate(lag, Math.cos(t * 0.42 - 0.08 * (i + 1)) * 1)
        drawCranialProfile(ctx, s * sc)
        ctx.fillStyle = `rgba(139,126,184,${[0.01, 0.005, 0.002][i] * opacity})`; ctx.fill()
        ctx.strokeStyle = `rgba(139,126,184,${[0.035, 0.02, 0.012][i] * opacity})`
        ctx.lineWidth = 0.55 - i * 0.1; ctx.stroke(); ctx.restore()
      })
      // Caustics
      ctx.save(); drawCranialProfile(ctx, s); ctx.clip()
      const hl = ctx.createRadialGradient(-10 * s, -40 * s, 0, -10 * s, -40 * s, 30 * s)
      hl.addColorStop(0, `rgba(255,255,255,${0.07 * opacity})`); hl.addColorStop(0.3, `rgba(255,255,255,${0.05 * opacity})`)
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

      // ── Glass-wave ribbons — flowing through the contemplative space ──

      // Primary blue ribbon: sweeps from left across to right, large
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.06, y0: 0.35, x1: 1.08, y1: 0.55,
        cp1x: 0.72, cp1y: 0.30, cp2x: 0.82, cp2y: 0.58,
        width: vmin * 0.09, opacity: 0.5, hue: 'blue', phaseOffset: 0, speed: 0.7,
      })

      // Silver ribbon: counter-flow from right side
      drawGlassRibbon(ctx, w, h, t, {
        x0: 1.05, y0: 0.2, x1: 0.1, y1: 0.8,
        cp1x: 0.70, cp1y: 0.50, cp2x: 0.35, cp2y: 0.45,
        width: vmin * 0.06, opacity: 0.3, hue: 'silver', phaseOffset: 3.0, speed: 0.6,
      })

      // Mint thread: thin, across lower area
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.2, y0: 0.9, x1: 0.85, y1: 0.6,
        cp1x: 0.4, cp1y: 0.7, cp2x: 0.65, cp2y: 0.8,
        width: vmin * 0.035, opacity: 0.25, hue: 'mint', phaseOffset: 6.0, speed: 0.5,
      })

      // Body-wrapping ribbon around the cranial head
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.68, y0: 0.28, x1: 0.88, y1: 0.68,
        cp1x: 0.90, cp1y: 0.38, cp2x: 0.92, cp2y: 0.56,
        width: vmin * 0.035, opacity: 0.25, hue: 'violet', phaseOffset: 9.0, speed: 0.45,
      })

      // ── Membrane — translucent area behind the text region ──
      drawMembrane(ctx, w, h, t, {
        points: [[0.1, 0.3], [0.5, 0.15], [0.85, 0.35], [0.75, 0.7], [0.35, 0.75], [0.05, 0.55]],
        opacity: 0.25, hue: 'blue', phaseOffset: 2.0,
      })

      // ── Identity-shell membrane ──
      drawMembrane(ctx, w, h, t, {
        points: ghostShellPoints(0.78, 0.48, 1.5),
        opacity: 0.12, hue: 'silver', phaseOffset: 5.5,
      })

      // ── Primary cranial profile — right side, large ──
      drawCranialHead(w * 0.78, h * 0.48, vmin / 170, t, 1)

      // ── Governance ring — left-centre, large, partially behind text ──
      drawRingCompact(
        w * 0.28 + Math.sin(t * 0.74) * 3,
        h * 0.68 + Math.cos(t * 0.62) * 2,
        vmin * 0.28, t,
      )

      // ── Orbs — 2, scattered at different scales ──
      drawOrb(w * 0.06, h * 0.28, vmin * 0.1, t, 0)
      drawOrb(w * 0.42, h * 0.15, vmin * 0.07, t, 1.8)

      // ── Infrastructure lines — soft control network ──
      drawInfrastructureLines(ctx, t, [
        { x: w * 0.15, y: h * 0.38 },
        { x: w * 0.28 + Math.sin(t * 0.74) * 3, y: h * 0.68 + Math.cos(t * 0.62) * 2 },
        { x: w * 0.78, y: h * 0.48 },
      ], { opacity: 0.2, hue: 'silver', phaseOffset: 0 })

      drawInfrastructureLines(ctx, t, [
        { x: w * 0.78, y: h * 0.48 },
        { x: w * 0.92, y: h * 0.72 },
      ], { opacity: 0.15, hue: 'blue', phaseOffset: 2.5 })

      // ── Dissolution zone ──
      drawDissolutionZone(ctx, w * 0.78, h * 0.48, vmin / 170, w * 0.82, h * 0.40, t, 0.2)
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
