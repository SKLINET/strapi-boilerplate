# ISR (Incremental Static Regeneration) Setup

## Overview

Boilerplate používá Next.js 16 Cache Components systém pro ISR s tag-based revalidací.

## Implementované komponenty

### 1. Cache konfigurace

**Soubor:** `next.config.ts`

```typescript
cacheComponents: true  // Zapnuto cache components v Next.js 16
```

### 2. Cache tagy + Cache Life

Implementováno v následujících místech:

| Místo | Cache Life | Tag | Kdy se revaliduje |
|-------|------------|-----|-------------------|
| `PageProvider.getPageBySlug()` | `'hours'` | `'pages'`, `'page-{slug}'` | Webhook nebo auto po několika hodinách |
| `PageProvider.getPageMetadata()` | `'hours'` | `'pages'`, `'page-{slug}'` | Webhook nebo auto po několika hodinách |
| `fetchArticles()` action | `'hours'` | `'articles'` | Webhook nebo auto po několika hodinách |
| `fetchArticleCategories()` action | `'days'` | `'article-categories'` | Webhook nebo auto po 1+ dnech |
| `WebSettingProvider.get()` | `'days'` | `'settings'` | Webhook nebo auto po 1+ dnech |

**Dual strategy:**
- **`cacheLife()`** - Automatická expirace jako bezpečnostní síť (pokud webhook selže)
- **`cacheTag()`** - Okamžitá manuální revalidace přes webhook (preferované)

### 3. Revalidation API

**Endpoint:** `/api/revalidate`

**Metody:** `POST`, `GET`

**Request:**
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"tag": "articles"}'
```

**Response:**
```json
{
  "revalidated": true,
  "tag": "articles",
  "timestamp": "2026-02-05T..."
}
```

**Validní tagy:**
- `'pages'` - Revaliduje všechny stránky
- `'articles'` - Revaliduje články
- `'settings'` - Revaliduje globální nastavení (WebSetting)
- `'article-categories'` - Revaliduje kategorie článků
- `'all'` - Revaliduje všechny tagy najednou (full-site revalidation)

## Setup

### Strapi Webhooks

V Strapi admin panelu: Settings → Webhooks → Create new webhook

#### Webhook pro Pages
- **URL:** `https://your-domain.com/api/revalidate`
- **Events:** Entry Create, Update, Delete, Publish, Unpublish (Page)
- **Body:**
```json
{
  "tag": "pages"
}
```

#### Webhook pro Articles
- **URL:** `https://your-domain.com/api/revalidate`
- **Events:** Entry Create, Update, Delete, Publish, Unpublish (Article)
- **Body:**
```json
{
  "tag": "articles"
}
```

#### Webhook pro Settings
- **URL:** `https://your-domain.com/api/revalidate`
- **Events:** Entry Update (Web Setting)
- **Body:**
```json
{
  "tag": "settings"
}
```

#### Webhook pro Categories
- **URL:** `https://your-domain.com/api/revalidate`
- **Events:** Entry Create, Update, Delete (Article Category)
- **Body:**
```json
{
  "tag": "article-categories"
}
```

#### Webhook pro Full-Site Revalidation
- **URL:** `https://your-domain.com/api/revalidate`
- **Events:** Entry Update (Web Setting) nebo manuální trigger
- **Body:**
```json
{
  "tag": "all"
}
```
- **Použití:** Když chceš revalidovat celý web najednou (změna globálního nastavení, theme, emergency button)

## Testing

### Lokální testování

1. Spustit ngrok tunel:
```bash
ngrok http 3000
```

2. Použít ngrok URL v Strapi webhooks (např. `https://abc123.ngrok.io/api/revalidate`)

3. Testovat manuálně:
```bash
# Validní request - granulární revalidace
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"tag": "articles"}'

# Full-site revalidace
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"tag": "all"}'

# Očekávaná odpověď: {"revalidated":true,"tag":"articles","timestamp":"..."}
```

### Cache flow test

1. Otevřít stránku → data se cachují
2. Upravit obsah ve Strapi a publikovat
3. Webhook triggeruje revalidaci
4. Refresh stránky → nová data se zobrazí

## Preview Mode

Cache se **automaticky vypíná** v preview mode:

```typescript
if (!preview) {
    cacheTag('pages'); // Cache pouze pro produkční mode
}
```

## Deployment

### Environment proměnné v produkci

Nastavit v hosting platformě (Vercel, Netlify, etc.):

```bash
API_ENDPOINT=https://your-strapi-domain.com/graphql
API_TOKEN=your-strapi-api-token
```

### Update Strapi webhooks

Po deployi změnit URL ve Strapi webhooks z localhost na produkční URL:
- Z: `http://localhost:3000/api/revalidate`
- Na: `https://your-production-domain.com/api/revalidate`

## Troubleshooting

### Cache se nerevaliduje

**Kontrola:**
1. Webhook je správně nakonfigurovaný ve Strapi
2. Tag v webhook body odpovídá implementovaným tagům
3. Endpoint URL je dostupný (zkontroluj firewall, HTTPS)

**Debug:**
Zkontrolovat Strapi webhook logs a Next.js console output.

### Preview mode nefunguje

**Kontrola:**
- Podmínka `if (!preview)` je před `cacheTag()`
- Preview je správně nastavený v URL parametrech

## Best Practices

✅ **DO:**
- Vždy použít `'use cache'` na začátku async funkce
- Vždy kontrolovat `!preview` před přidáním cache tagu
- Používat specifické tagy + obecné tagy
- Logovat revalidation události

❌ **DON'T:**
- Necachovat preview content
- Zapomenout na error handling
- Používat příliš časté revalidace (performance overhead)

## Cache strategie

### Dual-layer approach

```typescript
'use cache';
cacheLife('hours');  // Automatická expirace (fallback)
cacheTag('articles'); // Manuální revalidace (primary)
```

**Jak to funguje:**
1. **Webhook funguje** → Cache se okamžitě revaliduje pomocí `cacheTag()`
2. **Webhook selže** → Cache automaticky expiruje po X hodinách díky `cacheLife()`

## Reference

- [Next.js 16 Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)
- [Strapi Webhooks](https://docs.strapi.io/dev-docs/configurations/webhooks)
- [ISR in Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
