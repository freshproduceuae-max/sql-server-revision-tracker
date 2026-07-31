# Data Validation Lab

A structured, question-first learning lab for SQL data validation methods.
Each method is taught using the same six reusable reference tables,
with real dirty data embedded in the CSVs so every query produces meaningful results.

---

## How to Use This Lab

1. **Read the schema reference card first** → `schemas/SCHEMA_REFERENCE.md`
   Load the CSVs into SSMS as tables (`Customers`, `Orders`, `Products`, `Employees`, `Transactions`, `SalesTargets`).

2. **Pick a method folder** from the table below.

3. **Read the question** at the top of the `.md` file before looking at the SQL.
   Try to write your own query first — then compare.

4. **Run the solution query** in SSMS against your loaded tables.

5. **Read the Explanation and Interview Angle** sections — these are what interviewers want.

---

## Folder Structure

```
data-validation-lab/
│
├── README.md                          ← You are here
│
├── schemas/
│   ├── SCHEMA_REFERENCE.md            ← Full schema docs + known issues
│   ├── 01_Customers.csv               ← 20 rows, intentional dirty data
│   ├── 02_Orders.csv                  ← 20 rows, FK/date/amount issues
│   ├── 03_Products.csv                ← 15 rows, cost/price/stock issues
│   ├── 04_Employees.csv               ← 18 rows, hierarchy/salary issues
│   ├── 05_Transactions.csv            ← 20 rows, duplicate/NULL/outlier issues
│   └── 06_SalesTargets.csv            ← 15 rows, duplicate/FK/negative issues
│
└── methods/
    ├── M01_Completeness/
    │   ├── M01-E1_null_mandatory_fields.md
    │   └── M01-E2_blank_placeholder_strings.md
    ├── M02_Uniqueness/
    │   ├── M02-E1_duplicate_primary_key.md
    │   └── M02-E2_fuzzy_near_duplicates.md
    ├── M03_Referential_Integrity/
    │   ├── M03-E1_orphan_records.md
    │   └── M03-E2_self_referencing_hierarchy.md
    ├── M04_Format_Pattern/
    │   └── M04-E1_email_format.md
    ├── M05_Range_Boundary/
    │   ├── M05-E1_negative_and_zero_values.md
    │   └── M05-E2_date_range_violations.md
    ├── M06_Consistency/
    │   ├── M06-E1_calculated_field_mismatch.md
    │   └── M06-E2_cross_column_logic.md
    ├── M07_Business_Rules/
    │   └── M07-E1_allowed_values_domain_check.md
    ├── M08_Reconciliation/
    │   └── M08-E1_source_to_target_count_and_sum.md
    ├── M09_Temporal/
    │   └── M09-E1_gap_and_overlap_detection.md
    └── M10_Statistical/
        └── M10-E1_outlier_detection.md
```

---

## Master Index

| # | Method | File | Tables Used | Key Functions |
|---|---|---|---|---|
| M01-E1 | NULL in mandatory fields | M01_Completeness/M01-E1 | Customers | IS NULL, UNION ALL, COUNT |
| M01-E2 | Blank & placeholder strings | M01_Completeness/M01-E2 | Customers | LTRIM, RTRIM, ISNULL, LIKE, IN |
| M02-E1 | Duplicate primary key / exact rows | M02_Uniqueness/M02-E1 | Customers | GROUP BY HAVING, ROW_NUMBER, PARTITION BY |
| M02-E2 | Fuzzy / near-duplicate detection | M02_Uniqueness/M02-E2 | Employees | SOUNDEX, DIFFERENCE, self-JOIN |
| M03-E1 | Orphan records (FK violations) | M03_Referential_Integrity/M03-E1 | Orders, Customers, Products | LEFT JOIN IS NULL, NOT EXISTS |
| M03-E2 | Self-referencing hierarchy validation | M03_Referential_Integrity/M03-E2 | Employees | Recursive CTE, OPTION MAXRECURSION |
| M04-E1 | Email address format | M04_Format_Pattern/M04-E1 | Customers | LIKE, CASE WHEN, LEN, REPLACE |
| M05-E1 | Negative, zero, and out-of-range values | M05_Range_Boundary/M05-E1 | Orders, Products, Employees | BETWEEN, ABS, CASE WHEN |
| M05-E2 | Date range and sequence violations | M05_Range_Boundary/M05-E2 | Orders, Customers | DATEDIFF, DATEADD, GETDATE |
| M06-E1 | Calculated field mismatch | M06_Consistency/M06-E1 | Orders | ABS, CAST DECIMAL, tolerance check |
| M06-E2 | Cross-column logic violations | M06_Consistency/M06-E2 | Orders, Products | Multi-column CASE WHEN |
| M07-E1 | Allowed values / domain check | M07_Business_Rules/M07-E1 | Employees, Orders | NOT IN, LEFT JOIN reference table |
| M08-E1 | Source-to-target reconciliation | M08_Reconciliation/M08-E1 | Orders | UNION ALL, SUM, COUNT, CONVERT |
| M09-E1 | Gap and overlap in date sequences | M09_Temporal/M09-E1 | SalesTargets, Transactions | LAG, Recursive CTE calendar, MAXRECURSION |
| M10-E1 | Outlier detection (Z-Score + IQR) | M10_Statistical/M10-E1 | Transactions | STDEV, AVG, PERCENTILE_CONT, CROSS JOIN |

---

## Reference Tables — Quick Dirty Data Guide

| Table | Row to check | What is wrong |
|---|---|---|
| Customers | Row 3 | Email is NULL |
| Customers | Row 7 | Email has no @domain |
| Customers | Row 11 | Exact duplicate of Row 1 |
| Customers | Row 15 | DOB = 2010 — minor |
| Customers | Row 16 | All fields = "N/A" |
| Orders | OrderID 1004 | CustomerID 99 does not exist |
| Orders | OrderID 1006 | ShipDate before OrderDate |
| Orders | OrderID 1007 | Quantity = 0 |
| Orders | OrderID 1005 | TotalAmount doesn't match components |
| Orders | OrderID 1020 | Negative UnitPrice and TotalAmount |
| Products | P009 | SellingPrice < UnitCost |
| Products | P011 | ProductName is NULL |
| Products | P013 | StockQty = -5 |
| Employees | E007 | Email is NULL |
| Employees | E014 | Salary = -5000 |
| Employees | E015 | Near-duplicate of E001 |
| Employees | E017 | ManagerID E099 does not exist |
| Transactions | TXN0006/0007 | Same ReferenceNo — possible duplicate |
| Transactions | TXN0011 | TransactionDate is NULL |
| Transactions | TXN0013 | Amount = 99,999,999.99 — extreme outlier |
| SalesTargets | ST001/ST007 | Exact duplicate rows |
| SalesTargets | ST010 | EmployeeID E999 does not exist |
| SalesTargets | ST012 | ActualAmount = -1000 |

---

## SQL Functions Quick Reference

| Function | Purpose | Example |
|---|---|---|
| `IS NULL` | Detect missing values | `WHERE Email IS NULL` |
| `ISNULL(col, default)` | Replace NULL with a value | `ISNULL(Phone, 'Not provided')` |
| `LTRIM(RTRIM(col))` | Strip leading/trailing spaces | `WHERE LTRIM(RTRIM(Name)) = ''` |
| `LIKE '%@%.%'` | Pattern match | `WHERE Email NOT LIKE '%@%.%'` |
| `SOUNDEX(col)` | Phonetic code | `WHERE SOUNDEX(A.Name) = SOUNDEX(B.Name)` |
| `DIFFERENCE(a,b)` | Phonetic similarity 0–4 | `WHERE DIFFERENCE(A.Name, B.Name) >= 3` |
| `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` | Rank within group | Deduplication |
| `LAG(col) OVER (...)` | Previous row value | Gap detection |
| `DATEDIFF(unit, start, end)` | Date difference | Age, day gap |
| `DATEADD(unit, n, date)` | Add/subtract from date | Threshold dates |
| `GETDATE()` | Current datetime | `WHERE OrderDate > GETDATE()` |
| `BETWEEN x AND y` | Inclusive range | `WHERE Pct BETWEEN 0 AND 100` |
| `ABS(value)` | Absolute value | Tolerance checks |
| `STDEV(col)` | Standard deviation | Z-Score |
| `PERCENTILE_CONT(n) WITHIN GROUP (ORDER BY col) OVER ()` | Percentile | IQR bounds |
| `NULLIF(a, b)` | Return NULL if a=b | Prevent division by zero |

---

## Loading the CSVs into SQL Server (SSMS)

```sql
-- Option 1: Use the Import Flat File wizard
-- Right-click the database → Tasks → Import Flat File → select the CSV

-- Option 2: BULK INSERT
BULK INSERT Customers
FROM 'C:\path\to\data-validation-lab\schemas\01_Customers.csv'
WITH (
    FIRSTROW = 2,           -- Skip header row
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    TABLOCK
);
```

---

*Part of the SQL Server Revision Master Tracker — Data Validation Lab*
*Linked taxonomy: `data-validation-taxonomy.json` (236 types across 19 groups)*
