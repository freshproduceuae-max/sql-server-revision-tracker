// Merges converted quiz banks into a single quiz-bank.json.
//
// Usage (run from the repo root):
//   node scripts/merge-quiz-banks.js quiz-bank.json out-sql.json out-ai.json
//
// The first argument is the file to write; the rest are inputs, concatenated in
// order. Aborts on duplicate quiz names so a re-run cannot silently double up.

const fs = require('fs');

const [OUT, ...INPUTS] = process.argv.slice(2);
if (!OUT || INPUTS.length === 0) {
  console.error('usage: node scripts/merge-quiz-banks.js <out.json> <in.json> [in2.json ...]');
  process.exit(1);
}

const quizzes = [];
const seen = new Set();

for (const file of INPUTS) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const quiz of data.quizzes) {
    if (seen.has(quiz.quiz_name)) {
      console.error(`duplicate quiz name "${quiz.quiz_name}" (from ${file}) — aborting`);
      process.exit(1);
    }
    seen.add(quiz.quiz_name);
    quizzes.push(quiz);
  }
}

// Every question must be answerable by clicking: no free text, and the correct
// answer has to be one of the offered choices.
const problems = [];
let count = 0;
for (const quiz of quizzes) {
  for (const lesson of quiz.lessons) {
    for (const q of lesson.questions) {
      count++;
      const where = `${quiz.quiz_name} / ${lesson.lesson_name}`;
      if (q.type === 'fill_in_the_blank' || q.type === 'short_answer') {
        problems.push(`free-text question survived: ${where}`);
      } else if (q.type === 'matching_pairs') {
        if (!q.choices?.terms || !q.choices?.definitions) problems.push(`bad matching shape: ${where}`);
      } else if (!Array.isArray(q.choices) || !q.choices.includes(q.correct_answer)) {
        problems.push(`answer not among choices: ${where}`);
      } else if (/^["'`)\],;:]\s|^\s|^[a-z]{1,3}\.\s/.test(q.correct_answer)) {
        // Closing punctuation followed by a space (or a stray "g. " abbreviation
        // tail) means a sentence splitter lost the opening of the answer.
        // Quotes with no space after them are legitimate: "BankID-0042", `break`.
        problems.push(`truncated option "${q.correct_answer.slice(0, 40)}" in ${where}`);
      }
    }
  }
}

if (problems.length) {
  console.error(`${problems.length} problem(s) found — not writing:`);
  problems.slice(0, 10).forEach((p) => console.error('  ' + p));
  process.exit(1);
}

fs.writeFileSync(OUT, JSON.stringify({ quizzes }));
console.log(`banks: ${quizzes.length}`);
console.log(`lessons: ${quizzes.reduce((a, q) => a + q.lessons.length, 0)}`);
console.log(`questions: ${count}`);
console.log(`written: ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`);
