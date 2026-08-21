# Checkpoint 6: Build a Production-Ready Settlement Pipeline Runbook

*One scenario, all six Chapter 6 skills: orchestration vs execution, CI/CD vs data correctness, Docker vs Kubernetes vs Spark, ML feature point-in-time correctness, production resilience*

**Consolidates:** **DE06 Production Engineering: Orchestration, CI/CD, Containers, ML Data, Operations** (6 lessons)

---

## Scenario

The bank's nightly settlement pipeline -- the same one this track has followed since Chapter 3 -- is being finalized for production: it needs a real orchestrated DAG (not one script's sequential calls), a CI/CD pipeline that actually gates on data correctness (not just deployment mechanics), a correctly containerized and Kubernetes-scheduled deployment, a point-in-time-correct feature feeding a downstream fraud model, and a written runbook so a 3 AM on-call engineer has pre-decided answers instead of improvising. You are asked to design all six pieces as one coherent production-readiness package, being explicit about which distinct layer or control each piece belongs to -- orchestration is not execution, CI/CD passing is not data correctness, Docker is not Kubernetes is not Spark, and a model's feature quality is not a modeling problem.

## Tasks

1. [DE06-T01] Design the settlement pipeline as an Airflow DAG with three independently tracked tasks (extract, summarize, report), and specify exactly which task(s) can be safely re-run alone after a failure, referencing each task's own idempotency properties rather than assuming re-run safety.
2. [DE06-T02] Design a CI/CD pipeline stage that would have caught a silently-wrong join dropping 8% of rows, explaining precisely why "unit tests + build + deploy all green" does not by itself verify data correctness.
3. [DE06-T03] Fix all four distinct container-security findings (unpinned dependencies, a baked-in secret, root execution, no vulnerability scanning) for this pipeline's image, justifying why each fix is independent and does not address the other three.
4. [DE06-T04] Explain why "containerized" does not mean "ready for Kubernetes," and design the correct spark-submit invocation for running this pipeline's Spark jobs on Kubernetes, distinguishing Docker's packaging role, Kubernetes' scheduling role, and Spark's own driver/executor execution role.
5. [DE06-T05] Redesign a customer-transaction-history feature for the downstream fraud model to be point-in-time correct, explaining the specific leakage mechanism the original "last 30 days relative to today" computation introduced and why it produced good offline accuracy but worse live performance.
6. [DE06-T06] Write the production runbook's retry-policy table, backfill decision tree, rollback plan (referencing a specific recoverable Iceberg snapshot mechanism) and incident-communication plan for this pipeline, so a 3 AM on-call engineer has pre-decided answers rather than improvising.

## Deliverables

- An Airflow DAG design with a stage-by-stage re-run-safety justification
- A CI/CD data-correctness gate design distinct from deployment-mechanics checks
- Four independently justified container-security fixes
- A correct Docker/Kubernetes/Spark-execution-layer distinction with a working spark-submit design
- A point-in-time-correct feature redesign with the leakage mechanism explained
- A complete production runbook: retry policy, backfill scoping, rollback plan, incident communication

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
