import Image from 'next/image'
import {
  SuitePageWrapper,
  SuiteHero,
  SuiteSection,
  SectionHeading,
  ConceptCard,
  SideImagePanel,
  SuiteNav,
  SUITE_IMAGES,
} from '@/components/suite-page-layout'
import { Reveal } from '@/components/ui/reveal'

export default function NarrativeDriftPage() {
  return (
    <SuitePageWrapper>
      {/* ── Hero — atmospheric, movement-oriented ── */}
      <SuiteHero
        title="Narrative Drift"
        subtitle="An investigation into how algorithmic curation restructures personal memory, narrative coherence, and the temporal continuity required for self-governance."
        image={SUITE_IMAGES.narrativeDrift}
      />

      {/* ── Why this project exists ── */}
      <SuiteSection>
        <SectionHeading
          label="01"
          title="Why this project exists"
        />
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

      {/* ── Transition image ── */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/transition-1.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      </section>

      {/* ── What it makes visible ── */}
      <SuiteSection bg="surface">
        <SectionHeading
          label="02"
          title="What it makes visible"
          description="Five mechanisms through which algorithmic curation disrupts narrative coherence."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ConceptCard
            index={0}
            title="Salience manipulation"
            description="How algorithmic ranking determines which experiences, memories, and ideas feel important — reshaping personal narrative by controlling what rises to the surface."
          />
          <ConceptCard
            index={1}
            title="Temporal fragmentation"
            description="How feed-based information architectures break experience into disconnected moments, making it harder to sustain the narrative threads that bind identity over time."
          />
          <ConceptCard
            index={2}
            title="Preference drift"
            description="How continuous optimisation of content delivery gradually shifts what subjects want, believe, and value — not through persuasion, but through environmental pressure."
          />
          <ConceptCard
            index={3}
            title="Memory substitution"
            description="How algorithmically curated personal archives replace organic memory with platform-structured recall, altering the relationship between experience and recollection."
          />
          <ConceptCard
            index={4}
            title="Coherence erosion"
            description="How exposure to contradictory, decontextualised, and engagement-optimised content undermines the stable self-narrative that deliberation and consent require."
          />
        </div>
      </SuiteSection>

      {/* ── Research logic — with side image ── */}
      <SuiteSection>
        <SideImagePanel image={SUITE_IMAGES.narrativeDriftSection}>
          <SectionHeading
            label="03"
            title="How the research works"
          />
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

      {/* ── Interlude image ── */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/interlude.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      </section>

      {/* ── Why it matters ── */}
      <SuiteSection bg="surface">
        <SectionHeading
          label="04"
          title="Why it matters for memory and self-governance"
        />
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
