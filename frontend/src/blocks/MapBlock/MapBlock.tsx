import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { GoogleMap } from '../../components/primitives/GoogleMap/GoogleMap';
import { OmitRefType } from '@symbio/headless';
import { MapBlock_content$data } from './__generated__/MapBlock_content.graphql';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MapBlockStaticProps {}

export interface MapBlockContent extends OmitRefType<MapBlock_content$data> {
    __typename: 'ComponentBlockMapBlock';
}

export interface MapBlockProps extends MapBlockStaticProps {
    blocksData: MapBlockContent;
    app?: IApp;
    className?: string;
}

graphql`
    fragment MapBlock_content on ComponentBlockMapBlock {
        bubbleText
        gps {
            ...appGpsFragment @relay(mask: false)
        }
    }
`;

const MapBlock = ({ blocksData: { bubbleText, gps }, app }: MapBlockProps): ReactElement => {
    if (!gps || !gps.latitude || !gps.longitude) {
        return <></>;
    }

    const { latitude, longitude } = gps;

    return (
        <BlockWrapper>
            <GoogleMap
                isMarkerShown
                latitude={Number(latitude)}
                longitude={Number(longitude)}
                bubbleText={bubbleText}
            />
        </BlockWrapper>
    );
};

MapBlock.whyDidYouRender = true;

export default MapBlock;
