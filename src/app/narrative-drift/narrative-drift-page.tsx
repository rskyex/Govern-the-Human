'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { SuitePageShell, SuitePageHero, SuitePageSection } from '@/components/suite-page-layout'
import { IMAGES } from '@/lib/images'

const DIMENSIONS = [
  {
    title: 'Temporal Reconfiguration',
    description:
      'How algorithmic feeds restructure the experience of time — compressing history, amplifying the present, and dissolving the narrative arc that connects past self to future intention.',
  },
  {
    title: 'Memory Displacement',
    description:
      'How platform-curated recall replaces organic memory with algorithmically surfaced fragments — changing not just what we remember, but the structure of remembering itself.',
  },
  {
    title: 'Narrative Coherence Erosion',
    description:
      'How continuous exposure to recommendation-driven content gradually fragments the internal storyline through which subjects understand their own lives, choices, and commitments.',
  },
  {
    title: 'Preference Archaeology',
    description:
      'Excavating the layers of algorithmic influence beneath what subjects experience as autonomous choice — revealing how preferences drift under sustained curation pressure.',
  },
  {
    title: 'Atmospheric Governance',
    description:
      'How narrative drift operates not through explicit commands but through environmental pressure — the slow, ambient reshaping of attention, salience, and the boundaries of what feels thinkable.',
  },
]

export function NarrativeDriftPage() {
  return (
    <SuitePageShell>
      <SuitePageHero
        number="Suite / 03"
        title="Narrative Drift"
        subtitle="An investigation into how algorithmic curation restructures personal memory, narrative coherence, and the temporal continuity required for self-governance."
        imageSrc={IMAGES.narrativeDrift}
        imageOpacity={0.12}
      />

      {/* Why this project exists */}
      <SuitePageSection>
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            The problem
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <div className="max-w-[720px]">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-8">
              Self-governance requires narrative continuity. Algorithmic environments are quietly dissolving it.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-6">
              To govern oneself — to make commitments, hold values, consent meaningfully — requires a coherent sense of who one has been and who one is becoming. This temporal continuity is not given; it is constructed through memory, narrative, and the ongoing work of self-interpretation.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
              Algorithmic curation systems intervene precisely in this process. They reshape what is salient, what is remembered, what feels continuous. The drift is not sudden — it is gradual, atmospheric, and largely invisible to the subject experiencing it.
            </p>
          </Reveal>
        </div>
      </SuitePageSection>

      {/* What it makes visible — with atmospheric image band */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.fluidAbstract}
            alt=""
            fill
            className="object-cover object-center opacity-[0.05]"
            sizes="100vw"
          />
        </div>
        <div className="relative bg-surface/92 py-24 md:py-36">
          <div className="max-w-[960px] mx-auto px-8 md:px-16">
            <Reveal>
              <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
                What it makes visible
              </p>
              <div className="w-10 h-px bg-rule mb-10" />
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-14">
                Five dimensions of narrative drift
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {DIMENSIONS.map((dim, i) => (
                <Reveal key={dim.title} delay={0.08 + i * 0.04}>
                  <div className={`p-7 border border-panel-border bg-panel/60 rounded-sm ${i === DIMENSIONS.length - 1 && DIMENSIONS.length % 2 !== 0 ? 'md:col-span-2 md:max-w-[calc(50%-1.25rem)]' : ''}`}>
                    <h3 className="font-display text-[1.1rem] md:text-[1.2rem] font-medium text-text-primary mb-3">
                      {dim.title}
                    </h3>
                    <p className="font-sans text-[0.88rem] leading-[1.85] text-text-tertiary font-light">
                      {dim.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transition image */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={IMAGES.narrativeDriftTransition}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      </section>

      {/* How the experience works */}
      <SuitePageSection>
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            Research logic
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <div className="max-w-[720px]">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-8">
              How Narrative Drift operates
            </h2>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Experiential, not statistical
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  Narrative Drift does not measure engagement metrics or scroll depth. It examines the phenomenological experience of living within algorithmically curated environments — the felt sense of temporal continuity being restructured.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Atmospheric, not episodic
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  The drift it tracks is not a single event but an ambient condition — the slow, continuous reshaping of salience, attention, and narrative coherence that defines life under algorithmic curation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Governance-relevant
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  If narrative continuity is a precondition for meaningful consent and democratic participation, then its erosion is not merely a personal loss — it is a governance problem. Narrative Drift makes this connection explicit.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SuitePageSection>

      {/* Interlude image */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={IMAGES.narrativeDriftInterlude}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      </section>

      {/* Why it matters */}
      <SuitePageSection background="surface">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <p className="font-display text-[1.6rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary mb-8">
              A subject that cannot sustain its own narrative cannot govern itself. This is not a metaphor — it is a structural condition of algorithmic life.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-tertiary font-light">
              Narrative Drift makes this condition visible, traceable, and available for governance.
            </p>
          </Reveal>
        </div>
      </SuitePageSection>
    </SuitePageShell>
  )
}
