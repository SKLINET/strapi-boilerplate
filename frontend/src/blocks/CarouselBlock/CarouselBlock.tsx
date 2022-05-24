import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Carousel } from '../../components/organisms/Carousel/Carousel';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment CarouselBlock_content on ComponentBlockCarouselBlock {
        textAlign
        autoplay
        interval
        banners {
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
            video {
                data {
                    attributes {
                        url
                        width
                        height
                        alternativeText
                    }
                }
            }
            headline
            description
            textAlign
        }
    }
`;

function CarouselBlock({ blocksData, ...rest }: BaseBlockProps): ReactElement | null {
    if (blocksData?.banners.length < 1) {
        return null;
    }

    return (
        <BlockWrapper className="w-full !p-0 max-h-16-9" {...rest}>
            <Carousel {...blocksData} />
        </BlockWrapper>
    );
}

CarouselBlock.whyDidYouRender = true;

export default CarouselBlock;
