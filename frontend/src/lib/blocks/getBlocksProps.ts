import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { Logger } from '../../services';
import config from '../../../sklinet.config.json';
import { fetchQuery } from 'relay-runtime';
import { AppQuery } from '../../relay/app';
import { APIPageProps } from '../../types/page';
import { getBlockType } from '../../utils/getBlockType/getBlockType';
import { getPagePattern } from '../routing/getPagePattern';
import { BlockType } from '../../types/block';
import getPublicationState from '../../utils/getPublicationState';
import { createRelayEnvironment } from '../../utils/createRelayEnvironment';

/**
 * Get static props for current page and it's blocks
 * @param {GetStaticPropsContext} context
 * @param {Record<string, BlockType>} blocks
 * @returns {Promise<GetStaticPropsResult<{[p: string]: unknown}>>}
 */
export const getBlocksProps = async (
    context: GetStaticPropsContext,
    blocks: Record<string, BlockType>,
): Promise<GetStaticPropsResult<{ [key: string]: unknown }>> => {
    const p = context.params;
    const pattern = getPagePattern(p?.slug || '');
    const locale = context.locale || context.defaultLocale;
    const environment = createRelayEnvironment({});
    const urlPart = (p && Array.isArray(p.slug) ? p.slug : []).join('/');
    const urlPrefix = context.defaultLocale ? '/' : '/' + context.locale + '/';

    const props = (await fetchQuery(environment, AppQuery, {
        locale,
        pattern: pattern,
        redirect: urlPrefix + urlPart,
        publicationState: getPublicationState(),
    }).toPromise()) as APIPageProps;
    console.log(props);

    const notFound = !props.findPage || undefined;

    // REDIRECT
    if (props.findRedirect && props.findRedirect.redirectTo) {
        Logger.info('Matched redirect ' + props.findRedirect.redirectFrom + ' -> ' + props.findRedirect.redirectTo);
        return {
            props: {
                ...props,
                page: props.findPage,
                blocksProps: [],
                locale,
            },
            revalidate: config.ssg.staticGeneration ? false : config.ssg.revalidate,
            redirect: {
                destination: props.findRedirect.redirectTo,
                permanent: props.findRedirect.statusCode === 301,
            },
        };
    }

    const urlParts = props.findPage?.url?.split('/') || [];
    let slug = '';
    for (let i = 0; i < urlParts.length; i++) {
        if (urlParts[i] === ':slug' && p?.slug && p.slug[i]) {
            slug = p.slug[i];
            break;
        }
    }
    const blocksPropsPromises: any = [];
    if (props.findPage) {
        props.findPage?.blocks?.map((block) => {
            const blockType = getBlockType(block?.__typename);
            if (blockType && Object.prototype.hasOwnProperty.call(blocks, blockType)) {
                const blk = blocks[blockType];
                if (blk && blk.getStaticProps) {
                    blocksPropsPromises.push(
                        blk.getStaticProps({ ...context, locale, page: props.findPage, block, slug }),
                    );
                } else {
                    blocksPropsPromises.push(Promise.resolve({}));
                }
            } else {
                blocksPropsPromises.push(Promise.resolve({}));
            }
        });
    }

    try {
        const blocksProps = await Promise.all(blocksPropsPromises);
        notFound && Logger.warn('Forwarding to 404');
        return {
            props: {
                ...props,
                page: props.findPage,
                blocksProps,
            },
            revalidate: config.ssg.staticGeneration ? false : config.ssg.revalidate,
            notFound,
        };
    } catch (e) {
        if ((e as Record<string, string>).code === 'ENOENT') {
            Logger.warn('Forwarding to 404');
            return {
                props: {
                    ...props,
                    page: props.findPage,
                    locale,
                    blocksProps: [],
                },
                revalidate: config.ssg.staticGeneration ? false : config.ssg.revalidate,
                notFound: true,
            };
        } else {
            throw e;
        }
    }
};
