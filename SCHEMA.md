# gth-result/v1

A small JSON format shared by the Govern the Human instruments. Narrative Drift and SelfTrace export it. The Observatory (`/observatory`) reads it and produces a Second-Order Assessment.

Every file describes one run of one instrument. It records what went in (as a summary, never personal content) and the numbers that came out. All files are produced in the browser. Nothing is sent to a server.

## Envelope

| Field | Type | Meaning |
| --- | --- | --- |
| `schema` | string | Always `"gth-result/v1"`. |
| `instrument.name` | string | `"narrative-drift"` or `"selftrace"`. |
| `instrument.version` | string | Git short sha of the build (Vercel commit sha when deployed), or the package version if git is unavailable. |
| `instrument.url` | string | Public address of the instrument. |
| `generated_at` | string | ISO 8601 timestamp of the export. |
| `inputs` | object | Summary of the run inputs. Instrument specific, see below. |
| `outputs` | object | The figures the instrument showed. Instrument specific, see below. |
| `privacy.processing` | string | `"client-side"`. |
| `privacy.personal_content_included` | boolean | Always `false`. |
| `privacy.excluded` | string[] | What the instrument deliberately left out. |

Readers should reject files whose `schema` is not `gth-result/v1` and ignore fields they do not know. New optional fields may be added within v1. Renaming or removing a field needs `gth-result/v2`.

An instrument may refine how a v1 field is computed within v1 only if the file carries `outputs.definitions` describing that field. When `outputs.definitions` is present, its text is authoritative for the meaning of the fields it names, and readers should show it or follow it rather than the descriptions below. SelfTrace did this once; see "SelfTrace: two generations" below.

## Narrative Drift

### inputs

| Field | Type | Meaning |
| --- | --- | --- |
| `mode` | `"interactive"` or `"verifier"` | Verifier runs come from `/verify` and replay a fixed sequence. |
| `script` | string or null | `"Script A"`, `"Script B"`, `"Sequence ..."` in verifier mode, otherwise null. |
| `calibration_choices` | number[5] or null | Option index chosen at each calibration question, 0-based, in on-screen order. |
| `encounter_choices` | number[9] | Option index chosen at each encounter, in play order. |
| `sequence` | string or null | The same indices as one string, `ccccc-eeeeeeeee`. Open `https://narrative-drift.vercel.app/verify?seq=<sequence>` to reproduce the run. |

The name typed on the landing page is never exported.

### outputs

| Field | Type | Meaning |
| --- | --- | --- |
| `classification` | string | Subject classification shown on the diagnostic (for example `"The Optimized"`). |
| `total_displacement_pct` | integer | Euclidean distance between baseline and final profile across five axes, as a percentage of the maximum. |
| `system_aligned_pct` | integer | Share of encounter choices that moved autonomy toward external guidance (delegated to the system). |
| `system_aligned_count`, `encounter_count` | integer | The numerator and denominator of that share. |
| `axes.<axis>.origin`, `.end`, `.change` | integer | Points on a -100 to +100 scale for `autonomy`, `novelty`, `sociality`, `tempo`, `affect`. Origin is the baseline after calibration. |
| `encounters[]` | object[] | One per encounter: `id`, `zone` (1 feed, 2 companion, 3 civic), `choice_index`, `choice_id`, `system_aligned`, `autonomy_delta`, `tempo_delta` (points). |

Axis direction: autonomy positive is self-directed, negative is externally guided. Tempo positive is optimized and fast, negative is deliberate.

## SelfTrace

### inputs

| Field | Type | Meaning |
| --- | --- | --- |
| `source` | `"demo"` or `"user-data"` | Whether a fictional profile was analysed. |
| `profile_id`, `profile_label` | string or null | Only set for demo profiles. |
| `platform` | string | Platform of the dataset. |
| `post_count` | integer | Number of posts analysed. |
| `reflection_answers_included` | boolean | Always `false`. |

Post text, phrases, self-descriptions, reflection answers, MBTI and Enneagram types are never exported.

### outputs

SelfTrace files from builds after `09959e8` carry `outputs.definitions`, and that text is authoritative. The table gives the current meaning; "SelfTrace: two generations" below describes files without the new fields.

| Field | Type | Meaning |
| --- | --- | --- |
| `post_count` | integer | Posts in the dataset. |
| `date_range.start`, `.end` | string | ISO dates of the first and last post (UTC). `start_label` and `end_label` are the month labels shown on `/results`. |
| `taxonomy` | object | Optional. `name`, `release`, `licence`, `url` of the topic vocabulary (IPTC Media Topics). |
| `top_topics[]` | `{topic, topic_id?, count}` | The five most frequent topics. `topic_id` is the IPTC qcode when present. |
| `rewarded_rising[]` | topic row | Rewarded (time-adjusted reward ratio ≥ 1.25, ≥ 8 posts) and rising. Full list. |
| `kept[]` | topic row | At least 5 posts in each half, later share ≥ 90% of the earlier, reward ratio below 1 in both halves. Full list. |
| `kept_without_encouragement[]` | topic row | Same list as `kept` (one definition is used everywhere). Kept for compatibility. |
| `resisted_reward[]` | topic row | Rewarded, and frequency stable or falling. Full list. |
| `topic_range` | object | See below. |
| `definitions` | object | Plain-text definition of each list and measure, written by the instrument. Authoritative. |

A topic row is `{topic, topic_id?, post_count, engagement_vs_average, reward_ratio?, frequency_trend, share_change_pp?, share_change_ci_pp?}`.

- `reward_ratio` is the median, over the topic's posts, of each post's engagement (likes + 2 × shares) divided by the median engagement of its UTC month (its quarter when the month has fewer than 10 posts). 1 is typical for the month.
- `engagement_vs_average` carries the same value as `reward_ratio`, kept so older readers keep working.
- `frequency_trend` is `increasing`, `stable`, `decreasing` or `insufficient`. It compares the topic's share of posts in two halves of equal duration, with a bootstrap 95% interval (`share_change_ci_pp`, percentage points).

`topic_range` holds `distinct_topics` and the following:

- `diversity_first_quarter_bits` and `diversity_last_quarter_bits`: despite the names, Miller–Madow-corrected Shannon entropy of the first and last `window_months` (6) months.
- `diversity_change_pct` and `diversity_change_ci_pct`: the relative change and its bootstrap 95% interval. Both are `null` when `sufficient` is `false`.
- `first_window_posts`, `last_window_posts` and `sufficient`: each window needs at least 30 posts.
- `narrowed`: change ≤ -25% and the interval below 0.

### SelfTrace: two generations

Files without `outputs.definitions.engagement`, from builds up to and including `09959e8` (the bundled reference run is one), use the earlier meanings:

- `engagement_vs_average` is the topic's mean raw engagement divided by the mean across topics.
- `frequency_trend` compares halves with equal numbers of posts.
- `rewarded_rising`, `kept` and `resisted_reward` are cut to the top 3. `kept` is engagement below 50% of average, `kept_without_encouragement` below 60%, and `resisted_reward` above 130% with frequency not increasing.
- The diversity fields are plain Shannon entropy of the first and last calendar quarter, with `quarters` giving the number of quarters.
- `narrowed` means the last quarter is below 75% of the first.

The Observatory reads both generations. It labels the diversity window from `window_months` when present. It says when a list is cut to the top 3, based on the file's `definitions`. It recomputes `narrowed` from the bits, and never treats a range as narrowed when `sufficient` is `false`.

## Example

Reference runs are bundled with the Observatory in `public/observatory/fixtures/` and served at `/observatory/fixtures/`. They are exports from particular instrument builds (Narrative Drift `51d91e3`, SelfTrace `09959e8`), not independently verified results; a later build may give different numbers. The Observatory page's Verify section links each one to the live instrument.

- `narrative-drift-script-a.json`: The Optimized, 22% displacement, 100% system-aligned.
- `narrative-drift-script-b.json`: The Self-Authored, 12% displacement, 11% system-aligned.
- `selftrace-demo-intellectual.json`: The Emerging Public Intellectual, 548 posts, June 2021 to November 2023.

## Second-Order Assessment report

The Observatory exports its own report as JSON with `schema: "gth-assessment/v1"`. It lists the source files (instrument, version, timestamp, file name, SHA-256 of the file as loaded, and any warnings from the file checks), and for each of the three layers (epistemic, ontological, political) the question, the indicators with their values, source instrument and the concept each stands in for (`proxyFor`), the reading, and the provisions it is relevant to. Each provision carries the operative words quoted from the official EUR-Lex text (`quote`), a paraphrased `summary`, the relevance and a link. A separate `data_handling` block, which is not a framework layer, reports the privacy checks. `thresholds` and `threshold_rationale` give the values used and why; they are provisional. The report is not a legal or clinical assessment. It reflects what the instruments recorded, not behaviour outside them.

`expected-report.json` in the fixtures folder is the report for the three reference runs with `generated_at` removed. `npm test` rebuilds it and fails on any difference; `npm run test:update` rewrites it after an intended change.

## What the Observatory checks

A file is refused, with the reason shown, when:

- `schema`, `instrument`, `inputs` or `outputs` is missing or unknown, `generated_at` is not ISO 8601, or `instrument.version` is empty;
- `privacy.personal_content_included` is `true`;
- Narrative Drift: `encounter_count` is not 9, there are not 9 encounters of which 3 are civic (zone 3), `system_aligned_count` does not match the encounters marked system-aligned, `system_aligned_pct` is not that count as a rounded percentage (±1), a percentage is outside 0 to 100, an axis value is outside -100 to +100, an axis `change` is not `end - origin`, or `inputs.encounter_choices` does not match the encounters;
- SelfTrace: `date_range.start` or `.end` is missing, not ISO 8601, or out of order; a topic count exceeds `post_count`; `inputs.post_count` differs from `outputs.post_count`; diversity bits are missing or outside 0 to 20; or `diversity_change_pct` disagrees with the bits by more than 2 points.

A file is accepted with a warning, which the report repeats, when the version is not a git sha or package version, the privacy block is missing or incomplete, or the SelfTrace `narrowed` flag disagrees with its bits. The Observatory always recomputes `narrowed` from the bits (last below 75% of first; never when `topic_range.sufficient` is `false`) and uses that value.

The personal-content scan is a heuristic: it flags suspicious field names and long free text. It can miss personal data and is not a guarantee that none is present.
