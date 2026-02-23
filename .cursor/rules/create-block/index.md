# Agents for Strapi Boilerplate

## Block Creator Agent

**Trigger:** When user says "create block", "add block", "new block", "vytvoř blok", "přidej blok"

**Rules:** @create-block/create-block.mdc

**Process:**

1. **Read rules** from `create-block.mdc`

2. **Scan CMS schemas** to find all existing dynamic zones (do this silently in background)

3. **Guide user through questions STEP BY STEP (one at a time):**

   ### Step 3.1: Block Name
   Ask: "What will the block be called? (in English, e.g., 'book', 'hero-banner', 'contact-form')"
   - `-block` suffix is added automatically
   - **Immediately validate & process:**
     - Auto-fix: kebab-case, remove diacritics, special chars
     - If plural detected → warn and suggest singular, wait for confirmation
     - If starts with number → ask for different name
     - If duplicate exists → ask for different name
   - **Show result:** "✓ Block name: `{blockNameKebab}`"

   ### Step 3.2: Display Name
   Ask: "What will be the Czech display name for CMS? (e.g., 'Knihy', 'Hlavní banner')"
   - **Validate:** must not be empty
   - **Show result:** "✓ displayName: `{displayName}`"

   ### Step 3.3: Icon
   Ask with options: "Which icon to use?" (show common icons as options)
   - **Show result:** "✓ Icon: `{icon}`"

   ### Step 3.4: Location
   Ask with options: "Where do you want to use the block?" (show found dynamic zones + custom option)
   - Multi-select allowed
   - **Show result:** "✓ Location: `{locations}`"
   - **Remember:** Each selected location = one content-type schema to update: **page (blocks)** → add block to `page/schema.json` (attributes.blocks.components); **template (content)** → add block to `template/schema.json` (attributes.content.components). You must add the block to every selected content type.

   ### Step 3.5: getStaticProps
   Ask: "Does the block need to load data from Strapi? (getStaticProps)"
   - Options: Yes / No
   - **Show result:** "✓ getStaticProps: `{yes/no}`"

   ### Step 3.6: Summary & Confirmation
   Show summary of all collected info:
   ```
   📋 New Block Summary:
   
   Name: book-block
   DisplayName: Knihy
   Icon: book
   Location: page (blocks), template (content)
   getStaticProps: No
   
   Create block? (Yes/No)
   ```
   - Wait for user confirmation before creating files

4. **Create all files** (only after confirmation):
   - Empty CMS schema (`cms/src/components/block/{blockNameKebab}.json`)
   - **Update content-type schemas from Location:** For **page (blocks)** → add `block.{blockNameKebab}` to `cms/src/api/page/content-types/page/schema.json` → `attributes.blocks.components`. For **template (content)** → add to `cms/src/api/template/content-types/template/schema.json` → `attributes.content.components`. Do this for every selected location.
   - Frontend block wrapper (`frontend/src/app/blocks/{BlockNamePascal}/{BlockNamePascal}.tsx`)
   - UI component skeleton + SCSS (`frontend/src/app/components/blocks/{ComponentName}/`)
   - Update `server.ts` (import, fragment, export)
   - **Update `client.ts`** (switch case for dynamic import) ← CRITICAL!
   - If Location includes **template (content)**: Update `TemplateBlock.ts` (add block fragment to `TemplateBlock_content` → `template.content`)

5. **Show TODO list** to user (in order):
   1. Restart CMS
   2. Add fields in Strapi
   3. Run graphql-codegen
   4. Update GraphQL fragment
   5. Run Relay compiler
   6. Implement UI
   7. Add styles
   8. Test on page

**Testing:** Use `otestuj create block` to run automated validation tests (25+ test cases including name validation, auto-fix, duplicates, plurals, Czech names)

---

## Test Agent

**Trigger:** Various commands for different testing modes

**Rules:** @test-agent.mdc

**Reports:** `.cursor/test-reports/{agent}-{date}.md`

### Testing Modes

| Command | Mode | Description |
|---------|------|-------------|
| `otestuj create block` | Full | All test categories for Block Creator |
| `rychlý test create block` | Smoke | Basic tests only |
| `testuj create block s: kniha, books` | Targeted | Custom inputs |
| `regresní test create block` | Regression | Re-run failed tests |

### Process

1. **Load and analyze rules:**
   - Read `.cursor/rules/{agent}.mdc`
   - Extract validation, auto-fix, warning and stop rules
   - Discover existing blocks for duplicate testing

2. **Auto-generate test cases:**
   - ✅ Happy Path: valid inputs (`book`, `hero-banner`, `contact-form`)
   - 🔧 Auto-fix: `HeroBanner`, `hero_banner`, `HERO`, `hero!`
   - ⚠️ Warning: `books` (plural), `kniha` (Czech), `3d-model`
   - 🛑 Stop: empty input, duplicates
   - 🔮 Edge cases: unicode, very long names

3. **Run tests:**
   - Simulate input for each test case
   - Apply rules (agent simulation)
   - Compare output with expectation
   - Record PASS/FAIL with details

4. **Generate evaluation:**
   ```
   📊 RESULTS: 23/25 tests passed (92%)

   ✅ Happy Path:      5/5   100%
   ✅ Auto-fix:        7/7   100%
   ⚠️ Warning:         5/8    62%
   ✅ Stop:            3/3   100%
   ✅ Edge cases:      3/4    75%

   ❌ Failed tests:
   - "vyrobek" - not detected as Czech

   💡 Recommendations:
   - Extend Czech dictionary with non-diacritic variants
   ```

5. **Save Markdown report** to `.cursor/test-reports/`

### ⚠️ Important

Test Agent **does not simulate the actual agent** - it verifies **consistency and completeness of rules**. It identifies gaps in rules, not implementation bugs.

---

## Notes

### Block Creator Agent
- **Guide user STEP BY STEP** - one question at a time, validate immediately after each answer
- **User provides block name WITHOUT `-block` suffix** - AI adds it automatically
- **Auto-fix formatting issues** (case, underscores, spaces, diacritics, special chars)
- **Warn user about plural names** - suggest singular, wait for confirmation
- **CRITICAL: Check for duplicates** - verify block doesn't already exist in CMS or frontend
- **Location → CMS registration:** The chosen Location(s) determine which content-type schemas to update. **page (blocks)** → always add block to page schema `attributes.blocks.components`. **template (content)** → add block to template schema `attributes.content.components`. Never skip a selected location.
- **Show summary and ask for confirmation** before creating any files
- Create ALL files at once, not progressively (only after user confirms)
- Create EMPTY block (empty attributes in CMS schema, empty GraphQL fragment)
- Always mention what needs to be done next (restart CMS, add fields, update GraphQL, relay compiler)
- Provide clear instructions about manual steps (adding fields in Strapi Content-Type Builder)
