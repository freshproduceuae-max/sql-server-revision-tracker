# M05 — Range & Boundary | Example 2: Date Range and Sequence Violations

## The Question
> The operations team is reviewing shipment data and flagging anomalies.
> **"Find all orders where the ship date is before the order date,
> orders placed with an unreasonably old date (more than 1 year ago when status is Pending),
> and customers who were registered as minors (under 18) based on their date of birth."**

---

## Table References
**Orders** — `schemas/02_Orders.csv`
**Customers** — `schemas/01_Customers.csv`

Known issues: OrderID 1006 ShipDate < OrderDate. OrderID 1019 has a 2023 OrderDate.
Customer row 8 (DOB 2005) and row 15 (DOB 2010) may be minors.

---

## Solution Query

```sql
-- Check 1: Ship date before order date (impossible sequence)
SELECT
    OrderID,
    CustomerID,
    OrderDate,
    ShipDate,
    DATEDIFF(DAY, OrderDate, ShipDate) AS DaysDiff,
    'ShipDate is BEFORE OrderDate — impossible' AS Violation
FROM Orders
WHERE ShipDate IS NOT NULL
  AND ShipDate < OrderDate;

-- Check 2: Stale pending orders — ordered over 1 year ago but still Pending
SELECT
    OrderID,
    CustomerID,
    OrderDate,
    Status,
    DATEDIFF(DAY, OrderDate, GETDATE()) AS DaysOld,
    'Order is over 365 days old and still ' + Status AS Violation
FROM Orders
WHERE Status IN ('Pending','Processing')
  AND OrderDate < DATEADD(YEAR, -1, GETDATE());

-- Check 3: Future-dated orders (order date in the future — data entry error)
SELECT
    OrderID,
    OrderDate,
    'Order date is in the future' AS Violation
FROM Orders
WHERE OrderDate > GETDATE();

-- Check 4: Minor customers (under 18 based on DOB)
SELECT
    CustomerID,
    FirstName + ' ' + LastName AS CustomerName,
    DOB,
    DATEDIFF(YEAR, DOB, GETDATE())
        - CASE
            WHEN MONTH(DOB) > MONTH(GETDATE())
              OR (MONTH(DOB) = MONTH(GETDATE()) AND DAY(DOB) > DAY(GETDATE()))
            THEN 1 ELSE 0
          END AS AgeYears,
    'Customer is under 18 — age-restricted services blocked' AS Flag
FROM Customers
WHERE DOB IS NOT NULL
  AND DATEDIFF(YEAR, DOB, GETDATE())
        - CASE
            WHEN MONTH(DOB) > MONTH(GETDATE())
              OR (MONTH(DOB) = MONTH(GETDATE()) AND DAY(DOB) > DAY(GETDATE()))
            THEN 1 ELSE 0
          END < 18;

-- Check 5: DOB in the future (impossible)
SELECT
    CustomerID,
    FirstName + ' ' + LastName AS CustomerName,
    DOB,
    'Date of Birth is in the future — impossible' AS Violation
FROM Customers
WHERE DOB > GETDATE();
```

---

## Expected Output

**Check 1 (ship before order):**
| OrderID | OrderDate | ShipDate | DaysDiff | Violation |
|---|---|---|---|---|
| 1006 | 2024-01-22 | 2024-01-19 | -3 | ShipDate is BEFORE OrderDate — impossible |

**Check 4 (minors — approximate, depends on run date):**
| CustomerID | CustomerName | DOB | AgeYears | Flag |
|---|---|---|---|---|
| 8 | Fatima Hassan | 2005-06-14 | ~19 or 20 | (may clear 18 by run date) |
| 15 | Lily Zhang | 2010-03-07 | ~15 | Customer is under 18 |

---

## Explanation

**DATEDIFF(DAY, start, end)** returns the number of day boundaries crossed between
two dates. A negative result means the end date is before the start date —
instant proof of an impossible sequence.

**Age calculation**: `DATEDIFF(YEAR, DOB, GETDATE())` counts year boundaries crossed,
not actual elapsed years. A person born on Dec 31 would show as 1 year older on Jan 1.
The `CASE` adjustment subtracts 1 if the current date has not yet reached the person's
birthday this year — giving the true completed years of age.

**DATEADD(YEAR, -1, GETDATE())** produces the date exactly one year ago. Anything
with OrderDate before that point is more than 12 months old.

**GETDATE()** returns the current date and time. Use `CAST(GETDATE() AS DATE)` to
strip the time component when comparing date-only columns.

---

## Interview Angle
*"How do you calculate someone's exact age in SQL?"*
Use the DATEDIFF(YEAR) + birthday-not-yet-reached adjustment shown in Check 4.
A simpler but slightly less accurate shortcut: `DATEDIFF(DAY, DOB, GETDATE()) / 365`.

---

## Severity: **Critical** (sequence) / **High** (age verification)
Reversed dates invalidate SLA calculations. Minors accessing age-restricted products
is a legal/compliance risk.
