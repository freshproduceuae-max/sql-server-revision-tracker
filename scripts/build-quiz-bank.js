// Builds quiz-bank.json for Analyst Academy's Quiz Practice track.
//
// Usage (run from the repo root):
//   node scripts/build-quiz-bank.js <source.json> <out.json> [all]
//
// The two sources this was built from, and how the live bank was produced:
//   node scripts/build-quiz-bank.js ../_archive/quiz-app/quizzes.json  out-sql.json
//   node scripts/build-quiz-bank.js "C:/Projects/Studying Assistant/ai_supercourse_quizzes.json" out-ai.json all
// The live quiz-bank.json is those two outputs concatenated on `quizzes`.
//
// Two jobs:
//  1. Keep only the analyst-relevant quizzes (drops the Arabic vocabulary sets).
//     Pass "all" instead to import every quiz in the source.
//  2. Convert every free-text question (fill_in_the_blank, short_answer) into
//     multiple choice, since the track has no text-entry UI.
//
// Distractors are drawn from other questions in the same quiz so the wrong
// options stay topically plausible. Shuffling is seeded, so re-running this
// script on unchanged input produces a byte-identical file.

const fs = require('fs');
const path = require('path');

const SRC = process.argv[2];
const OUT = process.argv[3];
// Pass "all" to import every quiz in the source file. Omit it to keep only the
// named list below (used for quizzes.json, which also holds Arabic vocab sets).
const KEEP_ALL = process.argv[4] === 'all';

const KEEP = [
  'Microsoft SQL Server (T-SQL)',
  'New SQL Quiz — Modules 1–20',
  'Power BI DAX: A to Z Comprehensive and Concise',
];

const OPTIONS_PER_QUESTION = 4;

// Deterministic PRNG (mulberry32) — keeps generated files stable across runs.
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,;:!?"'`]/g, '');

// short_answer stores a keyword list, not a sentence. The explanation holds the
// real answer, so the correct option is built from it.
//
// Taking only the first sentence silently halved contrast questions: "what is the
// difference between = and ==" produced "A single = assigns a value", which
// answers one side and leaves the other out. Prompts that ask for a comparison
// therefore take at least two sentences.
function answerFromExplanation(explanation, question, cap = 260) {
  const clean = String(explanation).replace(/\s+/g, ' ').trim();
  // Split, never match: a match-based splitter drops any text it cannot fit the
  // pattern, which silently ate the opening of explanations containing a "?"
  // inside quotes ("fast 'is this in here?' checks"). Splitting is lossless.
  const sentences = clean.split(/(?<=[.!?])\s+(?=[A-Z(])/);
  const needsBoth = /\bdifference\b|\bvs\.?\b|\bversus\b|\bcompares?\b|\bbetween\b/i.test(question || '');
  const minSentences = needsBoth ? 2 : 1;

  let out = '';
  for (let i = 0; i < sentences.length; i++) {
    const candidate = (out ? out + ' ' : '') + sentences[i].trim();
    if (i >= minSentences && candidate.length > cap) break;
    out = candidate;
    if (i + 1 >= minSentences && out.length >= 140) break;
  }
  if (out.length > cap) out = out.slice(0, cap - 1).replace(/\s+\S*$/, '') + '…';
  return out;
}

// A distractor is only useful if it could plausibly fill the same slot. Offering
// a DAX function name against a prose answer ("connect to various ___") is
// eliminable on sight, so answers are bucketed by shape and matched like for like.
function answerShape(s) {
  const t = String(s).trim();
  if (/[()[\]]/.test(t) || /^[A-Z][A-Z0-9_.]{2,}$/.test(t)) return 'code';
  return /\s/.test(t) ? 'phrase' : 'word';
}

// Tiers are tried in order: same lesson + same shape is the strongest distractor,
// whole-quiz + any shape is the last resort so every question still gets options.
// A short_answer prompt asks the learner to write prose, and often to supply an
// example. Neither is possible once it becomes multiple choice, so strip the
// write-only instructions and state plainly that one option must be selected.
// The lead-in goes on its own line; .quiz-q renders with white-space:pre-wrap.
function reframeShortAnswer(text) {
  const t = String(text)
    .replace(/\s*(Provide an example\.?|Give an example\.?|List the key reason\.?|Provide a brief example\.?)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `${t}\n\nWhich statement best answers this?`;
}

function pickDistractors(correct, tiers, need, rng) {
  const seen = new Set([norm(correct)]);
  const shape = answerShape(correct);
  const out = [];

  const take = (pool, requireShape) => {
    for (const cand of shuffle(pool, rng)) {
      if (out.length >= need) return;
      const n = norm(cand);
      if (!n || seen.has(n)) continue;
      if (requireShape && answerShape(cand) !== shape) continue;
      seen.add(n);
      out.push(cand);
    }
  };

  for (const pool of tiers) take(pool, true);
  for (const pool of tiers) take(pool, false);
  return out;
}

const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const stats = { kept: 0, fib: 0, sa: 0, mc: 0, tf: 0, mp: 0, dropped: 0 };
const outQuizzes = [];

for (const quiz of src.quizzes) {
  if (!KEEP_ALL && !KEEP.includes(quiz.quiz_name)) continue;

  // Answer pools for this quiz, used to source plausible distractors.
  const fibPool = [];
  const saPool = [];
  for (const lesson of quiz.lessons) {
    for (const q of lesson.questions) {
      if (q.type === 'fill_in_the_blank' && q.correct_answer?.[0]) fibPool.push(q.correct_answer[0]);
      if (q.type === 'short_answer' && q.explanation) saPool.push(answerFromExplanation(q.explanation, q.question_text));
    }
  }

  const lessons = [];
  for (const lesson of quiz.lessons) {
    const questions = [];

    // Same-lesson answers make the closest distractors; quiz-wide is the fallback.
    const fibLesson = [];
    const saLesson = [];
    for (const q of lesson.questions) {
      if (q.type === 'fill_in_the_blank' && q.correct_answer?.[0]) fibLesson.push(q.correct_answer[0]);
      if (q.type === 'short_answer' && q.explanation) saLesson.push(answerFromExplanation(q.explanation, q.question_text));
    }

    for (const q of lesson.questions) {
      const seed = hashStr(quiz.quiz_name + '|' + lesson.lesson_name + '|' + q.question_text);
      const rng = makeRng(seed);

      if (q.type === 'multiple_choice' || q.type === 'true_false') {
        if (!Array.isArray(q.choices) || q.choices.length < 2) { stats.dropped++; continue; }
        if (!q.correct_answer?.[0]) { stats.dropped++; continue; }
        stats[q.type === 'true_false' ? 'tf' : 'mc']++;
        questions.push({
          question_text: q.question_text,
          choices: q.choices,
          correct_answer: q.correct_answer[0],
          type: q.type,
          explanation: q.explanation || '',
        });
        continue;
      }

      if (q.type === 'matching_pairs') {
        // Two shapes exist in the source: an explicit {terms, definitions} pair,
        // and a flat {term: definition} map. Normalise both to {terms, definitions}.
        const pairMap =
          q.correct_answer && typeof q.correct_answer === 'object' && !Array.isArray(q.correct_answer)
            ? q.correct_answer
            : null;
        if (!pairMap || Object.keys(pairMap).length < 2) { stats.dropped++; continue; }
        const terms = q.choices?.terms ?? Object.keys(pairMap);
        const definitions = q.choices?.definitions ?? Object.values(pairMap);
        if (!terms.length || !definitions.length) { stats.dropped++; continue; }
        stats.mp++;
        questions.push({
          question_text: q.question_text,
          choices: { terms, definitions },
          correct_answer: pairMap,
          type: 'matching_pairs',
          explanation: q.explanation || '',
        });
        continue;
      }

      // ── Free text → multiple choice ──────────────────────────────────────
      if (q.type === 'fill_in_the_blank') {
        const correct = q.correct_answer?.[0];
        if (!correct) { stats.dropped++; continue; }
        const distractors = pickDistractors(correct, [fibLesson, fibPool], OPTIONS_PER_QUESTION - 1, rng);
        if (distractors.length < 2) { stats.dropped++; continue; }
        stats.fib++;
        questions.push({
          question_text: q.question_text,
          choices: shuffle([correct, ...distractors], rng),
          correct_answer: correct,
          type: 'multiple_choice',
          explanation: q.explanation || '',
          converted_from: 'fill_in_the_blank',
        });
        continue;
      }

      if (q.type === 'short_answer') {
        if (!q.explanation) { stats.dropped++; continue; }
        const correct = answerFromExplanation(q.explanation, q.question_text);
        const distractors = pickDistractors(correct, [saLesson, saPool], OPTIONS_PER_QUESTION - 1, rng);
        if (distractors.length < 2) { stats.dropped++; continue; }
        stats.sa++;
        questions.push({
          question_text: reframeShortAnswer(q.question_text),
          choices: shuffle([correct, ...distractors], rng),
          correct_answer: correct,
          type: 'multiple_choice',
          explanation: q.explanation,
          converted_from: 'short_answer',
        });
        continue;
      }

      stats.dropped++;
    }

    if (questions.length) lessons.push({ lesson_name: lesson.lesson_name, questions });
  }

  if (lessons.length) {
    stats.kept += lessons.reduce((a, l) => a + l.questions.length, 0);
    outQuizzes.push({ quiz_name: quiz.quiz_name, lessons });
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ quizzes: outQuizzes }));

console.log('quizzes:', outQuizzes.length);
console.log('questions kept:', stats.kept);
console.log('  multiple_choice (original):', stats.mc);
console.log('  true_false:', stats.tf);
console.log('  matching_pairs:', stats.mp);
console.log('  converted fill_in_the_blank -> MC:', stats.fib);
console.log('  converted short_answer -> MC:', stats.sa);
console.log('dropped (unusable):', stats.dropped);
console.log('output size:', (fs.statSync(OUT).size / 1024).toFixed(0) + ' KB');
