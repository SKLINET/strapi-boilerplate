import { FindParams, CmsItem, ItemId, Provider, ProviderOptions, FindResponse, FindOneParams, BaseRecord } from '../';
import { GetStaticPathsResult } from 'next';

export default abstract class AbstractProvider<TRest = unknown> implements Provider {
    protected options: ProviderOptions;

    public constructor(options: ProviderOptions) {
        this.options = options;
    }

    public isLocalizable(): boolean {
        return this.options.locales.length > 1;
    }

    getApiKey(): string {
        return this.options.apiKey || '';
    }

    getId(): string {
        return this.options.id || '';
    }

    /**
     * Get one item by id or filter
     * @param options
     */
    abstract findOne<T extends BaseRecord = BaseRecord>(
        options: FindOneParams | FindParams,
    ): Promise<(CmsItem<T> & TRest) | null>;

    /**
     * Transform item of one query into an CmsItem
     * @param item
     * @param locale
     */
    async transformResult<T extends BaseRecord = BaseRecord>(
        item: T | null,
        locale?: string,
    ): Promise<CmsItem<T> | null> {
        if (item) {
            return { ...item, cmsTypeId: this.getId() } as CmsItem<T>;
        } else {
            return null;
        }
    }

    abstract find<T extends BaseRecord = BaseRecord>(options: FindParams): Promise<FindResponse<T>>;

    /**
     * Transform find results into array of items
     * @param items
     * @param locale
     */
    async transformResults<T extends BaseRecord>(
        items: ReadonlyArray<T>,
        locale?: string,
    ): Promise<ReadonlyArray<CmsItem<T>>> {
        return items.map((item) => ({ ...item, cmsTypeId: this.getId() }));
    }

    /**
     * Default filter params for all CMS queries
     * @return {Record<string, unknown>}
     */
    abstract getFilterParams(): Record<string, unknown>;

    /**
     * Get url of the item
     * @param {ItemId} id
     * @param {string} locale
     * @param {string} defaultLocale
     * @return {Promise<string | null>}
     */
    async getPreviewUrl(id: ItemId, locale?: string, defaultLocale?: string): Promise<string | null> {
        const item = await this.findOne({ id, locale });
        if (locale !== defaultLocale) {
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
            const item = await this.findOne({ id });
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

    async getStaticPaths(locale: string, blocks?: Record<string, any>): Promise<GetStaticPathsResult['paths']> {
        return [];
    }

    async getPathsToRevalidate(
        item: {
            id: string;
            attributes?: Record<string, unknown>;
            relationships?: Record<string, unknown>;
            meta?: Record<string, unknown>;
        },
        providers: Record<string, any>,
        blocks: Record<string, any>,
        i18n: { locales: string[]; defaultLocale: string },
    ): Promise<string[]> {
        return [];
    }
}
