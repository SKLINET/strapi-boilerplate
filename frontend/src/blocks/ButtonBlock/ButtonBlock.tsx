import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { OmitRefType } from '@symbio/headless';
import { ButtonBlock_content$data } from './__generated__/ButtonBlock_content.graphql';
import { IApp } from '../../types/app';
import { Button } from '../../components/blocks/Button/Button';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonBlockStaticProps {}

export interface ButtonBlockContent extends OmitRefType<ButtonBlock_content$data> {
    __typename: 'ComponentBlockButtonBlock';
}

export interface ButtonBlockProps extends ButtonBlockStaticProps {
    blocksData: Omit<ButtonBlockContent, ' $fragmentType'>;
    app?: IApp;
    className?: string;
}

graphql`
    fragment ButtonBlock_content on ComponentBlockButtonBlock {
        id
        file {
            ...appImageFragment @relay(mask: false)
        }
        icon {
            ...appIconFragment @relay(mask: false)
        }
        page {
            ...appPageFragment @relay(mask: false)
        }
        label
    }
`;

const ButtonBlock = ({ blocksData, app }: ButtonBlockProps): ReactElement => (
    <Button blocksData={blocksData} app={app} />
);

ButtonBlock.whyDidYouRender = true;

export default ButtonBlock;
