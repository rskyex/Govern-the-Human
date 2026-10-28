import {
  SuitePageWrapper,
  SuiteHero,
  SuiteSection,
  SectionHeading,
  ConceptCard,
  SuiteNav,
} from '@/components/suite-page-layout'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'
import { ObservatoryTool } from './observatory-tool'

export default function ObservatoryPage() {
  return (
    <SuitePageWrapper>
      {/* ── Hero ── */}
      <div className="print:hidden">
        <SuiteHero
          title="Ontological Governance Observatory"
          subtitle="Load results from Narrative Drift and SelfTrace and read them as a Second-Order Assessment: what the instruments recorded about how people know, how they present themselves, and how they act, set beside the provisions that address each question."
          image={IMAGES.observatory}
        />
      </div>

      {/* ── The tool ── */}
      <section className="bg-base pb-24 md:pb-36 pt-4 print:p-0" aria-labelledby="tool-title">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 md:px-16 print:px-0">
          <div className="mb-10 print:hidden">
            <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">01</p>
            <div className="w-10 h-px bg-rule mb-8" />
            <h2 id="tool-title" className="font-display text-[1.6rem] md:text-[2.2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-5">
              Run an assessment
            </h2>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light max-w-[680px]">
              The report asks one question per layer, lists the numbers each instrument produced, and gives a
              plain reading that follows from those numbers alone. Everything happens in your browser. No result
              leaves this page unless you export it.
            </p>
          </div>
          <ObservatoryTool />
        </div>
      </section>

      <div className="print:hidden">
        {/* ── Why this project exists ── */}
        <SuiteSection bg="surface">
          <SectionHeading label="02" title="Why this project exists" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <Reveal delay={0.05}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                  Governance frameworks assume a stable human subject, one who can consent, deliberate, and
                  hold systems accountable. AI systems are quietly changing the categories through which that
                  subject understands itself.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  The Observatory makes that change visible. It tracks the shifts that occur when human
                  self-understanding is shaped by systems designed to predict, classify, and optimise behaviour
                  at scale.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.12}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                  Without sustained observation of these shifts, governance stays first-order. It regulates
                  system outputs while the subject who is supposed to do the governing is reshaped underneath.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  A second-order governance watches not only what systems do, but what they do to the conditions
                  of human agency itself.
                </p>
              </Reveal>
            </div>
          </div>
        </SuiteSection>

        {/* ── What it makes visible ── */}
        <SuiteSection>
          <SectionHeading
            label="03"
            title="What it reads"
            description="Each layer of the framework is paired with one question and the instrument that can speak to it."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ConceptCard
              index={0}
              title="Epistemic: delegation"
              description="Narrative Drift records how often routine choices were handed to the system, and where the autonomy axis ended."
            />
            <ConceptCard
              index={1}
              title="Ontological: rewarded self-presentation"
              description="SelfTrace compares topics the environment rewarded and that grew with topics the person kept without reward, and tracks topic range over time."
            />
            <ConceptCard
              index={2}
              title="Political: deliberation in civic acts"
              description="Narrative Drift records whether choices in the civic encounters shortened or lengthened deliberation, and where the tempo axis ended."
            />
            <ConceptCard
              index={3}
              title="Processing: data minimisation"
              description="Results carry option indices, counts and topic labels only. The Observatory checks each file for free text and processes everything on the device."
            />
          </div>
        </SuiteSection>

        {/* ── Limits ── */}
        <SuiteSection bg="surface">
          <SectionHeading label="04" title="What the report is not" />
          <div className="max-w-[740px] space-y-7">
            <Reveal delay={0.05}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                It is not a legal or clinical assessment. Provisions are named because they address the same
                question, not to suggest that any product complies with them or breaches them.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                The results reflect what happened inside the instruments, which use simulated encounters and, in
                the examples, a fictional profile. They do not describe how a person behaves elsewhere. A reading
                says what the numbers show and stops there.
              </p>
            </Reveal>
          </div>
        </SuiteSection>

        {/* ── Suite navigation ── */}
        <SuiteNav current="/observatory" />
      </div>
    </SuitePageWrapper>
  )
}
