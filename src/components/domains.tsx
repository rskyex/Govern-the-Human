'use client'

import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

const DOMAINS = [
  {
    number: '01',
    title: 'Subject Formation',
    description:
      'How AI-mediated environments shape identity, preference, and self-understanding. The subject who enters the system is not the subject who exits it.',
  },
  {
    number: '02',
    title: 'Memory & Narrative Identity',
    description:
      'How algorithmic curation restructures personal memory, narrative coherence, and the temporal continuity required for selfhood.',
  },
  {
    number: '03',
    title: 'Epistemic Conditions',
    description:
      'How AI systems alter what counts as knowledge, evidence, and justified belief — reshaping the ground on which democratic judgement depends.',
  },
  {
    number: '04',
    title: 'Ontological Conditions',
    description:
      'How persistent AI interaction modifies the categories through which we understand agency, autonomy, and what it means to be a human subject.',
  },
  {
    number: '05',
    title: 'Political Conditions',
    description:
      'How AI-mediated attention, deliberation, and preference formation restructure the conditions for democratic participation and collective self-governance.',
  },
  {
    number: '06',
    title: 'Self-Governance',
    description:
      'The reflexive capacity to recognise, evaluate, and resist one\'s own transformation — the condition without which external governance loses its anchor.',
  },
]

export function Domains() {
  return (
    <section id="domains" className="relative py-28 md:py-40 bg-surface">
      <div className="max-w-[960px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>Research Domains</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.3] tracking-[-0.01em] text-text-primary mb-16 max-w-[600px]">
            Six domains of inquiry into the human subject under AI conditions.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {DOMAINS.map((domain, i) => (
            <Reveal key={domain.number} delay={0.05 + i * 0.04}>
              <article className="group">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-sans text-[11px] font-medium tracking-[0.15em] text-text-ghost">
                    {domain.number}
                  </span>
                  <h3 className="font-display text-[1.2rem] md:text-[1.35rem] font-normal text-text-primary italic">
                    {domain.title}
                  </h3>
                </div>
                <div className="w-full h-px bg-rule mb-4" />
                <p className="font-sans text-[0.85rem] leading-[1.8] text-text-tertiary font-light">
                  {domain.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
