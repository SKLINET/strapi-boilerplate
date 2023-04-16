import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Image } from '../../components/primitives/Image/Image';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { ImageBlock_content$data } from './__generated__/ImageBlock_content.graphql';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { ISystemResources } from '../../types/systemResources';
import { getImageType } from '../../utils/getImageType';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ImageBlockStaticProps {}

export interface ImageBlockContent extends OmitRefType<ImageBlock_content$data> {
    __typename: 'ComponentBlockImageBlock';
}

export interface ImageBlockProps extends ImageBlockStaticProps {
    blocksData: ImageBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps> & ISystemResources;
}

graphql`
    fragment ImageBlock_content on ComponentBlockImageBlock {
        image {
            ...appImageFragment @relay(mask: false)
        }
    }
`;

const ImageBlock = ({ blocksData: { image } }: ImageBlockProps): ReactElement => {
    const _image = getImageType(image as any);

    return (
        <BlockWrapper>
            <div className="flex flex-col justify-center items-center">
                {_image && <Image image={_image} alt="Image" />}
            </div>
        </BlockWrapper>
    );
};

ImageBlock.whyDidYouRender = true;

export default ImageBlock;
