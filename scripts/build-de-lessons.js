#!/usr/bin/env node
/*
 * Renders the Data Engineering lesson markdown from sources/data-engineering.json.
 *
 * Output is deterministic — same input gives byte-identical files. Cloned from
 * scripts/build-ba-lessons.js's structure, adapted for lessons that carry a
 * solution code block (Python/PySpark/SQL) and an expected output, matching
 * the rigor Data Validation's lessons already use, rather than BA's prose-only
 * shape.
 *
 * Phase 1 scope: only Chapter DE01 exists in the source. Chapters DE02-DE06
 * are NOT authorized yet — this script does not assume 6 chapters exist, it
 * renders whatever chapters are actually present in the source, so adding a
 * chapter later requires no script changes.
 *
 *   node scripts/build-de-lessons.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'sources', 'data-engineering.json');
const OUT = path.join(ROOT, 'data-engineering');

function fail(msg) {
  console.error('build-de-lessons: ' + msg);
  process.exit(1);
}

const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
if (!Array.isArray(src.chapters) || !src.chapters.length) fail('no chapters in source');

/* ── Validate before writing anything ── */
const seen = new Set();
const ID_RE = /^DE(\d\d)-T(\d\d)$/;
const REQUIRED_STRING_FIELDS = ['title', 'scenario', 'question', 'solutionLang', 'solution', 'output', 'explanation', 'readinessNote'];
src.chapters.forEach(ch => {
  if (!ch.code || !ch.name || !Array.isArray(ch.lessons) || !ch.lessons.length) {
    fail('chapter ' + (ch.code || '?') + ' is missing code, name or lessons');
  }
  ch.lessons.forEach(l => {
    const m = ID_RE.exec(l.id || '');
    if (!m) fail('bad lesson id: ' + l.id);
    if (!l.id.startsWith(ch.code + '-')) fail(l.id + ' does not belong to chapter ' + ch.code);
    if (seen.has(l.id)) fail('duplicate lesson id: ' + l.id);
    seen.add(l.id);
    REQUIRED_STRING_FIELDS.forEach(k => {
      if (!l[k] || !String(l[k]).trim()) fail(l.id + ' is missing ' + k);
    });
  });
});

/* ── Render ── */
function lessonMd(ch, chIndex, lesson) {
  const chapterNo = chIndex + 1;
  const lines = [];
  lines.push('# ' + lesson.id + ' — ' + ch.name + ' | ' + lesson.title);
  lines.push('');
  lines.push('## ID');
  lines.push(lesson.id);
  lines.push('');
  lines.push('## Chapter');
  lines.push(chapterNo + ' — ' + ch.name);
  lines.push('');
  lines.push('## Live Scenario');
  lines.push(lesson.scenario);
  lines.push('');
  lines.push('## The Question');
  lines.push('> ' + lesson.question);
  lines.push('');
  lines.push('## Solution Code');
  lines.push('```' + lesson.solutionLang);
  lines.push(lesson.solution.replace(/\n$/, ''));
  lines.push('```');
  lines.push('');
  lines.push('## Expected Output');
  lines.push(lesson.output);
  lines.push('');
  lines.push('## Explanation');
  lines.push(lesson.explanation);
  lines.push('');
  lines.push('## Job-Readiness Note');
  lines.push(lesson.readinessNote);
  lines.push('');
  return lines.join('\n');
}

/* ── Render and validate ENTIRELY IN MEMORY before touching the disk ──
   Same discipline as build-ba-lessons.js: a failed run must leave the
   previous good output exactly as it was, never a half-written tree. */
const files = new Map();          // filename -> contents
const index = [];
src.chapters.forEach((ch, ci) => {
  ch.lessons.forEach(l => files.set(l.id + '.md', lessonMd(ch, ci, l)));
  index.push({ code: ch.code, name: ch.name, desc: ch.desc || '', lessons: ch.lessons.map(l => ({ id: l.id, title: l.title })) });
});
files.set('index.json', JSON.stringify(index, null, 2) + '\n');

/* The app's DE_CHAPTERS constant in index.html is the id space the running
   app actually knows about (mirroring how DV_GROUPS works) — check the
   generated markdown agrees with it, so a lesson id typo here can't produce
   a page the app will never link to, or a link the app has to a page that
   doesn't exist. */
const htmlPath = path.join(ROOT, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const m = html.match(/const DE_CHAPTERS\s*=\s*(\[[\s\S]*?\]);\s*\r?\n/);
if (!m) fail('DE_CHAPTERS not found in index.html — has it been added yet?');
const appChapters = JSON.parse(m[1]);
const appIds = new Set(appChapters.flatMap(c => c.t.map((_, i) => `${c.code}-T${String(i + 1).padStart(2, '0')}`)));
const indexed = new Set(index.flatMap(ch => ch.lessons.map(l => l.id)));
const notInApp = [...indexed].filter(id => !appIds.has(id));
const notInSource = [...appIds].filter(id => !indexed.has(id));
if (notInApp.length) fail('in sources/data-engineering.json but not in index.html DE_CHAPTERS: ' + notInApp.join(', '));
if (notInSource.length) fail('in index.html DE_CHAPTERS but not in sources/data-engineering.json: ' + notInSource.join(', '));

/* Validation passed — now the disk. */
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
fs.readdirSync(OUT)
  .filter(f => ID_RE.test(f.replace(/\.md$/, '')) || f === 'index.json')
  .forEach(f => fs.unlinkSync(path.join(OUT, f)));

for (const [name, body] of files) fs.writeFileSync(path.join(OUT, name), body, 'utf8');

console.log('chapters: ' + src.chapters.length + ' | lessons: ' + indexed.size);
console.log('written to data-engineering/ (+ index.json)');
console.log('index.json, markdown and index.html DE_CHAPTERS all agree on ' + indexed.size + ' lesson ids');
