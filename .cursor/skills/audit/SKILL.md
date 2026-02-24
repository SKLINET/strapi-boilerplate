---
name: audit
description: Performs an informational code audit/checklist review for selected frontend files or components and produces an audit report without making code changes unless explicitly asked.
compatibility: Strapi boilerplate monorepo (frontend/ Next.js + cms/ Strapi)
disable-model-invocation: true
---

# Code Audit Checklist

This file defines checklist points for code audits. During the audit, verify each point against project rules.

## IMPORTANT: Audit is informational only

**Audit is an informational tool for the user. After finishing the audit, DO NOT start editing code automatically.**

- Audit report identifies issues and improvement suggestions only
- The user decides which issues to fix and when
- If the user does not explicitly request fixes, create only the audit report
- Do not start modifying files automatically after generating the report

**IMPORTANT: These rules apply only to the frontend project (`frontend/`). The CMS project (`cms/`) has its own rules.**

## Code Style Audit

### Prettier Formatting
- [ ] Indentation: 4 spaces (not tabs)
- [ ] Use single quotes instead of double quotes
- [ ] All lines end with semicolons
- [ ] Maximum line length: 120 characters
- [ ] Trailing commas at the end of objects/arrays

### TypeScript
- [ ] All new files are TypeScript (`.ts`/`.tsx`)
- [ ] No `any` usage (use specific types or `unknown`)
- [ ] Proper type inference usage where possible
- [ ] Shared types are in `src/types/`
- [ ] Types are correctly defined and used

### Naming
- [ ] Components: PascalCase (e.g. `UserProfile.tsx`)
- [ ] Files: match component name or use kebab-case for utilities
- [ ] Functions/Variables: camelCase
- [ ] Constants: UPPER_SNAKE_CASE
- [ ] Types/Interfaces: PascalCase with descriptive names

### File Organization
- [ ] One component per file
- [ ] Default export for the main component
- [ ] Named exports for utilities and types
- [ ] Related files are in the correct folders

## React & Relay Audit

### React Best Practices
- [ ] Use functional components with hooks
- [ ] Components are small and focused on one concern
- [ ] Repeated logic is extracted into custom hooks
- [ ] Prefer composition over inheritance
- [ ] Component may return `<></>` (empty fragment) for empty render; this is acceptable
- [ ] **Note:** `forwardRef`, `React.memo`, and similar optimizations are optional; verify project standard before marking as an issue

### Relay GraphQL
- [ ] **ALL** GraphQL queries use Relay fragments (see `relay/app.ts`, `relay/article.ts` as examples)
- [ ] Fragments are defined using `graphql` template literals in `relay/` files
- [ ] Queries use fragments with `@relay(mask: false)` directive
- [ ] `npm run relay` was executed after creating/changing query/fragment
- [ ] Generated types in `__generated__/` are not manually edited
- [ ] Fragments are organized in `relay/` files by domain (e.g. `app.ts`, `article.ts`)

### Utils/Strapi Functions
- [ ] **ALL** `utils/strapi` functions use generated types from `relay/__generated__/` (e.g. `appImageFragment$data`, `articleFragment$data`)
- [ ] Types are imported from `__generated__` files, not manually defined
- [ ] Use `Omit<FragmentType$data, ' $fragmentType'>` to create type without fragment type
- [ ] No manually defined types for Strapi data in `utils/strapi` functions
- [ ] No `any` usage for Strapi data (use generated types)
- [ ] See examples: `utils/strapi/getImageType.ts`, `utils/strapi/getAddressingType.ts`

## Providers Audit

### Provider Rules
- [ ] Provider is implemented correctly by type (`ElasticProvider` vs `StrapiProvider`)
- [ ] **CRITICAL**: Provider inheriting from `AbstractElasticProvider` or `AbstractSingletonElasticProvider` MUST NOT filter by `publishedAt` in `getFilterParams` (it breaks reindexing)
- [ ] For `ElasticProvider`, use a different date field for filtering (e.g. `publishDate`) or do not filter by date
- [ ] Provider correctly implements required methods: `getApiKey()`, `getId()`, `getFilterParams()`
- [ ] Provider uses Relay queries from the `relay/` directory
- [ ] Provider is exported as a singleton instance
- [ ] See detailed rules: `.cursor/rules/providers.mdc`

## Styling Audit

**IMPORTANT: These rules apply only to the frontend project (`frontend/`). The CMS project (`cms/`) has its own rules.**

### CSS Architecture
- [ ] SCSS (`.scss`) for component styles
- [ ] SCSS Modules for scoped styles
- [ ] Tailwind CSS 3 for utility classes
- [ ] SCSS Modules for component-specific styles
- [ ] Tailwind for fast utility styling

### File Naming
- [ ] Component styles: `ComponentName.module.scss`
- [ ] Global styles in `src/styles/`
- [ ] Correct import: `import styles from './ComponentName.module.scss'`

### Best Practices
- [ ] SCSS Modules to prevent style conflicts
- [ ] Tailwind utilities for spacing, colors, typography
- [ ] Component styles are co-located with components
- [ ] CSS variables for theme values
- [ ] **Tailwind classes in SCSS**: classes grouped by breakpoint on separate lines
  - First line: all base classes without breakpoint (mobile-first)
  - Next lines: all classes with the same breakpoint prefix grouped on one line
  - Each breakpoint (`mobile-landscape:`, `tablet:`, `tablet-landscape:`, `desktop:`, `large-desktop:`, `fullhd:`) has its own line
  - All classes for the same breakpoint must stay on the same line
  - Example: `@apply w-full flex flex-col gap-8 relative;` on first line, `@apply tablet-landscape:pl-6 tablet-landscape:gap-10;` on next line, `@apply desktop:pl-10 desktop:gap-12;` on next line
- [ ] **No arbitrary Tailwind values**: do not use arbitrary values in Tailwind classes (e.g. `w-[19.375rem]`, `rounded-[0.5625rem]`)
  - **For spacing/sizing values** (width, height, margin, padding): use CSS properties directly in SCSS module
    - Bad example: `@apply w-[19.375rem];`
    - Good example: `.container { width: 19.375rem; }`
  - **For design tokens** (border-radius, colors, shadows, etc.): extend Tailwind config with custom values instead of arbitrary values
    - Bad example: `@apply rounded-[0.5625rem];`
    - Good example: add value to Tailwind config and use `@apply rounded-custom;` or use CSS property: `.container { border-radius: 0.5625rem; }`
  - If suitable standard Tailwind utility classes exist, use them (e.g. `rounded-lg` instead of `rounded-[0.5625rem]` when close enough)

### Tailwind 3 Specific
- [ ] Tailwind 3 uses JavaScript/TypeScript configuration file (`tailwind.config.ts`)
- [ ] Global styles use `@tailwind` directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`)
- [ ] PostCSS configuration uses standard Tailwind PostCSS plugin

### Responsive Design
- [ ] Tailwind responsive prefixes use custom breakpoints: `mobile-landscape:`, `tablet:`, `tablet-landscape:`, `desktop:`, `large-desktop:`, `fullhd:`
- [ ] Mobile-first approach
- [ ] Breakpoints are defined in `tailwind.config.ts`

---

## Priority in Audit Report

When creating the audit report, categorize findings by priority correctly. There are two types of findings:

### IMPORTANT: Project phase - backend integration preparation

**The project is currently being prepared for backend integration, so the following may be acceptable:**

- **`console.log()` and debug code**: acceptable during preparation phase
- **Commented-out code**: acceptable when it prepares future implementation (e.g. API calls, `startTransition`)
- **Placeholder implementation**: acceptable when it is clearly temporary before backend integration

**Important:** classify these as **Improvement Suggestions** instead of **Errors** when they are part of backend-prep work. If clearly a real defect (e.g. forgotten production debug code), mark as an error.

### IMPORTANT: Check similar components before flagging an error

**Before labeling anything as an error, always check similar components in the project:**
- How are similar components implemented?
- Is this truly an error, or just a different implementation approach?
- Is this the project standard, or an exception?

**Example:** if similar components do not use `forwardRef`, this is not automatically an error; it may be a design choice.

### High Priority - Technical issues (fix immediately)

These findings are **high priority** and should be fixed without debate:

- **Code formatting**: wrong indentation, missing semicolons, missing trailing commas, etc.
- **TypeScript errors**: `any` usage, missing types, incorrect types
- **Naming**: inconsistent naming conventions, poor names for variables/functions/components
- **Styling**: incorrect SCSS structure, missing SCSS Modules, incorrect Tailwind usage
- **React best practices**: incorrect hook usage, poor component structure
- **Accessibility (a11y)**: missing ARIA attributes **only if this is a project standard** (check similar components)
- **Security**: XSS vulnerabilities, unvalidated inputs, etc.
- **Documentation**: missing JSDoc comments (if this is a project standard)

**Important:**
- If similar components do not have something (e.g. `forwardRef`, `aria-label`), it may be a design decision, not an error.
- **`console.log()` and commented-out code are not errors** when they are part of backend-prep work (see section above).

**Report format:**
```
### Errors (High Priority)
- [Issue description with concrete fix suggestion]
- [Include comparison with similar components if relevant]
```

### Low Priority - Design/logic topics (team discussion)

These findings are typically **design decisions** and should be discussed with the team before implementation:

- **Missing props**: component may not expose props it could have (not necessarily an error)
- **Missing exported types/interfaces**: if component does not export its props interface/type, verify whether it should be imported elsewhere (e.g. type safety in other components, extension points)
- **Design decision**: different implementation approaches that are not necessarily wrong
- **Component logic**: suggestions that change component behavior
- **API design**: suggestions to change component API (add/change props)
- **Architecture**: suggestions to change structure or architecture
- **React best practices (optional)**: `forwardRef`, `React.memo`, etc. only if they are project standards
- **Accessibility (optional)**: `aria-label`, etc. only if they are project standards

**Report format:**
```
### Improvement Suggestions (Team Discussion)
- [Suggestion with explanation of why it could help]
- [Comparison with similar components if relevant]
- [Indicate team discussion before implementation]
```

**Example:**
```
### Improvement Suggestions (Team Discussion)
- **Add `disabled` prop**: Component does not support disabled state.
  Consider adding this for consistency with other inputs in the project.
  **Comparison:** `TextInput` and `DateInput` support `disabled`.
  **Recommendation:** Discuss with team whether this functionality is needed.

- **Export props interface**: Interface `SelectInputProps<T>` is not exported.
  Verify whether this type should be imported elsewhere (e.g. type safety in other components,
  component extension, or wrapper components).
  **Comparison:** `TextInput` exports `TextInputProps`, `DateInput` exports `DateInputProps`.
  **Recommendation:** If this type is expected to be reused, consider exporting it.
```

### Finding Categorization

During audit, ask in this order:

1. **Is this part of backend-prep work?** (`console.log`, commented code, placeholder implementation) -> Low priority or Note
2. **How are similar components implemented?** -> If they do not have it, it may not be an error
3. **Is it a technical defect?** (formatting, TypeScript) -> High priority
4. **Is it non-compliant with project rules?** -> High priority (but still check similar components)
5. **Is it a design decision?** -> Low priority (team discussion)
6. **Can it be implemented in multiple valid ways?** -> Low priority (team discussion)
7. **Does it change component behavior/logic?** (missing props, alternative logic paths) -> Low priority (team discussion)

---

## Audit Report Template

Use this template and save the report to `.cursor/audit-reports/[ComponentName].md`:

**IMPORTANT:** After creating the audit report, DO NOT start editing code automatically. Audit is informational only; the user decides which issues to fix.

```
## Audit Report - [File/Component Name]

**Date**: [date]
**Auditor**: [name]
**Component**: `[file path]`

### Passed
- [list of passed checks]

### Warnings
- [list of warnings with description]

### Errors
- [list of errors with description and fix suggestion]

### Notes
- [additional notes]
```

### Audit Report Location
- [ ] Audit reports are stored in `.cursor/audit-reports/`
- [ ] Filename: `[ComponentName].md` (e.g. `Error.md`, `Button.md`)
- [ ] For a project-wide audit, use `project-overview.md`
