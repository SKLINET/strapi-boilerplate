import { NextRequest, NextResponse } from 'next/server';
import sklinet from '../sklinet.config.json';

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

export async function proxy(req: NextRequest) {
    const url = req.nextUrl;

    const redirects = await handleRedirects(req);
    if (redirects) return redirects;

    // --------- SKIP BASIC AUTH ---------
    if (
        url.searchParams.get('disable-auth') ||
        url.pathname.includes('/fonts/') ||
        url.pathname.includes('/pdf') ||
        (url.host.includes('localhost') && process.env.NODE_ENV !== 'production') ||
        (process.env.NODE_ENV === 'production' &&
            !process?.env?.BASE_PATH?.includes('symbio.agency') &&
            !process?.env?.BASE_PATH?.includes('beneficiotest.cz') &&
            !process?.env?.BASE_PATH?.includes('sklinet.com'))
    ) {
        return NextResponse.next();
    }

    // --------- BASIC AUTH ---------
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
        const auth = basicAuth.split(' ')[1];
        const buffer = Uint8Array.from(atob(auth), (character) => character.charCodeAt(0));
        const decoded = new TextDecoder().decode(buffer).normalize();

        const [user, pwd] = decoded.split(':');
        if (isValidAuth(user, pwd)) {
            return NextResponse.next();
        }
    }

    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
}

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
    ],
};
