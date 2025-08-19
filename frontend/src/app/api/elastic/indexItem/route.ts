import { NextRequest } from 'next/server';
import AbstractElasticProvider, { IndexingResultItem } from '../../../../lib/provider/AbstractElasticProvider';
import { findProvider } from '../../../../utils/base/findProvider';
import AbstractSingletonElasticProvider from '../../../../lib/provider/AbstractSingletonElasticProvider';
import config from '../../../../../sklinet.config.json';

interface IHandle {
    typeId: string;
    id: string;
    action: string;
    simple: boolean;
    entry?: any;
}

// Function for merging IDs
function mergeUnique(arr1: string[], arr2: string[]): string[] {
    return Array.from(new Set([...arr1, ...arr2]));
}

// Fetch one entry from Elastic
// const fetchOne = async (typeId: string, id: string, locale: string) => {
//    const provider = findProvider(typeId);
//
//    const entry = await provider.findOneByElastic(id, locale, false);
//
//    return entry;
//};

// Fetch many entries from Elastic
const fetchMany = async (typeId: string, query: Record<string, any>, locale: string) => {
    const provider = findProvider(typeId);

    const entries = await provider.findByElastic(
        {
            body: {
                query,
            },
            size: 100,
            _source: ['documentId'],
        },
        locale,
        false,
    );

    return entries?.data || [];
};

// Reindex item
const reindexItem = async ({ typeId, id, action, simple }: IHandle) => {
    const indexedItems: Array<IndexingResultItem> = [];

    console.log('Reindexing item', id);

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

    return indexedItems;
};

// Reindex one related item
const reindexRelatedEntry = async (typeId: string, id: string, simple: boolean) => {
    const indexedItems: Array<IndexingResultItem> = [];

    const provider = findProvider(typeId);

    if (provider) {
        indexedItems.push(...(await provider.indexOne(id, simple, true)));
        indexedItems.push(...(await provider.indexOne(id, simple)));
    }

    return indexedItems;
};

// Reindex many related items
const reindexRelatedEntries = async (typeId: string, idArray: string[], simple: boolean) => {
    const indexedItems: Array<IndexingResultItem> = [];

    for (let i = 0; i < idArray.length || 0; i++) {
        try {
            indexedItems.concat(await reindexRelatedEntry(typeId, idArray[i], simple));
        } catch (err) {
            console.log(err);
        }
    }

    return indexedItems;
};

const handle = async ({ typeId, id, action, simple, entry }: IHandle) => {
    console.log('INDEX ITEM', action, typeId, id, simple);
    try {
        const locales: string[] = typeof entry?.locale === 'string' ? [entry.locale] : config.i18n.locales;

        const indexedItems: Array<IndexingResultItem> = [];

        try {
            // 1) Reindexing edited item
            indexedItems.concat(await reindexItem({ typeId, id, action, simple, entry }));

            // 2) Reindexing of related items
            for (const locale of locales) {
                switch (typeId) {
                    case 'article': {
                        /*
                        const articleCategoryIDs = mergeUnique(
                            // New article categories
                            Array.isArray(entry?.categories)
                                ? entry?.categories?.map((e: any) => e.documentId) || []
                                : [],
                            // Old article categories
                            (
                                await fetchMany(
                                    'article-category',
                                    {
                                        bool: {
                                            must: [
                                                {
                                                    terms: {
                                                        'articles.documentId': [id],
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    locale,
                                )
                            )?.map((e: any) => e.documentId) || [],
                        );

                        indexedItems.concat(
                            await reindexRelatedEntries('article-category', articleCategoryIDs, simple),
                        );
                        */
                        break;
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
