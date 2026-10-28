import type { GthResult, LoadedResult, NarrativeDriftResult, SelfTraceResult } from './types'

const AXES = ['autonomy', 'novelty', 'sociality', 'tempo', 'affect'] as const

/** Narrative Drift always plays this many encounters, of which this many are civic (zone 3). */
export const ND_ENCOUNTERS = 9
export const ND_CIVIC = 3
/** SelfTrace narrowing, recomputed here: last diversity below this share of the first. */
export const NARROWING_SHARE = 0.75

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const isInt = (v: unknown): v is number => Number.isInteger(v)
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
/** ISO 8601 date or date-time, and a real calendar date. */
const ISO = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$/
const isIso = (v: unknown): v is string => typeof v === 'string' && ISO.test(v) && !Number.isNaN(Date.parse(v))
/** Instrument builds are stamped with a git sha or a package version. */
const VERSION = /^([0-9a-f]{7,40}|\d+\.\d+\.\d+([-+][\w.]+)?)$/

/** Keys that would suggest personal free text has slipped into a result file. */
const SUSPECT_KEYS = /^(text|content|body|post|posts|answer|answers|reflection|name|user_?name|email|mbti|enneagram|phrase|phrases)$/i
/** Strings allowed to be long: explanatory notes and definitions written by the instrument. */
const LONG_OK_PARENTS = new Set(['note', 'definitions', 'excluded'])

/**
 * Heuristic scan for fields that look like personal content: suspicious key
 * names and long free text. It can miss personal data in short strings or
 * innocuous-looking keys, so a clean scan is not a guarantee.
 */
export function scanForPersonalContent(doc: unknown): string[] {
  const flags: string[] = []
  const walk = (v: unknown, path: string[], parent: string) => {
    if (typeof v === 'string') {
      if (v.length > 160 && !LONG_OK_PARENTS.has(parent) && !path.some((p) => LONG_OK_PARENTS.has(p))) {
        flags.push(`Long free text at ${path.join('.')}`)
      }
      return
    }
    if (Array.isArray(v)) {
      v.forEach((x, i) => walk(x, [...path, String(i)], parent))
      return
    }
    if (isObj(v)) {
      for (const [k, x] of Object.entries(v)) {
        if (SUSPECT_KEYS.test(k) && path[0] !== 'privacy' && path[0] !== 'instrument') flags.push(`Field "${[...path, k].join('.')}"`)
        walk(x, [...path, k], k)
      }
    }
  }
  walk(doc, [], '')
  return flags
}

/** Collects fatal problems; the first one is reported. */
class Problems {
  list: string[] = []
  add(msg: string) {
    this.list.push(msg)
  }
  check(ok: boolean, msg: string) {
    if (!ok) this.list.push(msg)
    return ok
  }
}

function validateND(d: Record<string, unknown>, p: Problems) {
  const o = d.outputs as Record<string, unknown>
  const i = d.inputs as Record<string, unknown>
  p.check(typeof o.classification === 'string', 'outputs.classification is missing')
  for (const k of ['total_displacement_pct', 'system_aligned_pct', 'system_aligned_count', 'encounter_count']) {
    p.check(isInt(o[k]), `outputs.${k} is missing or not a whole number`)
  }
  if (p.list.length) return
  const count = o.encounter_count as number
  const aligned = o.system_aligned_count as number
  const alignedPct = o.system_aligned_pct as number
  p.check(count === ND_ENCOUNTERS, `outputs.encounter_count is ${count}; Narrative Drift always records ${ND_ENCOUNTERS} encounters`)
  p.check(aligned >= 0 && aligned <= count, `outputs.system_aligned_count ${aligned} is outside 0 to ${count}`)
  p.check(alignedPct >= 0 && alignedPct <= 100, `outputs.system_aligned_pct ${alignedPct} is outside 0 to 100`)
  if (count > 0) {
    const expected = Math.round((aligned / count) * 100)
    p.check(Math.abs(expected - alignedPct) <= 1, `outputs.system_aligned_pct is ${alignedPct}, but ${aligned} of ${count} is ${expected}%`)
  }
  const disp = o.total_displacement_pct as number
  p.check(disp >= 0 && disp <= 100, `outputs.total_displacement_pct ${disp} is outside 0 to 100`)

  if (p.check(isObj(o.axes), 'outputs.axes is missing')) {
    for (const a of AXES) {
      const ax = (o.axes as Record<string, unknown>)[a]
      if (!isObj(ax) || !isNum(ax.origin) || !isNum(ax.end) || !isNum(ax.change)) {
        p.add(`outputs.axes.${a} is incomplete`)
        continue
      }
      for (const k of ['origin', 'end'] as const) {
        p.check((ax[k] as number) >= -100 && (ax[k] as number) <= 100, `outputs.axes.${a}.${k} ${ax[k]} is outside -100 to +100`)
      }
      p.check(ax.change === (ax.end as number) - (ax.origin as number), `outputs.axes.${a}.change is ${ax.change}, but end − origin is ${(ax.end as number) - (ax.origin as number)}`)
    }
  }

  if (!p.check(Array.isArray(o.encounters), 'outputs.encounters is missing')) return
  const enc = o.encounters as unknown[]
  p.check(enc.length === count, `outputs.encounters has ${enc.length} entries, but encounter_count is ${count}`)
  let civic = 0
  let flagged = 0
  enc.forEach((e, n) => {
    if (!isObj(e)) return p.add(`outputs.encounters.${n} is not an object`)
    const ok =
      typeof e.id === 'string' &&
      typeof e.choice_id === 'string' &&
      isInt(e.zone) &&
      isInt(e.choice_index) &&
      typeof e.system_aligned === 'boolean' &&
      isNum(e.autonomy_delta) &&
      isNum(e.tempo_delta)
    if (!p.check(ok, `outputs.encounters.${n} is incomplete`)) return
    p.check([1, 2, 3].includes(e.zone as number), `outputs.encounters.${n}.zone is ${e.zone}; expected 1, 2 or 3`)
    p.check((e.choice_index as number) >= 0, `outputs.encounters.${n}.choice_index is negative`)
    if (e.zone === 3) civic++
    if (e.system_aligned) flagged++
  })
  p.check(civic === ND_CIVIC, `the file has ${civic} civic (zone 3) encounters; Narrative Drift always has ${ND_CIVIC}`)
  p.check(flagged === aligned, `outputs.system_aligned_count is ${aligned}, but ${flagged} encounters are marked system-aligned`)

  if (i.mode !== undefined) p.check(i.mode === 'interactive' || i.mode === 'verifier', `inputs.mode "${String(i.mode)}" is not "interactive" or "verifier"`)
  if (Array.isArray(i.encounter_choices) && enc.every(isObj)) {
    const fromEnc = enc.map((e) => (e as Record<string, unknown>).choice_index)
    p.check(JSON.stringify(i.encounter_choices) === JSON.stringify(fromEnc), 'inputs.encounter_choices does not match the choice_index of each encounter')
  }
}

function validateST(d: Record<string, unknown>, p: Problems) {
  const o = d.outputs as Record<string, unknown>
  const i = d.inputs as Record<string, unknown>
  if (!p.check(isInt(o.post_count) && (o.post_count as number) >= 0, 'outputs.post_count is missing or not a whole number')) return
  const posts = o.post_count as number
  if (i.post_count !== undefined) p.check(i.post_count === posts, `inputs.post_count ${String(i.post_count)} differs from outputs.post_count ${posts}`)

  if (p.check(isObj(o.date_range), 'outputs.date_range is missing')) {
    const dr = o.date_range as Record<string, unknown>
    const s = p.check(isIso(dr.start), 'outputs.date_range.start is missing or not an ISO 8601 date')
    const e = p.check(isIso(dr.end), 'outputs.date_range.end is missing or not an ISO 8601 date')
    if (s && e) p.check(Date.parse(dr.start as string) <= Date.parse(dr.end as string), 'outputs.date_range.start is after its end')
  }

  if (p.check(Array.isArray(o.top_topics), 'outputs.top_topics is missing')) {
    ;(o.top_topics as unknown[]).forEach((t, n) => {
      const ok = isObj(t) && typeof t.topic === 'string' && isInt(t.count) && (t.count as number) >= 0
      if (p.check(ok, `outputs.top_topics.${n} is incomplete`)) {
        p.check(((t as Record<string, unknown>).count as number) <= posts, `outputs.top_topics.${n}.count is larger than post_count`)
      }
    })
  }
  for (const k of ['rewarded_rising', 'kept', 'kept_without_encouragement', 'resisted_reward']) {
    if (o[k] === undefined && (k === 'kept_without_encouragement' || k === 'resisted_reward')) continue
    if (!p.check(Array.isArray(o[k]), `outputs.${k} is missing`)) continue
    ;(o[k] as unknown[]).forEach((t, n) => {
      const ok = isObj(t) && typeof t.topic === 'string' && isInt(t.post_count) && (t.post_count as number) >= 0
      if (p.check(ok, `outputs.${k}.${n} is incomplete`)) {
        p.check(((t as Record<string, unknown>).post_count as number) <= posts, `outputs.${k}.${n}.post_count is larger than post_count`)
      }
    })
  }

  const tr = o.topic_range
  if (!isObj(tr)) return p.add('outputs.topic_range is missing')
  const first = tr.diversity_first_quarter_bits
  const last = tr.diversity_last_quarter_bits
  if (!isNum(first) || !isNum(last)) return p.add('outputs.topic_range diversity bits are missing')
  p.check(first >= 0 && first <= 20 && last >= 0 && last <= 20, 'outputs.topic_range diversity bits are outside 0 to 20')
  p.check(isInt(tr.distinct_topics) && (tr.distinct_topics as number) >= 0, 'outputs.topic_range.distinct_topics is missing')
  p.check(typeof tr.narrowed === 'boolean', 'outputs.topic_range.narrowed is missing')
  if (isNum(tr.diversity_change_pct) && first > 0) {
    // Bits are rounded to two decimals in the file, so allow two points of slack.
    const expected = ((last - first) / first) * 100
    p.check(Math.abs(expected - tr.diversity_change_pct) <= 2, `outputs.topic_range.diversity_change_pct is ${tr.diversity_change_pct}, but the bits give ${Math.round(expected)}`)
  }
}

/** Recompute "narrowed" from the bits rather than trusting the file's flag. */
export function recomputeNarrowed(doc: SelfTraceResult): boolean {
  const tr = doc.outputs.topic_range
  if (tr.sufficient === false) return false
  return tr.diversity_first_quarter_bits > 0 && tr.diversity_last_quarter_bits < tr.diversity_first_quarter_bits * NARROWING_SHARE
}

export type ParseOutcome = { ok: true; result: LoadedResult } | { ok: false; error: string }

export function parseResult(text: string, fileName: string, sha256: string | null = null): ParseOutcome {
  let d: unknown
  try {
    d = JSON.parse(text)
  } catch {
    return { ok: false, error: `${fileName}: not valid JSON.` }
  }
  try {
    return check(d, fileName, sha256)
  } catch (e) {
    // A malformed file must never take the page down with it.
    return { ok: false, error: `${fileName}: could not be read (${e instanceof Error ? e.message : String(e)}).` }
  }
}

function check(d: unknown, fileName: string, sha256: string | null): ParseOutcome {
  if (!isObj(d)) return { ok: false, error: `${fileName}: expected a JSON object.` }
  if (d.schema !== 'gth-result/v1') {
    return { ok: false, error: `${fileName}: schema is "${String(d.schema ?? 'missing')}", expected "gth-result/v1".` }
  }
  if (!isObj(d.instrument) || !isObj(d.outputs) || !isObj(d.inputs)) {
    return { ok: false, error: `${fileName}: instrument, inputs or outputs is missing.` }
  }
  const name = d.instrument.name
  if (name !== 'narrative-drift' && name !== 'selftrace') return { ok: false, error: `${fileName}: unknown instrument "${String(name)}".` }

  const privacy = isObj(d.privacy) ? d.privacy : null
  if (privacy?.personal_content_included === true) {
    return {
      ok: false,
      error: `${fileName}: the file declares personal_content_included: true. The Observatory does not read files that say they contain personal content.`,
    }
  }

  const p = new Problems()
  if (typeof d.instrument.version !== 'string' || !d.instrument.version) p.add('instrument.version is missing')
  if (!isIso(d.generated_at)) p.add('generated_at is missing or not an ISO 8601 timestamp')
  if (name === 'narrative-drift') validateND(d, p)
  else validateST(d, p)
  if (p.list.length) {
    const more = p.list.length > 1 ? ` (and ${p.list.length - 1} more problem${p.list.length > 2 ? 's' : ''})` : ''
    return { ok: false, error: `${fileName}: ${p.list[0]}${more}.` }
  }

  const doc = d as unknown as GthResult
  const warnings: string[] = []
  if (!VERSION.test(doc.instrument.version)) warnings.push(`Instrument version "${doc.instrument.version}" is not a git sha or package version, so the build cannot be identified.`)
  if (!privacy) warnings.push('The file has no privacy block, so it does not declare whether personal content is included.')
  else {
    if (privacy.personal_content_included !== false) warnings.push('The file does not declare personal_content_included: false.')
    if (privacy.processing !== 'client-side') warnings.push(`Processing is declared as "${String(privacy.processing ?? 'not stated')}", not "client-side".`)
  }

  let narrowed: boolean | undefined
  if (doc.instrument.name === 'selftrace') {
    const st = doc as SelfTraceResult
    narrowed = recomputeNarrowed(st)
    if (narrowed !== st.outputs.topic_range.narrowed) {
      warnings.push(
        `The file says narrowed: ${st.outputs.topic_range.narrowed}, but its diversity bits give ${narrowed} (last below ${NARROWING_SHARE * 100}% of first). The report uses the recomputed value.`
      )
    }
  }

  const label =
    doc.instrument.name === 'narrative-drift'
      ? (doc as NarrativeDriftResult).inputs.script ||
        `Interactive run ${(doc as NarrativeDriftResult).inputs.sequence ?? '(sequence not recorded)'}`
      : (doc as SelfTraceResult).inputs.profile_label || 'Own data'
  const key = sha256 ?? `${doc.instrument.name}|${doc.generated_at}|${JSON.stringify(doc.outputs).length}`
  return {
    ok: true,
    result: { key, fileName, label, doc, sha256, contentFlags: scanForPersonalContent(d), warnings, narrowed },
  }
}
