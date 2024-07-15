import config from '../../../../sklinet.config.json';
import { ContextProps } from '../../../types/base/page';
import { getLocale } from '../getLocal';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { CALENDAR_FORMATS } from '../../../constants';
import blocks from '../../../app/blocks';
import { getBlocksProps } from '../../../lib/blocks/getBlocksProps';
import providers from '../../../providers';
import { GetStaticPropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IPageResponse } from '../../../types/base/page';
import { getNormalizedSlug } from '../getSlug';

type IContext = GetStaticPropsContext<ParsedUrlQuery, PreviewData> & {
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function getStaticProps({ params: { slug }, searchParams }: ContextProps): Promise<IPageResponse> {
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
        searchParams: searchParams,
        preview: false,
        draftMode: false,
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
        renamedBlocks[`ComponentBlock${key}`] = blocks[key];
    }

    try {
        const res = (await getBlocksProps(context, providers, renamedBlocks, config.ssg)) as any;

        if (!res.props.page || res.notFound) {
            throw new Error('Page not found!');
        }

        if (res.props.blocksPropsMap) {
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
                preview: false,
                draftMode: false,
            },
            providers,
            renamedBlocks,
            config.ssg,
        )) as any;

        return notFoundPage.props;
    }
}
