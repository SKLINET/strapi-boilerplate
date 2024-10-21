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
        if (typeof options !== 'string' && options.id) {
            variables = options;
        }
        if (Object.keys(variables).length === 0) {
            variables =
                typeof options === 'string'
                    ? {
                          filters: {
                              id: { eq: options },
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
        if (result) {
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
            .then((d) => {
                const items = (d as Record<string, unknown>).items;
                return {
                    items: (items || []) as TItems['data'],
                    // TODO: Fix meta
                    // meta: (items as unknown as { meta: { pagination: { total: number } } })?.meta || {},
                    meta: { pagination: { total: 0 } },
                };
            });

        const count = result?.meta?.pagination?.total || 0;
        const data: Mutable<TItems['data']> = ([...result.items] as Mutable<TItems['data']>) || [];

        if (options.limit > STRAPI_MAX_LIMIT) {
            // When limit is reached, load more items
            // TODO: Update like first load
            /*
            while (options.limit && data.length < count && result.items.length === STRAPI_MAX_LIMIT) {
                variables.start = data.length;
                const result = await fetchQuery<TFind>(this.getEnvironment(preview), this.findNode, variables)
                    .toPromise()
                    .then((d) => {
                        const items = (d as Record<string, unknown>).items;
                        return {
                            items: (items as unknown as TItems)?.data || [],
                            meta: (items as unknown as { meta: { pagination: { total: number } } }).meta,
                        };
                    });
                if (Array.isArray(data)) {
                    data.push(...result.items);
                }
                await sleep();
            }
            */
        }

        return {
            count,
            // TODO: We don't need to transform results
            // data: (await this.transformResults(data, options.locale)) as unknown as TItems['data'],
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
                if (field?.data?.attributes) {
                    result[key] = this.cleanData({ id: field.data.id, ...field.data.attributes });
                } else if (Array.isArray(field?.data)) {
                    const items = [];
                    for (let j = 0; j < field?.data?.length; j++) {
                        const it = this.cleanData({ id: field.data[j].id, ...field.data[j].attributes });
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
                }
            }
        }
        return result;
    }

    /**
     * Transform find results into array of items
     * @param items
     * @param locale
     */
    async transformResults(items: TItems['data'], locale?: string): Promise<TItems> {
        return items.map((item) => ({
            ...item,
            ...(this.cleanData(item?.attributes || {}) || {}),
            cmsTypeId: this.getId(),
        })) as unknown as TItems;
    }

    getFilterParams(publicationState = ''): Record<string, unknown> {
        if (publicationState?.toLowerCase() === 'draft') {
            // return { isVisibleInListView: { eq: true } };
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
