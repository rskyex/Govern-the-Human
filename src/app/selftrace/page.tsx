import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'SelfTrace | Govern the Human',
  description:
    'A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity.',
  openGraph: {
    title: 'SelfTrace — Govern the Human',
    description:
      'A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity.',
    images: [{ url: '/govern the human og.png', width: 1200, height: 630 }],
  },
}

export default function SelfTracePage() {
  return (
    <SuitePageWrapper>
      {/* ── Hero — quieter, more intimate ── */}
      <SuiteHero
        title="SelfTrace"
        subtitle="A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity."
        image={SUITE_IMAGES.selftrace}
      />

      {/* ── Why this project exists ── */}
      <SuiteSection>
        <SectionHeading
          title="Why this project exists"
        />
        <div className="max-w-[740px]">
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
      </SuiteSection>

      {/* ── What it makes visible ── */}
      <SuiteSection bg="surface">
        <SectionHeading
          title="What it makes visible"
          description="Four dimensions of mediated selfhood that operate beneath conscious awareness."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <ConceptCard
            index={0}
            title="Reflexive distortion"
            description="How AI-generated reflections of behaviour create feedback loops that gradually alter self-understanding — not through deception, but through selective emphasis."
          />
          <ConceptCard
            index={1}
            title="Memory mediation"
            description="How algorithmically curated archives of personal history reshape what subjects remember, forget, and consider significant about their own past."
          />
          <ConceptCard
            index={2}
            title="Identity coherence"
            description="How the demand for consistent digital profiles creates pressure toward a fixed self-presentation that may diverge from lived experience."
          />
          <ConceptCard
            index={3}
            title="Affective calibration"
            description="How personalised environments tune emotional responses over time, shifting the baseline of what feels normal, urgent, or important."
          />
        </div>
      </SuiteSection>

      {/* ── How it works — with side image ── */}
      <SuiteSection>
        <SideImagePanel image={SUITE_IMAGES.selftraceSection} imagePosition="left">
          <SectionHeading
            title="How the instrument works"
          />
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
        </SideImagePanel>
      </SuiteSection>

      {/* ── Why it matters ── */}
      <SuiteSection bg="surface">
        <SectionHeading
          title="Why it matters for identity and governance"
        />
        <div className="max-w-[740px]">
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
      </SuiteSection>

      {/* ── Suite navigation ── */}
      <SuiteNav current="/selftrace" />
    </SuitePageWrapper>
  )
}
