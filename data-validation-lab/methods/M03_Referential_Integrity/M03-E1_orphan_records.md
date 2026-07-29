# M03 — Referential Integrity | Example 1: Orphan Records (FK Violations)

## The Question
> The Orders table references customers and products that must exist in their
> parent tables. After a batch load, your lead asks:
> **"Are there any orders that reference a customer or product that doesn't exist
> in our system? These orphan records will break the reporting joins."**
> Find all orphaned orders and report which FK column is broken.

---

## Table Reference
**Orders** — `schemas/02_Orders.csv`
**Customers** — `schemas/01_Customers.csv`
**Products** — `schemas/03_Products.csv`

Known issue: OrderID 1004 has CustomerID = 99, which does not exist in Customers.

---

## Solution Query

```sql
-- Method A: LEFT JOIN approach — gold standard for FK validation
SELECT
    o.OrderID,
    o.CustomerID,
    o.ProductID,
    o.OrderDate,
    o.TotalAmount,
    CASE
        WHEN c.CustomerID IS NULL AND p.ProductID IS NULL THEN 'Both FK missing'
        WHEN c.CustomerID IS NULL                         THEN 'CustomerID not found'
        WHEN p.ProductID  IS NULL                         THEN 'ProductID not found'
    END AS Violation
FROM Orders o
LEFT JOIN Customers c ON o.CustomerID = c.CustomerID
LEFT JOIN Products  p ON o.ProductID  = p.ProductID
WHERE c.CustomerID IS NULL
   OR p.ProductID  IS NULL;

-- Method B: NOT EXISTS — readable alternative, sometimes faster
SELECT
    OrderID,
    CustomerID,
    'CustomerID orphan' AS ViolationType
FROM Orders o
WHERE NOT EXISTS (
    SELECT 1 FROM Customers c WHERE c.CustomerID = o.CustomerID
)
UNION ALL
SELECT
    OrderID,
    ProductID,
    'ProductID orphan'
FROM Orders o
WHERE NOT EXISTS (
    SELECT 1 FROM Products p WHERE p.ProductID = o.ProductID
);

-- Method C: Summary count for a data quality dashboard
SELECT
    'Orders → Customers (CustomerID)' AS FK_Check,
    COUNT(*) AS OrphanCount
FROM Orders o
WHERE NOT EXISTS (SELECT 1 FROM Customers c WHERE c.CustomerID = o.CustomerID)
UNION ALL
SELECT
    'Orders → Products (ProductID)',
    COUNT(*)
FROM Orders o
WHERE NOT EXISTS (SELECT 1 FROM Products p WHERE p.ProductID = o.ProductID);
```

---

## Expected Output

**Method A:**
| OrderID | CustomerID | ProductID | ViolationType |
|---|---|---|---|
| 1004 | 99 | P003 | CustomerID not found |

---

## Explanation

The **LEFT JOIN trick** works because a LEFT JOIN returns all rows from the left table
(Orders) and matches from the right (Customers). Where there is no match, the right-side
columns are NULL. `WHERE c.CustomerID IS NULL` then filters to only the unmatched rows
— these are the FK violations.

**NOT EXISTS** reads more naturally: "give me orders where no customer exists with this
CustomerID." Both approaches produce the same result; LEFT JOIN is typically faster on
large tables because it avoids a correlated subquery per row.

**Method C** gives a single-number health check suitable for a monitoring dashboard.
Zero orphans = clean. Any number > 0 = action required.

---

## Interview Angle
*"What is the difference between LEFT JOIN IS NULL and NOT EXISTS for FK checks?"*
Both detect the same rows. NOT EXISTS short-circuits as soon as it finds one match
(efficient when the FK table is large and indexed). LEFT JOIN IS NULL materialises
the full join first. In practice, the query optimiser often produces the same plan.

---

## Severity: **Critical**
Orphan records cause INNER JOIN reports to silently drop rows, leading to understated
revenue figures and broken drill-downs in Power BI.
