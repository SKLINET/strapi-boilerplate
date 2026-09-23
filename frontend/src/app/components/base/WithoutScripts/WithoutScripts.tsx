import { ReactNode } from 'react';
import { headers } from 'next/headers';

interface WithoutScriptsProps {
    children: ReactNode;
}

/**
 * @description Drops its children when the request carries `x-without-scripts: 1`, which `proxy.ts`
 * sets for `?withoutScripts=1`. Used to wrap third-party scripts so an audit or performance run
 * renders with none of them present **server-side** — no client-side removal flash, and nothing for
 * a scanner to trip over.
 *
 * It reads `headers()`, so it is a dynamic hole: every caller has to put it behind its own
 * `<Suspense>`, and no `'use cache'` scope may enclose it (a cache scope covers everything a
 * component renders, Suspense boundary or not).
 * @param {ReactNode} children - Scripts to render unless the header asks for them to be dropped
 * @returns {Promise<ReactNode | null>} The children, or null
 **/
export async function WithoutScripts({ children }: WithoutScriptsProps) {
    const headersList = await headers();

    if (headersList.get('x-without-scripts') === '1') {
        return null;
    }

    return children;
}
