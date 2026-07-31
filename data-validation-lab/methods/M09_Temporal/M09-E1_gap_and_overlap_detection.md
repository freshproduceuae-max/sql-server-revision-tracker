# M09 — Temporal | Example 1: Gap and Overlap Detection in Date Sequences

## The Question
> The finance team tracks sales targets by quarter, and the HR system tracks employment
> periods. Both require contiguous date coverage with no gaps and no overlaps.
> **"Check the SalesTargets table for any employee who has a gap in their quarterly
> coverage (e.g., Q1 recorded but Q2 missing), and check the Transactions table
> for any days where no transactions were recorded (potential system outage or data gap)."**

---

## Table References
**SalesTargets** — `schemas/06_SalesTargets.csv`
**Transactions** — `schemas/05_Transactions.csv`

---

## Solution Query

```sql
-- Check 1: Missing quarter coverage per employee using LAG()
-- (Detects: Q1 recorded, Q3 recorded, Q2 missing)
WITH QuarterlyRank AS (
    SELECT
        EmployeeID,
        Year,
        Quarter,
        ROW_NUMBER() OVER (PARTITION BY EmployeeID, Year ORDER BY Quarter) AS QuarterSeq
    FROM SalesTargets
    GROUP BY EmployeeID, Year, Quarter
),
Lagged AS (
    SELECT
        EmployeeID,
        Year,
        Quarter,
        QuarterSeq,
        LAG(Quarter) OVER (PARTITION BY EmployeeID, Year ORDER BY Quarter) AS PrevQuarter
    FROM QuarterlyRank
)
SELECT
    EmployeeID,
    Year,
    PrevQuarter AS LastQuarterRecorded,
    Quarter     AS NextQuarterRecorded,
    'Gap detected between ' + PrevQuarter + ' and ' + Quarter AS GapFlag
FROM Lagged
WHERE PrevQuarter IS NOT NULL
  AND CAST(RIGHT(Quarter,1) AS INT) - CAST(RIGHT(PrevQuarter,1) AS INT) > 1;

-- Check 2: Transaction date gaps — days with no transactions
-- Generate a calendar of expected dates, then find which ones have no transactions
WITH DateRange AS (
    SELECT MIN(CAST(TransactionDate AS DATE)) AS StartDate,
           MAX(CAST(TransactionDate AS DATE)) AS EndDate
    FROM Transactions
    WHERE TransactionDate IS NOT NULL
),
Calendar AS (
    SELECT CAST(StartDate AS DATE) AS CalDate
    FROM DateRange
    UNION ALL
    SELECT DATEADD(DAY, 1, CalDate)
    FROM Calendar
    JOIN DateRange ON CalDate < EndDate
)
SELECT
    c.CalDate AS MissingDate,
    DATENAME(WEEKDAY, c.CalDate) AS DayOfWeek,
    'No transactions recorded on this date' AS Flag
FROM Calendar c
LEFT JOIN (
    SELECT DISTINCT CAST(TransactionDate AS DATE) AS TxnDate
    FROM Transactions
    WHERE TransactionDate IS NOT NULL
) t ON c.CalDate = t.TxnDate
WHERE t.TxnDate IS NULL
OPTION (MAXRECURSION 1000);

-- Check 3: Duplicate reference numbers in Transactions (same reference, multiple rows)
SELECT
    ReferenceNo,
    COUNT(*) AS Occurrences,
    COUNT(DISTINCT AccountID) AS UniqueAccounts,
    MIN(TransactionDate) AS FirstDate,
    MAX(TransactionDate) AS LastDate,
    'Duplicate reference number' AS Flag
FROM Transactions
WHERE ReferenceNo IS NOT NULL
GROUP BY ReferenceNo
HAVING COUNT(*) > 1;
```

---

## Expected Output

**Check 2 (date gaps):**
| MissingDate | DayOfWeek | Flag |
|---|---|---|
| 2024-03-04 | Monday | No transactions recorded on this date |
| 2024-03-06 | Wednesday | No transactions recorded on this date |
| 2024-03-11 | Monday | No transactions recorded on this date |
| ... | ... | ... |

**Check 3 (duplicate references):**
| ReferenceNo | Occurrences | UniqueAccounts | Flag |
|---|---|---|---|
| REF10006 | 2 | 2 | Duplicate reference number |
| REF10014 | 2 | 2 | Duplicate reference number |

---

## Explanation

### LAG() — looking back one row to find a skip
`LAG(column) OVER (PARTITION BY ... ORDER BY ...)` returns the value from the
previous row within a defined group. Here it returns the previous quarter for the
same employee and year. Subtracting the previous quarter number from the current
quarter number (extracted with `RIGHT(Quarter, 1)` and cast to INT) tells you how
many quarters apart they are. A difference of 2 or more means at least one quarter
was skipped — a gap in the coverage sequence.

### Generating a complete date calendar with a Recursive CTE
The standard SQL pattern for producing a continuous series of dates is a Recursive CTE.
The **anchor** selects the first date. Each **recursive step** adds one day using
`DATEADD(DAY, 1, CalDate)` and continues until the end date is reached. Once you have
this calendar, a LEFT JOIN against the actual data reveals any date with no matching
transaction — those are your gaps. This pattern works for any sequence: dates, months,
invoice numbers, sequence IDs.

### Why duplicate reference numbers are a temporal problem
A reference number is designed to uniquely identify one event at one point in time.
When the same reference number appears on two rows — especially across two different
accounts or two different dates — it signals either a reprocessing error (the same
file was loaded twice) or a duplicate payment. It is classed as a temporal integrity
issue because the problem involves event identity over time, not just a static value
constraint.

---

## Interview Angle
*"How do you detect gaps in a time series in SQL?"*
Two approaches: (1) use LAG() to compare each row's date to the previous row's date —
if the difference is more than the expected interval, there is a gap; (2) generate a
complete date calendar with a Recursive CTE and LEFT JOIN the actual data against it —
dates with no matching record are gaps.

---

## Severity: **High**
Date gaps in financial transaction logs may indicate system downtime or missing data
loads. Duplicate reference numbers may indicate double-payment.
