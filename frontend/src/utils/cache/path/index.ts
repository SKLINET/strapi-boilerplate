/**
 * Path-based invalidation.
 *
 * The blunt counterpart to tags in `../tag`. A tag expires exactly the entries built from one CMS
 * record; a path expires everything rendered under a URL regardless of what it was built from.
 * Reserved for cases where the caller cannot know which records changed.
 */
import { revalidatePath as revalidatePathNext } from 'next/cache';

/** Opt-in tracing, driven by the same flag as the tag side. Silent unless the flag is set. */
const logRevalidate = (message: string): void => {
    if (process.env.NEXT_PUBLIC_ALLOW_REVALIDATE_LOGS === '1') {
        console.log(message);
    }
};

/**
 * Expires every cached path in the app.
 *
 * The sledgehammer, reserved for `?force=1` in local development. A Strapi webhook must never end up
 * here — it carries a model and an id, so it can burn tags instead.
 **/
export const revalidateAll = () => {
    logRevalidate(`🧹 Revalidating all paths`);

    // 'layout' covers the route and everything nested under it; 'page' covers the leaf itself.
    revalidatePathNext('/', 'layout');
    revalidatePathNext('/', 'page');
};

/**
 * Expires one path. Manual escape hatch for `GET /api/revalidate?path=…` when a specific URL is
 * known to be stale but the responsible record is not.
 *
 * @param {string} path - URL path to expire, e.g. `/clanky/novinka`
 **/
export const revalidatePath = (path: string) => {
    logRevalidate(`🧹 Revalidating path ${path}`);
    revalidatePathNext(path);
};
