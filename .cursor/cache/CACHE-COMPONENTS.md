# Cache Components System (AI Agents Reference)

Quick reference for AI agents working with the cache system in this project.

## Overview

The project uses **Next.js 16 Cache Components** with custom helpers. By default, nothing is cached – caching is opt-in via `cacheTag`, `tagPage`, and `cacheLife`.

Every helper lives in its own folder as `index.ts` + `index.test.ts`. The sources carry detailed JSDoc – read it before changing cache behaviour.

## Key Files

| File | Purpose |
|------|---------|
| `frontend/src/utils/cache/tag/index.ts` | `cacheTag()`, `revalidateCacheTag()`, `buildCacheTag()`, `isKnownCacheType()`, `CacheType` |
| `frontend/src/utils/cache/path/index.ts` | `revalidatePath()`, `revalidateAll()` |
| `frontend/src/utils/cache/page/index.ts` | `tagPage()`, `tagBlocks()`, `tagNotFoundPage()`, `isSystemPageSlug()` |
| `frontend/src/utils/cache/cachedStaticProps/index.ts` | `'use cache'` wrapper around `getStaticProps` |
| `frontend/src/utils/cache/cachedMetadata/index.ts` | Page metadata |
| `frontend/src/utils/cache/cachedGlobalMetadata/index.ts` | `cachedGlobalMetadata()`, `cachedAppRedirect()` |
| `frontend/src/utils/cache/preview/index.ts` | `bypassCacheIfPreview()` – draft mode never writes a cache entry |
| `frontend/src/utils/cache/streamListing/index.ts` | `streamListing()` – defers a listing out of the route's prerender |
| `frontend/src/utils/cache/fetchData/*/` | Listing loaders: plain (`index.ts`) + cached (`cached.ts`) |
| `frontend/src/utils/cache/memory/` | Snapshot + HTML report behind `/api/memory` |
| `frontend/src/app/[[...slug]]/page.tsx` | `cachedStaticProps`, `generateStaticParams` |
| `frontend/src/app/api/revalidate/route.ts` | Revalidation API (GET/POST) |
| `frontend/src/app/api/elastic/indexItem/route.ts` | Webhook handler – reindexes + revalidates |

## Rules

1. **getStaticProps** – No additional cache inside; the whole `cachedStaticProps` is cached.
2. **Listing blocks** – Must be wrapped in `Suspense` **and** call `streamListing()` as the very first statement of their `Server.tsx`, before any data read. `Suspense` alone does not help: the route takes the union of the tags and the minimum `cacheLife` of every scope that resolved during its prerender, so the collective listing tag would land on the page shell.
3. **Tag format** – `{type}` → `{type}-{locale}` → `{type}-{id}` → `{type}-{id}-{locale}`. Localized types always carry a locale; global ones (`icon`, `redirect`) never do.
4. **Error pages** (404, 500) – Use `cacheLife('minutes')` (1 min minimum).
5. **Normal pages** – Use `tagPage(app)` after fetching data.
6. **Preview** – Route through `bypassCacheIfPreview()`; never write a cache entry in draft mode.
7. **The `Page` component reads no dynamic API of its own** – React rejects a tree that postpones at its own root while also having postponed slots below it.

## Cache Types

- **Localized** (tag carries the locale): `page`, `article`, `article-category`, `built-form`, `menu`, `system-resource`, `template`, `web-setting`
- **Global** (never carries a locale): `icon`, `redirect`
- **Submission-only** (webhook acknowledged and dropped): `contact-message`, `newsletter-subscriber`

`tag/index.test.ts` reads the Strapi schemas and fails if a content type is added, removed, or has its `pluginOptions.i18n.localized` flag flipped. Run `npm run test` after touching the CMS.

## Data Loading Patterns

- **getStaticProps** – Data in `app.blocksPropsMap`, no extra cache.
- **Listing block** – `streamListing()` first, then `searchParams`, then a `cached*` loader from `fetchData/`. The loader writes the collective tag and returns raw records; `webSetting` is applied in `Server.tsx`, outside the cache key.
- **Client fetch** – Standard client-side loading (loadMore, etc.).

## Revalidation

Both methods require the `x-revalidate-secret` header matching `REVALIDATE_SECRET`. Exception: `GET` is open when `NODE_ENV=development`.

- **api/revalidate?tag=X&id=Y&locale=Z** – Revalidate the collective and entity tag. An unknown `tag` returns `400`, never a silent `200`.
- **api/revalidate?path=/x** – Revalidate one path.
- **api/revalidate?force=1** – Full site revalidation, **development only**.
- **api/revalidate (POST)** `{ model, entry }` – Strapi webhook; locale from `entry.locale`, id from `entry.documentId`.
- **api/elastic/indexItem** – Called by Strapi webhook; reindexes and revalidates affected tags. No locale is known there, so tags fan out across every configured locale.

## Checklist: Adding New Content Type

1. Add it to `LocalizedCacheType` or `GlobalCacheType` **and** to the matching runtime set (`LOCALIZED_TYPES` / `GLOBAL_TYPES`) in `tag/index.ts`.
2. Add the case in `tagPage` in `page/index.ts` for the new content.
3. Run `npm run test` – `tag/index.test.ts` verifies the sets against the CMS schemas.
4. If using Elasticsearch: ensure the provider's `getApiKey()` matches the tag; `indexItem` will revalidate automatically.

## Full Documentation

See [CACHE-COMPONENTS.md](../../CACHE-COMPONENTS.md) (project root) for the complete manual in Czech.
