# Test Agent - Documentation

Automated testing framework for validating other agents' behavior and rules.

## Overview

Test Agent validates that other agents (like Block Creator) handle inputs correctly according to their rules.

## How It Works

```
User says: "otestuj create block"
         ↓
Test Agent loads rules from create-block skill (`SKILL.md`)
         ↓
Generates test cases (happy path, auto-fix, warning, edge cases)
         ↓
Simulates each input through the agent logic
         ↓
Compares actual output with expected behavior
         ↓
Generates a detailed pass/fail report
```

## Files in This Folder

| File | Purpose |
|------|---------|
| `../SKILL.md` | Main skill rules and workflow |
| `README.md` | This documentation file |
| `test-cases.md` | Test case generators and examples for different agents |
| `detection-logic.md` | Implementation details for validation algorithms |
| `report-templates.md` | Output format templates for console + markdown reports |

## Quick Start

### Testing Block Creator

```
👤 User: otestuj create block
```

Test Agent will:
1. Load rules from `create-block` skill (`.cursor/skills/create-block/SKILL.md`)
2. Generate ~25 test cases
3. Validate behavior such as:
   - PascalCase -> kebab-case conversion
   - Czech word detection
   - Plural -> singular suggestions
   - Duplicate detection
   - Auto-appending `-block` suffix
4. Generate report in `.cursor/test-reports/`

## Test Categories

### A) Happy Path (Valid Inputs)
Tests that valid inputs are accepted without modification.

**Examples:**
- `author` -> ACCEPT `author`
- `testimonial` -> ACCEPT `testimonial`
- `image-gallery` -> ACCEPT `image-gallery`

### B) Auto-fix Cases
Tests that common mistakes are automatically corrected.

**Examples:**
- `ImageGallery` -> AUTO-FIX `image-gallery` (PascalCase)
- `hero banner` -> AUTO-FIX `hero-banner` (spaces)
- `author!` -> AUTO-FIX `author` (special chars)
- `BUTTON` -> AUTO-FIX `button` (uppercase)

### C) Warning Cases
Tests that problematic inputs trigger warnings but may proceed after confirmation.

**Examples:**
- `authors` -> WARN `author` (plural detection)
- `kniha` -> WARN "use English" (Czech word)
- `galerie` -> WARN (Czech word without diacritics)

### D) Edge Cases
Tests unusual or extreme inputs.

**Examples:**
- `` (empty) -> STOP
- `---` -> STOP (empty after fix)
- `very-long-component-name-that-goes-on` -> ACCEPT
- `кнопка` (Cyrillic) -> STOP

### E) Duplicates
Tests that existing component names are rejected.

**Examples:**
- `button` -> STOP "Component 'button' already exists"
- `Video` -> AUTO-FIX `video` -> STOP (duplicate after fix)

## Understanding Test Results

### Console Output

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
```

### Markdown Report

Full report saved to `.cursor/test-reports/{agent-name}-{timestamp}.md` includes:
- Summary table with all test results
- Detailed breakdown of each test
- Failed test list with analysis
- Recommendations for improving the agent

## Common Test Failures

### 1. Czech Word Not Detected

**Problem:**
```
Test #12: Warning - Czech word "vyrobek"
  Input:      "vyrobek" (without diacritics)
  Expected:   WARN "name should be in English"
  Actual:     AUTO-FIX "vyrobek-block"
  Issue:      Agent did not detect Czech word without diacritics
```

**Solution:** Extend Czech dictionary in `detection-logic.md` to include words without diacritics.

### 2. Unicode Not Handled

**Problem:**
```
Test #21: Edge case - unicode characters
  Input:      "блок" (Cyrillic)
  Expected:   WARN or REJECT
  Actual:     AUTO-FIX "" (empty string)
  Issue:      Agent should request an English name
```

**Solution:** Add non-ASCII detection before auto-fix.

### 3. Duplicate Check After Auto-fix

**Problem:**
```
Test #8: Auto-fix collision with existing
  Input:      "VIDEO" (uppercase)
  Expected:   AUTO-FIX "video" -> STOP (duplicate)
  Actual:     AUTO-FIX "video" -> ACCEPT
  Issue:      Duplicate check must run AFTER auto-fix
```

**Solution:** Ensure duplicate check is the final validation step.

## Extending Test Agent

### Adding Tests for a New Agent

1. **Create test cases** in `test-cases.md`:
   ```markdown
   ## New Agent Tests

   ### Happy Path
   - Input: "example" -> Expected: ACCEPT "example"

   ### Auto-fix
   - Input: "Example" -> Expected: AUTO-FIX "example"
   ```

2. **Define detection logic** in `detection-logic.md`:
   ```javascript
   function validateNewAgent(input) {
       // validation logic
   }
   ```

3. **Add command** in `SKILL.md`:
   ```
   | `otestuj new agent` | Runs tests for New Agent |
   ```

### Customizing Report Format

Edit `report-templates.md` to change:
- Console output structure
- Markdown report structure
- Success/failure indicators
- Recommendation templates

## Best Practices

1. **Run tests after rule changes**: always test when agent rules are modified
2. **Fix failures systematically**: address failed tests by category
3. **Update test cases**: add new tests when bugs are found
4. **Document edge cases**: record unusual inputs that caused issues
5. **Version reports**: keep historical reports to track improvements

## Troubleshooting

### Test Agent Not Triggering

**Problem:** Saying "test create block" does not activate Test Agent.

**Solution:** Use trigger phrases:
- `otestuj create block`
- `testuj block creator`
- `test agent X`

### Tests Running Slowly

**Problem:** Execution takes too long.

**Solution:** Tests run sequentially by design for clear logging. For faster feedback, run only specific categories (scope in `test-cases.md`).

### Report Not Generated

**Problem:** Console shows results but markdown file is missing.

**Solution:** Ensure `.cursor/test-reports/` exists. Test Agent creates it automatically, but permissions can block writes.

## Related Documentation

- **Block Creator**: `.cursor/skills/create-block/`
- **Test Reports**: `.cursor/test-reports/`

## Examples

See `test-cases.md` for complete examples of:
- Block Creator test scenarios
- Custom test case generators
- Edge case collections
