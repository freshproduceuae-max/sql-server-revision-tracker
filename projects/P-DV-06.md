# Checkpoint 6: Source vs Target

*Reconciliation and cross-system comparison*

**Consolidates:** **G08 Reconciliation** (15 techniques) + **G18 Cross-System & Integration** (8 techniques)

**Warm-ups (worked exercises):** [M08-E1](#lesson/M08-E1)

---

## Scenario

Pretend the warehouse migrated: create a copy of Orders, then sabotage it — drop 2 rows, duplicate 1, change 3 amounts, NULL a date. Now prove your reconciliation catches every change without knowing what was sabotaged.

## Tasks

1. Build source and target tables; script the sabotage with UPDATE/DELETE/INSERT so it is repeatable.
2. Tier-1 recon: COUNT, SUM, MIN/MAX, AVG per table — which sabotages does this tier catch and which slip through?
3. Tier-2 recon: EXCEPT both directions — classify each diff as missing / extra / changed.
4. Tier-3 recon: row-hash comparison (HASHBYTES or CHECKSUM over concatenated columns) joined on the key — produce a column-level diff for changed rows.
5. Write the generic recon procedure: parameterised by table name, outputting a summary row (source count, target count, missing, extra, changed) — the reusable artefact of this checkpoint.

## Deliverables

- The sabotage script (repeatable)
- Three-tier reconciliation .sql with a caught/missed matrix per tier
- A reusable recon procedure with a demo run

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
