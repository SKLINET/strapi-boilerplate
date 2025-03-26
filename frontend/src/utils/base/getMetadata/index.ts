import config from '../../../../sklinet.config.json';
import { ContextProps, IContext } from '../../../types/base/page';
import { getLocale } from '../getLocal';
import blocks from '../../../app/blocks/server';
import { getMetadataProps } from '../../../lib/blocks/getMetadataProps';
import providers from '../../../providers';
import { IMetadataResponse } from '../../../types/base/page';
import { getNormalizedSlug } from '../getSlug';
import { draftMode } from 'next/headers';

export const getMetadata = async ({ params: { slug }, searchParams }: ContextProps): Promise<IMetadataResponse> => {
    const { isEnabled } = await draftMode();
    const {
        i18n: { defaultLocale, locales },
    } = config;

    const locale = getLocale(slug);

    const context: IContext = {
        locale,
        locales,
        defaultLocale,
        params: { slug: getNormalizedSlug(slug) },
        searchParams: searchParams,
        preview: isEnabled,
        draftMode: isEnabled,
    };

    const renamedBlocks: Record<string, any> = {};

    for (const key in blocks) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renamedBlocks[`ComponentBlock${key}`] = blocks[key];
    }

    try {
        const res = await getMetadataProps(context, providers, renamedBlocks, config.ssg);

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
        const notFoundPage = (await getMetadataProps(
            {
                locale,
                locales,
                defaultLocale,
                params: { slug: ['404'] },
                preview: isEnabled,
                draftMode: isEnabled,
                searchParams,
            },
            providers,
            renamedBlocks,
            config.ssg,
        )) as any;

        return notFoundPage.props;
    }
};
