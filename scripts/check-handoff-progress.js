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

function fail(msg) {
  console.error('FAIL: ' + msg);
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
  const srcIds = Object.keys(src.lessons);
  const builtIds = Object.keys(built.lessons);

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

  return {
    allGroupIds,
    groupTechniqueCount,
    totalTechniques,
    totalExercises,
    srcIds,
    builtIds,
    completedGroupIds,
    completedThroughGroup,
    contiguous,
    completedLessons,
    completedQuestions,
    remainingGroupIds,
    remainingTechniques,
    remainingExercises,
    srcLessonCountMatchesBuilt: srcIds.length === builtIds.length,
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

function buildBlockText(actual, latestMergedPR) {
  const stated = {
    completedThroughGroup: actual.completedThroughGroup,
    completedLessons: actual.completedLessons,
    completedQuestions: actual.completedQuestions,
    remainingGroups: actual.remainingGroupIds,
    remainingTechniques: actual.remainingTechniques,
    remainingExercises: actual.remainingExercises,
    latestMergedPR: latestMergedPR,
    lastVerified: '(run the checker to refresh this date)',
  };
  return START_MARKER + '\n\n```json\n' + JSON.stringify(stated, null, 2) + '\n```\n\n' + END_MARKER;
}

// --- Best-effort latest merged PR via gh CLI -----------------------------

function tryGetLatestMergedPR() {
  try {
    const { execSync } = require('child_process');
    const out = execSync('gh pr list --state merged --limit 1 --json number', {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 15000,
    }).toString();
    const arr = JSON.parse(out);
    if (Array.isArray(arr) && arr.length > 0) return arr[0].number;
  } catch (e) {
    // gh not available, not authenticated, or offline — not a hard failure.
  }
  return null;
}

// --- Main -----------------------------------------------------------------

function main() {
  const fixMode = process.argv.includes('--fix');
  const actual = deriveActual();

  console.log('Derived from repo data:');
  console.log('  Groups with content on disk:', actual.allGroupIds.join(', '));
  console.log('  Total techniques (G01-G19):', actual.totalTechniques);
  console.log('  Total worked exercises:', actual.totalExercises);
  console.log('  Completed groups (in teacher-mcq.json):', actual.completedGroupIds.join(', ') || '(none)');
  console.log('  Completed-through-group (contiguous from G01):', actual.completedThroughGroup || '(not contiguous / none)');
  console.log('  Completed lessons:', actual.completedLessons);
  console.log('  Completed questions:', actual.completedQuestions);
  console.log('  Remaining groups:', actual.remainingGroupIds.join(', ') || '(none)');
  console.log('  Remaining techniques:', actual.remainingTechniques);
  console.log('  Remaining exercises:', actual.remainingExercises);
  console.log('');

  if (!actual.contiguous) {
    fail('Completed groups in teacher-mcq.json are not contiguous from G01 — cannot state a single "completed through" group. Check for a skipped group.');
  }
  if (!actual.srcLessonCountMatchesBuilt) {
    fail(`sources/teacher-mcq.json has ${actual.srcIds.length} lessons but built teacher-mcq.json has ${actual.builtIds.length} — rebuild with node scripts/build-teacher-mcq.js`);
  }
  if (actual.totalTechniques !== actual.completedLessons + actual.remainingTechniques) {
    fail('Internal arithmetic inconsistency deriving technique counts — this is a bug in the checker itself, not the data.');
  }

  const latestMergedPR = tryGetLatestMergedPR();

  const { text, block, startIdx, endIdx } = readStatedBlock();

  if (block === null) {
    if (fixMode) {
      console.log('No progress block found in HANDOFF.md — inserting one.');
      const insertion = buildBlockText(actual, latestMergedPR) + '\n';
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

  if (latestMergedPR !== null && block.latestMergedPR !== undefined && block.latestMergedPR !== null) {
    if (block.latestMergedPR !== latestMergedPR) {
      mismatches.push(`latestMergedPR: HANDOFF.md says ${block.latestMergedPR}, gh reports latest merged PR is #${latestMergedPR}`);
    }
  } else if (latestMergedPR === null) {
    console.log('(gh CLI unavailable or unauthenticated — skipped latestMergedPR check; not a failure)');
  }

  if (mismatches.length > 0) {
    if (fixMode) {
      console.log('Mismatches found — rewriting the progress block to match reality:');
      mismatches.forEach(m => console.log('  - ' + m));
      const newBlockText = buildBlockText(actual, latestMergedPR !== null ? latestMergedPR : block.latestMergedPR);
      const newText = text.slice(0, startIdx) + newBlockText + text.slice(endIdx + END_MARKER.length);
      fs.writeFileSync(HANDOFF_PATH, newText);
      console.log('HANDOFF.md progress block updated. Re-run without --fix to verify.');
      return;
    }
    mismatches.forEach(m => fail(m));
    printSummaryAndExit();
    return;
  }

  console.log('HANDOFF.md progress block matches the repository data.');
}

function printSummaryAndExit() {
  console.error('');
  console.error('HANDOFF.md status does not match the repository. Run:');
  console.error('  node scripts/check-handoff-progress.js --fix');
  console.error('to regenerate the progress block, then review the diff before committing.');
}

main();
