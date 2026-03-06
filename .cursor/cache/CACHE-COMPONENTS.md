# Cache Components System (AI Agents Reference)

Quick reference for AI agents working with the cache system in this project.

## Overview

The project uses **Next.js 16 Cache Components** with custom helpers. By default, nothing is cached – caching is opt-in via `cacheTag`, `cachePage`, and `cacheLife`.

## Key Files

| File | Purpose |
|------|---------|
| `frontend/src/utils/cache/tag.ts` | `cacheTag()`, `revalidateTag()`, `TCacheTags` type |
| `frontend/src/utils/cache/path.ts` | `revalidatePath()`, `revalidateAll()` |
| `frontend/src/utils/cache/page.ts` | `cachePage()` – applies tags based on page content |
| `frontend/src/app/[[...slug]]/page.tsx` | `cachedStaticProps`, `generateStaticParams` |
| `frontend/src/app/api/revalidate/route.ts` | Revalidation API (GET/POST) |
| `frontend/src/app/api/elastic/indexItem/route.ts` | Webhook handler – reindexes + revalidates |

## Rules

1. **getStaticProps** – No additional cache inside; the whole `cachedStaticProps` is cached.
2. **Blocks with searchParams** – Must be wrapped in `Suspense` (Partial Prerender). Example: `ArticlesListBlock`.
3. **Tag format** – `tag` for global, `tag-documentId` for specific entity (e.g. `article-abc123`).
4. **Error pages** (404, 500) – Use `cacheLife('minutes')` (1 min minimum).
5. **Normal pages** – Use `cachePage(app)` after fetching data.

## Data Loading Patterns

- **getStaticProps** – Data in `app.blocksPropsMap`, no extra cache.
- **Block-level fetch** – Use `'use cache'` + `cacheTag()` in the block; wrap in `Suspense` if using searchParams.
- **Client fetch** – Standard client-side loading (loadMore, etc.).

## Revalidation

- **api/revalidate?force=1** – Full site revalidation.
- **api/revalidate?tag=X&id=Y** – Revalidate specific tag/entity.
- **api/elastic/indexItem** – Called by Strapi webhook; reindexes and revalidates affected tags.

## Checklist: Adding New Content Type

1. Add to `TCacheTags` in `tag.ts`.
2. Add case in `cachePage` or `cacheBlocks` in `page.ts` for the new content.
3. If using Elasticsearch: ensure provider's `getApiKey()` matches the tag; `indexItem` will revalidate automatically.

## Full Documentation

See [CACHE-COMPONENTS.md](../../CACHE-COMPONENTS.md) (project root) for the complete manual in Czech.
