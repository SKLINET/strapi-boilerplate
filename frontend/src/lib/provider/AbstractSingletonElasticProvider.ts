import { RequestBody, estypes } from '@elastic/elasticsearch';
import { OperationType } from 'relay-runtime';
import { Logger } from '../../services';
import getElastic from '../elastic';
import config from '../../../sklinet.config.json';
import { IndexingResultItem } from './AbstractElasticProvider';
import AbstractSingletonStrapiProvider, { SingletonStrapiRecord } from './AbstractSingletonStrapiProvider';

export default abstract class AbstractSingletonElasticProvider<
    TOperation extends OperationType,
    TItem extends SingletonStrapiRecord = SingletonStrapiRecord,
> extends AbstractSingletonStrapiProvider<TOperation> {
    /**
     * Get item from elastic search
     * @param locale
     * @param preview
     */
    async getByElastic(locale?: string, preview = false): Promise<TItem | null> {
        const options = {
            index: this.getIndex(locale, !preview),
            body: {
                size: 1,
                query: {
                    match_all: {},
                },
            },
        };
        const result = await getElastic().search(options);
        const { hits: hitsStruct, total: totalValue } = result.hits;
        const total = totalValue as estypes.SearchTotalHits;
        const hits = hitsStruct as estypes.SearchHit[];

        if (total.value < 1) {
            return null;
        }

        return hits[0]._source as TItem;
    }

    /**
     * Get source fields (default all)
     * @override
     */
    getSource(): string[] | undefined {
        return undefined;
    }

    /**
     * Get item for search indexing
     * @param locale
     * @param preview
     */
    async getForIndex(locale?: string, preview = false): Promise<TItem | null> {
        return (await this.get(locale, preview)) as TItem;
    }

    /**
     * Index in elastic search
     * @param simple
     * @param prod
     */
    async index(simple = false, prod = false): Promise<Array<IndexingResultItem>> {
        const result: Array<IndexingResultItem> = [];
        if (this.isLocalizable()) {
            for (const locale of config.i18n.locales) {
                const item = await this.getForIndex(locale, !prod);

                if (!item || typeof item !== 'object') {
                    await this.unindex(locale, prod);
                    continue;
                }

                if (!simple) {
                    await this.createAndReindex(locale, prod);
                }

                await getElastic().index({
                    index: this.getIndex(locale, prod),
                    document: { ...item, locale },
                    refresh: true,
                    id: '1',
                });
                result.push({
                    id: '1',
                    type: this.getApiKey(),
                    locale,
                    index: this.getIndex(locale, prod),
                });
            }
        } else {
            const item = await this.getForIndex(undefined, !prod);

            if (!item) {
                await this.unindex(undefined, prod);
                return result;
            }

            if (!simple) {
                await this.createAndReindex(undefined, prod);
            }

            await getElastic().index({
                index: this.getIndex(undefined, prod),
                document: item as RequestBody,
                refresh: true,
                id: '1',
            });

            result.push({
                id: '1',
                type: this.getApiKey(),
                index: this.getIndex(undefined, prod),
            });
        }

        return result;
    }

    async createAndReindex(locale?: string, prod?: boolean): Promise<void> {
        try {
            const index = this.getIndex(locale, prod);
            const result = await getElastic().indices.exists({
                index,
            });

            if (!result) {
                Logger.info('Creating index ' + index);
                await getElastic().indices.create({
                    index,
                    settings: {
                        analysis: {
                            analyzer: {
                                czech: {
                                    type: 'custom',
                                    tokenizer: 'standard',
                                    char_filter: ['html_strip'],
                                    filter: [
                                        'czechStop',
                                        'czechStemmer',
                                        'lowercase',
                                        'czechStop',
                                        'uniqueOnSamePosition',
                                    ],
                                },
                                english: {
                                    type: 'custom',
                                    tokenizer: 'standard',
                                    char_filter: ['html_strip'],
                                    filter: ['lowercase', 'uniqueOnSamePosition'],
                                },
                            },
                            filter: {
                                czechStemmer: {
                                    type: 'stemmer',
                                    name: 'czech',
                                },
                                czechStop: {
                                    type: 'stop',
                                    stopwords: ['že', '_czech_'],
                                },
                                uniqueOnSamePosition: {
                                    type: 'unique',
                                    only_on_same_position: true,
                                },
                            },
                        },
                    },
                });

                if (this.getIndexVersion() > 1 || prod) {
                    const sourceIndex = await (async () => {
                        if (prod) {
                            if (this.getIndexVersion() > 1) {
                                const result = await getElastic().indices.exists({
                                    index: this.getIndex(locale, prod, this.getIndexVersion() - 1),
                                });
                                if (result) {
                                    return this.getIndex(locale, prod, this.getIndexVersion() - 1);
                                }
                            }
                            const result2 = await getElastic().indices.exists({
                                index: this.getIndex(locale, false, this.getIndexVersion()),
                            });
                            if (result2) {
                                return this.getIndex(locale, false, this.getIndexVersion());
                            }
                        }
                        if (this.getIndexVersion() > 1) {
                            const result = await getElastic().indices.exists({
                                index: this.getIndex(locale, false, this.getIndexVersion() - 1),
                            });
                            if (result) {
                                return this.getIndex(locale, false, this.getIndexVersion() - 1);
                            }
                        }
                        return false;
                    })();
                    if (sourceIndex) {
                        Logger.info('Reindexing ' + sourceIndex + ' to ' + index);
                        await getElastic().reindex({
                            source: {
                                index: sourceIndex,
                            },
                            dest: {
                                index,
                            },
                        });
                    }
                }
                Logger.log('Done');
            }
        } catch (e) {
            Logger.error((e as { meta: { body: { error: string } } }).meta.body.error);
        }
    }

    /**
     * Remove from index in elastic search
     * @param locale
     * @param prod
     */
    async unindex(locale?: string, prod?: boolean): Promise<void> {
        const unindexItem = async (locale: string) => {
            try {
                await getElastic().delete({
                    index: this.getIndex(locale, false),
                    id: '1',
                });
                Logger.log('Unindex from ' + this.getIndex(locale, false));
                if (prod) {
                    await getElastic().delete({
                        index: this.getIndex(locale, prod),
                        id: '1',
                    });
                    Logger.log('Unindex from ' + this.getIndex(locale, prod));
                }
            } catch (e) {
                Logger.log('Unindex ' + locale + ' failed');
            }
        };

        if (locale) {
            await unindexItem(locale);
        } else {
            for (const locale of config.i18n.locales) {
                await unindexItem(locale);
            }
        }
    }

    /**
     * Get suffix for versioned indexing
     */
    getIndexVersion(): number {
        return 1;
    }

    /**
     * Get full index name
     */
    getIndex(locale?: string, prod?: boolean | undefined, version?: number): string {
        const ver = version || this.getIndexVersion();
        const suffix = typeof prod !== 'undefined' && prod ? '_prod' : '';
        if (this.isLocalizable()) {
            return this.getApiKey() + '_' + locale + '_v' + ver + suffix;
        } else {
            return this.getApiKey() + '_v' + ver + suffix;
        }
    }
}
