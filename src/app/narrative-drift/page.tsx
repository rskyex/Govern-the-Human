import Image from 'next/image'
import Link from 'next/link'
import {
  SuitePageWrapper,
  SuiteSection,
  SectionHeading,
  SideImagePanel,
  SuiteNav,
} from '@/components/suite-page-layout'
import { Reveal } from '@/components/ui/reveal'

export default function NarrativeDriftPage() {
  return (
    <SuitePageWrapper>
      {/* ── Hero — full-bleed background like Home ── */}
      <section className="relative min-h-[70svh] flex items-end overflow-hidden">
        <Image
          src="/narrative drift hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.65) 100%)',
          }}
        />
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 md:px-16 w-full pb-20 pt-40">
          <Reveal>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[0.02em] text-white mb-6"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                textShadow: '0 2px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)',
              }}
            >
              Narrative Drift
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-white/85 font-light max-w-[640px]"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
            >
              An investigation into how algorithmic curation restructures personal
              memory, narrative coherence, and the temporal continuity required for
              self-governance.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="https://narrative-drift.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white/15 backdrop-blur-sm border border-white/30 rounded-sm font-sans text-[0.95rem] tracking-[0.04em] text-white hover:bg-white/25 transition-all duration-300"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
            >
              Experience Narrative Drift
              <span className="text-[1.1rem]">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Why this project exists ── */}
      <SuiteSection>
        <SectionHeading title="Why this project exists" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Reveal delay={0.05}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                To govern yourself, you need a story that holds together. You need to
                recognise your past decisions as your own, understand your present
                commitments, and project coherent intentions into the future.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                Narrative Drift investigates what happens to this continuity when the
                informational environment is no longer stable — when what you see, remember,
                and consider important is being continuously reshaped by systems optimised
                for engagement rather than coherence.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.12}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                The drift is not sudden. It does not announce itself. It operates through
                gradual shifts in salience — what gets surfaced, what gets buried, what
                gets repeated until it feels like memory.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                This project makes those shifts visible and asks what they mean for the
                kind of temporal self-continuity that democratic participation requires.
              </p>
            </Reveal>
          </div>
        </div>
      </SuiteSection>

      {/* ── Transition divider ── */}
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="/transition-1.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      </section>

      {/* ── How the research works — with interlude image ── */}
      <SuiteSection>
        <SideImagePanel image="/interlude.png">
          <SectionHeading title="How the research works" />
          <Reveal delay={0.05}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              Narrative Drift combines longitudinal observation with conceptual analysis.
              It tracks how individuals&apos; self-reported narratives, preferences, and sense
              of continuity shift under different conditions of algorithmic mediation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              The research does not assume that all drift is harmful. Some reconfiguration
              of narrative is natural and healthy. The question is whether the drift is
              self-directed or externally induced — and whether the subject can tell the
              difference.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
              The outputs are analytical frameworks, case studies, and conceptual tools
              for distinguishing between organic narrative evolution and algorithmically
              induced drift.
            </p>
          </Reveal>
        </SideImagePanel>
      </SuiteSection>

      {/* ── What it makes visible — with background image ── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <Image
          src="/narrative drift-1.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 md:px-16">
          <div className="mb-14 md:mb-20">
            <Reveal delay={0.05}>
              <h2 className="font-display text-[1.6rem] md:text-[2.2rem] font-normal leading-[1.2] tracking-[-0.015em] text-white mb-5">
                What it makes visible
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-white/75 font-light max-w-[640px]">
                Five mechanisms through which algorithmic curation disrupts narrative coherence.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Salience manipulation',
                description:
                  'How algorithmic ranking determines which experiences, memories, and ideas feel important — reshaping personal narrative by controlling what rises to the surface.',
              },
              {
                title: 'Temporal fragmentation',
                description:
                  'How feed-based information architectures break experience into disconnected moments, making it harder to sustain the narrative threads that bind identity over time.',
              },
              {
                title: 'Preference drift',
                description:
                  'How continuous optimisation of content delivery gradually shifts what subjects want, believe, and value — not through persuasion, but through environmental pressure.',
              },
              {
                title: 'Memory substitution',
                description:
                  'How algorithmically curated personal archives replace organic memory with platform-structured recall, altering the relationship between experience and recollection.',
              },
              {
                title: 'Coherence erosion',
                description:
                  'How exposure to contradictory, decontextualised, and engagement-optimised content undermines the stable self-narrative that deliberation and consent require.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={0.08 + i * 0.05}>
                <div className="p-7 md:p-9 bg-white rounded-sm h-full">
                  <h3 className="font-display text-[1.15rem] md:text-[1.25rem] font-medium text-[#1e3a5f] mb-3">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[0.9rem] leading-[1.85] text-[#1e3a5f]/75 font-light">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <SuiteSection bg="surface">
        <SectionHeading title="Why it matters for memory and self-governance" />
        <div className="max-w-[740px]">
          <Reveal delay={0.05}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              Self-governance is not only a matter of present rationality. It depends on
              temporal continuity — the ability to hold a coherent narrative across time,
              to remember what you committed to, and to recognise your future self as
              someone you are responsible for.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              If that continuity is being disrupted by the same information systems that
              mediate public life, then the conditions for democratic participation are
              not merely threatened by misinformation — they are structurally undermined
              at the level of the self.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="font-display text-[1.3rem] md:text-[1.5rem] font-normal leading-[1.4] tracking-[-0.01em] text-text-primary">
              A subject that cannot hold its own story cannot govern itself.
            </p>
          </Reveal>
        </div>
      </SuiteSection>

      {/* ── Suite navigation ── */}
      <SuiteNav current="/narrative-drift" />
    </SuitePageWrapper>
  )
}
