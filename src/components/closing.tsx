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

  // ── Luminous fog interior — soft trapped light ──
  ctx.save()
  ctx.shadowColor = `rgba(${c.r},${0.1 * op})`
  ctx.shadowBlur = rw * 1.2
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey)
  ctx.strokeStyle = `rgba(${c.r},${0.005 * op})`
  ctx.lineWidth = rw * 0.7
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.restore()

  // ── Liquid crystal body — prismatic colour shift along the flow ──
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey)
  const grad = ctx.createLinearGradient(sx, sy, ex, ey)
  grad.addColorStop(0, `rgba(${c.r},0)`)
  grad.addColorStop(0.1, `rgba(${c.h},${0.03 * op})`)
  grad.addColorStop(0.3, `rgba(${c.r},${0.05 * op})`)
  grad.addColorStop(0.5, `rgba(${c.g},${0.055 * op})`)
  grad.addColorStop(0.7, `rgba(${c.r},${0.04 * op})`)
  grad.addColorStop(0.9, `rgba(${c.h},${0.025 * op})`)
  grad.addColorStop(1, `rgba(${c.r},0)`)
  ctx.strokeStyle = grad
  ctx.lineWidth = rw
  ctx.lineCap = 'round'
  ctx.stroke()

  // ── Chrome rim edges — thin, bright, tensile ──
  for (const offset of [-1, 1]) {
    const nx1 = cx1 + offset * rw * 0.38
    const ny1 = cy1 + offset * rw * 0.12
    const nx2 = cx2 + offset * rw * 0.28
    const ny2 = cy2 - offset * rw * 0.18

    ctx.beginPath()
    ctx.moveTo(sx + offset * rw * 0.22, sy)
    ctx.bezierCurveTo(nx1, ny1, nx2, ny2, ex + offset * rw * 0.18, ey)
    const rimGrad = ctx.createLinearGradient(sx, sy, ex, ey)
    rimGrad.addColorStop(0, 'rgba(255,255,255,0)')
    rimGrad.addColorStop(0.15, `rgba(255,255,255,${0.06 * op})`)
    rimGrad.addColorStop(0.35, `rgba(${c.h},${0.14 * op})`)
    rimGrad.addColorStop(0.5, `rgba(255,255,255,${0.1 * op})`)
    rimGrad.addColorStop(0.65, `rgba(${c.h},${0.12 * op})`)
    rimGrad.addColorStop(0.85, `rgba(255,255,255,${0.05 * op})`)
    rimGrad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.strokeStyle = rimGrad
    ctx.lineWidth = 0.45
    ctx.stroke()
  }

  // ── Specular highlight line — white chrome spine ──
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey)
  const specGrad = ctx.createLinearGradient(sx, sy, ex, ey)
  specGrad.addColorStop(0, 'rgba(255,255,255,0)')
  specGrad.addColorStop(0.2, `rgba(255,255,255,${0.04 * op})`)
  specGrad.addColorStop(0.4, `rgba(255,255,255,${0.09 * op})`)
  specGrad.addColorStop(0.5, `rgba(255,255,255,${0.12 * op})`)
  specGrad.addColorStop(0.6, `rgba(255,255,255,${0.08 * op})`)
  specGrad.addColorStop(0.8, `rgba(255,255,255,${0.03 * op})`)
  specGrad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.strokeStyle = specGrad
  ctx.lineWidth = 0.3
  ctx.stroke()

  // ── Concentrated specular — polished resin refraction point ──
  const midX = (cx1 + cx2) / 2
  const midY = (cy1 + cy2) / 2
  const hlR = rw * 0.5
  const hl = ctx.createRadialGradient(midX, midY, 0, midX, midY, hlR)
  hl.addColorStop(0, `rgba(255,255,255,${0.1 * op})`)
  hl.addColorStop(0.25, `rgba(255,255,255,${0.04 * op})`)
  hl.addColorStop(0.6, `rgba(${c.h},${0.015 * op})`)
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

  // Chrome rim — thin, bright, tensile edge
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
  ctx.strokeStyle = `rgba(255,255,255,${0.07 * op})`
  ctx.lineWidth = 0.4
  ctx.stroke()

  // Tension lines — structural threads across the membrane surface
  for (let i = 0; i < pts.length; i++) {
    const opp = (i + Math.floor(pts.length / 2)) % pts.length
    ctx.beginPath()
    ctx.moveTo(pts[i].x, pts[i].y)
    ctx.quadraticCurveTo(cx + Math.sin(t * 0.15 + i) * 4, cy + Math.cos(t * 0.12 + i) * 3, pts[opp].x, pts[opp].y)
    ctx.strokeStyle = `rgba(${c.h},${0.03 * op})`
    ctx.lineWidth = 0.25
    ctx.stroke()
  }

  // Concentrated specular — polished surface refraction
  const hl = ctx.createRadialGradient(cx - gr * 0.12, cy - gr * 0.15, 0, cx, cy, gr * 0.35)
  hl.addColorStop(0, `rgba(255,255,255,${0.07 * op})`)
  hl.addColorStop(0.3, `rgba(255,255,255,${0.025 * op})`)
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.beginPath()
  ctx.arc(cx - gr * 0.08, cy - gr * 0.1, gr * 0.3, 0, Math.PI * 2)
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
      const t = Date.now() * 0.00005
      const vmin = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      // ── Glass-wave ribbons — distant, fading, the structures that persist ──
      drawGlassRibbon(ctx, w, h, t, {
        x0: -0.08, y0: 0.3, x1: 1.08, y1: 0.6,
        cp1x: 0.45, cp1y: 0.30, cp2x: 0.55, cp2y: 0.50,
        width: vmin * 0.08, opacity: 0.325, hue: 'silver', phaseOffset: 0, speed: 0.4,
      })
      drawGlassRibbon(ctx, w, h, t, {
        x0: 1.05, y0: 0.15, x1: -0.05, y1: 0.7,
        cp1x: 0.65, cp1y: 0.45, cp2x: 0.35, cp2y: 0.35,
        width: vmin * 0.05, opacity: 0.228, hue: 'blue', phaseOffset: 4.0, speed: 0.35,
      })
      drawGlassRibbon(ctx, w, h, t, {
        x0: 0.38, y0: 0.2, x1: 0.62, y1: 0.65,
        cp1x: 0.62, cp1y: 0.28, cp2x: 0.64, cp2y: 0.52,
        width: vmin * 0.035, opacity: 0.195, hue: 'violet', phaseOffset: 9.5, speed: 0.35,
      })
      drawMembrane(ctx, w, h, t, {
        points: [[0.2, 0.2], [0.6, 0.12], [0.85, 0.35], [0.78, 0.65], [0.4, 0.72], [0.15, 0.48]],
        opacity: 0.163, hue: 'silver', phaseOffset: 2.5,
      })
      drawMembrane(ctx, w, h, t, {
        points: ghostShellPoints(0.5, 0.42, 1.4),
        opacity: 0.098, hue: 'silver', phaseOffset: 6.0,
      })

      // ── Large governance ring — centre, the structure that persists ──
      const ringR = vmin * 0.34
      const ringCx = w * 0.5 + Math.sin(t * 0.74) * 4
      const ringCy = h * 0.46 + Math.cos(t * 0.62) * 4
      ctx.save()
      ctx.translate(ringCx, ringCy)
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.1)'; ctx.shadowBlur = 14
      ctx.beginPath(); ctx.arc(0, 0, ringR, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.035)'; ctx.lineWidth = ringR * 0.035; ctx.stroke(); ctx.restore()
      ctx.beginPath(); ctx.arc(0, 0, ringR * 0.76, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,164,201,0.03)'; ctx.lineWidth = ringR * 0.02; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, ringR * 0.54, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(139,126,184,0.02)'; ctx.lineWidth = 0.5; ctx.stroke()
      // Markers
      ctx.save(); ctx.rotate(t * 0.03)
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2; const major = i % 6 === 0
        const len = major ? ringR * 0.06 : ringR * 0.025
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * (ringR - ringR * 0.035 - len), Math.sin(a) * (ringR - ringR * 0.035 - len))
        ctx.lineTo(Math.cos(a) * (ringR - ringR * 0.035), Math.sin(a) * (ringR - ringR * 0.035))
        ctx.strokeStyle = `rgba(255,255,255,${major ? 0.05 : 0.015})`; ctx.lineWidth = major ? 1.3 : 0.52
        ctx.lineCap = 'round'; ctx.stroke()
      }
      ctx.restore()
      const ha = t * 0.05; ctx.beginPath(); ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(ha) * ringR * 0.6, Math.sin(ha) * ringR * 0.6)
      ctx.strokeStyle = 'rgba(91,164,201,0.05)'; ctx.lineWidth = 0.6; ctx.stroke()
      ctx.restore()

      // ── Primary ghost — small, centred, distant ──
      const s = vmin / 420
      const gcx = w * 0.5 + Math.sin(t * 0.25) * 4
      const gcy = h * 0.4 + Math.sin(t * 0.33) * 5
      const breathe = 1 + Math.sin(t * 1.57) * 0.007
      ctx.save()
      ctx.translate(gcx, gcy)
      ctx.scale(breathe, breathe)
      // Glow
      ctx.save(); ctx.shadowColor = 'rgba(91,164,201,0.084)'; ctx.shadowBlur = 30 * s
      headPath(ctx, s); ctx.strokeStyle = 'rgba(91,164,201,0.0024)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore()
      // Torso
      ctx.save(); ctx.translate(0, 40 * s)
      torsoPath(ctx, s)
      const tg = ctx.createLinearGradient(-10 * s, 0, 10 * s, 192 * s)
      tg.addColorStop(0, 'rgba(91,164,201,0.029)'); tg.addColorStop(0.4, 'rgba(91,164,201,0.014)')
      tg.addColorStop(1, 'rgba(91,164,201,0)'); ctx.fillStyle = tg; ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 0.6; ctx.stroke()
      torsoPath(ctx, s * 0.86)
      ctx.fillStyle = 'rgba(139,126,184,0.006)'; ctx.fill()
      ctx.strokeStyle = 'rgba(139,126,184,0.017)'; ctx.lineWidth = 0.52; ctx.stroke()
      ctx.restore()
      // Head
      headPath(ctx, s)
      const hg = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 52 * s)
      hg.addColorStop(0, 'rgba(91,164,201,0.036)'); hg.addColorStop(0.5, 'rgba(91,164,201,0.016)')
      hg.addColorStop(1, 'rgba(91,164,201,0.003)'); ctx.fillStyle = hg; ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5; ctx.stroke()
      headPath(ctx, s * 0.68); ctx.fillStyle = 'rgba(139,126,184,0.005)'; ctx.fill()
      ctx.strokeStyle = 'rgba(139,126,184,0.021)'; ctx.lineWidth = 0.52; ctx.stroke()
      ctx.restore()

      // ── Orbs — 3, faint, at edges ──
      for (const orb of [
        { x: 0.12, y: 0.3, r: 0.08, ph: 0 },
        { x: 0.88, y: 0.65, r: 0.065, ph: 2.3 },
      ]) {
        const or = vmin * orb.r
        const oa = t * (0.16 + orb.ph * 0.006) + orb.ph
        ctx.save()
        ctx.translate(w * orb.x + Math.cos(oa) * or * 0.5, h * orb.y + Math.sin(oa) * or * 0.4)
        ctx.beginPath(); ctx.arc(0, 0, or, 0, Math.PI * 2)
        const og = ctx.createRadialGradient(-or * 0.2, -or * 0.22, 0, 0, 0, or)
        og.addColorStop(0, 'rgba(91,164,201,0.043)'); og.addColorStop(0.5, 'rgba(91,164,201,0.017)')
        og.addColorStop(1, 'rgba(91,164,201,0.003)'); ctx.fillStyle = og; ctx.fill()
        ctx.strokeStyle = 'rgba(145,195,225,0.068)'; ctx.lineWidth = 0.78; ctx.stroke()
        ctx.beginPath(); ctx.arc(0, 0, or * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(139,126,184,0.026)'; ctx.lineWidth = 0.39; ctx.stroke()
        ctx.restore()
      }

      drawInfrastructureLines(ctx, t, [
        { x: w * 0.5, y: h * 0.4 },
        { x: ringCx, y: ringCy },
        { x: w * 0.12, y: h * 0.3 },
      ], { opacity: 0.12, hue: 'silver', phaseOffset: 0 })

      drawDissolutionZone(ctx, w * 0.5, h * 0.4, vmin / 420, w * 0.52, h * 0.38, t, 0.15)
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
