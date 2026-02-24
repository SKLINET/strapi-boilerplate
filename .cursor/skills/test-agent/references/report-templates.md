# Report Templates - Output Formats

Templates and formats for test results and reports.

---

## Console Output Format

### 1. Rule Analysis Header

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 RULE ANALYSIS: {Agent Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Loaded rules: {rulesSourcePath} (skill `SKILL.md` or Project Rule `.mdc`)
Extracted:
  ✓ Validation rules (English, singular)
  ✓ Auto-fix rules (PascalCase, spaces, etc.)
  ✓ Warning rules (Czech, plural)
  ✓ Stop rules (duplicates, empty)

Generating test cases...
```

### 2. Test Plan Summary

```
✓ Generated {N} test cases across {M} categories:
  - Happy Path:   {N1} tests
  - Auto-fix:     {N2} tests
  - Warning:      {N3} tests
  - Edge cases:   {N4} tests
  - Duplicates:   {N5} tests

Running tests...
```

### 3. Individual Test Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #{ID}: {Category} - {Description}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simulating input: "{input}"
Expected behavior: {expected}

Applying rules...
- detectCzech("{input}") = {result}
- detectPlural("{input}") = {result}
- autoFix("{input}") = "{fixed}"
- checkExists("{final}") = {result}

Output:   {action} "{result}"
Expected: {expected}

{✅ PASS | ❌ FAIL} | Test #{ID} | "{input}" -> "{output}" | {Category}
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

Happy Path:      {p}/{t}  {✅|⚠️}  {%}
Auto-fix:        {p}/{t}  {✅|⚠️}  {%}
Warning:         {p}/{t}  {✅|⚠️}  {%}
Edge cases:      {p}/{t}  {✅|⚠️}  {%}
Duplicates:      {p}/{t}  {✅|⚠️}  {%}
[DisplayName:    {p}/{t}  {✅|⚠️}  {%}]
[Icon:           {p}/{t}  {✅|⚠️}  {%}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5. Failed Tests Block (if any)

```
❌ FAILED TESTS:

Test #{ID}: {Category} - {Description}
  Input:      "{input}"
  Expected:   {expected}
  Actual:     {actual}
  Issue:      {problemDescription}

[... repeat for each failed test ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. Recommendations

```
💡 IMPROVEMENT RECOMMENDATIONS:

1. {Recommendation 1}
   {Details...}

2. {Recommendation 2}
   {Details...}

[... etc ...]

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

**Example:** `block-creator-2026-02-03.md`

### Full Template

```markdown
# Test Report: {Agent Name}

**Date:** {YYYY-MM-DD}
**Agent:** {Agent Name}
**Rules:** `{rulesSourcePath}` (skill `SKILL.md` or Project Rule `.mdc`)
**Tester:** Test Agent (Simulated)

---

## 📊 Summary

| Category | Total | Passed | Failed | Success Rate |
|----------|-------|--------|--------|--------------|
| Happy Path | {t} | {p} | {f} | {%} |
| Auto-fix | {t} | {p} | {f} | {%} |
| Warnings | {t} | {p} | {f} | {%} |
| Edge Cases | {t} | {p} | {f} | {%} |
| Duplicates | {t} | {p} | {f} | {%} |
| **TOTAL** | **{t}** | **{p}** | **{f}** | **{%}** |

---

## 🧪 Detailed Test Results

### A) Happy Path (Valid Inputs)

| ID | Input | Expected | Actual | Result |
|----|-------|----------|--------|--------|
| A1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |
| A2 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |
[... etc ...]

### B) Auto-fix Cases

| ID | Input | Expected | Actual | Result |
|----|-------|----------|--------|--------|
| B1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |
[... etc ...]

### C) Warning Cases

| ID | Input | Expected | Actual | Result |
|----|-------|----------|--------|--------|
| C1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |
[... etc ...]

### D) Edge Cases

| ID | Input | Expected | Actual | Result |
|----|-------|----------|--------|--------|
| D1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |
[... etc ...]

### E) Duplicates

(Checked against existing: `{existing1}`, `{existing2}`, ...)

| ID | Input | Expected | Actual | Result |
|----|-------|----------|--------|--------|
| E1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |
[... etc ...]

---

## 💡 Recommendations

1. **{Recommendation Title}**: {Description}
2. **{Recommendation Title}**: {Description}
[... etc ...]

## 🏁 Conclusion

{Overall assessment of agent performance and robustness}
```

---

## Example: Complete Console Output

### Successful Test Run (100%)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 RULE ANALYSIS: Block Creator Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Loaded rules: .cursor/skills/create-block/SKILL.md
Extracted:
  ✓ Validation rules (English, singular)
  ✓ Auto-fix rules (PascalCase, spaces, etc.)
  ✓ Warning rules (Czech, plural)
  ✓ Stop rules (duplicates, empty)

Generating test cases...

✓ Generated 25 test cases in 5 categories:
  - Happy Path:   5 tests
  - Auto-fix:     7 tests
  - Warning:      5 tests
  - Edge cases:   4 tests
  - Duplicates:   4 tests

Running tests...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #1: Happy Path - single-word name
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simulating input: "book"
Expected behavior: Accept and create "book-block"

Applying rules...
- detectCzech("book") = false
- detectPlural("book") = false
- autoFix("book") = "book" -> "book-block"
- checkExists("book-block") = false

Output:   ACCEPT "book-block"
Expected: ACCEPT "book-block"

✅ PASS | Test #1 | "book" -> "book-block" | Happy Path

[... more tests ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TEST RESULTS: Block Creator Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total tests: 25
✅ Passed:    25 (100%)
❌ Failed:    0 (0%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Results by category:

Happy Path:      5/5  ✅ 100%
Auto-fix:        7/7  ✅ 100%
Warning:         5/5  ✅ 100%
Edge cases:      4/4  ✅ 100%
Duplicates:      4/4  ✅ 100%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ All tests passed!

📄 Full report saved:
.cursor/test-reports/block-creator-2026-02-03.md
```

### Failed Test Run (92%)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TEST RESULTS: Block Creator Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total tests: 25
✅ Passed:    23 (92%)
❌ Failed:    2 (8%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Results by category:

Happy Path:     5/5  ✅ 100%
Auto-fix:       8/8  ✅ 100%
Warning:        7/8  ⚠️  87%
Edge cases:     2/3  ⚠️  67%
Duplicates:     1/1  ✅ 100%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ FAILED TESTS:

Test #12: Warning - Czech word "vyrobek"
  Input:      "vyrobek" (without diacritics)
  Expected:   WARN "name should be in English"
  Actual:     AUTO-FIX "vyrobek-block" (not detected as Czech)
  Issue:      Agent did not detect Czech word without diacritics

Test #21: Edge case - unicode characters
  Input:      "блок" (Cyrillic)
  Expected:   WARN or REJECT
  Actual:     AUTO-FIX "" (empty string after fix)
  Issue:      Agent should request an English name instead of empty output

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 IMPROVEMENT RECOMMENDATIONS:

1. Add Czech dictionary entries without diacritics
   Example: "vyrobek", "sluzba", "clanek" -> detect as Czech

   Implementation:
   - Extend `detectCzech()` with normalized forms
   - Test both: "výrobek" and "vyrobek"

2. Add non-ASCII detection before auto-fix
   If input contains Cyrillic/Asian/etc characters -> warn

   Implementation:
   - Add check: /[^\x00-\x7F]/.test(input)
   - Return WARN "Please use English characters"

3. Improve error messages for empty outputs
   Instead of generic "Name cannot be empty", specify:
   - "Name contains only invalid characters"
   - "Please use only English letters, numbers, and hyphens"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Full report saved:
.cursor/test-reports/block-creator-2026-02-03.md
```

---

## Category Indicators

Use these symbols consistently:

| Status | Symbol | Usage |
|--------|--------|-------|
| All passed | ✅ 100% | Category had no failures |
| Some failed | ⚠️ XX% | Category had failures |
| Test passed | ✅ PASS | Individual test passed |
| Test failed | ❌ FAIL | Individual test failed |
| Analysis | 🔍 | Rule analysis section |
| Testing | 🧪 | Individual test run |
| Results | 📊 | Summary section |
| Trends | 📈 | Category breakdown |
| Recommendations | 💡 | Improvement suggestions |
| Report saved | 📄 | File location |
| Success | ✨ | All tests passed |
| Conclusion | 🏁 | Final assessment |

---

## Formatting Guidelines

### Console Output

- Use box-drawing separators: `━`
- Keep aligned sections for readability
- Keep line length <= 78 characters when possible
- Use consistent indentation (2 spaces)
- Add blank lines between major sections

### Markdown Report

- Use tables for structured data
- Use heading hierarchy: `##` sections, `###` subsections
- Use **bold** for key findings
- Use fenced `code blocks` for examples
- Include links when relevant

### Color/Styling (if terminal supports)

- Green (`✅`): pass/success
- Red (`❌`): fail/error
- Yellow (`⚠️`): warning/partial success
- Blue (`🔍`): analysis/info
- Purple (`💡`): recommendations

---

## Custom Report Sections

### Agent-Specific Findings

Add custom sections when needed:

```markdown
## 🔧 Agent-Specific Findings

### DisplayName Auto-generation
- Tested: 15 cases
- All successfully converted kebab-case -> PascalCase
- Examples: `donate-amount` -> `DonateAmount` ✓

### Field Configuration Flow
- Tested: Progress tracking (Field X/Y format)
- Clear numbering maintained throughout ✓
- Summary shown after all fields configured ✓
```

### Performance Metrics

```markdown
## ⚡ Performance

- Total execution time: 2.3 seconds
- Average per test: 82ms
- Slowest test: Test #15 (Unicode handling) - 180ms
```

---

## Archiving Reports

Reports should be stored in:

```
.cursor/test-reports/{agent-name}-{YYYY-MM-DD}.md
```

Examples:
- `.cursor/test-reports/block-creator-2026-02-03.md`
- `.cursor/test-reports/block-creator-2026-02-10.md` (re-test)

Keep historical reports to track:
- Improvement over time
- Regression detection
- Evolution of test coverage
