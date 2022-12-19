import { GetStaticPathsResult } from 'next';
import { AbstractProvider, AbstractSingletonProvider, findProvider } from '@symbio/cms';
import { Variables } from 'relay-runtime';

export type ItemId = string;

export type FindOneParams = {
    id: ItemId;
    locale?: string;
    preview?: boolean;
};

export type FindParams<T = Record<string, unknown>> = {
    locale?: string;
    preview?: boolean;
} & Omit<T, 'id'>;

export type OneOperationType = {
    readonly variables: Variables;
    readonly response: {
        item: BaseRecord;
    };
    readonly rawResponse?: unknown;
};

export type FindOperationType = {
    readonly variables: Variables;
    readonly response: {
        readonly meta: {
            readonly meta: {
                readonly pagination: {
                    readonly total: number;
                };
            };
        } | null;
    };
    readonly rawResponse?: unknown;
};

export type ItemStatus = 'draft' | 'updated' | 'published';

export type BaseRecord =
    | ({
          id?: string | undefined | null | unknown;
      } & Record<string, unknown | null>)
    | null;

export type SingletonBaseRecord = Record<string, unknown> | null;

export type CmsAttributes = {
    cmsTypeId: string;
    status?: ItemStatus;
};

export type CmsItem<T = BaseRecord> = T & CmsAttributes;

export type FindResponse<T, TRest = unknown> = {
    count: number;
    data: ReadonlyArray<CmsItem<T>>;
} & TRest;

export interface ProviderOptions {
    locales: string[];
    apiKey: string;
    id: string;
}

export interface Provider {
    getId?: () => string;
    getApiKey?: () => string;
    getStaticPaths: (locale: string, blocks?: Record<string, any>) => Promise<GetStaticPathsResult['paths']>;
    getPathsToRevalidate?: (
        item: {
            id: string;
            attributes?: Record<string, unknown>;
        },
        providers: Record<string, Provider>,
        blocks: Record<string, any>,
        i18n: { locales: string[]; defaultLocale: string },
    ) => Promise<string[]>;
}

export interface PageProvider<P extends BasePage, W> extends Provider {
    getPageBySlug: (
        locale: string | undefined,
        slug: string[],
        preview?: boolean,
    ) => Promise<AppData<P, W> | undefined>;
}

export type AppData<P extends BasePage, W> = {
    site: Site;
    page: P | null;
    redirect: Redirect;
    webSetting: W;
};

export interface Site {
    readonly globalSeo: {
        readonly siteName: string | null;
        readonly titleSuffix: string | null;
        readonly facebookPageUrl: string | null;
        readonly fallbackSeo: {
            readonly description: string | null;
            readonly title: string | null;
            readonly image: {
                readonly url: string;
            } | null;
            readonly twitterCard: string | null;
        } | null;
        readonly twitterAccount: string | null;
    } | null;
    readonly favicon: {
        readonly url: string;
    } | null;
    readonly faviconMetaTags: ReadonlyArray<{
        readonly tag: string;
        readonly attributes: unknown | null;
        readonly content: string | null;
    }>;
}

export type Redirect = {
    readonly id: string;
    readonly from: string | null;
    readonly to: string | null;
    readonly permanent: boolean | null;
} | null;

export interface BasePage<T extends { __typename: string; id?: string } = { __typename: string; id?: string }> {
    id: string | null;
    attributes: {
        url: string | null;
        title?: string | null;
        content?: ReadonlyArray<T | null> | null;
    } | null;
}

export type Route<ObjectType> = {
    readonly id?: string;
    readonly label?: string | null;
    readonly title: string | null;
    readonly object?: ObjectType;
    readonly file?: {
        readonly url: string;
    } | null;
    readonly url?: string | null;
    readonly isTargetBlank?: boolean | null;
    readonly parameters?: string | null;
};

export { AbstractProvider, AbstractSingletonProvider, findProvider };
