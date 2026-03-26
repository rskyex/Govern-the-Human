'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden bg-white">
      <div className="relative py-28 md:py-40">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-16 lg:gap-20">
            {/* Left — Quote */}
            <div className="text-left">
              <Reveal>
                <p className="font-display text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-[#1e3a5f] mb-8">
                  The system can be governed.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="font-display text-[1.5rem] md:text-[2.1rem] lg:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.01em] text-[#1e3a5f]/70">
                  But what governs the human it reshapes?
                </p>
              </Reveal>
            </div>

            {/* Right — Creator card */}
            <Reveal delay={0.2}>
              <div className="flex-shrink-0 w-full lg:w-[300px]">
                <Link
                  href="/creator"
                  className="block group"
                >
                  {/* CTA */}
                  <p className="font-sans text-[0.95rem] font-medium tracking-[0.08em] uppercase text-[#1e3a5f] group-hover:text-[#1e3a5f]/70 transition-colors duration-300 mb-5">
                    Creator &rarr;
                  </p>

                  {/* Thumbnail */}
                  <div className="relative w-full h-[158px] rounded-sm overflow-hidden mb-5 border border-panel-border group-hover:border-text-ghost/30 transition-all duration-300">
                    <Image
                      src="/risa-koyanagi-og.png"
                      alt="Risa Koyanagi"
                      fill
                      className="object-cover object-center"
                      sizes="300px"
                    />
                  </div>

                  {/* Name + brief intro */}
                  <p className="font-sans text-[0.95rem] font-medium tracking-[0.01em] text-text-primary mb-2 group-hover:text-[#1e3a5f] transition-colors duration-300">
                    Risa Koyanagi
                  </p>
                  <p className="font-sans text-[0.8rem] leading-[1.7] text-text-tertiary font-light">
                    Cambridge Future Scholar. Researcher in space governance, nuclear governance, strategic risk, and emerging technology governance.
                  </p>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
