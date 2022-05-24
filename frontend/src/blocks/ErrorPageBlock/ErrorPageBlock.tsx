import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Error404 } from '../../components/blocks/Error404/Error404';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment ErrorPageBlock_content on ComponentBlockErrorPageBlock {
        description
        headline
    }
`;

function ErrorPageBlock({ blocksData, ...rest }: BaseBlockProps): ReactElement {
    return (
        <BlockWrapper {...rest}>
            <Error404 headline={blocksData?.headline} description={blocksData?.description} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths
    /*
    Error404Block.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext): Promise<StaticProps> => {
        const provider = providers.x;

        return {};
    };
    */
}

ErrorPageBlock.whyDidYouRender = true;

export default ErrorPageBlock;
