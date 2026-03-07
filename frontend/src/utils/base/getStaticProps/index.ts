import config from '../../../../sklinet.config.json';
import { ContextProps, IContext } from '../../../types/base/page';
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

/**
 * @description Get static props for a page by slug (search params are ignored)
 * @param {ContextProps} context - Context props
 * @returns {Promise<IPageResponse>} Page response
 **/
export const getStaticProps = async ({ params: { slug } }: ContextProps): Promise<IPageResponse> => {
    const { isEnabled } = await draftMode();
    const {
        tz,
        i18n: { defaultLocale, locales },
    } = config;

    const locale = getLocale(slug);

    const context: IContext = {
        locale,
        locales,
        defaultLocale,
        params: { slug: getNormalizedSlug(slug) },
        preview: isEnabled,
        draftMode: isEnabled,
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

    try {
        const res = await getBlocksProps(context, providers, renamedBlocks, config.ssg);

        if (!res?.redirect && (!res.props.page || res.notFound)) {
            throw new Error('Page not found!');
        }

        if (res?.props?.blocksPropsMap) {
            const blocks = Object.values(res.props.blocksPropsMap);
            if (blocks.some((block: any) => block.item === undefined && block.data === undefined)) {
                throw new Error('Error in block!');
            }
        }

        return res.props;
    } catch (err) {
        const notFoundPage = (await getBlocksProps(
            {
                locale,
                locales,
                defaultLocale,
                params: { slug: ['404'] },
                preview: isEnabled,
                draftMode: isEnabled,
            },
            providers,
            renamedBlocks,
            config.ssg,
        )) as any;

        return notFoundPage.props;
    }
};
