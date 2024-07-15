import { ParsedUrlQuery } from 'querystring';
import { BlockType } from '../../types/base/block';
import { Providers } from '../../types/base/providers';

export default interface Provider {
    /**
     * Get API key of the model this provider is bound to
     */
    getApiKey: () => string;

    isSitemapEnabled: () => boolean;

    /**
     * Get ID of the model this provider is bound to
     */
    getId?: () => string;

    /**
     * Return static paths parameters
     */
    getStaticPaths?: (
        locale: string,
        blocks?: Record<string, BlockType>,
        providers?: Providers,
    ) => Promise<ParsedUrlQuery[]>;
}
