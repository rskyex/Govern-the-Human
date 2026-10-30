/*
 * Second-Order Assessment.
 *
 * Every reading is built only from the numbers listed as indicators for the
 * same layer, so each sentence can be traced back to a value on the page.
 * Readings describe what the instruments recorded, never what happened to a
 * person. Thresholds are stated in THRESHOLDS, with their rationale in
 * THRESHOLD_RATIONALE, and repeated in the report. Every indicator says which
 * concept of the framework it stands in for (proxyFor).
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

/** Why each threshold has its value. They are provisional: chosen for readability, not calibrated. */
export const THRESHOLD_RATIONALE = {
  status: 'provisional',
  note: 'These thresholds are the Observatory’s own choices, set so readings are stable and easy to check. They are not calibrated against any population or outcome and may change.',
  delegationHigh:
    'Narrative Drift has 9 encounters, so the delegation rate moves in steps of about 11%. 60% or more means at least 6 of 9 choices: a clear majority.',
  delegationLow: '30% or less means at most 2 of 9 choices.',
  stablePoints:
    'A single encounter choice moves the autonomy axis by 6 to 12 points, so a change under 5 points is less than one choice’s worth.',
  narrowingShare: 'Inherited from SelfTrace, which calls a topic range narrowed when diversity falls by at least 25%.',
}

export interface Indicator {
  label: string
  value: string
  source: string
  /** The framework concept this measurement stands in for */
  proxyFor?: string
}

export interface Provision {
  instrument: string
  reference: string
  /** Official text (EUR-Lex), operative words only */
  quote: string
  /** Paraphrase for orientation; not legal text */
  summary: string
  relevance: string
  url: string
}

const EURLEX = {
  aiAct: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689',
  dsa: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022R2065',
  gdpr: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679',
}

export interface LayerAssessment {
  id: 'epistemic' | 'ontological' | 'political'
  layer: string
  question: string
  status: 'assessed' | 'no-data'
  indicators: Indicator[]
  reading: string[]
  provisions: Provision[]
}

/** How the files were handled. Not a layer of the framework: a check on the assessment itself. */
export interface DataHandlingCheck {
  question: string
  indicators: Indicator[]
  reading: string[]
  provisions: Provision[]
}

export interface Assessment {
  schema: 'gth-assessment/v1'
  generated_at: string
  observatory_version: string
  disclaimer: string
  thresholds: typeof THRESHOLDS
  threshold_rationale: typeof THRESHOLD_RATIONALE
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
  data_handling: DataHandlingCheck
}

export const DISCLAIMER =
  'This is not a legal or clinical assessment. It reports what the instruments recorded during a run, which may be a scripted, simulated or fictional one, and does not describe anyone’s behaviour outside the instruments. Provisions are listed because they address the same question, not to suggest compliance or breach; quotes are from the official EUR-Lex text and summaries are paraphrased.'

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
    provisions: [
      {
        instrument: 'EU AI Act (Regulation (EU) 2024/1689)',
        reference: 'Article 4, AI literacy',
        quote:
          '“Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf …”',
        summary:
          'Providers and deployers must take measures to ensure, as far as they can, that their staff and other people operating or using AI systems on their behalf have sufficient AI literacy.',
        relevance:
          'Indirect. Article 4 covers providers’ and deployers’ staff and people acting on their behalf, not the end users in these encounters. It is listed because the duty rests on people keeping enough understanding to exercise their own judgement alongside a system, which is what the delegation rate records for routine choices.',
        url: EURLEX.aiAct,
      },
    ],
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
      proxyFor: 'Epistemic dependence: routine choices handed to the system',
    })
    indicators.push({
      label: 'Autonomy axis, origin to end',
      value: `${signed(a.origin)} to ${signed(a.end)} (change ${signed(a.change)})`,
      source: ndSource(r),
      proxyFor: 'Epistemic dependence. The home page places autonomy under the Ontological layer, so this indicator also bears on it',
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
    provisions: [
      {
        instrument: 'Digital Services Act (Regulation (EU) 2022/2065)',
        reference: 'Article 34(1)(b) and 34(2)(a), systemic risk assessment',
        quote:
          '“Providers of very large online platforms and of very large online search engines shall diligently identify, analyse and assess any systemic risks … (b) any actual or foreseeable negative effects for the exercise of fundamental rights, … to freedom of expression and information …” and, as a factor, “(a) the design of their recommender systems and any other relevant algorithmic system”',
        summary:
          'Very large online platforms and very large online search engines must assess systemic risks from their services, including actual or foreseeable negative effects on fundamental rights such as freedom of expression and information, taking into account in particular how their recommender systems are designed.',
        relevance:
          'Engagement rewards that concentrate what someone posts on fewer topics bear on how freedom of expression is exercised, and recommender design is a named factor. The duty applies only to very large platforms and search engines and is assessed across a service; SelfTrace shows the pattern for one account.',
        url: EURLEX.dsa,
      },
    ],
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
    indicators.push({ label: 'Posts analysed', value: `${o.post_count}, ${range}`, source: src, proxyFor: 'Context only' })
    indicators.push({
      proxyFor: 'Range of self-presentation',
      label: `Topic diversity, ${span}`,
      value: `${tr.diversity_first_quarter_bits.toFixed(2)} to ${tr.diversity_last_quarter_bits.toFixed(2)} bits (${tr.diversity_change_pct === null ? 'n/a' : signed(tr.diversity_change_pct) + '%'})${tr.quarters ? ` over ${tr.quarters} quarters` : ''}; ${tr.distinct_topics} distinct topics; narrowed (recomputed): ${narrowed ? 'yes' : 'no'}`,
      source: src,
    })
    indicators.push({
      proxyFor: 'Self-presentation the environment rewarded',
      label: 'Rewarded and rising topics (posts)',
      value: (o.rewarded_rising.length ? topicList(o.rewarded_rising) : 'none') + capNote('rewarded_rising', o.rewarded_rising),
      source: src,
    })
    indicators.push({
      proxyFor: 'Self-presentation chosen without reward',
      label: 'Kept without reward (posts)',
      value: (kept.length ? topicList(kept) : 'none') + capNote('kept', o.kept),
      source: src,
    })
    indicators.push({
      proxyFor: 'Self-presentation not steered by reward',
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
    provisions: [
      {
        instrument: 'EU AI Act (Regulation (EU) 2024/1689)',
        reference: 'Article 5(1)(a), prohibited manipulative techniques',
        quote:
          '“… an AI system that deploys subliminal techniques beyond a person’s consciousness or purposefully manipulative or deceptive techniques, with the objective, or the effect of materially distorting the behaviour of a person or a group of persons by appreciably impairing their ability to make an informed decision, thereby causing them to take a decision that they would not have otherwise taken in a manner that causes or is reasonably likely to cause that person, another person or group of persons significant harm”',
        summary:
          'Prohibits AI systems that use subliminal, purposefully manipulative or deceptive techniques to materially distort behaviour by appreciably impairing people’s ability to make an informed decision, causing them to take a decision they would not otherwise have taken, in a way that causes or is reasonably likely to cause significant harm.',
        relevance:
          'The prohibition turns on manipulative or deceptive techniques, impaired informed decision-making that causes a decision the person would not otherwise have taken, and significant harm. Taking the faster civic option is a related behavioural signal, not a condition of the prohibition, and is not evidence that any element of it is met.',
        url: EURLEX.aiAct,
      },
      {
        instrument: 'EU AI Act (Regulation (EU) 2024/1689)',
        reference: 'Annex III, point 8(b), high-risk AI systems',
        quote:
          '“AI systems intended to be used for influencing the outcome of an election or referendum or the voting behaviour of natural persons in the exercise of their vote in elections or referenda.”',
        summary:
          'Lists as high-risk AI systems intended to influence the outcome of an election or referendum or how people vote, excluding tools whose output people are not directly exposed to, such as campaign logistics.',
        relevance:
          'The curated political feed and the AI summary of candidates resemble systems in this category, which carries high-risk obligations rather than a prohibition. The pre-drafted petition comment is not about an election or referendum and falls outside it.',
        url: EURLEX.aiAct,
      },
    ],
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
    indicators.push({
      label: 'Tempo axis, origin to end',
      value: `${signed(t.origin)} to ${signed(t.end)} (change ${signed(t.change)})`,
      source: ndSource(r),
      proxyFor: 'Deliberation, as the instrument codes each option (not time actually spent)',
    })
    for (const e of civic) {
      indicators.push({
        label: `Civic encounter: ${CIVIC_NAMES[e.id] ?? e.id}`,
        value: `option ${e.choice_index + 1} (${e.choice_id}); tempo ${signed(e.tempo_delta)}; ${e.system_aligned ? 'system-aligned' : 'not system-aligned'}`,
        source: ndSource(r),
        proxyFor: 'Deliberation in a civic act',
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

/* ── Data handling check (not a layer) ─────────────────────── */

function dataHandling(all: LoadedResult[]): DataHandlingCheck {
  const flagged = all.filter((r) => r.contentFlags.length > 0)
  const declared = all.filter((r) => r.doc.privacy?.personal_content_included === false).length
  const indicators: Indicator[] = all.map((r) => ({
    label: `${r.fileName}`,
    value: `${r.doc.privacy?.processing ?? 'processing not declared'}; personal content ${r.doc.privacy?.personal_content_included === false ? 'declared absent' : 'not declared'}; heuristic scan ${r.contentFlags.length ? 'flagged: ' + r.contentFlags.join('; ') : 'flagged nothing'}`,
    source: r.doc.instrument.name === 'narrative-drift' ? ndSource(r) : stSource(r),
    proxyFor: 'Data minimisation in this assessment',
  }))
  const reading =
    all.length === 0
      ? ['No result is loaded.']
      : [
          `${all.length} file${all.length > 1 ? 's were' : ' was'} read in this browser and not uploaded. ${declared} of ${all.length} declare that no personal content is included; files that declare the opposite are refused. The Observatory’s scan ${flagged.length ? `flagged ${flagged.length} file${flagged.length > 1 ? 's' : ''} for review. Review the flagged fields before sharing this report.` : 'flagged nothing.'} The scan is a heuristic that looks for suspicious field names and long free text; it can miss personal data and is not a guarantee that none is present.`,
        ]
  return {
    question: 'Does the assessment use only the data it needs?',
    indicators,
    reading,
    provisions: [
      {
        instrument: 'GDPR (Regulation (EU) 2016/679)',
        reference: 'Article 5(1)(c), data minimisation',
        quote:
          'Personal data shall be “adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed (‘data minimisation’)”',
        summary: 'Personal data must be adequate, relevant and limited to what is necessary for the purposes it is processed for.',
        relevance:
          'The instruments are designed to export counts and option indices rather than content, and processing here happens on the device. Whether a particular use of these files meets the principle depends on its purpose and context, which this tool does not assess.',
        url: EURLEX.gdpr,
      },
    ],
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
    threshold_rationale: THRESHOLD_RATIONALE,
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
    layers: [epistemic(nd), ontological(st), political(nd)],
    data_handling: dataHandling(results),
  }
}
