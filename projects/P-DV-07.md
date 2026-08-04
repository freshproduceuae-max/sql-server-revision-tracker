# Checkpoint 7: Time & History

*Timeliness, sequence gaps and slowly-changing dimensions*

**Consolidates:** **G09 Temporal & Timeliness** (11 techniques) + **G14 Data Warehouse & SCD** (9 techniques)

**Warm-ups (worked exercises):** [M09-E1](#lesson/M09-E1)

---

## Scenario

Sales targets have gaps and overlaps; transaction dates arrive out of order; and the business now wants customer history preserved, not overwritten. Fix time itself: [SalesTargets](data-validation-lab/schemas/06_SalesTargets.csv), [Transactions](data-validation-lab/schemas/05_Transactions.csv), then build an SCD2 customer dimension.

## Tasks

1. Gap detection: for each employee's target periods, find missing months using LAG (and a calendar CTE for the strict version).
2. Overlap detection: target periods that overlap for the same employee — LAG on start/end.
3. Sequence sanity on Transactions: NULL dates, future dates, and out-of-order TransactionID vs date pairs.
4. Design a customer SCD2 dimension: surrogate key, ValidFrom/ValidTo, IsCurrent. Load today's Customers as the initial state, then apply two invented changes (address move, email fix) with correct expiry.
5. Validate your own SCD2 (G14): no date-range overlaps, no gaps, exactly one IsCurrent per business key — as queries that return zero rows when healthy.

## Deliverables

- Gap & overlap report for SalesTargets
- SCD2 DDL + load script + the two applied changes
- The three SCD2 health checks, each returning zero rows

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
