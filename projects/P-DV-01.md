# Checkpoint 1: The Missing & The Duplicated

*Full completeness and uniqueness audit of Customers & Transactions*

**Consolidates:** **G01 Completeness** (12 techniques) + **G02 Uniqueness & Duplicates** (10 techniques)

**Warm-ups (worked exercises):** [M01-E1](#lesson/M01-E1) · [M01-E2](#lesson/M01-E2) · [M02-E1](#lesson/M02-E1) · [M02-E2](#lesson/M02-E2)

---

## Scenario

The nightly e-statement batch failed again and finance suspects double-counted transactions. You own the audit: every completeness gap and every duplicate in [Customers](data-validation-lab/schemas/01_Customers.csv) and [Transactions](data-validation-lab/schemas/05_Transactions.csv), with evidence.

## Tasks

1. Load the two CSVs into SSMS (schema card: [SCHEMA_REFERENCE](data-validation-lab/schemas/SCHEMA_REFERENCE.md)).
2. Completeness sweep (G01): one query per issue class — NULLs in mandatory fields, empty/whitespace-only strings, placeholder values ("N/A"), and conditional completeness (IsActive=1 must have Email). Produce a per-column NULL/blank rate summary.
3. Uniqueness sweep (G02): exact duplicate rows, duplicate business keys (ReferenceNo in Transactions), and near-duplicates in Customers via SOUNDEX/DIFFERENCE. Deduplicate with ROW_NUMBER keeping the best record — justify "best".
4. Cross-check: which rows fail BOTH a completeness and a uniqueness rule? Those are your highest-priority fixes.
5. Write the findings table: rule, rows failing, severity, proposed fix.

## Deliverables

- One .sql file, sectioned per rule, runnable top-to-bottom
- A findings table (rule × count × severity × fix)
- The dedup query with the keep-logic explained in comments

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
