import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/ui/reveal'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://govern-the-human.vercel.app'

export const metadata: Metadata = {
  title: 'Creator — Risa Koyanagi | Govern the Human',
  description:
    'Cambridge Future Scholar. Researcher at the intersection of international security, space governance, and emerging technology governance.',
  openGraph: {
    title: 'Risa Koyanagi — Creator',
    description:
      'Cambridge Future Scholar. Researcher at the intersection of international security, space governance, and emerging technology governance.',
    url: `${siteUrl}/creator`,
    images: [{ url: `${siteUrl}/govern-the-human-og.png`, width: 1200, height: 630, type: 'image/png', alt: 'Govern the Human' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risa Koyanagi — Creator',
    images: [{ url: `${siteUrl}/govern-the-human-og.png`, width: 1200, height: 630, alt: 'Govern the Human' }],
  },
}

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-base">
      <Header />

      {/* ── Hero with background image ── */}
      <section className="relative overflow-hidden pt-[64px]">
        <div className="absolute inset-0">
          <Image
            src="/creator-bg.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative py-28 md:py-44">
          <div className="max-w-[1120px] mx-auto px-8 md:px-16">
            <Reveal>
              <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-[#c9a96e] mb-6">
                Creator
              </p>
            </Reveal>
            <Reveal>
              <h1
                className="font-display font-semibold leading-[1.05] tracking-[0.02em] text-white mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                Risa Koyanagi
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-white/80 font-light max-w-[640px]">
                Cambridge Future Scholar. Researcher at the intersection of
                international security, space governance, nuclear governance, cyber
                governance, and emerging technology governance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Profile ── */}
      <section className="bg-base py-24 md:py-36">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Photo */}
            <Reveal delay={0.05}>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden max-w-[480px]">
                <Image
                  src="/profile.jpg"
                  alt="Risa Koyanagi"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            {/* Bio */}
            <div className="lg:pt-4">
              <Reveal delay={0.1}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                  Born in 2003, Risa Koyanagi is a Cambridge Future Scholar and
                  researcher working at the intersection of space governance, nuclear
                  governance, cyber governance, strategic risk, and emerging technology
                  governance. Her research is especially concerned with legitimation
                  theory, dual-use governance, authority architecture, responsible
                  behaviour norms, and international security.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-7">
                  She develops public-facing policy and research platforms that
                  translate governance theory into usable tools across strategic
                  infrastructure domains. Her work connects conceptual research on
                  legitimacy, authority, and governance architecture with applied
                  questions of escalation, responsibility, and institutional design.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  Although her work spans multiple domains — from space and nuclear to
                  cyber and AI governance — it is unified by a consistent conceptual
                  focus on how authority is constructed, contested, and legitimated in
                  environments of technological complexity and strategic ambiguity.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Her Portfolio & Projects ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          <Reveal>
            <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-10">
              Her Portfolio &amp; Projects
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Portfolio */}
            <Reveal delay={0.1}>
              <Link
                href="https://risakoyanagi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <div className="border border-panel-border bg-base rounded-sm h-full overflow-hidden transition-all duration-300 group-hover:border-text-ghost/20 group-hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                  <div className="relative w-full aspect-[1200/630]">
                    <Image
                      src="/risa-koyanagi-og.png"
                      alt="risakoyanagi.com"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                      Her Portfolio
                    </p>
                    <p className="font-sans text-[0.95rem] font-medium tracking-[0.01em] text-text-primary group-hover:text-[#1e3a5f] transition-colors duration-300">
                      risakoyanagi.com <span className="text-text-ghost">&rarr;</span>
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Faultline */}
            <Reveal delay={0.16}>
              <a
                href="https://faultline-nqmm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <div className="border border-panel-border bg-base rounded-sm h-full overflow-hidden transition-all duration-300 group-hover:border-text-ghost/20 group-hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                  <div className="relative w-full aspect-[1200/630]">
                    <Image
                      src="/faultline%20og.png"
                      alt="Faultline"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                      Sister Project
                    </p>
                    <p className="font-sans text-[0.95rem] font-medium tracking-[0.01em] text-text-primary group-hover:text-[#1e3a5f] transition-colors duration-300">
                      Faultline <span className="text-text-ghost">&rarr;</span>
                    </p>
                    <p className="font-sans text-[0.8rem] leading-[1.7] text-text-tertiary font-light mt-1">
                      The Strategic Risk Suite: mapping how orbital, nuclear, and cyber risks connect, overlap, and escalate.
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* MYTHERA */}
            <Reveal delay={0.22}>
              <div className="block h-full">
                <div className="border border-panel-border bg-base rounded-sm h-full overflow-hidden">
                  <div className="relative w-full aspect-[1200/630]">
                    <Image
                      src="/mythera%20og.png"
                      alt="MYTHERA"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                      Sister Project
                    </p>
                    <p className="font-sans text-[0.95rem] font-medium tracking-[0.01em] text-text-primary">
                      MYTHERA
                    </p>
                    <p className="font-sans text-[0.8rem] leading-[1.7] text-text-tertiary font-light mt-1">
                      The interactive mythic world of cultural and philosophical interfaces where memory, meaning, and selfhood can be explored. Coming soon.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Back navigation ── */}
      <section className="bg-base py-16 md:py-20">
        <div className="max-w-[1120px] mx-auto px-8 md:px-16">
          <Reveal>
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="font-sans text-[13px] tracking-[0.02em] text-text-ghost hover:text-text-secondary transition-colors duration-300"
              >
                &larr; Main
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
