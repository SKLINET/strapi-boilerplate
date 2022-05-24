import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Gallery } from '../../components/primitives/Gallery/Gallery';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment GalleryBlock_content on ComponentBlockGalleryBlock {
        assets {
            data {
                attributes {
                    url
                    width
                    height
                    alternativeText
                }
            }
        }
    }
`;

function GalleryBlock({ blocksData }: BaseBlockProps): ReactElement | null {
    return (
        <BlockWrapper>
            <Gallery images={blocksData?.assets?.data} />
        </BlockWrapper>
    );
}

GalleryBlock.whyDidYouRender = true;

export default GalleryBlock;
