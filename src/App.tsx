import { useEffect, useRef } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Premise />
      <Domains />
      <Provocation />
      <Footer />
    </div>
  )
}

/* ─── Header ─── */

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-silver/60">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <span className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase text-blue-gray-500">
          Govern the Human
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {['Premise', 'Domains', 'Provocation'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-sans text-[13px] text-blue-gray-300 hover:text-blue-gray-600 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

/* ─── Hero with cranial motif ─── */

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

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h * 0.48
      const time = Date.now() * 0.0004

      ctx.clearRect(0, 0, w, h)

      // Determine scale factor based on viewport
      const scale = Math.min(w / 900, h / 900, 1)

      // ── Outer scanning rings ──
      for (let i = 0; i < 5; i++) {
        const radius = (160 + i * 42) * scale
        const opacity = 0.06 - i * 0.008
        const rotation = time * (0.15 + i * 0.04) * (i % 2 === 0 ? 1 : -1)

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rotation)

        // Draw arc segments (not full circles — feels like a scan)
        const segments = 3 + i
        const gapAngle = Math.PI * 0.12
        const segAngle = (Math.PI * 2 - segments * gapAngle) / segments

        ctx.strokeStyle = `rgba(125, 211, 232, ${opacity})`
        ctx.lineWidth = (1.2 - i * 0.1) * scale
        ctx.lineCap = 'round'

        for (let s = 0; s < segments; s++) {
          const startAngle = s * (segAngle + gapAngle)
          ctx.beginPath()
          ctx.arc(0, 0, radius, startAngle, startAngle + segAngle)
          ctx.stroke()
        }

        ctx.restore()
      }

      // ── Cranial profile contour ──
      // A smooth, abstract head silhouette facing right — drawn as a bezier path
      ctx.save()
      ctx.translate(cx, cy)
      const s = scale * 1.1

      // Breathing animation — very subtle scale pulse
      const breathe = 1 + Math.sin(time * 0.5) * 0.008

      ctx.scale(breathe, breathe)

      // Main cranial outline
      ctx.beginPath()

      // Start from top of head, clockwise
      ctx.moveTo(-20 * s, -120 * s)

      // Crown curve
      ctx.bezierCurveTo(
        40 * s, -145 * s,
        90 * s, -130 * s,
        100 * s, -90 * s
      )

      // Forehead to brow
      ctx.bezierCurveTo(
        108 * s, -60 * s,
        105 * s, -40 * s,
        95 * s, -25 * s
      )

      // Brow to nose bridge
      ctx.bezierCurveTo(
        88 * s, -12 * s,
        92 * s, 5 * s,
        88 * s, 20 * s
      )

      // Nose
      ctx.bezierCurveTo(
        85 * s, 35 * s,
        78 * s, 45 * s,
        72 * s, 48 * s
      )

      // Upper lip
      ctx.bezierCurveTo(
        65 * s, 52 * s,
        62 * s, 55 * s,
        60 * s, 58 * s
      )

      // Chin
      ctx.bezierCurveTo(
        55 * s, 68 * s,
        45 * s, 82 * s,
        25 * s, 90 * s
      )

      // Jaw back to neck
      ctx.bezierCurveTo(
        5 * s, 96 * s,
        -20 * s, 95 * s,
        -35 * s, 85 * s
      )

      // Back of neck
      ctx.bezierCurveTo(
        -48 * s, 75 * s,
        -55 * s, 55 * s,
        -58 * s, 30 * s
      )

      // Back of skull
      ctx.bezierCurveTo(
        -62 * s, -10 * s,
        -65 * s, -50 * s,
        -55 * s, -85 * s
      )

      // Back to crown
      ctx.bezierCurveTo(
        -48 * s, -108 * s,
        -35 * s, -118 * s,
        -20 * s, -120 * s
      )

      ctx.closePath()

      // Glass fill
      const gradient = ctx.createLinearGradient(
        -60 * s, -120 * s,
        100 * s, 90 * s
      )
      gradient.addColorStop(0, 'rgba(125, 211, 232, 0.03)')
      gradient.addColorStop(0.5, 'rgba(155, 142, 196, 0.02)')
      gradient.addColorStop(1, 'rgba(125, 211, 232, 0.01)')
      ctx.fillStyle = gradient
      ctx.fill()

      // Contour stroke
      ctx.strokeStyle = 'rgba(125, 211, 232, 0.18)'
      ctx.lineWidth = 1.5 * scale
      ctx.stroke()

      // ── Inner echo contour (offset inward slightly) ──
      ctx.beginPath()
      const inset = 0.82
      ctx.moveTo(-20 * s * inset, -120 * s * inset)
      ctx.bezierCurveTo(
        40 * s * inset, -145 * s * inset,
        90 * s * inset, -130 * s * inset,
        100 * s * inset, -90 * s * inset
      )
      ctx.bezierCurveTo(
        108 * s * inset, -60 * s * inset,
        105 * s * inset, -40 * s * inset,
        95 * s * inset, -25 * s * inset
      )
      ctx.bezierCurveTo(
        88 * s * inset, -12 * s * inset,
        92 * s * inset, 5 * s * inset,
        88 * s * inset, 20 * s * inset
      )
      ctx.bezierCurveTo(
        85 * s * inset, 35 * s * inset,
        78 * s * inset, 45 * s * inset,
        72 * s * inset, 48 * s * inset
      )
      ctx.bezierCurveTo(
        65 * s * inset, 52 * s * inset,
        62 * s * inset, 55 * s * inset,
        60 * s * inset, 58 * s * inset
      )
      ctx.bezierCurveTo(
        55 * s * inset, 68 * s * inset,
        45 * s * inset, 82 * s * inset,
        25 * s * inset, 90 * s * inset
      )
      ctx.bezierCurveTo(
        5 * s * inset, 96 * s * inset,
        -20 * s * inset, 95 * s * inset,
        -35 * s * inset, 85 * s * inset
      )
      ctx.bezierCurveTo(
        -48 * s * inset, 75 * s * inset,
        -55 * s * inset, 55 * s * inset,
        -58 * s * inset, 30 * s * inset
      )
      ctx.bezierCurveTo(
        -62 * s * inset, -10 * s * inset,
        -65 * s * inset, -50 * s * inset,
        -55 * s * inset, -85 * s * inset
      )
      ctx.bezierCurveTo(
        -48 * s * inset, -108 * s * inset,
        -35 * s * inset, -118 * s * inset,
        -20 * s * inset, -120 * s * inset
      )
      ctx.closePath()
      ctx.strokeStyle = 'rgba(155, 142, 196, 0.08)'
      ctx.lineWidth = 0.8 * scale
      ctx.stroke()

      // ── Horizontal scan line ──
      const scanY = Math.sin(time * 0.6) * 80 * s
      ctx.beginPath()
      ctx.moveTo(-100 * s, scanY)
      ctx.lineTo(130 * s, scanY)
      const scanGrad = ctx.createLinearGradient(-100 * s, 0, 130 * s, 0)
      scanGrad.addColorStop(0, 'rgba(125, 211, 232, 0)')
      scanGrad.addColorStop(0.3, 'rgba(125, 211, 232, 0.12)')
      scanGrad.addColorStop(0.7, 'rgba(125, 211, 232, 0.12)')
      scanGrad.addColorStop(1, 'rgba(125, 211, 232, 0)')
      ctx.strokeStyle = scanGrad
      ctx.lineWidth = 0.8 * scale
      ctx.stroke()

      // ── Small data points along the contour ──
      const points = [
        { x: 100 * s, y: -90 * s },
        { x: 95 * s, y: -25 * s },
        { x: 88 * s, y: 20 * s },
        { x: -55 * s, y: -85 * s },
        { x: -58 * s, y: 30 * s },
      ]
      for (const pt of points) {
        const pulse = 1 + Math.sin(time * 2 + pt.x * 0.01) * 0.3
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 2 * scale * pulse, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(125, 211, 232, 0.25)'
        ctx.fill()
      }

      ctx.restore()
    }

    resize()
    window.addEventListener('resize', resize)

    let animId: number
    function animate() {
      draw()
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Very subtle radial ice gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(212, 241, 249, 0.25) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Text content — positioned over the motif */}
      <div className="relative z-10 text-center px-6 max-w-[880px] mx-auto pt-20">
        <p className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.4em] uppercase text-blue-gray-300 mb-10">
          Research Project
        </p>

        <h1 className="font-display text-[3.5rem] md:text-[5.2rem] lg:text-[6.2rem] font-normal leading-[0.92] tracking-[-0.03em] text-blue-gray-900 mb-8">
          Govern<br />
          <span className="text-blue-gray-600">the Human</span>
        </h1>

        <p className="font-display text-[1.15rem] md:text-[1.35rem] leading-[1.6] text-blue-gray-400 max-w-[500px] mx-auto mb-14 italic">
          On the formation of the governed subject under conditions of artificial intelligence
        </p>

        <a
          href="#premise"
          className="group inline-flex items-center gap-2.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-blue-gray-300 hover:text-cyan-glow transition-colors duration-500"
        >
          <span>Enter</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="translate-y-px group-hover:translate-y-0.5 transition-transform duration-500">
            <path d="M5 1.5V8.5M5 8.5L1.5 5M5 8.5L8.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

/* ─── Premise ─── */

function Premise() {
  return (
    <section id="premise" className="relative py-28 md:py-40 bg-ice">
      <div className="max-w-[760px] mx-auto px-6 md:px-12">
        <SectionLabel>Premise</SectionLabel>

        <h2 className="font-display text-[1.9rem] md:text-[2.5rem] font-normal leading-[1.2] tracking-[-0.015em] text-blue-gray-800 mb-12">
          AI governance asks what rules should constrain machines.{' '}
          <span className="text-blue-gray-400">This project asks a different question.</span>
        </h2>

        <div className="space-y-7 font-sans text-[1rem] md:text-[1.05rem] leading-[1.8] text-blue-gray-500 font-light">
          <p>
            What happens to the human who is governed — not by AI directly, but through the
            epistemic, affective, and institutional transformations that AI systems produce?
          </p>
          <p>
            When recommendation architectures shape what a person encounters, when generative
            models mediate how they write and reason, when predictive systems pre-empt their
            decisions — the question is no longer only about regulating technology. It is about
            what kind of subject emerges on the other side.
          </p>
          <p>
            <em className="text-blue-gray-600 font-normal not-italic">Govern the Human</em> investigates this second-order problem: the governance of
            the human subject under AI conditions. It draws on political philosophy, critical
            theory, philosophy of technology, and democratic theory to ask how selfhood,
            knowledge, memory, and political agency are being restructured — and what this means
            for governance that presumes a coherent, autonomous subject.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Domains ─── */

function Domains() {
  const domains = [
    {
      number: '01',
      title: 'Epistemic Intervention',
      description:
        'How AI systems reshape what counts as knowledge, what sources are trusted, and how beliefs are formed — producing subjects whose epistemic foundations have been reorganized without their awareness.',
    },
    {
      number: '02',
      title: 'Ontological Instability',
      description:
        'How the boundary between human-generated and machine-generated experience becomes undecidable — destabilizing the subject\'s capacity to locate itself as the author of its own thought and expression.',
    },
    {
      number: '03',
      title: 'Democratic Subject Formation',
      description:
        'How the political subject required by democratic governance — capable of deliberation, dissent, and autonomous judgment — is being reshaped by systems that optimize for engagement, consensus, or compliance.',
    },
    {
      number: '04',
      title: 'Narrative Identity',
      description:
        'How the stories people tell about themselves — the temporal coherence of a life — are disrupted when memory is outsourced, attention is captured, and self-narration is mediated by algorithmic surfaces.',
    },
    {
      number: '05',
      title: 'Technics of Memory',
      description:
        'How AI-mediated archives, search, and retrieval reshape not only what is remembered but how remembering works — transforming memory from an act of reconstruction into a function of retrieval.',
    },
    {
      number: '06',
      title: 'Self-Governance',
      description:
        'How the capacity for self-regulation, practical reason, and autonomous choice is altered when decision environments are pre-structured by predictive systems operating beneath the threshold of awareness.',
    },
  ]

  return (
    <section id="domains" className="py-28 md:py-40">
      <div className="max-w-[1080px] mx-auto px-6 md:px-12">
        <SectionLabel>Research Domains</SectionLabel>

        <h2 className="font-display text-[1.9rem] md:text-[2.3rem] font-normal leading-[1.2] tracking-[-0.015em] text-blue-gray-800 mb-20 max-w-[560px]">
          Six lines of inquiry into the governed subject
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {domains.map((domain) => (
            <DomainCard key={domain.number} {...domain} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <article>
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-sans text-[11px] font-medium tracking-[0.1em] text-cyan-glow tabular-nums">
          {number}
        </span>
        <h3 className="font-display text-[1.3rem] md:text-[1.45rem] font-normal text-blue-gray-800 leading-snug">
          {title}
        </h3>
      </div>
      <div className="ml-[calc(22px+1rem)] border-t border-silver pt-5">
        <p className="font-sans text-[0.92rem] md:text-[0.95rem] leading-[1.8] text-blue-gray-400 font-light">
          {description}
        </p>
      </div>
    </article>
  )
}

/* ─── Provocation ─── */

function Provocation() {
  return (
    <section id="provocation" className="py-28 md:py-40 bg-ice">
      <div className="max-w-[760px] mx-auto px-6 md:px-12">
        <SectionLabel>Provocation</SectionLabel>

        <blockquote className="font-display text-[1.5rem] md:text-[1.9rem] font-normal leading-[1.4] text-blue-gray-700 mb-12 italic">
          "The most consequential form of AI governance may not be the regulation of machines —
          but the transformation of the humans who believe they are doing the governing."
        </blockquote>

        <div className="w-12 h-px bg-silver-dark mb-12" />

        <div className="space-y-7 font-sans text-[1rem] md:text-[1.05rem] leading-[1.8] text-blue-gray-500 font-light">
          <p>
            This project does not propose policy. It does not offer a framework for responsible AI.
            It asks whether the subject to whom such frameworks are addressed still exists in the
            form those frameworks assume — and what follows if it does not.
          </p>
          <p>
            The stakes are not technical. They are political, philosophical, and existential.
            If the human subject is being reshaped by the very systems it seeks to govern,
            then governance itself requires a new foundation — one that begins not with the
            machine, but with the question of who, and what, is being governed.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="py-16 md:py-20 border-t border-silver/50">
      <div className="max-w-[760px] mx-auto px-6 md:px-12 text-center">
        <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-blue-gray-400 mb-3">
          Govern the Human
        </p>
        <p className="font-sans text-[13px] text-blue-gray-300 font-light">
          A research project on the human subject under AI conditions
        </p>
      </div>
    </footer>
  )
}

/* ─── Shared ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-blue-gray-300 mb-6">
      {children}
    </p>
  )
}

export default App
