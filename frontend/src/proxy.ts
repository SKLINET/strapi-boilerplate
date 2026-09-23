import { NextRequest, NextResponse } from 'next/server';
import { withCroct } from '@croct/plug-next/proxy';
import sklinet from '../sklinet.config.json';
import { croctConfig } from './lib/croct/config';

function isValidAuth(login: string, password: string): boolean {
    const auths = sklinet.auth.basic;
    if (Array.isArray(auths)) {
        for (const auth of auths) {
            if (auth.login === login && auth.password === password) {
                return true;
            }
        }
    }
    return false;
}

// Redirects proxy
async function handleRedirects(req: NextRequest): Promise<NextResponse<unknown> | null> {
    const url = req.nextUrl;
    const redirectPath = url.pathname;
    const host = req.headers.get('host') || req.headers.get('x-forwarded-host') || url.hostname || '';

    return null;
}

async function baseProxy(req: NextRequest) {
    const url = req.nextUrl;

    const redirects = await handleRedirects(req);
    if (redirects) return redirects;

    // The memory report exposes process internals, so it keeps Basic Auth even on public production
    // where the rest of the site skips it.
    const isMemoryRoute = url.pathname.startsWith('/api/memory');

    // `?withoutScripts=1` becomes a request header so `WithoutScripts` can drop every third-party
    // script server-side. It travels as a header rather than a search param because the components
    // that need it sit deep in the tree, and search params would otherwise have to be threaded
    // through — and read — above the block Suspense boundaries.
    const withoutScripts = url.searchParams.get('withoutScripts') === '1';

    const requestHeaders = new Headers(req.headers);
    if (withoutScripts) {
        requestHeaders.set('x-without-scripts', '1');
    }

    const requestInit = { request: { headers: requestHeaders } };

    // --------- SKIP BASIC AUTH ---------
    if (
        url.searchParams.get('disable-auth') ||
        url.pathname.includes('/fonts/') ||
        url.pathname.includes('/pdf') ||
        url.pathname.includes('/_next/') ||
        (url.pathname.includes('/api/') && !isMemoryRoute) ||
        (url.host.includes('localhost') && process.env.NODE_ENV !== 'production') ||
        (process.env.NODE_ENV === 'production' &&
            !isMemoryRoute &&
            !process?.env?.BASE_PATH?.includes('symbio.agency') &&
            !process?.env?.BASE_PATH?.includes('beneficiotest.cz') &&
            !process?.env?.BASE_PATH?.includes('sklinet.com'))
    ) {
        return NextResponse.next(requestInit);
    }

    // --------- BASIC AUTH ---------
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
        const auth = basicAuth.split(' ')[1];
        const buffer = Uint8Array.from(atob(auth), (character) => character.charCodeAt(0));
        const decoded = new TextDecoder().decode(buffer).normalize();

        const [user, pwd] = decoded.split(':');
        if (isValidAuth(user, pwd)) {
            return NextResponse.next(requestInit);
        }
    }

    url.pathname = '/api/auth';

    return NextResponse.rewrite(url, requestInit);
}

export const proxy = croctConfig.appId ? withCroct(baseProxy) : baseProxy;

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        // Opted back in: /api/memory must go through Basic Auth.
        '/api/memory',
    ],
};
