import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { GoogleMap } from '../../components/primitives/GoogleMap/GoogleMap';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { MapBlock_content } from './__generated__/MapBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MapBlockStaticProps {}

export interface MapBlockContent extends OmitRefType<MapBlock_content> {
    __typename: 'ComponentBlockMapBlock';
}

export interface MapBlockProps extends MapBlockStaticProps {
    blocksData: MapBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
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
