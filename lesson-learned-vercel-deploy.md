# Lesson Learned: Deploying Credit Risk Academy to Vercel

**Project:** Credit Risk Academy (index.html) — Duolingo-style learning path, 47 modules + 7 case studies
**Task:** Deploy to Vercel production (team: freshproduceuae-maxs-projects, project: credit-risk-academy)
**Result:** Fixed by Claude Fable 5, after other models/attempts got stuck.

## The Problem

Every earlier attempt tried to deploy through **local tooling** — installing the GitHub CLI (`gh`), installing the Vercel CLI (`vercel`), then pushing via `git`/`vercel deploy` from a Windows terminal.

That path kept breaking on environment issues that had nothing to do with the actual app:
- `gh`/`vercel` installed but not picked up on PATH
- Needing to close/reopen terminals for PATH changes to register
- Uncertainty about which Vercel project/team the CLI would actually target
- General friction getting Node/npm/CLI state consistent on Windows

None of this was a bug in `index.html`. The app itself was already working locally. The deploy kept failing because of the *delivery mechanism*, not the *content*.

## What Fixed It

Instead of shelling out to local CLI tools, the successful approach called Vercel's **MCP connector** directly from inside the chat (`deploy_to_vercel`), passing:
- The file content directly (no git push required)
- The exact `team ID` and `project ID` you already had on hand — removing any ambiguity about deploy target
- `framework: null`, `target: production` explicitly

This skips the entire local environment layer: no PATH, no CLI install, no git remote auth, no terminal at all. The deploy goes straight from the conversation to Vercel's API.

## Takeaway

**When a deploy keeps failing across CLI attempts, the CLI is often the actual point of failure — not the code.** If an MCP/API-based path exists that talks to the platform directly, it sidesteps local environment fragility entirely. Worth trying *before* burning more time debugging PATH/terminal issues.

## Resolved / Corrected — see `../LESSONS-LEARNED.md` entry 10

Two claims above turned out to be wrong in later sessions. Kept here for history,
corrected below.

**1. "The CLI is the point of failure" — not quite.** The MCP connector is now
disconnected most of the time, and the CLI works fine. The real failure mode was
never the tool, it was *ambiguity about the deploy target*. The CLI is reliable
when you confirm `npx vercel whoami` first, pin the target by writing
`.vercel/project.json` with the known org/project IDs instead of running
interactive `vercel link`, and pass `--prod --yes`.

**2. "The production alias needs manual promotion" — no longer true.** A `--prod`
deploy of the pinned project now aliases `credit-risk-academy.vercel.app`
automatically. No alias API call or dashboard change was needed.

New lessons go in `../LESSONS-LEARNED.md`, which consolidates all of them.
