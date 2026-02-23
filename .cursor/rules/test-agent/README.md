# Test Agent - Documentation

Automated testing framework for validating other agents' behavior and rules.

## Overview

Test Agent systematically validates that other agents (like Block Creator) correctly handle various inputs according to their defined rules.

## How It Works

```
User says: "otestuj create block"
         ↓
Test Agent loads rules from create-block skill (SKILL.md)
         ↓
Generates test cases (happy path, auto-fix, warnings, edge cases)
         ↓
Simulates each input through the agent's logic
         ↓
Compares actual output with expected behavior
         ↓
Generates detailed report with pass/fail results
```

## Files in This Folder

| File | Purpose |
|------|---------|
| `test-agent.mdc` | Main agent rules and workflow |
| `README.md` | This documentation file |
| `test-cases.md` | Test case generators and examples for different agents |
| `detection-logic.md` | Implementation details for validation algorithms |
| `report-templates.md` | Output format templates for reports |

## Quick Start

### Testing Block Creator

```
👤 User: otestuj create block
```

Test Agent will:
1. Load rules from `create-block` skill (`.cursor/skills/create-block/SKILL.md`)
2. Generate ~25 test cases
3. Validate behaviors like:
   - PascalCase → kebab-case conversion
   - Czech word detection
   - Plural → singular suggestions
   - Duplicate detection
   - Auto-appending "-block" suffix
4. Generate report in `.cursor/test-reports/`

## Test Categories

### A) Happy Path (Valid Inputs)
Tests that valid inputs are accepted without modification.

**Examples:**
- `author` → ACCEPT `author`
- `testimonial` → ACCEPT `testimonial`
- `image-gallery` → ACCEPT `image-gallery`

### B) Auto-fix Cases
Tests that common mistakes are automatically corrected.

**Examples:**
- `ImageGallery` → AUTO-FIX `image-gallery` (PascalCase)
- `hero banner` → AUTO-FIX `hero-banner` (spaces)
- `author!` → AUTO-FIX `author` (special chars)
- `BUTTON` → AUTO-FIX `button` (uppercase)

### C) Warning Cases
Tests that problematic inputs trigger warnings but may proceed.

**Examples:**
- `authors` → WARN `author` (plural detection)
- `kniha` → WARN "use English" (Czech word)
- `galerie` → WARN (Czech word without diacritics)

### D) Edge Cases
Tests handling of unusual or extreme inputs.

**Examples:**
- `` (empty) → STOP
- `---` → STOP (empty after fix)
- `very-long-component-name-that-goes-on` → ACCEPT
- `кнопка` (Cyrillic) → STOP

### E) Duplicates
Tests that existing component names are rejected.

**Examples:**
- `button` → STOP "Component 'button' already exists"
- `Video` → AUTO-FIX `video` → STOP (duplicate after fix)

## Understanding Test Results

### Console Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VÝSLEDKY TESTŮ: Block Creator Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Celkem testů: 25
✅ Prošlo:    23 (92%)
❌ Selhalo:   2 (8%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Výsledky podle kategorie:

Happy Path:     5/5  ✅ 100%
Auto-fix:       8/8  ✅ 100%
Warning:        7/8  ⚠️  87%
Edge cases:     2/3  ⚠️  67%
Duplicity:      1/1  ✅ 100%
```

### Markdown Report

Full report saved to `.cursor/test-reports/{agent-name}-{timestamp}.md` includes:
- Summary table with all test results
- Detailed breakdown of each test
- List of failed tests with analysis
- Recommendations for improving the agent

## Common Test Failures

### 1. Czech Word Not Detected

**Problem:**
```
Test #12: Warning - české slovo "výrobek"
  Vstup:     "vyrobek" (without diacritics)
  Očekávání: WARN "název by měl být v angličtině"
  Skutečnost: AUTO-FIX "vyrobek-block"
  Problém:   Agent nerozpoznal české slovo bez diakritiky
```

**Solution:** Extend Czech dictionary in `detection-logic.md` to include words without diacritics.

### 2. Unicode Not Handled

**Problem:**
```
Test #21: Edge case - unicode znaky
  Vstup:     "блок" (Cyrillic)
  Očekávání: WARN nebo REJECT
  Skutečnost: AUTO-FIX "" (empty string)
  Problém:   Agent by měl požádat o anglický název
```

**Solution:** Add non-ASCII character detection before auto-fix.

### 3. Duplicate Check After Fix

**Problem:**
```
Test #8: Auto-fix collision with existing
  Vstup:     "VIDEO" (uppercase)
  Očekávání: AUTO-FIX "video" → STOP (duplicate)
  Skutečnost: AUTO-FIX "video" → ACCEPT
  Problém:   Duplicate check must run AFTER auto-fix
```

**Solution:** Ensure duplicate check is the final validation step.

## Extending Test Agent

### Adding Tests for a New Agent

1. **Create test cases** in `test-cases.md`:
   ```markdown
   ## New Agent Tests

   ### Happy Path
   - Input: "example" → Expected: ACCEPT "example"

   ### Auto-fix
   - Input: "Example" → Expected: AUTO-FIX "example"
   ```

2. **Define detection logic** in `detection-logic.md`:
   ```javascript
   function validateNewAgent(input) {
     // validation logic
   }
   ```

3. **Add command** in `test-agent.mdc`:
   ```
   | `otestuj new agent` | Spustí testy pro New Agent |
   ```

### Customizing Report Format

Edit `report-templates.md` to change:
- Console output styling
- Markdown report structure
- Success/failure indicators
- Recommendation templates

## Best Practices

1. **Run tests after rule changes**: Always test when modifying agent rules
2. **Fix failures systematically**: Address failed tests by category
3. **Update test cases**: Add new test cases when bugs are found
4. **Document edge cases**: Record unusual inputs that caused issues
5. **Version reports**: Keep historical reports to track improvements

## Troubleshooting

### Test Agent Not Triggering

**Problem:** Saying "test create block" doesn't activate Test Agent

**Solution:** Use exact trigger phrases:
- "otestuj create block"
- "testuj block creator"
- "test agent X"

### Tests Running Slowly

**Problem:** Test execution takes too long

**Solution:** Tests run sequentially by design for accurate logging. For faster feedback, run specific test categories only (modify test-cases.md to limit scope).

### Report Not Generated

**Problem:** Console shows results but no markdown file created

**Solution:** Ensure `.cursor/test-reports/` directory exists. Test Agent will create it automatically, but file system permissions may prevent writing.

## Related Documentation

- **Block Creator**: `.cursor/skills/create-block/`
- **Test Reports**: `.cursor/test-reports/`

## Examples

See `test-cases.md` for complete examples of:
- Block Creator test scenarios
- Custom test case generators
- Edge case collections
