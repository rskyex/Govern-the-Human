import type { GthResult, LoadedResult, NarrativeDriftResult, SelfTraceResult } from './types'

const AXES = ['autonomy', 'novelty', 'sociality', 'tempo', 'affect'] as const

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)

/** Keys that would suggest personal free text has slipped into a result file. */
const SUSPECT_KEYS = /^(text|content|body|post|posts|answer|answers|reflection|name|user_?name|email|mbti|enneagram|phrase|phrases)$/i
/** Strings allowed to be long: explanatory notes and definitions written by the instrument. */
const LONG_OK_PARENTS = new Set(['note', 'definitions', 'excluded'])

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

function validateND(d: Record<string, unknown>): string | null {
  const o = d.outputs as Record<string, unknown>
  if (typeof o.classification !== 'string') return 'outputs.classification is missing'
  for (const k of ['total_displacement_pct', 'system_aligned_pct', 'system_aligned_count', 'encounter_count']) {
    if (!isNum(o[k])) return `outputs.${k} is missing or not a number`
  }
  if (!isObj(o.axes)) return 'outputs.axes is missing'
  for (const a of AXES) {
    const ax = (o.axes as Record<string, unknown>)[a]
    if (!isObj(ax) || !isNum(ax.origin) || !isNum(ax.end) || !isNum(ax.change)) return `outputs.axes.${a} is incomplete`
  }
  if (!Array.isArray(o.encounters)) return 'outputs.encounters is missing'
  return null
}

function validateST(d: Record<string, unknown>): string | null {
  const o = d.outputs as Record<string, unknown>
  if (!isNum(o.post_count)) return 'outputs.post_count is missing'
  if (!isObj(o.date_range)) return 'outputs.date_range is missing'
  for (const k of ['top_topics', 'rewarded_rising', 'kept']) {
    if (!Array.isArray(o[k])) return `outputs.${k} is missing`
  }
  const tr = o.topic_range
  if (!isObj(tr) || !isNum(tr.diversity_first_quarter_bits) || !isNum(tr.diversity_last_quarter_bits) || typeof tr.narrowed !== 'boolean') {
    return 'outputs.topic_range is incomplete'
  }
  return null
}

export type ParseOutcome = { ok: true; result: LoadedResult } | { ok: false; error: string }

export function parseResult(text: string, fileName: string): ParseOutcome {
  let d: unknown
  try {
    d = JSON.parse(text)
  } catch {
    return { ok: false, error: `${fileName}: not valid JSON.` }
  }
  if (!isObj(d)) return { ok: false, error: `${fileName}: expected a JSON object.` }
  if (d.schema !== 'gth-result/v1') {
    return { ok: false, error: `${fileName}: schema is "${String(d.schema ?? 'missing')}", expected "gth-result/v1".` }
  }
  if (!isObj(d.instrument) || !isObj(d.outputs) || !isObj(d.inputs)) {
    return { ok: false, error: `${fileName}: instrument, inputs or outputs is missing.` }
  }
  const name = d.instrument.name
  let problem: string | null
  if (name === 'narrative-drift') problem = validateND(d)
  else if (name === 'selftrace') problem = validateST(d)
  else return { ok: false, error: `${fileName}: unknown instrument "${String(name)}".` }
  if (problem) return { ok: false, error: `${fileName}: ${problem}.` }

  const doc = d as unknown as GthResult
  const label =
    doc.instrument.name === 'narrative-drift'
      ? (doc as NarrativeDriftResult).inputs.script ||
        `Interactive run ${(doc as NarrativeDriftResult).inputs.sequence ?? '(sequence not recorded)'}`
      : (doc as SelfTraceResult).inputs.profile_label || 'Own data'
  const key = `${doc.instrument.name}|${doc.generated_at}|${JSON.stringify(doc.outputs).length}`
  return { ok: true, result: { key, fileName, label, doc, contentFlags: scanForPersonalContent(d) } }
}
