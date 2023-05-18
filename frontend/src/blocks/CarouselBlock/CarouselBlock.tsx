import React, { ReactElement } from 'react';
import config from '../../../sklinet.config.json';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Carousel } from '../../components/organisms/Carousel/Carousel';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { CarouselBlock_content$data } from './__generated__/CarouselBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselBlockStaticProps {}

export interface CarouselBlockContent extends OmitRefType<CarouselBlock_content$data> {
    __typename: 'ComponentBlockCarouselBlock';
}

export interface CarouselBlockProps extends CarouselBlockStaticProps {
    blocksData: CarouselBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

graphql`
    fragment CarouselBlock_content on ComponentBlockCarouselBlock {
        id
        textAlign
        autoplay
        interval
        banners {
            id
            image {
                ...appImageFragment @relay(mask: false)
            }
            video {
                ...appVideoFragment @relay(mask: false)
            }
            headline
            description
            textAlign
        }
    }
`;

const CarouselBlock = ({ blocksData, app }: CarouselBlockProps): ReactElement => {
    if (!blocksData.banners || blocksData.banners.length === 0) {
        return <></>;
    }

    return (
        <BlockWrapper className="w-full !p-0 max-h-16-9">
            <Carousel {...blocksData} />
        </BlockWrapper>
    );
};

CarouselBlock.whyDidYouRender = config.whyDidYouRender.active;

export default CarouselBlock;
