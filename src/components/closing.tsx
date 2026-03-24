'use client'

import { Reveal } from '@/components/ui/reveal'
import { GlassSphere, GlassDisc, GlassPlane } from '@/components/ui/glass-forms'

export function Closing() {
  return (
    <section className="relative py-32 md:py-48 bg-surface overflow-hidden">
      {/* ── Floating objects ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Large luminous sphere — center, behind text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <GlassSphere
            size={420}
            tint="91,164,201"
            glowColor="91,164,201"
            highlightOffset="38% 30%"
            animation="breathe"
            duration="12s"
          />
        </div>

        {/* Tilted disc — upper left */}
        <GlassDisc
          diameter={260}
          rx={72}
          ry={8}
          opacity={0.12}
          className="absolute hidden md:block"
          style={{ top: '8%', left: '5%' }}
          duration="28s"
        />

        {/* Plane — lower right */}
        <GlassPlane
          w={340}
          h={240}
          rx={-6}
          ry={-14}
          opacity={0.06}
          blur={10}
          radius={24}
          className="absolute hidden md:block"
          style={{ bottom: '8%', right: '-2%' }}
          duration="32s"
        />
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <blockquote className="font-display text-[1.5rem] md:text-[2rem] lg:text-[2.2rem] font-normal leading-[1.35] tracking-[-0.01em] text-text-primary italic mb-8">
            The system can be governed.<br />
            <span className="text-text-tertiary">
              But what governs the human it reshapes?
            </span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-10 h-px bg-rule mx-auto mb-8" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-sans text-[0.92rem] leading-[1.8] text-text-tertiary font-light max-w-[500px] mx-auto mb-12">
            Without a second-order layer, governance protects a version of the
            human already being transformed.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#suite"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-text-primary text-base font-sans text-[13px] font-medium tracking-[0.02em] hover:bg-text-secondary transition-colors duration-400"
          >
            Explore the Suite
          </a>
        </Reveal>
      </div>
    </section>
  )
}
