# Checkpoint 5: Diagnose and Govern a Late-Discovered Settlement Defect

*One scenario, all six Chapter 5 skills: DQ gates at scale, Atlas/Ranger governance, auth-vs-authz-vs-encryption-vs-masking, SLA observability, Spark UI debugging, measured cost optimization*

**Consolidates:** **DE05 Data Quality, Governance, Security, Observability and Spark Optimization** (6 lessons)

---

## Scenario

A bank's nightly settlement pipeline has had a rough month: an upstream defect silently propagated into three downstream tables before anyone noticed, a compliance audit found the platform team could answer neither "where did this PII column come from" nor "who can currently query it," a platform lead's "Kerberos means it's secure" answer collapsed four distinct controls into one, the SLA was quietly missed twice with no real-time alert, and an on-call engineer's habitual blind restart made a skewed stage worse rather than better -- and a well-intentioned "optimization" doubled cluster cost without fixing the actual bottleneck. You are asked to design the fixes for all six problems as one coherent quality/governance/security/observability/cost programme for this one pipeline, using Data Validation's existing detection logic (G01-G19) as a foundation rather than re-deriving it, and CDP's real components (Atlas, Ranger, Spark UI, AQE) rather than vague claims about "quality," "governed," "secure" or "optimized."

## Tasks

1. [DE05-T01] Design a quarantine-plus-threshold data quality gate for this pipeline, reusing a Data Validation completeness/consistency check's DETECTION logic rather than re-deriving it, and justify the specific threshold that decides quarantine-and-continue versus hard-fail for a given day's defect rate.
2. [DE05-T02] Specify what has to be instrumented in this pipeline so an auditor's lineage question ("where did this column's data come from") and access question ("who can query it and why") are both answerable going forward, naming Atlas and Ranger's distinct roles rather than one undifferentiated "governance" feature.
3. [DE05-T03] Rewrite the platform lead's "Kerberos, so it's secure" answer into four separately verified claims (authentication, authorization, encryption at rest, encryption in transit, masking) with the specific evidence that would confirm or refute each one.
4. [DE05-T04] Design the SLA-risk alerting this pipeline needs to detect a late-but-not-crashed run while it is still in progress, and explain why the existing crash-only alert structurally cannot catch this failure mode no matter how it is tuned.
5. [DE05-T05] Using Spark UI task-duration-distribution evidence (not a blind restart), diagnose whether a slow stage is caused by skew, insufficient parallelism, or genuinely larger volume, and identify the specific fix each diagnosis implies.
6. [DE05-T06] Diagnose, using the physical query plan and Spark UI shuffle metrics, whether this pipeline's cost problem is a compute-capacity problem or an unnecessary-data-volume problem, and justify why the correct fix targets the one that measured evidence actually shows.

## Deliverables

- A quarantine-plus-threshold DQ gate design reusing DV detection logic, with a justified threshold
- An Atlas-lineage/Ranger-access instrumentation plan naming each component's distinct role
- A four-part security-claim breakdown (authn/authz/encryption/masking) with verification evidence for each
- An SLA-risk alert design distinct from crash detection, with a stated reason the old alert can't cover it
- A Spark-UI-evidence-based skew/parallelism/volume diagnosis with the correct fix identified
- A measured compute-vs-data-volume cost diagnosis with the correct optimization lever justified

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
