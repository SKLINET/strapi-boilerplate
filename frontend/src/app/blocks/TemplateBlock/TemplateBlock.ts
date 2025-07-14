import { graphql } from 'relay-runtime';
import { BlockType, StaticBlockContext } from '../../../types/base/block';
import { getNestedBlocksProps } from '../../../lib/blocks/getNestedBlocksProps';

graphql`
    fragment TemplateBlock_content on ComponentBlockTemplateBlock {
        id
        template {
            documentId
            content {
                __typename
                ...ArticlesListBlock_content @relay(mask: false)
                ...FormBlock_content @relay(mask: false)
                ...VideoBlock_content @relay(mask: false)
            }
        }
    }
`;

const TemplateBlock = {
    getStaticProps: async ({
        locale,
        providers,
        context,
        block,
        blocks,
        page,
        settings,
        slug,
        item,
    }: StaticBlockContext): Promise<any> => {
        if (block?.__typename !== 'ComponentBlockTemplateBlock') {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        // Get nested blocks props
        const blocksProps = await getNestedBlocksProps(
            context,
            blocks,
            page,
            block?.template?.content,
            locale,
            slug,
            providers,
            item,
            settings,
        );

        return { data: blocksProps?.blocksPropsMap };
    },
} as BlockType;

export default TemplateBlock;
