# Schema Reference Card

All examples in the `methods/` folder refer to one or more of these six tables.
Each CSV contains **intentional data quality issues** so validation queries produce real results.

---

## Table 1 — Customers

**File:** `01_Customers.csv`

| Column | Type | Notes |
|---|---|---|
| CustomerID | INT | Primary Key |
| FirstName | VARCHAR(50) | Required |
| LastName | VARCHAR(50) | Required |
| Email | VARCHAR(100) | Required, must be unique, must contain @ |
| Phone | VARCHAR(20) | Optional |
| DOB | DATE | Date of Birth — must be in the past, customer must be 18+ |
| Country | VARCHAR(50) | Required |
| PostalCode | VARCHAR(10) | Required |
| CreatedDate | DATE | System date of record creation |
| IsActive | BIT | 1 = Active, 0 = Inactive |

**Known Issues Embedded:**
- Row 3: Email is blank (NULL)
- Row 4: Phone is NULL
- Row 5: DOB is NULL
- Row 7: Email is not a valid format (missing @domain)
- Row 8: Customer DOB = 2005 — may be under 18 depending on check date
- Row 11: Duplicate of Row 1 (same name, email, phone, DOB)
- Row 15: DOB = 2010 — customer is a minor (age ~14)
- Row 16: All fields populated with "N/A" placeholder strings
- Row 19: Phone = 99999999999 — obviously fake/placeholder

---

## Table 2 — Orders

**File:** `02_Orders.csv`

| Column | Type | Notes |
|---|---|---|
| OrderID | INT | Primary Key |
| CustomerID | INT | FK → Customers.CustomerID |
| ProductID | VARCHAR(10) | FK → Products.ProductID |
| OrderDate | DATE | Must be before or equal to ShipDate |
| ShipDate | DATE | Can be NULL if not yet shipped |
| Quantity | INT | Must be > 0 |
| UnitPrice | DECIMAL(10,2) | Must be > 0 |
| TotalAmount | DECIMAL(10,2) | Should equal Quantity × UnitPrice × (1 - DiscountPct/100) |
| Status | VARCHAR(20) | Allowed: Pending, Processing, Shipped, Delivered, Returned, Cancelled |
| DiscountPct | DECIMAL(5,2) | 0 to 100 |

**Known Issues Embedded:**
- Row 4 (OrderID 1004): CustomerID 99 does not exist in Customers
- Row 6 (OrderID 1006): ShipDate (Jan 19) is BEFORE OrderDate (Jan 22)
- Row 7 (OrderID 1007): Quantity = 0
- Row 5 (OrderID 1005): TotalAmount 350.00 is wrong (should be 359.98 at 10% discount)
- Row 19 (OrderID 1019): OrderDate = 2023-03-01 — a year in the past (likely data entry error)
- Row 20 (OrderID 1020): UnitPrice and TotalAmount are negative

---

## Table 3 — Products

**File:** `03_Products.csv`

| Column | Type | Notes |
|---|---|---|
| ProductID | VARCHAR(10) | Primary Key |
| ProductName | VARCHAR(100) | Required |
| Category | VARCHAR(50) | Required — Electronics or Furniture |
| SubCategory | VARCHAR(50) | Required |
| UnitCost | DECIMAL(10,2) | Must be > 0 |
| SellingPrice | DECIMAL(10,2) | Must be > UnitCost (gross margin > 0) |
| StockQty | INT | Cannot be negative |
| MinStockLevel | INT | Reorder threshold |
| IsActive | BIT | 1 = Active, 0 = Discontinued |
| SupplierID | VARCHAR(10) | FK → Supplier table |

**Known Issues Embedded:**
- P009: SellingPrice (90.00) < UnitCost (110.00) — selling at a loss
- P010: SellingPrice = UnitCost = 180.00 — zero margin
- P011: ProductName is NULL
- P012: SubCategory is NULL
- P013: StockQty = -5 (impossible negative stock)
- P014: SupplierID is NULL
- P015: SellingPrice = 0.00

---

## Table 4 — Employees

**File:** `04_Employees.csv`

| Column | Type | Notes |
|---|---|---|
| EmployeeID | VARCHAR(10) | Primary Key |
| FullName | VARCHAR(100) | Required |
| Department | VARCHAR(50) | Must be: Sales, Technology, HR, Finance, Marketing |
| ManagerID | VARCHAR(10) | FK → Employees.EmployeeID (self-referencing); NULL for top-level managers |
| HireDate | DATE | Cannot be in the future |
| Salary | DECIMAL(10,2) | Must be > 0 |
| Grade | VARCHAR(5) | L1 through L7 |
| Email | VARCHAR(100) | Required, unique |
| IsActive | BIT | 1 = Active, 0 = Left company |

**Known Issues Embedded:**
- E007: Email is NULL
- E014: Salary = -5000 (negative salary)
- E015: Near-duplicate of E001 ("Sara" vs "Sarah" Thompson — same email)
- E017: ManagerID = E099 — manager does not exist
- E018: HireDate = 2025-03-01 — future hire date (if current date < 2025-03-01)

---

## Table 5 — Transactions

**File:** `05_Transactions.csv`

| Column | Type | Notes |
|---|---|---|
| TransactionID | VARCHAR(10) | Primary Key |
| AccountID | VARCHAR(10) | Account reference |
| TransactionDate | DATE | Required |
| Amount | DECIMAL(12,2) | Debit amounts should be positive (sign handled by TransactionType) |
| TransactionType | VARCHAR(20) | Credit, Debit, or Transfer |
| ReferenceNo | VARCHAR(20) | Should be unique per transaction |
| Status | VARCHAR(20) | Completed, Pending, Failed, Flagged |
| ProcessedBy | VARCHAR(10) | FK → Employees.EmployeeID |

**Known Issues Embedded:**
- TXN0006 and TXN0007: Same ReferenceNo (REF10006) — possible duplicate
- TXN0011: TransactionDate is NULL
- TXN0012: Amount = 0.00
- TXN0013: Amount = 99,999,999.99 — statistical outlier / suspicious
- TXN0014 and TXN0015: Same ReferenceNo (REF10014) — same reference, two accounts
- TXN0016: ProcessedBy = E099 — employee does not exist
- TXN0017: ReferenceNo is NULL
- TXN0005: Amount = -150.00 (negative debit amount — sign error)

---

## Table 6 — SalesTargets

**File:** `06_SalesTargets.csv`

| Column | Type | Notes |
|---|---|---|
| TargetID | INT | Primary Key |
| EmployeeID | VARCHAR(10) | FK → Employees.EmployeeID |
| Year | INT | 4-digit year |
| Quarter | VARCHAR(5) | Q1, Q2, Q3, Q4 |
| TargetAmount | DECIMAL(10,2) | Must be > 0 |
| ActualAmount | DECIMAL(10,2) | Can be NULL if period not yet closed |
| Region | VARCHAR(50) | Sales region |

**Known Issues Embedded:**
- ST001 and ST007: Exact duplicate rows (E001, 2024, Q1)
- ST008: ActualAmount is NULL — period may not be closed
- ST010: EmployeeID E999 — does not exist in Employees
- ST011: ActualAmount = 0 — target recorded with no sales at all
- ST012: ActualAmount = -1000 — negative actual sales figure
