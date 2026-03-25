'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { IMAGES } from '@/lib/images'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Hero world — full bleed background */}
      <Image
        src={IMAGES.hero}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark scrim for text legibility */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Bottom gradient dissolve into white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0.92) 70%, #ffffff 90%)',
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
            className="object-contain mb-14 md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
            priority
          />
        </Reveal>

        {/* Title — monumental two-line lockup */}
        <Reveal delay={0.12}>
          <h1
            className="font-display font-semibold uppercase leading-[0.95] tracking-[0.06em] text-white mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              textShadow: '0 2px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)',
            }}
          >
            <span className="block">Govern</span>
            <span className="block text-[0.6em] tracking-[0.14em] mt-1">the</span>
            <span className="block">Human</span>
          </h1>
        </Reveal>

        {/* Thin rule */}
        <Reveal delay={0.2}>
          <div className="w-16 h-px bg-white/40 mb-8" />
        </Reveal>

        {/* Supporting line — clear and immediate */}
        <Reveal delay={0.26}>
          <p
            className="font-display text-[1.1rem] md:text-[1.25rem] leading-[1.8] text-[#1e3a5f] font-light max-w-[560px] italic"
          >
            AI governance asks what systems do. This project asks what they do to the human subject.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
