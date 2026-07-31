# M05 — Range & Boundary | Example 1: Negative, Zero, and Out-of-Range Values

## The Question
> The finance team runs a monthly P&L reconciliation and finds the numbers don't add up.
> You suspect data entry errors in the Orders and Products tables.
> **"Find all records where numeric values violate basic business rules:
> negative quantities, zero prices, negative costs, and selling prices
> below cost price. Explain what each violation means commercially."**

---

## Table References
**Orders** — `schemas/02_Orders.csv`
**Products** — `schemas/03_Products.csv`

Known issues: OrderID 1007 has Quantity = 0. OrderID 1020 has negative UnitPrice.
P009 sells below cost. P013 has negative StockQty. P015 has SellingPrice = 0.

---

## Solution Query

```sql
-- Orders: numeric boundary violations
SELECT
    OrderID,
    CustomerID,
    Quantity,
    UnitPrice,
    TotalAmount,
    DiscountPct,
    CASE
        WHEN Quantity     <= 0  THEN 'Quantity must be > 0'
        WHEN UnitPrice    <= 0  THEN 'Unit price must be > 0'
        WHEN TotalAmount  <  0  THEN 'Total amount cannot be negative'
        WHEN DiscountPct  <  0  THEN 'Discount cannot be negative'
        WHEN DiscountPct  > 100 THEN 'Discount cannot exceed 100%'
        ELSE 'OK'
    END AS Violation
FROM Orders
WHERE Quantity     <= 0
   OR UnitPrice    <= 0
   OR TotalAmount  <  0
   OR DiscountPct NOT BETWEEN 0 AND 100;

-- Products: cost vs price and stock violations
SELECT
    ProductID,
    ProductName,
    UnitCost,
    SellingPrice,
    StockQty,
    CASE
        WHEN SellingPrice <= 0              THEN 'Selling price is zero or negative'
        WHEN SellingPrice < UnitCost        THEN 'Selling BELOW cost — negative margin'
        WHEN SellingPrice = UnitCost        THEN 'Zero margin — selling at cost price'
        WHEN StockQty     < 0              THEN 'Negative stock quantity — impossible'
        ELSE 'OK'
    END AS Violation,
    CASE
        WHEN UnitCost > 0 AND SellingPrice > UnitCost
            THEN CAST(((SellingPrice - UnitCost) / SellingPrice) * 100 AS DECIMAL(5,2))
        ELSE NULL
    END AS GrossMarginPct
FROM Products
WHERE SellingPrice <= 0
   OR SellingPrice <= UnitCost
   OR StockQty     < 0;

-- Employees: negative salary
SELECT
    EmployeeID,
    FullName,
    Salary,
    'Salary cannot be negative or zero' AS Violation
FROM Employees
WHERE Salary <= 0;
```

---

## Expected Output

**Orders violations:**
| OrderID | Quantity | UnitPrice | TotalAmount | Violation |
|---|---|---|---|---|
| 1007 | 0 | 49.99 | 0.00 | Quantity must be > 0 |
| 1020 | 1 | -50.00 | -50.00 | Unit price must be > 0 |

**Products violations:**
| ProductID | ProductName | UnitCost | SellingPrice | StockQty | Violation | GrossMarginPct |
|---|---|---|---|---|---|---|
| P009 | Headset Pro | 110.00 | 90.00 | 35 | Selling BELOW cost — negative margin | NULL |
| P010 | Office Chair | 180.00 | 180.00 | 12 | Zero margin — selling at cost price | NULL |
| P013 | Mousepad XL | 8.00 | 24.99 | -5 | Negative stock quantity — impossible | NULL |
| P015 | USB Drive 256GB | 12.00 | 0.00 | 200 | Selling price is zero or negative | NULL |

---

## Explanation

### BETWEEN is inclusive — boundary values count
`BETWEEN 0 AND 100` is equivalent to `>= 0 AND <= 100`. Both endpoints are included.
For a discount percentage, 0% (no discount applied) and 100% (item is free) sit at
the boundaries — whether these are valid depends on the business rule. Always clarify
with stakeholders whether the fences are strict (`> 0`, `< 100`) or relaxed
(`>= 0`, `<= 100`) before writing the check.

### Gross margin — the commercial health signal
The gross margin formula `(SellingPrice - UnitCost) / SellingPrice × 100` expresses
profit as a percentage of the selling price. A healthy retail margin is typically
above 30%. Anything at 0% means the product is sold at cost with no profit. Anything
negative means the business loses money on every unit sold. Finding these during
a data validation check is a critical commercial alert — not just a data quality flag.

### Negative stock — two possible causes
A negative StockQty value is impossible in the physical world and always indicates
a system problem. The two most common causes are: (1) a return or adjustment was
processed against the wrong product, decrementing stock that was never held; or
(2) a timing issue in concurrent warehouse writes where the decrement ran before
the receipt was recorded. Either way, the validation query surfaces it for investigation.

---

## Interview Angle
*"What is the BETWEEN operator in SQL and what are its boundaries?"*
BETWEEN is inclusive: `WHERE Salary BETWEEN 50000 AND 80000` returns rows where
Salary is exactly 50000, exactly 80000, and everything in between. For exclusive
upper bounds use `>= X AND < Y`.

---

## Severity: **Critical**
Negative prices corrupt revenue reports. Zero-quantity orders inflate order counts.
Negative stock breaks reorder logic.
