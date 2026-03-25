'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { ReactNode } from 'react'

/* ── Image asset map — centralized for easy replacement ── */
export const SUITE_IMAGES = {
  observatory: '/git-image (1).png',
  selftrace: '/git-image (4).png',
  narrativeDrift: '/git-image (6).png',
  /* secondary / sectional images */
  observatorySection: '/git-image (2).png',
  selftraceSection: '/git-image (5).png',
  narrativeDriftSection: '/git-image (7).png',
}

/* ── Hero variant for suite pages ── */
export function SuiteHero({
  title,
  subtitle,
  image,
  imageAlt = '',
}: {
  title: string
  subtitle: string
  image?: string
  imageAlt?: string
}) {
  return (
    <section className="relative min-h-[70svh] flex items-end overflow-hidden">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.85) 65%, #ffffff 90%)',
            }}
          />
        </>
      )}
      <div className="relative z-10 max-w-[1120px] mx-auto px-8 md:px-16 w-full pb-20 pt-40">
        <Reveal>
          <h1
            className="font-display font-semibold leading-[1.05] tracking-[0.02em] text-text-primary mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          >
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-sans text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-secondary font-light max-w-[640px]">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Section wrapper — consistent spacing ── */
export function SuiteSection({
  children,
  bg = 'base',
  className = '',
}: {
  children: ReactNode
  bg?: 'base' | 'surface'
  className?: string
}) {
  return (
    <section className={`${bg === 'surface' ? 'bg-surface' : 'bg-base'} py-24 md:py-36 ${className}`}>
      <div className="max-w-[1120px] mx-auto px-8 md:px-16">{children}</div>
    </section>
  )
}

/* ── Section heading ── */
export function SectionHeading({
  label,
  title,
  description,
}: {
  label?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-14 md:mb-20">
      {label && (
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            {label}
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-[1.6rem] md:text-[2.2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-5">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.08}>
          <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light max-w-[640px]">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ── Concept card — for "what it makes visible" sections ── */
export function ConceptCard({
  title,
  description,
  index = 0,
}: {
  title: string
  description: string
  index?: number
}) {
  return (
    <Reveal delay={0.08 + index * 0.05}>
      <div className="p-7 md:p-9 border border-panel-border bg-panel rounded-sm h-full">
        <h3 className="font-display text-[1.15rem] md:text-[1.25rem] font-medium text-text-primary mb-3">
          {title}
        </h3>
        <p className="font-sans text-[0.9rem] leading-[1.85] text-text-tertiary font-light">
          {description}
        </p>
      </div>
    </Reveal>
  )
}

/* ── Side image panel ── */
export function SideImagePanel({
  image,
  alt = '',
  children,
  imagePosition = 'right',
}: {
  image: string
  alt?: string
  children: ReactNode
  imagePosition?: 'left' | 'right'
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
      <div className={imagePosition === 'left' ? 'lg:order-2' : ''}>
        {children}
      </div>
      <div className={`relative aspect-[4/3] rounded-sm overflow-hidden ${imagePosition === 'left' ? 'lg:order-1' : ''}`}>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      </div>
    </div>
  )
}

/* ── Back-to-suite navigation ── */
export function SuiteNav({ current }: { current: string }) {
  const pages = [
    { name: 'Observatory', href: '/observatory' },
    { name: 'SelfTrace', href: '/selftrace' },
    { name: 'Narrative Drift', href: '/narrative-drift' },
  ]

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="max-w-[1120px] mx-auto px-8 md:px-16">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-rule" />
            <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-text-ghost">
              The Suite
            </p>
            <div className="flex-1 h-px bg-rule" />
          </div>
        </Reveal>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
          {pages
            .filter((p) => p.href !== current)
            .map((p) => (
              <Reveal key={p.href} delay={0.05}>
                <Link
                  href={p.href}
                  className="font-sans text-[13px] tracking-[0.02em] text-text-ghost hover:text-text-secondary transition-colors duration-300"
                >
                  {p.name} &rarr;
                </Link>
              </Reveal>
            ))}
          <Reveal delay={0.1}>
            <Link
              href="/"
              className="font-sans text-[13px] tracking-[0.02em] text-text-ghost hover:text-text-secondary transition-colors duration-300"
            >
              &larr; Main
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Full page wrapper ── */
export function SuitePageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
