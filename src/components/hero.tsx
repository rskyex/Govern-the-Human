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
        className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.9) 65%, #ffffff 85%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-16 pt-32 pb-24 mt-8">
        {/* Logo glyph — large, commanding */}
        <Reveal>
          <Image
            src="/logo.png"
            alt="Govern the Human"
            width={200}
            height={200}
            className="object-contain mb-14 md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]"
            priority
          />
        </Reveal>

        {/* Title — monumental */}
        <Reveal delay={0.12}>
          <h1 className="font-display text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-normal leading-[1.05] tracking-[-0.02em] text-text-primary mb-7">
            Govern <span className="italic text-text-tertiary">the Human</span>
          </h1>
        </Reveal>

        {/* Thin rule */}
        <Reveal delay={0.2}>
          <div className="w-16 h-px bg-text-ghost/25 mb-7" />
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.26}>
          <p className="font-sans text-[0.95rem] md:text-[1.05rem] leading-[1.8] text-text-tertiary font-light max-w-[560px]">
            On second-order AI governance, subject formation, and the
            conditions of self-governance under AI-mediated environments.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
