import { useEffect, useRef, useState, type ReactNode } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      <Hero />
      <Premise />
      <Domains />
      <Provocation />
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
          {['Premise', 'Domains', 'Provocation'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-sans text-[13px] text-text-ghost hover:text-text-secondary transition-colors duration-400"
            >
              {item}
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

    // ── Cranial profile path data (unit coordinates, will be scaled) ──
    // A refined lateral head silhouette facing right.
    function drawCranialPath(ctx: CanvasRenderingContext2D, s: number) {
      ctx.beginPath()
      // Crown
      ctx.moveTo(-18 * s, -115 * s)
      // Crown → forehead
      ctx.bezierCurveTo(35 * s, -140 * s, 85 * s, -128 * s, 96 * s, -88 * s)
      // Forehead → brow ridge
      ctx.bezierCurveTo(103 * s, -58 * s, 100 * s, -38 * s, 90 * s, -22 * s)
      // Brow → nose bridge
      ctx.bezierCurveTo(84 * s, -10 * s, 87 * s, 6 * s, 84 * s, 18 * s)
      // Nose bridge → nose tip
      ctx.bezierCurveTo(82 * s, 32 * s, 74 * s, 42 * s, 68 * s, 46 * s)
      // Nose → upper lip
      ctx.bezierCurveTo(62 * s, 50 * s, 58 * s, 54 * s, 56 * s, 56 * s)
      // Lip → chin
      ctx.bezierCurveTo(52 * s, 66 * s, 42 * s, 78 * s, 22 * s, 86 * s)
      // Chin → jaw
      ctx.bezierCurveTo(4 * s, 92 * s, -18 * s, 90 * s, -32 * s, 82 * s)
      // Jaw → neck
      ctx.bezierCurveTo(-44 * s, 72 * s, -50 * s, 52 * s, -54 * s, 28 * s)
      // Neck → occiput
      ctx.bezierCurveTo(-58 * s, -8 * s, -60 * s, -48 * s, -52 * s, -82 * s)
      // Occiput → crown
      ctx.bezierCurveTo(-45 * s, -105 * s, -32 * s, -114 * s, -18 * s, -115 * s)
      ctx.closePath()
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h * 0.47
      const time = Date.now() * 0.0004
      const scale = Math.min(w / 820, h / 820, 1.15)

      ctx.clearRect(0, 0, w, h)

      // ── Radial ambient glow ──
      const ambientGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260 * scale)
      ambientGrad.addColorStop(0, 'rgba(91, 164, 201, 0.06)')
      ambientGrad.addColorStop(0.5, 'rgba(139, 126, 184, 0.025)')
      ambientGrad.addColorStop(1, 'rgba(91, 164, 201, 0)')
      ctx.fillStyle = ambientGrad
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.translate(cx, cy)

      // ── Scanning arc rings ──
      for (let i = 0; i < 4; i++) {
        const radius = (155 + i * 48) * scale
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

      // ── Breathing animation ──
      const breathe = 1 + Math.sin(time * 0.5) * 0.006
      ctx.scale(breathe, breathe)

      // ── Cranial contour — outer stroke ──
      const s = scale * 1.05
      drawCranialPath(ctx, s)

      // Glass fill
      const fillGrad = ctx.createLinearGradient(-60 * s, -120 * s, 96 * s, 86 * s)
      fillGrad.addColorStop(0, 'rgba(91, 164, 201, 0.025)')
      fillGrad.addColorStop(0.4, 'rgba(139, 126, 184, 0.015)')
      fillGrad.addColorStop(1, 'rgba(91, 164, 201, 0.008)')
      ctx.fillStyle = fillGrad
      ctx.fill()

      ctx.strokeStyle = 'rgba(91, 164, 201, 0.16)'
      ctx.lineWidth = 1.4 * scale
      ctx.stroke()

      // ── Inner echo contour ──
      const inset = 0.78
      drawCranialPath(ctx, s * inset)
      ctx.strokeStyle = 'rgba(139, 126, 184, 0.07)'
      ctx.lineWidth = 0.7 * scale
      ctx.stroke()

      // ── Horizontal scan line ──
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

      // ── Nodal points on contour ──
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6 max-w-[840px] mx-auto pt-14">
        <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-text-ghost mb-10 reveal">
          Research Project
        </p>

        <h1 className="font-display text-[3.4rem] md:text-[5rem] lg:text-[5.5rem] font-normal leading-[0.92] tracking-[-0.025em] text-text-primary mb-7 reveal reveal-delay-1">
          Govern<br />
          <span className="text-text-tertiary">the Human</span>
        </h1>

        <p className="font-display text-[1.1rem] md:text-[1.3rem] leading-[1.6] text-text-tertiary max-w-[480px] mx-auto mb-16 italic reveal reveal-delay-2">
          On the formation of the governed subject<br className="hidden md:block" />
          under conditions of artificial intelligence
        </p>

        <a
          href="#premise"
          className="group inline-flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-text-ghost hover:text-accent transition-colors duration-500 reveal reveal-delay-3"
        >
          <span>Enter</span>
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            className="translate-y-px group-hover:translate-y-0.5 transition-transform duration-500"
          >
            <path d="M5 1.5V8.5M5 8.5L1.5 5M5 8.5L8.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

/* ━━━ Premise ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Premise() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useScrollReveal(ref)

  return (
    <section id="premise" className="py-28 md:py-40 bg-surface">
      <div ref={ref} className={`max-w-[680px] mx-auto px-6 md:px-12 ${visible ? 'reveal' : 'opacity-0'}`}>
        <SectionLabel>Premise</SectionLabel>

        <h2 className="font-display text-[1.85rem] md:text-[2.4rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-12">
          AI governance asks what rules should constrain machines.{' '}
          <span className="text-text-tertiary">
            This project asks a different question.
          </span>
        </h2>

        <div className="space-y-7 font-sans text-[1rem] md:text-[1.05rem] leading-[1.8] text-text-secondary font-light">
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
            <em className="text-text-primary font-normal not-italic">Govern the Human</em>{' '}
            investigates this second-order problem: the governance of the human subject under
            AI conditions. It draws on political philosophy, critical theory, philosophy of
            technology, and democratic theory to ask how selfhood, knowledge, memory, and
            political agency are being restructured — and what this means for governance that
            presumes a coherent, autonomous subject.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ━━━ Domains ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

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

function Domains() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useScrollReveal(ref)

  return (
    <section id="domains" className="py-28 md:py-40 bg-base">
      <div ref={ref} className={`max-w-[1040px] mx-auto px-6 md:px-12 ${visible ? 'reveal' : 'opacity-0'}`}>
        <SectionLabel>Research Domains</SectionLabel>

        <h2 className="font-display text-[1.85rem] md:text-[2.3rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-20 max-w-[520px]">
          Six lines of inquiry into the governed subject
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {domains.map((d) => (
            <DomainCard key={d.number} {...d} />
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
        <span className="font-sans text-[10px] font-medium tracking-[0.1em] text-accent tabular-nums">
          {number}
        </span>
        <h3 className="font-display text-[1.25rem] md:text-[1.4rem] font-normal text-text-primary leading-snug">
          {title}
        </h3>
      </div>
      <div className="ml-[calc(20px+1rem)] border-t border-rule pt-5">
        <p className="font-sans text-[0.9rem] md:text-[0.94rem] leading-[1.8] text-text-tertiary font-light">
          {description}
        </p>
      </div>
    </article>
  )
}

/* ━━━ Provocation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Provocation() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useScrollReveal(ref)

  return (
    <section id="provocation" className="py-28 md:py-40 bg-surface">
      <div ref={ref} className={`max-w-[680px] mx-auto px-6 md:px-12 ${visible ? 'reveal' : 'opacity-0'}`}>
        <SectionLabel>Provocation</SectionLabel>

        <blockquote className="font-display text-[1.45rem] md:text-[1.85rem] font-normal leading-[1.4] text-text-primary mb-12 italic">
          "The most consequential form of AI governance may not be the regulation of
          machines — but the transformation of the humans who believe they are doing
          the governing."
        </blockquote>

        <div className="w-10 h-px bg-rule mb-12" />

        <div className="space-y-7 font-sans text-[1rem] md:text-[1.05rem] leading-[1.8] text-text-secondary font-light">
          <p>
            This project does not propose policy. It does not offer a framework for
            responsible AI. It asks whether the subject to whom such frameworks are
            addressed still exists in the form those frameworks assume — and what
            follows if it does not.
          </p>
          <p>
            The stakes are not technical. They are political, philosophical, and
            existential. If the human subject is being reshaped by the very systems
            it seeks to govern, then governance itself requires a new foundation — one
            that begins not with the machine, but with the question of who, and what,
            is being governed.
          </p>
        </div>
      </div>
    </section>
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

/* ━━━ Shared components ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-6">
      {children}
    </p>
  )
}

/* ━━━ Hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function useScrollReveal(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return visible
}

export default App
