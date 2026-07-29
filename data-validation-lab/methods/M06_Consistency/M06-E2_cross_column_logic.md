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

### What makes a cross-column rule different
A cross-column validation cannot be reduced to a single-column check because
the problem only appears when you look at two columns together. A ShipDate of
"2024-01-19" is a perfectly valid date on its own. But paired with an OrderDate of
"2024-01-22", it becomes impossible. The `CASE WHEN` chain evaluates conditions
using multiple column references simultaneously — that is what makes it a cross-column
rule rather than a simple range check.

### Layering CASE WHEN with WHERE
The CASE WHEN in the SELECT labels what the problem is; the WHERE clause filters to
only the rows that have any problem. They work in tandem: the WHERE ensures you are
only returning rows worth investigating, and the CASE label tells you exactly which
rule each row broke. Without the label, you would know a row is bad but not why.

### The difference between a data error and a business alert
`StockQty <= MinStockLevel` is not a data error — the stock figure itself is accurate.
It is a **business alert**: the data is correct, but it signals that an operational
action is needed (raise a purchase order). Both types are found using identical SQL
patterns, so the CASE label or the column header on the report is what communicates
to the reader whether they need to fix the data or take a business action.

---

## Interview Angle
*"How do you validate business rules that span multiple columns?"*
CASE WHEN with multi-column conditions in both the SELECT (to label the issue) and
WHERE (to filter to problem rows). For ongoing enforcement, SQL Server CHECK constraints
can reference multiple columns: `CHECK (ShipDate IS NULL OR ShipDate >= OrderDate)`.

---

## Severity: **High**
Logic contradictions corrupt operational dashboards and SLA calculations.
