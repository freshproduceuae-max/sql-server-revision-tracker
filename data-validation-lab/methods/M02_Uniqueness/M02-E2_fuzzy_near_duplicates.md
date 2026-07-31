# M02 — Uniqueness | Example 2: Near-Duplicate / Fuzzy Match Detection

## The Question
> Your deduplication run from Example 1 caught exact duplicates. But the data quality
> manager flags another issue:
> **"We still see what look like the same person with slightly different names —
> 'Sara Thompson' and 'Sarah Thompson' both share the same email address.
> How do you detect near-duplicates that exact matching misses?"**

---

## Table Reference
**Employees** — `schemas/04_Employees.csv`

E001 = "Sarah Thompson" and E015 = "Sara Thompson" — both share sarah.thompson@corp.com.

---

## Solution Query

```sql
-- Method A: Shared business key (same email, different name or ID)
SELECT
    A.EmployeeID   AS ID_A,
    A.FullName     AS Name_A,
    B.EmployeeID   AS ID_B,
    B.FullName     AS Name_B,
    A.Email,
    A.Department,
    'Shared Email — possible near-duplicate' AS Flag
FROM Employees A
JOIN Employees B
    ON  A.Email       = B.Email
    AND A.EmployeeID <> B.EmployeeID
    AND A.EmployeeID  < B.EmployeeID   -- avoids showing (A,B) and (B,A)
WHERE A.Email IS NOT NULL;

-- Method B: SOUNDEX — same phonetic sound of name, same department
SELECT
    A.EmployeeID   AS ID_A,
    A.FullName     AS Name_A,
    B.EmployeeID   AS ID_B,
    B.FullName     AS Name_B,
    A.Department,
    SOUNDEX(A.FullName) AS SoundexCode,
    'Phonetic match in same department' AS Flag
FROM Employees A
JOIN Employees B
    ON  SOUNDEX(A.FullName) = SOUNDEX(B.FullName)
    AND A.Department        = B.Department
    AND A.EmployeeID       <> B.EmployeeID
    AND A.EmployeeID        < B.EmployeeID;

-- Method C: DIFFERENCE() — similarity score 0-4 (4 = very similar)
SELECT
    A.EmployeeID   AS ID_A,
    A.FullName     AS Name_A,
    B.EmployeeID   AS ID_B,
    B.FullName     AS Name_B,
    DIFFERENCE(A.FullName, B.FullName) AS SimilarityScore
FROM Employees A
JOIN Employees B
    ON  A.EmployeeID       <> B.EmployeeID
    AND A.EmployeeID        < B.EmployeeID
WHERE DIFFERENCE(A.FullName, B.FullName) >= 3;  -- 3 or 4 = high similarity
```

---

## Expected Output

**Method A (shared email):**
| ID_A | Name_A | ID_B | Name_B | Email | Flag |
|---|---|---|---|---|---|
| E001 | Sarah Thompson | E015 | Sara Thompson | sarah.thompson@corp.com | Shared Email — possible near-duplicate |

**Method B (SOUNDEX):**
| ID_A | Name_A | ID_B | Name_B | Department | SoundexCode |
|---|---|---|---|---|---|
| E001 | Sarah Thompson | E015 | Sara Thompson | Sales | S636 |

---

## Explanation

### How SOUNDEX converts names into phonetic codes
SOUNDEX converts a string into a 4-character code that represents how it sounds,
not how it is spelled. The first character is the first letter; the remaining
three are digits encoding consonant sounds. "Sarah" and "Sara" produce the same
code because they sound identical when spoken. This makes SOUNDEX powerful for
catching name typos, nicknames, and transcription errors that exact matching misses.

### Using DIFFERENCE() as a similarity score
DIFFERENCE() compares two SOUNDEX codes and returns a score from 0 (no similarity)
to 4 (near-identical sound). A score of 3 or 4 is a strong near-duplicate signal.
It works best on single words — for full names, apply it to the full FullName string
or split first and last names and score them separately for more precision.

### These are candidate flags, not confirmed duplicates
Both SOUNDEX and DIFFERENCE are heuristics — they surface rows that look similar,
but a human or a second confirming rule must decide whether two records are truly
the same person. The standard pattern is: (1) flag candidates with SOUNDEX, then
(2) narrow by a second attribute like hire date, department, or salary before
marking as confirmed duplicates.

---

## Interview Angle
*"How do you detect duplicates where names are spelled slightly differently?"*
Use SOUNDEX or DIFFERENCE for phonetic matching. For more advanced fuzzy matching
(e.g., Levenshtein distance), use Python with `fuzzywuzzy` or SQL CLR functions.
In Azure, Azure Cognitive Search and Purview have built-in entity matching.

---

## Severity: **High**
Near-duplicates inflate headcounts, cause duplicate payroll runs, and break
role-based access controls if the same person has two active accounts.
