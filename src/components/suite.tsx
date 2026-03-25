'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

const INSTRUMENTS = [
  {
    name: 'Ontological Governance Observatory',
    description:
      'A diagnostic framework for tracking how AI systems alter the categories of agency, identity, and selfhood that governance presupposes.',
    href: '/observatory',
  },
  {
    name: 'SelfTrace',
    description:
      'A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity.',
    href: '/selftrace',
  },
  {
    name: 'Narrative Drift',
    description:
      'An investigation into how algorithmic curation restructures personal memory, narrative coherence, and the temporal continuity required for self-governance.',
    href: '/narrative-drift',
  },
]

export function Suite() {
  return (
    <section id="the-suite" className="relative overflow-hidden">
      {/* Subtle panoramic background — faded atmospheric layer */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.suitePanoramic}
          alt=""
          fill
          className="object-cover object-center opacity-[0.05]"
          sizes="100vw"
        />
      </div>

      <div className="relative bg-base/95 py-36 md:py-48">
        <div className="max-w-[1100px] mx-auto px-8 md:px-16">
          <Reveal>
            <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
              03
            </p>
            <div className="w-10 h-px bg-rule mb-10" />
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-[1.8rem] md:text-[2.4rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-6">
              The Suite
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-16 max-w-[640px]">
              Three research instruments — each examining a distinct dimension of how AI systems
              reshape the human subject that governance presupposes.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {INSTRUMENTS.map((item, i) => (
              <Reveal key={item.name} delay={0.1 + i * 0.06}>
                <a
                  href={item.href}
                  className="block p-7 md:p-9 border border-panel-border bg-panel/80 backdrop-blur-sm rounded-sm h-full group transition-all duration-300 hover:border-text-ghost/20 hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                >
                  <h3 className="font-display text-[1.2rem] md:text-[1.3rem] font-medium text-text-primary mb-4 group-hover:text-text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-sans text-[0.9rem] leading-[1.85] text-text-tertiary font-light mb-6">
                    {item.description}
                  </p>
                  <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-ghost group-hover:text-text-secondary transition-colors duration-300">
                    Explore &rarr;
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
