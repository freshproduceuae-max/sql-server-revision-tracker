# Production domain cutover proposal — `credit-risk-academy.vercel.app` → `analyst-path.vercel.app`

**Status: proposal only. Not authorized, not scheduled, not executed.** This
document exists to be reviewed and approved (or rejected) — it does not
grant permission to perform the switch. See HANDOFF.md "Known gaps" for the
background on why the two domains diverged.

---

## 1. Exact current and target domains

| | Domain | Current role |
|---|---|---|
| **Current (production)** | `credit-risk-academy.vercel.app` | Registered as the Vercel project's *production domain* — this is what exempts it from Deployment Protection / Vercel SSO. Every existing user's progress lives under this origin. |
| **Target** | `analyst-path.vercel.app` | Exists today only as an *alias* to the current production deployment, not the production domain itself. Returns a `302` redirect to Vercel SSO when visited directly, because alias-only domains are not exempt from Deployment Protection. |

The Vercel *project* is already named `analyst-path` (renamed some time ago);
renaming the project did not move the `.vercel.app` domain along with it —
that is a separate, manual setting. This proposal is about finishing that
domain move, not about any code or content change.

**The switch itself is a two-click dashboard operation** (Project → Settings
→ Domains → add `analyst-path.vercel.app` as production domain, then remove
`credit-risk-academy.vercel.app`), not exposed via the Vercel CLI. Everything
else in this document is about not losing user data or breaking access
around that click.

---

## 2. Origin-scoped `localStorage` implications

All user progress — completed lessons, streak, last-studied date, quiz
scores — lives in a single `localStorage` key, `crAcademy_v1`
(`index.html`'s `currentState()`/`loadState()`/`saveCompleted()` etc.).
`localStorage` is scoped **per origin** (scheme + host + port). `https://
credit-risk-academy.vercel.app` and `https://analyst-path.vercel.app` are
two different origins, even though they will serve byte-identical content
from the same Vercel project.

**The direct consequence: the moment `analyst-path.vercel.app` becomes the
production domain, every visitor arriving there for the first time sees
zero completed lessons and a reset streak** — not because anything was
deleted, but because the browser is reading a `localStorage` bucket that
was never written to from that origin. The data under the old origin is
untouched and still there; it is simply invisible from the new one.

This is not a bug to fix in code before switching — it is a structural
property of browser-local storage that the cutover procedure has to work
around operationally.

---

## 3. Progress export/import procedure

The app already has the exact mechanism this cutover needs, shipped and
in production today — no new code required:

- **`#backup`** — a full page (not a dialog), reachable from the 🛟 icon in
  the top nav on every screen (`index.html:1286`, `:2129`).
- **Export**: `downloadBackup()` (`index.html:829`) serializes
  `{app, version, exportedAt, summary, state}` from `backupPayload()`
  (`index.html:666`) to a downloadable JSON file. The `summary` block is
  plain-language (lessons completed, quiz lessons scored, day streak, last
  studied) specifically so a user can tell what the file holds without
  opening a code editor.
- **Import**: `importBackupFile()` (`index.html:844`) reads a selected
  file, validates it (`validateBackup()`, `index.html:686` — rejects
  anything that isn't a recognizable, current-or-older-version Analyst
  Academy backup **before touching storage**, so a bad file cannot corrupt
  existing progress), then merges it (`mergeBackup()`, `index.html:700`).
- **Merge semantics are additive, not destructive** — `mergeBackup()`
  unions completed-lesson sets, takes the max quiz score per lesson, the
  max streak, and the later last-studied date. **Nothing already present
  can be removed by an import.** This is the property that makes the
  cutover procedure safe: importing an old-origin backup onto a fresh
  (empty) new-origin `localStorage` is a pure addition, and importing it a
  second time by mistake is a harmless no-op.

**Cutover-specific procedure (for a user migrating manually):**
1. On `credit-risk-academy.vercel.app` (before or shortly after the domain
   switch — the old domain keeps working, see §5), open `#backup` and
   download the backup file.
2. Visit `analyst-path.vercel.app`, open `#backup` there, and import the
   downloaded file.
3. The import screen's own summary (post-merge lesson/score/streak counts)
   is the user's confirmation the restore worked — no separate verification
   step needed beyond what the page already shows.

---

## 4. Rehearsal and verification

**Not yet performed. This section specifies what a rehearsal must prove
before the real cutover is scheduled** — it is a requirement of this
proposal, not a completed step.

A rehearsal must be run against a **non-production preview deployment**,
never against the real production domain, and must positively demonstrate:

1. A fresh browser profile visiting the *current* production domain,
   completing at least one lesson, one quiz, and banking a streak — this is
   the "before" state.
2. Exporting via `#backup` on that profile, and confirming the downloaded
   file's `summary` block matches what was actually done in step 1.
3. On the *same* browser profile, navigating to a **preview deployment
   URL** standing in for the new domain (different origin, proving the
   `localStorage` isolation is real, not theoretical) and confirming
   `#backup`'s own state (or the top-nav XP/streak display) shows zero —
   the expected pre-import blank state.
4. Importing the exported file on the preview-URL origin and confirming the
   merge summary reports the correct added-lessons/added-scores counts, and
   that the top-nav XP/streak/completed-lesson indicators now match the
   "before" state from step 1.
5. Repeating the import a second time (accidental double-import) and
   confirming it is a genuine no-op — no duplicate XP, no changed counts —
   which the additive merge design in §3 should already guarantee, but this
   proves it rather than assumes it.
6. Confirming the checkpoint-unlock gate (a track with `projPrefix`, e.g.
   Credit Risk) correctly reflects the imported completion state — i.e.
   that restored progress actually re-unlocks whatever it should, not just
   that the raw numbers match.
7. **Confirming the §6 unverified assumption directly, before relying on
   it**: whether Vercel's Deployment Protection exemption travels with a
   domain once it is demoted from "production," or only applies to
   whichever domain is *currently* production. A same-project preview
   deployment cannot fully replicate this (Deployment Protection is a
   project-level setting affecting non-production domains generally, not
   something a preview URL's own protection status necessarily mirrors for
   a *demoted former-production* domain specifically) — the most direct
   safe check is: immediately after the real domain switch (§6 step 1),
   verify §6 step 2 (unauthenticated-session check on the demoted domain)
   *before* telling any user the old domain remains a safety net, and be
   prepared to execute the §7 rollback procedure at once if it fails. If
   the owner wants certainty before the real switch rather than finding out
   at switch time, confirm directly against Vercel's own documentation or
   support for how Deployment Protection exemption is scoped, ahead of
   scheduling the cutover — this repo's own tooling cannot verify that
   without performing the actual change.

**Go/no-go for the real cutover is gated on all seven rehearsal items above
being resolved** — the first six by rehearsal on a preview deployment, the
seventh either by advance confirmation from Vercel's documentation/support
or by explicit owner acceptance that it will be checked immediately at
switch time with rollback ready if it fails.

---

## 5. Users who do not export

This is the material risk this proposal cannot eliminate, only bound and
disclose.

**Any user who never visits `#backup` before or shortly after the cutover,
and who does not manually navigate back to the old domain to do so
afterward, will experience their progress as reset to zero on the new
domain — permanently, from that user's perspective, even though the old
data is not actually deleted anywhere.** There is no way to migrate a
user's progress without either their action (export/import) or a
server-side data store, which does not exist for this app (see HANDOFF.md
"Progress is browser-local" — the largest named open item, itself gated on
an unresolved cross-device identity decision).

**Mitigations available without new engineering:**
- Keep the old domain live and reachable for a meaningful window after the
  switch (see §6) — this is the primary mitigation, since it means a user
  who notices the reset can still recover by going back and exporting.
- A one-time, prominent in-app banner on first load after the domain
  becomes primary, pointing at `#backup` and explaining the situation in
  plain language — **not built today**, would need to be scoped and
  reviewed as actual UI work before the cutover, following `CLAUDE.md`
  rule 8 (plan shown before building) if authorized.
- Direct communication to any known users ahead of the change (see §8).

**What cannot be mitigated:** a user who has already lost the tab/bookmark
to the old domain, does not see any communication, and does not think to
look for a backup mechanism, has no automatic recovery path under the
current architecture. This is disclosed as a real, accepted risk of
proceeding without first building cross-device sync — not something this
proposal can design around.

---

## 6. Old-domain availability

**⚠ UNVERIFIED ASSUMPTION — must be confirmed before this proposal's
recovery/rollback story can be trusted (Codex review finding, not yet
checked against real Vercel behavior):** this section assumes a *demoted*
former-production domain remains publicly reachable the same way the
current production domain is. But §1 of this same document establishes
that `analyst-path.vercel.app` — an alias-only domain today — is **not**
exempt from Deployment Protection and returns a `302` to Vercel SSO. If
Deployment Protection exemption is tied specifically to "currently
designated production domain" rather than to the domain itself, then the
moment `credit-risk-academy.vercel.app` is demoted (step 1 below), it could
start returning the same `302`-to-SSO behavior `analyst-path.vercel.app`
shows today — which would silently defeat the entire recovery mechanism
this section, §5, and §7's rollback story all depend on. **This must be
confirmed empirically before go-live** (see the added rehearsal step and
go/no-go criterion below) — do not treat "the old domain stays reachable"
as fact until it is.

**Recommendation (contingent on the above being confirmed true):** do not
remove `credit-risk-academy.vercel.app` from the project's domains in the
same action that adds `analyst-path.vercel.app` as production. Vercel
allows multiple domains on one project; only one can be *the* production
domain (the one exempted from Deployment Protection by default), but a
second domain can remain attached and continue resolving to the same
deployment — *if* that exemption travels with the domain and not only with
current "production" status.

Proposed sequence:
1. Add `analyst-path.vercel.app` as the production domain (this is the
   actual "switch" — new visitors and any hardcoded/shared links to the old
   domain still work identically in the meantime).
2. **Immediately** (not after the fact) confirm
   `credit-risk-academy.vercel.app` still serves the app to an
   unauthenticated visitor — a fresh incognito/private window with no
   existing Vercel auth session, so a false pass from a locally-cached
   Vercel login isn't mistaken for public accessibility. If it does not,
   the unverified assumption above was wrong, and this entire section's
   plan (and §5's and §7's reliance on it) needs to be redesigned before
   proceeding further — treat that outcome as an immediate rollback
   trigger (§7).
3. If confirmed reachable: leave `credit-risk-academy.vercel.app` attached,
   unchanged, for a **minimum disclosure window** (a specific number of
   days is an owner decision, not a technical one — proposed default: 30
   days, adjustable).
4. Only after that window, and only after confirming via Vercel analytics
   or logs that traffic to the old domain has genuinely dropped to
   near-zero, consider removing it.

This directly addresses §5: as long as the old domain keeps resolving
**and stays publicly reachable without an auth prompt**, a user who
returns to it later can still export their progress, even long after the
"official" switch.

---

## 7. Rollback triggers and procedure

**Rollback is symmetric and cheap only if the unverified assumption in §6
holds** — i.e. only if the demoted old domain is confirmed to remain
publicly reachable. If it does not (see §6 step 2), rollback is still
possible (re-designating the old domain as production again is still a
same-speed, reversible dashboard action), but the "users can self-recover
via the old domain in the meantime" property this section originally
claimed would not hold, and that gap should be treated as materially
increasing the urgency of steps 2–4 below rather than something the
disclosure window alone protects against.

**Triggers** (any one is sufficient to roll back):
- The rehearsal in §4 fails any of its seven items — for items 1–6, this
  means simply not proceeding with the real cutover at all; for item 7 (the
  demoted-domain-reachability assumption), if it is only checked at switch
  time per §6 step 2 and fails, this is an *immediate* rollback trigger,
  not a pre-cutover no-go.
- Post-cutover, Vercel reports the new domain failing its own SSL/DNS
  propagation or serving errors that the old domain does not.
- A material, unexpected volume of user reports about lost progress within
  the first 24–48 hours that suggests the export/import path itself is
  broken (not just "a user didn't know to export," which is the accepted
  risk in §5, but a case where a user *did* try to export/import and it
  failed) — this would indicate a real defect, not the disclosed risk, and
  should halt further reliance on the new domain until root-caused.

**Procedure:** in the Vercel dashboard, re-designate
`credit-risk-academy.vercel.app` as the production domain (reversing the
one setting changed in §6 step 1). Because the old domain was never removed,
this is a same-speed, same-mechanism reversal of the original change — not
a separate migration. No user data is at risk during rollback itself, since
nothing about `localStorage` state is touched by which domain is marked
"production" in Vercel's settings.

---

## 8. Production validation

After the domain switch (not before — this validates the real change, per
`CLAUDE.md`'s "verify in a browser after deploying, not just that the build
succeeded"):

1. In a fresh incognito/private browser window with no existing Vercel
   auth session (a signed-in Vercel session in the same browser would mask
   the exact behavior this step needs to catch — a false pass), visit
   `analyst-path.vercel.app` directly (not via a preview URL) and confirm
   it serves the app with a `200`, not the `302`-to-SSO behavior the
   alias-only domain shows today.
2. Confirm a lesson renders real content and a quiz question answers
   correctly — the existing standing verification bar for any deploy,
   applied here to confirm the domain change didn't disturb anything
   content-related (it shouldn't, since this is a domain-only change to
   the same deployment, but the check costs nothing and the app's own
   deploy checklist already requires it for every change).
3. **This is §6 step 2 and the §4 item 7 check — do it here, immediately,
   not as an afterthought:** in the same clean incognito/private session
   (no cached Vercel auth), confirm `credit-risk-academy.vercel.app` still
   resolves and still serves the app **without** an SSO redirect. If it
   does redirect to SSO, the §6 unverified assumption was wrong — execute
   the §7 rollback procedure immediately, before treating the cutover as
   complete, since the old domain is not actually functioning as a
   recovery path.
4. Perform one real export-then-import cycle against the live domains
   (not the preview rehearsal from §4) — the actual go-live equivalent of
   the rehearsal, on real production infrastructure, before declaring the
   cutover complete.

---

## 9. Communications and support

- **In-app**: the banner described in §5 (if authorized and built) is the
  primary channel — most users will never read anything outside the app
  itself.
- **Out-of-app**: if there is any existing channel to known users (course
  cohort communication, etc.), a plain-language note pointing at `#backup`
  and explaining the domain will change, sent before the cutover, gives
  users a chance to export proactively rather than reactively.
- **HANDOFF.md**: this repo's own documentation should be updated at
  cutover time to reflect the new domain as current and record the date —
  a follow-up documentation task, not part of this proposal's scope.

---

## 10. Explicit go/no-go criteria

**Go** requires all of the following:
- [ ] Rehearsal items 1–6 in §4 pass on a preview deployment.
- [ ] Item 7 in §4 (whether Deployment Protection exemption survives
      domain demotion) is either confirmed in advance via Vercel's own
      documentation/support, **or** the owner explicitly accepts checking
      it at switch time (§8 step 3) with rollback (§7) ready to execute
      immediately if it fails — this must be a deliberate choice, not a
      silent gap.
- [ ] The owner has set the old-domain retention window in §6 (or accepted
      the proposed 30-day default) — contingent on item 7 above resolving
      in favor of the old domain actually staying reachable; if it doesn't,
      this retention window doesn't provide the protection it's meant to
      and the owner should be told that plainly before go-live.
- [ ] The owner has decided whether the in-app banner in §5 is built first
      or the cutover proceeds without it (accepting the higher silent-loss
      risk that omitting it implies).
- [ ] Any out-of-app communication in §9 the owner wants sent has been sent
      (or the owner has explicitly decided to skip it).
- [ ] This proposal itself has been reviewed (Codex, per the owner's
      standing instruction for this document) and any findings resolved.

**No-go / hold** if any rehearsal step fails, if the owner has not made the
retention-window, item-7, and banner decisions above, or if cross-device
sync (a separate, currently-unresolved item — see HANDOFF.md) is judged
close enough to landing that migrating twice (once for the domain, again
once sync ships) would be worse for users than migrating once after sync
exists. That sequencing question is itself a decision for the owner, not
resolved by this document.
