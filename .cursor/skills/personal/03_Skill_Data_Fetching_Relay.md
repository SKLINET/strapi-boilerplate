# 03 Skill: Data Fetching (Relay & Next.js 16)

**Description:** Rules for an AI agent on how to fetch data from Strapi or ElasticSearch and pass it to React components.

## 1. REST/Axios vs. GraphQL
- **Rule:** Do NOT blindly write inline `fetch` or `axios` calls to get data from the CMS, unless specifically told to do so by a form submission script.
- The company uses a **strictly typed GraphQL + Relay** architecture for data fetching.

## 2. Relay Workflow
When you need a new data field from Strapi in the frontend:
1. Ensure the field is exposed in the Strapi GraphQL schema (backend).
2. Write or update the corresponding GraphQL fragment in the frontend (`src/relay/*.ts` or `.graphql`).
3. **MANDATORY:** After editing any `.graphql` or relay file, you MUST instruct the user to run `npm run relay` or run it yourself if you have bash access.
4. **DO NOT** use the new field in your TypeScript React components until `npm run relay` has generated the `$fragmentType` definitions.

## 3. Server Actions & getStaticProps
- Do not pass raw JSON API responses directly to UI components.
- Data fetching logic MUST live in server-side functions (Next.js 16 Server Actions, or legacy `getStaticProps` in page router context).
- Abstract the fetch logic into `src/providers/*.ts` files if it relates to ElasticSearch or global Strapi queries.

## 4. Transformers (`get{Type}.ts`)
- Raw GraphQL data must always be parsed through a transformer function before hitting the React component.
- **Rule:** When creating a new Component that receives data from Strapi, create a transformer utility `src/utils/strapi/get[ComponentName]Type.ts`.

Example:
```tsx
import { IButton } from '../../types/form';
// Data passed here is strictly typed by Relay's generated generic `$fragmentType`
export const getButtonType = (data: any, app?: IApp): IButton | null => {
   if (!data) return null;
   return {
       label: data.label || '',
       url: data.url || '#',
       color: data.color || 'primary'
   };
};
```

## 5. Global Endpoints (e.g. `llms.txt`)
When asked to implement an `llms.txt` or plain-text config endpoint:
- **Rule:** Do not generate static `.txt` files in `public/`.
- Use a Next.js App Router dynamic route (e.g., `src/app/llms.txt/route.ts`).
- Fetch the data from Strapi via a custom Provider (e.g., `LlmsTxtProvider.get()`).
- Set the correct headers strictly to `text/plain` and disable React compilation hooks.

Example Route:
```typescript
import LlmsTxtProvider from '../../providers/LlmsTxtProvider';
export const dynamic = 'force-dynamic';

export async function GET() {
    const record = await LlmsTxtProvider.get();
    const content = (record?.content as string) || '';

    return new Response(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
}
```

## 6. ISR Caching & Webhook Revalidation
When writing or modifying Webhooks (e.g., Elasticsearch reindexing `api/elastic/indexItem/route.ts` or general Strapi webhooks `api/revalidate/route.ts`):
- **Rule:** You must manually purge Next.js ISR caches when backend data changes.
- Do this by calling `revalidatePath('/', 'layout')` and `revalidateTag('app')` from `next/cache`.
- Do NOT use `res.revalidate()` (Pages Router syntax). We use App Router `revalidatePath`.
