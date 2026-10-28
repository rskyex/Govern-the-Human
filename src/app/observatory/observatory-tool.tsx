'use client'

import { Component, useCallback, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { parseResult } from '@/lib/observatory/parse'
import { buildAssessment, DISCLAIMER, THRESHOLDS, type Assessment, type Indicator, type Provision } from '@/lib/observatory/assess'
import type { LoadedResult } from '@/lib/observatory/types'
import { FIXTURE_PATH, REFERENCE_RUNS } from '@/lib/observatory/reference'

const VERSION = process.env.NEXT_PUBLIC_OBSERVATORY_VERSION || 'unknown'


async function sha256Hex(text: string): Promise<string | null> {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return null
  }
}

/** Keeps a rendering failure in the report from removing the loaded files. */
class ReportBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null }
  static getDerivedStateFromError(e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="mt-16 border border-red-800/20 bg-red-50 rounded-sm p-4">
          <p className="font-sans text-[13px] font-medium text-red-900 mb-1">The report could not be built from these files</p>
          <p className="font-sans text-[13px] text-red-900">
            {this.state.error}. The loaded files are kept; remove the file that caused this and the report will be rebuilt.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

const label = 'font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-text-ghost'
const btnPrimary =
  'font-sans text-[13px] tracking-[0.04em] px-5 py-3 rounded-sm bg-text-primary text-white hover:bg-text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-subtitle disabled:opacity-40'
const btnSecondary =
  'font-sans text-[13px] tracking-[0.04em] px-5 py-3 rounded-sm border border-text-ghost/40 text-text-secondary hover:border-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-subtitle disabled:opacity-40'

function download(name: string, text: string) {
  const blob = new Blob([text], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function ObservatoryTool() {
  const [results, setResults] = useState<LoadedResult[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const add = useCallback(async (items: { name: string; text: string }[]) => {
    const errs: string[] = []
    const ok: LoadedResult[] = []
    for (const it of items) {
      const out = parseResult(it.text, it.name, await sha256Hex(it.text))
      if (!out.ok) {
        errs.push(out.error)
        continue
      }
      // A file that passes the checks but still breaks the assessment is refused on its own.
      try {
        buildAssessment([out.result], VERSION)
        ok.push(out.result)
      } catch (e) {
        errs.push(`${it.name}: could not be assessed (${e instanceof Error ? e.message : String(e)}).`)
      }
    }
    setErrors(errs)
    setResults((prev) => {
      const seen = new Set(prev.map((r) => r.key))
      return [...prev, ...ok.filter((r) => !seen.has(r.key) && (seen.add(r.key), true))]
    })
  }, [])

  const readFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files)
      const items = await Promise.all(list.map(async (f) => ({ name: f.name, text: await f.text() })))
      add(items)
    },
    [add]
  )

  const loadExamples = async () => {
    try {
      const items = await Promise.all(
        REFERENCE_RUNS.map(async ({ file: name }) => {
          const res = await fetch(FIXTURE_PATH + name)
          if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
          return { name, text: await res.text() }
        })
      )
      await add(items)
    } catch (e) {
      setErrors([`The reference runs could not be loaded (${e instanceof Error ? e.message : String(e)}).`])
    }
  }

  const report: Assessment | null = useMemo(() => {
    if (!results.length) return null
    try {
      return buildAssessment(results, VERSION)
    } catch {
      return null
    }
  }, [results])

  return (
    <div>
      {/* ── Loader ── */}
      <div className="print:hidden">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            if (e.dataTransfer.files.length) readFiles(e.dataTransfer.files)
          }}
          className={`border border-dashed rounded-sm p-6 md:p-10 transition-colors ${
            dragging ? 'border-text-subtitle bg-surface' : 'border-text-ghost/40 bg-panel'
          }`}
        >
          <p className="font-display text-[1.25rem] md:text-[1.4rem] text-text-primary mb-3">Load results</p>
          <p className="font-sans text-[0.9rem] leading-[1.8] text-text-tertiary font-light mb-6 max-w-[620px]">
            Drop one or more result files here, or choose them from your device. Narrative Drift and
            SelfTrace both offer &quot;Download result (JSON)&quot; at the end of a run. Files are read in this
            browser and are not uploaded anywhere.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept=".json,application/json"
              multiple
              className="sr-only peer"
              onChange={(e) => {
                if (e.target.files?.length) readFiles(e.target.files)
                e.target.value = ''
              }}
            />
            <label
              htmlFor={inputId}
              className={`${btnPrimary} cursor-pointer text-center peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-text-subtitle peer-focus-visible:outline-none`}
            >
              Choose JSON files
            </label>
            <button type="button" className={btnSecondary} onClick={loadExamples}>
              Load example results
            </button>
            {results.length > 0 && (
              <button
                type="button"
                className={btnSecondary}
                onClick={() => {
                  setResults([])
                  setErrors([])
                }}
              >
                Clear
              </button>
            )}
          </div>
          <p className="font-sans text-[12px] leading-[1.7] text-text-ghost mt-5">
            The examples are reference runs: Narrative Drift Script A and Script B (verifier replays of fixed
            scripts) and the SelfTrace demo profile. See &quot;Verify&quot; below to reproduce them.
          </p>
        </div>

        {errors.length > 0 && (
          <div role="alert" className="mt-5 border border-red-800/20 bg-red-50 rounded-sm p-4">
            <p className="font-sans text-[13px] font-medium text-red-900 mb-1">Some files could not be read</p>
            <ul className="font-sans text-[13px] text-red-900 list-disc pl-5">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8">
            <p className={`${label} mb-3`}>Loaded</p>
            <ul className="divide-y divide-rule border-y border-rule" aria-live="polite">
              {results.map((r) => (
                <li key={r.key} className="py-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-sans text-[14px] text-text-primary">
                      {r.doc.instrument.name === 'narrative-drift' ? 'Narrative Drift' : 'SelfTrace'}: {r.label}
                    </p>
                    <p className="font-sans text-[12px] text-text-ghost break-all">
                      {r.fileName} &middot; version {r.doc.instrument.version} &middot; {r.doc.generated_at}
                    </p>
                    {r.warnings.map((w) => (
                      <p key={w} className="font-sans text-[12px] text-amber-900 mt-1">
                        Check: {w}
                      </p>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="font-sans text-[12px] text-text-ghost hover:text-text-primary underline underline-offset-4 shrink-0"
                    onClick={() => setResults((prev) => prev.filter((x) => x.key !== r.key))}
                    aria-label={`Remove ${r.fileName}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Announces report changes to screen readers */}
      <p className="sr-only" role="status" aria-live="polite">
        {report
          ? `Report generated from ${report.sources.length} file${report.sources.length > 1 ? 's' : ''}: ${report.layers.filter((l) => l.status === 'assessed').length} of ${report.layers.length} layers assessed.`
          : results.length
            ? 'The report could not be generated.'
            : ''}
      </p>

      {/* ── Report ── */}
      {report && (
        <ReportBoundary key={results.map((r) => r.key).join('|')}>
          <Report report={report} />
        </ReportBoundary>
      )}
    </div>
  )
}

function Report({ report }: { report: Assessment }) {
  return (
    <article id="assessment-report" aria-labelledby="report-title" className="mt-16 print:mt-0">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <p className={`${label} mb-3`}>Report</p>
          <h2 id="report-title" className="font-display text-[1.8rem] md:text-[2.2rem] font-normal leading-[1.2] tracking-[-0.015em] text-text-primary">
            Second-Order Assessment
          </h2>
          <p className="font-sans text-[12px] text-text-ghost mt-2">
            Generated {report.generated_at} &middot; Observatory {report.observatory_version}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            type="button"
            className={btnPrimary}
            onClick={() =>
              download(`gth-assessment-${report.generated_at.slice(0, 10)}.json`, JSON.stringify(report, null, 2))
            }
          >
            Export report (JSON)
          </button>
          <button type="button" className={btnSecondary} onClick={() => window.print()}>
            Print or save as PDF
          </button>
        </div>
      </div>

      <div className="border-l-2 border-text-subtitle/60 bg-surface px-5 py-4 mb-10" role="note">
        <p className="font-sans text-[13px] leading-[1.8] text-text-secondary">{DISCLAIMER}</p>
      </div>

      <section aria-labelledby="sources-title" className="mb-12">
        <h3 id="sources-title" className={`${label} mb-3`}>
          Sources
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full font-sans text-[13px] text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-rule text-text-ghost">
                <th scope="col" className="py-2 pr-4 font-medium">Instrument</th>
                <th scope="col" className="py-2 pr-4 font-medium">Run</th>
                <th scope="col" className="py-2 pr-4 font-medium">Mode</th>
                <th scope="col" className="py-2 pr-4 font-medium">Version</th>
                <th scope="col" className="py-2 pr-4 font-medium">Exported</th>
                <th scope="col" className="py-2 font-medium">SHA-256</th>
              </tr>
            </thead>
            <tbody>
              {report.sources.map((s) => (
                <tr key={s.file + s.generated_at} className="border-b border-rule text-text-secondary">
                  <td className="py-2 pr-4">{s.instrument === 'narrative-drift' ? 'Narrative Drift' : 'SelfTrace'}</td>
                  <td className="py-2 pr-4">{s.label}</td>
                  <td className="py-2 pr-4">{s.mode}</td>
                  <td className="py-2 pr-4 font-mono text-[12px]">{s.version}</td>
                  <td className="py-2 pr-4 font-mono text-[12px]">{s.generated_at}</td>
                  <td className="py-2 font-mono text-[11px] break-all" title={s.sha256 ?? undefined}>
                    {s.sha256 ? `${s.sha256.slice(0, 12)}…` : 'n/a'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-10">
        {report.layers.map((l) => (
          <LayerCard key={l.id} id={l.id} kicker={l.layer} question={l.question} muted={l.status === 'no-data'} indicators={l.indicators} reading={l.reading} provisions={l.provisions} />
        ))}
        {report.data_handling.indicators.length > 0 && (
          <LayerCard
            id="data-handling"
            kicker="Data handling check (not a framework layer)"
            question={report.data_handling.question}
            indicators={report.data_handling.indicators}
            reading={report.data_handling.reading}
            provisions={report.data_handling.provisions}
          />
        )}
      </div>

      <section aria-labelledby="thresholds-title" className="mt-10 font-sans text-[12px] leading-[1.8] text-text-ghost">
        <h3 id="thresholds-title" className="font-medium text-text-tertiary mb-1">
          Thresholds ({report.threshold_rationale.status})
        </h3>
        <p className="mb-2">{report.threshold_rationale.note}</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Delegation high at {THRESHOLDS.delegationHigh}% or more: {report.threshold_rationale.delegationHigh}</li>
          <li>Delegation low at {THRESHOLDS.delegationLow}% or less: {report.threshold_rationale.delegationLow}</li>
          <li>An axis is stable when it moves less than {THRESHOLDS.stablePoints} points: {report.threshold_rationale.stablePoints}</li>
          <li>
            Topic range narrowed when the last SelfTrace diversity value is below {THRESHOLDS.narrowingShare}% of the first
            (recomputed from the bits in the file): {report.threshold_rationale.narrowingShare}
          </li>
        </ul>
        <p>
          Indicators are labelled with the framework concept each one stands in for. Provision quotes are from the official
          EUR-Lex text; summaries are paraphrased for orientation and are not legal text. The full SHA-256 of each source
          file is in the exported JSON.
        </p>
      </section>
    </article>
  )
}

function LayerCard({
  id,
  kicker,
  question,
  muted = false,
  indicators,
  reading,
  provisions,
}: {
  id: string
  kicker: string
  question: string
  muted?: boolean
  indicators: Indicator[]
  reading: string[]
  provisions: Provision[]
}) {
  return (
    <section
      aria-labelledby={`layer-${id}`}
      className="border border-panel-border bg-panel rounded-sm p-6 md:p-9 break-inside-avoid"
    >
      <p className={`${label} mb-3`}>{kicker}</p>
      <h3 id={`layer-${id}`} className="font-display text-[1.3rem] md:text-[1.5rem] font-medium leading-[1.35] text-text-primary mb-6">
        {question}
      </h3>

      {indicators.length > 0 && (
        <div className="mb-6">
          <p className="font-sans text-[12px] font-medium text-text-tertiary mb-2">Observed indicators</p>
          <dl className="divide-y divide-rule border-y border-rule">
            {indicators.map((ind, i) => (
              <div key={i} className="py-3 grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 md:gap-6">
                <dt className="font-sans text-[13px] text-text-secondary">
                  {ind.label}
                  {ind.proxyFor && <span className="block text-[11px] text-text-tertiary">Proxy for: {ind.proxyFor}</span>}
                  <span className="block text-[11px] text-text-ghost">{ind.source}</span>
                </dt>
                <dd className="font-sans text-[13px] text-text-primary m-0 break-words">{ind.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="mb-6">
        <p className="font-sans text-[12px] font-medium text-text-tertiary mb-2">Reading</p>
        <div className="space-y-3">
          {reading.map((r, i) => (
            <p key={i} className={`font-sans text-[0.92rem] leading-[1.85] font-light ${muted ? 'text-text-ghost italic' : 'text-text-secondary'}`}>
              {r}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {provisions.map((pr) => (
          <div key={pr.reference} className="bg-surface rounded-sm p-4 md:p-5">
            <p className="font-sans text-[12px] font-medium text-text-tertiary mb-2">
              Relevant provision:{' '}
              <a href={pr.url} className="underline underline-offset-4 hover:text-text-primary">
                {pr.instrument}, {pr.reference}
              </a>
            </p>
            <blockquote className="font-sans text-[13px] leading-[1.75] text-text-secondary mb-2 border-l-2 border-rule pl-3">
              {pr.quote}
            </blockquote>
            <p className="font-sans text-[13px] leading-[1.75] text-text-secondary mb-2">
              <span className="text-text-tertiary">Paraphrased: </span>
              {pr.summary}
            </p>
            <p className="font-sans text-[13px] leading-[1.75] text-text-tertiary">{pr.relevance}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
