import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-text-ghost mb-5">
      {children}
    </p>
  )
}
