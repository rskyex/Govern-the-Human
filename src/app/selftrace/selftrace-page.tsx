'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { SuitePageShell, SuitePageHero, SuitePageSection } from '@/components/suite-page-layout'
import { IMAGES } from '@/lib/images'

const DIMENSIONS = [
  {
    title: 'Mediated Self-Perception',
    description:
      'How algorithmic mirrors — recommendations, behavioural profiles, inferred preferences — become the terms through which subjects understand who they are.',
  },
  {
    title: 'Memory Under Curation',
    description:
      'How platform-mediated recall reshapes what subjects remember, forget, and treat as their own history — altering the continuity of self.',
  },
  {
    title: 'Identity as Feedback Loop',
    description:
      'How AI-generated reflections of the self create recursive loops in which the subject increasingly becomes what the system predicts it to be.',
  },
]

export function SelfTracePage() {
  return (
    <SuitePageShell>
      <SuitePageHero
        number="Suite / 02"
        title="SelfTrace"
        subtitle="A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity."
        imageSrc={IMAGES.selfTrace}
        imageOpacity={0.1}
      />

      {/* Why this project exists */}
      <SuitePageSection>
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            The problem
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <div className="max-w-[720px]">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-8">
              The self is not a fixed reference point. Under AI conditions, it becomes a moving surface — shaped by the systems that claim to reflect it.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light mb-6">
              AI systems do not merely serve the self. They mediate it. Recommendation engines, behavioural profiles, and algorithmically curated feeds do not just respond to preferences — they participate in constructing them. The subject who encounters AI is not the same subject who existed before the encounter.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
              SelfTrace examines this recursive loop: the system reflects the self, and the self begins to resemble the reflection. This is not a failure of technology. It is a structural feature of AI-mediated identity — and it has consequences for governance, consent, and autonomy.
            </p>
          </Reveal>
        </div>
      </SuitePageSection>

      {/* What it makes visible — with side image panel */}
      <SuitePageSection background="surface">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          <div>
            <Reveal>
              <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
                What it makes visible
              </p>
              <div className="w-10 h-px bg-rule mb-10" />
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-10">
                Three dimensions of mediated selfhood
              </h2>
            </Reveal>

            <div className="space-y-8">
              {DIMENSIONS.map((dim, i) => (
                <Reveal key={dim.title} delay={0.08 + i * 0.05}>
                  <div>
                    <h3 className="font-display text-[1.15rem] font-medium text-text-primary mb-3">
                      {dim.title}
                    </h3>
                    <p className="font-sans text-[0.9rem] leading-[1.85] text-text-tertiary font-light">
                      {dim.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Side image panel — cropped, framed */}
          <div className="hidden lg:block">
            <Reveal delay={0.2}>
              <div className="relative h-[400px] rounded-sm overflow-hidden">
                <Image
                  src={IMAGES.fluidAbstract}
                  alt=""
                  fill
                  className="object-cover object-center opacity-30"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/50" />
              </div>
            </Reveal>
          </div>
        </div>
      </SuitePageSection>

      {/* Research approach */}
      <SuitePageSection>
        <Reveal>
          <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-4">
            Research approach
          </p>
          <div className="w-10 h-px bg-rule mb-10" />
        </Reveal>

        <div className="max-w-[720px]">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[1.6rem] md:text-[2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary mb-8">
              How SelfTrace operates
            </h2>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Reflective, not extractive
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  SelfTrace does not collect behavioural data. It creates structured conditions for subjects to examine how AI-mediated environments have already reshaped their self-understanding — their sense of continuity, preference, and identity.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-text-ghost mb-3">
                  Intimate scale
                </p>
                <p className="font-sans text-[0.95rem] leading-[1.9] text-text-secondary font-light">
                  Where the Observatory operates at institutional scale, SelfTrace works at the level of individual experience. It examines the personal, phenomenological dimension of AI-mediated identity — the texture of living within systems that reflect and reshape the self.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SuitePageSection>

      {/* Why it matters */}
      <SuitePageSection background="surface">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <p className="font-display text-[1.6rem] md:text-[2.2rem] font-normal leading-[1.25] tracking-[-0.015em] text-text-primary mb-8">
              If the self is being reshaped by the systems it interacts with, then consent, autonomy, and self-governance require new foundations.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[0.95rem] leading-[1.9] text-text-tertiary font-light">
              SelfTrace provides the reflective instruments to begin that work.
            </p>
          </Reveal>
        </div>
      </SuitePageSection>
    </SuitePageShell>
  )
}
