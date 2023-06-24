import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Gallery } from '../../components/primitives/Gallery/Gallery';
import { OmitRefType } from '@symbio/headless';
import { GalleryBlock_content$data } from './__generated__/GalleryBlock_content.graphql';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GalleryBlockStaticProps {}

export interface GalleryBlockContent extends OmitRefType<GalleryBlock_content$data> {
    __typename: 'ComponentBlockGalleryBlock';
}

export interface GalleryBlockProps extends GalleryBlockStaticProps {
    blocksData: GalleryBlockContent;
    app?: IApp;
    className?: string;
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

GalleryBlock.whyDidYouRender = true;

export default GalleryBlock;
