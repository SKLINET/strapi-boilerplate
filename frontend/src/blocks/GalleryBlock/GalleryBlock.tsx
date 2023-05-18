import React, { ReactElement } from 'react';
import config from '../../../sklinet.config.json';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Gallery } from '../../components/primitives/Gallery/Gallery';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { GalleryBlock_content$data } from './__generated__/GalleryBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GalleryBlockStaticProps {}

export interface GalleryBlockContent extends OmitRefType<GalleryBlock_content$data> {
    __typename: 'ComponentBlockGalleryBlock';
}

export interface GalleryBlockProps extends GalleryBlockStaticProps {
    blocksData: GalleryBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

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

const GalleryBlock = ({ blocksData, app }: GalleryBlockProps): ReactElement => {
    return (
        <BlockWrapper>
            <Gallery data={blocksData.assets} />
        </BlockWrapper>
    );
};

GalleryBlock.whyDidYouRender = config.whyDidYouRender.active;

export default GalleryBlock;
