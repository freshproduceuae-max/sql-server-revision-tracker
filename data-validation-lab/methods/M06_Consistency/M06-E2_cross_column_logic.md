# M06 — Consistency | Example 2: Cross-Column Logic Violations

## The Question
> Beyond computed fields, business logic often ties multiple columns together in rules
> that can't be expressed with a simple range check.
> Your BA asks: **"Validate the cross-column logic in our Orders and Products tables:
> a cancelled order should never have a ship date;
> a delivered order must have a ship date;
> an active product with zero stock needs a reorder flag;
> and a product can't be in a sub-category without a parent category."**

---

## Table References
**Orders** — `schemas/02_Orders.csv`
**Products** — `schemas/03_Products.csv`

---

## Solution Query

```sql
-- Orders: cross-column status vs date logic
SELECT
    OrderID,
    Status,
    OrderDate,
    ShipDate,
    CASE
        WHEN Status = 'Cancelled'  AND ShipDate IS NOT NULL
            THEN 'Cancelled order has a ship date — contradictory'
        WHEN Status = 'Delivered'  AND ShipDate IS NULL
            THEN 'Delivered order has no ship date — missing'
        WHEN Status = 'Returned'   AND ShipDate IS NULL
            THEN 'Returned order has no ship date — missing'
        WHEN Status = 'Shipped'    AND ShipDate IS NULL
            THEN 'Shipped order has no ship date — missing'
        WHEN Status NOT IN ('Pending','Processing','Shipped','Delivered','Returned','Cancelled')
            THEN 'Unrecognised status value: ' + Status
        ELSE 'OK'
    END AS LogicViolation
FROM Orders
WHERE
    (Status = 'Cancelled'  AND ShipDate IS NOT NULL)
 OR (Status IN ('Delivered','Returned','Shipped') AND ShipDate IS NULL)
 OR Status NOT IN ('Pending','Processing','Shipped','Delivered','Returned','Cancelled');

-- Products: stock vs active status, cost vs price, category completeness
SELECT
    ProductID,
    ProductName,
    Category,
    SubCategory,
    UnitCost,
    SellingPrice,
    StockQty,
    MinStockLevel,
    IsActive,
    CASE
        WHEN IsActive = 1 AND StockQty <= MinStockLevel
            THEN 'Active product at or below reorder level — needs restock'
        WHEN IsActive = 0 AND StockQty > 0
            THEN 'Inactive product still has stock — investigate'
        WHEN SubCategory IS NOT NULL AND Category IS NULL
            THEN 'SubCategory set but Category is NULL — hierarchy broken'
        WHEN ProductName IS NULL OR LTRIM(RTRIM(ISNULL(ProductName,''))) = ''
            THEN 'Product has no name'
        ELSE 'OK'
    END AS LogicViolation
FROM Products
WHERE
    (IsActive = 1 AND StockQty <= MinStockLevel)
 OR (IsActive = 0 AND StockQty > 0)
 OR (SubCategory IS NOT NULL AND Category IS NULL)
 OR (ProductName IS NULL OR LTRIM(RTRIM(ISNULL(ProductName,''))) = '');
```

---

## Expected Output

**Orders cross-column:**
| OrderID | Status | ShipDate | LogicViolation |
|---|---|---|---|
| 1003 | Pending | NULL | OK — Pending orders may not have ship date yet |
| (none in our data match the cancel+shipdate rule) | | | |

**Products cross-column:**
| ProductID | ProductName | Category | SubCategory | StockQty | MinStockLevel | LogicViolation |
|---|---|---|---|---|---|---|
| P008 | Keyboard Mech | Electronics | Peripherals | 0 | 10 | Active product at or below reorder level |
| P011 | NULL | Electronics | Peripherals | 50 | 10 | Product has no name |
| P012 | Docking Station | Electronics | NULL | 20 | 5 | OK (SubCategory null but Category present) |
| P013 | Mousepad XL | Electronics | Peripherals | -5 | 20 | Active product at or below reorder level |

---

## Explanation

**Cross-column validation** cannot be reduced to a single-column rule. It requires
looking at two or more columns together. The `CASE WHEN` chain in the SELECT evaluates
conditions in order — the first matching condition defines the label. The WHERE clause
filters to only rows that violate at least one rule.

**Status allowed-value check**: SQL Server enforces this with a CHECK constraint
(`CHECK (Status IN ('Pending',...))`). But at validation time — before inserting —
you surface it with the NOT IN pattern.

**Stock ≤ MinStockLevel** is a business rule, not a data error. The stock number itself
is valid — it just indicates an operational action is needed. This is the distinction
between a **data quality issue** (something wrong with the data) and a **business
alert** (data is correct but signals a problem). Both are found with the same SQL patterns.

---

## Interview Angle
*"How do you validate business rules that span multiple columns?"*
CASE WHEN with multi-column conditions in both the SELECT (to label the issue) and
WHERE (to filter to problem rows). For ongoing enforcement, SQL Server CHECK constraints
can reference multiple columns: `CHECK (ShipDate IS NULL OR ShipDate >= OrderDate)`.

---

## Severity: **High**
Logic contradictions corrupt operational dashboards and SLA calculations.
