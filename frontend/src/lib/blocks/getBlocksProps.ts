import { Providers } from '../../types/base/providers';
import { getNormalizedSlug } from '../../utils/base/getSlug';
import { BlocksPropsMap, BlocksPropsPromisesMap, BlockType } from '../../types/base/block';
import { IContext, IPageResponse } from '../../types/base/page';
import { appQuery$data } from '../../relay/__generated__/appQuery.graphql';

export function getBlockName(block: { __typename?: string } | null): string | undefined {
    return block?.__typename?.replace(/Record$/, 'Block').replace('BlockBlock', 'Block');
}

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

    const notFound = (!props?.page && !props?.redirect) || undefined;

    if (props.redirect && props.redirect.to && typeof props.redirect.permanent === 'boolean') {
        return {
            props: {
                ...props,
                locale,
                preview: !!context.preview,
            } as IPageResponse,
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            redirect: {
                destination: props.redirect.to,
                permanent: props.redirect.permanent,
            },
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
                } as IPageResponse,
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                ...(slug && slug.length === 1 && slug[0] === '404' ? {} : { notFound: true }),
            };
        } else {
            throw e;
        }
    }
};

export function getBlocksPropsPromises(
    page: appQuery$data['page'],
    locale: string,
    context: IContext,
    providers: Providers,
    blocks: Record<string, BlockType>,
    webSetting: appQuery$data['webSetting'],
): BlocksPropsPromisesMap {
    const blocksPropsPromises: BlocksPropsPromisesMap = {};
    if (page?.content && page.content.length > 0) {
        for (const block of page.content) {
            const blockName = getBlockName(block as any);
            if (blockName && Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                const blk = blocks[blockName];
                if (blk.getStaticProps && block && block.__typename !== '%other' && block.id) {
                    blocksPropsPromises[block.id] = blk.getStaticProps({
                        context,
                        locale,
                        page,
                        block,
                        providers,
                        blocks,
                        settings: webSetting,
                    });
                }
            }
        }
    }

    return blocksPropsPromises;
}
