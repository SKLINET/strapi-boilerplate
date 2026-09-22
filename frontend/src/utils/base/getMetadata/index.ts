import config from '../../../../sklinet.config.json';
import { ContextProps, IContext } from '../../../types/base/page';
import { getLocale } from '../getLocal';
import blocks from '../../../app/blocks/server';
import { getMetadataProps } from '../../../lib/blocks/getMetadataProps';
import providers from '../../../providers';
import { IMetadataResponse } from '../../../types/base/page';
import { getNormalizedSlug } from '../getSlug';
import { draftMode } from 'next/headers';
import { unstable_rethrow } from 'next/navigation';
import { isSystemPageSlug } from '../../cache/page';

/**
 * @description Get metadata for a page by slug (search params are ignored). Draft mode is read here
 * for the same reason as in `getStaticProps` — see the note there.
 * @param {ContextProps} context - Context props
 * @returns {Promise<IMetadataResponse>} Metadata response, with `isNotFound` mirroring `getStaticProps`
 **/
export const getMetadata = async ({ params: { slug } }: ContextProps): Promise<IMetadataResponse> => {
    const { isEnabled: preview } = await draftMode();
    const {
        i18n: { defaultLocale, locales },
    } = config;

    const locale = getLocale(slug);
    // Read before `getNormalizedSlug`, which splices the locale off the very array it was given.
    const isSystemPage = isSystemPageSlug(slug || []);

    const context: IContext = {
        locale,
        locales,
        defaultLocale,
        params: { slug: getNormalizedSlug(slug) },
        preview,
        draftMode: preview,
    };

    const renamedBlocks: Record<string, any> = {};

    for (const key in blocks) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renamedBlocks[`ComponentBlock${key}`] = blocks[key];
    }

    try {
        const res = await getMetadataProps(context, providers, renamedBlocks, config.ssg);

        if (res.redirect) {
            return { ...res.props, isNotFound: false };
        }

        // Mirrors `getStaticProps`, so the rendered page and the `robots` header cannot disagree —
        // including the exemption for `/404` and `/500`, which resolve to the record they asked for.
        const notFoundReason = isSystemPage
            ? null
            : !res.props.page
              ? 'missing-page'
              : res.notFound
                ? 'missing-item'
                : null;

        if (!notFoundReason) {
            return { ...res.props, isNotFound: false };
        }

        // The page itself renders the CMS 404 record, so its metadata has to come from there too —
        // otherwise the tab title would be empty on every unknown URL. The `isNotFound` flag rides
        // along regardless, and that is what `generateMetadata` turns into `robots: noindex`.
        const notFoundPage = (await getMetadataProps(
            { ...context, params: { slug: ['404'] } },
            providers,
            renamedBlocks,
            config.ssg,
        )) as any;

        return { ...notFoundPage.props, isNotFound: true, notFoundReason };
    } catch (err) {
        // React signals a finished or aborted prerender by throwing; swallowing that here would hand
        // Next.js empty metadata instead of surfacing the real failure.
        unstable_rethrow(err);

        // A failed load is not a not-found. Marking it as one would noindex pages that merely hit a
        // transient CMS error, so the flag stays false and the page keeps its own status.
        return {
            locale,
            preview,
            blocksPropsMap: {},
            isNotFound: false,
        } as IMetadataResponse;
    }
};
