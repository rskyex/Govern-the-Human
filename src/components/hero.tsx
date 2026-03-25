'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Hero world — full bleed background */}
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Bottom gradient dissolve into white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.85) 70%, #ffffff)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 pt-20 pb-32">
        {/* Logo glyph — moderate scale, part of the world */}
        <Reveal>
          <Image
            src="/logo.png"
            alt="Govern the Human"
            width={160}
            height={160}
            className="object-contain mb-10 md:w-[200px] md:h-[200px]"
            priority
          />
        </Reveal>

        {/* Title */}
        <Reveal delay={0.12}>
          <h1 className="font-display text-[2.4rem] md:text-[3.4rem] lg:text-[4rem] font-normal leading-[1.08] tracking-[-0.02em] text-text-primary mb-5">
            Govern <span className="italic text-text-tertiary">the Human</span>
          </h1>
        </Reveal>

        {/* Thin rule */}
        <Reveal delay={0.2}>
          <div className="w-10 h-px bg-text-ghost/30 mb-5" />
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.26}>
          <p className="font-sans text-[0.88rem] md:text-[0.95rem] leading-[1.75] text-text-tertiary font-light max-w-[460px]">
            On second-order AI governance, subject formation, and the
            conditions of self-governance under AI-mediated environments.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
