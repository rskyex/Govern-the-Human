// Observatory guards: the reference report is reproducible, and malformed or
// inconsistent files are refused (or flagged) instead of producing a reading.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseResult } from "@/lib/observatory/parse";
import { buildAssessment } from "@/lib/observatory/assess";
import { EXPECTED_URL, FIXTURES, referenceReport } from "./reference.mjs";

const fixture = (name) => JSON.parse(readFileSync(new URL(name, FIXTURES), "utf8"));
const parse = (doc, name = "test.json") => parseResult(JSON.stringify(doc), name);

test("report for the reference runs matches the committed expected report", () => {
  const expected = JSON.parse(readFileSync(EXPECTED_URL, "utf8"));
  assert.deepEqual(referenceReport(), expected);
});

test("reference runs load without warnings", () => {
  for (const s of referenceReport().sources) assert.deepEqual(s.warnings, [], s.file);
});

test("SelfTrace file without date_range.start is refused, not a crash", () => {
  const d = fixture("selftrace-demo-intellectual.json");
  delete d.outputs.date_range.start;
  const out = parse(d);
  assert.equal(out.ok, false);
  assert.match(out.error, /date_range\.start/);
});

test("Narrative Drift file with 0 encounters and 999% is refused", () => {
  const d = fixture("narrative-drift-script-a.json");
  d.outputs.encounter_count = 0;
  d.outputs.system_aligned_pct = 999;
  const out = parse(d);
  assert.equal(out.ok, false);
  assert.match(out.error, /encounter_count is 0/);
});

test("inconsistent Narrative Drift numbers are refused", () => {
  const cases = [
    (d) => (d.outputs.system_aligned_pct = 50), // 9 of 9 is 100%
    (d) => (d.outputs.axes.tempo.change = 10), // end − origin is 48
    (d) => (d.outputs.encounters[8].zone = 2), // only 2 civic encounters
    (d) => (d.outputs.encounters[0].system_aligned = false), // count says 9
    (d) => d.outputs.encounters.pop(),
    (d) => (d.generated_at = "28/10/2026"),
    (d) => (d.outputs.axes.autonomy.end = 300),
  ];
  for (const mutate of cases) {
    const d = fixture("narrative-drift-script-a.json");
    mutate(d);
    assert.equal(parse(d).ok, false, mutate.toString());
  }
});

test("a file declaring personal content is refused", () => {
  const d = fixture("narrative-drift-script-b.json");
  d.privacy.personal_content_included = true;
  const out = parse(d);
  assert.equal(out.ok, false);
  assert.match(out.error, /personal_content_included: true/);
});

test("narrowed is recomputed from the bits, not taken from the flag", () => {
  const d = fixture("selftrace-demo-intellectual.json");
  d.outputs.topic_range.diversity_last_quarter_bits = 1.2;
  d.outputs.topic_range.diversity_change_pct = -45;
  assert.equal(d.outputs.topic_range.narrowed, false);
  const out = parse(d);
  assert.equal(out.ok, true);
  assert.equal(out.result.narrowed, true);
  assert.ok(out.result.warnings.some((w) => /narrowed: false/.test(w)));
  const reading = buildAssessment([out.result], "t").layers.find((l) => l.id === "ontological").reading[0];
  assert.match(reading, /recorded range narrowed/);
  assert.doesNotMatch(reading, /did not narrow/);
});

test("readings describe the record, flag verifier replays and shared derivation", () => {
  const r = referenceReport();
  const text = (id) => r.layers.find((l) => l.id === id).reading.join(" ");
  assert.match(text("epistemic"), /verifier replay of Script A: the choices were scripted and no participant took part/);
  assert.match(text("epistemic"), /not independent/);
  assert.match(text("political"), /2 were options the instrument scores as faster/);
  assert.doesNotMatch(text("political"), /system shortened deliberation/);
  assert.match(text("ontological"), /top 3/);
  assert.match(text("processing"), /heuristic/);
});

test("one bad file does not stop the others from loading", () => {
  const good = parse(fixture("narrative-drift-script-b.json"), "good.json");
  const bad = parseResult('{"schema":"gth-result/v1","instrument":{"name":"selftrace","version":"abc1234"},"inputs":{},"outputs":{"post_count":3,"date_range":null}}', "bad.json");
  assert.equal(good.ok, true);
  assert.equal(bad.ok, false);
  assert.doesNotThrow(() => buildAssessment([good.result], "t"));
});
