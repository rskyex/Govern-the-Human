/*
 * Reference runs bundled with the Observatory (public/observatory/fixtures)
 * and how to reproduce each one with the live instruments. They are called
 * reference runs, not verified runs: they are exports from particular
 * instrument builds, and a live instrument at a later build may give
 * different numbers.
 */

export const FIXTURE_PATH = '/observatory/fixtures/'
/** Report built from all three reference runs, without generated_at. Checked by `npm test`. */
export const EXPECTED_REPORT = 'expected-report.json'

export interface ReferenceRun {
  file: string
  instrument: 'Narrative Drift' | 'SelfTrace'
  label: string
  /** Build the file was exported from */
  version: string
  /** Where to reproduce it */
  url: string
  steps: string
}

export const REFERENCE_RUNS: ReferenceRun[] = [
  {
    file: 'narrative-drift-script-a.json',
    instrument: 'Narrative Drift',
    label: 'Script A (verifier replay, sequence 00000-000000000)',
    version: '51d91e3',
    url: 'https://narrative-drift.vercel.app/verify?seq=00000-000000000',
    steps: 'Open the link, let the replay finish, then choose “Download result (JSON)”.',
  },
  {
    file: 'narrative-drift-script-b.json',
    instrument: 'Narrative Drift',
    label: 'Script B (verifier replay, sequence 00000-222222222)',
    version: '51d91e3',
    url: 'https://narrative-drift.vercel.app/verify?seq=00000-222222222',
    steps: 'Open the link, let the replay finish, then choose “Download result (JSON)”.',
  },
  {
    file: 'selftrace-demo-intellectual.json',
    instrument: 'SelfTrace',
    label: 'Demo profile “The Emerging Public Intellectual”',
    version: '09959e8',
    url: 'https://selftrace.vercel.app/connect',
    steps: 'Choose the demo profile “The Emerging Public Intellectual”, open /results, then choose “Download result (JSON)”.',
  },
]
