# M08 — Reconciliation | Example 1: Source-to-Target Count and Sum Reconciliation

## The Question
> After an ETL pipeline runs overnight, the data warehouse team needs to confirm
> that nothing was lost or duplicated in transit.
> **"Write a reconciliation query that compares the order totals between the
> staging (source) and the target Orders table. Check row counts, total revenue,
> and identify any orders that exist in source but not in target, and vice versa."**

---

## Table Reference
**Orders** — `schemas/02_Orders.csv` (treated as the SOURCE / staging table)

For this exercise, imagine `Orders_DW` is the target data warehouse table —
we simulate it by filtering Orders to a subset (e.g., only Delivered orders were loaded).

---

## Solution Query

```sql
-- Simulate: source = all Orders, target = only Delivered/Shipped orders
-- (Represents a partial load scenario)

-- Step 1: High-level count and sum comparison
SELECT 'SOURCE (Staging)'         AS DataSet,
    COUNT(*)                      AS RowCount,
    SUM(TotalAmount)              AS TotalRevenue,
    MIN(OrderDate)                AS EarliestDate,
    MAX(OrderDate)                AS LatestDate
FROM Orders

UNION ALL

SELECT 'TARGET (Warehouse — Delivered only)',
    COUNT(*),
    SUM(TotalAmount),
    MIN(OrderDate),
    MAX(OrderDate)
FROM Orders
WHERE Status IN ('Delivered','Returned');   -- simulating the DW load filter

-- Step 2: Identify records in SOURCE but NOT in TARGET (missing from load)
SELECT
    o.OrderID,
    o.CustomerID,
    o.OrderDate,
    o.TotalAmount,
    o.Status,
    'In SOURCE — missing from TARGET' AS ReconciliationFlag
FROM Orders o
WHERE o.Status NOT IN ('Delivered','Returned')   -- these "weren't loaded"
  AND o.Status NOT IN ('Cancelled')              -- cancelled may legitimately be excluded
ORDER BY o.OrderID;

-- Step 3: Variance report — difference in key aggregates
SELECT
    'Row Count Variance'          AS Metric,
    COUNT(*) - (SELECT COUNT(*) FROM Orders WHERE Status IN ('Delivered','Returned'))
        AS Variance
FROM Orders
UNION ALL
SELECT
    'Revenue Variance',
    SUM(TotalAmount) - (SELECT SUM(TotalAmount) FROM Orders WHERE Status IN ('Delivered','Returned'))
FROM Orders;

-- Step 4: Control total — match to source system grand total
-- In real ETL: compare this to a control record sent by the source
SELECT
    CONVERT(VARCHAR, CAST(MIN(OrderDate) AS DATE), 103) AS PeriodStart,
    CONVERT(VARCHAR, CAST(MAX(OrderDate) AS DATE), 103) AS PeriodEnd,
    COUNT(*)                    AS TotalOrders,
    SUM(Quantity)               AS TotalUnits,
    SUM(TotalAmount)            AS TotalRevenue,
    AVG(TotalAmount)            AS AvgOrderValue
FROM Orders;
```

---

## Expected Output

**Step 1 (high-level):**
| DataSet | RowCount | TotalRevenue |
|---|---|---|
| SOURCE (Staging) | 20 | ~5,338.71 |
| TARGET (Warehouse — Delivered only) | 13 | ~3,898.73 |

**Step 3 (variance):**
| Metric | Variance |
|---|---|
| Row Count Variance | 7 |
| Revenue Variance | ~1,439.98 |

---

## Explanation

**Control total reconciliation** is the most fundamental ETL quality check.
You compare the source and target on three key metrics:
1. **Row count** — did we load all rows?
2. **Sum of a key financial column** — does the money balance?
3. **Key range** (min/max date) — did we load the right period?

Any variance triggers an investigation before the data goes to reporting.

**CONVERT(VARCHAR, date, 103)** formats a date as `DD/MM/YYYY` (British format).
Style 101 = US `MM/DD/YYYY`, 120 = ISO `YYYY-MM-DD HH:MM:SS`.

In a real ETL pipeline, the source system typically sends a **control file** or
**header record** with expected counts and sums. Your reconciliation query
compares the loaded data against those control figures.

---

## Interview Angle
*"What is a control total and why does ETL need one?"*
A control total is a pre-agreed count or sum from the source system. The ETL loads
the data, then compares its own count/sum to the control. If they match, the load is
confirmed complete. If not, the ETL fails and alerts the team — preventing corrupted
data from reaching the warehouse.

---

## Severity: **Critical**
Missed or duplicated records in a data load invalidate all downstream reports
and can take hours to detect and correct after business users have already acted on wrong numbers.
