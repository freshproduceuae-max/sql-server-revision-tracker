#!/usr/bin/env node
/*
 * Renders the Business Analysis lesson markdown from sources/business-analysis.json.
 *
 * Output is deterministic — same input gives byte-identical files, so a change
 * can be verified by rebuilding and diffing against what is committed. Nothing
 * here writes a timestamp for that reason.
 *
 * Deliberately emits no fenced code blocks: lint-markdown.js rejects indented
 * fences, and the app's mdToHtml lifts code out before any other rule runs.
 * BA lessons are prose and lists only, so neither concern applies.
 *
 *   node scripts/build-ba-lessons.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'sources', 'business-analysis.json');
const OUT = path.join(ROOT, 'business-analysis');

function fail(msg) {
  console.error('build-ba-lessons: ' + msg);
  process.exit(1);
}

const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
if (!Array.isArray(src.chapters) || !src.chapters.length) fail('no chapters in source');

/* ── Validate before writing anything ── */
const seen = new Set();
const ID_RE = /^BA(\d\d)-T(\d\d)$/;
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
    ['title', 'scenario', 'question', 'pitfall', 'interview'].forEach(k => {
      if (!l[k] || !String(l[k]).trim()) fail(l.id + ' is missing ' + k);
    });
    ['approach', 'outputs', 'tools'].forEach(k => {
      if (!Array.isArray(l[k]) || !l[k].length) fail(l.id + ' is missing ' + k);
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
  lines.push('## Approach');
  lesson.approach.forEach((a, i) => lines.push((i + 1) + '. ' + a));
  lines.push('');
  lines.push('## Deliverables');
  lesson.outputs.forEach(o => lines.push('- ' + o));
  lines.push('');
  lines.push('## Tools');
  lesson.tools.forEach(t => lines.push('- ' + t));
  lines.push('');
  lines.push('## Common Pitfall');
  lines.push(lesson.pitfall);
  lines.push('');
  lines.push('## Interview Angle');
  lines.push(lesson.interview);
  lines.push('');
  return lines.join('\n');
}

/* ── Render and validate ENTIRELY IN MEMORY before touching the disk ──
   The earlier version deleted the generated markdown, then wrote, then validated.
   Anything that failed in between — a bad source field, a crash, a Ctrl-C — left
   a half-generated tree on disk that the app would serve without complaint. The
   disk is now only written once the whole output is built and checked, so a
   failed run leaves the previous good output exactly as it was. */
const files = new Map();          // filename -> contents
const index = [];
src.chapters.forEach((ch, ci) => {
  ch.lessons.forEach(l => files.set(l.id + '.md', lessonMd(ch, ci, l)));
  index.push({ code: ch.code, name: ch.name, desc: ch.desc || '', lessons: ch.lessons.map(l => ({ id: l.id, title: l.title })) });
});
files.set('index.json', JSON.stringify(index, null, 2) + '\n');

/* The app builds its BA id space from index.json at runtime, not from index.html,
   so the invariant worth guarding is that the index and the markdown agree. A
   lesson in one but not the other is an unreachable page or a dead link, and both
   fail silently in the browser. Checked against what we are ABOUT to write. */
const indexed = new Set(index.flatMap(ch => ch.lessons.map(l => l.id)));
const rendered = new Set([...files.keys()].filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')));
const notRendered = [...indexed].filter(id => !rendered.has(id));
const notIndexed = [...rendered].filter(id => !indexed.has(id));
if (notRendered.length) fail('in index.json but not rendered: ' + notRendered.join(', '));
if (notIndexed.length) fail('rendered but missing from index.json: ' + notIndexed.join(', '));

/* Validation passed — now the disk. */
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

/* Remove only files this script owns, so a renamed lesson does not leave a stale
   orphan behind that the app would still happily serve. */
fs.readdirSync(OUT)
  .filter(f => ID_RE.test(f.replace(/\.md$/, '')))
  .forEach(f => fs.unlinkSync(path.join(OUT, f)));

for (const [name, body] of files) fs.writeFileSync(path.join(OUT, name), body, 'utf8');

console.log('chapters: ' + src.chapters.length + ' | lessons: ' + rendered.size);
console.log('written to business-analysis/ (+ index.json)');
console.log('index.json and markdown agree on all ' + indexed.size + ' lesson ids');
