'use client'

import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

const LAYERS = [
  {
    label: 'First-Order Governance',
    detail: 'Regulates system behaviour — outputs, fairness, safety, accountability.',
    position: 'existing',
  },
  {
    label: 'Second-Order Governance',
    detail: 'Examines the transformation of the subject who governs, consents, and deliberates.',
    position: 'proposed',
  },
] as const

export function Framework() {
  return (
    <section id="framework" className="relative py-28 md:py-40 bg-base">
      <div className="max-w-[720px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel>Framework</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.3] tracking-[-0.01em] text-text-primary mb-6 max-w-[560px]">
            Two orders of governance.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans text-[0.92rem] leading-[1.85] text-text-secondary font-light mb-14 max-w-[560px]">
            The first order asks: what should AI systems be permitted to do?
            The second order asks: what is happening to the human who is
            supposed to answer that question?
          </p>
        </Reveal>

        <div className="space-y-8">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.label} delay={0.12 + i * 0.06}>
              <div className={`
                relative p-7 md:p-9 rounded-sm border
                ${layer.position === 'proposed'
                  ? 'bg-panel border-panel-border'
                  : 'bg-base border-rule'}
              `}>
                <div className="flex items-start gap-4 mb-3">
                  <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mt-1">
                    {layer.position === 'existing' ? 'Established' : 'Proposed'}
                  </span>
                </div>
                <h3 className="font-display text-[1.15rem] md:text-[1.3rem] font-normal text-text-primary italic mb-3">
                  {layer.label}
                </h3>
                <p className="font-sans text-[0.85rem] leading-[1.8] text-text-tertiary font-light">
                  {layer.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-14 pt-10 border-t border-rule">
            <p className="font-sans text-[0.85rem] leading-[1.85] text-text-tertiary font-light italic">
              Without the second order, governance protects a version of the human
              that is already being transformed by the systems it seeks to regulate.
              The governor and the governed shift together, unexamined.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
