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
      <div className="max-w-[960px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            03
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.8rem] md:text-[2.4rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-16">
            The Suite
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {INSTRUMENTS.map((item, i) => (
            <Reveal key={item.name} delay={0.08 + i * 0.06}>
              <div className="p-7 md:p-9 border border-panel-border bg-panel backdrop-blur-sm rounded-sm h-full">
                <h3 className="font-display text-[1.2rem] md:text-[1.3rem] font-medium text-text-primary mb-4">
                  {item.name}
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
  )
}
