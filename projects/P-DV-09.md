# Checkpoint 9: The Cleansing Pipeline

*An audited ETL-style clean of Customers, end to end*

**Consolidates:** **G15 ETL & Load Process** (10 techniques) + **G19 Cleansing Operations** (19 techniques)

---

## Scenario

Everything found so far now gets FIXED — properly: staged, transformed, validated, logged, and never destructive to the source. Build the pipeline that turns dirty [Customers](data-validation-lab/schemas/01_Customers.csv) into a clean, certified table.

## Tasks

1. Stage: land raw Customers into a staging table with a LoadID and load timestamp; log the pre-load row count (G15).
2. Cleanse (G19): trim whitespace; standardise case (names proper-case, emails lower); empty strings → NULL; fix the "N/A" placeholder row; standardise phone formats; parse any combined name fields.
3. Resolve duplicates from Checkpoint 1: merge the exact duplicate and the fuzzy pair with explicit survivorship rules, keeping losers in a quarantine table.
4. Validate post-load: re-run your Checkpoint-1 and Checkpoint-3 checks against the clean table — the pass rate is your quality score; log rejected rows with reasons.
5. Prove the process (G15): pre vs post row-count reconciliation (raw = clean + quarantined + rejected), and a rerun-safety argument — what happens if the pipeline runs twice?

## Deliverables

- The full pipeline .sql: stage → cleanse → dedupe → validate → certify
- The rejection/quarantine log with reasons
- Before/after quality scorecard (checks passed) and the row-count reconciliation

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
