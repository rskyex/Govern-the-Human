'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

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
    <section id="three-layer-model" className="relative py-14 md:py-20 overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.fluidAbstract}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative max-w-[1120px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-white/50 mb-4">
            02
          </p>
          <div className="w-10 h-px bg-white/20 mb-10" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.8rem] md:text-[2.4rem] font-normal leading-[1.2] tracking-[-0.015em] text-white/95 mb-6">
            Three conditions of the governed subject.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-sans text-[0.95rem] leading-[1.9] text-white/70 font-light mb-16 max-w-[640px]">
            The human subject under AI conditions is not a fixed entity. It is
            shaped along three dimensions — each operating quietly, each altering
            the capacity for self-governance.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.title} delay={0.1 + i * 0.06}>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-sm p-7 md:p-9">
                <h3 className="font-display text-[1.3rem] md:text-[1.45rem] font-semibold text-white mb-4" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
                  {layer.title}
                </h3>
                <p className="font-sans text-[0.9rem] leading-[1.85] text-white/80 font-light">
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
