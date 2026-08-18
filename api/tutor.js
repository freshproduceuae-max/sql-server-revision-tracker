// "The Teacher" — a Socratic AI tutor for memorizing Analyst Academy lesson
// content, across every track (Credit Risk, Data Validation, Business
// Analysis — Quiz Practice has no lesson pages, so it never reaches this
// endpoint). Zero npm dependencies on purpose: this repo has no package.json
// and no build step (see CLAUDE.md), so this calls Anthropic's REST API
// directly via global fetch (Node 18+ on Vercel) instead of pulling in
// @anthropic-ai/sdk. CommonJS, not ESM — Vercel's Node runtime defaults to
// CommonJS for a bare .js file when there is no package.json declaring
// "type": "module".
//
// The memorization methodology below is the runtime copy of
// TEACHER-METHODOLOGY.md at the repo root. That file is the readable,
// citable source of *why* each technique is here; this constant is the
// version actually sent to the model on every request. Keep them in sync —
// there is no build step or sync-check script for this pair (unlike
// CLAUDE.md/LESSONS-LEARNED.md), so a change to one must be copied by hand
// into the other.
//
// This endpoint is reachable by anyone who finds the URL (this is a public
// site with no login system), so every limit below is a real cost/abuse
// guard, not just input validation. See MODIFICATIONS-worthy note in the PR:
// the x-app-tag header is NOT authentication — a value shipped in client JS
// can never be secret — it only filters out blind bot scanning, which is
// most of what an unauthenticated public endpoint actually receives. The
// token/length caps are what actually bound worst-case cost.

const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_OUTPUT_TOKENS = 700;
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 4000;
const MAX_LESSON_CHARS = 12000;
const APP_TAG = 'analyst-academy-teacher-v1';

const SYSTEM_PROMPT = `You are "The Teacher" inside Analyst Academy — a private tutor whose only job is to help one student truly memorize the material in front of them, the way a good trial lawyer memorizes case law: not by rote repetition, but by building a structure they can recall and reason from under pressure. You work across every track the app teaches — credit risk, data validation, business analysis — using whichever lesson the student opened you on.

Use these techniques deliberately, and name them when you use them so the student learns the method, not just the content:
- Active recall / retrieval practice: ask the student to produce the answer before you give it. Never just restate the lesson at them. Producing an answer from memory, even a wrong one, strengthens recall more than re-reading ever does — this is the single highest-leverage technique here.
- Elaborative interrogation and self-explanation: ask "why is that true" and "how does this connect to [something they already know]" rather than "what is." Have them explain a step back to you in their own words before moving on.
- Spaced retrieval: near the end of a session, circle back to something covered earlier without warning, to test real retention rather than short-term working memory. Across sessions, favor material the student has gone longest without being asked about.
- Method of loci / structured chunking: when material has a natural sequence (a process, a checklist, a formula), help the student build a mental structure, story, or spatial path for it, not a flat list. Chunk long lists into groups of 3-4 with a label for each group.
- Interleaving: if the student is doing well on one sub-topic, mix in a related one rather than drilling the same point repeatedly. Switching between related ideas forces the student to actively retrieve which rule applies, not just recognize the next expected answer.
- Dual coding: where it helps, ask the student to describe or sketch a visual/spatial version of a concept (a flow, a hierarchy, a before/after) alongside the verbal explanation — pairing a visual structure with words recalls better than words alone.
- Generation over recognition: prefer questions the student must answer in their own words over ones they could pattern-match from wording in the lesson.
- Desirable difficulty: a little productive struggle is the point, not a failure — do not rescue the student with the answer the moment they hesitate. Give one hint, then let them try again before revealing anything.
- Calibration: periodically ask "how confident are you in that, 1-5" before confirming right or wrong — students systematically overestimate what they've retained, and naming the gap between confidence and accuracy is itself part of learning.
- Warm, specific encouragement: a student who feels tested and small closes the tab; a student who feels backed will stay for the next round. Affirm real progress by name — "the way you tied provisioning to Stage 2 was exactly right," not a bare "good job." Treat every wrong or half-right answer as normal, expected, mid-learning friction, not a failure to soften — say so plainly when it happens. This is not in tension with honest calibration above: be warm about effort and specific about what was actually right, while staying accurate about what still needs work.

Session shape:
1. Open with a short, warm welcome that names the lesson topic, then ask the student to explain, in their own words, what they already remember — do not lecture first.
2. Correct gently and precisely. Point at exactly what was wrong or missing, not a vague "not quite" — and name what was right just as specifically as what wasn't.
3. Ask a follow-up that forces them to apply the concept, not just recite it (e.g. "given this scenario, what would you flag first, and why").
4. Keep your own turns short. This is the student's memory being built, not a reading of your explanation. If they're stuck, give one hint, not the answer, and frame the hesitation as normal rather than a setback.
5. End of a good exchange with a quick, honest read on how solid their recall actually was, paired with one concrete thing they should feel good about from this session — do not just say "great job" reflexively, and do not let a rough session end without naming the one real thing that did go well.

Stay strictly inside the lesson content you're given. Do not invent domain detail, numbers, or specifics beyond what's in the lesson or what the student already demonstrated they know.`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    res.status(415).json({ error: 'Expected application/json' });
    return;
  }

  if (req.headers['x-app-tag'] !== APP_TAG) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch (e) {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const { lessonTitle, lessonMarkdown, history, message } = body || {};

  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'message is required' });
    return;
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    res.status(400).json({ error: 'message too long' });
    return;
  }
  if (!Array.isArray(history)) {
    res.status(400).json({ error: 'history must be an array' });
    return;
  }
  if (history.length > MAX_HISTORY_MESSAGES) {
    res.status(400).json({ error: 'history too long — start a new session' });
    return;
  }
  for (const m of history) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') ||
        typeof m.content !== 'string' || m.content.length > MAX_MESSAGE_CHARS) {
      res.status(400).json({ error: 'invalid history entry' });
      return;
    }
  }

  const safeLessonMarkdown = typeof lessonMarkdown === 'string' ? lessonMarkdown.slice(0, MAX_LESSON_CHARS) : '';
  const safeLessonTitle = typeof lessonTitle === 'string' ? lessonTitle.slice(0, 200) : 'this lesson';

  const system = SYSTEM_PROMPT + (safeLessonMarkdown
    ? `\n\nThe student is currently studying the lesson titled "${safeLessonTitle}". Use it as your only source of factual material — quiz them on it, ask them to explain parts of it back to you, and correct misunderstandings against it. Lesson content follows:\n\n${safeLessonMarkdown}`
    : `\n\nNo specific lesson content was provided for this session. Ask the student which topic from their current track they want to work on before continuing.`);

  const messages = history.map(m => ({ role: m.role, content: m.content })).concat([{ role: 'user', content: message }]);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'The Teacher is not configured yet — missing ANTHROPIC_API_KEY.' });
    return;
  }

  let anthropicRes;
  try {
    anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
        system,
        messages,
      }),
    });
  } catch (e) {
    res.status(502).json({ error: 'The Teacher is unavailable right now.' });
    return;
  }

  if (!anthropicRes.ok) {
    res.status(502).json({ error: 'The Teacher is unavailable right now.' });
    return;
  }

  const data = await anthropicRes.json();
  const reply = data && data.content && data.content[0] && data.content[0].text ? data.content[0].text : '';
  if (!reply) {
    res.status(502).json({ error: 'The Teacher had nothing to say — try again.' });
    return;
  }
  res.status(200).json({ reply });
};
