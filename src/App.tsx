import { useEffect, useRef, useState, type ReactNode } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      <Hero />
      <Thesis />
      <Layers />
      <Footer />
    </div>
  )
}

/* ━━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/70 backdrop-blur-2xl border-b border-rule/60">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <span className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-text-tertiary">
          Govern the Human
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Thesis', href: '#thesis' },
            { label: 'Framework', href: '#layers' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-sans text-[13px] text-text-ghost hover:text-text-secondary transition-colors duration-400"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

/* ━━━ Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Hero() {
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

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h * 0.44
      const time = Date.now() * 0.0004
      const scale = Math.min(w / 780, h / 780, 1.2)

      ctx.clearRect(0, 0, w, h)

      // Radial ambient glow
      const ambientGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280 * scale)
      ambientGrad.addColorStop(0, 'rgba(91, 164, 201, 0.07)')
      ambientGrad.addColorStop(0.4, 'rgba(139, 126, 184, 0.03)')
      ambientGrad.addColorStop(1, 'rgba(91, 164, 201, 0)')
      ctx.fillStyle = ambientGrad
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.translate(cx, cy)

      // Scanning arc rings
      for (let i = 0; i < 4; i++) {
        const radius = (150 + i * 50) * scale
        const opacity = 0.055 - i * 0.01
        const speed = (0.12 + i * 0.035) * (i % 2 === 0 ? 1 : -1)
        const rotation = time * speed

        ctx.save()
        ctx.rotate(rotation)

        const segments = 3 + i
        const gapAngle = Math.PI * 0.14
        const segAngle = (Math.PI * 2 - segments * gapAngle) / segments

        ctx.strokeStyle = `rgba(91, 164, 201, ${opacity})`
        ctx.lineWidth = Math.max((1.1 - i * 0.12) * scale, 0.5)
        ctx.lineCap = 'round'

        for (let seg = 0; seg < segments; seg++) {
          const startAngle = seg * (segAngle + gapAngle)
          ctx.beginPath()
          ctx.arc(0, 0, radius, startAngle, startAngle + segAngle)
          ctx.stroke()
        }
        ctx.restore()
      }

      // Breathing
      const breathe = 1 + Math.sin(time * 0.5) * 0.006
      ctx.scale(breathe, breathe)

      // Cranial contour — outer
      const s = scale * 1.1
      drawCranialPath(ctx, s)

      const fillGrad = ctx.createLinearGradient(-60 * s, -120 * s, 96 * s, 86 * s)
      fillGrad.addColorStop(0, 'rgba(91, 164, 201, 0.025)')
      fillGrad.addColorStop(0.4, 'rgba(139, 126, 184, 0.015)')
      fillGrad.addColorStop(1, 'rgba(91, 164, 201, 0.008)')
      ctx.fillStyle = fillGrad
      ctx.fill()
      ctx.strokeStyle = 'rgba(91, 164, 201, 0.16)'
      ctx.lineWidth = 1.4 * scale
      ctx.stroke()

      // Inner echo contour
      drawCranialPath(ctx, s * 0.78)
      ctx.strokeStyle = 'rgba(139, 126, 184, 0.07)'
      ctx.lineWidth = 0.7 * scale
      ctx.stroke()

      // Scan line
      const scanY = Math.sin(time * 0.55) * 75 * s
      const scanGrad = ctx.createLinearGradient(-110 * s, 0, 110 * s, 0)
      scanGrad.addColorStop(0, 'rgba(91, 164, 201, 0)')
      scanGrad.addColorStop(0.25, 'rgba(91, 164, 201, 0.1)')
      scanGrad.addColorStop(0.75, 'rgba(91, 164, 201, 0.1)')
      scanGrad.addColorStop(1, 'rgba(91, 164, 201, 0)')
      ctx.beginPath()
      ctx.moveTo(-110 * s, scanY)
      ctx.lineTo(110 * s, scanY)
      ctx.strokeStyle = scanGrad
      ctx.lineWidth = 0.7 * scale
      ctx.stroke()

      // Nodal points
      const nodes = [
        { x: 96, y: -88 }, { x: 90, y: -22 }, { x: 68, y: 46 },
        { x: -52, y: -82 }, { x: -54, y: 28 },
      ]
      for (const n of nodes) {
        const pulse = 1 + Math.sin(time * 1.8 + n.x * 0.05) * 0.35
        ctx.beginPath()
        ctx.arc(n.x * s, n.y * s, 1.6 * scale * pulse, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91, 164, 201, 0.22)'
        ctx.fill()
      }

      ctx.restore()
    }

    resize()
    window.addEventListener('resize', resize)
    let animId: number
    function animate() { draw(); animId = requestAnimationFrame(animate) }
    animate()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6 max-w-[860px] mx-auto pt-14">
        {/* Title */}
        <h1 className="font-display text-[3.2rem] md:text-[4.8rem] lg:text-[5.5rem] font-normal leading-[0.92] tracking-[-0.025em] text-text-primary mb-6 reveal">
          Govern the Human
        </h1>

        {/* Hero line */}
        <p className="font-display text-[1.25rem] md:text-[1.65rem] lg:text-[1.85rem] leading-[1.35] text-text-tertiary max-w-[580px] mx-auto mb-5 italic reveal reveal-delay-1">
          If AI Governs Your Mind, Who Governs AI?
        </p>

        {/* Supporting line */}
        <p className="font-sans text-[0.88rem] md:text-[0.95rem] leading-[1.7] text-text-ghost max-w-[520px] mx-auto mb-12 font-light reveal reveal-delay-2">
          A research suite on second-order AI governance, narrative identity, and democratic subject formation.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal reveal-delay-3">
          <a
            href="#layers"
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
        </div>
      </div>
    </section>
  )
}

/* ━━━ Thesis ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Thesis() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useScrollReveal(ref)

  return (
    <section id="thesis" className="py-28 md:py-40 bg-surface">
      <div ref={ref} className={`max-w-[1040px] mx-auto px-6 md:px-12 ${visible ? 'reveal' : 'opacity-0'}`}>
        <SectionLabel>Why This Exists</SectionLabel>

        {/* Two-column: statement left, elaboration right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Core statement — large, clear, immediate */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary">
              Current AI governance frameworks regulate systems and harms —{' '}
              <span className="text-text-tertiary">
                but do not adequately govern what those systems do to the epistemic,
                ontological, and political conditions of the human beings governance
                exists to protect.
              </span>
            </h2>
          </div>

          {/* Elaboration — smaller, supporting */}
          <div className="lg:col-span-6 lg:pt-2">
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
          </div>
        </div>
      </div>
    </section>
  )
}

/* ━━━ Three-Layer Model ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const layers: LayerData[] = [
  {
    depth: 'I',
    title: 'Epistemic',
    subtitle: 'What you can know',
    body: 'AI systems restructure the conditions of knowledge: what counts as credible, how beliefs are formed, which sources are surfaced, and which are suppressed. The epistemic subject — the one who knows, doubts, and judges — is being reorganized at the level of its informational environment, often without awareness that any transformation has occurred.',
    accent: 'var(--color-accent)',
    bg: 'bg-base',
  },
  {
    depth: 'II',
    title: 'Ontological',
    subtitle: 'Who you can be',
    body: 'Beneath the epistemic layer, AI destabilizes the subject\'s relation to itself. When machine-generated content becomes indistinguishable from human expression, when memory is outsourced to retrieval systems, when self-narration is mediated by algorithmic surfaces — the boundary of the self becomes undecidable. The question is no longer what you know, but whether the one who knows is still coherently you.',
    accent: 'var(--color-violet)',
    bg: 'bg-surface',
  },
  {
    depth: 'III',
    title: 'Political',
    subtitle: 'How you can govern',
    body: 'At the deepest layer, the political subject required by democratic governance — capable of deliberation, dissent, and autonomous judgment — is being reshaped by the same systems democracy is supposed to regulate. If the subject who votes, protests, and consents has been epistemically narrowed and ontologically destabilized, then the foundations of self-governance are not merely threatened. They are structurally altered.',
    accent: 'var(--color-text-primary)',
    bg: 'bg-base',
  },
]

interface LayerData {
  depth: string
  title: string
  subtitle: string
  body: string
  accent: string
  bg: string
}

function Layers() {
  return (
    <section id="layers">
      {/* Section header */}
      <div className="pt-28 md:pt-40 pb-16 md:pb-24 bg-base">
        <div className="max-w-[1040px] mx-auto px-6 md:px-12">
          <RevealBlock>
            <SectionLabel>Three-Layer Model</SectionLabel>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[540px]">
              Descending into the governed subject
            </h2>
          </RevealBlock>
        </div>
      </div>

      {/* Cascading strata */}
      {layers.map((layer, i) => (
        <LayerStratum key={layer.depth} layer={layer} index={i} />
      ))}
    </section>
  )
}

function LayerStratum({ layer, index }: { layer: LayerData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useScrollReveal(ref)

  // Each layer narrows progressively — visual descent
  const inset = index * 24 // px per side
  const paddingBlock = index === 2 ? 'pb-28 md:pb-40 pt-16 md:pt-24' : 'py-16 md:py-24'

  return (
    <div className={`${layer.bg} ${paddingBlock}`}>
      <div
        ref={ref}
        className={`max-w-[1040px] mx-auto px-6 md:px-12 ${visible ? 'reveal' : 'opacity-0'}`}
      >
        <div
          className="relative border-l-2 pl-8 md:pl-12"
          style={{
            borderColor: layer.accent,
            marginLeft: `${inset}px`,
            marginRight: `${inset}px`,
          }}
        >
          {/* Depth indicator */}
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

          {/* Title */}
          <h3 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.01em] text-text-primary mb-6">
            {layer.title}
          </h3>

          {/* Body */}
          <p className="font-sans text-[0.92rem] md:text-[0.97rem] leading-[1.85] text-text-secondary font-light max-w-[640px]">
            {layer.body}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ━━━ Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-base border-t border-rule/50">
      <div className="max-w-[680px] mx-auto px-6 md:px-12 text-center">
        <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-text-tertiary mb-3">
          Govern the Human
        </p>
        <p className="font-sans text-[13px] text-text-ghost font-light">
          A research project on the human subject under AI conditions
        </p>
      </div>
    </footer>
  )
}

/* ━━━ Shared ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-6">
      {children}
    </p>
  )
}

function RevealBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useScrollReveal(ref)
  return (
    <div ref={ref} className={visible ? 'reveal' : 'opacity-0'}>
      {children}
    </div>
  )
}

/* ━━━ Hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function useScrollReveal(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return visible
}

export default App
