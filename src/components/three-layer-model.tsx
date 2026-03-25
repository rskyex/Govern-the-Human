'use client'

import { Reveal } from '@/components/ui/reveal'

const LAYERS = [
  {
    title: 'Epistemic',
    description:
      'How AI systems alter what counts as knowledge, evidence, and justified belief — reshaping the ground on which democratic judgement depends.',
  },
  {
    title: 'Ontological',
    description:
      'How persistent AI interaction modifies the categories through which we understand agency, autonomy, and what it means to be a human subject.',
  },
  {
    title: 'Political',
    description:
      'How AI-mediated attention, deliberation, and preference formation restructure the conditions for democratic participation and collective self-governance.',
  },
]

export function ThreeLayerModel() {
  return (
    <section id="three-layer-model" className="bg-surface py-36 md:py-48">
      <div className="max-w-[960px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            02
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.8rem] md:text-[2.4rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-6">
            Three conditions of the governed subject.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-16 max-w-[640px]">
            The human subject under AI conditions is not a fixed entity. It is
            shaped along three dimensions — each operating quietly, each altering
            the capacity for self-governance.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.title} delay={0.1 + i * 0.06}>
              <div>
                <h3 className="font-display text-[1.3rem] md:text-[1.45rem] italic font-normal text-text-primary mb-4">
                  {layer.title}
                </h3>
                <p className="font-sans text-[0.9rem] leading-[1.85] text-text-tertiary font-light">
                  {layer.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
