/*
 * Second-Order Assessment.
 *
 * Every reading is built only from the numbers listed as indicators for the
 * same layer, so each sentence can be traced back to a value on the page.
 * Readings describe what the instruments recorded, never what happened to a
 * person. Thresholds are stated in THRESHOLDS and repeated in the report.
 */
import { NARROWING_SHARE, recomputeNarrowed } from './parse'
import type { LoadedResult, NarrativeDriftResult, SelfTraceResult, TopicRow } from './types'

export const THRESHOLDS = {
  /** Delegation rate at or above which a run counts as mostly through the system */
  delegationHigh: 60,
  /** Delegation rate at or below which a run counts as mostly own reasoning */
  delegationLow: 30,
  /** Axis change (points) below which an axis counts as stable */
  stablePoints: 5,
  /** SelfTrace narrowing, recomputed from the bits: last diversity below this share of the first */
  narrowingShare: NARROWING_SHARE * 100,
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
  sources: {
    instrument: string
    version: string
    label: string
    generated_at: string
    mode: string
    file: string
    sha256: string | null
    warnings: string[]
  }[]
  layers: LayerAssessment[]
}

export const DISCLAIMER =
  'This is not a legal or clinical assessment. It reports what the instruments recorded during a run, which may be a scripted, simulated or fictional one, and does not describe anyone’s behaviour outside the instruments. Provisions are listed because they address the same question, not to suggest compliance or breach.'

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

/** Caveat for Narrative Drift files that replay a fixed script rather than record a participant. */
function verifierCaveat(r: LoadedResult): string | null {
  const i = (r.doc as NarrativeDriftResult).inputs
  if (i.mode !== 'verifier') return null
  return `This file is a verifier replay${i.script ? ` of ${i.script}` : ''}: the choices were scripted and no participant took part.`
}

function warningNote(r: LoadedResult): string | null {
  return r.warnings.length ? `File check for ${r.fileName}: ${r.warnings.join(' ')}` : null
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
      label: 'Delegation rate (encounter choices the instrument scores as system-aligned)',
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
      verdict = 'Most recorded choices were the options the instrument scores as delegating to the system, and the autonomy axis moved toward external guidance.'
    } else if (o.system_aligned_pct <= THRESHOLDS.delegationLow && a.change >= THRESHOLDS.stablePoints) {
      verdict = 'Few recorded choices were the options the instrument scores as delegating to the system, and the autonomy axis moved toward self-direction.'
    } else if (o.system_aligned_pct >= THRESHOLDS.delegationHigh) {
      verdict = 'Most recorded choices were system-aligned options, although the autonomy axis did not move toward external guidance.'
    } else if (o.system_aligned_pct <= THRESHOLDS.delegationLow) {
      verdict = 'Few recorded choices were system-aligned options, although the autonomy axis did not move toward self-direction.'
    } else {
      verdict = 'The record is mixed: neither system-aligned nor self-directed options were the clear majority.'
    }
    const parts = [
      `${r.label}: ${o.system_aligned_count} of ${o.encounter_count} encounter choices (${pct(o.system_aligned_pct)}) ${o.system_aligned_count === 1 ? 'was an option' : 'were options'} the instrument scores as system-aligned, and the autonomy axis ${axisMove(a.change, ['external guidance', 'self-direction'])} (${signed(a.origin)} to ${signed(a.end)}). ${verdict}`,
    ]
    const deltaSum = o.encounters.reduce((s, e) => s + e.autonomy_delta, 0)
    parts.push(
      deltaSum === a.change
        ? `The two indicators are not independent: the autonomy change (${signed(a.change)}) is the sum of the autonomy scores of the same ${o.encounter_count} choices that make up the delegation rate.`
        : `The two indicators are not independent: both are computed from the same ${o.encounter_count} encounter choices.`
    )
    const caveat = verifierCaveat(r)
    if (caveat) parts.push(caveat)
    const warn = warningNote(r)
    if (warn) parts.push(warn)
    reading.push(parts.join(' '))
  }
  if (nd.length > 1) {
    const rates = nd.map((r) => (r.doc as NarrativeDriftResult).outputs.system_aligned_pct)
    reading.push(
      `Across the ${nd.length} runs the delegation rate ranges from ${pct(Math.min(...rates))} to ${pct(Math.max(...rates))}. The instrument records which options were chosen; it does not record why.`
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
    const doc = r.doc as SelfTraceResult
    const o = doc.outputs
    const defs = o.definitions ?? {}
    /** Lists the file says it cut to the top 3 */
    const truncated = (key: string) => /top 3/i.test(defs[key] ?? '')
    const capNote = (key: string, rows: TopicRow[]) => (truncated(key) && rows.length >= 3 ? ' (the file lists only the top 3)' : '')
    const kwe = o.kept_without_encouragement ?? []
    const keptAll = new Map<string, TopicRow>()
    for (const t of [...o.kept, ...kwe]) keptAll.set(t.topic, t)
    const kept = [...keptAll.values()]
    const resisted = o.resisted_reward ?? []
    const tr = o.topic_range
    const narrowed = r.narrowed ?? recomputeNarrowed(doc)
    const src = stSource(r)
    const range =
      o.date_range.start_label && o.date_range.end_label
        ? `${o.date_range.start_label} to ${o.date_range.end_label}`
        : `${o.date_range.start.slice(0, 7)} to ${o.date_range.end.slice(0, 7)}`
    const span = tr.window_months ? `first to last ${tr.window_months} months` : 'first to last quarter'
    indicators.push({ label: 'Posts analysed', value: `${o.post_count}, ${range}`, source: src })
    indicators.push({
      label: `Topic diversity, ${span}`,
      value: `${tr.diversity_first_quarter_bits.toFixed(2)} to ${tr.diversity_last_quarter_bits.toFixed(2)} bits (${tr.diversity_change_pct === null ? 'n/a' : signed(tr.diversity_change_pct) + '%'})${tr.quarters ? ` over ${tr.quarters} quarters` : ''}; ${tr.distinct_topics} distinct topics; narrowed (recomputed): ${narrowed ? 'yes' : 'no'}`,
      source: src,
    })
    indicators.push({
      label: 'Rewarded and rising topics (posts)',
      value: (o.rewarded_rising.length ? topicList(o.rewarded_rising) : 'none') + capNote('rewarded_rising', o.rewarded_rising),
      source: src,
    })
    indicators.push({
      label: 'Kept without reward (posts)',
      value: (kept.length ? topicList(kept) : 'none') + capNote('kept', o.kept),
      source: src,
    })
    indicators.push({
      label: 'Rewarded but not followed (resisted reward, posts)',
      value: (resisted.length ? topicList(resisted) : o.resisted_reward ? 'none' : 'not in file') + capNote('resisted_reward', resisted),
      source: src,
    })

    const R = o.rewarded_rising.length
    const K = kept.length
    const X = resisted.length
    const change = tr.diversity_change_pct === null ? '' : ` (${signed(tr.diversity_change_pct)}%)`
    const parts: string[] = []

    // 1. Narrowing first: it decides which statements may follow.
    parts.push(
      narrowed
        ? `${r.label}: topic diversity fell from ${tr.diversity_first_quarter_bits.toFixed(2)} to ${tr.diversity_last_quarter_bits.toFixed(2)} bits${change}, below ${THRESHOLDS.narrowingShare}% of its starting value, so the recorded range narrowed.`
        : `${r.label}: topic diversity went from ${tr.diversity_first_quarter_bits.toFixed(2)} to ${tr.diversity_last_quarter_bits.toFixed(2)} bits${change}, which is not below ${THRESHOLDS.narrowingShare}% of its starting value, so the recorded range did not narrow.`
    )
    // 2. Reward and persistence.
    parts.push(
      R > 0
        ? `${R} topic${R > 1 ? 's were' : ' was'} recorded as rewarded and rising: ${topicList(o.rewarded_rising)}.`
        : 'No topic was recorded as both rewarded and rising.'
    )
    if (K > 0) parts.push(`${K} topic${K > 1 ? 's were' : ' was'} recorded as kept without reward: ${topicList(kept)}.`)
    if (X > 0) parts.push(`${X} rewarded topic${X > 1 ? 's were' : ' was'} not posted about more often (resisted reward): ${topicList(resisted)}.`)
    // 3. Verdict, consistent with the narrowing test above.
    if (narrowed && R > 0) {
      parts.push(
        K + X > 0
          ? 'The record is consistent with an environment rewarding a narrower range of topics, and also shows expression the rewards did not steer.'
          : 'The record is consistent with an environment rewarding a narrower range of topics.'
      )
    } else if (narrowed) {
      parts.push('The range narrowed, but no topic was recorded as rewarded and rising, so the record does not tie the narrowing to reward.')
    } else if (R > 0) {
      parts.push('Some rewarded topics grew, but the overall range did not narrow, so the record does not show a narrower self-presentation.')
    } else {
      parts.push('The record shows neither a narrowing range nor topics that were rewarded and grew.')
    }
    if (['rewarded_rising', 'kept', 'resisted_reward'].some(truncated)) {
      parts.push('Topic lists in this file are cut to the top 3, so counts of rewarded, kept and resisted topics are lower bounds.')
    }
    parts.push(
      'The instrument cannot see which self-presentation the person would have chosen. Kept and resisted topics are its only proxies for that choice, so this reading is about the recorded rewards, not about intentions.'
    )
    if (doc.inputs.source === 'demo') parts.push('This profile is fictional demo data.')
    const warn = warningNote(r)
    if (warn) parts.push(warn)
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
    const faster = civic.filter((e) => e.tempo_delta > 0)
    const slower = civic.filter((e) => e.tempo_delta < 0)
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
      list.map((e) => `${CIVIC_NAMES[e.id] ?? e.id} ${signed(e.tempo_delta)}`).join(', ')
    const n = civic.length
    let s = `${r.label}: of the ${n} civic choices recorded, ${faster.length} ${faster.length === 1 ? 'was an option' : 'were options'} the instrument scores as faster${faster.length ? ` (${named(faster)})` : ''}, ${slower.length} as slower${slower.length ? ` (${named(slower)})` : ''}, and ${aligned.length} of ${n} as system-aligned. Across all encounters the tempo axis ${axisMove(t.change, ['deliberation', 'speed'])} (${signed(t.origin)} to ${signed(t.end)}).`
    if (faster.length >= 2 || (faster.length >= 1 && t.change >= THRESHOLDS.stablePoints)) {
      s += ' In this record, the faster civic options were mostly the ones taken.'
    } else if (faster.length === 0 && aligned.length === 0) {
      s += ' In this record, no faster civic option was taken and every system offer in the civic encounters was declined.'
    } else if (faster.length === 0) {
      s += ' In this record, no faster civic option was taken.'
    } else {
      s += ' In this record, one faster civic option was taken, and the overall tempo did not move toward speed.'
    }
    s += ' Tempo scores are the instrument’s own coding of each option; they do not measure how long anyone actually deliberated.'
    const caveat = verifierCaveat(r)
    if (caveat) s += ` ${caveat}`
    const warn = warningNote(r)
    if (warn) s += ` ${warn}`
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
    value: `${r.doc.privacy?.processing ?? 'processing not declared'}; personal content ${r.doc.privacy?.personal_content_included === false ? 'declared absent' : 'not declared'}; heuristic scan ${r.contentFlags.length ? 'flagged: ' + r.contentFlags.join('; ') : 'flagged nothing'}`,
    source: r.doc.instrument.name === 'narrative-drift' ? ndSource(r) : stSource(r),
  }))
  const reading =
    all.length === 0
      ? ['No result is loaded.']
      : [
          `${all.length} file${all.length > 1 ? 's were' : ' was'} read in this browser and not uploaded. ${declared} of ${all.length} declare that no personal content is included; files that declare the opposite are refused. The Observatory’s scan ${flagged.length ? `flagged ${flagged.length} file${flagged.length > 1 ? 's' : ''} for review. Review the flagged fields before sharing this report.` : 'flagged nothing.'} The scan is a heuristic that looks for suspicious field names and long free text; it can miss personal data and is not a guarantee that none is present.`,
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
      relevance: 'The instruments are designed to export counts and option indices rather than content, and processing here happens on the device. Whether a particular use of these files meets the principle depends on its purpose and context, which this tool does not assess.',
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
      sha256: r.sha256,
      warnings: r.warnings,
    })),
    layers: [epistemic(nd), ontological(st), political(nd), processing(results)],
  }
}
