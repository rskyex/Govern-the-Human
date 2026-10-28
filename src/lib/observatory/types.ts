/* gth-result/v1 types. See SCHEMA.md at the repository root. */

export type AxisName = 'autonomy' | 'novelty' | 'sociality' | 'tempo' | 'affect'

export interface AxisValue {
  origin: number
  end: number
  change: number
}

export interface Envelope<N extends string, I, O> {
  schema: 'gth-result/v1'
  instrument: { name: N; version: string; url?: string }
  generated_at: string
  inputs: I
  outputs: O
  privacy?: { processing?: string; personal_content_included?: boolean; excluded?: string[] }
}

export interface NDEncounter {
  id: string
  zone: number
  choice_index: number
  choice_id: string
  system_aligned: boolean
  autonomy_delta: number
  tempo_delta: number
}

export type NarrativeDriftResult = Envelope<
  'narrative-drift',
  {
    mode?: 'interactive' | 'verifier'
    script?: string | null
    calibration_choices?: number[] | null
    encounter_choices?: number[]
    sequence?: string | null
  },
  {
    classification: string
    total_displacement_pct: number
    system_aligned_pct: number
    system_aligned_count: number
    encounter_count: number
    axes: Record<AxisName, AxisValue>
    encounters: NDEncounter[]
  }
>

export interface TopicRow {
  topic: string
  post_count: number
  engagement_vs_average?: number | null
  frequency_trend?: string
}

export type SelfTraceResult = Envelope<
  'selftrace',
  {
    source?: 'demo' | 'user-data'
    profile_id?: string | null
    profile_label?: string | null
    platform?: string
    post_count?: number
  },
  {
    post_count: number
    date_range: { start: string; end: string; start_label?: string; end_label?: string }
    top_topics: { topic: string; count: number }[]
    rewarded_rising: TopicRow[]
    kept: TopicRow[]
    kept_without_encouragement?: TopicRow[]
    resisted_reward?: TopicRow[]
    topic_range: {
      distinct_topics: number
      diversity_first_quarter_bits: number
      diversity_last_quarter_bits: number
      diversity_change_pct: number | null
      quarters: number
      narrowed: boolean
    }
  }
>

export type GthResult = NarrativeDriftResult | SelfTraceResult

export interface LoadedResult {
  key: string
  fileName: string
  /** Short human label, e.g. "Script A" or "The Emerging Public Intellectual" */
  label: string
  doc: GthResult
  /** Findings of the personal-content scan; empty when clean */
  contentFlags: string[]
}
