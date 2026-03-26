import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = {
  title: 'Builder — Risa Koyanagi | Govern the Human',
  description:
    'Cambridge Future Scholar. Researcher at the intersection of international security, space governance, and emerging technology governance.',
  openGraph: {
    title: 'Risa Koyanagi — Builder',
    description:
      'Cambridge Future Scholar. Researcher at the intersection of international security, space governance, and emerging technology governance.',
    images: [{ url: '/og-builder.png', width: 1200, height: 630 }],
  },
}

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-base">
      <Header />

      {/* ── Hero ── */}
      <section className="bg-base pt-40 pb-24 md:pb-36">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          <Reveal>
            <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-6">
              Builder
            </p>
          </Reveal>
          <Reveal>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[0.02em] text-text-primary mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            >
              Risa Koyanagi
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-secondary font-light max-w-[640px]">
              Cambridge Future Scholar. Researcher at the intersection of
              international security, space governance, nuclear governance, cyber
              governance, and emerging technology governance.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="https://risakoyanagi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 border border-panel-border bg-panel rounded-sm font-sans text-[0.95rem] tracking-[0.04em] text-text-primary hover:border-text-ghost/30 hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              risakoyanagi.com
              <span className="text-[1.1rem]">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Profile ── */}
      <section className="bg-base pb-24 md:pb-36">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Photo */}
            <Reveal delay={0.05}>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden max-w-[480px]">
                <Image
                  src="/profile.jpg"
                  alt="Risa Koyanagi"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            {/* Bio */}
            <div className="lg:pt-4">
              <Reveal delay={0.1}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                  Born in 2003, Risa Koyanagi is a Cambridge Future Scholar and
                  researcher working at the intersection of international security,
                  space governance, nuclear governance, cyber governance, and emerging
                  technology governance. Her research is especially concerned with
                  legitimation theory, dual-use governance, authority architecture, and
                  responsible behaviour norms.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                  She develops public-facing policy and research platforms that
                  translate governance theory into usable tools across strategic
                  infrastructure domains. Her work connects conceptual research on
                  legitimacy, authority, and governance architecture with applied
                  questions of escalation, responsibility, and institutional design.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  Although her work spans multiple domains — from space and nuclear to
                  cyber and AI governance — it is unified by a consistent conceptual
                  focus on how authority is constructed, contested, and legitimated in
                  environments of technological complexity and strategic ambiguity.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back navigation ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          <Reveal>
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="font-sans text-[13px] tracking-[0.02em] text-text-ghost hover:text-text-secondary transition-colors duration-300"
              >
                &larr; Main
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
