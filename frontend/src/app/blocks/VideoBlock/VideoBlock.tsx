import { ReactElement } from 'react';
import { graphql } from 'relay-runtime';
import { VideoBlock_content$data } from './__generated__/VideoBlock_content.graphql';
import { Video } from '../../components/blocks/Video/Video';
import { IApp } from '../../../types/base/app';
import { SearchParamsProps } from '../../../types/base/page';

export interface VideoBlockStaticProps {}

export interface VideoBlockContent extends Omit<VideoBlock_content$data, ' $fragmentType'> {
    __typename: 'ComponentBlockVideoBlock';
}

export interface VideoBlockProps extends VideoBlockStaticProps {
    blocksData: Omit<VideoBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
    searchParams?: Promise<SearchParamsProps> | undefined;
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

const VideoBlock = async ({ searchParams, ...props }: VideoBlockProps): Promise<ReactElement> => <Video {...props} />;

export default VideoBlock;
