import Provider from './Provider';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { createRelayEnvironment } from '../../relay/createRelayEnvironment';
import { OperationType } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { fetchQuery } from 'relay-runtime';
import { sleep } from '../../utils/sleep';
import config from '../../../sklinet.config.json';
import { STRAPI_MAX_LIMIT } from '../../constants';

export type StrapiRecord = {
    documentId: string;
    [key: string]: unknown;
};

export interface FindResponse<T> {
    count: number;
    data: T;
}

export default abstract class AbstractStrapiProvider<
    TOne extends OperationType,
    TFind extends OperationType,
    TItem extends StrapiRecord = StrapiRecord,
    TItems extends { data: ReadonlyArray<StrapiRecord | null> } = { data: ReadonlyArray<StrapiRecord | null> },
> implements Provider
{
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}, '', true),
        production: createRelayEnvironment({}, '', false),
    };

    protected node: GraphQLTaggedNode;

    protected findNode: GraphQLTaggedNode;

    public constructor(node: GraphQLTaggedNode, findNode: GraphQLTaggedNode) {
        this.node = node;
        this.findNode = findNode;
    }

    protected getEnvironment(preview = false): Environment {
        return this.environment[preview ? 'preview' : 'production'];
    }

    public isLocalizable(): boolean {
        return true;
        // return config.i18n.locales.length > 1;
    }

    abstract getApiKey(): string;

    abstract isSitemapEnabled(): boolean;

    abstract getId(): string;

    /**
     * Get one item by id or filter
     * @param options
     * @param locale
     * @param preview
     */
    async findOne(
        options: string | Omit<TFind['variables'], 'locale'>,
        locale?: string,
        preview = false,
    ): Promise<TItem | null> {
        let variables: TOne['variables'] = {};
        if (typeof options !== 'string' && options.documentId) {
            variables = options;
        }
        if (Object.keys(variables).length === 0) {
            variables =
                typeof options === 'string'
                    ? {
                          filters: {
                              documentId: { eq: options },
                              ...this.getFilterParams(),
                          },
                          locale,
                      }
                    : {
                          ...options,
                          limit: 1,
                          offset: 0,
                          filters: options.filters
                              ? { ...this.getFilterParams(options?.status || ''), ...options.filters }
                              : this.getFilterParams(options?.status || ''),
                          locale,
                      };
        }

        const result = await fetchQuery<TOne>(this.getEnvironment(preview), this.node, variables).toPromise();
        return await this.transformResult(result, locale);
    }

    /**
     * Transform result of one query into an item
     * @param result
     * @param locale
     */
    async transformResult(result: TOne['response'], locale?: string): Promise<TItem | null> {
        if (result && Object.keys(result).length > 0) {
            return { ...(result as { item: TItem }).item, cmsTypeId: this.getId() };
        } else {
            return null;
        }
    }

    async find(
        options: Omit<TFind['variables'], 'locale'> & { locale?: string },
        preview = false,
    ): Promise<FindResponse<TItems['data']>> {
        const variables = {
            ...options,
            limit: Math.min(options.limit || STRAPI_MAX_LIMIT, STRAPI_MAX_LIMIT),
            start: options?.start || 0,
            filters: options.filters
                ? { ...this.getFilterParams(options?.status || ''), ...options.filters }
                : this.getFilterParams(options?.status || ''),
        };

        if (this.isLocalizable()) {
            variables.locale = options.locale;
        }

        const result = await fetchQuery<TFind>(this.getEnvironment(preview), this.findNode, variables)
            .toPromise()
            .then((d: any) => {
                // When response do not have meta information -> articles query
                if (Array.isArray(d.items)) {
                    return {
                        items: d.items,
                        meta: { pagination: { total: 0 } },
                    };
                }

                // When response have meta information -> articles_connection query
                const { nodes, pageInfo } = d.items;

                return {
                    items: nodes,
                    meta: { pagination: { total: pageInfo.total } },
                };
            });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data: Mutable<TItems['data']> = ([...result.items] as Mutable<TItems['data']>) || [];
        const count = result?.meta?.pagination?.total || 0;

        if (options.limit > STRAPI_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === STRAPI_MAX_LIMIT) {
                variables.start = data.length;
                const result = await fetchQuery<TFind>(this.getEnvironment(preview), this.findNode, variables)
                    .toPromise()
                    .then((d: any) => {
                        // When response do not have meta information -> articles query
                        if (Array.isArray(d.items)) {
                            return {
                                items: d.items,
                                meta: { pagination: { total: 0 } },
                            };
                        }

                        // When response have meta information -> articles_connection query
                        const { nodes, pageInfo } = d;

                        return {
                            items: nodes,
                            meta: { pagination: { total: pageInfo.total } },
                        };
                    });
                if (Array.isArray(data)) {
                    data.push(...result.items);
                }
                await sleep();
            }
        }

        return {
            count,
            data,
        };
    }

    cleanData(data: Record<string, any>) {
        const result: Record<string, any> = {};
        const keys = data ? Object.keys(data) : [];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const field = data[key];
            if (typeof field === 'string' || typeof field === 'number' || typeof field === 'boolean') {
                result[key] = field;
            } else {
                if (Array.isArray(field?.data)) {
                    const items = [];
                    for (let j = 0; j < field?.data?.length; j++) {
                        const it = this.cleanData({ id: field.data[j].id, ...field.data[j] });
                        items.push(it);
                    }
                    result[key] = items;
                } else if (Array.isArray(field)) {
                    const items = [];
                    for (let j = 0; j < field?.length; j++) {
                        const it = this.cleanData(field[j]);
                        items.push(it);
                    }
                    result[key] = items;
                } else if (field?.data) {
                    result[key] = this.cleanData({ id: field.data.id, ...field.data });
                }
            }
        }
        return result;
    }

    getFilterParams(publicationState = ''): Record<string, unknown> {
        if (publicationState?.toLowerCase() === 'draft') {
            return {};
        }
        return {};
    }

    async getPreviewUrl(id: string, locale?: string): Promise<string | null> {
        const item = await this.findOne(id, locale);
        if (locale !== config.i18n.defaultLocale) {
            if (item) {
                if (item.url) {
                    return `/${locale}/${item.url}`;
                }
                if (item.slug) {
                    return `/${locale}/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${locale}/${item.id}`;
                }
            }
            return null;
        } else {
            const item = await this.findOne(id);
            if (item) {
                if (item.url) {
                    return `/${item.url}`;
                }
                if (item.slug) {
                    return `/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${item.id}`;
                }
            }
            return null;
        }
    }
}
