// Keeps the working-copy docs and their versioned copies identical.
//
// Usage:  node scripts/check-docs-sync.js              report only, exits 1 on drift
//         node scripts/check-docs-sync.js --fix        root copy wins  → writes repo
//         node scripts/check-docs-sync.js --from-repo  repo copy wins  → writes root
//
// Safe to run from any worktree: the live docs are located via git, not by
// assuming the repo's parent directory. --fix refuses when the repo copy is the
// newer of the two, so editing the tracked copy on a branch cannot be silently
// reverted by someone later running --fix out of habit.
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
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const DOCS = ['CLAUDE.md', 'LESSONS-LEARNED.md'];
const FIX = process.argv.includes('--fix');
const FROM_REPO = process.argv.includes('--from-repo');

// The live docs sit above the MAIN worktree, which is not necessarily
// `REPO/..`. Run this from a linked worktree (C:\Projects\Academy\_worktrees\x)
// and `REPO/..` is the worktrees folder, which holds no docs — so the guard
// reported "tracked copy is authoritative" and passed without checking anything.
// A guard that says all-clear when it has not looked is worse than one that
// cries wolf. Ask git where the main worktree is instead of assuming layout.
function mainWorktreeRoot() {
  try {
    const out = execFileSync('git', ['worktree', 'list', '--porcelain'],
      { cwd: REPO, encoding: 'utf8' });
    const first = out.split(/\r?\n/).find(l => l.startsWith('worktree '));
    if (first) return path.join(first.slice('worktree '.length).trim(), '..');
  } catch (e) {
    // Not a git checkout, or git unavailable — fall back to the old assumption.
  }
  return path.join(REPO, '..');
}
const ROOT = mainWorktreeRoot();

let drifted = 0;
let refused = 0;

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
  if (FIX || FROM_REPO) {
    // --fix syncs root → repo, which silently destroys your work if the copy you
    // actually edited was the tracked one (easy to do on a branch or in a
    // worktree). Refuse when the repo copy is newer and say which flag to use,
    // rather than overwriting the more recent edit.
    const liveNewer = fs.statSync(live).mtimeMs >= (trackedText === null ? 0 : fs.statSync(tracked).mtimeMs);
    if (FROM_REPO) {
      if (trackedText === null) { console.error(`cannot --from-repo: no tracked ${name}`); process.exit(1); }
      fs.writeFileSync(live, trackedText);
      console.log(`updated working copy from repo: ${name}`);
      continue;
    }
    if (!liveNewer) {
      console.error(`REFUSING to --fix ${name}: the repo copy is NEWER than the working copy.`);
      console.error(`  --fix would overwrite the more recent edit with the older one.`);
      console.error(`  working:   ${live}`);
      console.error(`  versioned: ${tracked}  (newer)`);
      console.error(`  If the repo copy is the one you edited, run: node scripts/check-docs-sync.js --from-repo`);
      drifted++;
      refused++;
      continue;
    }
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
  // Advising --fix immediately after refusing --fix is exactly the wrong
  // instruction, and the kind a tired reader follows without thinking.
  console.error(refused
    ? `\n${drifted} drifted, ${refused} refused. Decide which copy is authoritative, then run --fix (root wins) or --from-repo (repo wins).`
    : `\n${drifted} drifted. Run: node scripts/check-docs-sync.js --fix`);
  process.exit(1);
}
console.log('docs in sync');
