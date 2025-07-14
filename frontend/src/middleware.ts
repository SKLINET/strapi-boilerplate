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

export function middleware(req: NextRequest) {
    if (
        req.nextUrl.searchParams.get('disable-auth') ||
        req.nextUrl.pathname.includes('/fonts/') ||
        req.nextUrl.pathname.includes('/pdf') ||
        req.nextUrl.pathname.includes('/_next/') ||
        req.nextUrl.pathname.includes('/api/') ||
        (req.nextUrl.host.includes('localhost') && process.env.NODE_ENV !== 'production') ||
        (process.env.NODE_ENV === 'production' &&
            !process?.env?.BASE_PATH?.includes('symbio.agency') &&
            !process?.env?.BASE_PATH?.includes('beneficiotest.cz') &&
            !process?.env?.BASE_PATH?.includes('sklinet.com'))
    ) {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;
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
    matcher: '/:path*',
};
