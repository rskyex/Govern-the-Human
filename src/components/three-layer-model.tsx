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
    <section id="three-layer-model" className="relative bg-surface py-36 md:py-48 overflow-hidden">
      {/* Architectural side strip — left margin */}
      <div
        className="hidden lg:block absolute top-24 left-0 w-[50px] xl:w-[70px] bottom-24 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)',
        }}
      >
        <Image
          src={IMAGES.selfTrace}
          alt=""
          fill
          className="object-cover object-center opacity-35"
          sizes="70px"
        />
      </div>

      <div className="relative max-w-[1120px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            02
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
                src={IMAGES.selfTrace}
                alt=""
                fill
                className="object-cover opacity-50"
                sizes="4px"
              />
            </div>
            <h2 className="font-display text-[1.8rem] md:text-[2.4rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary">
              Three conditions of the governed subject.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-sans text-[0.95rem] leading-[1.9] text-text-subtitle font-light mb-16 max-w-[640px]">
            The human subject under AI conditions is not a fixed entity. It is
            shaped along three dimensions — each operating quietly, each altering
            the capacity for self-governance.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.title} delay={0.1 + i * 0.06}>
              <div>
                <h3 className="font-display text-[1.3rem] md:text-[1.45rem] font-medium text-text-primary mb-4">
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
