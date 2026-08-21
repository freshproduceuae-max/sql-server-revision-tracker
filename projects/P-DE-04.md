# Checkpoint 4: Diagnose a Mixed HDFS/Ozone, YARN and Kafka Estate

*One scenario, all six Chapter 4 skills: HDFS vs Ozone, Hive vs Impala, YARN queues, CDP deployment models, Iceberg-on-CDP, Kafka partitioning*

**Consolidates:** **DE04 Hadoop Ecosystem and Cloudera Data Platform** (6 lessons)

---

## Scenario

The bank's CDP Private Cloud Base cluster is showing four unrelated-looking symptoms in the same week: NameNode memory pressure traced to a specific workload, compliance analysts complaining an ad-hoc lookup takes 20-40 seconds, a fraud-detection streaming job being starved of executors during a batch spike despite supposedly guaranteed resources, and a Kafka consumer group with one wildly lagging instance while three sit idle. A new platform engineer, hired expecting a fully Kubernetes-native CDP, wants to "just re-architect everything onto containers." You are asked to diagnose each symptom on its own technical merits and propose the actual fix for each -- not a platform-wide rewrite.

## Tasks

1. [DE04-T01] Diagnose which specific workload is driving NameNode memory pressure (using file count, not byte volume, as the signal), and decide whether it should move to Apache Ozone or stay on HDFS -- justify why moving the wrong workload would leave the pressure unresolved.
2. [DE04-T02] Explain why routing both the analysts' ad-hoc lookups and the nightly batch rebuild through the same engine produced the analysts' 20-40 second responses, and redesign which workload runs on Hive versus Impala, referencing each engine's actual execution model.
3. [DE04-T03] Redesign the YARN capacity scheduler configuration (queues, capacity, maximum-capacity, preemption) so the fraud-detection streaming job's guaranteed resources are an enforced floor, not a soft target -- and explain why a single undifferentiated queue could never have enforced that guarantee.
4. [DE04-T04] Correct the new engineer's "just re-architect everything onto containers" framing: explain what CDP Private Cloud Base actually is, where CDP genuinely does run containerized services, and where SDX governance fits across both models -- state one concrete risk of a wholesale container migration given what Chapter 4 established about mixed real estates.
5. [DE04-T05] Diagnose whether the cluster's HMS partition-tracking slowdown is an inherent Hive cost or an Iceberg-integration misconfiguration, and design a time-travel query for the compliance team's pre-correction lookup requirement without a separate backup table.
6. [DE04-T06] Diagnose why the Kafka consumer group's lag concentrated on one instance rather than spreading evenly, propose a fix that preserves per-card ordering, and design a replay mechanism for the last 24 hours of events that does not touch the live consumer group's state.

## Deliverables

- A NameNode-pressure diagnosis with a justified HDFS-vs-Ozone workload placement
- A Hive-vs-Impala engine-assignment fix grounded in each engine's execution model
- A capacity-scheduler redesign with an enforced guaranteed-resource floor
- A corrected CDP deployment-model explanation with one concrete container-migration risk
- An HMS-bottleneck diagnosis plus a working time-travel query, no backup table
- A Kafka key-skew diagnosis with an ordering-preserving fix and an isolated replay design

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
