# Checkpoint 2: Diagnose and Tune a Skewed Transaction Job

*One scenario, all six Chapter 2 skills: lazy evaluation, schema enforcement, skew, join strategy, streaming, caching*

**Consolidates:** **DE02 PySpark and Distributed Data Processing** (6 lessons)

---

## Scenario

A transaction-banking analytics job aggregates monthly volume per customer, enriches it with branch reference data, and feeds a near-real-time fraud-monitoring stream. It runs fine most nights but occasionally takes 6x longer with no code change and no data-volume growth on average -- and a data scientist reports that re-running three summaries from the same cleansed DataFrame in a notebook takes three times as long as it should. You are asked to diagnose and fix the pipeline using the Spark UI and the physical plan as evidence, not guesswork.

## Tasks

1. [DE02-T01] Explain, using `.explain(mode="formatted")` output, exactly which lines in a multi-step transformation chain actually execute when an action finally runs -- and where in the Spark UI you would look to find which stage is genuinely slow, rather than timing individual transformation calls.
2. [DE02-T02] Rewrite a schema-inferred CSV ingestion (`inferSchema=True`) as an explicit `StructType` schema with `mode="FAILFAST"`, and explain why the original version could produce a silent zero-row join result with no error anywhere in the pipeline.
3. [DE02-T03] Given a Spark UI screenshot description showing 199 fast tasks and 1 four-hour task in a groupBy aggregation stage, diagnose the skew, then apply both salting and confirm AQE's skew-join handling is enabled -- explaining which mitigation actually applies to a plain aggregation versus a join.
4. [DE02-T04] Given a join against a small (40,000-row) reference table that is unexpectedly slow, identify from the physical plan whether Spark chose a sort-merge or broadcast join, force the correct strategy, and confirm with `.explain()` that the plan actually changed.
5. [DE02-T05] Design a watermarked, windowed Structured Streaming aggregation for the fraud-monitoring use case that correctly bounds state for late-arriving events, and explain what "near-real-time" concretely means for this design's trigger interval.
6. [DE02-T06] Fix the notebook's repeated-recomputation problem with `.cache()`, explain why caching had no effect until the first forcing action ran, and justify a specific `StorageLevel` choice given a stated memory constraint.

## Deliverables

- A physical-plan-based diagnosis of a slow multi-step transformation chain
- An explicit-schema ingestion rewrite with a stated fail-loudly rationale
- A skew diagnosis with both a salting fix and confirmed AQE configuration
- A join-strategy diagnosis and fix with before/after `.explain()` evidence
- A watermarked streaming aggregation design with a stated late-data tolerance
- A caching fix with a justified StorageLevel choice

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
