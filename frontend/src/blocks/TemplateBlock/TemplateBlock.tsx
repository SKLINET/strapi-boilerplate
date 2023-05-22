import React, { ReactElement } from 'react';
import config from '../../../sklinet.config.json';
import { graphql } from 'react-relay';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { TemplateBlock_content$data } from './__generated__/TemplateBlock_content.graphql';
import { Template } from '../../components/blocks/Template/Template';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TemplateBlockStaticProps {}

export interface TemplateBlockContent extends OmitRefType<TemplateBlock_content$data> {
    __typename: 'ComponentBlockTemplateBlock';
}

export interface TemplateBlockProps extends TemplateBlockStaticProps {
    content: { blocksData: TemplateBlockContent };
    app?: AppContextProps<PageProps, WebSettingsProps>;
    className?: string;
}

graphql`
    fragment TemplateBlock_content on ComponentBlockTemplateBlock {
        id
        template {
            ...appTemplateFragment @relay(mask: false)
        }
    }
`;

const TemplateBlock = ({ content, ...otherProps }: TemplateBlockProps): ReactElement => (
    <Template {...{ ...content, id: undefined, __typename: undefined }} {...otherProps} />
);

TemplateBlock.whyDidYouRender = config.whyDidYouRender.active;

export default TemplateBlock;
