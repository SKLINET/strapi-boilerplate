# Cache Components – System Overview

The project uses **Next.js 16 Cache Components** (`cacheComponents: true`) together with **cache tags** for granular invalidation. This document describes how the system works and how to work with it.

## Configuration

- **next.config.ts:** `cacheComponents: true`, `cacheLife` (stale, revalidate, expire)
- **cacheLife.default:** stale 30s, revalidate 1h, expire 1 year

## Two-Layer Caching

### 1. `'use cache'` – Cache Components

Components and functions with the `'use cache'` directive are cached at the React/Next.js level. Used in:

- `frontend/src/app/[[...slug]]/page.tsx` – Page
- `frontend/src/app/components/base/PageContent/PageContent.tsx` – PageContent

### 2. Fetch cache – `next: { tags }`

GraphQL requests via Relay use `fetch` with `next: { tags }`. Tags enable targeted invalidation of the fetch cache when CMS content changes.

## Cache Tags (TCacheTags)

Defined in `frontend/src/utils/cache/tag.ts`:

| Tag | Description |
|-----|-------------|
| `article` | Articles |
| `article-category` | Article categories |
| `form-builder` | Forms (built-form) |
| `menu` | Menu |
| `page` | Pages |
| `redirect` | Redirects |
| `system-resource` | System resources (i18n) |
| `template` | Block templates |
| `web-setting` | Web settings |

**Tag format:**
- Full type: `article`, `page`, …
- Specific item: `article-{documentId}`, `page-{documentId}`

## Key Files

| File | Purpose |
|------|---------|
| `frontend/src/utils/cache/tag.ts` | `cacheTag()`, `revalidateTag()`, `TCacheTags` |
| `frontend/src/utils/cache/path.ts` | `revalidatePath()`, `revalidateAll()` |
| `frontend/src/relay/createRelayEnvironment/index.ts` | Relay env with `EnvironmentOptions` (tags, withoutCache, preview) |

## Data Flow

```
generateStaticParams → Page ('use cache') → getStaticProps → getBlocksProps
                                                    ↓
                                    PageProvider.getPageBySlug (fetch with tags)
                                                    ↓
                                    PageContent (cacheTag) → Blocks → blocks (cacheTag)
```

## Where Tags Are Set

### cacheTag – on read (cache marking)

- **PageContent:** `menu`, `redirect`, `system-resource`, `web-setting`, `page` + documentId
- **Blocks:** `template` + documentId (for TemplateBlock)
- **ArticleDetailBlock:** `article` + documentId
- **FormBlock:** `form-builder` + documentId
- **ArticlesListBlock:** `article`, `article-category`

### tags in fetch (fetch cache binding)

- **PageProvider.getPageBySlug:** `['web-setting', 'system-resource']`, `['page']`
- **PageProvider.getPageMetadata:** `['web-setting']`, `['redirect']`, `['page']`
- **fetchArticles:** `tags: ['article']`
- **fetchArticleCategories:** `tags: ['article-category']`
- **ArticleDetailBlock.getStaticProps:** `tags: ['article']`

## Cache Invalidation

### api/revalidate

- **GET:** `?tag=article`, `?tag=article&id=xxx`, `?path=/clanky`, `?force=1`
- **POST:** `{ model, entry }` – for webhooks (model = cache tag, e.g. `article`)

### elastic/indexItem

After reindexing an item, `revalidateTag` is called for each type in `finalIndexedItems` (e.g. `article`, `page`). Strapi webhook calls this route on content change.

### elastic/indexAll

After full reindex, `revalidateAll()` is called.

## Provider Interface

### AbstractStrapiProvider

- `find(options, cacheOptions)` – cacheOptions: `{ preview?, withoutCache?, tags? }`
- `findOne(options, locale?, cacheOptions)` – cacheOptions: `{ preview?, tags? }`
- `getEnvironment(options)` – passes options to `createRelayEnvironment`

### AbstractSingletonStrapiProvider

- `get(locale?, options)` – options: `EnvironmentOptions`

### Elastic providers (indexing)

- **AbstractElasticProvider:** `findOneForIndex` calls `find` with `withoutCache: true`
- **AbstractSingletonElasticProvider:** `getForIndex` calls `get` with `{ preview, withoutCache: true }`

Elastic routes (`indexItem`, `indexAll`) always fetch fresh data from Strapi (withoutCache).

## Rules for AI Agents

1. **New block with fetch data:** Add `cacheTag` for the data type the block displays.
2. **New provider / fetch:** Pass `tags` in `cacheOptions` or `getEnvironment` so the fetch cache can be invalidated.
3. **New content type in Strapi:** Add tag to `TCacheTags` in `tag.ts` if it should be cached and invalidated.
4. **Elastic webhook:** `indexItem` already calls `revalidateTag` – when adding a new type to `itemsToReindex` in indexItem, ensure the provider returns a valid `getApiKey()`.
5. **searchParams / dynamic data:** Pages with `searchParams` must not have `'use cache'` at the level where they are read – see `loading.tsx` and Suspense for dynamic parts.
