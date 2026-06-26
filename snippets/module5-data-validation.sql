-- ============================================================
-- MODULE 5 — SQL Advanced: Data Validation
-- ============================================================

-- ============================================================
-- 1. FINDING DUPLICATES
-- ============================================================

-- Count duplicates by email
SELECT Email, COUNT(*) AS cnt
FROM Customers
GROUP BY Email
HAVING COUNT(*) > 1;

-- Return full duplicate rows
SELECT *
FROM Customers
WHERE Email IN (
    SELECT Email
    FROM Customers
    GROUP BY Email
    HAVING COUNT(*) > 1
);

-- Interview Q: Find customers with more than one active account
SELECT CustomerID, COUNT(*) AS AccountCount
FROM Accounts
WHERE Status = 'Active'
GROUP BY CustomerID
HAVING COUNT(*) > 1;


-- ============================================================
-- 2. FINDING NULLs
-- ============================================================

-- Find rows with NULL email
SELECT * FROM Customers WHERE Email IS NULL;

-- Replace NULL with default value
SELECT ISNULL(Email, 'no-email@unknown.com') AS Email FROM Customers;

-- Return first non-NULL across columns (COALESCE)
SELECT COALESCE(MobilePhone, HomePhone, WorkPhone, 'No phone') AS ContactNumber
FROM Customers;

-- NULL vs empty string — they are NOT the same
-- IS NULL catches actual NULLs; '' is an empty but known value
SELECT * FROM Customers WHERE Email IS NULL;     -- catches NULLs
SELECT * FROM Customers WHERE Email = '';        -- catches empty strings
SELECT * FROM Customers WHERE ISNULL(Email, '') = '';  -- catches both


-- ============================================================
-- 3. ORPHANED RECORDS
-- ============================================================

-- Orders with no matching Customer (orphans)
SELECT o.*
FROM Orders o
LEFT JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.CustomerID IS NULL;

-- Alternative using NOT EXISTS
SELECT *
FROM Orders o
WHERE NOT EXISTS (
    SELECT 1 FROM Customers c WHERE c.CustomerID = o.CustomerID
);


-- ============================================================
-- 4. RECORD COUNT RECONCILIATION
-- ============================================================

-- Compare row counts between staging and target
SELECT 'Source' AS TableName, COUNT(*) AS RowCount FROM StagingOrders
UNION ALL
SELECT 'Target',               COUNT(*) AS RowCount FROM Orders;

-- Find rows in source that are missing from target
SELECT COUNT(*) AS MissingInTarget
FROM StagingOrders s
WHERE NOT EXISTS (
    SELECT 1 FROM Orders o WHERE o.OrderID = s.OrderID
);


-- ============================================================
-- 5. AGGREGATE / RANGE VALIDATION
-- ============================================================

-- Check all amounts are positive
SELECT COUNT(*) AS NegativeAmounts
FROM Orders
WHERE Amount < 0;

-- Compare sum totals between source and target
SELECT 'Source' AS Src, SUM(Amount) AS TotalAmount FROM StagingOrders
UNION ALL
SELECT 'Target',         SUM(Amount) AS TotalAmount FROM Orders;

-- Flag outliers outside expected range
SELECT OrderID, Amount
FROM Orders
WHERE Amount > 100000 OR Amount < 0;

-- Full data quality check summary
SELECT
    COUNT(*)                                    AS TotalRows,
    SUM(CASE WHEN Email IS NULL THEN 1 ELSE 0 END)     AS NullEmails,
    SUM(CASE WHEN Amount < 0 THEN 1 ELSE 0 END)        AS NegativeAmounts,
    SUM(CASE WHEN CustomerID IS NULL THEN 1 ELSE 0 END) AS NullCustomerIDs
FROM Orders;
