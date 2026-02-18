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
   - Update content-type schemas (add to dynamic zone)
   - Frontend block wrapper (`frontend/src/app/blocks/{BlockNamePascal}/{BlockNamePascal}.tsx`)
   - UI component skeleton + SCSS (`frontend/src/app/components/blocks/{ComponentName}/`)
   - Update `server.ts` (import, fragment, export)
   - **Update `client.ts`** (switch case for dynamic import) ← CRITICAL!

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

## Complementary Creator Agent

**Trigger:** When user says "create complementary", "add complementary", "new complementary", "vytvoř complementary", "přidej complementary"

**Rules:** @create-complementary/create-complementary.mdc

**Process:**

1. **Read rules** from `create-complementary.mdc`

2. **Scan existing complementary components** to find duplicates (do this silently in background)

3. **Guide user through questions STEP BY STEP (one at a time):**

   ### Step 3.1: Component Name
   Ask: "What will the complementary component be called? (in English, e.g., 'author', 'testimonial', 'image-gallery')"
   - **Immediately validate & process:**
     - Auto-fix: kebab-case, remove diacritics, special chars
     - If plural detected → warn and suggest singular, wait for confirmation
     - If starts with number → ask for different name
     - If duplicate exists → ask for different name
   - **Auto-generate displayName:** Convert kebab-case to PascalCase
     - Examples: `donate-amount` → `DonateAmount`, `image-gallery` → `ImageGallery`
   - **Show results:**
     - "✓ Component name: `{componentNameKebab}`"
     - "✓ displayName: `{displayName}` (auto-generated)"

   ### Step 3.2: Icon (Optional)
   Ask with options: "Which icon to use? (Optional - press Enter to skip)"
   - **Show result:** "✓ Icon: `{icon}`" or "✓ Icon: (none)"

   ### Step 3.3: Define Fields
   Silently scan existing complementary components in background (for component type suggestions later).

   #### 3.3.1: Ask for field list
   Ask: "What fields should the component contain?" (free-form text)
   - Accept any format: comma-separated, with types, with notes, natural language
   - Examples: "name, email, phone", "title: string, description: text", "label (required), link (optional)"
   - Parse and extract field names
   - **Show result:** "✓ Fields detected: title, description, amount, button" + "Now let's configure each field (4 total)"

   #### 3.3.2: Iteratively ask for field details
   For each detected field (one at a time), show clear progress with field number:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Field 1/4: title
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```
   - Ask type (string, text, richtext, media, boolean, number, date, datetime, email, enumeration, relation, component)
   - Ask if required (Yes/No)
   - Ask type-specific questions:
     - enum values (for enumeration)
     - media types (for media)
     - relation target (for relation)
     - **component type & repeatability (for component) - OFFER existing complementary components:**
       - List available: complementary.button, complementary.video, complementary.ecomail, etc.
       - Option to specify custom component
   - **Show progress after each:** "✓ Field 1/4: title (string, required)"

   After all fields are configured:
   - **Show summary:** "✓ All fields configured (4/4):" with full list

   ### Step 3.4: Usage
   Ask: "Where will this component be used? (e.g., 'in VideoBlock', 'in multiple blocks')"
   - Informational only - helps with context
   - **Show result:** "✓ Usage: `{usage}`"

   ### Step 3.5: App Context
   Ask: "Will this component need access to app context (IApp)?"
   - Options: Yes / No
   - Explain: Yes for page relations, No for standalone data
   - **Show result:** "✓ Needs app context: `{yes/no}`"

   ### Step 3.6: Summary & Confirmation
   Show summary of all collected info:
   ```
   📋 New Complementary Component Summary:

   Name:          author
   displayName:   Author (auto-generated)
   Icon:          user
   Fields:        4 fields defined
     - name: string (required)
     - bio: text (optional)
     - avatar: media/images (optional)
     - socialLinks: string (optional)
   Usage:         in ArticleBlock
   Needs app:     No

   Files to create/update:
   - cms/src/components/complementary/author.json (new, with 4 fields)
   - frontend/src/types/author.ts (new)
   - frontend/src/utils/strapi/getAuthorType.ts (new)
   - frontend/src/relay/app.ts (update - add fragment)

   Create complementary component? (Yes/No)
   ```
   - Wait for user confirmation before creating files

4. **Create all files** (only after confirmation):
   - CMS schema with fields if defined, empty if not (`cms/src/components/complementary/{componentNameKebab}.json`)
   - TypeScript type interface (`frontend/src/types/{componentNameCamel}.ts`)
   - Transformer utility (`frontend/src/utils/strapi/get{ComponentName}Type.ts`)
   - Update `relay/app.ts` (add GraphQL fragment)

5. **Show TODO list** to user (varies based on whether fields were defined):
   - If fields defined: Verify fields in Strapi (already created)
   - If empty: Add fields in Strapi Content-Type Builder
   - Run graphql-codegen
   - Update GraphQL fragment in relay/app.ts
   - Run Relay compiler
   - Use in blocks or content types

**Testing:** Use `otestuj create complementary` to run automated validation tests (30+ test cases including name validation, displayName, icon, duplicates, plurals, Czech names)

---

## Test Agent

**Trigger:** Various commands for different testing modes

**Rules:** @test-agent.mdc

**Reports:** `.cursor/test-reports/{agent}-{date}.md`

### Testing Modes

| Command | Mode | Description |
|---------|------|-------------|
| `otestuj create block` | Full | All test categories for Block Creator |
| `otestuj create complementary` | Full | All test categories for Complementary Creator |
| `rychlý test create block` | Smoke | Basic tests only |
| `testuj create block s: kniha, books` | Targeted | Custom inputs |
| `regresní test create block` | Regression | Re-run failed tests |
| `otestuj všechny agenty` | Full | All agents |

### Process

1. **Load and analyze rules:**
   - Read `.cursor/rules/{agent}.mdc`
   - Extract validation, auto-fix, warning and stop rules
   - Discover existing blocks for duplicate testing

2. **Auto-generate test cases:**
   - ✅ Happy Path: valid inputs (`book`, `hero-banner`, `author`, `testimonial`)
   - 🔧 Auto-fix: `HeroBanner`, `hero_banner`, `HERO`, `hero!`
   - ⚠️ Warning: `books` (plural), `kniha` (Czech), `3d-model`
   - 🛑 Stop: empty input, duplicates
   - 🔮 Edge cases: unicode, very long names
   - **For Complementary:** Additional validation for displayName (required), icon (optional)

3. **Run tests:**
   - Simulate input for each test case
   - Apply rules (agent simulation)
   - Compare output with expectation
   - Record PASS/FAIL with details

4. **Generate evaluation:**
   ```
   📊 RESULTS: 37/40 tests passed (92.5%)

   ✅ Happy Path:      5/5   100%
   ✅ Auto-fix:       12/12  100%
   ⚠️ Warning:        12/15   80%
   ✅ Stop:            3/3   100%
   ✅ Edge cases:      5/5   100%
   ✅ DisplayName:     2/2   100%  (complementary only)
   ✅ Icon:            2/2   100%  (complementary only)

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
- **Show summary and ask for confirmation** before creating any files
- Create ALL files at once, not progressively (only after user confirms)
- Create EMPTY block (empty attributes in CMS schema, empty GraphQL fragment)
- Always mention what needs to be done next (restart CMS, add fields, update GraphQL, relay compiler)
- Provide clear instructions about manual steps (adding fields in Strapi Content-Type Builder)

### Complementary Creator Agent
- **Guide user STEP BY STEP** - one question at a time, validate immediately after each answer
- **User provides component name in singular form** (e.g., 'author', not 'authors')
- **Auto-fix formatting issues** (case, underscores, spaces, diacritics, special chars)
- **Warn user about plural names** - suggest singular, wait for confirmation
- **CRITICAL: Check for duplicates** - verify component doesn't already exist in complementary folder
- **Icon is OPTIONAL** - don't require it if user doesn't want one
- **Display name is AUTO-GENERATED** from component name (kebab-case → PascalCase)
- **Always ask for fields in free-form text** - silently scan existing components for later use
- **Be flexible with parsing field list** - accept comma-separated, with types, with notes, or natural language
- **Show clear field numbering** - "Field X/Y: fieldName" when configuring each field
- **Iteratively ask for field details** - type, required, and type-specific properties (one field at a time)
- **When field type is "component"** - offer existing complementary components (button, video, ecomail, etc.) as options
- **Show progress after each field** - "✓ Field X/Y: name (type, required/optional)"
- **App context decision is important** - clarify that it's needed for page relations or global data
- **Show summary and ask for confirmation** before creating any files
- Create ALL files at once, not progressively (only after user confirms)
- **Create component with defined fields OR empty** - depends on whether user defined fields
- Always mention what needs to be done next (varies based on whether fields were created)
- Complementary components are meant to be REUSABLE - remind users they can be used in multiple blocks/content types
