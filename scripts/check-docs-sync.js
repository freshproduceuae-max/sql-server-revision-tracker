// Keeps the working-copy docs and their versioned copies identical.
//
// Usage (from repo root):  node scripts/check-docs-sync.js [--fix]
//
// CLAUDE.md has to sit at the working-directory root (C:\Projects\Academy) to be
// picked up as project instructions, but git can only track files inside this
// repo. That forces two copies, and two copies drift — which is the exact defect
// this project already hit with DV group ids.
//
// So the copies are guarded rather than trusted: this fails loudly when they
// diverge. `--fix` copies the working root into the repo, since the root file is
// the one actually being edited and read.

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const ROOT = path.join(REPO, '..');
const DOCS = ['CLAUDE.md', 'LESSONS-LEARNED.md'];
const FIX = process.argv.includes('--fix');

let drifted = 0;
let missing = 0;

for (const name of DOCS) {
  const live = path.join(ROOT, name);      // auto-loaded / hand-edited copy
  const tracked = path.join(REPO, name);   // versioned copy

  // In a fresh clone there is no working copy above the repo — the tracked file
  // is the only one, which is correct, not an error. Only a copy that exists and
  // disagrees is a problem.
  if (!fs.existsSync(live)) {
    console.log(`no working copy above the repo for ${name} — tracked copy is authoritative`);
    continue;
  }
  const liveText = fs.readFileSync(live, 'utf8');
  const trackedText = fs.existsSync(tracked) ? fs.readFileSync(tracked, 'utf8') : null;

  if (trackedText === liveText) {
    console.log(`in sync: ${name}`);
    continue;
  }
  if (FIX) {
    fs.writeFileSync(tracked, liveText);
    console.log(`updated tracked copy: ${name}`);
    continue;
  }
  console.error(`DRIFTED: ${name} — working copy differs from the versioned one`);
  console.error(`  working:   ${live}`);
  console.error(`  versioned: ${tracked}`);
  drifted++;
}

if (drifted) {
  console.error(`\n${drifted} drifted. Run: node scripts/check-docs-sync.js --fix`);
  process.exit(1);
}
console.log('docs in sync');
