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

        {/* Title — monumental two-line lockup */}
        <Reveal delay={0.12}>
          <h1
            className="font-display font-semibold uppercase leading-[0.95] tracking-[0.06em] text-text-primary mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              textShadow: '0 1px 2px rgba(0,0,0,0.06)',
            }}
          >
            <span className="block">Govern</span>
            <span className="block text-[0.6em] tracking-[0.14em] mt-1">the</span>
            <span className="block">Human</span>
          </h1>
        </Reveal>

        {/* Thin rule */}
        <Reveal delay={0.2}>
          <div className="w-16 h-px bg-text-ghost/25 mb-8" />
        </Reveal>

        {/* Supporting line — clear and immediate */}
        <Reveal delay={0.26}>
          <p className="font-sans text-[0.95rem] md:text-[1.08rem] leading-[1.8] text-text-secondary font-light max-w-[560px]">
            AI governance asks what systems do. This project asks what they do to the human subject.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
