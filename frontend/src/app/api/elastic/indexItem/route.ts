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

// Function for deduplicating IndexingResultItem objects
function deduplicateIndexingResults(items: IndexingResultItem[]): IndexingResultItem[] {
    const seen = new Set<string>();
    const duplicatesFound = new Set<string>();

    const result = items.filter((item) => {
        const key = `${item.type}:${item.id}:${item.index}:${item.locale || 'default'}`;
        if (seen.has(key)) {
            duplicatesFound.add(key);
            return false;
        }
        seen.add(key);
        return true;
    });

    if (duplicatesFound.size > 0) {
        console.log(`Removed ${items.length - result.length} duplicate indexing items:`, Array.from(duplicatesFound));
    }

    return result;
}

// Function for collecting unique items to be indexed
function collectUniqueItemsToIndex(typeId: string, ids: string[], collectedItems: Set<string>): string[] {
    const uniqueIds: string[] = [];

    for (const id of ids) {
        const key = `${typeId}:${id}`;
        if (!collectedItems.has(key)) {
            collectedItems.add(key);
            uniqueIds.push(id);
        }
    }

    return uniqueIds;
}

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

// Reindex many related items
const reindexRelatedEntries = async (typeId: string, idArray: string[], simple: boolean, action: string) => {
    const indexedItems: Array<IndexingResultItem> = [];

    for (let i = 0; i < (idArray?.length || 0); i++) {
        try {
            indexedItems.push(...(await reindexItem({ typeId, id: idArray[i], action, simple })));
        } catch (err) {
            console.log(err);
        }
    }

    return indexedItems;
};

// Global set to track currently processing items to prevent circular references
const currentlyProcessing = new Set<string>();

const handle = async ({ typeId, id, action, simple, entry }: IHandle) => {
    console.log('INDEX ITEM', action, typeId, id, simple);
    try {
        const locales: string[] = typeof entry?.locale === 'string' ? [entry.locale] : config.i18n.locales;

        const indexedItems: Array<IndexingResultItem> = [];

        // Protection against circular references
        const currentProcessingKey = `${typeId}:${id}`;

        currentlyProcessing.add(currentProcessingKey);

        try {
            // Collection of items to be reindexed - using Map to avoid duplicates
            const itemsToReindex = new Map<string, Set<string>>(); // typeId -> Set of IDs
            const collectedItems = new Set<string>(); // Track collected items to avoid duplicates

            // 1) Reindexing edited item
            indexedItems.push(...(await reindexItem({ typeId, id, action, simple, entry })));

            // 2) Collect related items to be reindexed (process only once, not per locale)
            const firstLocale = locales[0];

            // Helper function to add items to collection
            const addToCollection = (type: string, ids: string[]) => {
                if (!itemsToReindex.has(type)) {
                    itemsToReindex.set(type, new Set());
                }
                const typeSet = itemsToReindex.get(type)!;
                ids.forEach((id) => typeSet.add(id));
            };

            // Process related items collection
            switch (typeId) {
                default:
                    break;
            }

            // 3) Batch reindex all collected items
            console.log('Starting batch reindexing of collected items...');
            for (const [relatedTypeId, idsSet] of itemsToReindex.entries()) {
                const uniqueIds = Array.from(idsSet);
                if (uniqueIds.length > 0) {
                    console.log(`Reindexing ${uniqueIds.length} items of type ${relatedTypeId}`);
                    try {
                        if (action === 'unpublish' || action === 'delete') {
                            indexedItems.push(
                                ...(await reindexRelatedEntries(relatedTypeId, uniqueIds, simple, 'update')),
                            );
                            indexedItems.push(
                                ...(await reindexRelatedEntries(relatedTypeId, uniqueIds, simple, 'publish')),
                            );
                        } else {
                            indexedItems.push(
                                ...(await reindexRelatedEntries(relatedTypeId, uniqueIds, simple, action)),
                            );
                        }
                    } catch (err) {
                        console.error(`Error reindexing ${relatedTypeId}:`, err);
                    }
                }
            }

            // 4) Final deduplication of all indexed items
            const finalIndexedItems = deduplicateIndexingResults(indexedItems);
            console.log(
                `Final indexing results: ${finalIndexedItems.length} items (deduplicated from ${indexedItems.length})`,
            );

            return new Response(
                JSON.stringify({
                    status: 'OK',
                    indexedItems: finalIndexedItems,
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
        } finally {
            // Clean up circular reference protection
            currentlyProcessing.delete(currentProcessingKey);
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

    if (typeId === 'built-form' && action === 'update') {
        await handle({ typeId, id, action, simple });
        return await handle({ typeId, id, action: 'publish', simple });
    } else {
        return await handle({ typeId, id, action, simple });
    }
}

export async function POST(request: NextRequest) {
    const { model, entry, event } = await request.json();

    const typeId: string = model;
    const id: string = entry?.documentId || entry?.vuid;
    const action = event.replace('entry.', '');

    const simple = !request.nextUrl.searchParams.get('create');

    if (typeId === 'built-form' && action === 'update') {
        await handle({ typeId, id, action, simple, entry });
        return await handle({ typeId, id, action: 'publish', simple, entry });
    } else {
        return await handle({ typeId, id, action, simple, entry });
    }
}
