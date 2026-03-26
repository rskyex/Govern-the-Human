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
  title: 'Ontological Governance Observatory | Govern the Human',
  description:
    'A diagnostic framework for tracking how AI systems alter the foundational categories — agency, identity, selfhood — that governance presupposes.',
  openGraph: {
    title: 'Ontological Governance Observatory — Govern the Human',
    description:
      'A diagnostic framework for tracking how AI systems alter the foundational categories — agency, identity, selfhood — that governance presupposes.',
    images: [{ url: '/govern the human og.png', width: 1200, height: 630 }],
  },
}

export default function ObservatoryPage() {
  return (
    <SuitePageWrapper>
      {/* ── Hero ── */}
      <SuiteHero
        title="Ontological Governance Observatory"
        subtitle="A diagnostic framework for tracking how AI systems alter the foundational categories — agency, identity, selfhood — that governance presupposes but never examines."
        image={SUITE_IMAGES.observatory}
      />

      {/* ── Why this project exists ── */}
      <SuiteSection>
        <SectionHeading
          title="Why this project exists"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Reveal delay={0.05}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                Governance frameworks assume a stable human subject — one who can consent,
                deliberate, and hold systems accountable. But AI systems are quietly
                transforming the very categories through which that subject understands
                itself.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                The Observatory exists to make this transformation visible. It tracks the
                ontological shifts that occur when human self-understanding is shaped by
                systems designed to predict, classify, and optimise behaviour at scale.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.12}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                Without sustained observation of these shifts, governance remains
                first-order — regulating system outputs while the subject who is supposed
                to do the governing is being reshaped underneath.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                The Observatory provides the conceptual infrastructure for a second-order
                governance: one that watches not only what systems do, but what they do to
                the conditions of human agency itself.
              </p>
            </Reveal>
          </div>
        </div>
      </SuiteSection>

      {/* ── What it makes visible ── */}
      <SuiteSection bg="surface">
        <SectionHeading
          title="What it makes visible"
          description="Five categories of ontological transformation that current governance frameworks do not track."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ConceptCard
            index={0}
            title="Agency displacement"
            description="How predictive systems pre-empt choice, shifting the locus of decision from the subject to the model — while maintaining the appearance of autonomy."
          />
          <ConceptCard
            index={1}
            title="Identity classification"
            description="How AI-driven categorisation creates fixed identity positions that subjects begin to inhabit, narrowing the space of self-definition."
          />
          <ConceptCard
            index={2}
            title="Selfhood mediation"
            description="How interfaces designed to reflect the user back to themselves produce a version of selfhood optimised for engagement rather than coherence."
          />
          <ConceptCard
            index={3}
            title="Temporal compression"
            description="How real-time feedback loops collapse the deliberative distance that governance, consent, and reflection require."
          />
          <ConceptCard
            index={4}
            title="Normative drift"
            description="How continuous exposure to AI-curated environments gradually shifts what subjects accept as normal, desirable, or possible — without discrete moments of change."
          />
        </div>
      </SuiteSection>

      {/* ── Research logic ── */}
      <SuiteSection>
        <SideImagePanel image={SUITE_IMAGES.observatorySection}>
          <SectionHeading
            title="How the Observatory works"
          />
          <Reveal delay={0.05}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              The Observatory operates as a long-term diagnostic instrument. It does not
              propose policy or evaluate specific AI products. Instead, it maintains a
              sustained, structured observation of the ontological conditions under which
              governance takes place.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              Its outputs are conceptual maps, analytical frameworks, and periodic
              assessments — designed for researchers, institutions, and governance bodies
              that need to understand the subject-level implications of AI deployment.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
              The goal is not to alarm, but to provide the intellectual infrastructure
              for governance that takes its own foundations seriously.
            </p>
          </Reveal>
        </SideImagePanel>
      </SuiteSection>

      {/* ── Why it matters ── */}
      <SuiteSection bg="surface">
        <SectionHeading
          title="Why it matters for governance"
        />
        <div className="max-w-[740px]">
          <Reveal delay={0.05}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              If the human subject is not a stable foundation but a dynamic entity being
              reshaped by the systems it encounters, then governance frameworks that assume
              stability are structurally incomplete.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              The Observatory does not replace first-order governance. It provides the
              missing second layer — the one that asks whether the subject who is supposed
              to govern, consent, and resist is still in a position to do so.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="font-display text-[1.3rem] md:text-[1.5rem] font-normal leading-[1.4] tracking-[-0.01em] text-text-primary">
              Governance without ontology is governance without ground.
            </p>
          </Reveal>
        </div>
      </SuiteSection>

      {/* ── Suite navigation ── */}
      <SuiteNav current="/observatory" />
    </SuitePageWrapper>
  )
}
