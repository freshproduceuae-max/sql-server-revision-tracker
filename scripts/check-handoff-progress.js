#!/usr/bin/env node
// Verifies the machine-readable progress block in HANDOFF.md against the
// actual repository data: sources/teacher-mcq.json, the built teacher-mcq.json,
// and the real G01-G19 lesson/exercise file inventory under data-validation-lab/methods.
//
// This exists because HANDOFF.md's queue table went stale for six merged
// groups (PR #31 through PR #44) before anyone noticed. Free-form prose that
// nobody is forced to update WILL drift. This script makes drift a build
// failure instead of a silent trust problem for the next cold session.
//
// Usage: node scripts/check-handoff-progress.js [--fix]
//   --fix   rewrite the progress block in HANDOFF.md to match reality,
//           instead of just failing when it doesn't match.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HANDOFF_PATH = path.join(ROOT, 'HANDOFF.md');
const METHODS_DIR = path.join(ROOT, 'data-validation-lab', 'methods');
const SOURCES_MCQ = path.join(ROOT, 'sources', 'teacher-mcq.json');
const BUILT_MCQ = path.join(ROOT, 'teacher-mcq.json');

const START_MARKER = '<!-- HANDOFF-PROGRESS:START (machine-generated, see scripts/check-handoff-progress.js) -->';
const END_MARKER = '<!-- HANDOFF-PROGRESS:END -->';

let hadFailure = false;
function fail(msg) {
  console.error('FAIL: ' + msg);
  hadFailure = true;
  process.exitCode = 1;
}

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// --- Derive ground truth from the repo ---------------------------------

function deriveActual() {
  // All G-group folders, e.g. G01_Completeness .. G19_Cleansing_Operations
  const groupFolders = fs.readdirSync(METHODS_DIR)
    .filter(name => /^G\d{2}_/.test(name))
    .sort();

  const groupTechniqueCount = {}; // 'G01' -> 12
  for (const folder of groupFolders) {
    const groupId = folder.slice(0, 3); // 'G01'
    const files = fs.readdirSync(path.join(METHODS_DIR, folder))
      .filter(f => f.endsWith('.md') && /^G\d{2}-T\d{2}/.test(f));
    groupTechniqueCount[groupId] = files.length;
  }

  const allGroupIds = Object.keys(groupTechniqueCount).sort();
  const totalTechniques = Object.values(groupTechniqueCount).reduce((a, b) => a + b, 0);

  // Worked exercises: M0x-Ex_*.md files, distinct numbering space from G groups
  const exerciseFiles = [];
  const mFolders = fs.readdirSync(METHODS_DIR).filter(name => /^M\d{2}_/.test(name));
  for (const folder of mFolders) {
    const files = fs.readdirSync(path.join(METHODS_DIR, folder))
      .filter(f => /^M\d{2}-E\d+/.test(f));
    exerciseFiles.push(...files);
  }
  const totalExercises = exerciseFiles.length;

  // Built Teacher MCQ content: which groups actually have lessons, and counts
  const src = readJSON(SOURCES_MCQ);
  const built = readJSON(BUILT_MCQ);
  const srcIds = Object.keys(src.lessons).sort();
  const builtIds = Object.keys(built.lessons).sort();

  const completedGroupIds = [...new Set(builtIds.map(id => id.split('-')[0]))]
    .filter(g => /^G\d{2}$/.test(g))
    .sort();

  // Completed-through-group: highest group present, only meaningful if the
  // completed set is contiguous from G01 with no gaps.
  let completedThroughGroup = null;
  let contiguous = true;
  for (let i = 0; i < completedGroupIds.length; i++) {
    const expected = 'G' + String(i + 1).padStart(2, '0');
    if (completedGroupIds[i] !== expected) { contiguous = false; break; }
  }
  if (contiguous && completedGroupIds.length > 0) {
    completedThroughGroup = completedGroupIds[completedGroupIds.length - 1];
  }

  const completedLessons = builtIds.length;
  const completedQuestions = builtIds.reduce((sum, id) => sum + built.lessons[id].questions.length, 0);

  const remainingGroupIds = allGroupIds.filter(g => !completedGroupIds.includes(g));
  const remainingTechniques = remainingGroupIds.reduce((sum, g) => sum + groupTechniqueCount[g], 0);

  // Exercises completed: any M0x-Ex ids present in built MCQ content (none yet, but future-proof)
  const completedExerciseIds = builtIds.filter(id => /^M\d{2}-E/.test(id));
  const remainingExercises = totalExercises - completedExerciseIds.length;

  // Track-wide totals — kept as two separate, unambiguous numbers.
  // Never collapse "remaining" and "full track" into the same label.
  const remainingItemsTotal = remainingTechniques + remainingExercises;   // what's left to do
  const fullTrackTotal = totalTechniques + totalExercises;                // the whole track, done + not done

  // Exact ID-set comparison between source and built MCQ files, not just counts.
  const srcSet = new Set(srcIds);
  const builtSet = new Set(builtIds);
  const missingFromBuilt = srcIds.filter(id => !builtSet.has(id));   // in source, not built
  const unexpectedInBuilt = builtIds.filter(id => !srcSet.has(id));  // in built, not source
  const idSetsMatch = missingFromBuilt.length === 0 && unexpectedInBuilt.length === 0;

  return {
    allGroupIds,
    groupTechniqueCount,
    totalTechniques,
    totalExercises,
    fullTrackTotal,
    srcIds,
    builtIds,
    idSetsMatch,
    missingFromBuilt,
    unexpectedInBuilt,
    completedGroupIds,
    completedThroughGroup,
    contiguous,
    completedLessons,
    completedQuestions,
    remainingGroupIds,
    remainingTechniques,
    remainingExercises,
    remainingItemsTotal,
  };
}

// --- Read the stated progress block from HANDOFF.md ---------------------

function readStatedBlock() {
  const text = fs.readFileSync(HANDOFF_PATH, 'utf8');
  const startIdx = text.indexOf(START_MARKER);
  const endIdx = text.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1) {
    return { text, block: null, startIdx, endIdx };
  }
  const jsonStart = text.indexOf('```json', startIdx);
  const jsonEnd = text.indexOf('```', jsonStart + 7);
  if (jsonStart === -1 || jsonEnd === -1 || jsonStart > endIdx) {
    return { text, block: null, startIdx, endIdx };
  }
  const jsonText = text.slice(jsonStart + 7, jsonEnd).trim();
  let block;
  try {
    block = JSON.parse(jsonText);
  } catch (e) {
    return { text, block: null, startIdx, endIdx, parseError: e };
  }
  return { text, block, startIdx, endIdx, jsonStart, jsonEnd };
}

function buildBlockText(actual, latestMergedPR, prCheckStatus) {
  const stated = {
    completedThroughGroup: actual.completedThroughGroup,
    completedLessons: actual.completedLessons,
    completedQuestions: actual.completedQuestions,
    remainingGroups: actual.remainingGroupIds,
    remainingTechniques: actual.remainingTechniques,
    remainingExercises: actual.remainingExercises,
    remainingItemsTotal: actual.remainingItemsTotal,
    fullTrackTotalItems: actual.fullTrackTotal,
    _note: `${actual.remainingTechniques} remaining techniques + ${actual.remainingExercises} remaining exercises = ${actual.remainingItemsTotal} remaining. This is NOT the same number as fullTrackTotalItems (${actual.fullTrackTotal}), which is the whole track's techniques+exercises, done or not.`,
    latestMergedPR: latestMergedPR,
    latestMergedPRCheckStatus: prCheckStatus,
    lastVerified: new Date().toISOString(),
  };
  return START_MARKER + '\n\n```json\n' + JSON.stringify(stated, null, 2) + '\n```\n\n' + END_MARKER;
}

// --- Latest merged PR via gh CLI, sorted by mergedAt (not list order) ---

function tryGetLatestMergedPR() {
  try {
    const { execSync } = require('child_process');
    const out = execSync('gh pr list --state merged --limit 50 --json number,mergedAt', {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 15000,
    }).toString();
    const arr = JSON.parse(out);
    if (!Array.isArray(arr) || arr.length === 0) {
      return { number: null, status: 'skipped: gh returned no merged PRs' };
    }
    // gh's list order is not guaranteed to be chronological — sort explicitly.
    const withDates = arr.filter(pr => pr.mergedAt);
    if (withDates.length === 0) {
      return { number: null, status: 'skipped: no mergedAt timestamps returned' };
    }
    withDates.sort((a, b) => new Date(b.mergedAt) - new Date(a.mergedAt));
    return { number: withDates[0].number, status: 'verified' };
  } catch (e) {
    return { number: null, status: 'skipped: gh CLI unavailable or unauthenticated' };
  }
}

// --- Main -----------------------------------------------------------------

function main() {
  const fixMode = process.argv.includes('--fix');
  const actual = deriveActual();

  console.log('Derived from repo data:');
  console.log('  Groups with content on disk:', actual.allGroupIds.join(', '));
  console.log('  Total techniques (G01-G19):', actual.totalTechniques);
  console.log('  Total worked exercises:', actual.totalExercises);
  console.log('  Full track total (techniques + exercises):', actual.fullTrackTotal);
  console.log('  Completed groups (in teacher-mcq.json):', actual.completedGroupIds.join(', ') || '(none)');
  console.log('  Completed-through-group (contiguous from G01):', actual.completedThroughGroup || '(not contiguous / none)');
  console.log('  Completed lessons:', actual.completedLessons);
  console.log('  Completed questions:', actual.completedQuestions);
  console.log('  Remaining groups:', actual.remainingGroupIds.join(', ') || '(none)');
  console.log('  Remaining techniques:', actual.remainingTechniques);
  console.log('  Remaining exercises:', actual.remainingExercises);
  console.log('  Remaining items total (techniques + exercises still to do):', actual.remainingItemsTotal);
  console.log('');

  if (!actual.contiguous) {
    fail('Completed groups in teacher-mcq.json are not contiguous from G01 — cannot state a single "completed through" group. Check for a skipped group.');
  }

  if (!actual.idSetsMatch) {
    fail(`sources/teacher-mcq.json and built teacher-mcq.json have different lesson-ID sets (not just different counts) — rebuild with node scripts/build-teacher-mcq.js`);
    if (actual.missingFromBuilt.length > 0) {
      console.error('  In source but missing from built:', actual.missingFromBuilt.join(', '));
    }
    if (actual.unexpectedInBuilt.length > 0) {
      console.error('  In built but not in source:', actual.unexpectedInBuilt.join(', '));
    }
  }

  if (actual.totalTechniques !== actual.completedLessons + actual.remainingTechniques) {
    fail('Internal arithmetic inconsistency deriving technique counts — this is a bug in the checker itself, not the data.');
  }
  if (actual.remainingItemsTotal !== actual.remainingTechniques + actual.remainingExercises) {
    fail('Internal arithmetic inconsistency computing remainingItemsTotal — this is a bug in the checker itself, not the data.');
  }

  const prResult = tryGetLatestMergedPR();
  if (prResult.status !== 'verified') {
    console.log(`(PR-number check SKIPPED: ${prResult.status} — repository-derived checks above still ran and are authoritative on their own)`);
  }

  const { text, block, startIdx, endIdx } = readStatedBlock();

  if (block === null) {
    if (fixMode) {
      console.log('No progress block found in HANDOFF.md — inserting one.');
      const insertion = buildBlockText(actual, prResult.number, prResult.status) + '\n';
      const marker = '## Work queue — what is actually outstanding';
      const anchorIdx = text.indexOf(marker);
      let newText;
      if (anchorIdx === -1) {
        newText = text.trimEnd() + '\n\n' + insertion;
      } else {
        const afterHeadingLineEnd = text.indexOf('\n', anchorIdx) + 1;
        newText = text.slice(0, afterHeadingLineEnd) + '\n' + insertion + '\n' + text.slice(afterHeadingLineEnd);
      }
      fs.writeFileSync(HANDOFF_PATH, newText);
      console.log('Inserted progress block into HANDOFF.md. Re-run without --fix to verify.');
      return;
    }
    fail('HANDOFF.md has no machine-readable progress block (missing ' + START_MARKER.slice(0, 40) + '...). Run with --fix to insert one.');
    printSummaryAndExit();
    return;
  }

  const mismatches = [];
  function check(field, expected, statedVal) {
    const isArrayField = Array.isArray(expected);
    const equal = isArrayField
      ? JSON.stringify(expected) === JSON.stringify(statedVal)
      : expected === statedVal;
    if (!equal) {
      mismatches.push(`${field}: HANDOFF.md says ${JSON.stringify(statedVal)}, actual is ${JSON.stringify(expected)}`);
    }
  }

  check('completedThroughGroup', actual.completedThroughGroup, block.completedThroughGroup);
  check('completedLessons', actual.completedLessons, block.completedLessons);
  check('completedQuestions', actual.completedQuestions, block.completedQuestions);
  check('remainingGroups', actual.remainingGroupIds, block.remainingGroups);
  check('remainingTechniques', actual.remainingTechniques, block.remainingTechniques);
  check('remainingExercises', actual.remainingExercises, block.remainingExercises);
  check('remainingItemsTotal', actual.remainingItemsTotal, block.remainingItemsTotal);
  check('fullTrackTotalItems', actual.fullTrackTotal, block.fullTrackTotalItems);

  // latestMergedPR is only checked when the PR lookup actually succeeded this
  // run. If it was skipped, we do not flag a mismatch (that would be a false
  // failure), and we do not silently treat the stale stored value as verified
  // either — the console note above already made the skip explicit.
  if (prResult.status === 'verified') {
    if (block.latestMergedPR !== prResult.number) {
      mismatches.push(`latestMergedPR: HANDOFF.md says ${block.latestMergedPR}, gh reports (sorted by mergedAt) the latest merged PR is #${prResult.number}`);
    }
    if (block.latestMergedPRCheckStatus !== 'verified') {
      mismatches.push(`latestMergedPRCheckStatus: HANDOFF.md says "${block.latestMergedPRCheckStatus}" but this run verified it successfully — refresh the block`);
    }
  }

  // lastVerified is a timestamp, not a fact about the repo — never compared,
  // only ever regenerated by --fix. A missing/placeholder value is flagged
  // once, gently, so it doesn't linger forever, but is not a hard failure.
  if (!block.lastVerified || /run the checker/i.test(String(block.lastVerified))) {
    console.log('(note: lastVerified is a placeholder — run with --fix to stamp a real timestamp; not a failure)');
  }

  if (mismatches.length > 0) {
    if (fixMode) {
      console.log('Mismatches found — rewriting the progress block to match reality:');
      mismatches.forEach(m => console.log('  - ' + m));
      const prNumberToWrite = prResult.status === 'verified' ? prResult.number : block.latestMergedPR;
      const prStatusToWrite = prResult.status === 'verified' ? 'verified' : block.latestMergedPRCheckStatus || prResult.status;
      const newBlockText = buildBlockText(actual, prNumberToWrite, prStatusToWrite);
      const newText = text.slice(0, startIdx) + newBlockText + text.slice(endIdx + END_MARKER.length);
      fs.writeFileSync(HANDOFF_PATH, newText);
      console.log('HANDOFF.md progress block updated. Re-run without --fix to verify.');
      return;
    }
    mismatches.forEach(m => fail(m));
    printSummaryAndExit();
    return;
  }

  if (!hadFailure) {
    console.log('HANDOFF.md progress block matches the repository data.');
  }
}

function printSummaryAndExit() {
  console.error('');
  console.error('HANDOFF.md status does not match the repository. Run:');
  console.error('  node scripts/check-handoff-progress.js --fix');
  console.error('to regenerate the progress block, then review the diff before committing.');
}

main();
