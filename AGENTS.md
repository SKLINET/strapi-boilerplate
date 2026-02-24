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

## Setup

- **Install:** `npm install` (run from `frontend/`)
- **Dev:** `npm run dev` · **Build:** `npm run build` (runs graphql-codegen + relay first)
- **Lint:** `npm run lint` · **Relay:** `npm run relay` · **Relay watch:** `npm run relay:watch`
- **Node:** 22.x (see `frontend/.nvmrc`)

## Project structure

Monorepo: `frontend/` (Next.js app) + `cms/` (Strapi). Work primarily in `frontend/` unless modifying CMS.

## Stack

Next.js 15, React 19, Relay 16, Tailwind 3, SCSS Modules. Forms: react-hook-form + Yup + @hookform/resolvers. CMS: Strapi. Search: Elasticsearch.

## Code style

- **Prettier:** single quotes, semicolons, 4 spaces, 120 chars, trailing commas
- **TypeScript:** strict. Types in `src/types/`. Avoid `any` where possible
- **Naming:** PascalCase (components), camelCase (functions), UPPER_SNAKE_CASE (constants)

## Structure

- **Components (Atomic Design):** `primitives/` → `molecules/` → `organisms/` → `blocks/` + `base/`
- **Blocks** in `src/app/blocks/` – page blocks; register in `server.ts`
- **Providers** in `src/providers/` – Elastic + Strapi data; register in `providers/index.ts`
- **Relay** fragments in `src/relay/` – GraphQL; run `npm run relay` after changes
- **Utils** in `src/utils/strapi/` – `get*Type` functions map Relay fragments to app types
- **i18n:** `getSystemResource(codename, app?.systemResources)` for labels

## Styling

- **SCSS Modules:** `ComponentName.module.scss` next to component
- **Tailwind:** mobile-first. Breakpoints: `mobile-landscape:`, `tablet:`, `tablet-landscape:`, `desktop:`, `large-desktop:`, `fullhd:`
- Prefer Tailwind utilities; use SCSS for complex logic. Avoid arbitrary values where config can be extended

## Forms

- react-hook-form + yupResolver + Yup for validation
- Use `getSystemResource()` for error messages and labels

## Elasticsearch reindexing

- `frontend/src/app/api/elastic/indexItem/route.ts` – webhook handler for CMS changes
- When adding a new content type or block relation, add a `case` in the switch and reindex related items via `fetchMany` + `addToCollection`

## Pre-commit

Husky runs `lint-staged` (eslint + prettier on staged `*.{js,ts,tsx}`).
