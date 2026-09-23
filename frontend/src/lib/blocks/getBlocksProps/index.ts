import { Providers } from '../../../types/base/providers';
import { getNormalizedSlug } from '../../../utils/base/getSlug';
import { BlocksPropsMap, BlockType } from '../../../types/base/block';
import { IContext, IPageResponse } from '../../../types/base/page';
import { getBlocksPropsPromises } from '../getBlocksPropsPromises';

export const getBlocksProps = async (
    context: IContext,
    providers: Providers,
    blocks: Record<string, BlockType>,
    ssg: {
        staticGeneration: boolean;
        revalidate: boolean | number;
    },
): Promise<{
    props: IPageResponse;
    revalidate?: boolean | number;
    notFound?: boolean;
    redirect?: {
        destination: string;
        permanent: boolean;
    };
}> => {
    const provider = providers.page;
    const locale = context.locale || context.defaultLocale || '';
    const props = await provider.getPageBySlug(locale, getNormalizedSlug(context?.params?.slug), context.preview);
    const slug = context.params?.slug;

    if (!props) {
        return {
            props: {
                locale,
                preview: !!context.preview,
            } as IPageResponse,
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            notFound: true,
        };
    }

    const blocksPropsPromises = getBlocksPropsPromises(
        props.page,
        locale,
        context,
        providers,
        blocks,
        props.webSetting,
    );

    try {
        const values = await Promise.all(Object.entries(blocksPropsPromises).flat());
        const blocksPropsMap: BlocksPropsMap = {};
        for (let i = 0; i < values.length; i += 2) {
            blocksPropsMap[values[i] as string] = values[i + 1];
        }

        return {
            props: {
                ...props,
                locale,
                blocksPropsMap,
                preview: !!context.preview,
            } as IPageResponse,
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            ...((slug && slug.length === 1 && slug[0] === '404') || !!props.page ? {} : { notFound: false }),
        };
    } catch (e) {
        if ((e as { code: string }).code === 'ENOENT') {
            return {
                props: {
                    ...props,
                    locale,
                    blocksPropsMap: {},
                    preview: !!context.preview,
                } as IPageResponse,
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                ...(slug && slug.length === 1 && slug[0] === '404' ? {} : { notFound: true }),
            };
        } else {
            throw e;
        }
    }
};
