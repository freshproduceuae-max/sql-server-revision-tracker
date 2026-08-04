# Checkpoint 4: Out of Bounds

*Range, boundary and statistical outliers on Orders & Transactions*

**Consolidates:** **G05 Range & Boundary** (21 techniques) + **G12 Statistical & Analytical** (8 techniques)

**Warm-ups (worked exercises):** [M05-E1](#lesson/M05-E1) · [M05-E2](#lesson/M05-E2) · [M10-E1](#lesson/M10-E1)

---

## Scenario

Finance found a £99,999,999.99 transaction and a −£1,000 sales target. Bound every numeric and date field in [Orders](data-validation-lab/schemas/02_Orders.csv), [Transactions](data-validation-lab/schemas/05_Transactions.csv) and [SalesTargets](data-validation-lab/schemas/06_SalesTargets.csv), then separate typos from genuine extremes statistically.

## Tasks

1. Hard bounds (G05): negatives where impossible (Quantity, UnitPrice, Amounts), zeros where suspicious, future dates, ShipDate before OrderDate, DOB implying minors or >100 years old.
2. Consistency of magnitude: order lines where TotalAmount differs from Quantity×UnitPrice by more than 1p (tolerance check with ABS and DECIMAL casting).
3. Z-score outliers (G12): flag Transactions beyond ±3σ of the mean Amount; report each with its z.
4. IQR outliers: compute Q1/Q3 with PERCENTILE_CONT, flag beyond 1.5×IQR, and compare the two methods' catch — which found the £99m row, and which found subtler ones?
5. Benford check (bonus): first-digit distribution of Amount vs expectation — worth a comment, not a verdict, at n=20.

## Deliverables

- A bounds report by table/column
- The two outlier lists with method comparison (≤1 page)
- A recommendation: which rows to correct, which to investigate, which to accept

## Definition of done

- Every check is a runnable query, not a description of one
- Each finding names the exact rows (IDs), not just counts
- Your .sql re-runs cleanly top-to-bottom on a fresh load

---

*Complete all techniques in the covered groups, work the checkpoint, then mark it done to bank the milestone.*
