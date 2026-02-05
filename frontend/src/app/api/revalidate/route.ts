import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const VALID_TAGS = ['pages', 'articles', 'settings', 'article-categories', 'all'] as const;
const CACHE_TAGS = ['pages', 'articles', 'settings', 'article-categories'] as const;
type ValidTag = (typeof VALID_TAGS)[number];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { tag } = body;

        // Validate tag
        if (!tag || !VALID_TAGS.includes(tag)) {
            return NextResponse.json({ error: `Invalid tag. Valid tags: ${VALID_TAGS.join(', ')}` }, { status: 400 });
        }

        // Revalidate
        if (tag === 'all') {
            // Revalidate all cache tags
            CACHE_TAGS.forEach((t) => {
                revalidateTag(t, 'max');
            });
            console.log('[Revalidate] All cache tags revalidated');
        } else {
            revalidateTag(tag, 'max');
            console.log(`[Revalidate] Tag "${tag}" revalidated`);
        }

        return NextResponse.json({
            revalidated: true,
            tag,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag');

    if (!tag || !VALID_TAGS.includes(tag as ValidTag)) {
        return NextResponse.json({ error: `Invalid tag. Valid tags: ${VALID_TAGS.join(', ')}` }, { status: 400 });
    }

    // Revalidate
    if (tag === 'all') {
        // Revalidate all cache tags
        CACHE_TAGS.forEach((t) => {
            revalidateTag(t, 'max');
        });
        console.log('[Revalidate] All cache tags revalidated');
    } else {
        revalidateTag(tag, 'max');
        console.log(`[Revalidate] Tag "${tag}" revalidated`);
    }

    return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
    });
}
