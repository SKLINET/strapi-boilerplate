import config from '../../../../sklinet.config.json';
import { ContextProps, IContext, NotFoundReason } from '../../../types/base/page';
import { getLocale } from '../getLocal';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { CALENDAR_FORMATS } from '../../../constants';
import blocks from '../../../app/blocks/server';
import { getBlocksProps } from '../../../lib/blocks/getBlocksProps';
import providers from '../../../providers';
import { IPageResponse } from '../../../types/base/page';
import { getNormalizedSlug } from '../getSlug';
import { draftMode } from 'next/headers';
import { isSystemPageSlug } from '../../cache/page';

type BlocksPropsResult = Awaited<ReturnType<typeof getBlocksProps>>;

/**
 * @description Classify a resolved block result as one of the three cases that become a soft 404.
 * Anything this does not cover — a rejected `getBlocksProps` — is a genuine failure and is left to
 * propagate, so Next answers 500 instead of telling search engines the page is gone.
 * @param {BlocksPropsResult} res - Result of `getBlocksProps`
 * @param {boolean} isSystemPage - Whether the request asked for the CMS error page by its own URL
 * @returns {NotFoundReason | null} The reason, or null when the page is usable
 **/
const getNotFoundReason = (res: BlocksPropsResult, isSystemPage: boolean): NotFoundReason | null => {
    if (res.redirect) {
        return null;
    }

    // A request for `/404` or `/500` resolves to exactly the CMS record it asked for, so it is not a
    // failed lookup. Flagging it would put the whole entry on the short `minutes` profile — and
    // because `not-found.tsx` resolves that scope during the catch-all prerender, the route takes
    // the minimum of every profile it sees, so every page would inherit a one-minute lifetime.
    if (isSystemPage) {
        return null;
    }

    if (!res.props.page) {
        return 'missing-page';
    }

    // `getBlocksProps` converts a detail block's `ENOENT` into this flag.
    if (res.notFound) {
        return 'missing-item';
    }

    if (res.props.blocksPropsMap) {
        const values = Object.values(res.props.blocksPropsMap);
        if (values.some((block: any) => block.item === undefined && block.data === undefined)) {
            return 'empty-block';
        }
    }

    return null;
};

/**
 * @description Get static props for a page by slug (search params are ignored).
 *
 * Draft mode is read here so GraphQL gets DRAFT vs PUBLISHED. The page and layout still must not
 * call `draftMode()` themselves: a dynamic read in the component that renders the block tree would
 * postpone at the root of an element that already has postponed <Suspense> slots below it.
 *
 * Cache bypass is separate — `cachedStaticProps` reads `draftMode()` *outside* `'use cache'` and
 * skips that scope when preview is on, so this function then runs uncached (preview) or inside the
 * cached impl (published).
 *
 * The returned `isNotFound` is the noindex signal for unknown URLs. `page.tsx` does not call
 * `notFound()` — under the catch-all that is too late for headers, since the response has already
 * started streaming — so those URLs stay HTTP 200 with `robots: noindex`.
 * @param {ContextProps} context - Context props
 * @returns {Promise<IPageResponse>} Page response, with `isNotFound` set when the CMS 404 page was substituted
 **/
export const getStaticProps = async ({ params: { slug } }: ContextProps): Promise<IPageResponse> => {
    const { isEnabled: preview } = await draftMode();
    const {
        tz,
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

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    const renamedBlocks: Record<string, any> = {};

    for (const key in blocks) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renamedBlocks[`ComponentBlock${key}`] = blocks[key];
    }

    const res = await getBlocksProps(context, providers, renamedBlocks, config.ssg);
    const notFoundReason = getNotFoundReason(res, isSystemPage);

    if (!notFoundReason) {
        return { ...res.props, isNotFound: false };
    }

    const notFoundPage = (await getBlocksProps(
        {
            ...context,
            params: { slug: ['404'] },
        },
        providers,
        renamedBlocks,
        config.ssg,
    )) as any;

    return { ...notFoundPage.props, isNotFound: true, notFoundReason };
};
