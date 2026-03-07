import Provider from './Provider';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { createRelayEnvironment, EnvironmentOptions } from '../../relay/createRelayEnvironment';
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

    protected getEnvironment(options: EnvironmentOptions): Environment {
        return createRelayEnvironment({}, options);
    }

    public isLocalizable(): boolean {
        return true;
    }

    abstract getApiKey(): string;

    public isSitemapEnabled(): boolean {
        return false;
    }

    /**
     * @description Get one item by id
     * @param {string} locale - Locale to get the item for
     * @param {EnvironmentOptions} options - Cache options
     * @returns {Promise<TItem | null>} The item
     **/
    async get(locale?: string, options: EnvironmentOptions = {}): Promise<TItem | null> {
        const result = await fetchQuery<TOperation>(
            this.getEnvironment(options),
            this.node,
            this.isLocalizable()
                ? {
                      locale: locale,
                      status: getPublicationState(options.preview),
                  }
                : {},
        ).toPromise();

        return await this.transformResult(result);
    }

    async transformResult(result: TOperation['response']): Promise<TItem> {
        return (result as { item: TItem }).item;
    }
}
