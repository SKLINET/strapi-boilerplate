---
name: test-agent
description: Automatically tests `create-block` and `create-complementary` workflows by generating test cases, simulating user inputs, and producing pass/fail reports.
compatibility: Strapi boilerplate monorepo (frontend/ Next.js + cms/ Strapi)
---

# Test Agent

Automatically tests agent workflows by generating use cases, simulating user responses, and evaluating outputs.

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
- "otestuj create complementary"
- "testuj complementary creator"
- "test agent X"

---

## Supported Targets

| User intent | Tested rules source |
|-------------|---------------------|
| `create block` | `.cursor/skills/create-block/SKILL.md` |
| `create complementary` | `.cursor/skills/create-complementary/SKILL.md` |

If user asks for another agent, test it only if its rules file exists. Otherwise return "not supported yet" and continue with guidance.

---

## Test Workflow Overview

```
1. Resolve tested agent and load rules
2. Analyze rules and generate test plan
3. For each test case:
   a) Simulate user input
   b) Apply rules (as if you were the tested agent, including flow state)
   c) Record output
   d) Compare with expected behavior
4. Generate evaluation and report
```

---

## Step 1: Resolve target and load tested rules

When user says:
- "otestuj create block" -> load `.cursor/skills/create-block/SKILL.md`
- "otestuj create complementary" -> load `.cursor/skills/create-complementary/SKILL.md`

Then:
1. Load target skill file (`SKILL.md`)
2. Load relevant section from `AGENTS.md` (if present)
3. Extract:
   - Name validation rules
   - Question flow rules (one-at-a-time, required follow-ups)
   - Confirmation gate rules (must not create files before "Yes")
   - Branch rules (location, getStaticProps, app-context, field types)
   - Critical file update requirements
   - Auto-fix rules
   - Warning rules
   - Stop rules

**Show:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 RULE ANALYSIS: {Agent Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Loaded rules: {rulesPath}
Extracted:
  ✓ Name validation rules
  ✓ Auto-fix rules
  ✓ Warning and stop rules
  ✓ Conversation/confirmation flow rules
  ✓ Agent-specific branch rules

Generating test cases...
```

---

## Step 2: Generate test cases

Automatically generate cases from extracted rules. Do not use hardcoded categories if the target agent does not define them.

### 2.1 Base categories (both agents)
- **A) Name Happy Path**
- **B) Name Auto-fix**
- **C) Name Warning/Stop**
- **D) Name Duplicates (including duplicate priority ordering)**
- **E) Conversation Flow & Confirmation**

### 2.2 Agent-specific categories

For **create-block** add:
- **F) Location Routing** (`page`, `template`, `both`)
- **G) Critical File Updates** (`client.ts`, `getBlockType`, `TemplateBlock` when needed, `server.ts`)
- **H) getStaticProps Branch**
- **I) DisplayName/Icon validation**

For **create-complementary** add:
- **F) Field Parsing and Iterative Questions**
- **G) Type-Specific Follow-Ups** (`enumeration`, `media`, `relation`, `component`, `number`)
- **H) App Context Branch**
- **I) DisplayName/Icon handling**

**Show:**
```
✓ Generated {N} test cases for {Agent Name}:
  - Name Happy Path:            {N1}
  - Name Auto-fix:              {N2}
  - Name Warning/Stop:          {N3}
  - Name Duplicates:            {N4}
  - Conversation/Confirmation:  {N5}
  - {Agent-specific category}:  {N6}
  - ...

Running tests...
```

---

## Step 3: Run tests

For each test case:

### 3.1 Show what is being tested
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #{ID}: {Category} - {Description}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simulating case: {inputOrDialogue}
Expected behavior: {expected}
```

### 3.2 Apply name rules (shared core)
```javascript
// Name validation simulation:
input = "book";
type = "block" | "complementary";

// 1. Base empty checks
if (!input || input.trim() === "") STOP("Name cannot be empty");
fixed = autoFix(input);
if (fixed === "") STOP("Name cannot be empty");

// 2. Starts-with-number is reject rule
if (startsWithNumber(fixed)) STOP("Name cannot start with number");

// 3. Final name
finalName = type === "block" ? `${fixed}-block` : fixed;

// 4. Duplicate has highest priority among post-fix checks
if (checkExists(finalName, type)) STOP(`Component '${finalName}' already exists`);

// 5. Non-blocking warnings
if (detectCzech(fixed)) WARN("Use English name");
if (detectPlural(fixed)) WARN(`Use singular: ${suggestSingular(fixed)}`);

// 6. Accept
ACCEPT_OR_AUTOFIX(finalName);
```

**Implementation details:** [references/detection-logic.md](references/detection-logic.md)

### 3.3 Apply workflow simulation (stateful checks)

For flow tests, simulate the full dialogue state machine, not only one input:
- asks one question at a time
- asks required follow-up questions by branch/type
- creates files only after explicit confirmation "Yes"
- if confirmation is "No", verify no file changes are proposed/executed

Branch assertions:
- **create-block**:
  - Location `page` -> update page schema only
  - Location `template` -> update template schema + `TemplateBlock` fragment
  - Location `both` -> update both schemas
  - `getStaticProps` Yes/No -> correct wrapper variant
  - always includes `client.ts` and `getBlockType` updates
- **create-complementary**:
  - field list parsed correctly
  - each field configured one-by-one
  - type-specific follow-up questions asked where required
  - app-context Yes/No reflected in transformer template

### 3.4 Compare with expected result
```
Agent output: {actual}
Expected:     {expected}
Match:        ✅ YES
```

### 3.5 Record result
```
✅ PASS | Test #{ID} | {inputSummary} | {Category}
```

---

## Step 4: Generate evaluation and report

After all tests are complete:

### 4.1 Show console summary

**Format reference:** [references/report-templates.md](references/report-templates.md)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TEST RESULTS: {Agent Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total tests: {total}
✅ Passed:    {passed} ({passPercentage}%)
❌ Failed:    {failed} ({failPercentage}%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Results by category:

{Name category}:      {p}/{t}  {✅|⚠️}  {%}
{Flow category}:      {p}/{t}  {✅|⚠️}  {%}
{Branch category}:    {p}/{t}  {✅|⚠️}  {%}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Full report saved:
.cursor/test-reports/{agent-name}-{timestamp}.md
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
| `otestuj create complementary` | Runs automated tests for Complementary Creator |
| `otestuj agenta X` | Runs tests for agent X |
| `zobraz posledni report` | Opens latest test report |

---

## Testing Different Agents

### Block Creator Agent
- Test categories: name validation, conversation flow, location routing, critical files, getStaticProps, displayName/icon
- Key validations: English names, singular form, no duplicates, starts-with-number reject
- Specific behavior: auto-appends `-block`, updates schemas by location, updates `client.ts` + `getBlockType`

**Test cases:** [references/test-cases.md](references/test-cases.md) -> "Block Creator Tests"

### Complementary Creator Agent
- Test categories: name validation, conversation flow, field parsing, type-specific follow-ups, app context, displayName/icon
- Key validations: English names, singular form, no duplicates, starts-with-number reject
- Specific behavior: auto-generated displayName, optional icon, iterative field configuration

**Test cases:** [references/test-cases.md](references/test-cases.md) -> "Complementary Creator Tests"

---

## Checklist

### Pre-test:
- [ ] Load agent rules (`SKILL.md` for skills, `.mdc` for Project Rules)
- [ ] Resolve target agent (`create-block` or `create-complementary`)
- [ ] Parse validation rules
- [ ] Parse auto-fix rules
- [ ] Parse warning rules
- [ ] Parse stop rules
- [ ] Parse conversation/confirmation rules
- [ ] Scan existing components for duplicates
  - [ ] Block: `cms/src/components/block/`
  - [ ] Complementary: `cms/src/components/complementary/`

### Test execution:
- [ ] Generate test cases for all categories
- [ ] Show test plan summary
- [ ] Run tests sequentially
- [ ] Record results (pass/fail)
- [ ] Track detailed errors
- [ ] Verify branch-specific behavior (location/fields/app-context/getStaticProps)
- [ ] Verify "No confirmation" path does not produce file actions

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

   Found {N} test cases in {M} categories.
   Running tests...

   ✅ Test #1: PASS
   ✅ Test #2: PASS
   ❌ Test #3: FAIL (duplicate priority)

   Results: 24/25 passed (96%)
   Report: .cursor/test-reports/block-creator-{timestamp}.md
```
