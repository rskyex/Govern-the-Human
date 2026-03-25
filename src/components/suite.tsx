'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

const INSTRUMENTS = [
  {
    name: 'Ontological Governance Observatory',
    slug: '/observatory',
    description:
      'A diagnostic framework for tracking how AI systems alter the categories of agency, identity, and selfhood that governance presupposes.',
  },
  {
    name: 'SelfTrace',
    slug: '/selftrace',
    description:
      'A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity.',
  },
  {
    name: 'Narrative Drift',
    slug: '/narrative-drift',
    description:
      'An investigation into how algorithmic curation restructures personal memory, narrative coherence, and the temporal continuity required for self-governance.',
  },
]

export function Suite() {
  return (
    <section id="the-suite" className="bg-base py-36 md:py-48">
      <div className="max-w-[1120px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            03
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex items-start gap-5 mb-6">
            <div
              className="hidden md:block flex-shrink-0 w-[4px] min-h-[40px] self-stretch rounded-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
              }}
            >
              <Image
                src={IMAGES.suitePanoramic}
                alt=""
                fill
                className="object-cover opacity-50"
                sizes="4px"
              />
            </div>
            <h2 className="font-display text-[1.8rem] md:text-[2.4rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary">
              The Suite
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-sans text-[0.95rem] leading-[1.9] text-text-subtitle font-light mb-16 max-w-[640px]">
            Three research instruments — each examining a different dimension of how AI
            systems reshape the human subject they are meant to serve.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {INSTRUMENTS.map((item, i) => (
            <Reveal key={item.name} delay={0.08 + i * 0.06}>
              <Link href={item.slug} className="block group h-full">
                <div className="p-7 md:p-9 border border-panel-border bg-panel backdrop-blur-sm rounded-sm h-full transition-all duration-300 group-hover:border-text-ghost/20 group-hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                  <h3 className="font-display text-[1.2rem] md:text-[1.3rem] font-medium text-text-primary mb-4">
                    {item.name}
                  </h3>
                  <p className="font-sans text-[0.9rem] leading-[1.85] text-text-tertiary font-light mb-6">
                    {item.description}
                  </p>
                  <span className="font-sans text-[12px] tracking-[0.06em] text-text-ghost group-hover:text-text-secondary transition-colors duration-300">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
