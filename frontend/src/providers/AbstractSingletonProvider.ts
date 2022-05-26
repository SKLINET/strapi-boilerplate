import { Provider, ProviderOptions, CmsItem, SingletonBaseRecord } from '../';

export default abstract class AbstractSingletonProvider implements Provider {
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

    async getStaticPaths(locale: string, blocks?: Record<string, any>) {
        return [];
    }

    async getPageBySlug(locale: string | undefined, slug: string[], preview?: boolean) {
        return {};
    }

    /**
     * Get one item by id or filter
     * @param options
     */
    abstract get<T extends SingletonBaseRecord = SingletonBaseRecord>(options?: {
        locale?: string;
        preview?: boolean;
    }): Promise<CmsItem<T> | null>;

    /**
     * Transform item of one query into an item
     * @param item
     * @param locale
     */
    async transformResult<T = SingletonBaseRecord>(item: T | null, locale?: string): Promise<CmsItem<T> | null> {
        if (item) {
            return { ...item, cmsTypeId: this.getId() } as CmsItem<T>;
        } else {
            return null;
        }
    }

    /**
     * Get url of the item
     * @param {string} locale
     * @param {string} defaultLocale
     * @return {Promise<string | null>}
     */
    async getPreviewUrl(locale?: string, defaultLocale?: string): Promise<string | null> {
        const item = await this.get({ locale });
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
            const item = await this.get();
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
