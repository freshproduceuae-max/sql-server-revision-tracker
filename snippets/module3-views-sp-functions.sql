-- ============================================================
-- MODULE 3 — Views, Stored Procedures & Functions
-- Key SQL Snippets for Revision
-- ============================================================


-- ------------------------------------------------------------
-- 1. INDEXED VIEW (Materialised View)
-- ------------------------------------------------------------
-- WITH SCHEMABINDING is mandatory — locks the underlying table
-- structure so the view doesn't break if columns are dropped.
-- COUNT_BIG(*) is required when using GROUP BY in indexed views.

CREATE VIEW vw_SalesSummary
WITH SCHEMABINDING AS
    SELECT RegionID, SUM(Amount) AS Total, COUNT_BIG(*) AS Cnt
    FROM dbo.Orders
    GROUP BY RegionID;

-- Materialise it — this physically stores the result on disk
CREATE UNIQUE CLUSTERED INDEX IX_vw_SalesSummary
    ON vw_SalesSummary(RegionID);

-- SQL Server now serves this query from stored data, not re-running it:
SELECT * FROM vw_SalesSummary;


-- ------------------------------------------------------------
-- 2. STORED PROCEDURE — OUTPUT PARAMETER
-- ------------------------------------------------------------
-- OUTPUT keyword allows a value to be passed BACK to the caller.
-- The caller must also declare a variable and pass it with OUTPUT.

CREATE PROCEDURE usp_GetOrderCount
    @CustomerID INT,
    @OrderCount  INT OUTPUT
AS
BEGIN
    SELECT @OrderCount = COUNT(*)
    FROM Orders
    WHERE CustomerID = @CustomerID;
END;

-- Calling the procedure with OUTPUT
DECLARE @Count INT;
EXEC usp_GetOrderCount
    @CustomerID = 101,
    @OrderCount = @Count OUTPUT;

SELECT @Count AS TotalOrders;


-- ------------------------------------------------------------
-- 3. STORED PROCEDURE — INPUT PARAMETER (basic pattern)
-- ------------------------------------------------------------

CREATE PROCEDURE usp_GetEmployeesByDept
    @DeptID INT
AS
BEGIN
    SELECT EmployeeID, Name, Department
    FROM Employees
    WHERE DeptID = @DeptID;
END;

EXEC usp_GetEmployeesByDept @DeptID = 3;


-- ------------------------------------------------------------
-- 4. SCALAR FUNCTION
-- ------------------------------------------------------------
-- Returns a single value. Used inline in SELECT/WHERE.
-- Requires BEGIN...END because it can have multiple statements.

CREATE FUNCTION fn_GetFullName
    (@FirstName VARCHAR(50), @LastName VARCHAR(50))
RETURNS VARCHAR(100)
AS
BEGIN
    RETURN @FirstName + ' ' + @LastName;
END;

-- Usage
SELECT dbo.fn_GetFullName(FirstName, LastName) AS FullName
FROM Employees;


-- ------------------------------------------------------------
-- 5. INLINE TABLE-VALUED FUNCTION
-- ------------------------------------------------------------
-- Returns a table. NO BEGIN...END — only a single RETURN (SELECT).
-- Treated like a parameterised view by the query optimiser.
-- Much faster than scalar functions on large datasets.

CREATE FUNCTION fn_GetOrdersByCustomer (@CustomerID INT)
RETURNS TABLE
AS
RETURN (
    SELECT OrderID, Amount, OrderDate
    FROM Orders
    WHERE CustomerID = @CustomerID
);

-- Usage — query it like a table
SELECT * FROM dbo.fn_GetOrdersByCustomer(101);


-- ------------------------------------------------------------
-- 6. SECURITY VIEW — hide sensitive columns
-- ------------------------------------------------------------
-- Grant analyst access to the VIEW only, not the base table.
-- They can never see Salary because it's simply not in the view.

CREATE VIEW vw_EmployeePublic AS
    SELECT EmployeeID, Name, Department, JobTitle, StartDate
    FROM Employees;
    -- Salary column intentionally excluded

GRANT SELECT ON vw_EmployeePublic TO [AnalystRole];
