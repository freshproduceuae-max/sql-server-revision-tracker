// Content linter for lesson/project markdown.
//
// Usage: node scripts/lint-markdown.js data-validation-lab projects business-analysis
//
// Walks LOCAL directories only. The 54 Credit Risk lessons live on the content
// branch and are fetched at runtime, so they are outside this guard entirely.
//
// mdToHtml() extracts fenced code before other rules, but the paragraph and list
// passes still run around it. A fence nested inside a list item (indented) or an
// unclosed fence would render wrong. Neither occurs today (0/318 in-repo files) —
// linter exists so it stays that way. Exits non-zero on any hit.
const fs = require('fs');
const path = require('path');

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, acc);
    else if (f.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

const roots = process.argv.slice(2);
const files = roots.filter(fs.existsSync).flatMap((r) => walk(r));
const hits = [];

for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  let inFence = false;
  lines.forEach((l, i) => {
    if (/^\s*```/.test(l)) {
      if (!inFence && /^\s{2,}```/.test(l)) hits.push(`${f}:${i + 1}`);
      inFence = !inFence;
    }
  });
  if (inFence) hits.push(`${f}: UNCLOSED FENCE`);
}

console.log('markdown files scanned:', files.length);
console.log('indented fences (fence-inside-list candidates):', hits.length);
hits.slice(0, 10).forEach((h) => console.log('  ' + h));
if (hits.length) { console.error('markdown lint FAILED — see LESSONS-LEARNED entry 4'); process.exit(1); }
