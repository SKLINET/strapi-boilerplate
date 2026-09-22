---
name: create-block
description: Creates a new page block in Strapi CMS and Next.js frontend. Use when user says "create block", "add block", "new block", "vytvoř blok", "přidej blok". Guides through block name, display name, icon, location, getStaticProps, then creates CMS schema, frontend block wrapper, UI skeleton, server/client registration, and template updates.
compatibility: Strapi boilerplate monorepo (frontend/ Next.js + cms/ Strapi)
---

# Create New Block

Creates a complete block – from CMS schema to React components on frontend.

**Reference files in this folder:**
- [references/file-templates.md](references/file-templates.md) – TypeScript/SCSS templates for generated files
- [references/graphql-reference.md](references/graphql-reference.md) – GraphQL fragment examples for common field types
- [references/cms-reference.md](references/cms-reference.md) – CMS field type definitions
- [references/icons-reference.md](references/icons-reference.md) – Strapi icon names for block picker

---

## Step 1: Guide User Through Questions (ONE AT A TIME)

**Before starting:** Silently scan CMS schemas for dynamic zones (page blocks, template content).

### 1.1 Block Name
```
What will the block be called?
(in English, singular, e.g., 'book', 'hero-banner')
The '-block' suffix is added automatically.
```

**Validation:**
| Input | Action |
|-------|--------|
| Czech word (`kniha`) | ⚠️ Ask for English name |
| Plural (`books`) | ⚠️ Suggest singular, wait for confirmation |
| PascalCase/camelCase (`HeroBanner`) | ✅ Auto-fix to kebab-case |
| Underscores (`hero_banner`) | ✅ Auto-fix to hyphens |
| Spaces (`hero banner`) | ✅ Auto-fix to hyphens |
| Uppercase (`HERO`) | ✅ Auto-fix to lowercase |
| Special chars/diacritics | ✅ Auto-remove |
| Starts with number | ⚠️ Ask for different name |
| Already exists | ❌ Ask for different name |

**⚠️ CRITICAL: Duplicate check has HIGHEST PRIORITY!**
- After auto-fix, ALWAYS check if the resulting name already exists
- Example: Input `HERO` → auto-fix to `hero-block` → but `hero-block` exists → ❌ Ask for different name
- The duplicate check runs AFTER all auto-fix transformations

**⚠️ IMPORTANT: When auto-fix is applied, ALWAYS inform the user what was changed:**
```
✓ Block name: `hero-banner-block`
  (auto-fixed: spaces → hyphens)
```

### 1.2 Display Name
```
What will be the display name for CMS?
(Use Czech for this project, e.g., 'Knihy', 'Hlavni banner')
```
**Show:** `✓ displayName: Hlavni banner`

### 1.3 Icon
```
Which icon to use?
```
**Reference:** See [references/icons-reference.md](references/icons-reference.md) for available icons. Use camelCase names (e.g., `layout`, `bulletList`).

**Show:** `✓ Icon: book`

### 1.4 Location
```
Where to use the block?

Found locations:
- page (blocks) - regular pages
- template (content) - reusable content
```
**Show:** `✓ Location: page (blocks)`

**⚠️ Location drives CMS registration:** For each selected option you MUST add the block to that content type's dynamic zone in Step 3.2. **page (blocks)** → add to `cms/src/api/page/content-types/page/schema.json` → `attributes.blocks.components`. **template (content)** → add to `cms/src/api/template/content-types/template/schema.json` → `attributes.content.components`. Do not skip any selected location.

### 1.5 getStaticProps
```
Does block need to load data from Strapi? (getStaticProps)
```
Options: Yes / No

**Show:** `✓ getStaticProps: No`

### 1.6 Summary & Confirmation
```
📋 New Block Summary:
━━━━━━━━━━━━━━━━━━━━━

Name:           book-block
displayName:    Knihy
Icon:           book
Location:       page (blocks)
getStaticProps: No

Files to create/update:
- cms/src/components/block/book-block.json (new)
- cms/src/api/page/content-types/page/schema.json — add block to attributes.blocks.components (if Location includes "page (blocks)")
- cms/src/api/template/content-types/template/schema.json — add block to attributes.content.components (only if Location includes "template (content)")
- frontend/src/app/blocks/BookBlock/BookBlock.tsx (new)
- frontend/src/app/components/blocks/Book/Book.tsx (new)
- frontend/src/app/components/blocks/Book/Book.module.scss (new)
- frontend/src/app/blocks/server.ts (update)
- frontend/src/app/blocks/client.ts (update)
- frontend/src/app/blocks/TemplateBlock/TemplateBlock.ts (update) — only if Location includes template (content)
- file that defines **getBlockType** (path may vary) — add case `{typeName}` → `{blockNamePascal}`

━━━━━━━━━━━━━━━━━━━━━
Create block? (Yes/No)
```

**Only create files after user confirms!**

---

## Step 2: Calculate Names

```javascript
// Input: "hero-banner"
blockNameKebab = "hero-banner-block"       // CMS schema name (kebab-case)
blockNameUnderscore = "hero_banner_block"  // Same with _ instead of - (for collectionName)
blockNamePascal = "HeroBannerBlock"        // Frontend block folder/file
componentName = "HeroBanner"               // UI component (without "Block")
typeName = "ComponentBlockHeroBannerBlock"  // GraphQL typename
```

---

## Step 3: Create Files

### 3.1 CMS Schema
**File:** `cms/src/components/block/{blockNameKebab}.json`

**collectionName:** Use underscores, not hyphens: `components_block_{blockNameUnderscore}s` (e.g. `components_block_book_blocks`). Variable `blockNameUnderscore` = `blockNameKebab` with every `-` replaced by `_`.

```json
{
  "collectionName": "components_block_{blockNameUnderscore}s",
  "info": {
    "displayName": "{displayName}",
    "icon": "{icon}"
  },
  "options": {},
  "attributes": {}
}
```

### 3.2 Update Content-Type Schema (driven by Location from Step 1.4)

**⚠️ CRITICAL: Add the block to every content type the user selected in Location. Do not skip any.**

| Location selected | File to update | Where to add |
|-------------------|----------------|--------------|
| **page (blocks)** | `cms/src/api/page/content-types/page/schema.json` | `attributes.blocks.components` — add `"block.{blockNameKebab}"` to the array |
| **template (content)** | `cms/src/api/template/content-types/template/schema.json` | `attributes.content.components` — add `"block.{blockNameKebab}"` to the array |

- If user chose **page (blocks)** → update page schema (add to `blocks.components`).
- If user chose **template (content)** → update template schema (add to `content.components`).
- If user chose both → update **both** files.
- Preserve existing formatting (e.g. newlines/commas) when editing JSON.

### 3.3 Frontend Block Wrapper
**File:** `frontend/src/app/blocks/{blockNamePascal}/{blockNamePascal}.tsx`

See [references/file-templates.md](references/file-templates.md) for template. Use getStaticProps variant if Step 1.5 was Yes.

### 3.4 Frontend UI Component
**Files:**
- `frontend/src/app/components/blocks/{componentName}/{componentName}.tsx`
- `frontend/src/app/components/blocks/{componentName}/{componentName}.module.scss`
- `frontend/src/app/components/blocks/{componentName}/{componentName}.test.tsx`
- `frontend/src/app/components/blocks/{componentName}/{componentName}.stories.tsx`

See [references/file-templates.md](references/file-templates.md) for templates.

Every component in this repo has a test next to it — a new block is not an exception. The test starts as a smoke test (the component renders with an empty fixture) and grows once the UI is implemented. The story reuses the shared `app` stub from `src/storybook/fixtures.ts` rather than hand-rolled props.

### 3.5 Update server.ts
**File:** `frontend/src/app/blocks/server.ts`

1. Add import: `import {blockNamePascal} from './{blockNamePascal}/{blockNamePascal}';`
2. Add to fragment: `...{blockNamePascal}_content @relay(mask: false)`
3. Add to blocks object: `{blockNamePascal},`

### 3.6 Update client.ts (CRITICAL!)
**File:** `frontend/src/app/blocks/client.ts`

Add switch case (alphabetically):
```typescript
case '{blockNamePascal}':
    return import('./{blockNamePascal}/{blockNamePascal}');
```

⚠️ **Without this, the block will NOT render on the page!**

### 3.7 Update TemplateBlock_content (when block is in template content)
**When:** User chose **template (content)** in Location (Step 1.4).

**File:** `frontend/src/app/blocks/TemplateBlock/TemplateBlock.ts`

Inside the fragment `TemplateBlock_content`, in the `template { content { ... } }` selection, add one line (alphabetically among existing block fragments):

```graphql
...{blockNamePascal}_content @relay(mask: false)
```

⚠️ **Without this, the block will NOT render inside Template block (reusable content)!**

### 3.8 Update getBlockType (CRITICAL!)
**Where:** The file that defines the function **getBlockType** (search for it; path may vary per project — there is only one such function).

In that file, add a switch case (alphabetically by typeName) mapping GraphQL `__typename` to block folder name:

```typescript
case '{typeName}':
    return '{blockNamePascal}';
```

Example: `case 'ComponentBlockScoreDashboardBlock': return 'ScoreDashboardBlock';`

⚠️ **Without this, the block type will not resolve and the block may not render correctly!**

---

## Step 4: Show TODO List

```
✅ Block "{blockNameKebab}" created successfully!

📝 TODO (in this order):

1. [ ] Restart Strapi CMS
   cd cms && npm run develop

2. [ ] Add fields in Strapi Content-Type Builder
   Components → block → "{displayName}"

3. [ ] Refresh GraphQL schema
   cd frontend && npm run graphql-codegen

4. [ ] Update GraphQL fragment in {blockNamePascal}.tsx
   (see references/graphql-reference.md for examples)

5. [ ] Run Relay compiler
   cd frontend && npm run relay

6. [ ] Implement UI in {componentName}.tsx

7. [ ] Add styles to {componentName}.module.scss

8. [ ] Flesh out {componentName}.test.tsx and {componentName}.stories.tsx
   cd frontend && npm run test
   cd frontend && npm run storybook

9. [ ] Test on page
```

---

## Checklist

### Questions (one at a time):
- [ ] Block name (validate: English, singular, no duplicates)
- [ ] displayName (Czech, not empty)
- [ ] Icon
- [ ] Location (from scanned dynamic zones)
- [ ] getStaticProps (Yes/No)
- [ ] Summary & confirmation

### File creation (after confirmation):
- [ ] CMS schema (`cms/src/components/block/{blockNameKebab}.json`)
- [ ] **Content-type schema(s)** — for **each** selected Location: page (blocks) → add block to `page/schema.json` → `attributes.blocks.components`; template (content) → add to `template/schema.json` → `attributes.content.components`. Do not skip.
- [ ] Block wrapper (`frontend/src/app/blocks/{blockNamePascal}/`)
- [ ] UI component (`frontend/src/app/components/blocks/{componentName}/`)
- [ ] SCSS file
- [ ] Test file (`{componentName}.test.tsx`) — every component in the repo has one
- [ ] Story file (`{componentName}.stories.tsx`) — reuse fixtures from `src/storybook/fixtures.ts`
- [ ] `server.ts` updated (import, fragment, export)
- [ ] `client.ts` updated (switch case) ← CRITICAL!
- [ ] If Location includes **template (content)**: `TemplateBlock.ts` updated — add `...{blockNamePascal}_content @relay(mask: false)` inside `content { }` in fragment (alphabetically)
- [ ] **getBlockType** — in the file that defines it (path may vary), add `case '{typeName}': return '{blockNamePascal}';` (alphabetically) ← do not skip!
- [ ] TODO list shown to user
