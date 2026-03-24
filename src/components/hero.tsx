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

/* ── ghost silhouette ── */

function drawGhost(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  t: number,
) {
  // ── Motion: very slow, layered, barely perceptible ──
  // Dominant vertical float: ~55s cycle
  const floatY = Math.sin(t * 1.14) * 8 + Math.sin(t * 0.67) * 3
  // Gentle horizontal drift: ~70s cycle
  const driftX = Math.sin(t * 0.9) * 3 + Math.sin(t * 0.53) * 1.5
  // Breathing: ~30s cycle, barely visible
  const breathe = 1 + Math.sin(t * 2.09) * 0.004 + Math.sin(t * 1.37) * 0.002
  // Subtle non-uniform deformation: body shifts shape (~80s, ~110s)
  const deformX = 1 + Math.sin(t * 0.785) * 0.003
  const deformY = 1 + Math.cos(t * 0.571) * 0.004
  // Very slight head tilt: ~100s
  const headTilt = Math.sin(t * 0.628) * 0.012

  // Inner echo lag — echoes trail the outer form by a time offset
  const lagDriftX = Math.sin(t * 0.9 - 0.15) * 3 + Math.sin(t * 0.53 - 0.1) * 1.5
  const lagFloatY = Math.sin(t * 1.14 - 0.12) * 8 + Math.sin(t * 0.67 - 0.08) * 3
  const echoOffsetX = (driftX - lagDriftX) * 0.6
  const echoOffsetY = (floatY - lagFloatY) * 0.6

  ctx.save()
  ctx.translate(cx + driftX, cy + floatY)
  ctx.scale(breathe * deformX, breathe * deformY)

  // ── Torso — translucent gel / blown glass material ──
  ctx.save()
  ctx.translate(0, 50 * s)

  // Subsurface glow — soft light diffusing through the volume
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.14)'
  ctx.shadowBlur = 22 * s
  torsoPath(ctx, s)
  ctx.strokeStyle = 'rgba(91,164,201,0.008)'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  // Layered subsurface fill — two offset gradients for depth
  torsoPath(ctx, s)
  const tg = ctx.createLinearGradient(-20 * s, 0, 20 * s, 192 * s)
  tg.addColorStop(0, 'rgba(91,164,201,0.055)')
  tg.addColorStop(0.25, 'rgba(91,164,201,0.038)')
  tg.addColorStop(0.6, 'rgba(91,164,201,0.015)')
  tg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = tg
  ctx.fill()

  // Second subsurface layer — warmer, offset centre
  torsoPath(ctx, s * 0.94)
  const tg2 = ctx.createRadialGradient(8 * s, 40 * s, 0, 0, 60 * s, 90 * s)
  tg2.addColorStop(0, 'rgba(120,170,210,0.02)')
  tg2.addColorStop(0.5, 'rgba(91,164,201,0.008)')
  tg2.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = tg2
  ctx.fill()

  // Rim edge — bright at shoulders, fading at waist (surface tension)
  torsoPath(ctx, s)
  const eg = ctx.createLinearGradient(0, 0, 0, 192 * s)
  eg.addColorStop(0, 'rgba(145,195,225,0.12)')
  eg.addColorStop(0.3, 'rgba(91,164,201,0.07)')
  eg.addColorStop(0.6, 'rgba(91,164,201,0.025)')
  eg.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.strokeStyle = eg
  ctx.lineWidth = 1.3
  ctx.stroke()

  // Inner tension line — thinner, brighter, just inside the rim
  torsoPath(ctx, s * 0.97)
  const itl = ctx.createLinearGradient(0, 0, 0, 186 * s)
  itl.addColorStop(0, 'rgba(180,215,235,0.06)')
  itl.addColorStop(0.4, 'rgba(145,195,225,0.025)')
  itl.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.strokeStyle = itl
  ctx.lineWidth = 0.4
  ctx.stroke()

  // Frosted inner echo — filled, not just stroked
  ctx.save()
  ctx.translate(echoOffsetX * 0.7, echoOffsetY * 0.7)
  torsoPath(ctx, s * 0.86)
  const ifg = ctx.createLinearGradient(0, 0, 0, 165 * s)
  ifg.addColorStop(0, 'rgba(139,126,184,0.018)')
  ifg.addColorStop(0.5, 'rgba(139,126,184,0.008)')
  ifg.addColorStop(1, 'rgba(139,126,184,0)')
  ctx.fillStyle = ifg
  ctx.fill()
  ctx.strokeStyle = 'rgba(139,126,184,0.035)'
  ctx.lineWidth = 0.6
  ctx.stroke()
  ctx.restore()

  ctx.restore()

  // ── Head — blown glass with subsurface scattering ──

  ctx.save()
  ctx.rotate(headTilt)

  // Outer glow halo
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.16)'
  ctx.shadowBlur = 28 * s
  headPath(ctx, s)
  ctx.strokeStyle = 'rgba(91,164,201,0.006)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()

  // Primary subsurface fill — radial, bright core
  headPath(ctx, s)
  const hg = ctx.createRadialGradient(0, -8 * s, 0, 0, -2 * s, 56 * s)
  hg.addColorStop(0, 'rgba(91,164,201,0.065)')
  hg.addColorStop(0.3, 'rgba(91,164,201,0.04)')
  hg.addColorStop(0.65, 'rgba(91,164,201,0.018)')
  hg.addColorStop(1, 'rgba(91,164,201,0.005)')
  ctx.fillStyle = hg
  ctx.fill()

  // Secondary subsurface — offset, warmer, creates colour shift
  headPath(ctx, s * 0.92)
  const hg2 = ctx.createRadialGradient(12 * s, 8 * s, 0, 5 * s, 0, 42 * s)
  hg2.addColorStop(0, 'rgba(130,160,210,0.025)')
  hg2.addColorStop(0.5, 'rgba(120,145,200,0.01)')
  hg2.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = hg2
  ctx.fill()

  // Rim edge — bright, taut (surface tension of liquid glass)
  headPath(ctx, s)
  ctx.strokeStyle = 'rgba(145,195,225,0.14)'
  ctx.lineWidth = 1.4
  ctx.stroke()

  // Inner tension line
  headPath(ctx, s * 0.97)
  ctx.strokeStyle = 'rgba(180,215,235,0.05)'
  ctx.lineWidth = 0.35
  ctx.stroke()

  // Frosted inner echo 1 — filled membrane
  ctx.save()
  ctx.translate(echoOffsetX, echoOffsetY)
  headPath(ctx, s * 0.76)
  const ie1 = ctx.createRadialGradient(0, -4 * s, 0, 0, 0, 42 * s)
  ie1.addColorStop(0, 'rgba(139,126,184,0.02)')
  ie1.addColorStop(1, 'rgba(139,126,184,0.005)')
  ctx.fillStyle = ie1
  ctx.fill()
  ctx.strokeStyle = 'rgba(139,126,184,0.055)'
  ctx.lineWidth = 0.7
  ctx.stroke()
  ctx.restore()

  // Frosted inner echo 2 — deeper, dimmer
  ctx.save()
  ctx.translate(echoOffsetX * 1.5, echoOffsetY * 1.5)
  headPath(ctx, s * 0.52)
  ctx.fillStyle = 'rgba(91,164,201,0.008)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(91,164,201,0.022)'
  ctx.lineWidth = 0.4
  ctx.stroke()
  ctx.restore()

  // Primary caustic highlight (clipped) — upper left
  ctx.save()
  headPath(ctx, s)
  ctx.clip()
  const hl = ctx.createRadialGradient(-14 * s, -24 * s, 0, -14 * s, -24 * s, 28 * s)
  hl.addColorStop(0, 'rgba(255,255,255,0.14)')
  hl.addColorStop(0.3, 'rgba(255,255,255,0.05)')
  hl.addColorStop(0.7, 'rgba(255,255,255,0.01)')
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.fillRect(-50 * s, -55 * s, 100 * s, 80 * s)
  // Secondary caustic — lower right (refraction)
  const hl2 = ctx.createRadialGradient(18 * s, 20 * s, 0, 18 * s, 20 * s, 16 * s)
  hl2.addColorStop(0, 'rgba(255,255,255,0.04)')
  hl2.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl2
  ctx.fillRect(0, 5 * s, 40 * s, 35 * s)
  ctx.restore()

  ctx.restore() // end head tilt

  // ── Thought-stream traces — slow rotation, varied weight ──
  for (let i = 0; i < 7; i++) {
    // Very slow rotation: ~90s per revolution
    const angle = (i / 7) * Math.PI * 2 + t * 0.35
    const r1 = 7 * s
    // Reach oscillates slowly (~40s)
    const r2 = (24 + i * 2.5) * s + Math.sin(t * 0.785 + i * 1.6) * 7 * s
    const a2 = angle + 0.65 + Math.sin(t * 0.628 + i) * 0.3
    const weight = 0.35 + (i % 3) * 0.15
    // Opacity pulses slowly (~35s, phase-offset per trace)
    const op = 0.032 + Math.sin(t * 0.9 + i * 0.9) * 0.014

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
  // ── Motion: suspended instrument, barely drifting ──
  // Slow drift: ~60s / ~90s cycles
  const driftX = Math.sin(t * 1.05) * 4 + Math.sin(t * 0.44) * 2
  const driftY = Math.cos(t * 0.82) * 3 + Math.cos(t * 0.37) * 1.5
  // Subtle tilt — circle becomes barely oval (~90s)
  const tiltX = 1 + Math.sin(t * 0.698) * 0.015
  // Slow pulse: ~40s
  const pulse = 1 + Math.sin(t * 1.57) * 0.003

  ctx.save()
  ctx.translate(cx + driftX, cy + driftY)
  ctx.scale(tiltX * pulse, (1 / tiltX) * pulse) // tilt preserves area

  // ── Disc body — frosted glass fill ──
  ctx.beginPath()
  ctx.arc(0, 0, r * 1.02, 0, Math.PI * 2)
  const df = ctx.createRadialGradient(-r * 0.15, -r * 0.15, 0, 0, 0, r * 1.02)
  df.addColorStop(0, 'rgba(91,164,201,0.016)')
  df.addColorStop(0.4, 'rgba(91,164,201,0.008)')
  df.addColorStop(0.8, 'rgba(91,164,201,0.003)')
  df.addColorStop(1, 'rgba(91,164,201,0)')
  ctx.fillStyle = df
  ctx.fill()

  // ── Outer band — frosted glass tubing with glow ──
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.1)'
  ctx.shadowBlur = 16
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.055)'
  ctx.lineWidth = r * 0.1
  ctx.stroke()
  ctx.restore()
  // Inner rim of outer band — surface tension
  ctx.beginPath()
  ctx.arc(0, 0, r - r * 0.05, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(145,195,225,0.04)'
  ctx.lineWidth = 0.4
  ctx.stroke()
  // Outer rim of outer band
  ctx.beginPath()
  ctx.arc(0, 0, r + r * 0.05, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(145,195,225,0.03)'
  ctx.lineWidth = 0.3
  ctx.stroke()

  // Middle band — frosted
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.03)'
  ctx.lineWidth = r * 0.03
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(145,195,225,0.015)'
  ctx.lineWidth = 0.3
  ctx.stroke()

  // Inner band
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(139,126,184,0.022)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  // ── 24 outer markers — very slow rotation: ~7min/revolution ──
  const rot = t * 0.15
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
    ctx.strokeStyle = `rgba(91,164,201,${major ? 0.16 : mid ? 0.08 : 0.045})`
    ctx.lineWidth = major ? 1.5 : mid ? 1 : 0.6
    ctx.lineCap = 'round'
    ctx.stroke()

    if (major) {
      ctx.beginPath()
      ctx.arc(Math.cos(a) * (r * 1.03), Math.sin(a) * (r * 1.03), 1.8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91,164,201,0.1)'
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
    ctx.strokeStyle = 'rgba(91,164,201,0.045)'
    ctx.lineWidth = 0.6
    ctx.lineCap = 'round'
    ctx.stroke()
  }
  ctx.restore()

  // ── Sweeping hand — very slow: ~5min/revolution ──
  const handA = t * 0.2
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
  hg.addColorStop(0, 'rgba(91,164,201,0.08)')
  hg.addColorStop(1, 'rgba(91,164,201,0.015)')
  ctx.strokeStyle = hg
  ctx.lineWidth = 1
  ctx.lineCap = 'round'
  ctx.stroke()

  // Centre
  ctx.beginPath()
  ctx.arc(0, 0, 2.2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(91,164,201,0.14)'
  ctx.fill()

  // ── Disc highlight ──
  const dhl = ctx.createRadialGradient(-r * 0.2, -r * 0.22, 0, -r * 0.2, -r * 0.22, r * 0.6)
  dhl.addColorStop(0, 'rgba(255,255,255,0.04)')
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
  // ── Slow elliptical orbit around anchor: ~60s, phase-offset ──
  const orbSpeed = 0.523 + phase * 0.03 // slightly different per orb
  const orbAngle = t * orbSpeed + phase
  const orbRx = r * 0.8  // orbit width proportional to orb size
  const orbRy = r * 0.5
  const dx = Math.cos(orbAngle) * orbRx + Math.sin(t * 0.37 + phase) * 1
  const dy = Math.sin(orbAngle) * orbRy + Math.cos(t * 0.29 + phase) * 0.8
  // Breathing: ~30s, phase-offset
  const breathe = 1 + Math.sin(t * 1.05 + phase) * 0.006 + Math.sin(t * 0.73 + phase) * 0.003

  ctx.save()
  ctx.translate(cx + dx, cy + dy)
  ctx.scale(breathe, breathe)

  // Subsurface glow
  ctx.save()
  ctx.shadowColor = 'rgba(91,164,201,0.08)'
  ctx.shadowBlur = r * 0.7
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(91,164,201,0.006)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()

  // Primary subsurface fill — offset highlight centre
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  const sg = ctx.createRadialGradient(-r * 0.18, -r * 0.22, 0, 0, 0, r)
  sg.addColorStop(0, 'rgba(91,164,201,0.05)')
  sg.addColorStop(0.3, 'rgba(91,164,201,0.028)')
  sg.addColorStop(0.7, 'rgba(91,164,201,0.01)')
  sg.addColorStop(1, 'rgba(91,164,201,0.003)')
  ctx.fillStyle = sg
  ctx.fill()

  // Secondary subsurface — warmer offset
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.88, 0, Math.PI * 2)
  const sg2 = ctx.createRadialGradient(r * 0.12, r * 0.1, 0, 0, 0, r * 0.88)
  sg2.addColorStop(0, 'rgba(130,165,210,0.015)')
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
      const t = Date.now() * 0.0001
      const vmin = Math.min(w, h)

      ctx.clearRect(0, 0, w, h)

      // ── Ambient glow ──
      const ag = ctx.createRadialGradient(w * 0.36, h * 0.38, 0, w * 0.36, h * 0.38, vmin * 0.75)
      ag.addColorStop(0, 'rgba(91,164,201,0.055)')
      ag.addColorStop(0.3, 'rgba(139,126,184,0.025)')
      ag.addColorStop(0.65, 'rgba(91,164,201,0.01)')
      ag.addColorStop(1, 'rgba(91,164,201,0)')
      ctx.fillStyle = ag
      ctx.fillRect(0, 0, w, h)

      // ── Faint scan arcs — glacial rotation ──
      ctx.save()
      ctx.translate(w * 0.36, h * 0.36)
      for (let i = 0; i < 4; i++) {
        const r = vmin * 0.22 + i * vmin * 0.1
        // ~3-5min per revolution
        const rot = t * (0.35 + i * 0.08) * (i % 2 === 0 ? 1 : -1)
        ctx.save()
        ctx.rotate(rot)
        const segs = 3 + i
        const gap = Math.PI * 0.14
        const seg = (Math.PI * 2 - segs * gap) / segs
        ctx.strokeStyle = `rgba(91,164,201,${0.025 - i * 0.004})`
        ctx.lineWidth = 0.5
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

      // ── Ghost echo — distant, behind everything, fainter ──
      drawGhost(ctx, w * 0.62, h * 0.55, vmin / 900, t - 0.5)

      // ── Ghost — dominant, left-of-centre ──
      drawGhost(ctx, w * 0.34, h * 0.28, vmin / 520, t)

      // ── Ring — right side ──
      drawRing(ctx, w * 0.76, h * 0.48, vmin * 0.2, t)

      // ── Second ring — smaller, upper area, partially off-screen ──
      drawRing(ctx, w * 0.18, h * 0.08, vmin * 0.12, t + 3.0)

      // ── Orbs — 5 at different depths ──
      drawOrb(ctx, w * 0.12, h * 0.22, vmin * 0.08, t, 0)
      drawOrb(ctx, w * 0.58, h * 0.16, vmin * 0.055, t, 2.1)
      drawOrb(ctx, w * 0.83, h * 0.78, vmin * 0.042, t, 4.3)
      drawOrb(ctx, w * 0.05, h * 0.72, vmin * 0.035, t, 5.8)
      drawOrb(ctx, w * 0.92, h * 0.32, vmin * 0.03, t, 7.2)
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
