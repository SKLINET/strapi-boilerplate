# Report Templates - Output Formats

Templates and formats for test results and reports.

---

## Console Output Format

### 1. Test Execution Header

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 ANALÝZA PRAVIDEL: {Agent Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Načteny pravidla: .cursor/rules/{agent-folder}/{agent-file}.mdc
Extrahováno:
  ✓ Validační pravidla (English, singular)
  ✓ Auto-fix pravidla (PascalCase, spaces, etc.)
  ✓ Warning pravidla (Czech, plural)
  ✓ Stop pravidla (duplicates, empty)

Generuji test cases...
```

### 2. Test Plan Summary

```
✓ Vygenerováno {N} test cases ve {M} kategoriích:
  - Happy Path:     {N1} testů
  - Auto-fix:       {N2} testů
  - Warning:        {N3} testů
  - Edge cases:     {N4} testů
  - Duplicity:      {N5} testů
  [- DisplayName:   {N6} testů]  // only for complementary
  [- Icon:          {N7} testů]  // only for complementary

Spouštím testy...
```

### 3. Individual Test Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #{ID}: {Category} - {Description}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simuluji vstup: "{input}"
Očekávané chování: {expected}

Aplikuji pravidla...
- detectCzech("{input}") = {result}
- detectPlural("{input}") = {result}
- autoFix("{input}") = "{fixed}"
- checkExists("{final}") = {result}

Výstup: {action} "{result}"
Očekávání: {expected}

{✅ PASS | ❌ FAIL} | Test #{ID} | "{input}" → "{output}" | {Category}
```

### 4. Results Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VÝSLEDKY TESTŮ: {Agent Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Celkem testů: {total}
✅ Prošlo:    {passed} ({percentage}%)
❌ Selhalo:   {failed} ({percentage}%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Výsledky podle kategorie:

Happy Path:      {p}/{t}  {✅|⚠️}  {%}
Auto-fix:        {p}/{t}  {✅|⚠️}  {%}
Warning:         {p}/{t}  {✅|⚠️}  {%}
Edge cases:      {p}/{t}  {✅|⚠️}  {%}
Duplicity:       {p}/{t}  {✅|⚠️}  {%}
[DisplayName:    {p}/{t}  {✅|⚠️}  {%}]
[Icon:           {p}/{t}  {✅|⚠️}  {%}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5. Failed Tests (if any)

```
❌ SELHANÉ TESTY:

Test #{ID}: {Category} - {Description}
  Vstup:     "{input}"
  Očekávání: {expected}
  Skutečnost: {actual}
  Problém:   {problem description}

[... repeat for each failed test ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. Recommendations

```
💡 DOPORUČENÍ PRO ZLEPŠENÍ:

1. {Recommendation 1}
   {Details...}

2. {Recommendation 2}
   {Details...}

[... etc ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 7. Report Location

```
📄 Kompletní report uložen:
.cursor/test-reports/{agent-name}-{timestamp}.md
```

---

## Markdown Report Format

**Filename:** `{agent-name}-{YYYY-MM-DD}.md`

**Example:** `complementary-creator-2026-02-03.md`

### Full Template

```markdown
# Test Report: {Agent Name}

**Date:** {YYYY-MM-DD}
**Agent:** {Agent Name}
**Rules:** `.cursor/rules/{folder}/{file}.mdc`
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
[| DisplayName | {t} | {p} | {f} | {%} |]
[| Icon | {t} | {p} | {f} | {%} |]
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

(Checking against existing: `{existing1}`, `{existing2}`, ...)

| ID | Input | Expected | Actual | Result |
|----|-------|----------|--------|--------|
| E1 | `{input}` | {expected} | {actual} | {✅ PASS | ❌ FAIL} |
[... etc ...]

[### F) DisplayName Validation]

[### G) Icon Validation]

---

## 💡 Recommendations

1.  **{Recommendation Title}**: {Description}
2.  **{Recommendation Title}**: {Description}
[... etc ...]

## 🏁 Conclusion

{Overall assessment of agent performance and robustness}

```

---

## Example: Complete Console Output

### Successful Test Run (100%)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 ANALÝZA PRAVIDEL: Complementary Creator Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Načteny pravidla: .cursor/rules/create-complementary/create-complementary.mdc
Extrahováno:
  ✓ Validační pravidla (English, singular)
  ✓ Auto-fix pravidla (PascalCase, spaces, etc.)
  ✓ Warning pravidla (Czech, plural)
  ✓ Stop pravidla (duplicates, empty)

Generuji test cases...

✓ Vygenerováno 28 test cases ve 7 kategoriích:
  - Happy Path:     5 testů
  - Auto-fix:       7 testů
  - Warning:        5 testů
  - Edge cases:     4 testů
  - Duplicity:      3 testů
  - DisplayName:    2 testy
  - Icon:           2 testy

Spouštím testy...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #1: Happy Path - jednoslovný název
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simuluji vstup: "author"
Očekávané chování: Přijmout, vytvořit "author" complementary

Aplikuji pravidla...
- detectCzech("author") = false
- detectPlural("author") = false
- autoFix("author") = "author"
- checkExists("author") = false

Výstup: ACCEPT "author"
Očekávání: ACCEPT "author"

✅ PASS | Test #1 | "author" → "author" | Happy Path

[... tests #2-27 ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #28: Icon - prázdný je OK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simuluji vstup: icon=""
Očekávané chování: ACCEPT - icon je optional

✅ PASS | Test #28 | icon="" → ACCEPT | Icon optional

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VÝSLEDKY TESTŮ: Complementary Creator Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Celkem testů: 28
✅ Prošlo:    28 (100%)
❌ Selhalo:   0 (0%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Výsledky podle kategorie:

Happy Path:      5/5  ✅ 100%
Auto-fix:        7/7  ✅ 100%
Warning:         5/5  ✅ 100%
Edge cases:      4/4  ✅ 100%
Duplicity:       3/3  ✅ 100%
DisplayName:     2/2  ✅ 100%
Icon:            2/2  ✅ 100%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Všechny testy prošly!

📄 Kompletní report uložen:
.cursor/test-reports/complementary-creator-2026-02-03.md
```

### Failed Test Run (92%)

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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ SELHANÉ TESTY:

Test #12: Warning - české slovo "výrobek"
  Vstup:     "vyrobek" (without diacritics)
  Očekávání: WARN "název by měl být v angličtině"
  Skutečnost: AUTO-FIX "vyrobek-block" (nedetekováno jako české)
  Problém:   Agent nerozpoznal české slovo bez diakritiky

Test #21: Edge case - unicode znaky
  Vstup:     "блок" (Cyrillic)
  Očekávání: WARN nebo REJECT
  Skutečnost: AUTO-FIX "" (empty string after fix)
  Problém:   Agent by měl požádat o anglický název místo prázdného výstupu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 DOPORUČENÍ PRO ZLEPŠENÍ:

1. Přidat slovník českých slov (bez diakritiky) pro detekci
   Příklad: "vyrobek", "sluzba", "clanek" → rozpoznat jako české

   Implementace:
   - Rozšířit `detectCzech()` o normalizované formy
   - Testovat oba: "výrobek" a "vyrobek"

2. Přidat detekci non-ASCII unicode znaků před auto-fix
   Pokud vstup obsahuje cyrilici, asijské znaky apod. → varovat

   Implementace:
   - Přidat kontrolu: /[^\x00-\x7F]/.test(input)
   - Vrátit WARN "Please use English characters"

3. Zlepšit error messages pro prázdné výstupy
   Místo generického "Name cannot be empty", specifikovat:
   - "Name contains only invalid characters"
   - "Please use only English letters, numbers, and hyphens"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Kompletní report uložen:
.cursor/test-reports/block-creator-2026-02-03.md
```

---

## Category Indicators

Use these emoji/icon patterns consistently:

| Status | Symbol | Usage |
|--------|--------|-------|
| All passed | ✅ 100% | Category had no failures |
| Some failed | ⚠️ XX% | Category had failures |
| Test passed | ✅ PASS | Individual test passed |
| Test failed | ❌ FAIL | Individual test failed |
| Analysis | 🔍 | Beginning analysis |
| Testing | 🧪 | Running test |
| Results | 📊 | Showing summary |
| Trends | 📈 | Category breakdown |
| Recommendations | 💡 | Improvement suggestions |
| Report saved | 📄 | File location |
| Success | ✨ | All tests passed |
| Conclusion | 🏁 | Final assessment |

---

## Formatting Guidelines

### Console Output

- Use box drawing characters: `━` for separators
- Use fixed-width sections for alignment
- Keep line length ≤ 78 characters
- Use consistent indentation (2 spaces)
- Add blank lines between major sections

### Markdown Report

- Use tables for structured data
- Use headings hierarchy: `##` for sections, `###` for subsections
- Use **bold** for emphasis on key findings
- Use `code blocks` for examples
- Include links where relevant

### Color/Styling (if terminal supports)

- Green (✅): success, pass
- Red (❌): failure, fail
- Yellow (⚠️): warning, partial success
- Blue (🔍): information, analysis
- Purple (💡): suggestions, recommendations

---

## Custom Report Sections

### For Agent-Specific Findings

Add custom sections as needed:

```markdown
## 🔧 Agent-Specific Findings

### DisplayName Auto-generation
- Tested: 15 cases
- All successfully converted kebab-case → PascalCase
- Examples: `donate-amount` → `DonateAmount` ✓

### Field Configuration Flow
- Tested: Progress tracking (Field X/Y format)
- Clear numbering maintained throughout ✓
- Summary shown after all fields configured ✓
```

### For Performance Metrics

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
- `.cursor/test-reports/complementary-creator-2026-02-03.md`
- `.cursor/test-reports/block-creator-2026-02-10.md` (re-test)

Keep historical reports to track:
- Improvement over time
- Regression detection
- Evolution of test coverage
