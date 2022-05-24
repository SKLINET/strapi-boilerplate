import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { GoogleMap } from '../../components/primitives/GoogleMap/GoogleMap';
import { BaseBlockProps } from '../../types/block';

graphql`
    fragment MapBlock_content on ComponentBlockMapBlock {
        bubbleText
        gps {
            latitude
            longitude
        }
    }
`;

function MapBlock({ blocksData }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    if (!blocksData?.gps || !blocksData?.gps.latitude || !blocksData?.gps.longitude) {
        return <></>;
    }
    return (
        <BlockWrapper>
            <GoogleMap
                isMarkerShown
                latitude={blocksData.gps ? blocksData?.gps.latitude : 0}
                longitude={blocksData.gps ? blocksData?.gps.longitude : 0}
                bubbleText={blocksData.bubbleText}
            />
        </BlockWrapper>
    );
}

MapBlock.whyDidYouRender = true;

export default MapBlock;
