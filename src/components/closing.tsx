'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'

const CARDS = [
  {
    label: 'Creator',
    href: '/creator',
    external: false,
    thumbnail: '/risa-koyanagi-og.png',
    name: 'Risa Koyanagi',
    description:
      'Cambridge Future Scholar. Researcher in space governance, nuclear governance, strategic risk, and emerging technology governance.',
  },
  {
    label: 'Sister Project: Faultline',
    href: 'https://faultline-nqmm.vercel.app/',
    external: true,
    thumbnail: '/faultline%20og.png',
    name: 'Faultline',
    description: 'The Strategic Risk Suite: mapping how orbital, nuclear, and cyber risks connect, overlap, and escalate.',
  },
  {
    label: 'Sister Project: MYTHERA',
    href: '#',
    external: false,
    thumbnail: '/mythera%20og.png',
    name: 'MYTHERA',
    description: 'The interactive mythic world of cultural and philosophical interfaces where memory, meaning, and selfhood can be explored. Coming soon.',
  },
]

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden bg-white">
      <div className="relative py-28 md:py-40">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          {/* Quote — centered */}
          <div className="text-center mb-20">
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

          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {CARDS.map((card, i) => (
              <Reveal key={card.label} delay={0.15 + i * 0.06}>
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group h-full"
                  >
                    <CardContent card={card} />
                  </a>
                ) : card.href === '#' ? (
                  <div className="block group h-full cursor-default">
                    <CardContent card={card} />
                  </div>
                ) : (
                  <Link href={card.href} className="block group h-full">
                    <CardContent card={card} />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CardContent({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <div className="border border-panel-border bg-panel rounded-sm h-full overflow-hidden transition-all duration-300 group-hover:border-text-ghost/20 group-hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[1200/630]">
        <Image
          src={card.thumbnail}
          alt={card.name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
          {card.label}
        </p>
        <p className="font-sans text-[0.95rem] font-medium tracking-[0.01em] text-text-primary mb-1 group-hover:text-[#1e3a5f] transition-colors duration-300">
          {card.name} {card.href !== '#' && <span className="text-text-ghost">&rarr;</span>}
        </p>
        {card.description && (
          <p className="font-sans text-[0.8rem] leading-[1.7] text-text-tertiary font-light">
            {card.description}
          </p>
        )}
      </div>
    </div>
  )
}
