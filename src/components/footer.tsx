import { SectionLabel } from '@/components/ui/section-label'

export function Footer() {
  return (
    <footer className="py-16 md:py-24 bg-base border-t border-rule/40">
      <div className="max-w-[680px] mx-auto px-6 md:px-12 text-center">
        {/* Project signature */}
        <SectionLabel>Govern the Human</SectionLabel>

        <p className="font-display text-[1.1rem] md:text-[1.2rem] italic text-text-tertiary mb-8">
          A research suite on the human subject under AI conditions
        </p>

        <div className="w-8 h-px bg-rule mx-auto mb-8" />

        {/* Attribution */}
        <div className="space-y-2">
          <p className="font-sans text-[11px] text-text-ghost font-light">
            Conceptual platform &middot; Research in progress
          </p>
          <p className="font-sans text-[11px] text-text-ghost/60 font-light">
            Analytical &middot; Experiential &middot; Reflective architecture
          </p>
        </div>
      </div>
    </footer>
  )
}
