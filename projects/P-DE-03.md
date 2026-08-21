# Checkpoint 3: Build an Idempotent SCD2 Customer Pipeline

*One scenario, all six Chapter 3 skills: ingestion-pattern choice, idempotent writes, schema evolution, SCD2 at scale, lakehouse format, metadata-driven design*

**Consolidates:** **DE03 Enterprise ETL/ELT, Ingestion and Data Modelling** (6 lessons)

---

## Scenario

The bank is onboarding its customer-dimension pipeline onto the new lakehouse platform ahead of three more source systems planned for next quarter. The dimension must ingest change-events from an internal CDC feed, apply them as SCD Type 2 history in Iceberg, survive a schema change the source team is planning next month (adding a risk-tier field, renaming a legacy column), and be re-runnable without human intervention if a nightly run fails partway through -- because a hand-run reconciliation after a partial failure is exactly what caused a real double-counted-balance incident on a different pipeline this quarter. You are asked to design and justify the pipeline end to end, in a form that could plausibly onboard the next source with a config change rather than new code.

## Tasks

1. [DE03-T01] Classify the customer CDC feed's ingestion pattern (batch, scheduled batch, or streaming) using the source's real event cadence and the pipeline's actual latency requirement -- not a platform-wide default -- and justify the choice against at least one pattern that would be wrong for this source.
2. [DE03-T02] Design the pipeline's write step so that re-running it after a partial failure, for any reason, produces the same final table state as running it exactly once -- state which idempotent-write pattern (MERGE-on-natural-key or replaceWhere partition overwrite) fits this source and why the other would be a weaker fit here.
3. [DE03-T03] Given the planned schema change (add risk-tier with a default, rename a legacy column), classify each change as safe-as-is or needing an explicit compatibility mechanism, and specify the exact mechanism (Avro alias, Iceberg ID-based rename) each needs before it ships.
4. [DE03-T04] Implement the SCD2 merge so that concurrent same-customer change-events in one batch cannot produce two current rows, and explain -- referencing Data Validation G14's gap/overlap/current-row invariants -- which specific invariant a naive distributed MERGE risks violating that a single-node implementation would not.
5. [DE03-T05] Justify Iceberg (over a raw data lake) for this table using its actual commit/snapshot mechanism, not a generic "ACID" claim, and state one condition under which a traditional warehouse would still be the better choice for a different table on this platform.
6. [DE03-T06] Sketch the config fields a metadata-driven framework would need to onboard this source and the next quarter's three sources without new pipeline code, and name one specific inconsistency (like the scenario's differing missing-source handling) that a shared, config-driven ingestion function prevents versus hand-copied scripts.

## Deliverables

- An ingestion-pattern classification with a stated rejected alternative
- An idempotent write design with a justified pattern choice
- A schema-change compatibility plan naming the exact mechanism per change
- A concurrency-safe SCD2 merge design referencing G14's invariants
- An Iceberg-vs-lake justification grounded in the commit/snapshot mechanism
- A metadata-driven config sketch covering the next onboarding wave

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
