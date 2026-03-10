# 06 Workflow: Environment & Git Safety

**Description:** Pre-commit rules and environment management boundaries for an AI working in the monorepo-style setup.

## 1. Gitignore Adherence (Never Commit These)
The Next.js and Strapi projects heavily rely on generated code. **NEVER** attempt to force-commit or manually modify the following auto-generated files unless debugging the generator itself:
1. `src/types/graphql.ts` (Relay generated types)
2. `src/schema/graphql.schema.json`
3. `__generated__/` directories inside Relay apps
4. `.next/`, `build/`, `dist/`

*Why?* The build pipelines (e.g., `npm run relay`) generate these. They are explicitly in the `.gitignore` to prevent merge conflicts.

## 2. Environment Variables (`.env`)
- **Rule:** Never hardcode API keys, hostnames, or endpoints (like `http://localhost:1337/graphql`) into React components or Server Actions.
- Ensure all environment logic follows the `frontend/.env.example` templates.
- If you require a new environment variable, you **MUST** add it to `.env.example` during planning, and prompt the user to update their local `.env`.
- **Naming Conventions:** Frontend variables exposed to the client must prefix with `NEXT_PUBLIC_`. Server-only secrets should not.

## 3. Monorepo Operations
Because `frontend` and `cms` are often run simultaneously:
1. When generating new CMS schema components (`cms/src/components/`), you must ensure the Strapi server registers them.
2. If you change a CMS schema, you **MUST** remind the user to restart the CMS, query the GraphQL endpoint to update `schema.graphql`, and run `npm run relay` on the frontend before you continue coding React components.

## 4. Vercel & Turbo
Do not modify `.vercel` or `turbo.json` configurations without extreme explicit instruction. These control caching and cloud deployments.
