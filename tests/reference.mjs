// Builds the Observatory report for the bundled reference runs exactly as the
// browser does (same parser, same assessment, SHA-256 over the file text), with
// generated_at removed so the result can be compared byte for byte.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { parseResult } from "@/lib/observatory/parse";
import { buildAssessment } from "@/lib/observatory/assess";
import { REFERENCE_RUNS, EXPECTED_REPORT } from "@/lib/observatory/reference";

export const FIXTURES = new URL("../public/observatory/fixtures/", import.meta.url);
export const EXPECTED_URL = new URL(EXPECTED_REPORT, FIXTURES);

export function loadReference() {
  return REFERENCE_RUNS.map(({ file }) => {
    const text = readFileSync(new URL(file, FIXTURES), "utf8");
    const sha = createHash("sha256").update(text, "utf8").digest("hex");
    const out = parseResult(text, file, sha);
    if (!out.ok) throw new Error(out.error);
    return out.result;
  });
}

export function referenceReport() {
  const { generated_at, ...rest } = buildAssessment(loadReference(), "reference");
  return rest;
}
