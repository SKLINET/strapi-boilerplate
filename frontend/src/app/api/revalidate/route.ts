import { createHash, timingSafeEqual } from 'node:crypto';
import { connection, NextRequest } from 'next/server';
import { isKnownCacheType, revalidateCacheTag, SUBMISSION_MODELS } from '../../../utils/cache/tag';
import { revalidateAll, revalidatePath } from '../../../utils/cache/path';

/** Is the project running locally? */
function isLocalDev() {
    return process.env.NODE_ENV === 'development';
}

/** Unauthorized response */
function unauthorized() {
    return new Response(JSON.stringify({ status: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
    });
}

/** Bad request response */
function badRequest() {
    return new Response(JSON.stringify({ status: 'Bad request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
    });
}

/** OK response */
function ok() {
    return new Response(JSON.stringify({ status: 'OK' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

/** Fixed-length digest, so the comparison below never leaks the secret's length. */
function digest(value: string) {
    return createHash('sha256').update(value).digest();
}

/**
 * @description Compare the request's secret header against REVALIDATE_SECRET in constant time
 * @param {NextRequest} request - Incoming request
 * @returns {boolean} True when the caller proved it knows the secret
 **/
function isAuthorized(request: NextRequest) {
    const expected = process.env.REVALIDATE_SECRET;
    const provided = request.headers.get('x-revalidate-secret');

    if (!expected || !provided) {
        return false;
    }

    return timingSafeEqual(digest(expected), digest(provided));
}

/**
 * @description Manual invalidation — `?tag=&id=&locale=` for a content type, `?path=` for one URL,
 * `?force=1` for everything (local development only)
 * @param {NextRequest} request - Incoming request
 * @returns {Promise<Response>} JSON status
 **/
export async function GET(request: NextRequest) {
    await connection();

    if (!isLocalDev() && !isAuthorized(request)) {
        return unauthorized();
    }

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force');
    const tag = searchParams.get('tag');
    const path = searchParams.get('path');
    const id = searchParams.get('id') || undefined;
    const locale = searchParams.get('locale') || undefined;

    // An unknown tag is a typo, not a no-op: answering 200 here would make a broken manual call or a
    // misconfigured webhook look like it worked.
    if (tag && !isKnownCacheType(tag)) {
        return badRequest();
    }

    if (tag && isKnownCacheType(tag)) {
        revalidateCacheTag(tag, { locale });

        if (id) {
            revalidateCacheTag(tag, { id, locale });
        }
    }

    if (path) {
        revalidatePath(path);
    }

    if (force && isLocalDev()) {
        revalidateAll();
    }

    return ok();
}

/**
 * @description Strapi webhook entry point — burns both the collective and the entity tag for the
 * published record
 * @param {NextRequest} request - Incoming request with a `{ model, entry }` body
 * @returns {Promise<Response>} JSON status
 **/
export async function POST(request: NextRequest) {
    await connection();

    if (!isAuthorized(request)) {
        return unauthorized();
    }

    const { model, entry } = await request.json();

    // Form submissions never appear on a page, so there is nothing to invalidate.
    if (typeof model === 'string' && SUBMISSION_MODELS.has(model)) {
        return ok();
    }

    if (typeof model !== 'string' || !isKnownCacheType(model)) {
        return badRequest();
    }

    const locale = entry?.locale || undefined;
    const id = entry?.documentId || entry?.vuid;

    revalidateCacheTag(model, { locale });

    if (id) {
        revalidateCacheTag(model, { id, locale });
    }

    return ok();
}
