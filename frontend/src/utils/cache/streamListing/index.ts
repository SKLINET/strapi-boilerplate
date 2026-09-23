import { connection } from 'next/server';

/**
 * Postpones the calling server component out of the prerender, so its listing streams in instead of
 * being baked into the page.
 *
 * This is the one thing that actually separates a listing from the page that carries it, and the
 * reason is not obvious from `'use cache'` alone. A route's cache entry takes the **minimum**
 * `cacheLife` and the **union** of the tags of every cache scope that resolved while it was
 * prerendered — and `<Suspense>` does not change that. A listing block sitting in its own scope
 * still hands the route its profile and its collective `article-{locale}` tag, which is how one
 * article publication ends up discarding the homepage shell.
 *
 * Awaiting a connection defers the subtree to request time, so none of that is recorded against the
 * route. The shell stays static and long-lived; the listing arrives over the same response from a
 * cache entry shared by every page that asks for the same options.
 *
 * **Call it first, before the loader.** After the read the scope has already resolved and
 * contributed — which is exactly the bug this prevents.
 **/
export const streamListing = async (): Promise<void> => {
    await connection();
};
