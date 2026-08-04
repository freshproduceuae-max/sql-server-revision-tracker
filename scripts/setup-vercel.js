// Pins this checkout to the right Vercel project.
//
// Usage (from repo root):  node scripts/setup-vercel.js
//
// .vercel/ is gitignored, so a fresh clone has no project link. Running
// `vercel link` interactively invites it to guess, and deploying to the wrong
// project is the failure this project has already lost time to — see
// LESSONS-LEARNED entry 10. This writes the known ids directly instead.
//
// Safe to re-run: it reports and exits if the link already matches.

const fs = require('fs');
const path = require('path');

const ORG = 'team_cxU0NZtjMsnBvJprrVzn43Xo';       // freshproduceuae-maxs-projects
const PROJECT = 'prj_LAGdEd02pyHEQbY8WWjKqAKVjx7t'; // credit-risk-academy

const dir = path.join(__dirname, '..', '.vercel');
const file = path.join(dir, 'project.json');
const desired = { orgId: ORG, projectId: PROJECT };

if (fs.existsSync(file)) {
  const current = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (current.orgId === ORG && current.projectId === PROJECT) {
    console.log('already linked to the right project — nothing to do');
    process.exit(0);
  }
  console.error('WARNING: .vercel/project.json points somewhere else:');
  console.error(`  found:  org ${current.orgId} / project ${current.projectId}`);
  console.error(`  expect: org ${ORG} / project ${PROJECT}`);
  console.error('Overwriting. If that is wrong, restore it before deploying.');
}

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, JSON.stringify(desired, null, 2) + '\n');

console.log('linked to credit-risk-academy (freshproduceuae-maxs-projects)');
console.log('');
console.log('Next: confirm you are authenticated, then deploy.');
console.log('  npx vercel whoami        # must succeed before deploying');
console.log('  npx vercel --prod --yes  # production, aliases credit-risk-academy.vercel.app');
console.log('  npx vercel --yes         # preview build (SSO-protected)');
