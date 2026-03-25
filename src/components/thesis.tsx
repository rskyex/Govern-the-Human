'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

export function Thesis() {
  return (
    <section id="thesis" className="relative bg-base py-20 md:py-28 overflow-hidden">
      {/* Architectural side strip — right margin */}
      <div
        className="hidden lg:block absolute top-16 right-0 w-[60px] xl:w-[80px] bottom-16 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.18) 0%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.18) 0%, transparent 100%)',
        }}
      >
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          className="object-cover object-center opacity-40"
          sizes="80px"
        />
      </div>

      <div className="relative max-w-[1120px] mx-auto px-8 md:px-16">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            01
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <div className="max-w-[740px]">
          {/* Central question — with narrow image motif */}
          <Reveal delay={0.05}>
            <div className="flex items-start gap-5 mb-10">
              {/* Thin architectural shard beside heading */}
              <div
                className="hidden md:block flex-shrink-0 w-[4px] min-h-[80px] self-stretch rounded-full overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                }}
              >
                <Image
                  src={IMAGES.observatory}
                  alt=""
                  fill
                  className="object-cover opacity-50"
                  sizes="4px"
                />
              </div>
              <h2 className="font-display text-[2rem] md:text-[2.6rem] lg:text-[3rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary">
                How does sustained interaction with AI systems reshape the human subject who is meant to govern, consent, resist, or deliberate?
              </h2>
            </div>
          </Reveal>

          {/* Supporting context */}
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              AI governance addresses what systems do. It does not yet address what they do to the human who encounters them.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
              Current governance frameworks regulate AI outputs, enforce fairness
              constraints, and manage systemic risks. These are necessary. But they
              operate on a single plane: the behaviour of the system itself.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
              If the subject is being transformed by the very systems it is supposed to
              oversee, then governance without a theory of the subject is governance of
              a moving target — by a moving governor.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
