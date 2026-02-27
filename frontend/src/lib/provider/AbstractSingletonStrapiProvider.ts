import Provider from './Provider';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { createRelayEnvironment } from '../../relay/createRelayEnvironment';
import { OperationType } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { fetchQuery } from 'relay-runtime';
import getPublicationState from '../../utils/base/getPublicationState';

export type SingletonStrapiRecord = {
    [key: string]: unknown;
} | null;

export default abstract class AbstractSingletonStrapiProvider<
    TOperation extends OperationType,
    TItem extends SingletonStrapiRecord = SingletonStrapiRecord,
> implements Provider {
    protected environment: Record<string, Environment> = {
        preview: createRelayEnvironment({}),
        production: createRelayEnvironment({}),
    };

    protected node: GraphQLTaggedNode;

    public constructor(node: GraphQLTaggedNode) {
        this.node = node;
    }

    protected getEnvironment(preview = false, withoutCache = false, tags?: string[]): Environment {
        if (preview) {
            return createRelayEnvironment({}, '', true, withoutCache, tags);
        } else {
            return createRelayEnvironment({}, '', false, withoutCache, tags);
        }
    }

    public isLocalizable(): boolean {
        return true;
    }

    abstract getApiKey(): string;

    public isSitemapEnabled(): boolean {
        return false;
    }

    /**
     * Get one item by id
     * @param locale
     * @param preview
     * @param withoutCache
     */
    async get(locale?: string, preview = false, withoutCache = false, tags?: string[]): Promise<TItem | null> {
        const result = await fetchQuery<TOperation>(
            this.getEnvironment(preview, withoutCache, tags),
            this.node,
            this.isLocalizable()
                ? {
                      locale: locale,
                      status: getPublicationState(preview),
                  }
                : {},
        ).toPromise();

        return await this.transformResult(result);
    }

    async transformResult(result: TOperation['response']): Promise<TItem> {
        return (result as { item: TItem }).item;
    }
}
