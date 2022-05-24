import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Image } from '../../components/primitives/Image/Image';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment ImageBlock_content on ComponentBlockImageBlock {
        image {
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

function ImageBlock({ blocksData }: BaseBlockProps): ReactElement | null {
    if (blocksData?.image) {
        return (
            <BlockWrapper>
                <div className="flex flex-col justify-center items-center">
                    <Image image={blocksData?.image} />
                </div>
            </BlockWrapper>
        );
    }

    return null;
}

ImageBlock.whyDidYouRender = true;

export default ImageBlock;
