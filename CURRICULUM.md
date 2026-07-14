# Interview Prep Curriculum
## Complete Study Plan — SQL Server, Azure, Data, Python + Tableau, SAS, CSAT, Leadership

> Each module = Teach → Practice → Quiz → Interview Q&A
> Target: 60–100% interview coverage across all roles

---

## Module Map

| # | Module | Topics | Est. Time |
|---|---|---|---|
| 1 | SQL Core — Ranking & Window Functions | ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, FIRST_VALUE, LAST_VALUE | 1.5 hrs |
| 2 | SQL Core — CTE, Temp Tables, Table Variables | Basic CTE, Recursive CTE, #Temp, ##Temp, @TableVar | 1 hr |
| 3 | SQL Core — Views, Stored Procedures, Functions | Views, SP with params, Scalar/Table UDFs | 1 hr |
| 4 | SQL Intermediate — Joins, Subqueries, CASE WHEN | INNER/LEFT/RIGHT/FULL/CROSS/SELF, Correlated subquery, CASE | 1.5 hrs |
| 5 | SQL Advanced — Data Validation | Duplicates, Nulls, Orphans, Reconciliation, Count checks | 1 hr |
| 6 | SQL Advanced — Aggregation & Grouping | GROUP BY, HAVING, ROLLUP, CUBE, GROUPING SETS | 1 hr |
| 7 | Data Warehousing | OLTP vs OLAP, Star/Snowflake, Facts, Dimensions, SCD Types | 1.5 hrs |
| 8 | SSIS — Control Flow | Tasks, Precedence, Variables, Error Handling | 1 hr |
| 9 | SSIS — Data Flow & Transformations | Lookup, Derived Column, Conditional Split, Merge, Aggregate | 1 hr |
| 10 | Power BI + DAX | Data Model, Relationships, CALCULATE, FILTER, RELATED, ALL | 1.5 hrs |
| 11 | Azure Fundamentals | IaaS/PaaS/SaaS, ADF, Synapse, Blob/ADLS, SQL DB | 1.5 hrs |
| 12 | Azure Data Engineering | ADF Pipelines, Linked Services, ADB, Delta Lake | 1.5 hrs |
| 13 | Big Data & Spark | Hadoop, HDFS, Spark Core, Partitioning, Hive | 1 hr |
| 14 | Python Core | Data types, loops, functions, OOP basics, error handling | 1 hr |
| 15 | Python for Data | Pandas, NumPy, PySpark DataFrames, pyodbc/sqlalchemy | 1.5 hrs |
| 16 | Data Profiling & Mapping | Profiling techniques, source-to-target mapping, mapping docs | 1 hr |
| 17 | Data Modelling & Design | Conceptual/Logical/Physical, ER diagrams, Normalisation | 1 hr |
| 18 | Data Lineage & Governance | Lineage, DAMA framework, stewardship, data quality | 1 hr |
| 19 | Business Systems Analyst | BRD, FSD, Gap Analysis, UAT, SIT, Process Mapping | 1 hr |
| 20 | Mock Interview — Full Round | 5 questions per area, timed, scored | 2 hrs |
| 21 | Tableau | Connect, Calculated Fields, LOD Expressions, Dashboards, Filters, Parameters, Story Points | 1.5 hrs |
| 22 | Advanced SQL | Window frames, PIVOT/UNPIVOT, Dynamic SQL, Query optimisation, Execution plans, Indexing | 1.5 hrs |
| 23 | SAS & Dashboard Development | SAS Base, PROC SQL, DATA step, SAS Studio, Dashboard design principles, KPI layout | 1.5 hrs |
| 24 | CSAT & Support Metrics | CSAT/NPS/CES, SLA/OLA, Ticket lifecycle, RCA, VOC, Escalation frameworks | 1 hr |
| 25 | L2 & L3 Support — Technical | Triage methodology, log analysis, DB diagnostics, performance issues, escalation to vendor | 1.5 hrs |
| 26 | Team Management & Leadership | 10-year manager mindset, 1:1s, performance reviews, conflict resolution, delegation, hiring, stakeholder comms | 2 hrs |

**Total Estimated Study Time: ~34 hours**

---

## Progress Tracker

| Module | Status | Score | Confidence |
|---|---|---|---|
| 1 — Ranking & Window | ✅ In Progress | 20.5/23 | 4/5 |
| 2 — CTE & Temp Tables | ⬜ Not Started | | |
| 3 — Views & Stored Procs | ⬜ Not Started | | |
| 4 — Joins & Subqueries | ⬜ Not Started | | |
| 5 — Data Validation | ⬜ Not Started | | |
| 6 — Aggregation | ⬜ Not Started | | |
| 7 — Data Warehousing | ⬜ Not Started | | |
| 8 — SSIS Control Flow | ⬜ Not Started | | |
| 9 — SSIS Data Flow | ⬜ Not Started | | |
| 10 — Power BI & DAX | ⬜ Not Started | | |
| 11 — Azure Fundamentals | ⬜ Not Started | | |
| 12 — Azure Data Eng | ⬜ Not Started | | |
| 13 — Big Data & Spark | ⬜ Not Started | | |
| 14 — Python Core | ⬜ Not Started | | |
| 15 — Python for Data | ⬜ Not Started | | |
| 16 — Data Profiling | ⬜ Not Started | | |
| 17 — Data Modelling | ⬜ Not Started | | |
| 18 — Data Lineage | ⬜ Not Started | | |
| 19 — BSA | ⬜ Not Started | | |
| 20 — Mock Interview | ⬜ Not Started | | |
| 21 — Tableau | ⬜ Not Started | | |
| 22 — Advanced SQL | ⬜ Not Started | | |
| 23 — SAS & Dashboards | ⬜ Not Started | | |
| 24 — CSAT & Support Metrics | ⬜ Not Started | | |
| 25 — L2 & L3 Support | ⬜ Not Started | | |
| 26 — Team Management | ⬜ Not Started | | |

---

## MODULE 1 — SQL Core: Ranking & Window Functions
**Status: ✅ In Progress**

### Taught
- ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE()
- LAG(), LEAD(), FIRST_VALUE(), LAST_VALUE()
- OVER(), PARTITION BY, ORDER BY
- Subquery pattern to filter ranked results
- Month-over-month growth with LAG()

### Quiz Score: 20.5 / 23
### Confidence: 4 / 5

### Top Interview Questions
1. What is the difference between RANK() and DENSE_RANK()?
2. How do you get the top 1 record per group?
3. How do you calculate month-over-month change?
4. What happens to the first row when using LAG()?
5. Why does LAST_VALUE() need a frame clause?

---

## MODULE 2 — SQL Core: CTE, Temp Tables, Table Variables

### Key Concepts
1. Basic CTE
2. Multiple CTEs
3. Recursive CTE
4. Local vs Global Temp Tables
5. Table Variables vs Temp Tables

### Top Interview Questions
1. What is a CTE and when would you use it?
2. What is the difference between a CTE and a subquery?
3. When would you use a temp table over a CTE?
4. What is the difference between #Temp and ##Temp?
5. What is the difference between a table variable and a temp table?

---

## MODULE 3 — SQL Core: Views, Stored Procedures, Functions

### Key Concepts
1. Creating and altering Views
2. Indexed Views
3. Stored Procedures with parameters
4. Scalar Functions vs Table-Valued Functions
5. EXEC vs sp_executesql

### Top Interview Questions
1. What is a view and why would you use one?
2. Can you UPDATE data through a view?
3. What is the difference between a stored procedure and a function?
4. What are input/output parameters in a stored procedure?
5. What is an indexed view?

---

## MODULE 4 — SQL Intermediate: Joins, Subqueries, CASE WHEN

### Key Concepts
1. INNER / LEFT / RIGHT / FULL OUTER JOIN
2. CROSS JOIN and SELF JOIN
3. Correlated vs non-correlated subquery
4. EXISTS vs IN
5. CASE WHEN (simple and searched)

### Top Interview Questions
1. What is the difference between LEFT JOIN and INNER JOIN?
2. What is a self join? Give an example.
3. What is the difference between EXISTS and IN?
4. When would you use a correlated subquery?
5. Write a CASE WHEN to categorise salary into Low/Mid/High.

---

## MODULE 5 — SQL Advanced: Data Validation

### Key Concepts
1. Finding duplicates (GROUP BY + HAVING)
2. Finding NULLs (IS NULL / ISNULL / COALESCE)
3. Finding orphaned records (LEFT JOIN + WHERE NULL)
4. Record count reconciliation
5. Aggregate validation (SUM checks, range checks)

### Top Interview Questions
1. How do you find duplicate rows in a table?
2. How do you find records in Table A that don't exist in Table B?
3. What is the difference between NULL and empty string?
4. How would you validate a data load was successful?
5. Write a query to find customers with more than one active account.

---

## MODULE 6 — SQL Advanced: Aggregation & Grouping

### Key Concepts
1. GROUP BY and HAVING
2. ROLLUP — subtotals and grand total
3. CUBE — all combinations
4. GROUPING SETS — custom combinations
5. GROUPING() function to identify totals

### Top Interview Questions
1. What is the difference between WHERE and HAVING?
2. What does ROLLUP do?
3. When would you use GROUPING SETS over ROLLUP?
4. What does the GROUPING() function return?
5. Write a query to show sales by Region, then a grand total row.

---

## MODULE 7 — Data Warehousing

### Key Concepts
1. OLTP vs OLAP
2. Star Schema vs Snowflake Schema
3. Fact Tables and Dimension Tables
4. Slowly Changing Dimensions (SCD) — Type 1, 2, 3
5. ETL vs ELT

### Top Interview Questions
1. What is the difference between OLTP and OLAP?
2. What is a fact table and what is a dimension table?
3. What is a Star Schema? What are its advantages?
4. What is a Slowly Changing Dimension Type 2?
5. What is the difference between ETL and ELT?

---

## MODULE 8 — SSIS: Control Flow

### Key Concepts
1. Control Flow overview and task types
2. Execute SQL Task
3. Script Task (C# / VB)
4. File System Task
5. Precedence Constraints and Variables

### Top Interview Questions
1. What is the difference between Control Flow and Data Flow in SSIS?
2. What does the Execute SQL Task do?
3. How do you handle errors in an SSIS package?
4. What are SSIS variables and how are they used?
5. What are precedence constraints?

---

## MODULE 9 — SSIS: Data Flow & Transformations

### Key Concepts
1. Data Flow — Source, Transformation, Destination
2. Lookup Transformation (full cache, partial cache, no cache)
3. Derived Column Transformation
4. Conditional Split Transformation
5. Merge vs Merge Join vs Union All

### Top Interview Questions
1. What is the Lookup transformation and when would you use it?
2. What is the difference between Merge and Union All?
3. What does Conditional Split do?
4. What is a Derived Column transformation?
5. How do you handle lookup failures (no match)?

---

## MODULE 10 — Power BI + DAX

### Key Concepts
1. Data model — tables and relationships
2. Star Schema in Power BI
3. DAX: CALCULATE, FILTER, ALL, ALLEXCEPT
4. DAX: RELATED, RELATEDTABLE
5. DAX: Time intelligence (SAMEPERIODLASTYEAR, DATESYTD)

### Top Interview Questions
1. What is the difference between a measure and a calculated column?
2. What does CALCULATE do?
3. What is the difference between ALL and ALLEXCEPT?
4. How does RELATED work and when would you use it?
5. How do you calculate Year-to-Date in DAX?

---

## MODULE 11 — Azure Fundamentals

### Key Concepts
1. Cloud service models — IaaS, PaaS, SaaS
2. Azure SQL Database vs SQL Server on VM
3. Azure Blob Storage vs Azure Data Lake Storage (ADLS)
4. Azure Data Factory (ADF) — overview
5. Azure Synapse Analytics — overview

### Top Interview Questions
1. What is the difference between IaaS and PaaS?
2. What is Azure Data Lake Storage and how is it different from Blob Storage?
3. What is Azure Data Factory used for?
4. What is Azure Synapse Analytics?
5. What is the difference between Azure SQL Database and SQL Server on a VM?

---

## MODULE 12 — Azure Data Engineering

### Key Concepts
1. ADF — Pipelines, Activities, Datasets, Linked Services
2. ADF — Triggers (schedule, tumbling window, event)
3. Azure Databricks (ADB) — clusters, notebooks, Delta Lake
4. Delta Lake — ACID transactions, time travel, schema enforcement
5. ADF vs SSIS — when to use which

### Top Interview Questions
1. What are the components of an ADF pipeline?
2. What is a Linked Service in ADF?
3. What is Azure Databricks used for?
4. What is Delta Lake and what problem does it solve?
5. When would you use ADF over SSIS?

---

## MODULE 13 — Big Data & Spark

### Key Concepts
1. Hadoop ecosystem — HDFS, YARN, MapReduce
2. Apache Spark — architecture (driver, executor, DAG)
3. RDD vs DataFrame vs Dataset
4. Partitioning and shuffling
5. Hive and HQL basics

### Top Interview Questions
1. What is the difference between Hadoop and Spark?
2. What is an RDD?
3. What is the difference between a transformation and an action in Spark?
4. What is partitioning and why does it matter?
5. What is Hive and when would you use it?

---

## MODULE 14 — Python Core

### Key Concepts
1. Data types, lists, dicts, sets, tuples
2. Loops and list comprehensions
3. Functions — args, kwargs, default params
4. Error handling — try/except/finally
5. OOP basics — class, __init__, inheritance

### Top Interview Questions
1. What is the difference between a list and a tuple?
2. What is a list comprehension? Write an example.
3. What is *args and **kwargs?
4. How does try/except work in Python?
5. Write a Python function that takes a list and returns only even numbers.

---

## MODULE 15 — Python for Data

### Key Concepts
1. Pandas — read_csv, DataFrame, head, info, describe
2. Pandas — groupby, merge, pivot_table, fillna, dropna
3. NumPy — arrays, operations, vectorisation
4. PySpark — SparkSession, read, filter, groupBy, join
5. Python SQL connectivity — pyodbc, sqlalchemy

### Top Interview Questions
1. How do you read a CSV file into a Pandas DataFrame?
2. What is the difference between merge() and join() in Pandas?
3. How do you handle missing values in Pandas?
4. How do you create a SparkSession in PySpark?
5. Write a PySpark query to get total sales by region.

---

## MODULE 16 — Data Profiling & Mapping

### Key Concepts
1. Data profiling — completeness, uniqueness, validity, consistency
2. Profiling using SQL queries
3. Source-to-target mapping documents
4. Transformation rules in mapping
5. Data quality scoring

### Top Interview Questions
1. What is data profiling and why do you do it?
2. What are the key dimensions of data quality?
3. What is a source-to-target mapping document?
4. How do you profile data using SQL?
5. How do you handle data quality issues found during profiling?

---

## MODULE 17 — Data Modelling & Design

### Key Concepts
1. Conceptual, Logical, Physical models
2. ER diagrams — entities, attributes, relationships
3. Normalisation — 1NF, 2NF, 3NF
4. Denormalisation — when and why
5. Dimensional modelling — facts and dimensions

### Top Interview Questions
1. What are the three levels of data modelling?
2. What is normalisation and why is it important?
3. What is the difference between 2NF and 3NF?
4. When would you denormalise a model?
5. What is the difference between a star schema and a snowflake schema?

---

## MODULE 18 — Data Lineage & Governance

### Key Concepts
1. Data lineage — source to consumption tracking
2. DAMA framework — 11 knowledge areas
3. Data stewardship roles and responsibilities
4. Metadata — technical, business, operational
5. Data quality rules and monitoring

### Top Interview Questions
1. What is data lineage and why is it important?
2. What is a data governance framework?
3. What is a data steward?
4. What is the difference between technical and business metadata?
5. How do you implement data quality checks in a pipeline?

---

## MODULE 19 — Business Systems Analyst

### Key Concepts
1. BRD — Business Requirements Document
2. FSD — Functional Specification Document
3. Gap Analysis — AS-IS vs TO-BE
4. Process Mapping — swimlane, BPMN
5. UAT and SIT — difference, approach, sign-off

### Top Interview Questions
1. What is the difference between a BRD and an FSD?
2. How do you conduct a gap analysis?
3. What is the difference between UAT and SIT?
4. How do you manage changing requirements mid-project?
5. How do you translate business requirements into data requirements?

---

## MODULE 20 — Full Mock Interview

### Format
- 5 questions per area
- You answer — coach scores and gives feedback
- Timer: 2 minutes per question (interview pace)

### Areas Covered
- SQL (5 Qs)
- Data Warehousing (5 Qs)
- SSIS (5 Qs)
- Power BI / DAX (5 Qs)
- Azure / ADF / ADB (5 Qs)
- Python / PySpark (5 Qs)
- Data Profiling & Governance (5 Qs)
- BSA (5 Qs)

**Total: 40 questions — Full interview simulation**

---

## How to Use This Curriculum

1. Say **"teach me module X"** — I'll give the full lesson with examples
2. Say **"test me on module X"** — I'll run the quiz
3. Say **"interview questions for module X"** — I'll ask them one by one
4. Say **"next"** — move to next topic within a module
5. Say **"mock interview"** — start the full 40-question simulation
6. Say **"where am I"** — I'll show your progress and scores

> Modules build on each other. Recommended order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15 → 16 → 17 → 18 → 19 → 20

---

## MODULE 21 — Tableau

### Key Concepts
- **Connecting data**: Excel, CSV, SQL Server, live vs extract
- **Dimensions vs Measures**: blue vs green pills, discrete vs continuous
- **Calculated Fields**: IF/ELSE, DATEPART(), DATEDIFF(), ZN(), IIF()
- **LOD Expressions**: FIXED, INCLUDE, EXCLUDE — when to use each
- **Table calculations**: RUNNING_SUM, WINDOW_AVG, RANK, LOOKUP
- **Filters order**: Extract → Data Source → Context → Dimension → Measure → Table Calc
- **Parameters**: dynamic input to calculations and filters
- **Dashboard actions**: filter actions, URL actions, highlight actions
- **Story Points**: narrating insights across multiple dashboards
- **Performance**: extracts over live, reducing rows, aggregation before display

### Top Interview Questions
1. What is the difference between a FIXED LOD and a table calculation?
2. How do you create a year-over-year comparison in Tableau?
3. When would you use a Context Filter?
4. How do you show Top N customers dynamically using a Parameter?
5. What is the filter order of operations in Tableau?

---

## MODULE 22 — Advanced SQL

### Key Concepts
- **Window frames**: ROWS BETWEEN, RANGE BETWEEN, UNBOUNDED PRECEDING/FOLLOWING
- **PIVOT / UNPIVOT**: rotating rows to columns and back
- **Dynamic SQL**: EXEC sp_executesql, building SQL strings safely
- **Query optimisation**: SARGable predicates, avoiding functions on indexed columns
- **Execution plans**: Clustered Index Scan vs Seek, Key Lookup, Hash Match, Nested Loop
- **Indexing strategy**: Covering indexes, included columns, composite indexes, fill factor
- **Statistics**: UPDATE STATISTICS, AUTO_UPDATE_STATISTICS, impact on plans
- **Partitioning**: partition by range, partition switching for fast deletes
- **TRY/CATCH + transactions**: XACT_ABORT, SAVE TRANSACTION, error logging
- **MERGE statement**: upsert pattern, WHEN MATCHED / NOT MATCHED

### Top Interview Questions
1. What makes a query non-SARGable and how do you fix it?
2. Explain the difference between a Clustered and Non-Clustered Index.
3. When would you use MERGE over INSERT/UPDATE separately?
4. How does PARTITION BY differ from GROUP BY in a window function?
5. What does a Key Lookup in an execution plan mean and how do you eliminate it?

---

## MODULE 23 — SAS & Dashboard Development

### Key Concepts
- **SAS Base**: DATA step, SET, MERGE, BY, IF/THEN/ELSE, DO loops, arrays
- **PROC SQL**: SELECT, JOIN, SUBQUERY — near-identical to T-SQL, runs in SAS engine
- **PROC FREQ / PROC MEANS / PROC UNIVARIATE**: profiling and descriptive stats
- **SAS Formats & Informats**: converting raw values, custom formats with PROC FORMAT
- **Macro language**: %LET, %IF, %DO, %MACRO/%MEND — parameterising code
- **SAS Studio / Enterprise Guide**: GUI vs code editor, project structure
- **Dashboard design principles**: single metric per tile, traffic lights, hierarchy of attention
- **KPI layout**: scorecard → trend → breakdown → detail (drill pattern)
- **Colour rules**: red/amber/green only for status, avoid rainbow
- **Storytelling**: lead with the answer, support with data

### Top Interview Questions
1. What is the difference between a DATA step MERGE and PROC SQL JOIN?
2. How do you handle duplicate rows in a SAS MERGE?
3. What is a SAS macro and when would you use one?
4. How do you profile a dataset quickly in SAS?
5. What makes a dashboard effective vs cluttered?

---

## MODULE 24 — CSAT & Support Metrics

### Key Concepts
- **CSAT**: Customer Satisfaction Score — post-interaction survey (1–5 or 1–10), % scoring 4–5
- **NPS**: Net Promoter Score = % Promoters (9–10) minus % Detractors (0–6)
- **CES**: Customer Effort Score — how easy was it to resolve? Lower effort = better
- **SLA**: Service Level Agreement — contracted response/resolution times (e.g. P1 = 1hr response)
- **OLA**: Operational Level Agreement — internal team SLA, feeds the SLA
- **Ticket lifecycle**: Open → Assigned → In Progress → Pending → Resolved → Closed
- **Priority matrix**: Impact × Urgency = Priority (P1/P2/P3/P4)
- **RCA — Root Cause Analysis**: 5 Whys, fishbone diagram, timeline reconstruction
- **VOC — Voice of Customer**: verbatim feedback analysis, theme clustering
- **Escalation framework**: L1 → L2 → L3 → Vendor, with criteria and SLA clock rules

### Top Interview Questions
1. What is the difference between CSAT and NPS and when do you use each?
2. How do you calculate SLA compliance rate in SQL?
3. Walk me through how you would do an RCA on a recurring incident.
4. How do you handle a situation where SLA is about to breach?
5. What is the difference between SLA and OLA?

---

## MODULE 25 — L2 & L3 Support — Technical

### Key Concepts
- **L1 / L2 / L3 split**:
  - L1: triage, password resets, known fixes, scripts
  - L2: deeper investigation, config changes, DB queries, log analysis
  - L3: root cause, code fixes, architecture changes, vendor escalation
- **Triage methodology**: reproduce → isolate → narrow → fix → document
- **Log analysis**: SQL Server error logs, Windows Event Viewer, application logs
- **DB diagnostics**: sp_who2, sys.dm_exec_requests, blocking chains, deadlocks
- **Performance issues**: missing indexes, long-running queries, tempdb contention
- **Escalation to vendor**: case documentation, steps to reproduce, logs package
- **Change management**: RFC, CAB approval, rollback plan, change freeze
- **Known Error Database (KEDB)**: reusable resolution documentation
- **Post-Incident Review (PIR)**: what happened, impact, root cause, prevention

### Top Interview Questions
1. How do you identify a blocking chain in SQL Server?
2. What is the difference between L2 and L3 support?
3. Walk me through how you would diagnose a slow SQL query in production.
4. How do you decide when to escalate vs resolve yourself?
5. What information do you include in an escalation to a vendor?

---

## MODULE 26 — Team Management & Leadership (10-Year Manager Mindset)

### Key Concepts
- **1:1 meetings**: weekly cadence, their agenda not yours, coaching not status update
- **Performance management**: OKRs vs KPIs, mid-year reviews, PIP process, recognition
- **Delegation**: delegate the outcome, not the task — explain the WHY, set checkpoints
- **Hiring**: competency-based interviews, structured scoring, culture add vs culture fit
- **Conflict resolution**: separate people from problems, private first, document if repeated
- **Stakeholder communication**: executive summary (3 bullets) + detail on request
- **Difficult conversations**: SBI framework — Situation, Behaviour, Impact
- **Team health**: psychological safety, blameless post-mortems, celebrating failure-learning
- **Coaching vs managing**: manager sets direction and removes blockers; coach asks questions
- **Burnout signals**: quality drop, missed deadlines, withdrawal — intervene early
- **Managing up**: keep manager informed, surface risks early, bring solutions not problems
- **Strategic thinking**: connecting team output to business outcomes, quarterly roadmap

### Top Interview Questions
1. Tell me about a time you had to manage a low performer.
2. How do you prioritise workload across your team when everything is urgent?
3. How do you build trust with a new team quickly?
4. Describe how you handled a conflict between two team members.
5. How do you keep senior stakeholders informed without overwhelming them?

---

## UPDATED MOCK INTERVIEW — Modules 1–26

### Additional Areas (added to the 40-question round)
- Tableau (5 Qs)
- Advanced SQL (5 Qs)
- SAS & Dashboards (5 Qs)
- CSAT & Support (5 Qs)
- L2/L3 Technical Support (5 Qs)
- Team Management & Leadership (5 Qs)

**Extended Mock: 70 questions — Full multi-role simulation**

