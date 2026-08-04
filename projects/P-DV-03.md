# Checkpoint 3: The Shape of Data

*Format & pattern validation — the biggest single group, 32 techniques*

**Consolidates:** **G04 Format & Pattern** (32 techniques)

**Warm-ups (worked exercises):** [M04-E1](#lesson/M04-E1)

---

## Scenario

Marketing wants to email every customer; ops wants to call them. Nobody trusts the contact fields. Validate every format in [Customers](data-validation-lab/schemas/01_Customers.csv): emails, phones, postcodes, dates, and the IDs.

## Tasks

1. Email validation in three escalating passes: LIKE '%_@_%.__%', then structural checks (single @, no spaces, no consecutive dots), then a CASE-based verdict column (Valid / Fixable / Dead).
2. Phone: strip formatting with REPLACE chains, classify by country prefix, and flag numbers whose length is wrong for their Country.
3. Postcode vs Country: UK rows must match UK postcode shape (LIKE with ranges), Indian rows 6 digits, UAE "00000" is a known placeholder — flag it.
4. Dates: find any DOB/CreatedDate that fails ISDATE or violates ISO order, and any CreatedDate before company founding (2021).
5. Sweep the remaining shapes on all tables: fixed-length IDs, alpha-only names (allowing hyphen/apostrophe), no control characters (CHAR(9,10,13)), no HTML ('%<%'), no SQL-injection tell-tales ('%;%','%--%').

## Deliverables

- A validation .sql producing one verdict row per customer with per-field pass/fail flags
- Counts by failure type
- A regex/pattern cheat-sheet you wrote for reuse

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
