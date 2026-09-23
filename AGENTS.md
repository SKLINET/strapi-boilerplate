# AGENTS.md

Instructions for AI coding agents working on this project. See [agents.md](https://agents.md/).

## Creating a new block

**To add a new page block**, use the **`create-block`** Agent Skill (`.cursor/skills/create-block/`). The skill automates the full flow: it guides through block name, display name, icon, location, getStaticProps, then creates the CMS schema, frontend block wrapper, UI skeleton, server/client registration, and template updates. Trigger with phrases like "create block", "add block", "vytvoř blok", or type `/create-block` in Agent chat.

## Creating a complementary component

**To add a new complementary component**, use the **`create-complementary`** Agent Skill (`.cursor/skills/create-complementary/`). The skill guides through component name, icon, field configuration, usage context, app-context needs, then creates CMS schema, TypeScript type, transformer, and Relay fragment. Trigger with phrases like "create complementary", "add complementary", "vytvoř complementary", or type `/create-complementary` in Agent chat.

## Testing agent workflows

**To test an agent/skill workflow**, use the **`test-agent`** Agent Skill (`.cursor/skills/test-agent/`). It generates test cases, simulates input/output behavior, and produces test reports in `.cursor/test-reports/`. Trigger with phrases like "otestuj create block", "testuj block creator", "test agent X", or type `/test-agent` in Agent chat.

## Running code audit on demand

**To run an informational code audit/checklist review**, use the **`audit`** Agent Skill (`.cursor/skills/audit/`). This skill is configured for explicit invocation only (`disable-model-invocation: true`), so trigger it manually via `/audit`.

## Cache components system

For cache behavior, revalidation, and block data loading patterns, see [.cursor/cache/CACHE-COMPONENTS.md](.cursor/cache/CACHE-COMPONENTS.md) (AI agents) and [CACHE-COMPONENTS.md](CACHE-COMPONENTS.md) (full manual).

## Setup

- **Install:** `npm install` (run from `frontend/`)
- **Dev:** `npm run dev` · **Build:** `npm run build` (runs graphql-codegen + relay first, so it needs a reachable Strapi) · **Build only:** `npm run build:only`
- **Test:** `npm run test` · **Watch:** `npm run test:watch` · **Coverage:** `npm run test:coverage`
- **Storybook:** `npm run storybook` (port 6006) · **Build:** `npm run build-storybook`
- **Lint:** `npm run lint` (tsc --noEmit + eslint --fix) · **Relay:** `npm run relay` · **Relay watch:** `npm run relay:watch`
- **Node:** 24.x (see `frontend/.nvmrc`)

## Project structure

Monorepo: `frontend/` (Next.js app) + `cms/` (Strapi). Work primarily in `frontend/` unless modifying CMS.

## Stack

Next.js 16 (Cache Components), React 19, Relay 20, Tailwind 4, SCSS Modules. Forms: react-hook-form + Yup + @hookform/resolvers. CMS: Strapi 5. Search: Elasticsearch. Tests: Vitest 4 + Testing Library. Storybook 10.

## Code style

- **Prettier:** single quotes, semicolons, 4 spaces, 120 chars, trailing commas
- **TypeScript:** strict. Types in `src/types/`. Avoid `any` where possible
- **Naming:** PascalCase (components), camelCase (functions), UPPER_SNAKE_CASE (constants)

## Structure

- **Components (Atomic Design):** `primitives/` → `molecules/` → `organisms/` → `blocks/` + `base/`, under `src/app/components/`
- **Blocks** in `src/app/blocks/` – page blocks; register in `server.ts`
- **Providers** in `src/providers/` – Elastic + Strapi data; register in `providers/index.ts`
- **Relay** fragments in `src/relay/` – GraphQL; run `npm run relay` after changes
- **Utils** live one per folder: `src/utils/<name>/index.ts` next to its `index.test.ts`. Same under `src/utils/base/`, `src/utils/cache/`, `src/utils/strapi/`, `src/utils/hooks/`, `src/lib/blocks/`. A new util is a new folder, never a loose `.ts` file
- **Utils** in `src/utils/strapi/` – `get*Type` functions map Relay fragments to app types
- **i18n:** `getSystemResource(codename, app?.systemResources)` for labels. Locales come from `frontend/sklinet.config.json` (`cs` default, `en` secondary)

## Tests

- **Vitest** with two projects: `node` picks up `src/**/*.test.ts`, `jsdom` picks up `src/**/*.test.tsx`. Setup files: `vitest.setup.ts` (both) and `vitest.setup.dom.ts` (jsdom only)
- A test sits next to its subject: `src/utils/foo/index.test.ts`, `Component/Component.test.tsx`
- Components render through `@testing-library/react`; prefer role/text queries over test ids
- `src/utils/cache/tag/index.test.ts` reads the Strapi schemas from `cms/` – run the suite after touching CMS content types

## Storybook

- Config in `frontend/.storybook/`; stories are `Component/Component.stories.tsx` under `src/app/components/**`
- Shared `app` stub, system resources and sample records live in `src/storybook/fixtures.ts` – reuse them instead of hand-rolling props; components take the whole `app` object
- Server actions are aliased to browser-safe stubs in `src/storybook/mocks/`; add a new stub there when a story pulls in a `'use server'` module
- Sample copy in fixtures and stories is Czech, matching the default locale

## Styling

- **SCSS Modules:** `ComponentName.module.scss` next to component
- **Tailwind 4:** CSS-first config in `src/styles/` (`theme.css`, `layout.css`, `variables.css`). Mobile-first. Breakpoints are `@custom-variant`s in `layout.css`: `mobile-landscape:`, `tablet:`, `tablet-landscape:`, `desktop:`, `large-desktop:`, `fullhd:`
- Prefer Tailwind utilities; use SCSS for complex logic. Avoid arbitrary values where the theme can be extended

## Forms

- react-hook-form + yupResolver + Yup for validation
- Use `getSystemResource()` for error messages and labels

## Elasticsearch reindexing

- `frontend/src/app/api/elastic/indexItem/route.ts` – webhook handler for CMS changes
- When adding a new content type or block relation, add a `case` in the switch and reindex related items via `fetchMany` + `addToCollection`

## Pre-commit

Husky runs `lint-staged` (eslint + prettier on staged `*.{js,ts,tsx}`).
