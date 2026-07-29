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

### Why you need a rounding tolerance
Floating-point arithmetic inside a database engine can introduce tiny errors —
for example, `199.99 × 2` might produce `399.9799999` instead of a clean `399.98`.
These are machine-level precision artefacts, not real data problems. Using
`ABS(...) > 0.01` ignores any difference smaller than 1 cent, filtering out
rounding noise while still catching genuine mismatches like the 9.98 discrepancy
in OrderID 1005.

### Integer division trap — why 100.0 matters
In SQL Server, dividing an integer by an integer performs integer division and
truncates the decimal. So `DiscountPct / 100` where DiscountPct = 10 gives 0,
not 0.1. Writing `100.0` (or `CAST(DiscountPct AS DECIMAL(5,2)) / 100.0`) forces
the engine to use decimal arithmetic and return 0.1. This is one of the most
common silent bugs in SQL financial calculations.

### ABS() — catching errors in both directions
`ABS()` returns the absolute (positive) value of any number. Using it in the WHERE
clause means you catch both over-statements (stored total is too high) and
under-statements (stored total is too low) with a single expression, instead of
writing two separate conditions. The CASE WHEN in the SELECT then labels which
direction the error went, which matters for understanding the root cause.

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
