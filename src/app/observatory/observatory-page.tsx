'use client'

import { Reveal } from '@/components/ui/reveal'
import { SuitePageShell, SuitePageHero, SuitePageSection } from '@/components/suite-page-layout'
import { IMAGES } from '@/lib/images'

const DIMENSIONS = [
  {
    title: 'Category Displacement',
    description:
      'Tracking how AI systems silently replace human categories of understanding — agency, intention, responsibility — with computational proxies that governance still assumes are stable.',
  },
  {
    title: 'Subject-Formation Under Automation',
    description:
      'Examining how sustained AI interaction reshapes the human subject itself — not just what it knows or does, but what it understands itself to be.',
  },
  {
    title: 'Institutional Ontology Audit',
    description:
      'Mapping where governance institutions rely on assumptions about human capacities (deliberation, consent, autonomy) that AI systems are actively transforming.',
  },
  {
    title: 'Governance Presupposition Analysis',
    description:
      'Identifying the gap between the human subject governance frameworks presuppose and the human subject that actually exists under AI conditions.',
  },
]

export function ObservatoryPage() {
  return (
    <SuitePageShell>
      <SuitePageHero
        number="Suite / 01"
        title="Ontological Governance Observatory"
        subtitle="A diagnostic framework for tracking how AI systems alter the categories of agency, identity, and selfhood that governance presupposes."
        imageSrc={IMAGES.observatory}
        imageOpacity={0.15}
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
              Governance frameworks regulate AI systems. But they do not track what those systems do to the categories governance depends on.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-6">
              Every governance framework assumes a human subject capable of deliberation, consent, and autonomous judgement. These capacities are not being destroyed — they are being quietly restructured by the same systems governance seeks to regulate.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
              The Observatory exists to make this restructuring visible — not as a crisis narrative, but as a diagnostic practice. It tracks the ontological conditions of the governed subject, so that governance can account for what it currently takes for granted.
            </p>
          </Reveal>
        </div>
      </SuitePageSection>

      {/* What it makes visible */}
      <SuitePageSection background="surface">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            What it makes visible
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-14">
            Four diagnostic dimensions
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {DIMENSIONS.map((dim, i) => (
            <Reveal key={dim.title} delay={0.08 + i * 0.05}>
              <div className="p-7 border border-panel-border bg-panel/60 rounded-sm">
                <h3 className="font-display text-[1.15rem] md:text-[1.25rem] font-medium text-text-primary mb-4">
                  {dim.title}
                </h3>
                <p className="font-sans text-[0.9rem] leading-[1.85] text-text-tertiary font-light">
                  {dim.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </SuitePageSection>

      {/* Research logic */}
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
              How the Observatory operates
            </h2>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Diagnostic, not prescriptive
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  The Observatory does not propose policy. It produces the conceptual diagnostics that policy would need to take seriously — the transformations in human selfhood, agency, and institutional capacity that current governance cannot yet see.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Ontological, not behavioural
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  It does not measure what people do with AI. It examines what categories of being, knowing, and acting are silently shifting beneath the surface of everyday AI interaction — and what this means for the foundations of governance.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Institutional scale
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  The Observatory is designed to operate at the scale of institutions, not individuals. It asks how entire governance frameworks — democratic, regulatory, juridical — are built on assumptions about the human that may no longer hold.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SuitePageSection>

      {/* Why it matters */}
      <SuitePageSection background="surface">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <p className="font-display text-[1.6rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary mb-8">
              If governance does not account for how AI reshapes the subject it governs, it governs a fiction.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-tertiary font-light">
              The Observatory makes this gap visible — so that governance can begin to close it.
            </p>
          </Reveal>
        </div>
      </SuitePageSection>
    </SuitePageShell>
  )
}
