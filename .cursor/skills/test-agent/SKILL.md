---
name: test-agent
description: Automatically tests other agent workflows by generating test cases, simulating user inputs, and producing pass/fail reports. Use when user says "otestuj create block", "testuj block creator", or "test agent X".
compatibility: Strapi boilerplate monorepo (frontend/ Next.js + cms/ Strapi)
---

# Test Agent

Automatically tests other agents by generating use cases, simulating user responses, and evaluating outputs.

**Reference files in this folder:**
- [references/README.md](references/README.md) - Documentation and usage examples
- [references/test-cases.md](references/test-cases.md) - Test case generators and templates for different agents
- [references/detection-logic.md](references/detection-logic.md) - Detection algorithms (Czech detection, plural checks, auto-fix, etc.)
- [references/report-templates.md](references/report-templates.md) - Console and markdown report output formats

---

## Trigger

Activate when user says:
- "otestuj create block"
- "testuj block creator"
- "test agent X"

---

## Test Workflow Overview

```
1. Load tested agent rules
2. Analyze rules and generate test cases
3. For each test case:
   a) Simulate user input
   b) Apply rules (as if you were the tested agent)
   c) Record output
   d) Compare with expected behavior
4. Generate evaluation and report
```

---

## Step 1: Load tested agent rules

When user says "otestuj create block":

1. Load `.cursor/skills/create-block/SKILL.md`
2. Load relevant section from `AGENTS.md` (if present)
3. Extract:
   - Validation rules
   - Expected behavior for different inputs
   - Auto-fix rules
   - Warning rules
   - Stop rules

**Show:**
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
```

---

## Step 2: Generate test cases

**Automatically generate test cases based on extracted rules.**

**Test categories:**
- **A) Happy Path** - valid inputs
- **B) Auto-fix** - inputs requiring correction
- **C) Warning** - inputs that should trigger warning
- **D) Edge cases** - unusual/extreme inputs
- **E) Duplicates** - inputs conflicting with existing items

**See details:** [references/test-cases.md](references/test-cases.md)

**Show:**
```
✓ Generated 28 test cases across 5 categories:
  - Happy Path:     5 tests
  - Auto-fix:       7 tests
  - Warning:        5 tests
  - Edge cases:     4 tests
  - Duplicates:     3 tests
  - DisplayName:    2 tests
  - Icon:           2 tests

Running tests...
```

---

## Step 3: Run tests

For each test case:

### 3.1 Show what is being tested
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #1: Happy Path - single-word name
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simulating input: "book"
Expected behavior: Accept and create "book-block"
```

### 3.2 Apply rules (simulate tested agent)
```javascript
// Logic simulation:
input = "book"

// 1. Check Czech
isCzech = detectCzech(input) // false

// 2. Check plural
isPlural = detectPlural(input) // false

// 3. Auto-fix + -block suffix
fixed = autoFix(input) // "book"
blockName = fixed + "-block" // "book-block"

// 4. Check duplicate
isDuplicate = checkExists(blockName) // false

// Output: ACCEPT "book-block"
```

**Implementation details:** [references/detection-logic.md](references/detection-logic.md)

### 3.3 Compare with expected result
```
Agent output: ACCEPT "book-block"
Expected:     ACCEPT "book-block"
Match:        ✅ YES
```

### 3.4 Record result
```
✅ PASS | Test #1 | "book" → "book-block" | Happy Path
```

---

## Step 4: Generate evaluation and report

After all tests are complete:

### 4.1 Show console summary

**Format reference:** [references/report-templates.md](references/report-templates.md)

```
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

📄 Full report saved:
.cursor/test-reports/block-creator-2026-02-03.md
```

### 4.2 Save markdown report

**File:** `.cursor/test-reports/{agent-name}-{timestamp}.md`

**Template reference:** [references/report-templates.md](references/report-templates.md)

Report includes:
- Results summary (table)
- Detailed result for each test
- Failed test list with details
- Improvement recommendations

---

## Commands

| Command | Action |
|--------|------|
| `otestuj create block` | Runs automated tests for Block Creator |
| `otestuj agenta X` | Runs tests for agent X |
| `zobraz posledni report` | Opens latest test report |

---

## Testing Different Agents

### Block Creator Agent
- Test categories: Happy Path, Auto-fix, Warning, Edge cases, Duplicates
- Key validations: English names, singular form, no duplicates
- Specific behavior: Auto-appends "-block" suffix

**Test cases:** [references/test-cases.md](references/test-cases.md) -> "Block Creator Tests"

---

## Checklist

### Pre-test:
- [ ] Load agent rules (`SKILL.md` for skills, `.mdc` for Project Rules)
- [ ] Parse validation rules
- [ ] Parse auto-fix rules
- [ ] Parse warning rules
- [ ] Parse stop rules
- [ ] Scan existing components (for duplicate detection)

### Test execution:
- [ ] Generate test cases for all categories
- [ ] Show test plan summary
- [ ] Run tests sequentially
- [ ] Record results (pass/fail)
- [ ] Track detailed errors

### Post-test:
- [ ] Calculate success rate
- [ ] Group results by category
- [ ] Identify failed tests
- [ ] Generate recommendations
- [ ] Show console summary
- [ ] Save markdown report

---

## Example Usage

```
👤 User: otestuj create block

🤖 Test Agent:
   Loading rules from create-block skill...
   Generating test cases...

   Found 25 test cases in 5 categories.
   Running tests...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #1: Happy Path - "book"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input: "book"
Agent output: ACCEPT -> "book-block"
Expected: ACCEPT -> "book-block"
✅ PASS

... (more tests) ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 RESULTS: 25/25 tests passed (100%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ All tests passed!

📄 Report: .cursor/test-reports/block-creator-2026-02-03.md
```
