import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { OmitRefType } from '@symbio/headless';
import { TemplateBlock_content$data } from './__generated__/TemplateBlock_content.graphql';
import { Template } from '../../components/blocks/Template/Template';
import { IApp } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TemplateBlockStaticProps {}

export interface TemplateBlockContent extends OmitRefType<TemplateBlock_content$data> {
    __typename: 'ComponentBlockTemplateBlock';
}

export interface TemplateBlockProps extends TemplateBlockStaticProps {
    blocksData: TemplateBlockContent;
    app?: IApp;
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

const TemplateBlock = ({ blocksData, app }: TemplateBlockProps): ReactElement => (
    <Template blocksData={blocksData} app={app} />
);
TemplateBlock.whyDidYouRender = true;

export default TemplateBlock;
