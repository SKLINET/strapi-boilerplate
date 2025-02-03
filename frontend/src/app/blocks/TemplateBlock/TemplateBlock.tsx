import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { StaticBlockContext } from '../../../types/base/block';
import { BlocksPropsMap, OmitRefType } from '@symbio/headless';
import { TemplateBlock_content$data } from './__generated__/TemplateBlock_content.graphql';
import { Template } from '../../components/blocks/Template/Template';
import { IApp } from '../../../types/base/app';
import { getNestedBlocksProps } from '../../../lib/blocks/getNestedBlocksProps';

export interface TemplateBlockStaticProps {
    data: BlocksPropsMap;
}

export interface TemplateBlockContent extends OmitRefType<TemplateBlock_content$data> {
    __typename: 'ComponentBlockTemplateBlock';
}

export interface TemplateBlockProps extends TemplateBlockStaticProps {
    blocksData: Omit<TemplateBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment TemplateBlock_content on ComponentBlockTemplateBlock {
        id
        template {
            content {
                __typename
                ...ArticlesListBlock_content @relay(mask: false)
                ...ContactFormBlock_content @relay(mask: false)
                ...VideoBlock_content @relay(mask: false)
            }
        }
    }
`;

const TemplateBlock = (props: TemplateBlockProps): ReactElement => <Template {...props} />;

if (typeof window === 'undefined') {
    TemplateBlock.getStaticProps = async ({
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
    };
}

export default TemplateBlock;
