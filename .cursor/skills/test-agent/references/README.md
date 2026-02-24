# Test Agent - Documentation

Automated testing framework for validating agent workflow behavior.

## Scope

This Test Agent is currently designed for:
- `create-block`
- `create-complementary`

## How It Works

```
User says: "otestuj create block" or "otestuj create complementary"
         ↓
Test Agent loads target rules from skill `SKILL.md`
         ↓
Generates test cases for name validation + flow branches
         ↓
Simulates user interaction and validation order
         ↓
Compares actual vs expected behavior
         ↓
Generates a pass/fail report
```

## Files in This Folder

| File | Purpose |
|------|---------|
| `../SKILL.md` | Main skill rules and workflow |
| `README.md` | This documentation file |
| `test-cases.md` | Test case definitions for both target skills |
| `detection-logic.md` | Validation + workflow simulation logic |
| `report-templates.md` | Console and markdown report formats |

## Quick Start

### Test Block Creator

```
User: otestuj create block
```

Checks include:
- name validation and auto-fix
- duplicate priority
- starts-with-number rejection
- one-question-at-a-time flow
- confirmation gate (No -> no files)
- location branching (page/template/both)
- critical file updates (`client.ts`, `getBlockType`, `TemplateBlock` when needed)
- `getStaticProps` Yes/No branch

### Test Complementary Creator

```
User: otestuj create complementary
```

Checks include:
- name validation and auto-fix
- duplicate priority
- starts-with-number rejection
- one-question-at-a-time flow
- confirmation gate (No -> no files)
- field parsing and iterative field configuration
- type-specific follow-up questions
- app-context Yes/No branch
- displayName auto-generation and icon optional handling

## Test Categories

### Shared categories
- Name Happy Path
- Name Auto-fix
- Name Warning/Stop
- Name Duplicates
- Conversation/Confirmation Flow

### Block-only categories
- Location Routing
- Critical File Updates
- getStaticProps Branch
- DisplayName/Icon

### Complementary-only categories
- Field Parsing and Iterative Questions
- Type-Specific Follow-Ups
- App Context Branch
- DisplayName/Icon

## Key Rule Decisions

1. **Starts with number**: treated as **STOP** for both tested skills.
2. **Duplicate priority**: checked on final normalized name and evaluated before warning branches.
3. **Confirmation required**: no file creation/update before explicit `Yes`.

## Understanding Results

### Console output
Shows totals, pass rate, and category breakdown.

### Markdown report
Saved to `.cursor/test-reports/{agent-name}-{timestamp}.md`, includes:
- summary table
- detailed case results
- failed tests with issues
- recommendations

## Common Failures

### 1. Wrong validation order

Example:
- Input: `Video`
- Expected: duplicate stop (`video-block` / `video`)
- Actual: warning/accept path before duplicate check

Fix:
- check duplicates immediately after final-name creation.

### 2. Confirmation gate bypass

Example:
- User answers `No` in summary.
- Agent still returns file creation actions.

Fix:
- enforce hard gate on confirmation step.

### 3. Missing branch updates

Block example:
- Location `template (content)` chosen.
- `TemplateBlock.ts` not included in updates.

Fix:
- branch asserts must verify required file list by location.

### 4. Incomplete field follow-ups

Complementary example:
- `enumeration` selected without asking enum values.

Fix:
- enforce type-specific prompts per field type.

## Extending the Test Agent

For future agents:
1. add agent section in `test-cases.md`
2. add validation/flow logic in `detection-logic.md`
3. add trigger/command docs in `../SKILL.md`
4. extend report categories in `report-templates.md`

## Related

- Block skill: `.cursor/skills/create-block/`
- Complementary skill: `.cursor/skills/create-complementary/`
- Reports: `.cursor/test-reports/`
