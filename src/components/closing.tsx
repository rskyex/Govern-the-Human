'use client'

import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden bg-white">
      <div className="relative py-28 md:py-40">
        <div className="max-w-[960px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-center md:items-end md:justify-between gap-10">
            <div className="text-center md:text-left">
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

            <Reveal delay={0.2}>
              <Link
                href="/creator"
                className="flex-shrink-0 font-sans text-[13px] tracking-[0.04em] text-[#1e3a5f]/50 hover:text-[#1e3a5f] transition-colors duration-300 whitespace-nowrap pb-1"
              >
                Creator &rarr;
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
