import type { Metadata } from 'next'
import Image from 'next/image'
import { IMAGES } from '@/lib/images'
import {
  SuitePageWrapper,
  SuiteSection,
  SectionHeading,
  ConceptCard,
  SuiteNav,
} from '@/components/suite-page-layout'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = {
  title: 'SelfTrace | Govern the Human',
  description:
    'A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity.',
  openGraph: {
    title: 'SelfTrace — Govern the Human',
    description:
      'A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity.',
    url: '/selftrace',
    images: [{ url: '/govern-the-human-og.png', width: 1200, height: 630, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SelfTrace — Govern the Human',
    images: ['/govern-the-human-og.png'],
  },
}

export default function SelfTracePage() {
  return (
    <SuitePageWrapper>
      {/* ── Hero with selftrace-2 background (flipped) ── */}
      <section className="relative min-h-[70svh] flex items-end overflow-hidden">
        <Image
          src={IMAGES.selfTraceHero}
          alt=""
          fill
          priority
          className="object-cover object-center -scale-x-100"
          sizes="100vw"
        />
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 md:px-16 w-full pb-20 pt-40">
          <Reveal>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[0.02em] text-white md:text-text-primary mb-4"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            >
              SelfTrace
            </h1>
            <a
              href="https://selftrace.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-white text-sm font-sans font-medium tracking-wide hover:opacity-90 transition-opacity mb-2"
            >
              Visit SelfTrace
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-white/90 md:text-text-secondary font-light max-w-[640px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
              A reflective instrument for examining how AI-mediated environments reshape
              self-perception, memory, and the continuity of personal identity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Why this project exists ── */}
      <SuiteSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading title="Why this project exists" />
            <Reveal delay={0.05}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                Every interface that reflects you back to yourself is also shaping what you
                see. Recommendation systems, personalised feeds, AI-generated summaries of
                your behaviour — these are not mirrors. They are constructions.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                SelfTrace examines what happens to the sense of self when it is continuously
                mediated by systems that model, predict, and reflect identity back in
                optimised form. It asks how self-knowledge changes when the tools of
                self-understanding are not neutral.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                This is not a question of privacy or data ownership. It is a question about
                the integrity of self-perception under conditions of persistent algorithmic
                mediation.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src={IMAGES.selfTraceWhy}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </SuiteSection>

      {/* ── What it makes visible — with background image ── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <Image
          src={IMAGES.selfTraceAbstract}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 md:px-16">
          <div className="mb-14 md:mb-20">
            <Reveal delay={0.05}>
              <h2 className="font-display text-[1.6rem] md:text-[2.2rem] font-normal leading-[1.2] tracking-[-0.015em] text-white mb-5">
                What it makes visible
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-white/75 font-light max-w-[640px]">
                Four dimensions of mediated selfhood that operate beneath conscious awareness.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: 'Reflexive distortion', description: 'How AI-generated reflections of behaviour create feedback loops that gradually alter self-understanding — not through deception, but through selective emphasis.' },
              { title: 'Memory mediation', description: 'How algorithmically curated archives of personal history reshape what subjects remember, forget, and consider significant about their own past.' },
              { title: 'Identity coherence', description: 'How the demand for consistent digital profiles creates pressure toward a fixed self-presentation that may diverge from lived experience.' },
              { title: 'Affective calibration', description: 'How personalised environments tune emotional responses over time, shifting the baseline of what feels normal, urgent, or important.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.08 + i * 0.05}>
                <div className="p-7 md:p-9 border border-white/30 bg-white rounded-sm h-full">
                  <h3 className="font-display text-[1.15rem] md:text-[1.25rem] font-medium text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[0.9rem] leading-[1.85] text-text-tertiary font-light">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <SuiteSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden lg:order-1">
              <Image
                src={IMAGES.selfTraceHow}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <div className="lg:order-2">
            <SectionHeading title="How the instrument works" />
            <Reveal delay={0.05}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                SelfTrace is a reflective research instrument, not a diagnostic tool. It
                does not measure selfhood — it creates conditions for examining how selfhood
                is being shaped.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                Through structured reflection exercises, comparative self-assessments, and
                mediation-aware journaling, SelfTrace helps subjects and researchers trace
                the points where AI-mediated experience diverges from unmediated
                self-understanding.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                The goal is legibility — making the invisible influence of algorithmic
                mediation available for conscious examination.
              </p>
            </Reveal>
          </div>
        </div>
      </SuiteSection>

      {/* ── Why it matters ── */}
      <SuiteSection bg="surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading title="Why it matters for identity and governance" />
            <Reveal delay={0.05}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                Democratic governance assumes subjects who can know themselves well enough
                to form genuine preferences, give meaningful consent, and hold coherent
                positions over time.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                If the tools through which self-knowledge is formed are themselves shaping
                that knowledge, then the foundation of autonomous participation is not
                secure. SelfTrace does not claim this foundation is broken — but it insists
                that it must be examined.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-display text-[1.3rem] md:text-[1.5rem] font-normal leading-[1.4] tracking-[-0.01em] text-text-primary">
                The self that governs must first be able to trace itself.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src={IMAGES.selfTraceIdentity}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </SuiteSection>

      {/* ── Suite navigation ── */}
      <SuiteNav current="/selftrace" />
    </SuitePageWrapper>
  )
}
