// npm run test:update: rewrites the committed expected report after an
// intended change to the parser, the readings or the reference runs.
import { writeFileSync } from "node:fs";
import { EXPECTED_URL, referenceReport } from "./reference.mjs";

writeFileSync(EXPECTED_URL, JSON.stringify(referenceReport(), null, 2) + "\n");
console.log("wrote", EXPECTED_URL.pathname);
