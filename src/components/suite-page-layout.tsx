'use client'

import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/ui/reveal'
import type { ReactNode } from 'react'

interface SuitePageHeroProps {
  number: string
  title: string
  subtitle: string
  imageSrc: string
  /** Image opacity 0–1, default 0.12 */
  imageOpacity?: number
}

export function SuitePageHero({ number, title, subtitle, imageSrc, imageOpacity = 0.12 }: SuitePageHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          style={{ opacity: imageOpacity }}
        />
      </div>

      {/* Gradient overlay for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.85) 80%, #ffffff 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-16 pb-16 pt-40 w-full">
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            {number}
          </p>
          <div className="w-10 h-px bg-rule mb-8" />
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display text-[2.2rem] md:text-[3rem] lg:text-[3.6rem] font-normal leading-[1.1] tracking-[-0.02em] text-text-primary mb-6 max-w-[800px]">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="font-sans text-[1rem] md:text-[1.1rem] leading-[1.8] text-text-secondary font-light max-w-[600px]">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

interface SuitePageSectionProps {
  children: ReactNode
  background?: 'base' | 'surface'
  className?: string
}

export function SuitePageSection({ children, background = 'base', className = '' }: SuitePageSectionProps) {
  const bg = background === 'surface' ? 'bg-surface' : 'bg-base'
  return (
    <section className={`${bg} py-24 md:py-36 ${className}`}>
      <div className="max-w-[960px] mx-auto px-8 md:px-16">
        {children}
      </div>
    </section>
  )
}

interface SuitePageShellProps {
  children: ReactNode
}

export function SuitePageShell({ children }: SuitePageShellProps) {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      {children}

      {/* Return pathway */}
      <section className="bg-base py-20 md:py-28 border-t border-rule">
        <div className="max-w-[960px] mx-auto px-8 md:px-16 text-center">
          <Reveal>
            <a
              href="/#the-suite"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-text-ghost hover:text-text-secondary transition-colors duration-300"
            >
              &larr; Back to The Suite
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
