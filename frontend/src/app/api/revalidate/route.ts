import { NextRequest } from 'next/server';
import { revalidateTag, TCacheTags } from '../../../utils/cache/tag';
import { revalidateAll, revalidatePath } from '../../../utils/cache/path';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force');
    const tag = searchParams.get('tag') as TCacheTags | null;
    const path = searchParams.get('path');
    const id = searchParams.get('id');

    if (tag) {
        revalidateTag(tag);

        if (id) {
            revalidateTag(tag, id);
        }
    }

    if (path) {
        revalidatePath(path);
    }

    if (force) {
        revalidateAll();
    }

    return Response.json({
        status: 'OK',
    });
}

export async function POST(request: NextRequest) {
    const { model, entry } = await request.json();

    const typeId = model as TCacheTags | null;
    const id: string = entry?.documentId || entry?.vuid;

    if (typeId) {
        revalidateTag(typeId);

        if (id) {
            revalidateTag(typeId, id);
        }
    }

    return new Response(
        JSON.stringify({
            status: 'OK',
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
}
