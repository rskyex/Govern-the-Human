'use client'

import { Reveal } from '@/components/ui/reveal'

const INSTRUMENTS = [
  {
    name: 'Ontological Governance Observatory',
    description:
      'A diagnostic framework for tracking how AI systems alter the categories of agency, identity, and selfhood that governance presupposes.',
  },
  {
    name: 'Narrative Drift',
    description:
      'An investigation into how algorithmic curation restructures personal memory, narrative coherence, and the temporal continuity required for self-governance.',
  },
  {
    name: 'The Platformed Self',
    description:
      'A study of how platform architectures shape preference formation, attention, and the conditions under which subjects understand themselves as autonomous.',
  },
]

export function Suite() {
  return (
    <section id="the-suite" className="bg-base py-36 md:py-48">
      <div className="max-w-[680px] mx-auto px-6 md:px-12">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            03
          </p>
          <div className="w-8 h-px bg-rule mb-8" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.5rem] md:text-[1.9rem] font-normal leading-[1.3] tracking-[-0.01em] text-text-primary mb-14">
            The Suite
          </h2>
        </Reveal>

        <div className="space-y-12">
          {INSTRUMENTS.map((item, i) => (
            <Reveal key={item.name} delay={0.08 + i * 0.05}>
              <div className="p-6 md:p-8 border border-panel-border bg-panel backdrop-blur-sm rounded-sm">
                <h3 className="font-display text-[1.1rem] md:text-[1.2rem] italic font-normal text-text-primary mb-3">
                  {item.name}
                </h3>
                <p className="font-sans text-[0.85rem] leading-[1.85] text-text-tertiary font-light">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
