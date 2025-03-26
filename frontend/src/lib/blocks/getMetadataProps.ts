import { Providers } from '../../types/base/providers';
import { getNormalizedSlug } from '../../utils/base/getSlug';
import { BlocksPropsMap, BlockType } from '../../types/base/block';
import { IContext, IMetadataResponse } from '../../types/base/page';
import { appDataQuery$data } from '../../relay/__generated__/appDataQuery.graphql';
import { appPageQuery$data } from '../../relay/__generated__/appPageQuery.graphql';
import { getBlocksPropsPromises } from './getBlocksPropsPromises';

export const getMetadataProps = async (
    context: IContext,
    providers: Providers,
    blocks: Record<string, BlockType>,
    ssg: {
        staticGeneration: boolean;
        revalidate: boolean | number;
    },
): Promise<{
    props: IMetadataResponse;
    revalidate?: boolean | number;
    notFound?: boolean;
    redirect?: {
        destination: string;
        permanent: boolean;
    };
}> => {
    const provider = providers.page;
    const locale = context.locale || context.defaultLocale || '';
    const props = await provider.getPageMetadata(locale, getNormalizedSlug(context?.params?.slug), context.preview);
    const slug = context.params?.slug;

    if (!props) {
        return {
            props: {
                locale,
                preview: !!context.preview,
            } as IMetadataResponse,
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            notFound: true,
        };
    }

    const notFound = (!props?.page && !props?.redirect) || undefined;

    if (props.redirect && props.redirect.to && typeof props.redirect.permanent === 'boolean') {
        return {
            props: {
                ...props,
                locale,
                preview: !!context.preview,
                blocksPropsMap: {},
            } as IMetadataResponse,
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            redirect: {
                destination: props.redirect.to,
                permanent: props.redirect.permanent,
            },
        };
    }

    const blocksPropsPromises = getBlocksPropsPromises(
        props.page as appPageQuery$data['page'],
        locale,
        context,
        providers,
        blocks,
        props.webSetting as appDataQuery$data['webSetting'],
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
            } as IMetadataResponse,
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            ...((slug && slug.length === 1 && slug[0] === '404') || !!props.page ? {} : { notFound }),
        };
    } catch (e) {
        if ((e as { code: string }).code === 'ENOENT') {
            return {
                props: {
                    ...props,
                    locale,
                    blocksPropsMap: {},
                    preview: !!context.preview,
                } as IMetadataResponse,
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                ...(slug && slug.length === 1 && slug[0] === '404' ? {} : { notFound: true }),
            };
        } else {
            throw e;
        }
    }
};
