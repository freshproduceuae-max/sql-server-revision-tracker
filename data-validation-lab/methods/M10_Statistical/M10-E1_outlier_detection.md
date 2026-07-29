# M10 — Statistical | Example 1: Outlier Detection Using Z-Score and IQR

## The Question
> The compliance team wants to flag unusually large financial transactions for
> manual review. Simple range checks won't work because the "normal" range changes
> depending on the account type. They ask:
> **"Use statistical methods to identify transactions whose amounts are
> significantly higher or lower than what is typical for our dataset.
> Apply both a Z-Score method and an IQR-based method and compare the results."**

---

## Table Reference
**Transactions** — `schemas/05_Transactions.csv`

Known outlier: TXN0013 has Amount = 99,999,999.99 — a statistical extreme.

---

## Solution Query

```sql
-- Method 1: Z-Score — flags values more than 2 standard deviations from the mean
-- Z = (value - mean) / standard_deviation
-- |Z| > 2 = unusual, |Z| > 3 = extreme outlier
WITH Stats AS (
    SELECT
        AVG(Amount)          AS MeanAmount,
        STDEV(Amount)        AS StdDevAmount
    FROM Transactions
    WHERE Amount IS NOT NULL
      AND Amount <> 0        -- exclude zero-amount transactions from stats
)
SELECT
    t.TransactionID,
    t.AccountID,
    t.Amount,
    s.MeanAmount,
    s.StdDevAmount,
    CAST((t.Amount - s.MeanAmount) / NULLIF(s.StdDevAmount, 0) AS DECIMAL(8,2)) AS ZScore,
    CASE
        WHEN ABS((t.Amount - s.MeanAmount) / NULLIF(s.StdDevAmount, 0)) > 3
            THEN 'EXTREME outlier (|Z| > 3)'
        WHEN ABS((t.Amount - s.MeanAmount) / NULLIF(s.StdDevAmount, 0)) > 2
            THEN 'Outlier (|Z| > 2)'
        ELSE 'Normal'
    END AS ZScoreFlag
FROM Transactions t
CROSS JOIN Stats s
WHERE ABS((t.Amount - s.MeanAmount) / NULLIF(s.StdDevAmount, 0)) > 2
ORDER BY ABS((t.Amount - s.MeanAmount) / NULLIF(s.StdDevAmount, 0)) DESC;

-- Method 2: IQR (Interquartile Range) — more robust to extreme skew
-- Lower fence = Q1 - 1.5 * IQR
-- Upper fence = Q3 + 1.5 * IQR
WITH Quartiles AS (
    SELECT
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY Amount) OVER () AS Q1,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY Amount) OVER () AS Q3
    FROM Transactions
    WHERE Amount IS NOT NULL
),
IQR_Bounds AS (
    SELECT DISTINCT
        Q1,
        Q3,
        Q3 - Q1                     AS IQR,
        Q1 - 1.5 * (Q3 - Q1)       AS LowerFence,
        Q3 + 1.5 * (Q3 - Q1)       AS UpperFence
    FROM Quartiles
)
SELECT
    t.TransactionID,
    t.AccountID,
    t.Amount,
    b.LowerFence,
    b.UpperFence,
    CASE
        WHEN t.Amount < b.LowerFence THEN 'Below lower fence — unusually small'
        WHEN t.Amount > b.UpperFence THEN 'Above upper fence — unusually large'
    END AS IQR_Flag
FROM Transactions t
CROSS JOIN IQR_Bounds b
WHERE t.Amount < b.LowerFence
   OR t.Amount > b.UpperFence
ORDER BY t.Amount DESC;

-- Method 3: Simple percentile banding — quick executive summary
SELECT
    CASE
        WHEN Amount < 0                                     THEN 'Negative'
        WHEN Amount = 0                                     THEN 'Zero'
        WHEN Amount BETWEEN 0.01    AND 500                 THEN 'Low (0–500)'
        WHEN Amount BETWEEN 500.01  AND 2000               THEN 'Medium (500–2K)'
        WHEN Amount BETWEEN 2000.01 AND 10000              THEN 'High (2K–10K)'
        WHEN Amount > 10000                                 THEN 'Very High (>10K)'
    END AS AmountBand,
    COUNT(*) AS TransactionCount,
    SUM(Amount) AS TotalAmount
FROM Transactions
GROUP BY
    CASE
        WHEN Amount < 0                                     THEN 'Negative'
        WHEN Amount = 0                                     THEN 'Zero'
        WHEN Amount BETWEEN 0.01    AND 500                 THEN 'Low (0–500)'
        WHEN Amount BETWEEN 500.01  AND 2000               THEN 'Medium (500–2K)'
        WHEN Amount BETWEEN 2000.01 AND 10000              THEN 'High (2K–10K)'
        WHEN Amount > 10000                                 THEN 'Very High (>10K)'
    END
ORDER BY MIN(Amount);
```

---

## Expected Output

**Method 1 (Z-Score):**
| TransactionID | Amount | ZScore | ZScoreFlag |
|---|---|---|---|
| TXN0013 | 99,999,999.99 | ~22.36 | EXTREME outlier (|Z| > 3) |

**Method 3 (banding):**
| AmountBand | TransactionCount | TotalAmount |
|---|---|---|
| Negative | 1 | -150.00 |
| Zero | 1 | 0.00 |
| Low (0–500) | 10 | 2,530.50 |
| Medium (500–2K) | 5 | 4,350.00 |
| High (2K–10K) | 2 | 7,200.00 |
| Very High (>10K) | 1 | 99,999,999.99 |

---

## Explanation

### Z-Score — how far is this value from normal?
A Z-Score expresses how many standard deviations a value sits away from the mean.
The formula is `(value − mean) / standard deviation`. A Z-Score of 0 means the
value is exactly average. Scores between −2 and +2 cover roughly 95% of a normally
distributed dataset. Anything outside ±2 is flagged as unusual; outside ±3 is
considered extreme. `NULLIF(StdDevAmount, 0)` guards against a division-by-zero
error in the rare case where all amounts are identical and the standard deviation is zero.

### The limitation of Z-Score on skewed data
Z-Score has a weakness: a single extreme outlier inflates both the mean and the
standard deviation, which can actually make other outliers look less extreme than
they are. TXN0013 with 99 million pushes the standard deviation so high that a
transaction of 15,000 might no longer show as unusual. This is why the IQR method
exists as an alternative.

### IQR — a more robust outlier boundary
The Interquartile Range (IQR) uses the middle 50% of the data rather than the mean
and standard deviation. Q1 is the value at the 25th percentile; Q3 is at the 75th.
IQR = Q3 − Q1. The **lower fence** is `Q1 − 1.5 × IQR`; the **upper fence** is
`Q3 + 1.5 × IQR`. Any value outside these fences is a statistical outlier. Because
it is based on percentiles rather than averages, extreme values have almost no effect
on where the fences sit — making IQR far more reliable on skewed financial data.

### PERCENTILE_CONT — computing percentiles in SQL
`PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY Amount) OVER ()` calculates the 25th
percentile across the entire dataset. The `WITHIN GROUP (ORDER BY ...)` clause specifies
the sort order used to find the percentile position. The `OVER ()` with no partition
means it applies to the whole result set. This is a window function available in
SQL Server 2012 and later.

---

## Interview Angle
*"What is a Z-Score and when would you use it for data validation?"*
A Z-Score converts a value to the number of standard deviations from the mean.
Values with |Z| > 2 are flagged for review. Use it for anomaly detection in financial
data, call duration monitoring, or any numeric field where extreme values indicate
errors or fraud. Prefer IQR when the data has a heavily skewed distribution.

---

## Severity: **High**
Statistical outliers in financial data are a primary indicator of data entry errors,
system bugs, or fraud. Missing them can lead to regulatory penalties.
