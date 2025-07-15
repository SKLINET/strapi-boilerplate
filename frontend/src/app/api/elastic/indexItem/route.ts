import { NextRequest } from 'next/server';
import AbstractElasticProvider, { IndexingResultItem } from '../../../../lib/provider/AbstractElasticProvider';
import { findProvider } from '../../../../utils/base/findProvider';
import AbstractSingletonElasticProvider from '../../../../lib/provider/AbstractSingletonElasticProvider';

interface IHandle {
    typeId: string;
    id: string;
    action: string;
    simple: boolean;
    entry?: any;
}

const handle = async ({ typeId, id, action, simple, entry }: IHandle) => {
    console.log('INDEX ITEM', action, typeId, id, simple);
    try {
        const indexedItems: Array<IndexingResultItem> = [];

        try {
            const provider = findProvider(typeId);
            if (provider) {
                if (provider instanceof AbstractElasticProvider) {
                    if (action === 'delete') {
                        await Promise.all([provider.unindex(id), provider.unindex(id, undefined, true)]); // unindex
                    } else if (action === 'unpublish') {
                        await provider.unindex(id, undefined, true); // unindex prod
                    } else {
                        if (action === 'publish') {
                            indexedItems.push(...(await provider.indexOne(id, simple, true)));
                        } else {
                            indexedItems.push(...(await provider.indexOne(id, simple)));
                        }
                    }
                } else if (provider instanceof AbstractSingletonElasticProvider) {
                    if (action === 'publish') {
                        indexedItems.push(...(await provider.index(simple, true)));
                    } else {
                        indexedItems.push(...(await provider.index(simple)));
                    }
                }
            }

            return new Response(
                JSON.stringify({
                    status: 'OK',
                    indexedItems,
                }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
        } catch (e) {
            return new Response(
                JSON.stringify({
                    status: 'ERROR',
                    message: (e as { message: string }).message,
                }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
        }
    } catch (e) {
        return new Response(
            JSON.stringify({
                status: 'ERROR',
                message: (e as { message: string }).message,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }
};

export async function GET(request: NextRequest) {
    const typeId = String(request.nextUrl.searchParams.get('typeId'));
    const id = String(request.nextUrl.searchParams.get('id'));
    const action = request.nextUrl.searchParams.get('action') || 'update';

    const simple = !request.nextUrl.searchParams.get('create');

    return await handle({ typeId, id, action, simple });
}

export async function POST(request: NextRequest) {
    const { model, entry, event } = await request.json();

    const typeId: string = model;
    const id: string = entry?.documentId || entry?.vuid;
    const action = event.replace('entry.', '');

    const simple = !request.nextUrl.searchParams.get('create');

    return await handle({ typeId, id, action, simple, entry });
}
