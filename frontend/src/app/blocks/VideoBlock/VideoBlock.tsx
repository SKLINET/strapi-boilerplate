import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { OmitRefType } from '@symbio/headless';
import { VideoBlock_content$data } from './__generated__/VideoBlock_content.graphql';
import { Video } from '../../components/blocks/Video/Video';
import { IApp } from '../../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VideoBlockStaticProps {}

export interface VideoBlockContent extends OmitRefType<VideoBlock_content$data> {
    __typename: 'ComponentBlockVideoBlock';
}

export interface VideoBlockProps extends VideoBlockStaticProps {
    blocksData: Omit<VideoBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment VideoBlock_content on ComponentBlockVideoBlock {
        id
        video {
            ...appVideoFragment @relay(mask: false)
        }
    }
`;

const VideoBlock = ({ blocksData, app }: VideoBlockProps): ReactElement => <Video blocksData={blocksData} app={app} />;

export default VideoBlock;
