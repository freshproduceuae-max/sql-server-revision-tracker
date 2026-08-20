# Checkpoint 1: Reconcile a Transaction-Banking Batch

*One scenario, all six Chapter 1 skills: typed Python, sargable SQL, star-schema design, resilient ingestion, PR workflow, stakeholder check-ins*

**Consolidates:** **DE01 Python, SQL and Data Engineering Foundations** (6 lessons)

---

## Scenario

A transaction-banking platform runs a nightly reconciliation between two sources: a REST API from a third-party FX-rate provider, and an internal SQL Server transactions table. The batch has been unreliable — silent failures, slow queries, and at least one incident where a fix was overwritten because two engineers edited the same file without a review process. You are asked to rebuild the reconciliation as a small, defensible pipeline that would survive a code review from a senior engineer.

## Tasks

1. [DE01-T01] Write a typed Python module that parses the daily transactions CSV export into typed records, collecting every parse failure (with row number and reason) rather than stopping at the first one or swallowing errors silently.
2. [DE01-T02] Write the SQL Server reconciliation query joining Transactions against the FX-rate lookup for a given date range, using a sargable date predicate (not a function wrapped around the indexed column) — and show, with SET STATISTICS IO, that it seeks rather than scans.
3. [DE01-T03] Design a small star schema (one fact table, two dimension tables) for a monthly reconciliation-exceptions report, and justify one deliberate denormalization choice you made.
4. [DE01-T04] Write a resilient fetch function for the FX-rate REST API: paginated, rate-limited, retries a transient 503/429 with backoff, and persists enough state to resume from the last successful page rather than restarting from page 1.
5. [DE01-T05] Write the PR description you would submit for this work: what changed, why, and — specifically — what a reviewer should look for that would have caught the original overwritten-fix incident if this workflow had existed then.
6. [DE01-T06] Name the three stakeholders (beyond your own team) you would check in with before this pipeline goes to production, and the one question you would ask each — grounded in a specific risk each check-in is meant to catch, not a generic list.

## Deliverables

- A typed Python parsing module with explicit, collected error handling
- A sargable reconciliation query with SET STATISTICS IO evidence of the plan change
- A star-schema DDL sketch with a stated denormalization rationale
- A resilient, resumable REST ingestion function
- A PR description demonstrating the review workflow from DE01-T05
- A stakeholder check-in list with one grounded question per stakeholder

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
