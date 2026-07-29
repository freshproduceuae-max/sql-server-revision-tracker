# M06 — Consistency | Example 1: Calculated Field Mismatch

## The Question
> The finance controller notices the Orders table stores both line-item components
> (Quantity × UnitPrice × Discount) AND a pre-computed TotalAmount.
> She asks: **"Are the stored TotalAmount values actually correct?
> Find every order where TotalAmount does not match what we would calculate
> from its own components, and tell us the size of the discrepancy."**

---

## Table Reference
**Orders** — `schemas/02_Orders.csv`

Business rule: `TotalAmount = Quantity × UnitPrice × (1 - DiscountPct / 100)`

Known issue: OrderID 1005 has TotalAmount = 350.00 but the calculation gives 359.98.

---

## Solution Query

```sql
-- Identify mismatches between stored and calculated TotalAmount
SELECT
    OrderID,
    CustomerID,
    Quantity,
    UnitPrice,
    DiscountPct,
    TotalAmount                                 AS StoredTotal,
    CAST(
        Quantity * UnitPrice * (1 - DiscountPct / 100.0)
    AS DECIMAL(10,2))                           AS CalculatedTotal,
    CAST(
        TotalAmount - (Quantity * UnitPrice * (1 - DiscountPct / 100.0))
    AS DECIMAL(10,2))                           AS Discrepancy,
    CASE
        WHEN ABS(TotalAmount - (Quantity * UnitPrice * (1 - DiscountPct / 100.0))) < 0.01
            THEN 'OK (within rounding)'
        WHEN TotalAmount > Quantity * UnitPrice * (1 - DiscountPct / 100.0)
            THEN 'Stored total is OVER-STATED'
        ELSE 'Stored total is UNDER-STATED'
    END AS MismatchType
FROM Orders
WHERE ABS(
    TotalAmount - (Quantity * UnitPrice * (1 - DiscountPct / 100.0))
) > 0.01   -- 1 cent tolerance for floating point rounding
ORDER BY ABS(TotalAmount - (Quantity * UnitPrice * (1 - DiscountPct / 100.0))) DESC;

-- Summary: total financial exposure from mismatches
SELECT
    COUNT(*) AS MismatchedOrders,
    SUM(TotalAmount) AS StoredRevenue,
    SUM(Quantity * UnitPrice * (1 - DiscountPct / 100.0)) AS CalculatedRevenue,
    SUM(TotalAmount) - SUM(Quantity * UnitPrice * (1 - DiscountPct / 100.0))
        AS TotalExposure
FROM Orders
WHERE ABS(
    TotalAmount - (Quantity * UnitPrice * (1 - DiscountPct / 100.0))
) > 0.01;
```

---

## Expected Output

**Row detail:**
| OrderID | StoredTotal | CalculatedTotal | Discrepancy | MismatchType |
|---|---|---|---|---|
| 1005 | 350.00 | 359.98 | -9.98 | Stored total is UNDER-STATED |

**Summary:**
| MismatchedOrders | StoredRevenue | CalculatedRevenue | TotalExposure |
|---|---|---|---|
| 1 | 350.00 | 359.98 | -9.98 |

---

## Explanation

**Why allow a 0.01 tolerance?** Floating-point arithmetic can introduce tiny rounding
errors (e.g., 199.99 × 2 might produce 399.9799999 instead of 399.98). Using `ABS(...) > 0.01`
ignores differences smaller than 1 cent, which are rounding artefacts rather than real errors.

**Why 100.0 and not 100?** `DiscountPct / 100` in SQL Server with integer columns
performs integer division, giving 0 for any discount < 100%. Writing `100.0` forces
decimal division.

**`ABS()`** returns the absolute value — it catches both over-statements
(stored > calculated) and under-statements (stored < calculated) in a single
WHERE clause.

---

## Interview Angle
*"Why store a calculated field at all if you can always compute it?"*
Performance — computing totals on every query is expensive at scale.
But stored calculated fields MUST be validated at load time because any mismatch
creates a permanent lie in the data. The alternative is a computed column in SQL Server
(`AS Quantity * UnitPrice * (1 - DiscountPct / 100.0) PERSISTED`) which is
always consistent by design.

---

## Severity: **Critical**
Revenue mis-statements affect P&L reporting, audit sign-off, and commission calculations.
