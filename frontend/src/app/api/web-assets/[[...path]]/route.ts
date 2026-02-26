import { NextRequest } from 'next/server';
import zlib from 'zlib';

export async function GET(req: NextRequest, context: Record<string, any>) {
    const params = await context.params;
    const { path } = params;

    const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${path?.join('/')}`;
    const range = req.headers.get('range');

    try {
        const response = await fetch(cloudinaryUrl, {
            headers: range ? { Range: range } : {},
        });

        if (!response.ok) {
            return new Response('', { status: response.status });
        }

        // Forward headers and content
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const headers = new Headers();

        const contentType = response.headers.get('Content-Type') || '';
        const contentRange = response.headers.get('Content-Range');
        const contentLength = response.headers.get('Content-Length');

        if (contentRange) {
            headers.set('Content-Range', contentRange);
            headers.set('Accept-Ranges', 'bytes');
        }
        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('Content-Type', contentType);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Headers', '*');
        headers.set('Access-Control-Allow-Methods', 'GET');

        if (contentType?.includes('application/json') || contentType?.includes('text/')) {
            const gzipped = zlib.gzipSync(buffer);
            headers.set('Content-Encoding', 'gzip');
            return new Response(gzipped, { status: 200, headers });
        } else {
            return new Response(buffer, { status: 200, headers });
        }
    } catch (err) {
        console.error(err);
        return new Response('Proxy error', { status: 500 });
    }
}
