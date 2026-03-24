import { useEffect, useRef } from 'react'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Premise />
      <Domains />
      <Provocation />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-white/80 backdrop-blur-md border-b border-rule-light">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <span className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-ink-light">
          Govern the Human
        </span>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#premise" className="font-sans text-[13px] text-ink-muted hover:text-ink transition-colors">
            Premise
          </a>
          <a href="#domains" className="font-sans text-[13px] text-ink-muted hover:text-ink transition-colors">
            Domains
          </a>
          <a href="#provocation" className="font-sans text-[13px] text-ink-muted hover:text-ink transition-colors">
            Provocation
          </a>
        </nav>
      </div>
    </header>
  )
}

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
      ctx.scale(dpr, dpr)
      draw()
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)

      // Subtle topographic/contour lines — very light, very slow
      const time = Date.now() * 0.00003
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.04)'
      ctx.lineWidth = 0.8

      for (let i = 0; i < 12; i++) {
        ctx.beginPath()
        const baseY = h * 0.15 + (i * h * 0.065)
        for (let x = 0; x <= w; x += 3) {
          const nx = x / w
          const y = baseY +
            Math.sin(nx * 3.5 + time + i * 0.7) * 18 +
            Math.sin(nx * 7 + time * 1.3 + i * 0.4) * 8 +
            Math.cos(nx * 2.1 + time * 0.7 + i * 1.1) * 12
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Soft radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 45%, transparent 0%, var(--color-warm-white) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.35em] uppercase text-ink-muted mb-8">
          Research Project
        </p>

        <h1 className="font-serif text-[3.2rem] md:text-[4.8rem] lg:text-[5.6rem] font-medium leading-[0.95] tracking-[-0.02em] text-ink mb-8">
          Govern<br />the Human
        </h1>

        <div className="w-16 h-px bg-rule mx-auto mb-8" />

        <p className="font-serif text-[1.25rem] md:text-[1.45rem] leading-[1.55] text-ink-light max-w-[560px] mx-auto mb-12 italic">
          On the formation of the governed subject<br className="hidden md:block" /> under conditions of artificial intelligence
        </p>

        <a
          href="#premise"
          className="inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.15em] uppercase text-ink-muted hover:text-ink transition-colors"
        >
          <span>Read more</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-px">
            <path d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

function Premise() {
  return (
    <section id="premise" className="relative py-24 md:py-36 bg-parchment">
      <div className="max-w-[780px] mx-auto px-6 md:px-12">
        <p className="font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-ink-muted mb-6">
          Premise
        </p>

        <h2 className="font-serif text-[2rem] md:text-[2.6rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink mb-10">
          AI governance asks what rules should constrain machines. This project asks a different question.
        </h2>

        <div className="space-y-6 font-serif text-[1.1rem] md:text-[1.2rem] leading-[1.7] text-ink-light">
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
            <em>Govern the Human</em> investigates this second-order problem: the governance of
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
    <section id="domains" className="py-24 md:py-36">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <p className="font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-ink-muted mb-6">
          Research Domains
        </p>

        <h2 className="font-serif text-[2rem] md:text-[2.4rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink mb-16 max-w-[600px]">
          Six lines of inquiry into the governed subject
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
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
    <article className="group">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-sans text-[12px] font-medium text-stone-400 tabular-nums">
          {number}
        </span>
        <h3 className="font-serif text-[1.35rem] md:text-[1.5rem] font-medium text-ink leading-tight">
          {title}
        </h3>
      </div>
      <div className="ml-[calc(12px+1rem)] border-t border-rule pt-4">
        <p className="font-serif text-[1rem] md:text-[1.05rem] leading-[1.7] text-ink-light">
          {description}
        </p>
      </div>
    </article>
  )
}

function Provocation() {
  return (
    <section id="provocation" className="py-24 md:py-36 bg-parchment">
      <div className="max-w-[780px] mx-auto px-6 md:px-12">
        <p className="font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-ink-muted mb-6">
          Provocation
        </p>

        <blockquote className="font-serif text-[1.6rem] md:text-[2rem] font-normal leading-[1.35] text-ink mb-10 italic">
          "The most consequential form of AI governance may not be the regulation of machines —
          but the transformation of the humans who believe they are doing the governing."
        </blockquote>

        <div className="w-16 h-px bg-rule mb-10" />

        <div className="space-y-6 font-serif text-[1.1rem] md:text-[1.2rem] leading-[1.7] text-ink-light">
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

function Footer() {
  return (
    <footer className="py-16 md:py-20 border-t border-rule">
      <div className="max-w-[780px] mx-auto px-6 md:px-12 text-center">
        <p className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-ink-light mb-4">
          Govern the Human
        </p>
        <p className="font-sans text-[13px] text-ink-muted">
          A research project on the human subject under AI conditions
        </p>
      </div>
    </footer>
  )
}

export default App
