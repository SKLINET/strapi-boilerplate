import Provider from './Provider';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { createRelayEnvironment } from '../../relay/createRelayEnvironment';
import { OperationType } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { fetchQuery, commitMutation } from 'relay-runtime';
import { sleep } from '../../utils/sleep';
import config from '../../../sklinet.config.json';
import { STRAPI_MAX_LIMIT } from '../../constants';
import getPublicationState from '../../utils/base/getPublicationState';

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

    protected node: GraphQLTaggedNode | undefined;

    protected findNode: GraphQLTaggedNode;

    protected createNode: GraphQLTaggedNode | undefined;

    protected updateNode: GraphQLTaggedNode | undefined;

    protected indexNode: GraphQLTaggedNode | undefined;

    public constructor(
        node: GraphQLTaggedNode | undefined,
        findNode: GraphQLTaggedNode,
        createNode?: GraphQLTaggedNode,
        updateNode?: GraphQLTaggedNode,
        indexNode?: GraphQLTaggedNode,
    ) {
        this.node = node;
        this.findNode = findNode;
        this.createNode = createNode;
        this.updateNode = updateNode;
        this.indexNode = indexNode;
    }

    protected getEnvironment(preview = false): Environment {
        if (preview) {
            return createRelayEnvironment({}, '', true, true);
        } else {
            return createRelayEnvironment({}, '', false);
        }
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
        if (!this.node) return null;

        let variables: TOne['variables'] = {};
        if (typeof options !== 'string' && options.documentId) {
            variables = options;
        }
        if (Object.keys(variables).length === 0) {
            variables =
                typeof options === 'string'
                    ? {
                          filter: {
                              documentId: { eq: options },
                              ...this.getFilterParams(),
                          },
                          locale,
                      }
                    : {
                          ...options,
                          limit: 1,
                          offset: 0,
                          filter: options.filter
                              ? { ...this.getFilterParams(options?.status || ''), ...options.filter }
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
        index = false,
    ): Promise<FindResponse<TItems['data']>> {
        const variables = {
            ...options,
            limit: Math.min(options.limit || STRAPI_MAX_LIMIT, STRAPI_MAX_LIMIT),
            start: options?.start || 0,
            filter: options.filter
                ? { ...this.getFilterParams(options?.status || ''), ...options.filter }
                : this.getFilterParams(options?.status || ''),
            status: getPublicationState(preview),
        };

        const node: GraphQLTaggedNode = index && this.indexNode ? this.indexNode : this.findNode;

        if (this.isLocalizable()) {
            variables.locale = options.locale;
        }
        const environment = index ? this.getEnvironment(true) : this.getEnvironment(preview);

        const result = await fetchQuery<TFind>(environment, node, variables)
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
                const { nodes, pageInfo } = d.items || {};

                return {
                    items: nodes,
                    meta: { pagination: { total: pageInfo?.total || 0 } },
                };
            });

        const count = result?.meta?.pagination?.total || 0;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data: Mutable<TItems['data']> = ([...(result?.items || [])] as Mutable<TItems['data']>) || [];

        if (options.limit > STRAPI_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === STRAPI_MAX_LIMIT) {
                variables.start = data.length;
                const result = await fetchQuery<TFind>(environment, this.findNode, variables)
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
                            meta: { pagination: { total: pageInfo?.total || 0 } },
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
            data: (await this.transformResults(data, options.locale)) as unknown as TItems['data'],
        };
    }

    async transformResults(items: TItems['data'], locale?: string): Promise<TItems> {
        // Stringify form builder data (becouse Elastic indexing)
        function stringifyFormBuilderData(input: unknown): unknown {
            if (Array.isArray(input)) {
                return input.map(stringifyFormBuilderData);
            } else if (input && typeof input === 'object') {
                const obj = input as Record<string, unknown>;
                if (obj['__typename'] === 'FormBuilderBuiltForm' && obj.data) {
                    return { ...obj, data: JSON.stringify(obj.data) };
                }
                const result: Record<string, unknown> = {};
                for (const key of Object.keys(obj)) {
                    result[key] = stringifyFormBuilderData(obj[key]);
                }
                return result;
            } else {
                return input;
            }
        }

        const _items: any[] = items.map((e) => stringifyFormBuilderData(e));

        return _items.map((item) => ({
            ...item,
            ...(this.cleanData(item?.attributes || {}) || {}),
            cmsTypeId: this.getId(),
        })) as unknown as TItems;
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
                if (field) {
                    result[key] = this.cleanData({ id: field.documentId, ...field });
                } else if (Array.isArray(field)) {
                    const items = [];
                    for (let j = 0; j < field?.length; j++) {
                        const it = this.cleanData({ id: field[j].documentId, ...field[j] });
                        items.push(it);
                    }
                    result[key] = items;
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async create<TItem extends BaseRecord = TFind['response']['items'][number]>(
        variables: any,
    ): Promise<Record<string, any>> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            await commitMutation<any>(this.getEnvironment(false), {
                mutation: this.createNode as GraphQLTaggedNode,
                variables,
                onCompleted(response) {
                    if (!response?.item) {
                        return reject({ success: false });
                    }
                    return resolve({ success: true, data: response?.item });
                },
                onError(error) {
                    return reject({ success: false, error });
                },
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async update<TItem extends BaseRecord = TFind['response']['items'][number]>(
        variables: any,
    ): Promise<Record<string, any>> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            await commitMutation<any>(this.getEnvironment(false), {
                mutation: this.updateNode as GraphQLTaggedNode,
                variables,
                onCompleted(response) {
                    if (!response) {
                        return reject({ success: false });
                    }
                    return resolve({ success: true, data: response });
                },
                onError(error) {
                    return reject({ success: false, error });
                },
            });
        });
    }
}
