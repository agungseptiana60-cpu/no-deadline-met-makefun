import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse is a to-do list with the wrong priorities: the deadline sits
// below two small everyday errands, milk and a call to Mom. The speaker
// did both errands, so the joke lands on the last clause — the deadline
// is still waiting for its turn, patient and unpaid. One voice, one
// breath, no setup line before it. The em dash does the turn: everything
// before it is the setup, everything after it is the confession that the
// errands won. At 156 characters it sits comfortably inside the gate,
// long enough to feel spoken, short enough to stay one line.
const line =
  "I put the deadline on my to-do list right under 'buy milk' and 'call Mom' — I bought the milk, I called Mom, and the deadline is still waiting for its turn.";

// Gate: the bounty only judges one line of 1-200 characters, not blank.
// A carriage return would smuggle a second line past a newline-only
// check, so it is rejected too.
if (
  line.length < 1 ||
  line.length > 200 ||
  line.trim().length === 0 ||
  line.includes("\n") ||
  line.includes("\r")
) {
  throw new Error(
    `entry must be one line of 1-200 characters, got ${line.length}`
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
