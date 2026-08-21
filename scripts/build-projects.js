// Generates checkpoint project briefs for Analyst Academy.
//
// Usage (from repo root):
//   node scripts/build-projects.js
//
// Emits:
//   projects/index.json        — id, title, track, covered lesson ids, file
//   projects/P-CR-*.md         — 13 Credit Risk briefs (one per course part)
//   projects/P-DV-*.md         — 10 Data Validation briefs (thematic group pairs)
//   projects/data/*.csv        — synthetic datasets (seeded, deterministic)
//
// Credit briefs follow one borrower, Meridian Fabrication Ltd, across the whole
// course so each checkpoint builds on the previous one. DV briefs run against
// the six dirty CSVs already shipped in data-validation-lab/schemas/.
//
// Deterministic: seeded PRNG, no Date/Math.random — identical output each run.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'projects');
const DATA = path.join(OUT, 'data');
fs.mkdirSync(DATA, { recursive: true });

// Nothing here may read from _scratch/ — that directory is documented as safe to
// delete at any time, so a build depending on it is a build that silently breaks.

// DV group data is read straight out of index.html, which is what the running app
// uses to build technique ids. Reading it from anywhere else creates a second
// source of truth: coverage could pass here while the app checks completion
// against different ids, leaving a checkpoint permanently unreachable.
function loadDvGroupsFromApp() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const m = html.match(/const DV_GROUPS\s*=\s*(\[[\s\S]*?\]);\s*\r?\n/);
  if (!m) throw new Error('DV_GROUPS not found in index.html — did the constant move or get renamed?');
  const groups = JSON.parse(m[1]);
  if (!Array.isArray(groups) || !groups.length) throw new Error('DV_GROUPS parsed but empty');
  for (const g of groups) {
    if (!g.code || !g.name || !Array.isArray(g.t) || !g.t.length) {
      throw new Error(`DV_GROUPS entry malformed: ${JSON.stringify(g).slice(0, 80)}`);
    }
  }
  return groups;
}
const DV_GROUPS = loadDvGroupsFromApp();

// Same rule for the credit id space. Hardcoding "47 modules and 7 case studies"
// would be a hand-maintained copy of something the app already declares, which is
// the drift bug in miniature — the validator would keep passing against a fiction
// if the course ever gained or lost a module.
function loadCreditIdsFromApp() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const m = html.match(/const UNIT_DEFS\s*=\s*(\[[\s\S]*?\n\];)/);
  if (!m) throw new Error('UNIT_DEFS not found in index.html — did the constant move or get renamed?');
  const modules = [...m[1].matchAll(/code:\s*'(M\d{2})'/g)].map((x) => x[1]);
  const cases = [...m[1].matchAll(/id:\s*'(CS\d{2})'/g)].map((x) => x[1]);
  if (!modules.length) throw new Error('UNIT_DEFS parsed but no module codes found');
  if (!cases.length) throw new Error('UNIT_DEFS parsed but no case-study ids found');
  return { modules, cases };
}
const CREDIT = loadCreditIdsFromApp();

// Same rule for Data Engineering. Phase 1 only has DE01 in DE_CHAPTERS — this
// loader doesn't assume 6 chapters exist, it just reads whatever's there, so
// it needs no changes when DE02-DE06 are authorized later.
function loadDeChaptersFromApp() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const m = html.match(/const DE_CHAPTERS\s*=\s*(\[[\s\S]*?\]);\s*\r?\n/);
  if (!m) throw new Error('DE_CHAPTERS not found in index.html — did the constant move or get renamed?');
  const chapters = JSON.parse(m[1]);
  if (!Array.isArray(chapters) || !chapters.length) throw new Error('DE_CHAPTERS parsed but empty');
  for (const c of chapters) {
    if (!c.code || !c.name || !Array.isArray(c.t) || !c.t.length) {
      throw new Error(`DE_CHAPTERS entry malformed: ${JSON.stringify(c).slice(0, 80)}`);
    }
  }
  return chapters;
}
const DE_CHAPTERS = loadDeChaptersFromApp();

function techIds(groupCode) {
  const g = DV_GROUPS.find((x) => x.code === groupCode);
  return g.t.map((_, i) => `${groupCode}-T${String(i + 1).padStart(2, '0')}`);
}
function deLessonIds(chapterCode) {
  const c = DE_CHAPTERS.find((x) => x.code === chapterCode);
  return c.t.map((_, i) => `${chapterCode}-T${String(i + 1).padStart(2, '0')}`);
}

function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const mdTable = (header, rows) =>
  `| ${header.join(' | ')} |\n| ${header.map(() => '---').join(' | ')} |\n` +
  rows.map((r) => `| ${r.join(' | ')} |`).join('\n');

const lessonLinks = (ids) => ids.map((id) => `[${id}](#lesson/${id})`).join(' · ');

// ── Synthetic portfolio for the modelling checkpoints ────────────────────────
function buildPortfolioCsv() {
  const rng = makeRng(20260804);
  const segs = ['Manufacturing', 'Retail', 'Construction', 'Healthcare', 'Logistics'];
  const grades = ['BB+', 'BB', 'BB-', 'B+', 'B', 'B-'];
  const rows = [['LoanID', 'Segment', 'Grade', 'LimitGBP', 'DrawnGBP', 'DSCR', 'LeverageX', 'YearsTrading', 'PriorArrears', 'DefaultFlag', 'ObservedLGD']];
  for (let i = 1; i <= 60; i++) {
    const seg = segs[Math.floor(rng() * segs.length)];
    const gi = Math.floor(rng() * grades.length);
    const limit = (200 + Math.floor(rng() * 48) * 25) * 1000;
    const drawn = Math.round(limit * (0.35 + rng() * 0.6));
    const dscr = +(0.8 + rng() * 1.9).toFixed(2);
    const lev = +(1.5 + rng() * 4.5).toFixed(1);
    const yrs = 2 + Math.floor(rng() * 28);
    const arrears = rng() < 0.22 ? 1 : 0;
    // default risk rises with grade index, leverage, arrears; falls with DSCR
    const p = 0.03 + gi * 0.03 + (lev > 4 ? 0.08 : 0) + arrears * 0.12 - (dscr > 1.5 ? 0.05 : 0);
    const def = rng() < p ? 1 : 0;
    const lgd = def ? +(0.25 + rng() * 0.5).toFixed(2) : '';
    rows.push([`L${String(i).padStart(3, '0')}`, seg, grades[gi], limit, drawn, dscr, lev, yrs, arrears, def, lgd]);
  }
  fs.writeFileSync(path.join(DATA, 'portfolio_loans.csv'), rows.map((r) => r.join(',')).join('\n') + '\n');
  const defaults = rows.slice(1).filter((r) => r[9] === 1).length;
  return { rows: rows.length - 1, defaults };
}
const PORTFOLIO = buildPortfolioCsv();

// ── Meridian's financials, reused across credit briefs ───────────────────────
const MERIDIAN_PL = mdTable(
  ['P&L (£000)', 'FY2023', 'FY2024', 'FY2025'],
  [
    ['Revenue', '18,400', '21,100', '22,300'],
    ['Cost of sales', '(12,880)', '(15,190)', '(16,720)'],
    ['Gross profit', '5,520', '5,910', '5,580'],
    ['Overheads', '(3,310)', '(3,590)', '(3,850)'],
    ['EBITDA', '2,210', '2,320', '1,730'],
    ['Depreciation', '(640)', '(710)', '(780)'],
    ['Interest paid', '(310)', '(390)', '(560)'],
    ['Profit before tax', '1,260', '1,220', '390'],
  ],
);
const MERIDIAN_BS = mdTable(
  ['Balance sheet (£000)', 'FY2023', 'FY2024', 'FY2025'],
  [
    ['Fixed assets', '4,900', '5,600', '6,100'],
    ['Stock', '2,300', '3,100', '4,050'],
    ['Trade debtors', '2,700', '3,300', '4,180'],
    ['Cash', '820', '460', '150'],
    ['Trade creditors', '(2,100)', '(2,500)', '(2,720)'],
    ['Bank debt (term)', '(2,400)', '(3,100)', '(4,300)'],
    ['RCF drawn', '(300)', '(800)', '(1,450)'],
    ['Net assets', '5,920', '6,060', '6,010'],
  ],
);
const MERIDIAN_INTRO =
  'You are the credit analyst covering **Meridian Fabrication Ltd**, a UK ' +
  'mid-market precision steel fabricator (est. 2009, 140 staff, Birmingham). ' +
  'Meridian supplies structural components to construction and infrastructure ' +
  'contractors and has banked with you for six years.';

// ── Credit Risk checkpoints: one per course part ─────────────────────────────
const CR = [
  {
    n: 1, title: 'Onboard the Borrower', covers: ['M01', 'M02'],
    tagline: 'KYC file and lending-lifecycle map for a new-to-bank applicant',
    scenario: [
      'A prospective borrower, **Harwell Metrics Ltd**, has approached the bank for a £750k working-capital facility. Before any analysis happens, the file must clear onboarding.',
      'Companies House shows: incorporated 2018; two directors (one resident in the UAE); 55% held by **Harwell Holdings (Jersey)**, 25% by director A. Patel, 20% split among four angel investors; a 2022 change of registered office; and one dissolved sister company.',
    ],
    data: [['Ownership extract', mdTable(['Holder', 'Stake', 'Domicile', 'Notes'], [
      ['Harwell Holdings Ltd', '55%', 'Jersey', 'Holding co — members not on public register'],
      ['A. Patel (director)', '25%', 'UK', 'Also director of dissolved SteelServe Ltd (2023)'],
      ['R. Osei (director)', '—', 'UAE', 'Non-resident director'],
      ['Four angel investors', '20%', 'UK', '5% each'],
    ])]],
    tasks: [
      ['M01', 'Map Harwell\'s request onto the end-to-end lending lifecycle: name each stage from origination to exit and state which team owns it at your bank.'],
      ['M01', 'Estimate the deal\'s revenue to the bank: assume margin 3.2% over base on £750k fully drawn, a 1% arrangement fee, and £4k/yr in account income. What is year-1 income, and why might RAROC still be poor?'],
      ['M02', 'Identify every UBO under the 25% rule. Show your working through the Jersey holding company and state what evidence you need for each person.'],
      ['M02', 'List the EDD triggers present in this file and write the three highest-priority KYC questions you would send the relationship manager.'],
    ],
    deliverables: ['A one-page lifecycle map with owners per stage', 'A UBO register for Harwell with evidence checklist', 'An EDD memo (max ½ page) listing triggers and open questions'],
  },
  {
    n: 2, title: 'Spread Meridian', covers: ['M03', 'M04', 'M05'],
    tagline: 'Three-statement spreading, cash flow and ratio diagnosis',
    scenario: [
      MERIDIAN_INTRO,
      'Meridian has asked to increase its RCF from £1.5m to £2.5m "to support growth". The FY2025 accounts have just arrived. Your job is to find the story the numbers tell before anyone discusses structure.',
    ],
    data: [['Profit & loss', MERIDIAN_PL], ['Balance sheet', MERIDIAN_BS]],
    tasks: [
      ['M03', 'Spread the three years. Normalise anything you judge one-off and note every reconciling item between profit and net assets movement.'],
      ['M04', 'Build the working-capital bridge: compute stock days, debtor days and creditor days for each year, and quantify how much cash the FY2025 working-capital build absorbed.'],
      ['M04', 'Derive a simple FCF line (EBITDA − Δworking capital − capex proxy via fixed-asset movement + depreciation − interest) and explain where the RCF drawings went.'],
      ['M05', 'Produce the ratio pack: gross margin, EBITDA margin, leverage (debt/EBITDA), interest cover, current ratio. Flag the two ratios that deteriorated most and say why they matter for the RCF ask.'],
    ],
    deliverables: ['A spread with normalisation notes', 'Working-capital bridge with days calculations', 'A ratio table with a five-line written diagnosis: is this growth or distress?'],
  },
  {
    n: 3, title: 'Judge the Business', covers: ['M06', 'M07', 'M08'],
    tagline: 'Industry, business and management risk memo',
    scenario: [
      MERIDIAN_INTRO,
      'The numbers from Checkpoint 2 showed margin compression and a working-capital build. Now assess whether the *business* can carry more debt: sector, customers, and the people running it.',
      'Facts gathered: top customer = 34% of revenue (a tier-1 infrastructure contractor); next four = 31% combined; steel input prices up 18% over two years with only partial pass-through; the FD of 11 years resigned in March and the role is held by the financial controller on an interim basis; the MD founded the company and owns 100%; no non-executive oversight.',
    ],
    data: [['Customer concentration', mdTable(['Customer', 'Share of revenue', 'Contract type', 'Notes'], [
      ['InfraBuild plc', '34%', 'Framework, re-tendered 2027', 'Payment terms moved 45→60 days in 2025'],
      ['Next four customers', '31%', 'Mixed PO / framework', 'One in CVA rumours'],
      ['Remaining (~40 accts)', '35%', 'Spot orders', 'Granular'],
    ])]],
    tasks: [
      ['M06', 'Write the industry view: where is UK structural-steel fabrication in the cycle, what are the two forces from Porter\'s five that bite hardest here, and which risks are systematic vs idiosyncratic to Meridian?'],
      ['M07', 'Score the business risk: concentration, contract quality (framework vs spot), input-cost pass-through, and supply-chain exposure. Quantify the revenue at risk if InfraBuild re-tenders away in 2027.'],
      ['M08', 'Assess management: what does the FD gap plus founder-owner-MD with no NED oversight mean for control risk? List the three governance conditions you would attach to any increased facility.'],
    ],
    deliverables: ['A business-risk memo (max 2 pages) covering all three lenses', 'A customer-concentration sensitivity: revenue and EBITDA impact of losing the top account', 'Three governance conditions, each with a rationale'],
  },
  {
    n: 4, title: 'Write the Credit Paper', covers: ['M09', 'M10', 'M11', 'M12', 'M13'],
    tagline: 'Full credit memo: structure, security, covenants, rating',
    scenario: [
      MERIDIAN_INTRO,
      'Committee wants the full paper on the £2.5m RCF request. You have the spread (Checkpoint 2) and the business-risk view (Checkpoint 3). Now decide what you would actually lend, on what structure, against what security, with what covenants — and how you would grade it.',
      'Available security: first legal charge over the freehold works (indexed value £3.4m, last valued 2022); debenture (fixed and floating) over the company; directors\' personal guarantee offered at £250k.',
    ],
    data: [['Facility request vs. existing', mdTable(['Facility', 'Existing', 'Requested', 'Pricing'], [
      ['RCF', '£1.5m', '£2.5m', 'base + 3.1%'],
      ['Term loan (2019, matures 2028)', '£4.3m o/s', 'unchanged', 'base + 2.6%'],
    ])]],
    tasks: [
      ['M09', 'Draft the credit memo: executive summary, purpose, repayment sources (primary/secondary/tertiary), key risks and mitigants. Recommend approve / approve-with-conditions / decline.'],
      ['M10', 'Structure the facility: is a bigger RCF right, or should part be a term loan against the working-capital build? Set tenor, margin, and an availability/borrowing-base mechanism if you use one.'],
      ['M11', 'Value the security realistically: apply haircuts to the freehold (stale valuation) and floating charge, compute the LTV and security cover ratio for total exposure, and state what the PG at £250k is actually worth.'],
      ['M12', 'Set the covenant package: pick 3 financial covenants with levels and headroom justified from the Checkpoint-2 numbers, define testing frequency, and specify cure rights.'],
      ['M13', 'Assign an internal rating: walk a scorecard logic (financials, business risk, management) to a grade and map it to an indicative PD band. State what would move it one notch either way.'],
    ],
    deliverables: ['A committee-ready credit paper (3–4 pages)', 'A security schedule with haircuts and cover calculation', 'A covenant term sheet with levels, definitions and headroom maths'],
  },
  {
    n: 5, title: 'Capital & ECL for Meridian', covers: ['M14', 'M15', 'M16'],
    tagline: 'RWA under SA vs IRB, Basel III ratios, IFRS 9 staging and ECL',
    scenario: [
      'Finance wants to know what the approved Meridian exposure costs the bank in capital and provisions.',
      'Work with: total exposure £6.8m (£4.3m term + £2.5m RCF, assume 40% RCF drawn), your Checkpoint-4 grade mapped to PD 2.4% (TTC), downturn LGD 38%, CCF for the undrawn RCF 40%.',
    ],
    data: [['Macro scenarios for ECL', mdTable(['Scenario', 'Weight', '12m PD (PiT)', 'Lifetime PD'], [
      ['Base', '55%', '2.1%', '7.8%'],
      ['Upside', '15%', '1.3%', '5.0%'],
      ['Downside', '30%', '4.6%', '15.4%'],
    ])]],
    tasks: [
      ['M14', 'Compute EAD including the CCF on the undrawn RCF, then RWA under the standardised approach (unrated corporate) and capital at 8%.'],
      ['M14', 'Compute IRB RWA using the corporate formula with PD 2.4%, LGD 38% (use the regulatory correlation formula; show each term). Compare with SA and explain the difference.'],
      ['M15', 'Layer Basel III: apply a CET1 minimum + capital conservation buffer + 1% countercyclical buffer to the IRB RWA. What CET1 does Meridian consume? Then check the exposure against a 3% leverage-ratio requirement — which constraint binds?'],
      ['M16', 'Stage the exposure under IFRS 9 (fresh facility, but recall the Checkpoint-2 deterioration — argue Stage 1 vs 2). Compute probability-weighted 12-month ECL and lifetime ECL from the scenario table and state which one hits the P&L.'],
    ],
    deliverables: ['A capital note showing SA vs IRB side by side with workings', 'The buffer stack and binding-constraint conclusion', 'An ECL calculation with staging rationale (max 1 page)'],
  },
  {
    n: 6, title: 'Build the Scorecard', covers: ['M17', 'M18', 'M19', 'M20', 'M21'],
    tagline: 'PD, LGD, EAD, CCF and a scorecard from a 60-loan portfolio',
    scenario: [
      'The SME credit team wants a simple application scorecard and parameter estimates built from the attached 60-loan portfolio ([portfolio_loans.csv](projects/data/portfolio_loans.csv)). Every task below runs off that file — Excel or SQL both work.',
    ],
    data: [['Portfolio summary', mdTable(['Field', 'Meaning'], [
      ['Grade', 'Internal grade at origination (BB+ … B-)'],
      ['DSCR / LeverageX / YearsTrading / PriorArrears', 'Candidate scorecard drivers'],
      ['DefaultFlag', '1 = defaulted within observation window'],
      ['ObservedLGD', 'Loss rate on defaulted loans only'],
    ])]],
    tasks: [
      ['M17', 'Estimate PD per grade: default rate by Grade, then discuss TTC vs PiT — is one year of data enough, and what would a central-tendency adjustment do?'],
      ['M18', 'Estimate LGD: average ObservedLGD, then segment it by anything predictive you can find. Propose a downturn add-on and justify it.'],
      ['M19', 'Estimate EAD behaviour: compare Drawn/Limit for defaulted vs non-defaulted loans. What does that imply for undrawn-line risk?'],
      ['M20', 'Derive a CCF: for defaulted loans, assume EAD = Limit × 0.9; back out the implied CCF on the undrawn portion and compare with the 40% regulatory assumption used in Checkpoint 5.'],
      ['M21', 'Build the scorecard: band DSCR, LeverageX, YearsTrading and PriorArrears; compute default rate per band; assign points (WoE-style, approximation fine); score every loan; report the separation (default rate in top vs bottom score tercile).'],
    ],
    deliverables: ['A parameter sheet: PD by grade, LGD (with downturn), EAD/CCF findings', 'The scorecard: bands, points, and score distribution', 'A 10-line model note: what this scorecard can and cannot be used for'],
  },
  {
    n: 7, title: 'Regress the Portfolio', covers: ['M22', 'M23', 'M24'],
    tagline: 'Statistical foundations and a logistic PD model on the same 60 loans',
    scenario: [
      'Model risk asked you to redo Checkpoint 6 "properly": a logistic regression PD model on [portfolio_loans.csv](projects/data/portfolio_loans.csv), with the statistics understood rather than assumed. Python (pandas + sklearn/statsmodels) or Excel\'s Solver both work.',
    ],
    data: [],
    tasks: [
      ['M22', 'Foundations first: compute the portfolio default rate and its 95% confidence interval (binomial). Then compute WoE and IV for PriorArrears and for banded DSCR — which carries more information?'],
      ['M23', 'Fit logit(default) ~ DSCR + LeverageX + PriorArrears + YearsTrading. Report coefficients as odds ratios, check the signs against credit intuition, and compute AUC/Gini. Calibrate: mean predicted PD vs observed default rate.'],
      ['M23', 'Convert the model to scorecard points (pick a PDO scaling) and compare rank-ordering with your Checkpoint-6 heuristic scorecard.'],
      ['M24', 'Challenger view: fit any tree-based model on the same features, compare AUC, then write the governance paragraph — with 60 rows, what does SR 11-7 / the EU AI Act mindset say about deploying either model?'],
    ],
    deliverables: ['WoE/IV table with interpretation', 'Model output: odds ratios, AUC, calibration check', 'A one-page "challenger vs champion" recommendation with governance caveats'],
  },
  {
    n: 8, title: 'Validate the Model', covers: ['M25', 'M26', 'M27', 'M28', 'M29'],
    tagline: 'Independent validation of the Checkpoint-7 model, end to end',
    scenario: [
      'Swap chairs: you are now the independent validator receiving the Checkpoint-7 model. Produce the validation report a second line would actually write.',
    ],
    data: [],
    tasks: [
      ['M25', 'Audit the development file: list what documentation Checkpoint 7 should have produced (reference dataset definition, exclusions, transformations, assumptions log) and note every gap.'],
      ['M26', 'Run the three-pillar challenge: discriminatory power (recompute AUC/Gini yourself), calibration (predicted vs observed by score band), stability (split the 60 loans oldest/newest half by YearsTrading as a proxy and compare score distributions — a rough PSI).'],
      ['M27', 'Backtest the grade-level PDs from Checkpoint 6 with a Basel traffic-light approach: with n this small, compute a Jeffreys interval per grade and state which grades are meaningfully testable at all.'],
      ['M28', 'Benchmark: compare grade default rates against any external reference (e.g. published speculative-grade DR tables) and against the logistic model as challenger. Where do they disagree and why?'],
      ['M29', 'Sensitivity: shock LGD ±10pts and PD ±30% relative in the Checkpoint-5 IRB formula; tabulate RWA impact; identify which parameter the capital number is most sensitive to.'],
    ],
    deliverables: ['A validation report with a findings table (severity-rated)', 'Backtest + benchmark evidence', 'A sensitivity grid and one-paragraph model-risk rating recommendation'],
  },
  {
    n: 9, title: 'Stress the Book', covers: ['M30', 'M31', 'M32'],
    tagline: 'Portfolio stress test, concentration analysis and stressed capital',
    scenario: [
      'Treat the 60-loan file as your whole SME book. The ACS-style scenario lands: GDP −4%, commercial property −28%, base rate +300bp for two years.',
    ],
    data: [['Stress translation assumptions', mdTable(['Driver', 'Base', 'Stress', 'Applies to'], [
      ['PD multiplier', '1.0×', '2.2×', 'All grades'],
      ['Extra PD add-on', '—', '+3pts', 'Construction & Retail segments'],
      ['LGD', 'observed', '+12pts', 'All (collateral value fall)'],
      ['Drawn on RCF-like limits', 'as-is', '95% of limit', 'All (drawdown in stress)'],
    ])]],
    tasks: [
      ['M30', 'Apply the scenario to the portfolio: stressed PD per grade/segment, stressed LGD, stressed EAD. Compute expected loss base vs stress and the ΔEL.'],
      ['M31', 'Concentration: compute segment shares and an HHI; identify the largest single-name share of the book; apply a Vasicek-style intuition — which segment drives tail risk and why?'],
      ['M32', 'Capital under stress: recompute IRB RWA (Checkpoint-5 formula) for the stressed parameters on the top-two segments; estimate the CET1 impact and state whether management actions (limit cuts, distribution pause) would be triggered.'],
    ],
    deliverables: ['A stress-test pack: base vs stress EL, by segment', 'A concentration one-pager with HHI and top exposures', 'A stressed-capital estimate with recommended management actions'],
  },
  {
    n: 10, title: 'Face the Committee', covers: ['M33', 'M34', 'M35'],
    tagline: 'Governance pack, audit response, regulator readiness',
    scenario: [
      'Three things land in the same week: (1) the Meridian increase goes to Credit Committee; (2) Internal Audit issues a draft finding that scorecard overrides are not being tracked; (3) the PRA schedules a SS1/23-style review of the SME rating model.',
    ],
    data: [],
    tasks: [
      ['M33', 'Write the committee cover note for Meridian: what the committee is being asked to approve, under whose delegated authority, what conditions apply, and what goes back to committee on breach. Map which committee (Credit vs GCRC vs MRC) owns each of this week\'s three items.'],
      ['M34', 'Draft the management response to the audit finding: root cause, remediation with dates, and the control that prevents recurrence. Rate the finding\'s severity yourself and justify it.'],
      ['M35', 'Prepare the regulator pack list for the model review: the ten documents you would have ready, mapped to what Checkpoints 6–8 actually produced — and the two gaps you would remediate before the visit.'],
    ],
    deliverables: ['Committee cover note (1 page)', 'Audit response with remediation plan', 'Regulator-readiness checklist with gap actions'],
  },
  {
    n: 11, title: 'Run the Desk', covers: ['M36', 'M37', 'M38', 'M39'],
    tagline: 'A week on the desk: RM screen → analyst pack → decision → portfolio review',
    scenario: [
      'A new enquiry arrives: **Caldera Foods Ltd**, £1.2m term loan to fit out a second production site. Turnover £9.6m, EBITDA £1.1m, existing HP debt £600k, promised security a second charge on the new site.',
      'Meanwhile, the quarterly portfolio review is due and Meridian sits on it with a covenant test approaching.',
    ],
    data: [],
    tasks: [
      ['M36', 'Play the RM: run the initial screen on Caldera — five knockout questions, indicative appetite (yes/no/shape), and what you would promise the customer about timeline. Then log what the first line owes the second line on Meridian\'s upcoming covenant test.'],
      ['M37', 'Play the analyst: list the exact information you would request from Caldera, sketch the pack structure, and pre-compute what leverage and DSCR the request implies from the numbers given — is £1.2m even plausible?'],
      ['M38', 'Play the credit manager: apply the five Cs, decide (approve / conditions / counter-propose / decline), and if countering, state the structure you would offer instead and your sanctioning authority logic.'],
      ['M39', 'Play the portfolio reviewer: define the watch-list criteria for the SME book, decide whether Meridian goes on it based on everything since Checkpoint 2, and draft the vintage/EWI slide you would show monthly.'],
    ],
    deliverables: ['RM screen note + analyst information request', 'A decision memo on Caldera with the counter-proposal if any', 'A portfolio-review slide: watch-list criteria and Meridian\'s status'],
  },
  {
    n: 12, title: 'Paper the Deal', covers: ['M40', 'M41', 'M42'],
    tagline: 'From approval to a booked, documented facility',
    scenario: [
      'Meridian\'s increase was approved with conditions (Checkpoint 4 structure). Legal drafting, the offer letter and operational booking are yours to steer.',
    ],
    data: [],
    tasks: [
      ['M40', 'Mark up the key clauses: for an LMA-style facility agreement, specify what you need in representations, financial covenants (import your Checkpoint-4 package), events of default, and the MAC clause — and name one clause borrower counsel will push back on with your fallback.'],
      ['M41', 'Draft the facility offer letter skeleton: parties, facilities and pricing, conditions precedent (list all — include the fresh property valuation and interim-FD resolution from earlier checkpoints), undertakings, and drawdown mechanics.'],
      ['M42', 'Write the booking instruction: system records to be created, EIR components (arrangement fee treatment), covenant flags and test dates to configure, IFRS 9 stage at booking, and the ops handover checklist.'],
    ],
    deliverables: ['Clause mark-up sheet with negotiation fallbacks', 'Offer-letter skeleton with complete CP list', 'Booking instruction ready for operations'],
  },
  {
    n: 13, title: 'Meridian Goes Wrong', covers: ['M43', 'M44', 'M45', 'M46', 'M47'],
    tagline: 'Capstone: monitoring catches a breach; restructure or recover',
    scenario: [
      'Eighteen months on. InfraBuild lost the 2027 re-tender. Meridian\'s trailing-twelve-month numbers: revenue £17.1m, EBITDA £900k, RCF drawn £2.4m of £2.5m, term loan £3.9m outstanding. The leverage covenant (set in Checkpoint 4) tests next month. The freehold revalues at £2.9m.',
    ],
    data: [['Position summary', mdTable(['Item', 'Value'], [
      ['Total bank debt', '£6.3m'],
      ['TTM EBITDA', '£0.9m'],
      ['Leverage', '7.0×'],
      ['Freehold value (new)', '£2.9m'],
      ['Debenture recovery est.', '£1.1m'],
      ['PG', '£250k'],
    ])]],
    tasks: [
      ['M43', 'Monitoring: list the EWIs that should have fired over the past year (behavioural, financial, external) and when. What does the annual-review file say about staging now?'],
      ['M44', 'Covenant: compute the breach against your Checkpoint-4 level, decide waive / reserve rights / demand, and price the waiver if you grant one. State the IFRS 9 forbearance consequence of each choice.'],
      ['M45', 'Classify: watch list or workout? Assign an OLEM-style grade and move the IFRS 9 stage with lifetime ECL implications quantified roughly from Checkpoint 5\'s downside scenario.'],
      ['M46', 'Restructure option: sketch the IBR scope, then model a restructure (extend term loan to 9 years, RCF frozen and amortising £300k/yr, PIK margin +1%) — does projected FCF at EBITDA £1.1m (recovery case) service it?'],
      ['M47', 'Recovery option: build the waterfall from the security values given (haircut the freehold 20% for forced sale). Estimate bank recovery and LGD, compare with the restructure NPV, and recommend a path with conditions.'],
    ],
    deliverables: ['EWI post-mortem timeline', 'Covenant decision memo with forbearance treatment', 'Restructure vs recovery comparison with a clear recommendation'],
  },
];

// ── Data Validation checkpoints: thematic group pairs ────────────────────────
const LAB = 'data-validation-lab/schemas';
const DV = [
  {
    n: 1, title: 'The Missing & The Duplicated', groups: ['G01', 'G02'],
    warmups: ['M01-E1', 'M01-E2', 'M02-E1', 'M02-E2'],
    tagline: 'Full completeness and uniqueness audit of Customers & Transactions',
    scenario: [
      'The nightly e-statement batch failed again and finance suspects double-counted transactions. You own the audit: every completeness gap and every duplicate in [Customers](' + LAB + '/01_Customers.csv) and [Transactions](' + LAB + '/05_Transactions.csv), with evidence.',
    ],
    tasks: [
      'Load the two CSVs into SSMS (schema card: [SCHEMA_REFERENCE](' + LAB + '/SCHEMA_REFERENCE.md)).',
      'Completeness sweep (G01): one query per issue class — NULLs in mandatory fields, empty/whitespace-only strings, placeholder values ("N/A"), and conditional completeness (IsActive=1 must have Email). Produce a per-column NULL/blank rate summary.',
      'Uniqueness sweep (G02): exact duplicate rows, duplicate business keys (ReferenceNo in Transactions), and near-duplicates in Customers via SOUNDEX/DIFFERENCE. Deduplicate with ROW_NUMBER keeping the best record — justify "best".',
      'Cross-check: which rows fail BOTH a completeness and a uniqueness rule? Those are your highest-priority fixes.',
      'Write the findings table: rule, rows failing, severity, proposed fix.',
    ],
    deliverables: ['One .sql file, sectioned per rule, runnable top-to-bottom', 'A findings table (rule × count × severity × fix)', 'The dedup query with the keep-logic explained in comments'],
  },
  {
    n: 2, title: 'Broken Links', groups: ['G03', 'G13'],
    warmups: ['M03-E1', 'M03-E2'],
    tagline: 'Referential and hierarchy integrity across Orders and Employees',
    scenario: [
      'A dashboard shows orders for customers who do not exist and a manager chain that loops. Audit every relationship: [Orders](' + LAB + '/02_Orders.csv) → Customers/Products, and the Employees self-reference ([Employees](' + LAB + '/04_Employees.csv)).',
    ],
    tasks: [
      'Find every orphan: Orders with no matching Customer or Product — write it twice, LEFT JOIN…IS NULL and NOT EXISTS, and confirm identical results.',
      'Find managers that do not exist (Employees.ManagerID → EmployeeID) and employees who manage themselves.',
      'Walk the hierarchy with a recursive CTE: output each employee\'s depth and full path; detect any cycle and cap with MAXRECURSION safely.',
      'Validate the tree shape (G13): exactly how many roots exist? Should there be one? Flag orphaned subtrees and compute max depth.',
      'Propose the constraint set that would have prevented each finding (FK, CHECK, trigger) and note which are enforceable given the dirty rows.',
    ],
    deliverables: ['Orphan report for all three relationships', 'Hierarchy query with depth, path and cycle detection', 'A constraint proposal mapped to findings'],
  },
  {
    n: 3, title: 'The Shape of Data', groups: ['G04'],
    warmups: ['M04-E1'],
    tagline: 'Format & pattern validation — the biggest single group, 32 techniques',
    scenario: [
      'Marketing wants to email every customer; ops wants to call them. Nobody trusts the contact fields. Validate every format in [Customers](' + LAB + '/01_Customers.csv): emails, phones, postcodes, dates, and the IDs.',
    ],
    tasks: [
      'Email validation in three escalating passes: LIKE \'%_@_%.__%\', then structural checks (single @, no spaces, no consecutive dots), then a CASE-based verdict column (Valid / Fixable / Dead).',
      'Phone: strip formatting with REPLACE chains, classify by country prefix, and flag numbers whose length is wrong for their Country.',
      'Postcode vs Country: UK rows must match UK postcode shape (LIKE with ranges), Indian rows 6 digits, UAE "00000" is a known placeholder — flag it.',
      'Dates: find any DOB/CreatedDate that fails ISDATE or violates ISO order, and any CreatedDate before company founding (2021).',
      'Sweep the remaining shapes on all tables: fixed-length IDs, alpha-only names (allowing hyphen/apostrophe), no control characters (CHAR(9,10,13)), no HTML (\'%<%\'), no SQL-injection tell-tales (\'%;%\',\'%--%\').',
    ],
    deliverables: ['A validation .sql producing one verdict row per customer with per-field pass/fail flags', 'Counts by failure type', 'A regex/pattern cheat-sheet you wrote for reuse'],
  },
  {
    n: 4, title: 'Out of Bounds', groups: ['G05', 'G12'],
    warmups: ['M05-E1', 'M05-E2', 'M10-E1'],
    tagline: 'Range, boundary and statistical outliers on Orders & Transactions',
    scenario: [
      'Finance found a £99,999,999.99 transaction and a −£1,000 sales target. Bound every numeric and date field in [Orders](' + LAB + '/02_Orders.csv), [Transactions](' + LAB + '/05_Transactions.csv) and [SalesTargets](' + LAB + '/06_SalesTargets.csv), then separate typos from genuine extremes statistically.',
    ],
    tasks: [
      'Hard bounds (G05): negatives where impossible (Quantity, UnitPrice, Amounts), zeros where suspicious, future dates, ShipDate before OrderDate, DOB implying minors or >100 years old.',
      'Consistency of magnitude: order lines where TotalAmount differs from Quantity×UnitPrice by more than 1p (tolerance check with ABS and DECIMAL casting).',
      'Z-score outliers (G12): flag Transactions beyond ±3σ of the mean Amount; report each with its z.',
      'IQR outliers: compute Q1/Q3 with PERCENTILE_CONT, flag beyond 1.5×IQR, and compare the two methods\' catch — which found the £99m row, and which found subtler ones?',
      'Benford check (bonus): first-digit distribution of Amount vs expectation — worth a comment, not a verdict, at n=20.',
    ],
    deliverables: ['A bounds report by table/column', 'The two outlier lists with method comparison (≤1 page)', 'A recommendation: which rows to correct, which to investigate, which to accept'],
  },
  {
    n: 5, title: 'Does It Add Up?', groups: ['G06', 'G07'],
    warmups: ['M06-E1', 'M06-E2', 'M07-E1'],
    tagline: 'Cross-field consistency and business-rule enforcement',
    scenario: [
      'Rows can be individually clean and still nonsense together: a delivered order with no ship date, a product selling below cost, a salary that insults the org chart. Encode the business rules for [Orders](' + LAB + '/02_Orders.csv), [Products](' + LAB + '/03_Products.csv) and [Employees](' + LAB + '/04_Employees.csv) and hunt violations.',
    ],
    tasks: [
      'Status–date consistency: every Status value must imply the right date fields (Delivered ⇒ ShipDate present and ≥ OrderDate).',
      'Derived-field consistency: recompute every derivable value (order totals, any margin) and diff against stored.',
      'Product economics rule: SellingPrice ≥ UnitCost×1.05 minimum margin — list violators with implied margin.',
      'Employee rules: salary within grade-plausible bounds (define bands yourself from the data), no negative salary, hire date after 16th birthday, manager\'s tenure ≥ report\'s tenure? (test it — is that rule even true here?).',
      'Domain checks (G07): Status, Country, Category values against reference lists built with a CTE; report unknown codes.',
    ],
    deliverables: ['A rules catalogue: rule id, plain-English statement, SQL, violations found', 'The violations report', 'Three rules you\'d propose adding as database constraints vs three that must stay application-level — with reasons'],
  },
  {
    n: 6, title: 'Source vs Target', groups: ['G08', 'G18'],
    warmups: ['M08-E1'],
    tagline: 'Reconciliation and cross-system comparison',
    scenario: [
      'Pretend the warehouse migrated: create a copy of Orders, then sabotage it — drop 2 rows, duplicate 1, change 3 amounts, NULL a date. Now prove your reconciliation catches every change without knowing what was sabotaged.',
    ],
    tasks: [
      'Build source and target tables; script the sabotage with UPDATE/DELETE/INSERT so it is repeatable.',
      'Tier-1 recon: COUNT, SUM, MIN/MAX, AVG per table — which sabotages does this tier catch and which slip through?',
      'Tier-2 recon: EXCEPT both directions — classify each diff as missing / extra / changed.',
      'Tier-3 recon: row-hash comparison (HASHBYTES or CHECKSUM over concatenated columns) joined on the key — produce a column-level diff for changed rows.',
      'Write the generic recon procedure: parameterised by table name, outputting a summary row (source count, target count, missing, extra, changed) — the reusable artefact of this checkpoint.',
    ],
    deliverables: ['The sabotage script (repeatable)', 'Three-tier reconciliation .sql with a caught/missed matrix per tier', 'A reusable recon procedure with a demo run'],
  },
  {
    n: 7, title: 'Time & History', groups: ['G09', 'G14'],
    warmups: ['M09-E1'],
    tagline: 'Timeliness, sequence gaps and slowly-changing dimensions',
    scenario: [
      'Sales targets have gaps and overlaps; transaction dates arrive out of order; and the business now wants customer history preserved, not overwritten. Fix time itself: [SalesTargets](' + LAB + '/06_SalesTargets.csv), [Transactions](' + LAB + '/05_Transactions.csv), then build an SCD2 customer dimension.',
    ],
    tasks: [
      'Gap detection: for each employee\'s target periods, find missing months using LAG (and a calendar CTE for the strict version).',
      'Overlap detection: target periods that overlap for the same employee — LAG on start/end.',
      'Sequence sanity on Transactions: NULL dates, future dates, and out-of-order TransactionID vs date pairs.',
      'Design a customer SCD2 dimension: surrogate key, ValidFrom/ValidTo, IsCurrent. Load today\'s Customers as the initial state, then apply two invented changes (address move, email fix) with correct expiry.',
      'Validate your own SCD2 (G14): no date-range overlaps, no gaps, exactly one IsCurrent per business key — as queries that return zero rows when healthy.',
    ],
    deliverables: ['Gap & overlap report for SalesTargets', 'SCD2 DDL + load script + the two applied changes', 'The three SCD2 health checks, each returning zero rows'],
  },
  {
    n: 8, title: 'Know Your Data', groups: ['G10', 'G11'],
    warmups: [],
    tagline: 'Type integrity and a full profiling pack across all six tables',
    scenario: [
      'Before the next migration, the team wants a data dictionary that tells the truth: what is actually *in* every column of all six lab tables, and where the declared type and the real content disagree.',
    ],
    tasks: [
      'Type mismatch hunt (G10): numbers stored as text (TRY_CAST fails vs succeeds), dates stored as text, boolean-ish columns with mixed encodings (0/1/Y/N), and values that would truncate on a tighter type.',
      'Profile every column (G11): distinct count, NULL rate, min/max, top-5 values with frequencies — via a metadata-driven query over INFORMATION_SCHEMA, not 60 hand-written SELECTs.',
      'Length profiling on text columns: min/max/avg LEN; flag columns where max length is near the declared limit.',
      'Uniqueness ratios: distinct/total per column — which columns are secretly keys, and which "key" columns aren\'t?',
      'Assemble the data dictionary: one row per column with type, observed type verdict, null rate, cardinality class, and a keep/fix/investigate flag.',
    ],
    deliverables: ['The metadata-driven profiling script', 'The generated data dictionary (query output)', 'Top-10 type-risk findings for the migration team'],
  },
  {
    n: 9, title: 'The Cleansing Pipeline', groups: ['G15', 'G19'],
    warmups: [],
    tagline: 'An audited ETL-style clean of Customers, end to end',
    scenario: [
      'Everything found so far now gets FIXED — properly: staged, transformed, validated, logged, and never destructive to the source. Build the pipeline that turns dirty [Customers](' + LAB + '/01_Customers.csv) into a clean, certified table.',
    ],
    tasks: [
      'Stage: land raw Customers into a staging table with a LoadID and load timestamp; log the pre-load row count (G15).',
      'Cleanse (G19): trim whitespace; standardise case (names proper-case, emails lower); empty strings → NULL; fix the "N/A" placeholder row; standardise phone formats; parse any combined name fields.',
      'Resolve duplicates from Checkpoint 1: merge the exact duplicate and the fuzzy pair with explicit survivorship rules, keeping losers in a quarantine table.',
      'Validate post-load: re-run your Checkpoint-1 and Checkpoint-3 checks against the clean table — the pass rate is your quality score; log rejected rows with reasons.',
      'Prove the process (G15): pre vs post row-count reconciliation (raw = clean + quarantined + rejected), and a rerun-safety argument — what happens if the pipeline runs twice?',
    ],
    deliverables: ['The full pipeline .sql: stage → cleanse → dedupe → validate → certify', 'The rejection/quarantine log with reasons', 'Before/after quality scorecard (checks passed) and the row-count reconciliation'],
  },
  {
    n: 10, title: 'Location & Privacy', groups: ['G16', 'G17'],
    warmups: [],
    tagline: 'Geospatial sanity and a PII/compliance sweep to close the lab',
    scenario: [
      'Legal asks two questions the day before launch: "Is location data sane?" and "Where exactly does PII live, and who could see it?" Answer both across all six tables.',
    ],
    tasks: [
      'Geo sanity (G16): Country vs PostalCode coherence (reusing Checkpoint-3 patterns as a scored rule), the UAE "00000" placeholder problem, and — assuming a lat/long column existed — write the range checks (±90/±180) and precision checks you would apply.',
      'PII inventory (G17): scan column names and content for PII (names, emails, phones, DOB); classify each as direct / quasi / non-identifier; note where DOB enables age discrimination risk.',
      'Exposure test: write the masking view: full table for privileged users, masked (email → a***@domain, phone last-4, DOB → year only) for everyone else.',
      'Retention: customers inactive since 2021 with no orders — which rows would a GDPR retention policy delete, and what FK order must the deletion run in (Checkpoint-2 knowledge)?',
      'Compliance close-out: one page — the five highest data-protection risks in this lab dataset and the control for each.',
    ],
    deliverables: ['Geo findings + the lat/long check pack (ready for real coordinates)', 'PII inventory with classification', 'Masking view DDL + retention deletion plan in FK-safe order'],
  },
];

// ── Data Engineering checkpoints: one per chapter (Phase 1: DE01 only) ───────
// Not every chapter needs a pair — matches the DV precedent (Checkpoint 3
// covers G04 alone). DE02-DE06 checkpoints (P-DE-02..06) are NOT authorized
// yet; adding them later is additive to this array, no structural change.
const DE = [
  {
    n: 1, title: 'Reconcile a Transaction-Banking Batch', chapters: ['DE01'],
    tagline: 'One scenario, all six Chapter 1 skills: typed Python, sargable SQL, star-schema design, resilient ingestion, PR workflow, stakeholder check-ins',
    scenario: [
      'A transaction-banking platform runs a nightly reconciliation between two sources: a REST API from a third-party FX-rate provider, and an internal SQL Server transactions table. The batch has been unreliable — silent failures, slow queries, and at least one incident where a fix was overwritten because two engineers edited the same file without a review process. You are asked to rebuild the reconciliation as a small, defensible pipeline that would survive a code review from a senior engineer.',
    ],
    tasks: [
      '[DE01-T01] Write a typed Python module that parses the daily transactions CSV export into typed records, collecting every parse failure (with row number and reason) rather than stopping at the first one or swallowing errors silently.',
      '[DE01-T02] Write the SQL Server reconciliation query joining Transactions against the FX-rate lookup for a given date range, using a sargable date predicate (not a function wrapped around the indexed column) — and show, with SET STATISTICS IO, that it seeks rather than scans.',
      '[DE01-T03] Design a small star schema (one fact table, two dimension tables) for a monthly reconciliation-exceptions report, and justify one deliberate denormalization choice you made.',
      '[DE01-T04] Write a resilient fetch function for the FX-rate REST API: paginated, rate-limited, retries a transient 503/429 with backoff, and persists enough state to resume from the last successful page rather than restarting from page 1.',
      '[DE01-T05] Write the PR description you would submit for this work: what changed, why, and — specifically — what a reviewer should look for that would have caught the original overwritten-fix incident if this workflow had existed then.',
      '[DE01-T06] Name the three stakeholders (beyond your own team) you would check in with before this pipeline goes to production, and the one question you would ask each — grounded in a specific risk each check-in is meant to catch, not a generic list.',
    ],
    deliverables: [
      'A typed Python parsing module with explicit, collected error handling',
      'A sargable reconciliation query with SET STATISTICS IO evidence of the plan change',
      'A star-schema DDL sketch with a stated denormalization rationale',
      'A resilient, resumable REST ingestion function',
      'A PR description demonstrating the review workflow from DE01-T05',
      'A stakeholder check-in list with one grounded question per stakeholder',
    ],
  },
  {
    n: 2, title: 'Diagnose and Tune a Skewed Transaction Job', chapters: ['DE02'],
    tagline: 'One scenario, all six Chapter 2 skills: lazy evaluation, schema enforcement, skew, join strategy, streaming, caching',
    scenario: [
      'A transaction-banking analytics job aggregates monthly volume per customer, enriches it with branch reference data, and feeds a near-real-time fraud-monitoring stream. It runs fine most nights but occasionally takes 6x longer with no code change and no data-volume growth on average -- and a data scientist reports that re-running three summaries from the same cleansed DataFrame in a notebook takes three times as long as it should. You are asked to diagnose and fix the pipeline using the Spark UI and the physical plan as evidence, not guesswork.',
    ],
    tasks: [
      '[DE02-T01] Explain, using `.explain(mode="formatted")` output, exactly which lines in a multi-step transformation chain actually execute when an action finally runs -- and where in the Spark UI you would look to find which stage is genuinely slow, rather than timing individual transformation calls.',
      '[DE02-T02] Rewrite a schema-inferred CSV ingestion (`inferSchema=True`) as an explicit `StructType` schema with `mode="FAILFAST"`, and explain why the original version could produce a silent zero-row join result with no error anywhere in the pipeline.',
      '[DE02-T03] Given a Spark UI screenshot description showing 199 fast tasks and 1 four-hour task in a groupBy aggregation stage, diagnose the skew, then apply both salting and confirm AQE\'s skew-join handling is enabled -- explaining which mitigation actually applies to a plain aggregation versus a join.',
      '[DE02-T04] Given a join against a small (40,000-row) reference table that is unexpectedly slow, identify from the physical plan whether Spark chose a sort-merge or broadcast join, force the correct strategy, and confirm with `.explain()` that the plan actually changed.',
      '[DE02-T05] Design a watermarked, windowed Structured Streaming aggregation for the fraud-monitoring use case that correctly bounds state for late-arriving events, and explain what "near-real-time" concretely means for this design\'s trigger interval.',
      '[DE02-T06] Fix the notebook\'s repeated-recomputation problem with `.cache()`, explain why caching had no effect until the first forcing action ran, and justify a specific `StorageLevel` choice given a stated memory constraint.',
    ],
    deliverables: [
      'A physical-plan-based diagnosis of a slow multi-step transformation chain',
      'An explicit-schema ingestion rewrite with a stated fail-loudly rationale',
      'A skew diagnosis with both a salting fix and confirmed AQE configuration',
      'A join-strategy diagnosis and fix with before/after `.explain()` evidence',
      'A watermarked streaming aggregation design with a stated late-data tolerance',
      'A caching fix with a justified StorageLevel choice',
    ],
  },
];

// ── Renderers ────────────────────────────────────────────────────────────────
function renderCredit(p) {
  const covers = p.covers;
  return `# Checkpoint ${p.n}: ${p.title}

*${p.tagline}*

**Consolidates:** ${lessonLinks(covers)}

---

## Scenario

${p.scenario.join('\n\n')}

${p.data.length ? '## Data\n\n' + p.data.map(([t, tbl]) => `### ${t}\n\n${tbl}`).join('\n\n') + '\n' : ''}
## Tasks

${p.tasks.map(([lesson, text], i) => `${i + 1}. **[${lesson}]** ${text}`).join('\n')}

## Deliverables

${p.deliverables.map((d) => `- ${d}`).join('\n')}

## Definition of done

- Every task references numbers or evidence, not opinions
- A colleague could follow your workings without asking questions
- You can defend each recommendation in one sentence

---

*Complete all covered lessons, work the checkpoint, then mark it done to bank the milestone.*
`;
}

function renderDv(p) {
  const groupNames = p.groups.map((g) => {
    const gr = DV_GROUPS.find((x) => x.code === g);
    return `**${g} ${gr.name}** (${gr.t.length} techniques)`;
  }).join(' + ');
  return `# Checkpoint ${p.n}: ${p.title}

*${p.tagline}*

**Consolidates:** ${groupNames}
${p.warmups.length ? `\n**Warm-ups (worked exercises):** ${lessonLinks(p.warmups)}\n` : ''}
---

## Scenario

${p.scenario.join('\n\n')}

## Tasks

${p.tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

## Deliverables

${p.deliverables.map((d) => `- ${d}`).join('\n')}

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
`;
}

function renderDe(p) {
  const chapterNames = p.chapters.map((c) => {
    const ch = DE_CHAPTERS.find((x) => x.code === c);
    return `**${c} ${ch.name}** (${ch.t.length} lessons)`;
  }).join(' + ');
  return `# Checkpoint ${p.n}: ${p.title}

*${p.tagline}*

**Consolidates:** ${chapterNames}

---

## Scenario

${p.scenario.join('\n\n')}

## Tasks

${p.tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

## Deliverables

${p.deliverables.map((d) => `- ${d}`).join('\n')}

## Definition of done

- Every deliverable is the actual artefact (code, query, document), not a description of one
- Each task's lesson reference is used, not just cited
- You can defend each design choice (the denormalization, the retry strategy, the stakeholder question) in one sentence

## Job-readiness note

This checkpoint consolidates Chapter 1's foundational skills into one
scenario. It is a checkpoint on the approved 6-chapter curriculum, not a
capstone — Chapters 2–6 (PySpark, enterprise ETL/ELT, Hadoop/CDP, quality
and governance, production engineering) are the remaining approved scope
and are not part of this phase.

---

*Complete all lessons in the covered chapters, work the checkpoint, then mark it done to bank the milestone.*
`;
}

// ── Emit ─────────────────────────────────────────────────────────────────────
const index = [];

for (const p of CR) {
  const id = `P-CR-${String(p.n).padStart(2, '0')}`;
  fs.writeFileSync(path.join(OUT, `${id}.md`), renderCredit(p));
  index.push({ id, track: 'credit', n: p.n, title: p.title, tagline: p.tagline, covers: p.covers, file: `${id}.md` });
}
for (const p of DV) {
  const id = `P-DV-${String(p.n).padStart(2, '0')}`;
  fs.writeFileSync(path.join(OUT, `${id}.md`), renderDv(p));
  const covers = p.groups.flatMap(techIds);
  index.push({ id, track: 'dv', n: p.n, title: p.title, tagline: p.tagline, covers, groups: p.groups, file: `${id}.md` });
}
for (const p of DE) {
  const id = `P-DE-${String(p.n).padStart(2, '0')}`;
  fs.writeFileSync(path.join(OUT, `${id}.md`), renderDe(p));
  const covers = p.chapters.flatMap(deLessonIds);
  index.push({ id, track: 'de', n: p.n, title: p.title, tagline: p.tagline, covers, groups: p.chapters, file: `${id}.md` });
}

fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify({ projects: index }));

// coverage audit — every lesson must appear in exactly one project
const crCovered = CR.flatMap((p) => p.covers);
const crAll = CREDIT.modules;
const crMissing = crAll.filter((m) => !crCovered.includes(m));
const dvCovered = DV.flatMap((p) => p.groups);
const dvAll = DV_GROUPS.map((g) => g.code);
const dvMissing = dvAll.filter((g) => !dvCovered.includes(g));
const deCovered = DE.flatMap((p) => p.chapters);
const deAll = DE_CHAPTERS.map((c) => c.code);
const deMissing = deAll.filter((c) => !deCovered.includes(c));
const dupCr = crCovered.filter((m, i) => crCovered.indexOf(m) !== i);
const dupDv = dvCovered.filter((g, i) => dvCovered.indexOf(g) !== i);
const dupDe = deCovered.filter((c, i) => deCovered.indexOf(c) !== i);

// Every id a checkpoint waits on must be an id the app can actually mark complete.
// buildDvFlat() in index.html emits `${group.code}-T${nn}`; buildFlat() emits the
// module/case codes; buildDeFlat() emits `${chapter.code}-T${nn}`. Any id outside
// those sets would leave a checkpoint locked forever with no way for the user to
// discover why.
const appDvIds = new Set(DV_GROUPS.flatMap((g) => g.t.map((_, i) => `${g.code}-T${String(i + 1).padStart(2, '0')}`)));
const appCreditIds = new Set([...CREDIT.modules, ...CREDIT.cases]);
const appDeIds = new Set(DE_CHAPTERS.flatMap((c) => c.t.map((_, i) => `${c.code}-T${String(i + 1).padStart(2, '0')}`)));
const unreachable = [];
for (const entry of index) {
  const valid = entry.track === 'dv' ? appDvIds : entry.track === 'de' ? appDeIds : appCreditIds;
  for (const id of entry.covers) if (!valid.has(id)) unreachable.push(`${entry.id} waits on unknown id "${id}"`);
}
if (unreachable.length) {
  console.error(`${unreachable.length} checkpoint(s) reference ids the app cannot complete:`);
  unreachable.slice(0, 10).forEach((u) => console.error('  ' + u));
  process.exit(1);
}
console.log(`covers ids validated against app id space: ${index.reduce((a, e) => a + e.covers.length, 0)} references, all reachable`);

console.log(`credit checkpoints: ${CR.length} | dv checkpoints: ${DV.length} | de checkpoints: ${DE.length}`);
console.log(`portfolio csv: ${PORTFOLIO.rows} loans, ${PORTFOLIO.defaults} defaults`);
console.log(`credit modules covered: ${crCovered.length}/${crAll.length} | missing: ${crMissing.length ? crMissing.join(',') : 'none'} | duplicated: ${dupCr.length ? dupCr.join(',') : 'none'}`);
console.log(`dv groups covered: ${dvCovered.length}/${dvAll.length} | missing: ${dvMissing.length ? dvMissing.join(',') : 'none'} | duplicated: ${dupDv.length ? dupDv.join(',') : 'none'}`);
console.log(`de chapters covered: ${deCovered.length}/${deAll.length} | missing: ${deMissing.length ? deMissing.join(',') : 'none'} | duplicated: ${dupDe.length ? dupDe.join(',') : 'none'}`);
if (crMissing.length || dvMissing.length || deMissing.length || dupCr.length || dupDv.length || dupDe.length) {
  console.error('COVERAGE FAILURE — fix the specs');
  process.exit(1);
}
