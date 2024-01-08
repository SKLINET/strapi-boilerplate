import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { AppData, BasePage } from '@symbio/cms';
import { BlocksPropsMap, BlocksPropsPromisesMap, BlockType } from '@symbio/headless';
import { Providers as ProvidersType } from '../../types/providers';
import { getNormalizedSlug } from '../../utils/getSlug';

function getBlockName(block: { __typename?: string } | null): string | undefined {
    return block?.__typename?.replace(/Record$/, 'Block').replace('BlockBlock', 'Block');
}

/**
 * Get static props for current page and it's blocks
 * @param {GetStaticPropsContext} context
 * @param providers
 * @param {Record<string, BlockType>} blocks
 * @param ssg
 * @returns {Promise<GetStaticPropsResult<{[p: string]: unknown}>>}
 */
export const getBlocksProps = async <Page extends BasePage, WebSettings, Providers, Locale>(
    context: GetStaticPropsContext,
    providers: Providers,
    blocks: Record<string, BlockType<Page, WebSettings, Providers, Locale>>,
    ssg: {
        staticGeneration: boolean;
        revalidate: boolean | number;
    },
): Promise<GetStaticPropsResult<{ [key: string]: unknown }>> => {
    const provider = (providers as ProvidersType).page;
    const locale = context.locale || context.defaultLocale;
    const props = await provider.getPageBySlug(
        locale,
        getNormalizedSlug(context?.params?.slug),
        context.preview,
        context?.previewData,
    );
    const slug = context.params?.slug;

    if (!props) {
        return {
            props: {
                locale,
                preview: !!context.preview,
            },
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
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            redirect: {
                destination: props.redirect.to,
                permanent: props.redirect.permanent,
            },
        };
    }

    const blocksPropsPromises = getBlocksPropsPromises<Page, WebSettings, Providers, Locale>(
        props.page as Page | null,
        locale as unknown as Locale,
        context,
        providers,
        blocks,
        props.webSetting as WebSettings,
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
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            ...((slug && slug.length === 1 && slug[0] === '404') || !!props.page ? {} : { notFound }),
        };
    } catch (e) {
        if ((e as { code: string }).code === 'ENOENT') {
            return {
                props: {
                    ...props,
                    locale,
                    blocksPropsMap: new Map(),
                    preview: !!context.preview,
                },
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                ...(slug && slug.length === 1 && slug[0] === '404' ? {} : { notFound: true }),
            };
        } else {
            throw e;
        }
    }
};

export function getBlocksPropsPromises<P extends BasePage, W, PR, L>(
    page: AppData<P, W>['page'],
    locale: L,
    context: GetStaticPropsContext,
    providers: PR,
    blocks: Record<string, BlockType<P, W, PR, L>>,
    webSetting: W,
): BlocksPropsPromisesMap {
    const blocksPropsPromises: BlocksPropsPromisesMap = {};
    if (page?.content && page.content.length > 0) {
        for (const block of page.content) {
            const blockName = getBlockName(block);
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
