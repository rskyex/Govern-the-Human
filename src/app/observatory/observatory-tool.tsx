'use client'

import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { parseResult } from '@/lib/observatory/parse'
import { buildAssessment, DISCLAIMER, THRESHOLDS, type Assessment, type LayerAssessment } from '@/lib/observatory/assess'
import type { LoadedResult } from '@/lib/observatory/types'
import exampleA from '@/lib/observatory/fixtures/narrative-drift-script-a.json'
import exampleB from '@/lib/observatory/fixtures/narrative-drift-script-b.json'
import exampleST from '@/lib/observatory/fixtures/selftrace-demo-intellectual.json'

const VERSION = process.env.NEXT_PUBLIC_OBSERVATORY_VERSION || 'unknown'

const EXAMPLES: [string, unknown][] = [
  ['narrative-drift-script-a.json', exampleA],
  ['narrative-drift-script-b.json', exampleB],
  ['selftrace-demo-intellectual.json', exampleST],
]

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

  const add = useCallback((items: { name: string; text: string }[]) => {
    const errs: string[] = []
    const ok: LoadedResult[] = []
    for (const it of items) {
      const out = parseResult(it.text, it.name)
      if (out.ok) ok.push(out.result)
      else errs.push(out.error)
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

  const loadExamples = () => add(EXAMPLES.map(([name, doc]) => ({ name, text: JSON.stringify(doc) })))

  const report: Assessment | null = useMemo(
    () => (results.length ? buildAssessment(results, VERSION) : null),
    [results]
  )

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
            <label htmlFor={inputId} className={`${btnPrimary} cursor-pointer text-center`}>
              Choose JSON files
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept=".json,application/json"
              multiple
              className="sr-only"
              onChange={(e) => {
                if (e.target.files?.length) readFiles(e.target.files)
                e.target.value = ''
              }}
            />
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
            The examples are the reference runs used for verification: Narrative Drift Script A and Script B,
            and the SelfTrace demo profile.
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

      {/* ── Report ── */}
      {report && <Report report={report} />}
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
          <table className="w-full font-sans text-[13px] text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b border-rule text-text-ghost">
                <th scope="col" className="py-2 pr-4 font-medium">Instrument</th>
                <th scope="col" className="py-2 pr-4 font-medium">Run</th>
                <th scope="col" className="py-2 pr-4 font-medium">Mode</th>
                <th scope="col" className="py-2 pr-4 font-medium">Version</th>
                <th scope="col" className="py-2 font-medium">Exported</th>
              </tr>
            </thead>
            <tbody>
              {report.sources.map((s) => (
                <tr key={s.file + s.generated_at} className="border-b border-rule text-text-secondary">
                  <td className="py-2 pr-4">{s.instrument === 'narrative-drift' ? 'Narrative Drift' : 'SelfTrace'}</td>
                  <td className="py-2 pr-4">{s.label}</td>
                  <td className="py-2 pr-4">{s.mode}</td>
                  <td className="py-2 pr-4 font-mono text-[12px]">{s.version}</td>
                  <td className="py-2 font-mono text-[12px]">{s.generated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-10">
        {report.layers.map((l) => (
          <LayerCard key={l.id} layer={l} />
        ))}
      </div>

      <p className="font-sans text-[12px] leading-[1.8] text-text-ghost mt-10">
        Thresholds used: delegation counts as high at {THRESHOLDS.delegationHigh}% or more and low at{' '}
        {THRESHOLDS.delegationLow}% or less; an axis counts as stable when it moves less than {THRESHOLDS.stablePoints}{' '}
        points; SelfTrace counts topic range as narrowed when the last quarter is below {THRESHOLDS.narrowingShare}% of the
        first. Provision summaries are paraphrased for orientation and are not legal text.
      </p>
    </article>
  )
}

function LayerCard({ layer }: { layer: LayerAssessment }) {
  return (
    <section
      aria-labelledby={`layer-${layer.id}`}
      className="border border-panel-border bg-panel rounded-sm p-6 md:p-9 break-inside-avoid"
    >
      <p className={`${label} mb-3`}>{layer.layer}</p>
      <h3 id={`layer-${layer.id}`} className="font-display text-[1.3rem] md:text-[1.5rem] font-medium leading-[1.35] text-text-primary mb-6">
        {layer.question}
      </h3>

      {layer.indicators.length > 0 && (
        <div className="mb-6">
          <p className="font-sans text-[12px] font-medium text-text-tertiary mb-2">Observed indicators</p>
          <dl className="divide-y divide-rule border-y border-rule">
            {layer.indicators.map((ind, i) => (
              <div key={i} className="py-3 grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 md:gap-6">
                <dt className="font-sans text-[13px] text-text-secondary">
                  {ind.label}
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
          {layer.reading.map((r, i) => (
            <p key={i} className={`font-sans text-[0.92rem] leading-[1.85] font-light ${layer.status === 'no-data' ? 'text-text-ghost italic' : 'text-text-secondary'}`}>
              {r}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-sm p-4 md:p-5">
        <p className="font-sans text-[12px] font-medium text-text-tertiary mb-1">
          Relevant provision: {layer.provision.instrument}, {layer.provision.reference}
        </p>
        <p className="font-sans text-[13px] leading-[1.75] text-text-secondary mb-2">{layer.provision.summary}</p>
        <p className="font-sans text-[13px] leading-[1.75] text-text-tertiary">{layer.provision.relevance}</p>
      </div>
    </section>
  )
}
