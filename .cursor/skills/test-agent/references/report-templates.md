# Report Templates - Output Formats

Templates and formats for test results and reports.

---

## Console Output Format

### 1. Rule Analysis Header

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 RULE ANALYSIS: {Agent Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Loaded rules: {rulesSourcePath}
Extracted:
  ✓ Name validation rules
  ✓ Auto-fix rules
  ✓ Warning/stop rules
  ✓ Conversation/confirmation flow rules
  ✓ Agent-specific branch rules

Generating test cases...
```

### 2. Test Plan Summary

```
✓ Generated {N} test cases for {Agent Name}:
  - Name Happy Path:            {N1}
  - Name Auto-fix:              {N2}
  - Name Warning/Stop:          {N3}
  - Name Duplicates:            {N4}
  - Conversation/Confirmation:  {N5}
  - {AgentSpecificCategory1}:   {N6}
  - {AgentSpecificCategory2}:   {N7}

Running tests...
```

### 3. Individual Test Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #{ID}: {Category} - {Description}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simulating input/flow: {input}
Expected behavior: {expected}

Applying rules...
- autoFix("{input}") = "{fixed}"
- startsWithNumber("{fixed}") = {true|false}
- finalName = "{finalName}"
- checkExists("{finalName}") = {true|false}
- detectCzech("{fixed}") = {true|false}
- detectPlural("{fixed}") = {true|false}

Output:   {action} "{result}"
Expected: {expected}

{✅ PASS | ❌ FAIL} | Test #{ID} | {summary} | {Category}
```

### 4. Results Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TEST RESULTS: {Agent Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total tests: {total}
✅ Passed:    {passed} ({passPercentage}%)
❌ Failed:    {failed} ({failPercentage}%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Results by category:

{Name category}:              {p}/{t}  {✅|⚠️}  {%}
{Conversation category}:      {p}/{t}  {✅|⚠️}  {%}
{Branch category}:            {p}/{t}  {✅|⚠️}  {%}
{Optional category}:          {p}/{t}  {✅|⚠️}  {%}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5. Failed Tests Block (if any)

```
❌ FAILED TESTS:

Test #{ID}: {Category} - {Description}
  Input/Flow:  {input}
  Expected:    {expected}
  Actual:      {actual}
  Issue:       {problemDescription}

[... repeat ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. Recommendations

```
💡 IMPROVEMENT RECOMMENDATIONS:

1. {Recommendation 1}
2. {Recommendation 2}
3. {Recommendation 3}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 7. Report Location

```
📄 Full report saved:
.cursor/test-reports/{agent-name}-{timestamp}.md
```

---

## Markdown Report Format

**Filename:** `{agent-name}-{YYYY-MM-DD}.md`

### Template

```markdown
# Test Report: {Agent Name}

**Date:** {YYYY-MM-DD}
**Agent:** {Agent Name}
**Rules:** `{rulesSourcePath}`
**Tester:** Test Agent (Simulated)

---

## Summary

| Category | Total | Passed | Failed | Success Rate |
|----------|-------|--------|--------|--------------|
| Name Happy Path | {t} | {p} | {f} | {%} |
| Name Auto-fix | {t} | {p} | {f} | {%} |
| Name Warning/Stop | {t} | {p} | {f} | {%} |
| Name Duplicates | {t} | {p} | {f} | {%} |
| Conversation/Confirmation | {t} | {p} | {f} | {%} |
| {AgentSpecificCategory1} | {t} | {p} | {f} | {%} |
| {AgentSpecificCategory2} | {t} | {p} | {f} | {%} |
| **TOTAL** | **{t}** | **{p}** | **{f}** | **{%}** |

---

## Detailed Results

### Name Happy Path

| ID | Input/Flow | Expected | Actual | Result |
|----|------------|----------|--------|--------|
| A1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |

### Name Auto-fix

| ID | Input/Flow | Expected | Actual | Result |
|----|------------|----------|--------|--------|
| B1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |

### Name Warning/Stop

| ID | Input/Flow | Expected | Actual | Result |
|----|------------|----------|--------|--------|
| C1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |

### Name Duplicates

| ID | Input/Flow | Expected | Actual | Result |
|----|------------|----------|--------|--------|
| D1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |

### Conversation/Confirmation

| ID | Input/Flow | Expected | Actual | Result |
|----|------------|----------|--------|--------|
| E1 | `{flow}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |

### {AgentSpecificCategory1}

| ID | Input/Flow | Expected | Actual | Result |
|----|------------|----------|--------|--------|
| F1 | `{flow}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |

---

## Failed Tests

- Test #{ID}: {issue}

## Recommendations

1. {Recommendation 1}
2. {Recommendation 2}

## Conclusion

{Overall assessment}
```
