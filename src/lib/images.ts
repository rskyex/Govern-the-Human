/**
 * Centralized image references.
 * When final images are ready, update paths here — all pages update automatically.
 */
export const IMAGES = {
  /** Wide architectural hall with depth and multiple figures — hero */
  hero: '/img-architecture-wide.png',
  /** Solitary human in overwhelming abstract space — governance gap */
  governanceGap: '/img-human-immense.png',
  /** Calm panoramic interior with warm light — suite / closing */
  suitePanoramic: '/img-panoramic-calm.png',
  /** Portal / circular space with figure — closing accent */
  closingPortal: '/img-portal-circular.png',
  /** Grand institutional hall, solitary figure — Observatory page */
  observatory: '/img-hall-solitary.png',
  /** Reflective arches, quieter mood — SelfTrace page */
  selfTrace: '/img-arches-reflective.png',
  /** Spatial uncertainty, transformation — Narrative Drift page */
  narrativeDrift: '/narrative-drift-hero.png',
  /** Transition image — Narrative Drift */
  narrativeDriftTransition: '/transition-1.png',
  /** Interlude image — Narrative Drift */
  narrativeDriftInterlude: '/interlude.png',
  /** Fluid abstract structural — atmospheric accent */
  fluidAbstract: '/img-fluid-abstract.png',
} as const

/** Suite page heroes and side panels (same images as the live site). */
export const SUITE_IMAGES = {
  observatory: '/img-hall-solitary.png',
  selftrace: '/selftrace-2.png',
  narrativeDrift: '/narrative-drift-hero.png',
  /* secondary / sectional images */
  observatorySection: '/img-architecture-wide.png',
  selftraceSection: '/selftrace-5.png',
  narrativeDriftSection: '/interlude.png',
} as const
