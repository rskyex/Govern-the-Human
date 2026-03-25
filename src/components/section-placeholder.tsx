'use client'

import { Reveal } from '@/components/ui/reveal'

interface SectionPlaceholderProps {
  number: string
  label: string
  bg: 'base' | 'surface'
}

export function SectionPlaceholder({ number, label, bg }: SectionPlaceholderProps) {
  const bgClass = bg === 'surface' ? 'bg-surface' : 'bg-base'
  const id = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <section id={id} className={`${bgClass} py-36 md:py-48`}>
      <div className="max-w-[680px] mx-auto px-6 md:px-12">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            {number}
          </p>
          <div className="w-8 h-px bg-rule mb-5" />
          <p className="font-display text-[1.3rem] md:text-[1.5rem] italic text-text-ghost/60 font-normal">
            {label}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
