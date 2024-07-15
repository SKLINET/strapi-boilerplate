import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { OmitRefType } from '@symbio/headless';
import { TemplateBlock_content$data } from './__generated__/TemplateBlock_content.graphql';
import { Template } from '../../components/blocks/Template/Template';
import { IApp } from '../../../types/base/app';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TemplateBlockStaticProps {}

export interface TemplateBlockContent extends OmitRefType<TemplateBlock_content$data> {
    __typename: 'ComponentBlockTemplateBlock';
}

export interface TemplateBlockProps extends TemplateBlockStaticProps {
    blocksData: Omit<TemplateBlockContent, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment TemplateBlock_content on ComponentBlockTemplateBlock {
        id
        template {
            data {
                attributes {
                    content {
                        __typename
                        ...ContactFormBlock_content @relay(mask: false)
                        ...VideoBlock_content @relay(mask: false)
                    }
                }
            }
        }
    }
`;

const TemplateBlock = (props: TemplateBlockProps): ReactElement => <Template {...props} />;

export default TemplateBlock;
