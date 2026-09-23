import { connection } from 'next/server';
import { snapshotMemoryUsage } from '../../../utils/cache/memory';
import { renderMemoryReport } from '../../../utils/cache/memory/report';

/**
 * @description Live process memory, for checking whether the Cache Components LRUs are evicting or
 * the process is simply retaining. HTML by default, `?format=json` for the raw snapshot.
 *
 * Auth is the site Basic Auth in `proxy.ts`, which is extended to cover this one route even where
 * the rest of `/api/` is open. The response is never stored: `connection()` keeps it out of the
 * prerender and `Cache-Control: private, no-store` keeps it out of any proxy.
 * @param {Request} request - Incoming request
 * @returns {Promise<Response>} HTML report, or JSON with `?format=json`
 **/
export async function GET(request: Request) {
    await connection();

    const snapshot = snapshotMemoryUsage();
    const format = new URL(request.url).searchParams.get('format');

    if (format === 'json') {
        return Response.json(snapshot, {
            headers: { 'Cache-Control': 'private, no-store' },
        });
    }

    return new Response(renderMemoryReport(snapshot), {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'private, no-store',
        },
    });
}
