#!/usr/bin/env node
/*
 * Validates sources/teacher-mcq.json and writes it to teacher-mcq.json at the
 * repo root, where the app actually fetches it from (same-origin, same
 * pattern as quiz-bank.json — see LESSONS-LEARNED entry 1 on why cross-branch
 * content URLs are avoided here).
 *
 * This is a straight copy today, not a transformation — but validating before
 * writing, and writing only from this script, keeps the same guarantee the
 * other generated files have: what's live matches what was checked, and a
 * hand-edit to the root file would be silently overwritten and caught by
 * check-docs-sync-style drift rather than trusted.
 *
 *   node scripts/build-teacher-mcq.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'sources', 'teacher-mcq.json');
const OUT = path.join(ROOT, 'teacher-mcq.json');

function fail(msg) {
  console.error('build-teacher-mcq: ' + msg);
  process.exit(1);
}

const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
if (!src.lessons || typeof src.lessons !== 'object' || Array.isArray(src.lessons)) {
  fail('no lessons object in source');
}

let lessonCount = 0;
let questionCount = 0;
Object.entries(src.lessons).forEach(([lessonId, entry]) => {
  lessonCount++;
  if (!lessonId || typeof lessonId !== 'string') fail('bad lesson id: ' + lessonId);
  if (!entry || typeof entry !== 'object') fail(lessonId + ' is not an object');
  ['open', 'close'].forEach(k => {
    if (!entry[k] || !String(entry[k]).trim()) fail(lessonId + ' is missing ' + k);
  });
  if (!Array.isArray(entry.questions) || entry.questions.length < 1) {
    fail(lessonId + ' has no questions');
  }
  entry.questions.forEach((q, qi) => {
    const where = lessonId + ' question ' + qi;
    if (!q.q || !String(q.q).trim()) fail(where + ' is missing q');
    if (!Array.isArray(q.choices) || q.choices.length !== 4) {
      fail(where + ' must have exactly 4 choices');
    }
    q.choices.forEach((c, ci) => {
      if (!c || !String(c).trim()) fail(where + ' choice ' + ci + ' is empty');
    });
    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3) {
      fail(where + ' correct index out of range: ' + q.correct);
    }
    if (!q.right || !String(q.right).trim()) fail(where + ' is missing right feedback');
    if (!q.wrong || !String(q.wrong).trim()) fail(where + ' is missing wrong feedback');
    questionCount++;
  });
});

fs.writeFileSync(OUT, JSON.stringify(src, null, 2) + '\n', 'utf8');
console.log('lessons: ' + lessonCount + ' | questions: ' + questionCount);
console.log('written to teacher-mcq.json');
