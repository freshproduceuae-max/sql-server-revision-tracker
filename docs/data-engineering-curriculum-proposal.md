# Data Engineering — PySpark, Python & Cloudera: curriculum

**Status: approved as the final 36-lesson/6-chapter/6-checkpoint target.**
Reviewed by Codex (`PASS_WITH_FIXES` — all findings applied, see the
inline "Codex review finding" notes throughout this document) before
approval. Written for the GSSTech Group "Sr. Data Engineer - PySpark,
Python & Cloudera (CDP)" posting (Dubai, banking/transaction-banking
domain).

**Build authorization is phased, separate from this curriculum approval.**
Only **Phase 1** — new-track infrastructure plus Chapter 1 (6 lessons,
its checkpoint `P-DE-01`, and one practical exercise) — is authorized as
of this document's move into `docs/`. Chapters 2–6, Teacher MCQs for any
chapter, and deployment are not authorized until reviewed separately after
Phase 1 lands. See `HANDOFF.md`'s Data Engineering section for the current
phase status.

Grounded against current documentation (not solely training-data memory):
Spark is at the 4.x line (PySpark 4.2.0, July 2026) with Spark Connect,
native plotting API, Python Data Source API. Cloudera Data Platform's
current architecture centers on SDX (Shared Data Experience) for shared
governance/security, Apache Ozone as the modern successor object store to
raw HDFS, Apache Iceberg as the lakehouse table format integrated into SDX,
and a Kubernetes-based container architecture for CDP Public/Private Cloud.
Classic HDFS/Hive/YARN still matter (most real enterprise CDP estates run
mixed classic + modern), so the curriculum covers both rather than only the
newest layer.

Sources: [PySpark 4.2.0 documentation](https://spark.apache.org/docs/latest/api/python/index.html), [Spark Release 4.0.0](https://spark.apache.org/releases/spark-release-4-0-0.html), [Cloudera on Cloud: June 2026 Release Summary](https://docs.cloudera.com/cdp-public-cloud/cloud/release-summaries/index.html), [What Is Apache Ozone? | Cloudera](https://www.cloudera.com/resources/faqs/apache-ozone.html), [Iceberg introduction (Cloudera docs)](https://docs.cloudera.com/cdw-runtime/1.5.4/iceberg-overview/topics/dw-pvc-iceberg-overview.html)

---

## 1. Lesson-title catalogue (36 lessons, 6 chapters × 6 lessons)

### Chapter 1 — Python, SQL and Data Engineering Foundations
1. Python for Data Engineers — idiomatic patterns, typing, packaging for pipeline code
2. SQL for Data Engineers — window functions, CTEs, query-plan-aware writing (builds on Data Validation, does not repeat it — see §4)
3. Data Modelling for Analytics — star schema, normalization vs. denormalization tradeoffs
4. REST APIs and Data Integration Patterns — polling vs. webhook, pagination, auth for ingestion
5. Git and CI-Aware Workflow for Data Pipelines — branching for pipeline code, PR review discipline
6. The Enterprise Data Engineer Role — stakeholder collaboration (architects, DS, POs), Agile/Scrum ceremonies in a DE context

### Chapter 2 — PySpark and Distributed Data Processing
1. Spark Architecture — driver/executor model, DAGs, lazy evaluation, Catalyst optimizer
2. DataFrames and Spark SQL — transformations vs. actions, schema enforcement on read
3. Partitioning and Shuffle — data skew, repartition vs. coalesce, shuffle cost
4. Joins at Scale — broadcast joins, sort-merge joins, choosing a join strategy
5. Structured Streaming — micro-batch vs. continuous processing, watermarking, exactly-once semantics
6. Spark Performance Tuning — caching, Adaptive Query Execution (AQE), executor sizing

### Chapter 3 — Enterprise ETL/ELT, Ingestion and Data Modelling
1. Batch vs. Streaming Ingestion Design — choosing the right pattern per source system
2. Idempotent, Re-runnable Pipeline Design — checkpointing, exactly-once writes
3. Schema Evolution and Contract Management — Avro/Parquet schema evolution, breaking-change handling
4. Slowly Changing Dimensions at Scale — SCD Type 2 implemented in a Spark pipeline (builds on Data Validation G14, does not repeat it)
5. Data Lake vs. Data Warehouse vs. Lakehouse — Iceberg table format, when each pattern fits
6. Designing Metadata-Driven Ingestion Frameworks — one reusable framework across many source systems

### Chapter 4 — Hadoop Ecosystem and Cloudera Data Platform
1. HDFS and Apache Ozone — classic HDFS concepts plus Ozone as the modern successor object store
2. Hive and Impala — SQL-on-Hadoop, the metastore, choosing an engine
3. YARN and Cluster Resource Management — resource allocation, queue management, container tuning
4. Cloudera Data Platform Architecture — SDX, Cloudera Manager, CDP Public vs. Private Cloud
5. Apache Iceberg and the Lakehouse on CDP — table format, time travel, schema evolution in production
6. Kafka for Enterprise Event Streaming — topics/partitions/consumer groups feeding Spark jobs

### Chapter 5 — Data Quality, Governance, Security, Observability and Spark Optimization
1. Data Quality Gates in a Spark Pipeline — fail-fast vs. quarantine, applying data-quality discipline at scale (explicitly builds on Data Validation G01–G19 — see §4)
2. Data Governance and Lineage on CDP — SDX governance layer, lineage tracking
3. Security in Enterprise Data Platforms — access control, encryption at rest/in transit, PII handling in banking data
4. Pipeline Observability and Monitoring — job metrics, alerting, SLA tracking
5. Debugging Failed Spark Jobs — reading the Spark UI, diagnosing OOM/skew/stage failures from real symptoms
6. Cost and Resource Optimization at Scale — cluster right-sizing, cost-aware scheduling, query cost analysis

### Chapter 6 — Production Engineering: Orchestration, CI/CD, Containers, ML Data, Operations
1. Orchestrating Multi-Stage Spark Pipelines — DAG design for dependent jobs
2. CI/CD for Data Pipelines — testing Spark code, deployment pipelines, environment promotion
3. Containerizing Data Engineering Workloads — Docker for Spark jobs, dependency management
4. Kubernetes for Data Platforms — Spark-on-Kubernetes, CDP's container-based architecture
5. Preparing Datasets for Machine Learning — feature engineering at scale, train/serve skew
6. Pipeline Resilience, Recovery and On-Call Production Support — retries, backfills, checkpoint recovery, replay safety, SLA-based reruns, triage playbooks, incident response (ties directly to the JD's "ensure... availability" and "monitor, troubleshoot, resolve production issues" — Codex review finding: the original title covered incident response but not the underlying resilience/recovery mechanics the JD's "availability" requirement actually needs)

---

## 2. Coverage matrix — GSSTech JD responsibilities/skills → lessons

| JD item | Lessons |
|---|---|
| Design/build/maintain scalable PySpark/Python pipelines | Ch1-T01, Ch2 (all) |
| CDP batch/distributed processing | Ch4 (all) |
| ETL/ELT for structured/unstructured data | Ch3-T01, T02, T03, T05, T06 |
| Scalable ingestion frameworks | Ch3-T01, T06 |
| Data quality, integrity, governance, availability | Ch5-T01, T02; **availability specifically** → Ch6-T06 (resilience/recovery mechanics: retries, backfills, checkpoint recovery, replay safety, SLA-based reruns) |
| Data profiling, cleansing, transformation, validation | Ch5-T01 (+ references DV G01–G19) |
| Optimize Spark jobs (performance, scalability, resource use) | Ch2-T03, T04, T06; Ch5-T05, T06 |
| Prepare datasets for DS/ML use cases | Ch6-T05 |
| Collaborate with POs/BAs/Architects/engineering | Ch1-T06 |
| Monitor/troubleshoot/resolve production pipeline issues | Ch5-T04, T05; Ch6-T06 (including resilience/recovery mechanics, not just triage) |
| Code reviews / engineering best practices | Ch1-T05, Ch6-T02 |
| Technical documentation / DE standards | Ch1-T06 (folded into role-practice framing) |
| Continuous improvement of platforms/processes | Ch6-T06 |
| Agile/Scrum ceremonies | Ch1-T06 |
| **Required skill:** Python | Ch1-T01 |
| **Required skill:** PySpark | Ch2 (all) |
| **Required skill:** Cloudera Data Platform (CDP) | Ch4 (all) |
| **Required skill:** distributed processing frameworks | Ch2-T01, T03, T04 |
| **Required skill:** enterprise-scale ETL/ELT | Ch3 (all) |
| **Required skill:** Big Data technologies | Ch2, Ch4 |
| **Required skill:** Hadoop ecosystem | Ch4-T01, T02, T03, T06 |
| **Required skill:** SQL programming/query optimization | Ch1-T02 (+ references DV content) |
| **Required skill:** data modelling/transformation | Ch1-T03, Ch3-T04, T05 |
| **Required skill:** data quality/validation/governance | Ch5-T01, T02 |
| **Required skill:** Git/version control | Ch1-T05 |
| **Required skill:** CI/CD for data engineering | Ch6-T02 |
| **Required skill:** REST APIs/data integration patterns | Ch1-T04 |
| **Required skill:** structured/semi-structured/unstructured data | Structured/semi-structured genuinely covered: Ch2-T02, Ch3-T03. **Unstructured data is only a contextual constraint in those lessons, not its own topic** (Codex review finding — the original mapping overstated this). If dedicated unstructured-data handling (e.g. binary/log/document ingestion patterns) is wanted, that needs an explicit scope addition; as scoped today it is intentionally light. |
| **Nice-to-have:** cloud-native data platforms | Ch4-T04 (CDP Public Cloud) |
| **Nice-to-have:** ML data pipelines / feature engineering | Ch6-T05 |
| **Nice-to-have:** workflow orchestration | Ch6-T01 |
| **Nice-to-have:** Docker / Kubernetes | Ch6-T03, T04 |
| **Nice-to-have:** DevOps practices for DE | Ch6-T02, T03, T04 |
| **Competencies** (analytical, communication, stakeholder mgmt, Agile, ownership, debugging, prioritization) | Woven into scenario framing across Ch1-T06, Ch5-T05, Ch6-T06 — matching how this app already teaches soft skills (scenario-embedded, not standalone modules) rather than as separate lessons |
| **Domain preference** (Banking, Financial Services, Digital Products, Transaction Banking) | Threaded through lesson scenarios per your instruction, not a standalone lesson |

**Coverage gaps, honestly stated (revised after Codex review):** the core
JD responsibilities are covered, but two items needed explicit fixes rather
than being left as an overstated table claim:
- **Availability/resilience** was originally folded silently into
  "monitor/troubleshoot" without its own scope — fixed by expanding
  Ch6-T06 to explicitly cover resilience/recovery mechanics (retries,
  backfills, checkpoint recovery, replay safety, SLA-based reruns), not
  just incident triage.
- **Unstructured data** is only a contextual constraint inside Ch2-T02/
  Ch3-T03, not a dedicated topic — this is intentionally light as scoped,
  not silently covered; called out explicitly above rather than left
  implicit in the coverage table.
- Kubernetes (Ch6-T04, one lesson) is also intentionally shallow, matching
  its "nice to have" status in the posting.

---

## 3. Prerequisites and essential/advanced/nice-to-have

**Prerequisite order:** Ch1 → Ch2 → **Ch3 and Ch4 can run in parallel after
Ch2 where helpful** (revised per Codex review: the original "both assume
Ch2's Spark literacy" framing understated Ch4 — YARN/Hive/Impala/CDP
architecture are foundational platform knowledge in their own right, not
merely a second application of Spark skills, and a learner could
reasonably take Ch4 before or alongside Ch3) → Ch5 (assumes Ch2–4) → Ch6
(assumes all prior).

**Essential — job-ready baseline for this exact posting:**
Ch1 (all 6), Ch2-T01–T04, Ch3-T01/T02/T04, Ch4-T01/T02/T04, Ch5-T01/T04/T05,
Ch6-T01/T02/T06.

**Advanced / senior-level (8–10-year differentiators the posting explicitly
expects at this seniority):**
Ch2-T05/T06, Ch3-T03/T05/T06, Ch4-T03/T05/T06, Ch5-T02/T03/T06, Ch6-T04.

**Optional / nice-to-have (matches the JD's own "Nice to Have" section,
not required for a baseline job-ready pass):**
Ch6-T03 (Docker), Ch6-T04 (Kubernetes), Ch6-T05 (ML dataset prep) — these
three map directly to the JD's three "Nice to Have" bullets (containerization,
ML pipelines, feature engineering) and are the lessons a learner could skip
first if trading depth for speed.

---

## 4. Existing Academy content to reference, not duplicate

- **Data Validation G01–G19** (SQL Server-focused, already live): the entire
  data-quality *concept* vocabulary (completeness, uniqueness, referential
  integrity, format/pattern validation, business-rule enforcement,
  reconciliation) is already taught in depth there. Ch5-T01 (Data Quality
  Gates in a Spark Pipeline) and Ch1-T02 (SQL for Data Engineers) should
  explicitly point back to specific DV groups as "you already know this
  concept — here's how it applies at Spark scale" rather than re-teach the
  concepts from zero. **This must be an enforced constraint on the lesson
  brief, not just an intention** (Codex review finding: as originally
  worded, Ch1-T02 and Ch5-T01 were broad enough to drift into re-teaching
  DV concepts from scratch rather than building on them) — each lesson
  brief for Ch1-T02 and Ch5-T01 must state which specific DV group/concept
  the lesson assumes the learner already knows, and cover only what
  differs at Spark/CDP scale, before being written.
- **Data Validation G14** (Data Warehouse & SCD-specific techniques): Ch3-T04
  (Slowly Changing Dimensions at Scale) should reference G14 directly for
  the SCD2 mechanics and only add what changes when implementing it in a
  distributed pipeline rather than a single SQL Server table.
- **Credit Risk track** (banking domain lessons, KYC/onboarding, transaction
  lifecycle): source of banking-domain vocabulary and scenario grounding for
  the "banking and transaction-banking examples where appropriate"
  requirement — referenced for domain framing in scenario text, not
  duplicated as separate lessons.
- **AI Supercourse quiz bank** (LLM/RAG/Agentic/MCP topics): checked, no
  material overlap with this curriculum — different domain entirely.

---

## 5. Proposed checkpoints (6, one per chapter) with a practical exercise each

| Checkpoint | Chapter | Practical exercise |
|---|---|---|
| P-DE-01 · Foundations | 1 | Build a small metadata-driven ingestion script that reads from a REST API and writes into a modeled table |
| P-DE-02 · Distributed Processing | 2 | Diagnose and fix a skewed join, then tune a slow Spark job using AQE |
| P-DE-03 · Enterprise Pipelines | 3 | Design an idempotent SCD Type 2 pipeline for a transaction-banking customer table |
| P-DE-04 · Hadoop & Cloudera | 4 | Build a Kafka-to-Iceberg ingestion path with Hive/Impala query access on top |
| P-DE-05 · Quality, Governance & Optimization | 5 | Build a data-quality gate that fails a pipeline on threshold breach, with lineage/governance tagging |
| P-DE-06 · Production Engineering | 6 | Orchestrate the full pipeline end-to-end, containerize it, and write a resilience/recovery runbook (retries, backfill, checkpoint recovery) plus an on-call triage guide |

Matches the existing app's checkpoint pattern (full-page timeline + brief,
never a dialog, unlocks when covered lessons are complete). Separate
registry entry (`projPrefix: 'P-DE-'`), separate from Data Validation's
`P-DV-` prefix and 10 existing checkpoints — **no existing checkpoint file
or coverage changes.**

---

## 6. Technical currency notes (from documentation, not memory alone)

- PySpark 4.x is current (4.2.0 as of July 2026) — lessons should teach
  against 4.x behavior (e.g. Spark Connect, native plotting API, Python
  Data Source API) as the primary version, while noting where 3.x behavior
  differs materially (most enterprise clusters lag current releases by 1–2
  major versions in practice, so this is a real, not academic, distinction).
- **(Corrected per Codex review — the original wording overstated this)**
  Current CDP deployments commonly include Kubernetes-based services and
  containerized data engineering runtimes, with SDX as the shared
  governance/security layer — but mixed classic estates (HDFS/Hive/Impala,
  Cloudera Manager as the primary operational interface) remain genuinely
  common in production, not a legacy model being fully phased out. Ch4-T04
  should teach both the classic Cloudera Manager-centric operational model
  and the newer containerized/Kubernetes services as coexisting realities a
  new hire will likely encounter, not present Kubernetes as having replaced
  the whole platform.
- Apache Ozone is the modern successor to raw HDFS in current CDP, but HDFS
  itself remains extremely common in real deployments — Ch4-T01 teaches
  both, HDFS first (still the more likely thing a new hire encounters day
  one) then Ozone as where the platform is heading.
- Iceberg is the lakehouse table format Cloudera has standardized on
  (integrated into SDX and Ozone) — Ch3-T05 and Ch4-T05 should use Iceberg
  as the primary lakehouse example rather than a generic "data lake"
  treatment.

---

## 7. Teacher MCQs (per your direction)

3–5 questions per lesson, scaled to complexity, not padded to a fixed
count. Every lesson's question set must include at least one of: a
reasoning/diagnostic question (not pure terminology), a debugging scenario
(reading a real symptom — a stack trace, a Spark UI screenshot description,
a skewed-stage summary — and identifying the cause), or a performance
scenario (choosing between two real approaches under stated constraints) —
per your instruction that these should test more than vocabulary. Authored
via the established Claude-authors/Codex-blind-reviews reverse-pilot
process, as its own follow-on authorization after lesson content is
approved and built — not part of this curriculum approval.

---

## 8. Effort estimate

Rough sizing, not committed. **Revised upward per Codex review** — the
original "several days" figure for lesson content was optimistic given
this app's actual lesson depth and the fact this is genuinely new
technical territory for the app (distributed systems, Hadoop, Kubernetes),
not an extension of an already-mastered domain like DV/Credit Risk:
- **Lesson content** (36 lessons, each needs a live scenario + solution
  code + explanation, matching the depth of existing DV/Credit Risk/BA
  lessons): **multiple weeks of authored content work, plus review/
  verification time** — bigger than the raw lesson count suggests
  because PySpark/Cloudera lessons need runnable-looking code examples
  grounded in real Spark/CDP behavior, not just prose, and each needs
  independent technical verification (see §6 — checking against current
  docs, not assumed from memory) the way DV's SQL lessons get checked
  against real T-SQL semantics.
- **Build tooling** (new `scripts/build-de-lessons.js`, `TRACKS` registry
  entry, `contentUrl()` branch, hero/path body, loader, `vercel.json`
  builds entry, 6 new checkpoint briefs + `projects/index.json` entries):
  half a day to a day, following the exact pattern `scripts/build-ea-lessons.js`
  already established for a same-shaped track.
- **Teacher MCQs** (36 lessons × 3–5 questions ≈ 130–180 questions): a
  separate multi-PR programme following the same per-group,
  Codex-blind-reviewed pipeline as G01–G19 — comparable total effort to
  roughly two of the G12–G19-style groups.

---

## 9. Pros and cons

**Pros:** directly answers a real, current job posting with no existing
coverage; clean separation from Data Validation (new registry prefix, new
build script, zero risk to G01–G19's 236 lessons/708 questions or its 10
checkpoints); explicitly references rather than duplicates existing DV/
Credit Risk content, keeping the new track lean; grounded against current
Spark/Cloudera documentation rather than assumed from training-data memory.

**Cons:** genuinely large body of new technical content (36 lessons across
a domain — distributed systems, Hadoop ecosystem, Kubernetes — this app has
not taught before, unlike DV/Credit Risk which extend established SQL/
banking domains already proven out); each lesson needs real technical
verification against current Spark/Cloudera behavior, which is slower per-
lesson than authoring within an already-mastered domain; a second
authorization (Teacher MCQs) is implied as a near-certain follow-on once
lessons land, roughly doubling total programme length if both phases run.
