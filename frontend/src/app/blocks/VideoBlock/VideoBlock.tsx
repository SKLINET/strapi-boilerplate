import { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { VideoBlock_content$data } from './__generated__/VideoBlock_content.graphql';
import { Video } from '../../components/blocks/Video/Video';
import { IApp } from '../../../types/base/app';

export interface VideoBlockStaticProps {}

export interface VideoBlockContent extends Omit<VideoBlock_content$data, ' $fragmentType'> {
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
        anchor
    }
`;

const VideoBlock = (props: VideoBlockProps): ReactElement => <Video {...props} />;

export default VideoBlock;
