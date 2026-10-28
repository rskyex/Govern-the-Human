/*
 * Second-Order Assessment.
 *
 * Every reading is built only from the numbers listed as indicators for the
 * same layer, so each sentence can be traced back to a value on the page.
 * Thresholds are stated in THRESHOLDS and repeated in the report.
 */
import type { LoadedResult, NarrativeDriftResult, SelfTraceResult, TopicRow } from './types'

export const THRESHOLDS = {
  /** Delegation rate at or above which a run counts as mostly through the system */
  delegationHigh: 60,
  /** Delegation rate at or below which a run counts as mostly own reasoning */
  delegationLow: 30,
  /** Axis change (points) below which an axis counts as stable */
  stablePoints: 5,
  /** SelfTrace narrowing: last quarter diversity below this share of the first */
  narrowingShare: 75,
}

export interface Indicator {
  label: string
  value: string
  source: string
}

export interface Provision {
  instrument: string
  reference: string
  summary: string
  relevance: string
}

export interface LayerAssessment {
  id: 'epistemic' | 'ontological' | 'political' | 'processing'
  layer: string
  question: string
  status: 'assessed' | 'no-data'
  indicators: Indicator[]
  reading: string[]
  provision: Provision
}

export interface Assessment {
  schema: 'gth-assessment/v1'
  generated_at: string
  observatory_version: string
  disclaimer: string
  thresholds: typeof THRESHOLDS
  sources: { instrument: string; version: string; label: string; generated_at: string; mode: string; file: string }[]
  layers: LayerAssessment[]
}

export const DISCLAIMER =
  'This is not a legal or clinical assessment. It reports what the instruments recorded during a run, which may be a simulated or fictional one, and does not describe the person’s behaviour outside the instruments. Provisions are listed because they address the same question, not to suggest compliance or breach.'

const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`)
const pct = (n: number) => `${n}%`

const CIVIC_NAMES: Record<string, string> = {
  'z3-filter': 'Curated political feed',
  'z3-summary': 'AI summary of candidates',
  'z3-petition': 'Pre-drafted petition comment',
}

function ndSource(r: LoadedResult) {
  return `Narrative Drift ${r.doc.instrument.version}, ${r.label}`
}
function stSource(r: LoadedResult) {
  return `SelfTrace ${r.doc.instrument.version}, ${r.label}`
}

function axisMove(change: number, toward: [string, string]): string {
  if (Math.abs(change) < THRESHOLDS.stablePoints) return `stayed within ${THRESHOLDS.stablePoints} points of its starting value`
  return `moved ${Math.abs(change)} points toward ${change > 0 ? toward[1] : toward[0]}`
}

/* ── Epistemic ─────────────────────────────────────────────── */

function epistemic(nd: LoadedResult[]): LayerAssessment {
  const base: Omit<LayerAssessment, 'status' | 'indicators' | 'reading'> = {
    id: 'epistemic',
    layer: 'Epistemic',
    question: 'After repeated use, does the person still make routine choices on their own reasoning, or by default through the system?',
    provision: {
      instrument: 'EU AI Act',
      reference: 'Article 4, AI literacy',
      summary: 'Providers and deployers of AI systems must take measures to ensure a sufficient level of AI literacy among the people who operate or use those systems on their behalf.',
      relevance: 'The literacy duty assumes people keep exercising their own judgement alongside the system. A rising delegation rate and an autonomy axis moving toward external guidance are the pattern that duty is meant to counter.',
    },
  }
  if (nd.length === 0) {
    return { ...base, status: 'no-data', indicators: [], reading: ['No Narrative Drift result is loaded, so this layer is not assessed.'] }
  }
  const indicators: Indicator[] = []
  const reading: string[] = []
  for (const r of nd) {
    const o = (r.doc as NarrativeDriftResult).outputs
    const a = o.axes.autonomy
    indicators.push({
      label: 'Delegation rate (system-aligned encounter choices)',
      value: `${o.system_aligned_count} of ${o.encounter_count} (${pct(o.system_aligned_pct)})`,
      source: ndSource(r),
    })
    indicators.push({
      label: 'Autonomy axis, origin to end',
      value: `${signed(a.origin)} to ${signed(a.end)} (change ${signed(a.change)})`,
      source: ndSource(r),
    })
    let verdict: string
    if (o.system_aligned_pct >= THRESHOLDS.delegationHigh && a.change <= -THRESHOLDS.stablePoints) {
      verdict = 'In this run, routine choices were made by default through the system.'
    } else if (o.system_aligned_pct <= THRESHOLDS.delegationLow && a.change >= THRESHOLDS.stablePoints) {
      verdict = 'In this run, routine choices stayed with the person’s own reasoning.'
    } else if (o.system_aligned_pct >= THRESHOLDS.delegationHigh) {
      verdict = 'Most choices went through the system, although the autonomy axis did not move toward external guidance.'
    } else if (o.system_aligned_pct <= THRESHOLDS.delegationLow) {
      verdict = 'Most choices stayed with the person, although the autonomy axis did not move toward self-direction.'
    } else {
      verdict = 'The run is mixed: neither the system nor the person’s own reasoning was the clear default.'
    }
    reading.push(
      `${r.label}: ${o.system_aligned_count} of ${o.encounter_count} encounter choices (${pct(o.system_aligned_pct)}) were system-aligned, and the autonomy axis ${axisMove(a.change, ['external guidance', 'self-direction'])} (${signed(a.origin)} to ${signed(a.end)}). ${verdict}`
    )
  }
  if (nd.length > 1) {
    const rates = nd.map((r) => (r.doc as NarrativeDriftResult).outputs.system_aligned_pct)
    reading.push(
      `Across the ${nd.length} runs the delegation rate ranges from ${pct(Math.min(...rates))} to ${pct(Math.max(...rates))}. The instrument records the choices made; it does not show why they were made.`
    )
  }
  return { ...base, status: 'assessed', indicators, reading }
}

/* ── Ontological ───────────────────────────────────────────── */

const topicList = (rows: TopicRow[]) => rows.map((t) => `${t.topic} (${t.post_count})`).join(', ')

function ontological(st: LoadedResult[]): LayerAssessment {
  const base: Omit<LayerAssessment, 'status' | 'indicators' | 'reading'> = {
    id: 'ontological',
    layer: 'Ontological',
    question: 'Does the environment reward a narrower self-presentation than the one the person would choose?',
    provision: {
      instrument: 'Digital Services Act',
      reference: 'Article 34, systemic risk assessment',
      summary: 'Providers of very large online platforms must assess systemic risks arising from their service, including actual or foreseeable negative effects on civic discourse.',
      relevance: 'Reward patterns that concentrate what people express on fewer topics are one route to such effects. SelfTrace shows the pattern for a single account; a platform risk assessment would look at it across users.',
    },
  }
  if (st.length === 0) {
    return { ...base, status: 'no-data', indicators: [], reading: ['No SelfTrace result is loaded, so this layer is not assessed.'] }
  }
  const indicators: Indicator[] = []
  const reading: string[] = []
  for (const r of st) {
    const o = (r.doc as SelfTraceResult).outputs
    const kwe = o.kept_without_encouragement ?? []
    const keptAll = new Map<string, TopicRow>()
    for (const t of [...o.kept, ...kwe]) keptAll.set(t.topic, t)
    const tr = o.topic_range
    const src = stSource(r)
    const range = o.date_range.start_label && o.date_range.end_label ? `${o.date_range.start_label} to ${o.date_range.end_label}` : `${o.date_range.start.slice(0, 7)} to ${o.date_range.end.slice(0, 7)}`
    indicators.push({ label: 'Posts analysed', value: `${o.post_count}, ${range}`, source: src })
    indicators.push({
      label: 'Rewarded and rising topics (posts)',
      value: o.rewarded_rising.length ? topicList(o.rewarded_rising) : 'none',
      source: src,
    })
    indicators.push({
      label: 'Kept without reward (posts)',
      value: keptAll.size ? topicList([...keptAll.values()]) : `none (0 under the /results definition, 0 under the /kept definition)`,
      source: src,
    })
    indicators.push({
      label: 'Topic diversity, first to last quarter',
      value: `${tr.diversity_first_quarter_bits.toFixed(2)} to ${tr.diversity_last_quarter_bits.toFixed(2)} bits (${tr.diversity_change_pct === null ? 'n/a' : signed(tr.diversity_change_pct) + '%'}) over ${tr.quarters} quarters; ${tr.distinct_topics} distinct topics`,
      source: src,
    })

    const R = o.rewarded_rising.length
    const K = keptAll.size
    const parts: string[] = []
    parts.push(
      R > 0
        ? `${r.label}: ${R} topic${R > 1 ? 's were' : ' was'} both rewarded with above-average engagement and posted about more over time: ${topicList(o.rewarded_rising)}.`
        : `${r.label}: no topic was both rewarded and rising.`
    )
    parts.push(
      K > 0
        ? `${K} topic${K > 1 ? 's' : ''} persisted without reward: ${topicList([...keptAll.values()])}.`
        : 'No topic persisted without reward under either kept definition.'
    )
    const change = tr.diversity_change_pct === null ? '' : ` (${signed(tr.diversity_change_pct)}%)`
    parts.push(
      tr.narrowed
        ? `Topic diversity fell from ${tr.diversity_first_quarter_bits.toFixed(2)} to ${tr.diversity_last_quarter_bits.toFixed(2)} bits${change}, past the instrument’s narrowing threshold (last quarter below ${THRESHOLDS.narrowingShare}% of the first).`
        : `Topic diversity went from ${tr.diversity_first_quarter_bits.toFixed(2)} to ${tr.diversity_last_quarter_bits.toFixed(2)} bits${change}, which does not cross the instrument’s narrowing threshold (last quarter below ${THRESHOLDS.narrowingShare}% of the first).`
    )
    let verdict: string
    if (R > 0 && K === 0) {
      verdict = 'Reward concentrated on a cluster of topics that grew, and nothing unrewarded held its ground. This is consistent with an environment rewarding a narrower self-presentation.'
    } else if (R > 0 && tr.narrowed) {
      verdict = 'Rewarded topics grew and overall range narrowed, while some unrewarded topics persisted. The environment appears to reward a narrower self-presentation, and the person kept part of a wider one.'
    } else if (R > 0) {
      verdict = 'Rewarded topics grew, but unrewarded topics also persisted and range did not narrow past the threshold. The signal is mixed.'
    } else {
      verdict = 'The record shows no reward pattern pulling expression toward particular topics.'
    }
    parts.push(verdict)
    parts.push(
      'The instrument cannot see which self-presentation the person would have chosen. Kept topics are its only proxy for that choice, so this reading is about the environment’s rewards, not about the person’s intentions.'
    )
    if ((r.doc as SelfTraceResult).inputs.source === 'demo') parts.push('This profile is fictional demo data.')
    reading.push(parts.join(' '))
  }
  return { ...base, status: 'assessed', indicators, reading }
}

/* ── Political ─────────────────────────────────────────────── */

function political(nd: LoadedResult[]): LayerAssessment {
  const base: Omit<LayerAssessment, 'status' | 'indicators' | 'reading'> = {
    id: 'political',
    layer: 'Political',
    question: 'Does the system shorten deliberation in civic acts?',
    provision: {
      instrument: 'EU AI Act',
      reference: 'Article 5(1)(a), prohibited manipulative techniques',
      summary: 'Prohibits AI systems that deploy subliminal, purposefully manipulative or deceptive techniques with the objective or effect of materially distorting behaviour by appreciably impairing the ability to make an informed decision, causing or likely to cause significant harm.',
      relevance: 'The prohibition turns on whether informed decision making is impaired. Shortened deliberation in civic acts is an observable precondition worth tracking. It is not evidence that the legal threshold is met.',
    },
  }
  if (nd.length === 0) {
    return { ...base, status: 'no-data', indicators: [], reading: ['No Narrative Drift result is loaded, so this layer is not assessed.'] }
  }
  const indicators: Indicator[] = []
  const reading: string[] = []
  for (const r of nd) {
    const o = (r.doc as NarrativeDriftResult).outputs
    const t = o.axes.tempo
    const civic = o.encounters.filter((e) => e.zone === 3)
    const shortened = civic.filter((e) => e.tempo_delta > 0)
    const lengthened = civic.filter((e) => e.tempo_delta < 0)
    const aligned = civic.filter((e) => e.system_aligned)
    indicators.push({ label: 'Tempo axis, origin to end', value: `${signed(t.origin)} to ${signed(t.end)} (change ${signed(t.change)})`, source: ndSource(r) })
    for (const e of civic) {
      indicators.push({
        label: `Civic encounter: ${CIVIC_NAMES[e.id] ?? e.id}`,
        value: `option ${e.choice_index + 1} (${e.choice_id}); tempo ${signed(e.tempo_delta)}; ${e.system_aligned ? 'system-aligned' : 'not system-aligned'}`,
        source: ndSource(r),
      })
    }
    const named = (list: typeof civic) =>
      list.map((e) => `${(CIVIC_NAMES[e.id] ?? e.id).toLowerCase()} ${signed(e.tempo_delta)}`).join(', ')
    let s = `${r.label}: in the three civic encounters, ${shortened.length} of ${civic.length} choices shortened deliberation${shortened.length ? ` (${named(shortened)})` : ''}, ${lengthened.length} lengthened it${lengthened.length ? ` (${named(lengthened)})` : ''}, and ${aligned.length} of ${civic.length} were system-aligned. Across all encounters the tempo axis ${axisMove(t.change, ['deliberation', 'speed'])} (${signed(t.origin)} to ${signed(t.end)}).`
    if (shortened.length >= 2 || (shortened.length >= 1 && t.change >= THRESHOLDS.stablePoints)) {
      s += ' In this run the system shortened deliberation in civic acts.'
    } else if (shortened.length === 0 && aligned.length === 0) {
      s += ' In this run the system did not shorten deliberation in civic acts; its civic offers were declined.'
    } else if (shortened.length === 0) {
      s += ' In this run no civic choice shortened deliberation.'
    } else {
      s += ' In this run the system shortened deliberation in one civic act, and the overall tempo did not move toward speed.'
    }
    reading.push(s)
  }
  return { ...base, status: 'assessed', indicators, reading }
}

/* ── Processing ────────────────────────────────────────────── */

function processing(all: LoadedResult[]): LayerAssessment {
  const flagged = all.filter((r) => r.contentFlags.length > 0)
  const declared = all.filter((r) => r.doc.privacy?.personal_content_included === false).length
  const indicators: Indicator[] = all.map((r) => ({
    label: `${r.fileName}`,
    value: `${r.doc.privacy?.processing ?? 'processing not declared'}; personal content ${r.doc.privacy?.personal_content_included === false ? 'declared absent' : 'not declared'}; scan ${r.contentFlags.length ? 'flagged: ' + r.contentFlags.join('; ') : 'found no free-text fields'}`,
    source: r.doc.instrument.name === 'narrative-drift' ? ndSource(r) : stSource(r),
  }))
  const reading =
    all.length === 0
      ? ['No result is loaded.']
      : [
          `${all.length} file${all.length > 1 ? 's were' : ' was'} read in this browser and not uploaded. ${declared} of ${all.length} declare that no personal content is included, and the Observatory’s own scan ${flagged.length ? `flagged ${flagged.length} file${flagged.length > 1 ? 's' : ''} for review` : 'found no names, post text or answer fields'}.${flagged.length ? ' Review the flagged fields before sharing this report.' : ' The files hold option indices, counts and topic labels.'}`,
        ]
  return {
    id: 'processing',
    layer: 'Processing',
    question: 'Does the assessment use only the data it needs?',
    status: all.length ? 'assessed' : 'no-data',
    indicators,
    reading,
    provision: {
      instrument: 'GDPR',
      reference: 'Article 5(1)(c), data minimisation',
      summary: 'Personal data must be adequate, relevant and limited to what is necessary for the purposes for which it is processed.',
      relevance: 'The instruments export counts and indices rather than content, and all processing here happens on the device. That design keeps the assessment within what it needs.',
    },
  }
}

export function buildAssessment(results: LoadedResult[], observatoryVersion: string): Assessment {
  const nd = results.filter((r) => r.doc.instrument.name === 'narrative-drift')
  const st = results.filter((r) => r.doc.instrument.name === 'selftrace')
  return {
    schema: 'gth-assessment/v1',
    generated_at: new Date().toISOString(),
    observatory_version: observatoryVersion,
    disclaimer: DISCLAIMER,
    thresholds: THRESHOLDS,
    sources: results.map((r) => ({
      instrument: r.doc.instrument.name,
      version: r.doc.instrument.version,
      label: r.label,
      generated_at: r.doc.generated_at,
      mode:
        r.doc.instrument.name === 'narrative-drift'
          ? ((r.doc as NarrativeDriftResult).inputs.mode ?? 'unknown')
          : ((r.doc as SelfTraceResult).inputs.source ?? 'unknown'),
      file: r.fileName,
    })),
    layers: [epistemic(nd), ontological(st), political(nd), processing(results)],
  }
}
