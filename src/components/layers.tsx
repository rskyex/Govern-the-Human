'use client'

import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

interface LayerData {
  depth: string
  title: string
  subtitle: string
  body: string
  accent: string
}

const LAYERS: LayerData[] = [
  {
    depth: 'I',
    title: 'Epistemic',
    subtitle: 'What you can know',
    body: 'AI systems restructure the conditions of knowledge: what counts as credible, how beliefs are formed, which sources are surfaced, and which are suppressed. The epistemic subject — the one who knows, doubts, and judges — is being reorganized at the level of its informational environment, often without awareness that any transformation has occurred.',
    accent: 'var(--color-accent)',
  },
  {
    depth: 'II',
    title: 'Ontological',
    subtitle: 'Who you can be',
    body: "Beneath the epistemic layer, AI destabilizes the subject's relation to itself. When machine-generated content becomes indistinguishable from human expression, when memory is outsourced to retrieval systems, when self-narration is mediated by algorithmic surfaces — the boundary of the self becomes undecidable. The question is no longer what you know, but whether the one who knows is still coherently you.",
    accent: 'var(--color-violet)',
  },
  {
    depth: 'III',
    title: 'Political',
    subtitle: 'How you can govern',
    body: 'At the deepest layer, the political subject required by democratic governance — capable of deliberation, dissent, and autonomous judgment — is being reshaped by the same systems democracy is supposed to regulate. If the subject who votes, protests, and consents has been epistemically narrowed and ontologically destabilized, then the foundations of self-governance are not merely threatened. They are structurally altered.',
    accent: 'var(--color-text-primary)',
  },
]

export function Layers() {
  return (
    <section id="layers">
      <div className="pt-28 md:pt-40 pb-16 md:pb-24 bg-base">
        <div className="max-w-[1040px] mx-auto px-6 md:px-12">
          <Reveal>
            <SectionLabel>Three-Layer Model</SectionLabel>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary max-w-[540px]">
              Descending into the governed subject
            </h2>
          </Reveal>
        </div>
      </div>

      {LAYERS.map((layer, i) => (
        <div key={layer.depth} className={`${i % 2 === 1 ? 'bg-surface' : 'bg-base'} ${i === 2 ? 'pb-28 md:pb-40 pt-16 md:pt-24' : 'py-16 md:py-24'}`}>
          <div className="max-w-[1040px] mx-auto px-6 md:px-12">
            <Reveal delay={i * 0.08}>
              <div
                className="relative border-l-2 pl-8 md:pl-12"
                style={{
                  borderColor: layer.accent,
                  marginLeft: `${i * 24}px`,
                  marginRight: `${i * 24}px`,
                }}
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span
                    className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase"
                    style={{ color: layer.accent }}
                  >
                    Layer {layer.depth}
                  </span>
                  <span className="font-sans text-[12px] text-text-ghost font-light">
                    {layer.subtitle}
                  </span>
                </div>
                <h3 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.01em] text-text-primary mb-6">
                  {layer.title}
                </h3>
                <p className="font-sans text-[0.92rem] md:text-[0.97rem] leading-[1.85] text-text-secondary font-light max-w-[640px]">
                  {layer.body}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  )
}
