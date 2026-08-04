# Checkpoint 8: Know Your Data

*Type integrity and a full profiling pack across all six tables*

**Consolidates:** **G10 Data Type & Storage** (10 techniques) + **G11 Profiling** (10 techniques)

---

## Scenario

Before the next migration, the team wants a data dictionary that tells the truth: what is actually *in* every column of all six lab tables, and where the declared type and the real content disagree.

## Tasks

1. Type mismatch hunt (G10): numbers stored as text (TRY_CAST fails vs succeeds), dates stored as text, boolean-ish columns with mixed encodings (0/1/Y/N), and values that would truncate on a tighter type.
2. Profile every column (G11): distinct count, NULL rate, min/max, top-5 values with frequencies — via a metadata-driven query over INFORMATION_SCHEMA, not 60 hand-written SELECTs.
3. Length profiling on text columns: min/max/avg LEN; flag columns where max length is near the declared limit.
4. Uniqueness ratios: distinct/total per column — which columns are secretly keys, and which "key" columns aren't?
5. Assemble the data dictionary: one row per column with type, observed type verdict, null rate, cardinality class, and a keep/fix/investigate flag.

## Deliverables

- The metadata-driven profiling script
- The generated data dictionary (query output)
- Top-10 type-risk findings for the migration team

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
