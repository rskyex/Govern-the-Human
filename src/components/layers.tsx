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
      const t = Date.now() * 0.0001
      const vmin = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      // ── Supporting objects per layer ──

      // Orb — positioned differently per layer
      const orbR = vmin * (0.055 - depth * 0.008)
      const orbX = w * (0.12 + depth * 0.06) + Math.cos(t * (0.42 + depth * 0.05) + depth * 2) * orbR * 0.5
      const orbY = h * (0.3 + depth * 0.15) + Math.sin(t * (0.38 + depth * 0.04) + depth * 2) * orbR * 0.4
      ctx.save(); ctx.translate(orbX, orbY)
      ctx.beginPath(); ctx.arc(0, 0, orbR, 0, Math.PI * 2)
      const og = ctx.createRadialGradient(-orbR * 0.18, -orbR * 0.2, 0, 0, 0, orbR)
      og.addColorStop(0, `rgba(91,164,201,${0.032 * opMul})`); og.addColorStop(0.5, `rgba(91,164,201,${0.014 * opMul})`)
      og.addColorStop(1, 'rgba(91,164,201,0)'); ctx.fillStyle = og; ctx.fill()
      ctx.strokeStyle = `rgba(145,195,225,${0.055 * opMul})`; ctx.lineWidth = 0.6; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, orbR * 0.6, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(139,126,184,${0.02 * opMul})`; ctx.lineWidth = 0.3; ctx.stroke()
      ctx.restore()

      // Ring fragment — arc, not full circle. Gets more enclosing with depth.
      const ringR = vmin * (0.12 + depth * 0.04)
      const ringX = w * (0.92 - depth * 0.04) + Math.sin(t * 0.62 + depth) * 2
      const ringY = h * 0.5 + Math.cos(t * 0.52 + depth) * 2
      const arcSpan = Math.PI * (0.6 + depth * 0.4) // deeper = more enclosing
      const arcStart = -Math.PI * 0.5 + t * (0.08 + depth * 0.02) + depth * 1.2
      ctx.save(); ctx.translate(ringX, ringY)
      ctx.save(); ctx.shadowColor = `rgba(91,164,201,${0.05 * opMul})`; ctx.shadowBlur = 8
      ctx.beginPath(); ctx.arc(0, 0, ringR, arcStart, arcStart + arcSpan)
      ctx.strokeStyle = `rgba(91,164,201,${0.04 * opMul})`; ctx.lineWidth = ringR * 0.06
      ctx.lineCap = 'round'; ctx.stroke(); ctx.restore()
      // Inner arc
      ctx.beginPath(); ctx.arc(0, 0, ringR * 0.78, arcStart + 0.15, arcStart + arcSpan - 0.15)
      ctx.strokeStyle = `rgba(139,126,184,${0.02 * opMul})`; ctx.lineWidth = ringR * 0.02
      ctx.lineCap = 'round'; ctx.stroke()
      ctx.restore()

      // ── Primary form — larger, right side ──
      const s = vmin / 320
      const cx = w * 0.78 + Math.sin(t * 0.82 + depth * 1.5) * 2
      const cy = h * 0.5 + Math.sin(t * 1.05 + depth * 1.2) * 4

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(Math.sin(t * 0.524 + depth) * 0.01)

      if (depth === 0) {
        // Layer I: Clear head profile — the knowable subject
        ctx.save()
        ctx.shadowColor = `rgba(91,164,201,${0.08 * opMul})`
        ctx.shadowBlur = 16 * s
        headPath(ctx, s)
        ctx.strokeStyle = 'rgba(91,164,201,0.01)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()

        headPath(ctx, s)
        const hg = ctx.createRadialGradient(0, -6 * s, 0, 0, 0, 55 * s)
        hg.addColorStop(0, `rgba(91,164,201,${0.05 * opMul})`)
        hg.addColorStop(0.6, `rgba(91,164,201,${0.02 * opMul})`)
        hg.addColorStop(1, 'rgba(91,164,201,0)')
        ctx.fillStyle = hg
        ctx.fill()
        ctx.strokeStyle = `rgba(91,164,201,${0.1 * opMul})`
        ctx.lineWidth = 1.2
        ctx.stroke()

        headPath(ctx, s * 0.75)
        ctx.strokeStyle = `rgba(139,126,184,${0.05 * opMul})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      } else if (depth === 1) {
        // Layer II: Fragmenting torso — self-relation destabilised
        // Draw head smaller, torso prominent, with visible separation
        const deform = 1 + Math.sin(t * 0.698) * 0.005
        ctx.scale(deform, 1 / deform)

        ctx.save()
        ctx.translate(0, 45 * s)
        torsoPath(ctx, s * 0.7)
        const tg = ctx.createLinearGradient(0, 0, 0, 135 * s)
        tg.addColorStop(0, `rgba(139,126,184,${0.035 * opMul})`)
        tg.addColorStop(0.6, `rgba(139,126,184,${0.015 * opMul})`)
        tg.addColorStop(1, 'rgba(139,126,184,0)')
        ctx.fillStyle = tg
        ctx.fill()
        ctx.strokeStyle = `rgba(139,126,184,${0.06 * opMul})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Fragmenting inner echo — offset, suggesting instability
        ctx.save()
        ctx.translate(Math.sin(t * 0.785) * 2, Math.cos(t * 0.628) * 1.5)
        torsoPath(ctx, s * 0.58)
        ctx.strokeStyle = `rgba(91,164,201,${0.025 * opMul})`
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.restore()
        ctx.restore()

        // Small head above — slightly displaced
        ctx.save()
        ctx.translate(Math.sin(t * 0.628) * 1.5, 0)
        headPath(ctx, s * 0.55)
        ctx.fillStyle = `rgba(139,126,184,${0.02 * opMul})`
        ctx.fill()
        ctx.strokeStyle = `rgba(139,126,184,${0.05 * opMul})`
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.restore()
      } else {
        // Layer III: Fading full silhouette — deeply submerged
        const breathe = 1 + Math.sin(t * 1.57) * 0.003
        ctx.scale(breathe, breathe)

        // Faint full body
        ctx.save()
        ctx.translate(0, 40 * s)
        torsoPath(ctx, s * 0.6)
        const tg = ctx.createLinearGradient(0, 0, 0, 115 * s)
        tg.addColorStop(0, `rgba(91,164,201,${0.02 * opMul})`)
        tg.addColorStop(1, 'rgba(91,164,201,0)')
        ctx.fillStyle = tg
        ctx.fill()
        ctx.strokeStyle = `rgba(91,164,201,${0.03 * opMul})`
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.restore()

        headPath(ctx, s * 0.5)
        ctx.fillStyle = `rgba(91,164,201,${0.012 * opMul})`
        ctx.fill()
        ctx.strokeStyle = `rgba(91,164,201,${0.025 * opMul})`
        ctx.lineWidth = 0.6
        ctx.stroke()

        // A faint ring enclosing the form — the governance structure
        ctx.beginPath()
        ctx.arc(0, 30 * s, 85 * s, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91,164,201,${0.015 * opMul})`
        ctx.lineWidth = 0.5
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
