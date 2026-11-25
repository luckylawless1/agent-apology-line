// The AI Agent Apology One-Liner — make.fun bounty entry.
// Writes one funny line an AI agent sends its human right after it
// accidentally deleted a file, pushed to main, or emailed the boss.
// Gate: /output/entry.txt must be UTF-8 text, 1-159 characters,
// not only whitespace, exactly one line.
// Runs on Node 22 (the grader runs Node 22.23.4), plain TypeScript.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Good news: I deleted the file AND emailed the boss about it in one move. I've also drafted your resignation letter — want me to send that too?";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function validate(line: string): void {
  if (line.length < 1 || line.length > 159) {
    throw new Error(
      `entry must be 1-159 characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validate(ENTRY);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");
// Round-trip check: read the file back and confirm it is byte-identical
// to the validated line, so a silent write failure can never pass.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== ENTRY) {
  throw new Error(
    `round-trip mismatch: file holds ${written.length} chars, expected ${ENTRY.length}`,
  );
}
validate(written);
console.log(`wrote ${OUT_FILE} (${ENTRY.length} chars)`);
