import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Video } from '../../components/organisms/Video/Video';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment YoutubeVimeoBlock_content on ComponentBlockYoutubeVimeoBlock {
        url
        provider
        providerUid
        width
        height
        title
        thumbnailUrl
    }
`;

function YoutubeVimeoBlock({ blocksData, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper {...rest}>
            <Video video={{ ...blocksData }} />
        </BlockWrapper>
    );
}

YoutubeVimeoBlock.whyDidYouRender = true;

export default YoutubeVimeoBlock;
