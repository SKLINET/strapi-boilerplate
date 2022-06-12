import { Environment, GraphQLTaggedNode, fetchQuery } from 'relay-runtime';
import { AbstractProvider, CmsItem, FindOneParams, FindParams } from '@symbio/cms';
import { STRAPI_MAX_LIMIT } from '../constants';
import { createRelayEnvironment } from '../utils/createRelayEnvironment';
import { FindOperationType, FindResponse, OneOperationType, ProviderOptions, BaseRecord } from '../index';

export default class StrapiProvider<
    TOne extends OneOperationType,
    TFind extends FindOperationType,
> extends AbstractProvider {
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}),
        production: createRelayEnvironment({}),
    };

    protected node: GraphQLTaggedNode;

    protected findNode: GraphQLTaggedNode;

    protected options: ProviderOptions;

    public constructor(node: GraphQLTaggedNode, findNode: GraphQLTaggedNode, options: ProviderOptions) {
        super(options);
        this.node = node;
        this.findNode = findNode;
        this.options = options;
    }

    protected getEnvironment(preview = false): Environment {
        return this.environment[preview ? 'preview' : 'production'];
    }

    public isLocalizable(): boolean {
        return this.options.locales.length > 1;
    }

    /**
     * Get one item by id or filter
     * @param options
     */
    async findOne<TItem extends BaseRecord = TOne['response']['item']>(
        options: FindOneParams | FindParams<TFind['variables']>,
    ): Promise<CmsItem<TItem> | null> {
        const { locale, preview, id, ...other } = options;
        let variables: TOne['variables'];

        if (id) {
            // get by id
            variables = {
                filter: {
                    id: { eq: id },
                    title: { exists: true },
                    ...this.getFilterParams(),
                },
                locale,
            };
        } else {
            variables = {
                ...other,
                limit: 1,
                offset: 0,
                filter: (options as FindParams<TFind['variables']>).filter
                    ? { ...this.getFilterParams(), ...(options as FindParams<TFind['variables']>).filter }
                    : this.getFilterParams(),
            };
        }

        const result = await fetchQuery<any>(this.getEnvironment(), this.node, variables).toPromise();

        if (!result?.item) {
            return null;
        }

        return await this.transformResult<any>(result.item as TItem, locale);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async find<TItem extends BaseRecord = TFind['response']['items'][number]>(
        options: FindParams<TFind['variables']>,
    ): Promise<FindResponse<TItem>> {
        const { preview, ...other } = options;
        const variables = {
            offset: 0,
            ...other,
            limit: Math.min(options.limit || STRAPI_MAX_LIMIT, STRAPI_MAX_LIMIT),
            filter: options.filter ? { ...this.getFilterParams(), ...options.filter } : this.getFilterParams(),
        };

        const result = await fetchQuery<any>(this.getEnvironment(), this.findNode, variables).toPromise();

        if (!result) {
            return {
                count: 0,
                data: [],
            };
        }

        const count = result.meta.count;
        const data = [...result.items];

        if (options.limit > STRAPI_MAX_LIMIT) {
            while (options.limit && data.length < count && result.items.length === STRAPI_MAX_LIMIT) {
                variables.offset = data.length;
                const result = await fetchQuery<any>(
                    this.getEnvironment(preview),
                    this.findNode,
                    variables,
                ).toPromise();
                if (result) {
                    data.push(...result.items);
                }
            }
        }

        return {
            count,
            data: await this.transformResults<any>(data as ReadonlyArray<TItem>, options.locale),
        };
    }

    getFilterParams(): Record<string, unknown> {
        if (this.isLocalizable()) {
            return {
                title: {
                    exists: true,
                },
            };
        }
        return {};
    }

    async getPreviewUrl(id: string, locale?: string, defaultLocale?: string): Promise<string | null> {
        const item = await this.findOne({ id, locale, preview: true });
        if (item) {
            if (locale !== defaultLocale) {
                if (item.url) {
                    return `/${locale}/${item.url}`;
                }
                if (item.slug) {
                    return `/${locale}/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${locale}/${item.id}`;
                }
            } else {
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
        }
        return null;
    }

    async getPathsToRevalidate(
        item: {
            id: string;
            attributes?: Record<string, unknown>;
            relationships?: Record<string, unknown>;
            meta?: Record<string, unknown>;
        },
        providers: any,
        blocks: any,
        i18n: { locales: string[]; defaultLocale: string },
    ): Promise<string[]> {
        return [];
    }
}
